var notes_data = []; //updateNotesData()
var new_ques = []; //updateQuestionsData() //getAllQuestions()

var data = [];
var parent_b_uid = "bN0UzG0NF";

var git_token = "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";
var gist_data = {
    data_other_id: "e5b0bc82cc5244ca87bb3cfe6a3aa437",
    data_other_filename: "my_mcq_app_data_other.json",
};
var parent_tags = [];
var other_data = [];
var page_uid = {
    ssc_notes_chapter_index_page: "aqd3OnDD0",
    ssc_tags_index_page: "w7PIAT54m",
    ssc_videos_index_page: "w7PIAT54m",

    upsc_notes_chapter_index_page: "aqd3OnDD0",
    upsc_tags_index_page: "0XsxfiYs-",
    upsc_videos_index_page: "w7PIAT54m",

    neet_notes_chapter_index_page: "aqd3OnDD0",
    neet_tags_index_page: "w7PIAT54m",
    upsc_videos_index_page: "w7PIAT54m",
};

var exam = "ssc";
var gist_id = {
    silju_ssc_notes: "574866ef0ed04d92e36dd1dcc7bbca4d",
};

async function updateNotesData(uid) {
    uid = page_uid[`${exam}_notes_chapter_index_page`]; //"aqd3OnDD0";
    notes_data = [];
    var index_page_uid = uid;
    var children = getBlockInfo(index_page_uid).children;
    children = sortBasedOnOrder(children);
    children.forEach((child) => {
        var x = loadNotesDataIntoArray(child, notes_data);
    });
    //downloadJSON(notes_data);
    //var filename = `silju_${exam}_notes`;
    //var id = gist_id[filename];
    //filename = filename + ".json";
    //await updateGistFile(id, filename, notes_data);
    //downloadJSON(notes_data);
    //return notes_data;
}
async function loadNotesDataIntoArray(block, arr) {
    var str = block.string;
    var id = block.uid;
    var children = block.children;
    if (children) {
        sortBasedOnOrder(children);
        var obj = {
            id: id,
            text: str,
            children: [],
            type: "heading",
        };

        arr.push(obj);
        children.forEach((child) => {
            loadNotesDataIntoArray(child, obj.children);
        });
    } else {
        var obj = {
            id: id,
            title: str,
            text: str,
            type: "page",
            data: [],
        };
        arr.push(obj);
        if (str.indexOf("[[") != -1) {
            debugger;
            str = str.replace(/\[\[|\]\]/g, "");
            var page = getPageInfoByPageTitle(str);
            obj.id = page.uid;
            parent_tags = [];
            //parent_tags.push(page.title.toLowerCase());
            //const query = `[:find (pull ?e [:block/uid :block/string {:block/children [:block/uid :block/string :block/order]}])
            //     :where [?e :node/title "${str}"]]`;
            //const result = await window.roamAlphaAPI.q(query);

            var children = page.children; //.sort((a, b) => a[":block/order"] - b[":block/order"]);
            children = sortBasedOnOrder(children);
            children.forEach((child) => {
                loadPageData(page.uid, page.uid, child, obj.data);
            });
        }
    }
}
async function loadPageData(page_id, parent_block_uid, block, arr) {
    block = getBlockInfo(block.uid);
    var str = block.string;
    if (str.indexOf("#ans") != -1) {
        //let str2 = str.replace("#ans", "");
        getQuestionObjectForBlock(block, parent_block_uid, page_id);
        return;
    }
    var id = block.uid;
    var children = block.children;
    var time = "";
    var video_id = "";
    if (block.heading) {
        if (str.indexOf("{{[[video-timestamp") != -1) {
            var obj = getVideoIDAndTimeFromVideoTimestamp(str);
            video_id = obj.video_id;
            time = obj.time;
            str = str.substring(0, str.indexOf("{{"));
            /*
            
            var bb = getBlockInfo(obj.blockUid);
            var block_str = bb.string;
            const regex = /youtu\.be\/([^\s\}]+)/;
            const match = block_str.match(regex);
            video_id = match ? match[1] : "";
            time = obj.timeInSeconds;
            */
        }
    }
    var obj = "";
    if (video_id != "") {
        obj = {
            id: id,
            heading: block.heading,
            text: str,
            page_id: page_id,
            video_id: video_id,
            time: time,
            children: [],
        };
    } else {
        obj = {
            id: id,
            heading: block.heading,
            text: str,
            page_id: page_id,
            children: [],
        };
    }

    arr.push(obj);
    if (children) {
        children = sortBasedOnOrder(children);
        children.forEach((child) => {
            loadPageData(page_id, block.uid, child, obj.children);
        });
    }
}

