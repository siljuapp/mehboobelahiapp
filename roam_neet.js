function updateQuestionsPageWise() {
    var new_page_uid = "H3Osgczei";
    let page_title = "NEET 2020"; // Assuming this is the page title you want to use
    let page = getPageInfoByPageTitle(page_title);
    let page_uid = page.uid;

    let page_blocks = getBlockInfo(page_uid);
    page_blocks = page_blocks.children;

    page_blocks.forEach((page_block) => {
        debugger;
        let input = page_block.string;
        let escaped_page_title = page_title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        let regex_pattern = /\^\^(.*?)\^\^/g;

        // Replace all occurrences of ^^...^^ with escaped_page_title
        let replaced = input.replace(regex_pattern, `^^${escaped_page_title}^^`);

        // Assuming transformString and createNewBlock are defined elsewhere
        let updated_input = transformString(replaced);
        if (updated_input) createNewBlock(new_page_uid, updated_input);
    });
}

function updateQuestions() {
    var page_uid = "mnAPjQpr8";
    var new_page_uid = "u63Rh4jGu";

    var blocks = getBlockInfo(page_uid);
    blocks = blocks.children;
    blocks.forEach((block) => {
        debugger;
        let page_title = block.string;
        page_title = page_title.replace(/\[\[/g, "").replace(/\]\]/g, "");
        let page = getPageInfoByPageTitle(page_title);
        let page_uid = page.uid;

        let page_blocks = getBlockInfo(page_uid);
        page_blocks = page_blocks.children;
        page_blocks.forEach((page_block) => {
            let input = page_block.string;
            input = input.replace(/\^\^(.*?)\^\^/g, `^^${page_title}^^`);
            let updated_input = transformString(input);
            createNewBlock(new_page_uid, updated_input);
        });
    });
}
function getPageInfoByPageTitle(title) {
    let query = `[:find (pull ?e [:block/uid :block/string {:block/children [:block/uid :block/string :block/order]}])
                 :where [?e :node/title "${title}"]]`;
    let block = window.roamAlphaAPI.q(query);
    //block = block[0][0];
    return block ? block[0][0] : null;
}
function createNewBlock(parent_uid, string) {
    window.roamAlphaAPI.createBlock({ location: { "parent-uid": parent_uid, order: 0 }, block: { string: string } });
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
}

function transformString(input) {
    // Step 1: Remove empty lines
    const nonEmptyLines = input.split("\n").filter((line) => line.trim() !== "");

    // Combine non-empty lines back into a single string
    const cleanedInput = nonEmptyLines.join("\n");

    // Step 2: Remove option numbers
    const cleanedInputWithoutOptions = cleanedInput.replace(/\(\d+\)\s*/g, "");

    // Step 3: Extract the question (first line)
    const lines = cleanedInputWithoutOptions.split("\n");
    if (lines.length < 5) {
        return null;
    }

    // The first line is the question
    let question = lines[0].trim();
    if (!question.endsWith("?")) {
        question += "?"; // Append '?' if it does not end with '?'
    }

    // Next 4 lines are options
    const options = lines.slice(1, 5).map((option) => option.trim());

    // Step 4: Extract tags from within ^^ and ^^
    const tagsRegex = /\^\^(.*?)\^\^/;
    const tagsMatch = cleanedInput.match(tagsRegex);
    if (!tagsMatch) {
        throw new Error("Tags not found");
    }
    const tags = tagsMatch[1]
        .trim()
        .toLowerCase()
        .split(" ")
        .map((tag) => `[[${tag}]]`)
        .join(" ");

    // Step 5: Extract the correct answer index and add #ans to the correct option
    const ansRegex = /\*\*ans=(\d+)\*\*/;
    const ansMatch = cleanedInput.match(ansRegex);
    var output = null;
    try {
        var correctOptionIndex = 6;
        if (!ansMatch) {
        } else {
            correctOptionIndex = parseInt(ansMatch[1], 10) - 1;
        }

        // Format the options with #ans on the correct one

        const formattedOptions = options.map((option, index) => (index === correctOptionIndex ? `${option} #ans` : option));

        // Create the final output
        output = [question, ...formattedOptions, `Tags: ${tags}`].join("\n");
    } catch {
        console.log("FAILED");
        console.log(input);
    }

    return output ? output : input;
}