var parent_block_tags = [];
function getQuestionsJson(parent_b_uid) {
    parent_block_tags = [];
    var blocks = getBlockInfo(parent_b_uid);
    var str = blocks.string;
    var regex = /\[\[(.*?)\]\]/g;
    let match;
    while ((match = regex.exec(str)) !== null) {
        let tag = match[1].toLowerCase();
        if (!parent_block_tags.includes(tag)) parent_block_tags.push(tag);
    }
    // get page_name

    regex = /Page:\s+\[\[([\w\s]+)\]\]/;
    match = str.match(regex);
    let page_name = match ? match[1].trim() : null;
    var page_uid = "";
    if (page_name) {
        let page = getPageInfoByPageTitle(page_name);
        page_uid = page.uid;
    }
    //var str = blocks.children[0].string;
    if (blocks.children) {
        var child = blocks.children;
        child = sortBasedOnOrder(child);
        child.forEach((block) => {
            var str = block.string;
            var obj = getQuestionObjectForBlock(block, page_uid);
        });
    }
}

function getPageInfoByPageTitle(title) {
    let query = `[:find (pull ?e [:block/uid :block/string {:block/children [:block/uid :block/string :block/order]}])
                 :where [?e :node/title "${title}"]]`;
    let block = window.roamAlphaAPI.q(query);
    block = block[0][0];
    return block ? block : null;
}

function getQuestionObjectForBlock(block, parent_block_uid, page_uid) {
    //let str = "Asda ASD asds [[dfs df]] sd fs [[df sd fs]] df sd fs d ";

    // Regular expression to match [[...]]
    var input = block.string;
    input = input.replace("#quesss", "");
    var uid = block.uid;

    // Array to store extracted tags
    let tags = [];
    const tagMappings = [
        { original: "when", mapped: "date" },
        { original: "who", mapped: "person" },
        { original: "where", mapped: "place" },
    ];

    //Extract video link in the questions
    var video = null;
    var regex = /\{\{\[\[video-timestamp\]\]\: \(\(.*?\)\) \d{2}:\d{2}:\d{2}\}\}/;
    let match = input.match(regex);
    video_timestamp = match ? match[0] : null;
    if (video_timestamp) {
        video = getVideoIDAndTimeFromVideoTimestamp(video_timestamp);
    }

    var ignore_tags = ["video-timestamp", "questions"];
    // Extract tags and convert to lowercase

    const tagRegex = /\[\[([^\]]+)\]\]/g;
    input = input.replace(tagRegex, (match, tag) => {
        let ttt = tag.toLowerCase();
        let mapping = tagMappings.find((mapping) => mapping.original === ttt);

        if (ignore_tags.includes(ttt)) {
            return "";
        }
        if (mapping) {
            tags.push(mapping.mapped);
            return tag; // Replace [[...]] with the content inside
        } else {
            tags.push(tag.toLowerCase()); // Push lowercase tag to tags array
            return tag; // Replace [[...]] with the content inside
        }
    });

    // Get the index of the question mark
    const questionIndex = input.indexOf("?");

    // Extract the question text
    const question = input.substring(0, questionIndex + 1).trim();

    // Split the input into lines
    const lines = input.trim().split("\n");

    // Find the line index of the question mark
    const questionLineIndex = lines.findIndex((line) => line.includes("?"));

    // Extract the options from the next 4 lines after the question line
    const options = lines.slice(questionLineIndex + 1, questionLineIndex + 5).map((line, index) => ({
        id: `${uid}_${index + 1}`,
        text: line.replace(/\[\[/g, "").replace(/\]\]/g, "").trim(),
    }));

    //console.log("Question:", question);
    //console.log("Options:", options);

    const tagsLine = lines[5];

    if (tagsLine && tagsLine.trim != "") {
        try {
            tags = tagsLine.match(/\[\[(.*?)\]\]/g).map((tag) => tag.replace(/\[\[|\]\]/g, ""));
        } catch (e) {}
    }
    //tags = Array.from(new Set(tags.concat(parent_block_tags)));

    tags = Array.from(new Set(tags.concat(parent_block_tags)));
    tags = tags.filter((tag) => !ignore_tags.includes(tag));
    let page = getPageInfoByPageId(page_uid);
    if (page) {
        tags.push(page.title.toLowerCase());

        //var index_uid = page_uid[`${exam}_notes_chapter_index_page`];
        //var blocks = getBlockInfo(index_uid)

        tags.push(exam.toLowerCase());
    }
    var obj = {
        id: uid,
        create_date: getTodayDate(),
        question: question,
        options: options,
        tags: tags,
        page_uid: page_uid,
        parent_block_uid: parent_block_uid,
        block_uid: "",
        explanation: "",
        video: video ? video : null,
    };
    new_ques.push(obj);
    return obj;
}
async function pagesLinkedToQuestion() {
    var page_uids = [];
    new_ques.forEach((que) => {
        if (!page_uids.includes(que.page_uid)) page_uids.push(que.page_uid);
    });

    let data = [];
    page_uids.forEach((page_uid) => {
        let page = getPageInfoByPageId(page_uid);
        //let page = getPageData(page_uid);

        var i = 0;
        var obj = {
            page_uid: page_uid,
            page_title: page ? page.title : "",
            total_questions: i,
            questions: [],
        };
        new_ques.forEach((que) => {
            if (que.page_uid == page_uid) {
                ++i;
                obj.questions.push(que.id);
            }
        });
        obj.total_questions = i;

        data.push(obj);
    });

    console.log(data);
    return data;
}
function getPageInfoByPageId(page_uid) {
    const query = `[:find (pull ?e [:node/title :block/uid :block/string])
                        :where [?e :block/uid "${page_uid}"]]`;

    var data = window.roamAlphaAPI.q(query);
    try {
        data = data[0][0];
    } catch {
        data = null;
    }
    return data;
}

function getBlockInfo(uid) {
    console.log("me: getBlockInfo called");
    //const blocks = window.roamAlphaAPI.q(`[:find ( pull  ?block [ * {:block/children ...} ] ):where[?block :block/uid \"${uid}\"]]`);
    var block = window.roamAlphaAPI.q(`
                                    [:find (pull ?block [
                                        :block/string
                                        :block/uid
                                        :block/heading
                                        :block/order
                                        {:block/children [:block/string :block/uid :block/heading :block/order {:block/children ...}]}
                                    ])
                                    :where [?block :block/uid "${uid}"]]
                                    `);

    block = block.length ? block : null;
    if (block) block = block[0][0];
    return block;
    // Recursive function to sort children
    function sortChildren(block) {
        if (block[":block/children"]) {
            block[":block/children"].sort((a, b) => a[":block/order"] - b[":block/order"]);
            block[":block/children"].forEach(sortChildren); // Sort grandchildren recursively
        }
    }

    // Sort the top-level block's children
    sortChildren(block);
    return block;
}

// Recursive function to sort children
function sortChildren(block) {
    if (block[":block/children"]) {
        block[":block/children"].sort((a, b) => a[":block/order"] - b[":block/order"]);
        block[":block/children"].forEach(sortChildren); // Sort grandchildren recursively
    }
}

async function getUpdatedJsonFile() {
    var id = "4cb7b01ed98d271744b3cc662072b1ce"; // data gist file id
    var filename = "my_mcq_app_data.json"; // data gist file name

    const apiUrl = `https://api.github.com/gists/${id}`;

    return await fetch(apiUrl)
        .then((response) => response.json())
        .then((gistData) => {
            if (gistData.files && gistData.files[filename]) {
                const fileContent = gistData.files[filename].content;
                const parsedData = JSON.parse(fileContent);
                console.log(`me: Data from gist file "${filename}" retrieved successfully`);

                var data = parsedData;
                const all_data = [...new_ques, ...data];
                downloadJSON(all_data);
            } else {
                return null;
                console.error("File not found in the Gist.");
                var data = getDataFromLocale("me_data");
                if (data) initialLoading();
            }
        })
        .catch((error) => {
            return null;
            console.error("Error getting data from the Gist:", error);
            return;
            var data = getDataFromLocale("me_data");
            if (data) initialLoading();
        });
}

function downloadJSON(all_data) {
    // Convert object array to JSON format
    const jsonData = JSON.stringify(all_data, null, 4);

    // Get the current date and time
    const currentDate = new Date();
    const fileName = `silju_${exam}_${currentDate.getFullYear()}_${String(currentDate.getMonth() + 1).padStart(2, "0")}_${String(currentDate.getDate()).padStart(2, "0")}_${String(currentDate.getHours()).padStart(2, "0")}_${String(currentDate.getMinutes()).padStart(2, "0")}.json`;

    // Create a blob with the JSON data
    const blob = new Blob([jsonData], { type: "application/json" });

    // Create a link element
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;

    // Programmatically click the link to trigger the download
    document.body.appendChild(link);
    link.click();

    // Remove the link element from the document
    document.body.removeChild(link);
}

function generateUniqueId() {
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var id = "";
    for (var i = 0; i < 10; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}

function getTodayDate() {
    // in the YYYY-MM-DD format
    var today = new Date();
    var year = today.getFullYear();
    var month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    var day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function loadTagsIndexPageDataToGist() {
    var name = `${exam}_tags_index_page`;
    var pageUid = page_uid[name];

    var block = getBlockInfo(pageUid);
    var tags = [];

    var children = block.children;

    children = sortBasedOnOrder(children);
    children.forEach((block) => {
        tags = getTagsFromBlock(block, tags);
    });
    obj = {
        type: "tags_index",
        data: tags,
    };
    other_data.push(obj);

    console.log("tags: ", tags);
    var id = gist_data.data_other_id;
    var filename = gist_data.data_other_filename;
    updateGistFile(id, filename, tags);
}

function getTagsFromBlock(block, arr) {
    var tag = {
        name: block.string,
        children: [],
    };

    var children = block.children;
    if (children) {
        children = sortBasedOnOrder(children);
        children.forEach((childBlock) => {
            tag.children.push(getTagsFromBlock(childBlock, []));
        });
    }

    arr.push(tag);
    return arr;
}

async function updateGistFile(id, filename, array_data) {
    const newContent = JSON.stringify(array_data, null, 2);
    const url = `https://api.github.com/gists/${id}`;
    const headers = {
        Authorization: `token ${git_token}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
    };
    const body = {
        files: {
            [filename]: {
                content: newContent,
            },
        },
    };

    try {
        console.log("Sending request to update Gist...");
        const response = await fetch(url, {
            method: "PATCH",
            headers: headers,
            body: JSON.stringify(body),
        });

        console.log("Response received:", response);

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Gist updated successfully:", data);
    } catch (error) {
        console.error("Failed to update gist:", error);
    }
}

// hhhh

async function fetchPageData(title) {
    // Fetch page data using the Roam API
    const query = `[:find (pull ?e [:block/uid :block/string {:block/children [:block/uid :block/string :block/order]}])
                 :where [?e :node/title "${title}"]]`;
    const result = await window.roamAlphaAPI.q(query);
    const blocks = result.map((block) => ({
        id: block[":block/uid"],
        text: block[":block/string"],
        level:
            block[":block/children"].length > 0
                ? block[":block/children"].map((child) => ({
                      id: child[":block/uid"],
                      text: child[":block/string"],
                  }))
                : [],
    }));
    return {
        page: blocks[0].id,
        title: title,
        text: blocks,
    };
}

async function loadBlockData(uid) {
    const blockData = await fetchBlockData(uid);
    const parseBlock = async (block) => {
        if (!block) return null;
        const { ":block/string": text, ":block/children": children } = block;
        let parsedBlock = { id: block[":block/uid"], text, children: [] };

        // Check if the block text is a page reference
        const pageReference = text.indexOf("[[") != -1;
        if (pageReference) {
            const pageTitle = pageReference[1];
            const pageData = await fetchPageData(pageTitle);
            parsedBlock = { ...parsedBlock, children: [pageData] };
        } else if (children && children.length > 0) {
            parsedBlock.children = await Promise.all(children.map(parseBlock));
        }

        return parsedBlock;
    };

    return parseBlock(blockData);
}

// Example usage
const rootBlockUid = "BLqH0X15x";
//loadBlockData(rootBlockUid);

function updateQuestions() {
    updated_ques.forEach((up_que) => {
        var que = getQuestionById(up_que.id);
        que.explanation = up_que.explanation;
        que.linked_blocks = up_que.linked_blocks;
        que.video_explanation = up_que.video_explanation;
    });
}

function sortBasedOnOrder(arr) {
    try {
        arr = arr.sort((a, b) => a.order - b.order);
    } catch {}
    return arr;
}

function getVideoIDAndTimeFromVideoTimestamp(input) {
    let regex = /\{\{\[\[video-timestamp\]\]\: \(\((.*?)\)\) (\d{2}:\d{2}:\d{2})\}\}/;
    let match = input.match(regex);
    if (match) {
        let video_block_uid = match[1];
        let time = match[2];
        time = convertTimeIntoSeconds(time);

        let video_block = getBlockInfo(video_block_uid);
        let video_block_string = video_block.string;
        regex = /\{\{\[\[video\]\]\: https:\/\/youtu\.be\/(.*?)\}\}/;
        match = video_block_string.match(regex);
        let video_id = match ? match[1] : null;
        let obj = { time: time, video_id: video_id };
        console.log(`me: Extracted video_id and time  ${obj}`);
        return obj;
    }
    console.log(`me: No video_id and time`);
    return null;
}

function getBlocksWithPageName(pageName) {
    const searchQuery = `[[${pageName}]]`;
    const query = `[:find (pull ?b [*])
                    :where
                    [?b :block/refs ?r]
                    [?r :node/title "${pageName}"]]`;

    return window.roamAlphaAPI.q(query);
}

function getAllQuestions() {
    new_ques = [];
    var blocks = getBlocksWithPageName("Questions");
    blocks.forEach((block) => {
        getQuestionsJson(block[0].uid);
    });
    pagesLinkedToQuestion();
}
function updateQuestionsData() {
    new_ques = [];
    var blocks = getBlocksWithPageName("Questions");
    blocks.forEach((block) => {
        getQuestionsJson(block[0].uid);
    });
}

function convertTimeIntoSeconds(time) {
    const [hours, minutes, seconds] = time.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
}
