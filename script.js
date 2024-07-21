// Initialise firebase

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-analytics.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-storage.js"; // Import Firebase Storage

const firebaseConfig = {
    apiKey: "AIzaSyCv2koOkHrqG_ioHoOU1vuDfI2KPwLNTZM",
    authDomain: "revise-480317.firebaseapp.com",
    projectId: "revise-480317",
    storageBucket: "revise-480317.appspot.com",
    messagingSenderId: "264373202075",
    appId: "1:264373202075:web:faca853c3021e78db36a3e",
    measurementId: "G-2VNZKXQP1Q",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

var exam = "ssc";
// gist data
var que_data = [];
var notes_data = [];
var other_data = [];
var user_data = [];
// ghghghg
var explanation_data = [];
var linked_blocks_data = [];
var video_links_data = [];
var tttt = [];
//load data
var testing = true;
var updated_ques = [];
var all_tags = [];
var fil_ques = [];
var temp_filtered_tags = [];
var pages_data = [];
var curr_ques = "";
var curr_que_index = 0;
var que_mode = "mcq";
var username = "elahi_testing";
var image_url = null;
//new ques
var new_ques = [];
var new_que_tags = ["apple", "banana", "cat"];
var me_admin = false;
// is

var data_other = [];
var autocompleteList = "";

loadDataFromFiles();

document.addEventListener("DOMContentLoaded", function () {
    //sconst currentURL = window.location.href;
    //const { exam, que_id } = getURLParameters(currentURL);
    var ele = "";

    ele = document.querySelector(".top i.menu");
    if (ele) {
        ele.addEventListener("click", function () {
            document.querySelector("#tabOverlay").style.right = "0";
            document.querySelector("#tabOverlay").classList.remove("hide");
        });
    }
    ele = document.querySelector("#closeMenu");
    if (ele) {
        ele.addEventListener("click", () => {
            document.querySelector("#tabOverlay").classList.add("hide");
        });
    }
    openRandomPractisePage();

    ele = document.querySelector("button.new-question");
    if (ele) {
        ele.addEventListener("click", () => {
            //unselectSelectQuestionDot();
            ++curr_que_index;
            if (curr_que_index == fil_ques.length) {
                curr_que_index = 0;
                sortArrayRandomly(fil_ques);
            }
            //displayQuestion();
            var tar = document.querySelector(".page.random .que-text");
            curr_ques = fil_ques[curr_que_index];
            //getMCQQuestionElement(curr_ques, tar, "main");
            displayQuestion();
        });
    }

    ele = document.querySelector(".filter-tags-section input.search-filter");
    if (ele) {
        ele.addEventListener("focus", (event) => {
            var tag = setAutoComplete(event, all_tags, "search-filter-tag");
        });
    }

    ele = document.querySelector(".filter-section input.filter");
    if (ele) {
        ele.addEventListener("focus", (event) => {
            var tag = setAutoComplete(event, all_tags, "search-filter-tag");
        });
    }

    var filter_tags_link = document.querySelector(".filter-tags-section span.link");
    if (filter_tags_link) {
        filter_tags_link.addEventListener("click", () => {
            var list_ele = document.querySelector(".filter-tags-section div.filter-tags-list");
            list_ele.innerHTML = "";
            filter_tags_link.classList.toggle("open");
            if (filter_tags_link.classList.contains("open")) {
                filter_tags_link.textContent = "Hide filter tags list";
                list_ele.classList.remove("hide");
            } else {
                filter_tags_link.textContent = "Show filter tags list";
                list_ele.classList.add("hide");
            }
            if (!list_ele.children.length) {
                data_other.forEach((data) => {
                    loadFilterTagsList(data, list_ele, 0);
                });
            }
        });
    }

    autocompleteList = document.createElement("div");
    autocompleteList.className = "me-autocomplete-list";
    document.body.append(autocompleteList);

    ele = document.querySelector(".tab.tasks");
    if (ele) {
        ele.addEventListener("click", () => {
            loadTasksPage();
        });
    }

    ele = document.querySelector(".tab.random");
    if (ele) {
        ele.addEventListener("click", () => {
            openRandomPractisePage();
        });
    }

    ele = document.querySelector(".tab.add");
    if (ele) {
        ele.addEventListener("click", () => {
            openAddNewQuestion();
        });
    }

    ele = document.querySelector(".tab.my-notes");
    if (ele) {
        ele.addEventListener("click", () => {
            openMyNotesPage();
        });
    }
    ele = document.querySelector(".tab.save-image");
    if (ele) {
        ele.addEventListener("click", () => {
            getImageURL();
        });
    }
    ele = document.querySelector(".tab.about-me");
    if (ele) {
        ele.addEventListener("click", () => {
            openAboutMePage();
        });
    }
    ele = document.querySelector(".tab.mock");
    if (ele) {
        ele.addEventListener("click", () => {
            openMockTestPage();
        });
    }
    ele = document.querySelector(".tab.notes");
    if (ele) {
        ele.addEventListener("click", () => {
            loadNotesData();
        });
    }

    ele = document.querySelector(".tab.upload");
    if (ele) {
        ele.addEventListener("click", () => {
            uploadDataInFirebase(user_data);
        });
    }
    ele = document.querySelector(".link.all-tags");
    if (ele) {
        ele.addEventListener("click", (event) => {
            const allTagsDiv = document.querySelector(".all-tags.tags");
            const linkElement = event.target;

            if (linkElement.classList.contains("active")) {
                // Hide all-tags and update link text
                allTagsDiv.classList.add("hide");
                linkElement.textContent = "Show all tags";
                linkElement.classList.remove("active");
            } else {
                // Show all-tags and update link text
                allTagsDiv.classList.remove("hide");
                linkElement.textContent = "Hide all tags";
                linkElement.classList.add("active");
            }
        });
    }

    ele = document.querySelector(".tab.import");
    if (ele) {
        ele.addEventListener("click", () => {
            importDataFromFirebase("user_data.json")
                .then((data) => {
                    if (data) {
                        console.log("Data imported from Firebase:");
                        console.log(data); // Log the fetched data array
                    } else {
                        console.log("No data received from Firebase.");
                    }
                })
                .catch((error) => {
                    console.error("Error in importDataFromFirebase:", error);
                });
        });
    }

    ele = document.querySelector(".tab.download");
    if (ele) {
        ele.addEventListener("click", () => {
            downloadUserData(user_data);
        });
    }

    ele = document.querySelector(".tab.import__");
    if (ele) {
        ele.addEventListener("click", () => {
            importUserData();
        });
    }

    ele = document.querySelector(".today-que-info .link.show-all");
    if (ele) {
        ele.addEventListener("click", (event) => {
            document.querySelector(".today-que-info .que-text").classList.add("hide");
            var target = document.querySelector(".today-que-info .all-que-text");
            target.classList.remove("hide");

            document.querySelector(".today-que-info .link.remove-que").classList.remove("hide");
            document.querySelector(".today-que-info .link.remove-que").addEventListener("click", (event) => {
                document.querySelector(".today-que-info .que-text").classList.add("hide");
                document.querySelector(".today-que-info .all-que-text").classList.add("hide");
                //div.classList.remove("active");
                document.querySelector(".today-que-info .link.remove-que").classList.add("hide");
                return;
            });

            user_data[0].today_practice_questions.forEach((que, index) => {
                var que_obj = getQuestionById(que.que_id);
                var que_div = displayQuestion(que_obj, target, "all");
                que_div.querySelector("span.question").textContent = "Q" + (index + 1) + ". " + que_obj.question;
                var options = que_div.querySelectorAll(".options .option");
                options.forEach((option) => {
                    if (option.id == que.answer_option_id) {
                        option.className = "option me-cp correct-ans disabled";
                    }
                });
                if (que.selected_option_id != que.answer_option_id) {
                    options.forEach((option) => {
                        if (option.id == que.selected_option_id) {
                            option.className = "option me-cp wrong-ans disabled";
                        }
                    });
                }
            });
        });
    }

    ele = document.querySelector(".starred-questions span.link");
    if (ele) {
        ele.addEventListener("click", () => {
            var list_ele = document.querySelector(".starred-questions .all-list");
            list_ele.innerHTML = "";
            if (!user_data.starred_questions) return;
            list_ele.classList.toggle("hide");
            user_data.starred_questions.forEach((que) => {
                var que_div = displayAllQuestion(que, list_ele);
            });
        });
    }
});

async function initialStart() {
    var isOnline = checkInternetConnection();
    if (isOnline) {
        // que data
        var data = await getDataFromGit(gist_data.data_id, gist_data.data_filename, "que_data");

        if (data == null) {
            data = getDataFromLocale("que_data");
            if (!data) que_data = [];
            que_data = data;
        } else {
            que_data = data;
            saveDataInLocale("que_data", data);
        }

        // other_data
        data = await getDataFromGit(gist_data.data_other_id, gist_data.data_other_filename, "data_other");

        if (data == null) {
            data = getDataFromLocale("data_other");
            if (!data) data_other = [];
            else data_other = data;
        } else {
            data_other = data;
            saveDataInLocale("data_other", data);
        }
        // notes data
        var filename = `silju_${exam}_notes`;
        var id = gist_id[filename];
        filename = filename + ".json";
        data = await getDataFromGit(id, filename, "notes");
        if (data == null) {
            data = getDataFromLocale("notes_data");
            if (!data) notes_data = [];
            else notes_data = data;
        } else {
            notes_data = data;
            saveDataInLocale("notes_data", notes_data);
        }

        setTimeout(() => {
            initialLoading();
        }, 1500);
    } else {
        que_data = getDataFromLocale("que_data");
        notes_data = getDataFromLocale("notes_data");
        data_other = getDataFromLocale("data_other");
        setTimeout(() => {
            initialLoading();
        }, 1500);
    }
}

function hardReloadCode() {
    const links = document.getElementsByTagName("link");
    for (let i = 0; i < links.length; i++) {
        if (links[i].rel === "stylesheet") {
            links[i].href = links[i].href.split("?")[0] + "?cache_bust=" + new Date().getTime();
        }
    }

    // Reload JavaScript
    const scripts = document.getElementsByTagName("script");
    for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].src) {
            scripts[i].src = scripts[i].src.split("?")[0] + "?cache_bust=" + new Date().getTime();
        }
    }
}

//saveDataInLocale("me_admin", true);
function initialLoading() {
    //loadSettings();
    if (testing) document.querySelector("body").classList.add("editor");
    document.querySelector("body").classList.add(`${exam}`);
    document.querySelector(".loading").classList.add("hide");
    document.querySelector(".me-content").classList.remove("hide");
    //loadAllTags();
    sortArrayRandomly(que_data);

    fil_ques = que_data;
    curr_que_index = 0;
    curr_ques = fil_ques[curr_que_index];
    openRandomPractisePage();
    displayQuestion();

    //new_que_tags = all_tags;
    //new_ques = getDataFromLocale("new_ques");
    //if (!new_ques) new_ques = [];
    loadAllFilterTags();
    //saveDataInLocale("me_admin", true);
    //me_admin = getDataFromLocale("me_admin");

    //user_data = getDataFromLocale("user_data");

    // explanation_data = getDataFromLocale("explanation_data");
    // linked_blocks_data = getDataFromLocale("linked_blocks_data");
    // video_links_data = getDataFromLocale("video_links_data");
    // updated_ques = getDataFromLocale("updated_ques");

    openRandomPractisePage();
    loadNotesData("kk");

    //
    if (false) {
        var span1 = document.querySelector("span.add-new-que");
        span1.classList.remove("hide");
        /* span1.addEventListener("click", () => {
            
            document.querySelector("div.add-que").classList.toggle("hide");
        }); */
        document.body.addEventListener("click", (event) => {
            if (event.target === span1) {
                document.querySelector("div.add-que").classList.toggle("hide");
            }
        });
    }
}

function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    return `${hours}_${minutes}_${seconds}`;
}

function escapeCSSSelector(id) {
    return id.replace(/([ #;&,.+*~':"!^$[\]()=>|/@])/g, "\\$1").replace(/^([0-9])/g, "\\3$1 ");
}

function runForMeEditMode() {
    document.querySelector("span.add-new-que").classList.remove("hide");
    document.querySelector("div.add-que").classList.remove("hide");
}

function setAutoComplete(event, arr, type, target) {
    var input = event.target;

    input.addEventListener("input", function () {
        var inputValue = input.value.trim().toLowerCase();
        //const matchingNames = [];
        //try {
        const matchingNames = arr.filter((name) => name.toLowerCase().includes(inputValue));
        //} catch (e) {}
        if (!matchingNames.length) {
            autocompleteList.classList.remove("active");
            return null;
        }
        autocompleteList.innerHTML = "";

        if (false && inputValue !== "" && type != "search-filter-tag") {
            const inputItem = document.createElement("div");
            inputItem.textContent = 'new: "' + inputValue + '"';

            inputItem.addEventListener("click", (event) => {
                var tar = input.parentElement;
                var tag = event.target.textContent.match(/"([^"]*)"/)[1].trim();
                var div = document.createElement("div");
                div.className = "tag";
                div.innerHTML = `<span class="name">${tag}</span>
                     <span class="remove-tag">x</span>`;
                tar.insertBefore(div, input);
                div.children[1].addEventListener("click", (event) => {
                    div.remove();
                });
                input.value = "";
                input.focus();
                autocompleteList.classList.remove("active");
            });
            autocompleteList.appendChild(inputItem);
        }

        matchingNames.forEach((name) => {
            const item = document.createElement("div");
            item.textContent = name;

            item.addEventListener("click", (event) => {
                var tar = input.parentElement;
                var tag = event.target.textContent.trim();
                if (type == "search-filter-tag") tar = document.querySelector(".filtered-tags .tags");
                else if (type == "explanation") {
                    input.value = tag;
                    autocompleteList.classList.remove("active");
                    return;
                }

                input.value = "";
                input.focus();
                autocompleteList.classList.remove("active");
                addTagInTheFilterTagList(tag);
            });

            autocompleteList.appendChild(item);
        });

        if (matchingNames.length > 0 || inputValue !== "") {
            autocompleteList.classList.add("active");
        } else {
            autocompleteList.classList.remove("active");
        }

        var inputRect = input.getBoundingClientRect();
        autocompleteList.style.width = inputRect.width + "px";
        autocompleteList.style.top = inputRect.bottom + window.scrollY + "px";
        autocompleteList.style.left = inputRect.left + window.scrollX + "px";
        if (input.classList.contains("filter-tag")) autocompleteList.style.width = "300px";
    });

    window.addEventListener("mousedown", function (event) {
        if (!input.contains(event.target) && !autocompleteList.contains(event.target)) {
            autocompleteList.classList.remove("active");
        }
    });
}

function sortArrayRandomly(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function isStarredQuestion(que) {
    if (!user_data.starred_question) return false;
    for (var i = 0; i < user_data.starred_question.length; i++) {
        if (user_data.starred_question[i] == que) return true;
    }
    return false;
}

function displayTags(tag_array, tag_target) {
    return;
    tag_array.forEach((tag) => {
        var span = document.createElement("span");
        span.className = "tag";
        span.textContent = tag;
        tag_target.appendChild(span);
    });
}

function loadAllTags() {
    console.log("loadAllTags called");
    que_data.forEach((obj) => {
        obj.tags.forEach((tag) => {
            if (!all_tags.includes(tag)) all_tags.push(tag);
        });
    });
}
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
function getDataFromLocale(key) {
    try {
        const jsonData = localStorage.getItem(key);
        if (jsonData === null) {
            console.log(`me: No local data is found for key: "${key}"`);
            return null;
        }
        var data = JSON.parse(jsonData);
        console.log(`me: Local data for key "${key}" retrived successfully from locale`);
        return data;
    } catch (error) {
        console.error(`me: Error retrieving local data with key "${key}" from localStorage`);
        return null;
    }
}
function saveDataInLocale(key, data) {
    if (key == "user_data") key = `user_data_${exam}`;
    if (Array.isArray(data)) {
        var jsonData = JSON.stringify(data);
        localStorage.setItem(key, jsonData);
        console.log(`me: Data with key "${key}" saved in locale; [Array]`);
    } else {
        //var jsonData = JSON.stringify(data);
        localStorage.setItem(key, data);
        console.log(`me: Data with key "${key}" saved in locale`);
    }
}

function checkInternetConnection() {
    if (navigator.onLine) {
        console.log("You are online.");
        return true;
    } else {
        console.log("You are offline.");
        return false;
    }
}

function loadAllFilterTags() {
    return;
    const sortedTags = all_tags.sort();

    //Count occurrences of each tag in que_data
    const tagCounts = {};
    que_data.forEach((question) => {
        question.tags.forEach((tag) => {
            if (tagCounts[tag]) {
                tagCounts[tag]++;
            } else {
                tagCounts[tag] = 1;
            }
        });
    });
    // Step 3: Create div elements for each tag based on sortedTags and tagCounts
    const tagsContainer = document.querySelector(".all-tags.tags"); // Assuming there's a container element with id 'tags-container'

    sortedTags.forEach((tag, index) => {
        const tagDiv = document.createElement("div");
        tagDiv.className = "tag me-cp";
        //.classList.add("tag");
        tagDiv.textContent = `${tag} ${tagCounts[tag] ? tagCounts[tag] : ""}`;
        tagsContainer.appendChild(tagDiv);
        tagDiv.addEventListener("click", () => {
            var input = document.querySelector("div.top input.search-filter");
            filterQuestionsOnTagBased(input, tag);
        });
    });
}

function getQuestionById(id) {
    for (const que of que_data) {
        if (que.id == id) {
            return que;
        }
    }
    return null; // Return null if no match is found
}

function convertOptions() {
    var data = que_data;
    data.forEach((que) => {
        const transformedOptions = [];
        que.options.forEach((option) => {
            transformedOptions.push({
                id: generateUniqueId(),
                text: option,
            });
        });
        que.options = transformedOptions;
    });
}
async function getDataFromGit(id, filename, type) {
    const apiUrl = `https://api.github.com/gists/${id}`;
    const headers = {
        Authorization: `token ${git_token}`,
        Accept: "application/vnd.github.v3+json",
    };

    return await fetch(apiUrl)
        .then((response) => response.json())
        .then((gistData) => {
            if (gistData.files && gistData.files[filename]) {
                const fileContent = gistData.files[filename].content;
                const array_data = JSON.parse(fileContent);
                console.log(`me: Data from gist file "${filename}" retrieved successfully`);
                return array_data;
            } else {
                console.error("File not found in the Gist.");
                return null;
            }
        })
        .catch((error) => {
            console.error("Error getting data from the Gist:", error);
            return null;
        });
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

async function updateMyMcqAppGistFile(filename) {
    var filename = `silju_${exam}_questions`;
    const gistId = gist_id[filename];
    filename = `${filename}.json`;

    console.log("Updating Gist with ID:", gistId);
    const all_data = [...new_ques, ...que_data];
    const newContent = JSON.stringify(all_data, null, 2);
    const accessToken = "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"; //git_token.replace(/_elahi_/g, "");

    const url = `https://api.github.com/gists/${gistId}`;
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
            downloadJSON(all_data);
        }

        const data = await response.json();
        console.log("Gist updated successfully:", data);
        popupAlert("Gist updated successfully");
        new_ques = [];
        saveDataInLocale("new_ques", new_ques);
    } catch (error) {
        console.error("Failed to update gist:", error);
        popupAlert("Failed to Update Gist");
    }
}

async function updateGistFile(filename, id, data_in_array) {
    const data_in_json = JSON.stringify(data_in_array, null, 2);
    const url = `https://api.github.com/gists/${id}`;
    const headers = {
        Authorization: `token ${git_token}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
    };
    const body = {
        files: {
            [filename]: {
                content: data_in_json,
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
            downloadJSON(all_data);
        }

        const data = await response.json();
        console.log("Gist updated successfully:", data);
        popupAlert("Gist updated successfully");
        new_ques = [];
        saveDataInLocale("new_ques", new_ques);
    } catch (error) {
        console.error("Failed to update gist:", error);
        popupAlert("Failed to Update Gist");
    }
}

//updateGist(gistId, filename, newContent, accessToken);

function filterQuestionsOnTagBased(tag, filter_tags, span) {
    if (tag && tag != "cross") {
        var tar = document.querySelector(".filtered-tags");
        tar.innerHTML = "";
        fil_ques = que_data;
        var div = document.createElement("div");
        div.className = "tag";
        div.innerHTML = `<span class="name">${tag}</span>
                     <span class="remove-tag">x</span>`;
        tar.appendChild(div);
        div.children[1].addEventListener("click", (event) => {
            div.remove();
            fil_ques = que_data;
            filterQuestionsOnTagBased("cross");
        });
    }

    //const nameElements = document.querySelectorAll(".search-filter .tag .name");
    //const nameElements = document.querySelectorAll(".filtered-tags .tag .name");
    //filter_tags = Array.from(nameElements).map((element) => element.textContent.trim());
    var filtered_tags_ele = document.querySelector(".filtered-tags");

    if (filter_tags.length == 0) {
        filtered_tags_ele.classList.add("hide");
    } else {
        filtered_tags_ele.classList.remove("hide");
    }
    // Function to filter questions based on tags

    var filteredQuestions = [];
    if (!filter_tags) {
        fil_ques = que_data;
    } else if (tag == "cross") {
        filteredQuestions = filterQuestionsByTags(que_data, filter_tags);
    } else filteredQuestions = filterQuestionsByTags(fil_ques, filter_tags);

    fil_ques = filteredQuestions;
    let que_count_ele = document.querySelector(".filter-ques-count");
    if (que_count_ele) {
        que_count_ele.textContent = `${fil_ques.length} questions found`;
        que_count_ele.classList.remove("hide");
    }
    let ele = document.querySelector(".filtered-tags .tag");
    if (!ele) que_count_ele.classList.add("hide");

    curr_que_index = 0;
    displayQuestion();
}
function filterQuestionsByTags(questions, tags) {
    return questions.filter((question) => tags.some((tag) => question.tags.includes(tag)));
}

function handleFilterTag(input, tag) {
    var tar = input.parentElement;
    var tag = event.target.textContent.trim();

    var div = document.createElement("div");
    div.className = "tag";
    div.innerHTML = `<span class="name">${tag}</span>
                     <span class="remove-tag">x</span>`;
    tar.insertBefore(div, input);
    div.children[1].addEventListener("click", (event) => {
        div.remove();
    });
    input.value = "";
    input.focus();
}

function popupAlert(message, time) {
    var div = document.createElement("div");
    div.className = "me-popup-alert";
    div.textContent = message;
    document.body.append(div);
    if (time) return;
    setTimeout(function () {
        div.remove();
    }, 3000);
}
function popupAlertBackgroundColorChange(color) {}
function removePopupAlert() {
    var x = document.querySelector(".me-popup-alert");
    if (x) x.remove();
}

function downloadUserData(all_data) {
    const jsonData = JSON.stringify(all_data, null, 4);
    const fileName = "revise_app_user_data_" + getTodayDate() + "_" + getCurrentTime();
    const blob = new Blob([jsonData], { type: "application/json" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;

    // Programmatically click the link to trigger the download
    document.body.appendChild(link);
    link.click();
    popupAlert("User data downloaded successfully");
    // Remove the link element from the document
    document.body.removeChild(link);
}

function importUserData() {
    // Create an input element of type 'file'
    const input = document.createElement("input");
    input.type = "file";

    // Handle file selection change
    input.onchange = function (e) {
        const file = e.target.files[0];

        if (!file) {
            console.error("No file selected");
            return;
        }

        // Initialize a new FileReader
        const reader = new FileReader();

        // Define onload event handler
        reader.onload = function (event) {
            try {
                // Parse the JSON data
                const importedData = JSON.parse(event.target.result);

                // Assign imported data to user_data
                user_data = importedData;

                console.log("User data imported successfully:", user_data);
                popupAlert("User data imported successfully");
                saveDataInLocale("user_data", user_data);
                setTimeout(() => {
                    location.reload(true);
                }, 2000);
            } catch (error) {
                console.error("Error parsing JSON file:", error);
            }
        };

        // Read the file as text
        reader.readAsText(file);
    };

    // Trigger click event to open file selector dialog
    input.click();
}

function downloadJSON(all_data) {
    // Convert object array to JSON format
    const jsonData = JSON.stringify(all_data, null, 4);

    // Get the current date and time
    const currentDate = new Date();
    const fileName = `my_mcq_app_${currentDate.getFullYear()}_${String(currentDate.getMonth() + 1).padStart(2, "0")}_${String(currentDate.getDate()).padStart(2, "0")}_${String(currentDate.getHours()).padStart(2, "0")}_${String(currentDate.getMinutes()).padStart(2, "0")}.json`;

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

function displayAllQuestion() {
    document.querySelector(".today-que-info .link.show-all").click();
}

function addTodatPracticeQuestionDot(que) {
    var div = document.createElement("div");
    div.className = "prev-que me-cp";
    div.id = que.que_id;
    div.setAttribute("answer-opt", que.answer_option_id);
    div.setAttribute("selected-opt", que.selected_option_id);
    div.textContent = document.querySelectorAll(".prev-ques-list .prev-que").length + 1;

    if (que.answer_option_id == que.selected_option_id) {
        div.classList.add("correct-ans");
    } else {
        div.classList.add("wrong-ans");
    }
    document.querySelector("div.prev-ques-list").append(div);
    document.querySelector("div.today-que-info span.label").textContent = `Today practised questions (${user_data[0].today_practice_questions.length}):`;

    div.addEventListener("click", (event) => {
        var div = event.target;
        document.querySelector(".today-que-info .all-que-text").innerHTML = "";
        displayAllQuestion();
        var is_all_ques_open = document.querySelector(".today-que-info .all-que-text.hide");
        if (!is_all_ques_open) {
            var id = div.id;

            id = escapeCSSSelector(id);
            var ele = document.querySelector(`div.all-que-text #${id}`);

            ele.scrollIntoView({
                behavior: "smooth", // Optional: Smooth scrolling behavior
                block: "start", // Optional: Scroll to the top of the element
            });
            ele.style.backgroundColor = "#f6cb8b";
            setTimeout(() => {
                ele.style.backgroundColor = "";
            }, 3000);
            return;
        }
        if (div.classList.contains("active")) {
            document.querySelector(".today-que-info .que-text").classList.add("hide");
            div.classList.remove("active");
            document.querySelector(".today-que-info .link.remove-que").classList.add("hide");
            return;
        }
        document.querySelector(".today-que-info .que-text").classList.remove("hide");

        document.querySelector(".today-que-info .link.remove-que").classList.remove("hide");
        document.querySelector(".today-que-info .link.remove-que").addEventListener("click", (event) => {
            document.querySelector(".today-que-info .que-text").classList.add("hide");
            document.querySelector(".today-que-info .all-que-text").classList.add("hide");
            //div.classList.remove("active");
            document.querySelector(".today-que-info .link.remove-que").classList.add("hide");
            return;
        });
        unselectSelectQuestionDot();

        div.classList.add("active");
        var que_id = div.getAttribute("id");
        var selected_option_id = div.getAttribute("selected-opt");
        var answer_option_id = div.getAttribute("answer-opt");
        var que = getQuestionById(que_id);
        var target = document.querySelector(".today-que-info .que-text");

        displayQuestion(que, target);
        //setTimeout(() => {
        var options = document.querySelectorAll("div.que-text .options .option");
        options.forEach((option) => {
            if (option.id == answer_option_id) {
                option.className = "option me-cp correct-ans disabled";
            }
        });
        if (selected_option_id != answer_option_id) {
            options.forEach((option) => {
                if (option.id == selected_option_id) {
                    option.className = "option me-cp wrong-ans disabled";
                }
            });
        }
        //}, 1000);
    });
}

function unselectSelectQuestionDot() {
    var div = document.querySelector(".prev-ques-list .prev-que.active");
    if (div) div.classList.remove("active");
}

function copyToClipboard(text) {
    // Create a temporary input element
    const input = document.createElement("input");
    input.value = text;
    document.body.appendChild(input);

    // Select the text in the input field
    input.select();
    input.setSelectionRange(0, 99999); // For mobile devices

    // Copy the selected text to the clipboard
    document.execCommand("copy");

    // Remove the temporary input element
    document.body.removeChild(input);
}

//document.querySelector("div.star.icon")

function loadFilterTagsList(data, target_ele, index) {
    var span = document.createElement("span");
    span.className = "link filter-tag level-" + index;
    if (data.name.indexOf("[[") == -1) span.classList.remove("link");
    span.textContent = data.name.replace(/\[\[|\]\]/g, "");
    target_ele.append(span);
    if (data.children.length) {
        data.children.forEach((child) => {
            var i = index + 1;
            loadFilterTagsList(child[0], target_ele, i);
        });
    }
    if (!span.classList.contains("link")) return;
    span.addEventListener("click", (event) => {
        var ele = event.target;
        var tag = ele.textContent;
        addTagInTheFilterTagList(tag);
    });
}
function filterQuestions(temp_filtered_tags) {
    fil_ques = getFilteredQuestions(temp_filtered_tags);
    sortArrayRandomly(fil_ques);

    var i = fil_ques.length;

    var label_ele = document.querySelector(".filter-ques-count.label");
    label_ele.textContent = `${i} questions found`;
    label_ele.classList.remove("hide");
    if (i == 0) {
        label_ele.textContent = `No questions found`;
    }

    curr_que_index = 0;
    displayQuestion();
}
function getFilteredQuestions(filtered_tags_array) {
    return que_data.filter((obj) => obj.tags.some((tag) => filtered_tags_array.includes(tag)));
}

function addTagElementInTarget(tag, target) {}
function getTagElement(tag) {
    var div = document.createElement("div");
    div.className = "tag";
    div.innerHTML = `<span class="name">${tag}</span>
                     <span class="remove-tag">x</span>`;
    return div;
}

function removeElementFromArray(array, ele) {
    // Find the index of the element
    const index = array.indexOf(ele);

    // If the element is found, remove it
    if (index > -1) {
        array.splice(index, 1);
    }

    // Return the modified array
    return array;
}
function addTagInTheFilterTagList(tag) {
    if (temp_filtered_tags.includes(tag)) return;
    temp_filtered_tags.push(tag);
    var target_ele = document.querySelector(".middle .filtered-tags");
    //addTagElementInTarget(tag, target_ele);
    target_ele.classList.remove("hide");
    var tag_ele = getTagElement(tag);
    target_ele.appendChild(tag_ele);
    tag_ele.children[1].addEventListener("click", () => {
        tag_ele.remove();
        removeElementFromArray(temp_filtered_tags, tag);

        if (temp_filtered_tags.length == 0) {
            target_ele.classList.add("hide");
            document.querySelector(".filter-ques-count").classList.add("hide");
            fil_ques = que_data;
            curr_que_index = 0;
            displayQuestion();
            return;
        }
        filterQuestions(temp_filtered_tags);
    });
    //var filtered_tags_array = Array.from(target_ele.querySelectorAll(".middle .filtered-tags .name")).map((el) => el.textContent);
    filterQuestions(temp_filtered_tags);
}
function loadSettings() {
    return;
    var exam = "ssc";
    var mode = "mcq";
    if (!user_data[0].settings) user_data[0].settings = [];
    if (user_data[0].settings.length) {
        exam = user_data[0].exam;
        mode = user_data[0].mode;
    }
    // que_data = data;
}
function createConfetti(option) {
    for (let i = 0; i < 20; i++) {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");
        confetti.style.left = `${Math.random() * option.offsetWidth}px`;
        confetti.style.top = `${Math.random() * option.offsetHeight}px`;
        option.appendChild(confetti);

        setTimeout(() => {
            option.removeChild(confetti);
        }, 1000); // Remove confetti after the animation
    }
}

function setTimer(minutes) {
    const timerElement = document.querySelector(".mock-test span.timer");
    const endTime = Date.now() + minutes * 60 * 1000;

    function updateTimer() {
        const timeLeft = endTime - Date.now();
        if (timeLeft <= 0) {
            timerElement.textContent = "00:00";
            clearInterval(timerInterval);
            return;
        }

        const mins = Math.floor((timeLeft / 1000 / 60) % 60);
        const secs = Math.floor((timeLeft / 1000) % 60);

        if (mins == 0 && secs == 1) {
            document.querySelector(".submit-test").click();
        }

        const formattedTime = `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
        timerElement.textContent = formattedTime;
    }

    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);
}

function openPage(tab) {
    document.querySelectorAll(".tabs .tab").forEach((tab) => {
        tab.classList.remove("active");
    });
    document.querySelectorAll(".home .page").forEach((page) => {
        page.classList.add("hide");
    });
    document.querySelector(`.tab.${tab}`).classList.add("active");
    document.querySelector(`.page.${tab}`).classList.remove("hide");
}
function openMockTestPage(arg) {
    openPage("mock");
    var ele = document.querySelector(".page.mock");
    if (!ele.children.length || arg) {
        ele.innerHTML = `
                        <button id="start-new-mock" class="start-new-mock">Start new mock</button>
                        <div class="mock-history head">
                            <i class="fa-solid arrow fa-chevron-right"></i> 
                            <span class="label">Show Mock History</span>
                            
                        </div>
                        <div class="mock-history list hide me-dis-flex-co"></div>
                        <div class="mock-test-sec hide me-dis-flex-co"></div>`;

        var head = document.querySelector(".mock-history.head");
        addDividerBefore(head);
        head.addEventListener("click", (event) => {
            var tar_ele = document.querySelector(".page.mock .mock-history.list");
            tar_ele.classList.toggle("hide");
            if (tar_ele.classList.contains("hide")) {
                head.querySelector("i").className = "fa-solid fa-chevron-right";
                head.querySelector("span").textContent = "Show Mock History";
            } else {
                head.querySelector("i").className = "fa-solid fa-chevron-down";
                head.querySelector("span").textContent = "Hide Mock History";
                loadPreviousMockResults();
            }
        });

        ele.querySelector("#start-new-mock").addEventListener("click", () => {
            startNewMockTest();
        });
    }
}

function getMockTestHTMLTemplate() {
    return `<div class="top me-dis-flex">
                <div class="timer me-dis-flex">
                <i class="fa-solid fa-clock"></i>
                    <span class="timer"></span>
                </div>
                <div class="submit-test">Submit Test</div>
                <div class="cross">X</div>
            </div>
            <div class="que-list-dots"></div>
            <div class="que-text que-list"></div>`;
}
function endMockTestHTMLTemplate() {
    return `<div class="result">
            <div class="top me-dis-flex">
                <span class="label">Result</span>
                <button id="start-new-mock" class="start-new-mock">Start new mock</button>
                <div class="cross">X</div>
            </div>
            <div class="result-item">
                <span class="result-label">Total Questions:  </span>
                <span class="result-value" id="total-questions"></span>
            </div>
            <div class="result-item hide">
                <span class="result-label">Questions Attempted:  </span>
                <span class="result-value" id="questions-attempted"></span>
            </div>
            <div class="result-item unattempted">
                <span class="result-label">Questions Unattempted:  </span>
                <span class="result-value" id="questions-unattempted"></span>
            </div>
            <div class="result-item correct">
                <span class="result-label">Correct Questions:  </span>
                <span class="result-value" id="correct-questions"></span>
            </div>
            <div class="result-item wrong">
                <span class="result-label">Wrong Questions:  </span>
                <span class="result-value" id="wrong-questions"></span>
            </div>
            <div class="result-chart">
                <div class="chart-bar correct-bar" id="correct-bar"></div>
                <div class="chart-bar unattempted-bar" id="unattempted-bar"></div>
                <div class="chart-bar incorrect-bar" id="incorrect-bar"></div>
            </div>
            <button class="show-questions">Show questions</button>
            <div class="show-que-list"></div>
        </div>`;
}

function loadNotesData(arg) {
    if (!arg) openPage("notes");
    let chapter_list = document.querySelector(".page.notes .index-tags .notes");
    if (!chapter_list) addChapterIndexList();

    var target_ele = document.querySelector(".page.notes");
    let list_icon = target_ele.querySelector(".fa-list-ul");
    if (list_icon) {
        let ele = document.querySelector(".page.notes .page-title");
        //let ttt = document.querySelector(".page.notes.hide");
        //if (!ele && !ttt) target_ele.querySelector(".fa-list-ul").click();
        if (!ele) document.querySelector(".page.notes .index-tags").classList.add("open");
        return;
    }

    target_ele.innerHTML = ` <i class="fa-solid fa-list-ul"></i>
                            <div class="page-content page-text hide "></div>`;

    var ele = target_ele.querySelector(".fa-list-ul");
    if (ele) {
        //target_ele.querySelector(".index-tags").classList.add("open");
        ele.addEventListener("click", () => {
            //showIndexTagsList("notes");
            document.querySelector(".page.notes .index-tags").classList.add("open");
            //let chapter_list = document.querySelector(".page.notes .index-tags .notes");
            //chapter_list.classList.add("open");
        });
    }

    var head_ele = target_ele.querySelector(".head-link");
    if (head_ele) {
        head_ele.addEventListener("click", (event) => {
            var toc_list_ele = target_ele.querySelector(".toc-list");
            toc_list_ele.classList.toggle("hide");

            if (toc_list_ele.classList.contains("hide")) {
                head_ele.querySelector("i.arrow").className = "fa-solid arrow fa-chevron-right";
                head_ele.querySelector(".show-toc").textContent = "Show chapter list";
            } else {
                head_ele.querySelector("i.arrow").className = "fa-solid arrow fa-chevron-down";
                head_ele.querySelector(".show-toc").textContent = "Hide chapter list";
            }
        });
    }

    /*
    var show_toc_button = document.querySelector("button.show-toc__");
    show_toc_button.addEventListener("click", () => {
        show_toc_button.classList.toggle("open");
        if (show_toc_button.classList.contains("open")) {
            show_toc_button.textContent = "Hide table of content";
            document.querySelector(".page.notes .toc-list").classList.remove("hide");
        } else {
            show_toc_button.textContent = "Show table of content";
            document.querySelector(".page.notes .toc-list").classList.add("hide");
        }
    });
    */
    var toc_list_ele = target_ele.querySelector(".toc-list");

    notes_data.forEach((item) => {
        addNotesDataElement(item, toc_list_ele, 0);
    });
}

function addChapterIndexList() {
    //var tar = document.querySelector(".index-tags .notes");
    var tar = document.querySelector(".page.notes .index-tags .notes");
    if (!tar) {
        let ele = document.querySelector(".page.notes");

        let div1 = document.createElement("div");
        div1.className = "index-tags";
        ele.appendChild(div1);
        div1.innerHTML = `<div class="head">
                            <span> Chapter List </span>
                            <span class="cross close">X</span>
                         </div>`;
        div1.querySelector(".cross").addEventListener("click", () => {
            div1.classList.remove("open");
        });

        let div2 = document.createElement("div");
        div2.className = "list notes";
        div1.appendChild(div2);
        tar = div2;
    }

    notes_data.forEach((item) => {
        addChapterIndexItem(item, tar, 0);
    });
}
function addChapterIndexItem(item, tar, level) {
    var children = item.children;
    var div = document.createElement("div");
    div.className = `me-chapter level-${level}`;
    tar.appendChild(div);

    if (children?.length) {
        let div2 = document.createElement("div");
        div2.className = "chapter-item me-cp";
        div.appendChild(div2);

        let i = document.createElement("i");
        i.className = "arrow-icon fa-solid fa-chevron-right";
        div2.appendChild(i);

        div2.addEventListener("click", (event) => {
            //let i = event.target;
            let div = div2.closest(".me-chapter");
            let children_ele = div.querySelector(".children");
            children_ele.classList.toggle("hide");

            if (children_ele.classList.contains("hide")) {
                div2.querySelector("i").className = "arrow-icon fa-solid fa-chevron-right";
            } else {
                div2.querySelector("i").className = "arrow-icon fa-solid fa-chevron-down";
            }
        });
        /*i.addEventListener("click", (event) => {
            let i = event.target;
            let div = i.closest(".me-chapter");
            let children_ele = div.querySelector(".children");
            children_ele.classList.toggle("hide");

            if (children_ele.classList.contains("hide")) {
                i.className = "arrow-icon fa-solid fa-chevron-right";
            } else {
                i.className = "arrow-icon fa-solid fa-chevron-down";
            }
        });*/

        var span = document.createElement("span");
        span.className = "name";

        span.textContent = item.text;
        div2.appendChild(span);

        let div3 = document.createElement("div");
        div3.className = "children";
        div.appendChild(div3);

        children.forEach((child) => {
            var i = level + 1;
            addChapterIndexItem(child, div3, i);
        });
    } else {
        var span = document.createElement("span");
        span.className = "name link";
        span.id = item.id;
        span.setAttribute("page-id", item.id);
        let text = item.text;
        if (item.text.indexOf("[[") != -1) {
            pages_data.push({
                id: item.id,
                page_title: item.text.replace(/\[\[|\]\]/g, ""),
                data: item.data,
            });
        }
        text = text.replace("[[", "").replace("]]", "");
        span.textContent = text;
        div.appendChild(span);

        span.addEventListener("click", (event) => {
            var page_id = event.target.id;
            openNotesPageById(page_id);
            return;
            document.querySelector("div.page-text").classList.remove("hide");

            // first close the sidebar if it is open
            var ele = document.querySelector(".page.notes .index-tags");
            if (ele) ele.classList.remove("open");

            //load page data from pages_data[]
            var data = [];
            var page_id = event.target.id; //   data.id;
            for (var i = 0; i < pages_data.length; ++i) {
                if (page_id == pages_data[i].id) {
                    data = pages_data[i];
                    break;
                }
            }

            var div = document.createElement("div");
            div.id = data.id;
            div.className = "me-block me-page-title";

            ele = document.querySelector(".page-text");
            if (ele) {
                ele.innerHTML = "";
                ele.appendChild(div);
            } else {
                console.error(" 'div.page-text' not found to append 'page-title' ");
                return;
            }

            div.innerHTML = getBlockHTMLTemplate();
            setBlockIconsEvents(div);
            addBlockLinkedItems(div);

            ele = div.querySelector(".me-block-text .text-inner");
            ele.innerHTML = getHTMLFormattedText(data.page_title);

            // block data

            data = data.data;
            ele = div.querySelector(".children"); // target_element
            data.forEach((block) => {
                //cspan = document.createElement("span");
                //cspan.className = "children";
                //tar.appendChild(cspan);
                loadPageText2(block, ele, 0);
            });

            /*
            var div_page = document.createElement("div");
            div_page.className = "page-title";
            div_page.id = item.id;
            div_page.innerHTML = getHTMLFormattedText(item.text);

            var tar = document.querySelector(".page-text");

            tar.id = item.id;
            tar.innerHTML = "";
            tar.classList.remove("hide");
            tar.appendChild(div_page);
            var data = [];
            for (var i = 0; i < pages_data.length; ++i) {
                if (item.id == pages_data[i].id) data = pages_data[i].data;
            }
            var cspan = document.createElement("span");
            cspan.className = "children-blocks";
            tar.appendChild(cspan);
            tar = cspan;
            data.forEach((d) => {
                cspan = document.createElement("span");
                cspan.className = "children";
                tar.appendChild(cspan);
                loadPageText(d, cspan, 0);
            });
            */
        });
    }
}

function addNotesDataElement(item, target_ele, level) {
    return;
    var div = document.createElement("span");
    div.id = item.id;
    div.className = `toc toc-${item.type} level-${level} me-dis-flex-co`;
    div.innerHTML = getHTMLFormattedText(item.text);
    target_ele.appendChild(div);
    if (item.text.indexOf("[[") != -1) {
        div.classList.add("link");
        pages_data.push({
            id: item.id,
            page_title: item.text.replace(/\[\[|\]\]/g, ""),
            data: item.data,
        });
        div.addEventListener("click", () => {
            var div_page = document.createElement("div");
            div_page.className = "page-title";
            div_page.id = item.id;
            div_page.innerHTML = getHTMLFormattedText(item.text);
            var tar = document.querySelector(".page-text");
            tar.id = item.id;
            tar.innerHTML = "";
            tar.classList.remove("hide");
            tar.appendChild(div_page);
            var data = [];
            for (var i = 0; i < pages_data.length; ++i) {
                if (item.id == pages_data[i].id) data = pages_data[i].data;
            }
            var cspan = document.createElement("span");
            cspan.className = "children-blocks";
            tar.appendChild(cspan);
            tar = cspan;
            data.forEach((d) => {
                cspan = document.createElement("span");
                cspan.className = "children";
                tar.appendChild(cspan);
                loadPageText(d, cspan, 0);
            });
        });
    }
    var children = item.children;
    try {
        var div = document.createElement("div");
        div.className = "toc-children";
        target_ele.appendChild(div);
        children.forEach((child) => {
            addNotesDataElement(child, div, level + 1);
        });
    } catch {}
}

function addNotesDataElement2(item, target_ele, level) {
    return;
    var div = document.createElement("span");
    div.id = item.id;
    div.className = `toc toc-${item.type} level-${level} me-dis-flex-co`;
    div.innerHTML = getHTMLFormattedText(item.text);
    target_ele.appendChild(div);
    if (item.text.indexOf("[[") != -1) {
        div.classList.add("link");
        pages_data.push({
            id: item.id,
            page_title: item.text.replace(/\[\[|\]\]/g, ""),
            data: item.data,
        });
        div.addEventListener("click", () => {
            var div_page = document.createElement("div");
            div_page.className = "page-title";
            div_page.id = item.id;
            div_page.innerHTML = getHTMLFormattedText(item.text);

            var tar = document.querySelector(".page-text");
            tar.id = item.id;
            tar.innerHTML = "";
            tar.classList.remove("hide");
            tar.appendChild(div_page);
            var data = [];
            for (var i = 0; i < pages_data.length; ++i) {
                if (item.id == pages_data[i].id) data = pages_data[i].data;
            }
            var cspan = document.createElement("span");
            cspan.className = "children-blocks";
            tar.appendChild(cspan);
            tar = cspan;
            data.forEach((d) => {
                cspan = document.createElement("span");
                cspan.className = "children";
                tar.appendChild(cspan);
                loadPageText(d, cspan, 0);
            });
        });
    }
    var children = item.children;
    try {
        var div = document.createElement("div");
        div.className = "toc-children";
        target_ele.appendChild(div);
        children.forEach((child) => {
            addNotesDataElement(child, div, level + 1);
        });
    } catch {}
}

function loadPageText2(item, target, level) {
    var div = document.createElement("div");
    div.className = "me-block";
    div.id = item.id;
    div.setAttribute("page-id", item.page_id);
    target.appendChild(div);

    if (item.heading) {
        div.classList.add("heading");
    }

    div.innerHTML = getBlockHTMLTemplate();
    setBlockIconsEvents(div);
    addBlockLinkedItems(div);

    var ele = "";
    let text = item.text;
    if (text) {
        let ele = div.querySelector(".me-block-text .text-inner");
        ele.innerHTML = getHTMLFormattedText(text);
    }
    let children = item.children;
    if (children.length) {
        ele = div.querySelector(".children");
        //div.appendChild(cspan);
        children.forEach((child) => {
            loadPageText2(child, ele, level + 1);
        });
    }
}

function loadPageText(item, target, level) {
    var div = document.createElement("div");
    div.className = "me-block";
    target.appendChild(div);

    if (item.heading) {
        //div.classList.add("heading");
        div.className = "me-block heading";
        div.id = item.id;

        let dd = document.createElement("div");
        dd.className = "heading-text";
        div.appendChild(dd);

        var span = document.createElement("span");
        span.className = "text";
        span.id = item.id;
        dd.appendChild(span);

        if (item.video_id) {
            var i = document.createElement("i");
            i.className = "fa-brands fa-youtube video";
            i.id = item.video_id;
            i.setAttribute("time", item.time);
            //div.appendChild(i);
            dd.appendChild(i);
            i.addEventListener("click", (event) => {
                var i_ele = event.target;
                var video_id = i_ele.id;
                var time = parseInt(i_ele.getAttribute("time"));

                var page_div = i_ele.closest(".page-content");
                var iframe_div = page_div.querySelector(".page-iframe");
                var iframe = page_div.querySelector(".page-iframe iframe");

                if (true || !iframe_div || iframe.src.indexOf(video_id) == -1) {
                    if (iframe_div) iframe_div.remove();
                    iframe_div = document.createElement("div");
                    iframe_div.className = "page-iframe";
                    page_div.insertBefore(iframe_div, page_div.children[1]);
                    //iframe_div.innerHTML = ` <span class="close">X close video</span> <iframe class="rm-iframe rm-video-player" frameborder="0" allowfullscreen="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" title="THE LIVING WORLD in 1 Shot: FULL CHAPTER COVERAGE (Theory+PYQs) ||  Prachand NEET 2024" width="640" height="360" src="https://www.youtube.com/embed/${video_id}?enablejsapi=1&amp;origin=http://silju.in&amp;widgetid=5" id="widget6"></iframe>`;
                    iframe_div.innerHTML = ` <span class="close">X close video</span> <iframe class="rm-iframe rm-video-player" frameborder="0" allowfullscreen="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" title="THE LIVING WORLD in 1 Shot: FULL CHAPTER COVERAGE (Theory+PYQs) ||  Prachand NEET 2024" width="640" height="360" src="https://www.youtube.com/embed/${video_id}?enablejsapi=1&amp;origin=http://127.0.0.1:5500&amp;widgetid=5" id="widget6"></iframe>`;

                    iframe_div.querySelector(".close").addEventListener("click", (event) => {
                        event.target.parentElement.remove();
                    });
                }

                // Initialize and play the video player after a delay to ensure iframe is added to the DOM
                playVideoPlayer(time, video_id, iframe_div);
                setTimeout(function () {
                    //playVideoPlayer(time, video_id, iframe_div);
                }, 1000);
            });
        }

        var image_div = document.createElement("div");
        div.appendChild(image_div);
        image_div.className = "me-linked-images";

        image_div.innerHTML = `<div class="image-head">
                                <span class="link show-images ">Show image notes</span>
                                <span class="link add-image">add image</span>
                            </div>
                            <div class="images-list hide"></div>`;

        let div_show_image = image_div.querySelector(".show-images");
        if (div_show_image) {
            div_show_image.addEventListener("click", () => {
                let ele = image_div.querySelector(".images-list");
                ele.classList.toggle("hide");
            });
        }

        var images = user_data[0].images;
        images.forEach((image) => {
            image.linked_block.forEach((blk) => {
                if (blk.block_id == item.id) {
                    addImageItem(image, image_div);
                }
            });
        });

        // add image icon in the heading
        //var image_div = document.createElement("div");
        //image_div.className = "add-image";
        //div.appendChild(dd);

        //var ss = document.createElement("span");
        //ss.textContent = "+";
        //dd.appendChild(ss);

        // add image icon

        //var ii = document.createElement("i");
        //ii.className = "fa-solid fa-image";
        //div.appendChild(ii);
        var ele = image_div.querySelector(".add-image");
        if (ele) {
            ele.addEventListener("click", (event) => {
                image_url = null;
                var url = getImageURL(event);
                var image_url_interval = setInterval(() => {
                    if (image_url) {
                        clearInterval(image_url_interval);
                        url = image_url;
                        // Code to execute when the condition is true

                        var ids = {
                            block_id: event.target.closest(".heading").id,
                            page_id: event.target.closest(".page-text").id,
                        };
                        const obj = {
                            url: url,
                            id: generateUniqueId(),
                            text: "test image",
                            linked_block: [],
                            linked_questions: [],
                        };
                        obj.linked_block.push(ids);

                        if (!user_data[0].images) user_data[0].images = [];
                        user_data[0].images.push(obj);
                        saveDataInLocale("user_data", user_data);

                        addImageItem(obj, image_div);
                        if (false) {
                            var div_images_list = image_div.querySelector(".images-list");

                            let div1 = document.createElement("div");
                            div1.className = "me-image me-dis-flex-co";
                            div_images_list.appendChild(div1);

                            let div2 = document.createElement("div");
                            div2.className = "top me-dis-flex";
                            div1.appendChild(div2);

                            let span1 = document.createElement("span");
                            span1.className = "update link";
                            span1.textContent = "update";
                            div2.appendChild(span1);

                            let span2 = document.createElement("span");
                            span2.className = "delete link";
                            span2.textContent = "delete";
                            div2.appendChild(span2);

                            let div3 = document.createElement("div");
                            div3.className = "image";
                            div1.appendChild(div3);

                            var img = document.createElement("img");
                            img.src = url;
                            img.id = obj.id;
                            img.className = "me-image";
                            div3.appendChild(img);

                            image_div.querySelector(".show-image").classList.remove("hide");
                        }

                        var heading_ele = event.target.closest(".heading");

                        var img_div = image_div.querySelector(".images-list");
                        if (false && !img_div) {
                            var img_div = document.createElement("div");
                            img_div.className = "linked-images";
                            //heading_ele..insertBefore(img_div, heading_ele.children[0]);
                            heading_ele.parentElement.insertBefore(img_div, heading_ele.parentElement.children[1]);

                            var img_span = document.createElement("span");
                            img_span.className = "linked-images-link link";
                            img_span.textContent = "Show linked image notes";
                            img_div.appendChild(img_span);

                            img_span.addEventListener("click", (event) => {
                                var dd = img_div.querySelector(".linked-images-list");
                                if (!dd) {
                                    var dd = document.createElement("div");
                                    dd.className = "linked-images-list";
                                    img_div.appendChild(dd);
                                }
                                dd.innerHTML = "";
                                var block_id = event.target.closest(".heading").id;
                                user_data[0].images.forEach((img) => {
                                    if (img.block_id == block_id) {
                                        let ii = document.createElement("i");
                                        ii.className = "image";
                                        ii.src = img.url;
                                        dd.appendChild(ii);
                                    }
                                });
                            });
                        }
                    }
                }, 1000);
            });
        }
    } else {
        var span = document.createElement("span");
        div.appendChild(span);
        span.id = item.id;
        span.setAttribute("page-id", item.page_id);
        //span.className = `${item.type} block level-${level} me-dis-flex-co`;
        span.className = `${item.type} block level-${level} me-dis-flex-co`;
    }

    if (false) {
        span.classList.add(`heading`);
        span.parentElement.id = item.id;
        span.parentElement.classList.remove("me-dis-flex-co");
        span.parentElement.classList.add("heading");
        if (item.video_id) {
            var i = document.createElement("i");
            i.className = "fa-brands fa-youtube video";
            i.id = item.video_id;
            i.setAttribute("time", item.time);
            div.appendChild(i);
            i.addEventListener("click", (event) => {
                var i_ele = event.target;
                var video_id = i_ele.id;
                var time = parseInt(i_ele.getAttribute("time"));

                var page_div = i_ele.closest(".page-content");
                var iframe_div = page_div.querySelector(".page-iframe");
                var iframe = page_div.querySelector(".page-iframe iframe");

                if (true || !iframe_div || iframe.src.indexOf(video_id) == -1) {
                    if (iframe_div) iframe_div.remove();
                    iframe_div = document.createElement("div");
                    iframe_div.className = "page-iframe";
                    page_div.insertBefore(iframe_div, page_div.children[1]);
                    //iframe_div.innerHTML = ` <span class="close">X close video</span> <iframe class="rm-iframe rm-video-player" frameborder="0" allowfullscreen="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" title="THE LIVING WORLD in 1 Shot: FULL CHAPTER COVERAGE (Theory+PYQs) ||  Prachand NEET 2024" width="640" height="360" src="https://www.youtube.com/embed/${video_id}?enablejsapi=1&amp;origin=http://silju.in&amp;widgetid=5" id="widget6"></iframe>`;
                    iframe_div.innerHTML = ` <span class="close">X close video</span> <iframe class="rm-iframe rm-video-player" frameborder="0" allowfullscreen="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" title="THE LIVING WORLD in 1 Shot: FULL CHAPTER COVERAGE (Theory+PYQs) ||  Prachand NEET 2024" width="640" height="360" src="https://www.youtube.com/embed/${video_id}?enablejsapi=1&amp;origin=http://127.0.0.1:5500&amp;widgetid=5" id="widget6"></iframe>`;

                    iframe_div.querySelector(".close").addEventListener("click", (event) => {
                        event.target.parentElement.remove();
                    });
                }

                // Initialize and play the video player after a delay to ensure iframe is added to the DOM
                playVideoPlayer(time, video_id, iframe_div);
                setTimeout(function () {
                    //playVideoPlayer(time, video_id, iframe_div);
                }, 1000);
            });
        }

        var dd = document.createElement("div");
        dd.className = "add-image";
        //div.appendChild(dd);

        var ss = document.createElement("span");
        ss.textContent = "+";
        //dd.appendChild(ss);

        var ii = document.createElement("i");
        ii.className = "fa-solid fa-image";
        div.appendChild(ii);

        ii.addEventListener("click", (event) => {
            var url = getImageURL(event);
            var ids = {
                block_id: event.target.closest(".heading").id,
                page_id: event.target.closest(".page-text").id,
            };
            const obj = {
                url: url,
                text: "test image" + generateUniqueId,
                linked_block: [],
                linked_questions: [],
            };
            obj.linked_block.push(ids);

            if (!user_data[0].images) user_data[0].images = [];
            user_data[0].images.push(obj);
            saveDataInLocale("user_data", user_data);

            var heading_ele = event.target.closest(".heading");
            var img_div = heading_ele.querySelector(".linked-images");
            if (!img_div) {
                var img_div = document.createElement("div");
                img_div.className = "linked-images";
                heading_ele.insertBefore(img_div, heading_ele.children[0]);

                var img_span = document.createElement("span");
                img_span.className = "linked-images-link link";
                img_span.textContent = "Show linked image notes";
                img_div.appendChild(img_span);

                img_span.addEventListener("click", (event) => {
                    var dd = img_div.querySelector(".linked-images-list");
                    if (!dd) {
                        var dd = document.createElement("div");
                        dd.className = "linked-images-list";
                        img_div.appendChild(dd);
                    }
                    dd.innerHTML = "";
                    var block_id = event.target.closest(".heading").id;
                    user_data[0].images.forEach((img) => {
                        if (img.block_id == block_id) {
                            let ii = document.createElement("i");
                            ii.className = "image";
                            ii.src = img.url;
                            dd.appendChild(ii);
                        }
                    });
                });
            }
        });
    }

    span.innerHTML = getHTMLFormattedText(item.text);

    var icons = document.createElement("div");
    icons.className = "icons hide me-dis-flex";
    div.appendChild(icons);

    var i = document.createElement("i");
    i.className = "fa-regular fa-copy";
    icons.appendChild(i);
    i.addEventListener("click", (event) => {
        var span = event.target.closest(".me-block").querySelector("span.block");
        var id = span.id + ":" + span.getAttribute("page-id");
        copyToClipboard(id);
        popupAlert("block id copied to clipboard");
    });

    var children = item.children;
    if (children.length) {
        var cspan = document.createElement("div");
        cspan.className = "children";
        target.appendChild(cspan);
        //div.appendChild(cspan);
        children.forEach((child) => {
            loadPageText(child, cspan, level + 1);
        });
    }
}
function getHTMLFormattedText(text) {
    if (!text) text = "";
    // Replace [[ and ]] with an empty string
    text = text.replace(/\[\[|\]\]/g, "");

    // Convert **hello** to bold <span>
    text = text.replace(/\*\*(.*?)\*\*/g, '<span class="me-bold">$1</span>');

    // Convert ^^hello^^ to highlight <span>
    text = text.replace(/\^\^(.*?)\^\^/g, '<span class="me-highlight">$1</span>');

    // Convert ![text](src_link) to <img>
    text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');

    // Convert [text](link) to <a>
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    // Convert \n to <br>
    text = text.replace(/\n/g, "<br>");

    return text;
}

// KKK
var que_id = "yaycm9nLQc";
function addLinkedBlockToQuestion() {
    var que = fil_ques[curr_que_index];
    if (!que.linked_blocks) que.linked_blocks = [];
    que.linked_blocks = [{ page_id: "M9EQyRj_r", block_id: "YhbI9oDG6" }];
}

function getBlockText(page_id, block_id) {
    var page_data = [];
    pages_data.forEach((page) => {
        if (page.id == page_id) {
            page_data = page.data;
        }
    });
    var block_data = null;

    for (let i = 0; i < page_data.length; i++) {
        const result = getBlockData(page_data[i], block_id);
        if (result) return result; // Return as soon as the block is found
    }
    return block_data;
}

function getBlockData(block, block_id) {
    if (block.id == block_id) {
        //console.log(block.text);
        return block.text;
    }
    if (block.children.length) {
        for (let i = 0; i < block.children.length; i++) {
            const result = getBlockData(block.children[i], block_id);
            if (result) return result; // Return as soon as the block is found
        }
    }
}

function openNotePage(que) {
    var block = que.linked_blocks[0];
    var page_id = block.page_id;
    var block_id = block.block_id;
    openNotesPageById(page_id, block_id);
}

function openNotesPageById(page_id, block_id) {
    let ele = document.querySelector(".page.notes .index-tags");
    if (ele) ele.classList.remove("open");

    var data = [];
    for (var i = 0; i < pages_data.length; ++i) {
        if (page_id == pages_data[i].id) {
            data = pages_data[i];
            break;
        }
    }

    var div = document.createElement("div");
    div.id = data.id;
    div.className = "me-block me-page-title";

    ele = document.querySelector(".page-text");
    if (ele) {
        ele.innerHTML = "";
        ele.appendChild(div);
    } else {
        console.error(" 'div.page-text' not found to append 'page-title' ");
        return;
    }

    div.innerHTML = getBlockHTMLTemplate();
    setBlockIconsEvents(div);
    addBlockLinkedItems(div);

    ele = div.querySelector(".me-block-text .text-inner");
    ele.innerHTML = getHTMLFormattedText(data.page_title);

    // block data

    data = data.data;
    ele = div.querySelector(".children"); // target_element
    data.forEach((block) => {
        //cspan = document.createElement("span");
        //cspan.className = "children";
        //tar.appendChild(cspan);
        loadPageText2(block, ele, 0);
    });
    /*
    var div_page = document.createElement("div");
    div_page.className = "page-title";
    div_page.id = data.id; // page_id =
    div_page.innerHTML = getHTMLFormattedText(data.page_title); //page_title
    data = data.data;
    var tar = document.querySelector(".page-text");
    tar.innerHTML = "";
    //tar.classList.remove("hide");
    tar.appendChild(div_page);

    var cspan = document.createElement("span");
    cspan.className = "children-blocks";
    tar.appendChild(cspan);
    tar = cspan;
    data.forEach((d) => {
        cspan = document.createElement("span");
        cspan.className = "children";
        tar.appendChild(cspan);
        loadPageText(d, cspan, 0);
    });*/
    openPage("notes");
    document.querySelector("div.page-text").classList.remove("hide");
    if (block_id) {
        block_id = escapeCSSSelector(block_id);
        var block_ele = document.querySelector(`#${block_id}`);
        scrollToView(block_ele);
    }
}

function openNotesPageById2(page_id, block_id) {
    // first close the sidebar if it is open
    var ele = document.querySelector(".page.notes .index-tags");
    if (ele) ele.classList.remove("open");

    //load page data from pages_data[]
    var data = [];
    for (var i = 0; i < pages_data.length; ++i) {
        if (page_id == pages_data[i].id) {
            data = pages_data[i];
            break;
        }
    }

    var div = document.createElement("div");
    div.id = data.id;
    div.className = "me-block me-page-title";

    ele = document.querySelector(".page-text");
    if (ele) {
        ele.innerHTML = "";
        ele.appendChild(div);
    } else {
        console.error(" 'div.page-text' not found to append 'page-title' ");
        return;
    }

    div.innerHTML = `<div class="me-block-main">
                    <div class="me-block-text">
                        <span></span>
                    </div>
                    <div class="me-block-icons">
                        <span class="plus">+</span>
                        <div class="add">
                            <span class="label">Add items:</span>
                            <div class="icons">
                                <i class="fa-brands fa-youtube video"></i>
                                <i class="fa-solid fa-image image"></i>
                                <i class="fa-solid fa-link link"></i>
                            </div>
                            <div class="inputs hide">
                                <input type="text" class="link-item" />
                                <input type="text" class="text" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="children"></div>`;

    ele = div.querySelector(".me-block-text span");
    ele.innerHTML = getHTMLFormattedText(data.page_title);

    // block data
    data = data.data;
    ele = div.querySelector(".children"); // target_element
    data.forEach((block) => {
        //cspan = document.createElement("span");
        //cspan.className = "children";
        //tar.appendChild(cspan);
        loadPageText(block, ele, 0);
    });
    openPage("notes");

    var cspan = document.createElement("span");
    cspan.className = "children-blocks";
    tar.appendChild(cspan);
    tar = cspan;

    document.querySelector("div.page-text").classList.remove("hide");
    if (block_id) {
        block_id = escapeCSSSelector(block_id);
        var block_ele = document.querySelector(`#${block_id}`);
        scrollToView(block_ele);
    }
}

function scrollToView(ele) {
    ele.scrollIntoView({
        behavior: "smooth", // Optional: Smooth scrolling behavior
        block: "center", // Optional: Scroll to the top of the element
    });
    debugger;
    if (ele.classList.contains("me-block")) {
        ele.querySelector(".me-block-main").classList.add("focus");
    } else {
        ele.classList.add("focus");
    }

    setTimeout(() => {
        ele.classList.remove("focus");
    }, 5000);
}

function openTestQuestion() {
    var id = "oyxgdCVRPx";
    var que = getQuestionById(id);
    fil_ques[curr_que_index] = que;
    var tar = document.querySelector(".page.random .que-text");
    //getMCQQuestionElement(fil_ques[curr_que_index], tar, "main");
    displayQuestion(que);
}

var me_video_player;
function playVideoPlayer__(time, video_id, target) {
    // Initialize the YouTube player using the IFrame API
    function initializeYouTubePlayer() {
        const iframe = target.querySelector("iframe");
        if (!iframe) {
            console.error("Iframe not found in the target element.");
            return;
        }

        //me_video_player = new YT.Player(iframe.id, {
        var me_video_player = new YT.Player(iframe.id, {
            events: {
                onReady: function (event) {
                    // Seek to the specified time and play the video
                    event.target.seekTo(time);
                    event.target.playVideo();
                },
                onError: function (event) {
                    console.error("YouTube Player Error:", event.data);
                    // Additional error logging
                    switch (event.data) {
                        case 2:
                            console.error("Invalid parameter. Please ensure the video ID is correct.");
                            break;
                        case 5:
                            console.error("HTML5 player issue.");
                            break;
                        case 100:
                            console.error("Video not found.");
                            break;
                        case 101:
                        case 150:
                            console.error("Video not allowed to be played in embedded players.");
                            break;
                        default:
                            console.error("Unknown error.");
                            break;
                    }
                },
            },
            playerVars: {
                autoplay: 1,
                start: time,
            },
        });
    }

    // Check if the YouTube IFrame API script is already loaded
    if (typeof YT === "undefined" || typeof YT.Player === "undefined") {
        // Load the YouTube IFrame API script
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        // Set the onYouTubeIframeAPIReady function to initialize the player
        window.onYouTubeIframeAPIReady = function () {
            initializeYouTubePlayer();
        };
    } else {
        // The YouTube IFrame API script is already loaded, initialize the player
        initializeYouTubePlayer();
    }
}
function playVideoPlayer_____(time, video_id, target) {
    // Initialize the YouTube player using the IFrame API
    function initializeYouTubePlayer() {
        const iframe = target.querySelector("iframe");
        if (!iframe) {
            console.error("Iframe not found in the target element.");
            return;
        }

        // If the player is already initialized, just seek and play
        if (iframe.me_video_player) {
            iframe.me_video_player.seekTo(time);
            iframe.me_video_player.playVideo();
            return;
        }

        // Initialize the player for the first time
        iframe.me_video_player = new YT.Player(iframe.id, {
            events: {
                onReady: function (event) {
                    // Seek to the specified time and play the video
                    event.target.seekTo(time);
                    event.target.playVideo();
                },
                onError: function (event) {
                    console.error("YouTube Player Error:", event.data);
                    // Additional error logging
                    switch (event.data) {
                        case 2:
                            console.error("Invalid parameter. Please ensure the video ID is correct.");
                            break;
                        case 5:
                            console.error("HTML5 player issue.");
                            break;
                        case 100:
                            console.error("Video not found.");
                            break;
                        case 101:
                        case 150:
                            console.error("Video not allowed to be played in embedded players.");
                            break;
                        default:
                            console.error("Unknown error.");
                            break;
                    }
                },
            },
            playerVars: {
                autoplay: 1,
                start: time,
            },
        });
    }

    // Check if the YouTube IFrame API script is already loaded
    if (typeof YT === "undefined" || typeof YT.Player === "undefined") {
        // Load the YouTube IFrame API script
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        // Set the onYouTubeIframeAPIReady function to initialize the player
        window.onYouTubeIframeAPIReady = function () {
            initializeYouTubePlayer();
        };
    } else {
        // The YouTube IFrame API script is already loaded, initialize the player
        initializeYouTubePlayer();
    }
}
var video_player = null;
var old_video_block_id = "";
function playVideoPlayer(time, video_id, target) {
    debugger;
    const iframe = target.querySelector("iframe");
    // If the player is already initialized and the video ID matches, just seek and play
    let block_id = target.closest(".me-block").id;
    let new_video_block_id = block_id + video_id;

    if (video_player && old_video_block_id === new_video_block_id) {
        video_player.seekTo(time);
        video_player.playVideo();
        return;
    }
    if (video_player && old_video_block_id !== new_video_block_id) {
        //video_player.destroy();
        video_player.pauseVideo();
        video_player = null;
        initializeYouTubePlayer(time, video_id, target);
        return;
    }
    initializeYouTubePlayer(time, video_id, target);
    /*
    if (iframe.me_video_player && old_video_block_id === new_video_block_id) {
        iframe.me_video_player.seekTo(time);
        iframe.me_video_player.playVideo();
        return;
    }

    // If the player is initialized but the video ID does not match, destroy the existing player
    if (iframe.me_video_player && old_video_block_id !== new_video_block_id) {
        iframe.me_video_player.destroy();
        iframe.me_video_player = null;
        //initializeYouTubePlayer();
        //return;
    }
    */
}
function initializeYouTubePlayer(time, video_id, target) {
    // Initialize the player with the new video ID
    const iframe = target.querySelector("iframe");
    video_player = new YT.Player(iframe.id, {
        videoId: video_id, // Set the video ID here
        events: {
            onReady: function (event) {
                // Seek to the specified time and play the video
                event.target.seekTo(time);
                event.target.playVideo();
            },
        },
        playerVars: {
            autoplay: 1,
            start: time,
        },
    });

    // Store the video ID for future reference
    //iframe.me_video_player.videoId = video_id;
    let block_id = target.closest(".me-block").id;
    old_video_block_id = block_id + video_id;
}

/*
function playVideoPlayer(time, video_id, target) {
    // Initialize the YouTube player using the IFrame API
    function initializeYouTubePlayer() {
        const iframe = target.querySelector("iframe");
        if (!iframe) {
            console.error("Iframe not found in the target element.");
            return;
        }

        me_video_player = new YT.Player(iframe.id, {
            events: {
                onReady: function (event) {
                    // Seek to the specified time and play the video
                    event.target.seekTo(time);
                    event.target.playVideo();
                },
                onError: function (event) {
                    console.error("YouTube Player Error:", event.data);
                },
            },
            playerVars: {
                autoplay: 1,
                start: time,
            },
        });
    }

    // Check if the YouTube IFrame API script is already loaded
    if (typeof YT === "undefined" || typeof YT.Player === "undefined") {
        // Load the YouTube IFrame API script
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        // Set the onYouTubeIframeAPIReady function to initialize the player
        window.onYouTubeIframeAPIReady = function () {
            initializeYouTubePlayer();
        };
    } else {
        // The YouTube IFrame API script is already loaded, initialize the player
        initializeYouTubePlayer();
    }
}

/*
function playVideoPlayer(time, video_id, target) {
    // Initialize the YouTube player using the IFrame API
    function initializeYouTubePlayer() {
        const iframe = target.querySelector("iframe");
        me_video_player = new YT.Player(iframe.id, {
            events: {
                onReady: function (event) {
                    // Seek to the specified time and play the video
                    event.target.seekTo(time);
                    event.target.playVideo();
                },
            },
            playerVars: {
                autoplay: 1,
                start: time,
            },
        });
    }

    // Check if the YouTube IFrame API script is already loaded
    if (typeof YT === "undefined" || typeof YT.Player === "undefined") {
        // Load the YouTube IFrame API script
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        // Set the onYouTubeIframeAPIReady function to initialize the player
        window.onYouTubeIframeAPIReady = function () {
            initializeYouTubePlayer();
        };
    } else {
        // The YouTube IFrame API script is already loaded, initialize the player
        initializeYouTubePlayer();
    }
}

function playVideoPlayer(time, video_id, target) {
    // Function to check if the iframe is ready
    function checkIframeReady() {
        const iframe = target.querySelector("iframe");
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        if (iframeDocument.readyState === "complete") {
            // The iframe is ready, initialize the YouTube player
            initializeYouTubePlayer();
        } else {
            // Wait for the iframe to be ready
            setTimeout(checkIframeReady, 100);
        }
    }

    // Initialize the YouTube player using the IFrame API
    function initializeYouTubePlayer() {
        const iframe = target.querySelector("iframe");
        player = new YT.Player(iframe, {
            events: {
                onReady: function (event) {
                    // Seek to the specified time and play the video
                    event.target.seekTo(time);
                    event.target.playVideo();
                },
            },
            playerVars: {
                autoplay: 1,
                start: time,
            },
        });
    }

    // Check if the YouTube IFrame API script is already loaded
    if (typeof YT === "undefined" || typeof YT.Player === "undefined") {
        // Load the YouTube IFrame API script
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        // Set the onYouTubeIframeAPIReady function to initialize the player
        window.onYouTubeIframeAPIReady = function () {
            checkIframeReady();
        };
    } else {
        // The YouTube IFrame API script is already loaded, initialize the player
        checkIframeReady();
    }
}
/*
function playVideoPlayer(time, video_id, target) {
    // Initialize the YouTube player using the IFrame API
    function initializeYouTubePlayer() {
        const iframe = target.querySelector("iframe");
        if (!iframe) {
            console.error("Iframe not found inside the target element.");
            return;
        }

        const player = new YT.Player(iframe, {
            events: {
                onReady: function (event) {
                    // Seek to the specified time and play the video
                    event.target.seekTo(time);
                    event.target.playVideo();
                },
            },
            playerVars: {
                autoplay: 1,
                start: time,
            },
        });
    }

    // Check if the YouTube IFrame API script is already loaded
    if (typeof YT === "undefined" || typeof YT.Player === "undefined") {
        // Load the YouTube IFrame API script
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        // Set the onYouTubeIframeAPIReady function to initialize the player
        window.onYouTubeIframeAPIReady = function () {
            initializeYouTubePlayer();
        };
    } else {
        // The YouTube IFrame API script is already loaded, initialize the player
        initializeYouTubePlayer();
    }
}*/

function openAddNewQuestion() {
    openPage("add");
    var page_ele = document.querySelector("div.page.add");
    if (!page_ele.children.length) page_ele.innerHTML = getAddNewQuestionHTMLTemplate();

    page_ele.querySelector(".add-que-btn").addEventListener("click", (event) => {
        //var page_ele = (document.querySelector("div.page.add").innerHTML = getAddNewQuestionHTMLTemplate());
        var question = page_ele.querySelector(".question").value.trim();
        var options = [];
        page_ele.querySelectorAll("div.option").forEach((opt) => {
            var obj = {
                id: generateUniqueId(),
                text: opt.children[1].value.trim(),
            };

            if (opt.children[0].checked) {
                obj.text = obj.text + " #ans";
            }
            options.push(obj);
        });
        var tags = [];
        var explanation = page_ele.querySelector(".explanation").value.trim();
        var parts = explanation.split(":");
        var linked_blocks = [];
        parts.forEach((text) => {
            var pattern = /^[a-zA-Z0-9_-]{9}:[a-zA-Z0-9_-]{9}$/;
            if (pattern.test(text)) {
                // Split the text into an array by the colon (":")
                var arr = text.split(":");

                // Create the object with page_uid and block_id
                const obj = {
                    block_id: arr[0],
                    page_id: arr[1],
                };

                // Return the object
                linked_blocks.push(obj);
            }
        });

        var video_exp = page_ele.querySelector(".video-link").value.trim();
        if (video_exp != "") {
            var obj = getYoutubeObj(text);
            var video_id = obj.video_id;
            var obj2 = getLinkedVideoObjectById(video_id);
            if (obj2) {
                var is_present = false;
                obj2.linked_questions.forEach((item) => {
                    if (item.que_id == curr_ques.id) {
                        is_present = true;
                    }
                });
                if (!is_present) {
                    obj2.linked_questions.push({
                        time: obj.time,
                        que_id: curr_ques.id,
                    });
                }
            } else {
                obj2 = {
                    id: generateUniqueId(),
                    video_id: obj.video_id,
                    linked_questions: [],
                };
                obj2.linked_questions.push({
                    time: obj.time,
                    que_id: curr_ques.id,
                });
                video_links_data.push(obj2);
                curr_ques.linked_video_id = obj2.id;
            }
            saveDataInLocale("video_links_data", video_links_data);
        }
        var username = "elahi";
        var new_que_obj = {
            id: generateUniqueId(),
            create_date: getTodayDate(),
            question: question,
            options: options,
            tags: tags,
            linked_blocks: linked_blocks,
            explanation: explanation,
            video_explanation: video_explanation,
            created_by: username,
        };
        new_ques.unshift(new_que_obj);
        popupAlert("new question is added");
        saveDataInLocale("new_ques", new_ques);
    });
}
function getYoutubeObj(text) {
    let videoId, timeInSeconds;

    // Extract the video ID from the URL
    const urlMatch = text.match(/(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/);
    if (urlMatch) {
        videoId = urlMatch[1];
    } else {
        throw new Error("Invalid YouTube URL");
    }

    // Extract the time part
    const timeMatch = text.match(/(\d+:\d{1,2}:\d{2}|\d{1,2}:\d{2}|\?t=\d+)/);
    if (timeMatch) {
        const timeStr = timeMatch[0];

        if (timeStr.startsWith("?t=")) {
            // If the format is ?t=430
            timeInSeconds = parseInt(timeStr.substring(3), 10);
        } else {
            // If the format is 1:23:30 or 23:30
            const timeParts = timeStr.split(":").reverse();
            timeInSeconds = 0;
            const multipliers = [1, 60, 3600]; // seconds, minutes, hours

            for (let i = 0; i < timeParts.length; i++) {
                timeInSeconds += parseInt(timeParts[i], 10) * multipliers[i];
            }
        }
    } else {
        throw new Error("Invalid time format");
    }

    return { video_id: videoId, time: timeInSeconds };
}

function getAddNewQuestionHTMLTemplate() {
    return `
           <div class="add-que me-dis-flex-co">
    <label for="question" class="label">Question:</label>
    <textarea id="question" name="question" cols="30" rows="2" class="question"></textarea>

    <div class="options me-dis-flex-co">
      <div class="option me-dis-flex">
        <input type="radio" name="option" class="opt" />
        <input type="text" name="option1" placeholder="Option 1"/>
      </div>
      <div class="option me-dis-flex">
        <input type="radio" name="option" class="opt" />
        <input type="text" name="option2" placeholder="Option 2"/>
      </div>
      <div class="option me-dis-flex">
        <input type="radio" name="option" class="opt" />
        <input type="text" name="option3" placeholder="Option 3"/>
      </div>
      <div class="option me-dis-flex">
        <input type="radio" name="option" class="opt" />
        <input type="text" name="option4" placeholder="Option 4"/>
      </div>
    </div>

    <div class="tags me-dis-flex">
      <input type="text" name="tags" class="add-tags" placeholder="Add tags"/>
    </div>

    <textarea id="explanation" name="explanation" cols="30" rows="2" class="explanation" placeholder="Explanation"></textarea>
    <input type="text" name="video-link" class="video-link" placeholder="YouTube link and time" />

    <button type="button" class="add-que-btn">Add</button>
  </div>
`;
}

function loadPreviousMockResults() {
    /*var tar_ele = document.querySelector(".page.mock .mock-history.list");
    var head = document.querySelector(".mock-history.head");
    addDividerBefore(head);
    head.addEventListener("click", (event) => {
        tar_ele.classList.toggle("hide");
        if (tar_ele.classList.contains("hide")) {
            head.querySelector("i").className = "fa-solid fa-chevron-right";
            head.querySelector("span").textContent = "Show Mock History";
        } else {
            head.querySelector("i").className = "fa-solid fa-chevron-down";
            head.querySelector("span").textContent = "Hide Mock History";
        }
    });*/

    var tar_ele = document.querySelector(".page.mock .mock-history.list");
    tar_ele.innerHTML = "";
    var mocks = user_data[0].mocks;
    if (!mocks) mocks = [];
    mocks.forEach((mock, index) => {
        var div_mock = document.createElement("div");
        div_mock.className = "mock-data me-dis-flex-co";
        div_mock.id = mock.id;
        tar_ele.appendChild(div_mock);

        var span0 = document.createElement("span");
        span0.className = "mock-test-num";
        span0.textContent = `Mock Test ${index + 1}`;
        div_mock.appendChild(span0);

        var span = document.createElement("span");
        span.className = "date label";
        span.textContent = "Attempted Date: " + getFormattedDate(mock.date) + "  (" + getFormattedTime(mock.start_time) + "  -  " + getFormattedTime(mock.end_time) + ")";
        div_mock.appendChild(span);

        var result = mock.result;
        var marks = result.correct_questions * 2 - result.incorrect_questions * 0.6;
        marks = marks.toFixed(1);
        var passingMarks = result.total_questions * 2 * 0.35;
        passingMarks = parseFloat(passingMarks.toFixed(1));
        var marks_display = marks + "/" + result.total_questions * 2;

        var div_result = document.createElement("div");
        div_result.className = "result";
        div_mock.appendChild(div_result);
        div_result.innerHTML = `
                                
                                <div class="me-dis-flex">    
                                    <span>Total questions: </span>
                                    <span>${result.total_questions}</span>
                                </div>
                                <div class="me-dis-flex">
                                    <span>Questions attempted:  </span>
                                    <span>${result.attempted_questions}</span>
                                </div>
                                <div class="me-dis-flex correct">
                                    <span>Correct questions:  </span>
                                    <span>${result.correct_questions}</span>
                                </div>
                                <div class="me-dis-flex incorrect">
                                    <span>Incorrect questions: </span>
                                    <span>${result.incorrect_questions}</span>
                                </div>
                                <div class="me-dis-flex marks">
                                    <span>Total Marks: </span>
                                    <span>${marks_display}</span>
                                </div>
                                `;
        if (marks < passingMarks) {
            div_result.querySelector(".marks").classList.add("failed");
            div_result.querySelectorAll(".marks span")[1].textContent = marks + "/" + result.total_questions * 2 + "  Failed";
        } else {
            div_result.querySelector(".marks").classList.add("passed");
            div_result.querySelectorAll(".marks span")[1].textContent = marks + "/" + result.total_questions * 2 + "  Passed";
        }

        var span2 = document.createElement("span");
        span2.className = "show-que show-prev-mock-ques link";
        span2.textContent = "Show questions";
        div_mock.appendChild(span2);
        span2.addEventListener("click", (event) => {
            showPreviousMockQuestions(event, mock);
        });
    });
}

function showPreviousMockQuestions(event, mock) {
    var div = document.querySelector(".page.mock .index-tags .questions");
    if (!div) {
        let ele = document.querySelector(".page.mock");

        let div1 = document.createElement("div");
        div1.className = "index-tags";
        ele.appendChild(div1);
        div1.innerHTML = `<div class="head">
                            <span> Mock Questions </span>
                            <span class="cross close">X</span>
                         </div>`;
        div1.querySelector(".cross").addEventListener("click", () => {
            div1.remove();
        });

        let div2 = document.createElement("div");
        div2.className = "questions";
        div1.appendChild(div2);
        div = div2;
    }

    div.innerHTML = "";
    // document.createElement("div");
    // div.className = "prev-mock-ques list";
    // mock_div.appendChild(div);

    mock.questions.forEach((item) => {
        var que = getQuestionById(item.id);
        var que_div = displayQuestion(que, div, "prev-mock-que");
        var id = item.selected_option_id;
        //  id = escapeCSSSelector(id);
        var options = que_div.querySelectorAll(".option");
        options.forEach((opt) => {
            if (opt.id == id) {
                opt.click();
            }
        });
        if (item.selected_option_id == "") {
            options.forEach((opt) => {
                opt.classList.add("disabled");
            });
        }

        if (que.page_uid && que.page_uid != "") {
            let span = document.createElement("span");
            span.className = "page-link link";
            let page = "";
            for (var i = 0; i < pages_data.length; i++) {
                if (que.page_uid == pages_data[i].id) {
                    page = pages_data[i];
                    break;
                }
            }
            let page_title = page.page_title;
            let parent_block_uid = que.parent_block_uid ? que.parent_block_uid : null;
            span.textContent = `Open explanation block in notes: "${page_title}"`;

            que_div.appendChild(span);

            span.addEventListener("click", () => {
                openNotesPageById(que.page_uid, parent_block_uid);
            });
        }
    });

    //showIndexTagsList("questions");
    let ele = document.querySelector(".page.mock .index-tags");
    if (ele) ele.classList.add("open");
}

function getFormattedDate(dateStr) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const dateParts = dateStr.split("-");
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10);
    const day = parseInt(dateParts[2], 10);

    const monthName = months[month - 1];
    const daySuffix = getDaySuffix(day);

    return `${monthName} ${day}${daySuffix}, ${year}`;
}

function getDaySuffix(day) {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
        case 1:
            return "st";
        case 2:
            return "nd";
        case 3:
            return "rd";
        default:
            return "th";
    }
}

function getFormattedTime(timeStr) {
    const timeParts = timeStr.split("_");
    const hours = timeParts[0].padStart(2, "0");
    const minutes = timeParts[1].padStart(2, "0");

    return `${hours}:${minutes}`;
}

function convertTimeSecondToHour(time) {
    // Calculate hours, minutes, and seconds
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor((time % 3600) / 60);
    let seconds = time % 60;

    // Pad single digit minutes and seconds with a leading zero
    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");

    // Return the formatted time string
    return `${hours}:${minutes}:${seconds}`;
}

function addDividerBefore(element) {
    var div = document.createElement("div");
    div.className = "divider";
    element.parentElement.insertBefore(div, element);
}

function startNewMockTest() {
    document.querySelector(".top").classList.add("hide");
    document.querySelector(".tabs").classList.add("hide");
    document.querySelectorAll(".page.mock > *").forEach((ele) => {
        ele.classList.add("hide");
        if (ele.classList.contains("mock-test-sec")) ele.classList.remove("hide");
    });
    var ele = document.querySelector(".page.mock .mock-test-sec");
    ele.innerHTML = getMockTestHTMLTemplate();

    ele.querySelector(".cross").addEventListener("click", () => {
        document.querySelector(".top").classList.remove("hide");
        document.querySelector(".tabs").classList.remove("hide");
        //openMockTestPage("cross");

        document.querySelectorAll(".page.mock > *").forEach((ele) => {
            ele.classList.remove("hide");
            if (ele.classList.contains("mock-test-sec")) ele.classList.add("hide");
            if (ele.classList.contains("list")) ele.classList.add("hide");
            if (ele.classList.contains("head")) {
                while (ele.querySelector("i").className.indexOf("right") == -1) {
                    ele.click();
                }
            }
        });
    });
    var number_of_questions_for_mock = 20;
    var dot_target_ele = document.querySelector(".que-list-dots");
    for (var i = 0; i < number_of_questions_for_mock; i++) {
        var div = document.createElement("div");
        div.className = "que-dot me-dis-flex unselected";
        div.textContent = i + 1;
        dot_target_ele.append(div);
        div.addEventListener("click", (event) => {
            var i = parseInt(event.target.textContent, 10);
            var ele = document.querySelectorAll(".mock-test .que-text .que-div");
            ele = ele[i - 1];
            ele.scrollIntoView({
                behavior: "smooth", // Optional: Smooth scrolling behavior
                block: "start", // Optional: Scroll to the top of the element
            });
        });
    }
    setTimer(number_of_questions_for_mock / 2);
    fil_ques = que_data.slice(0, 20);
    var mock_obj = {
        id: generateUniqueId(),
        date: getTodayDate(),
        start_time: getCurrentTime(),
        end_time: "",
        questions: [],
        result: {
            total_questions: "",
            attempted_questions: "",
            correct_questions: "",
            incorrect_questions: "",
        },
    };

    if (!user_data[0].mocks) user_data[0].mocks = [];
    user_data[0].mocks.unshift(mock_obj);
    var que_arr = [];
    que_arr = user_data[0].mocks[0].questions;
    fil_ques.forEach((que) => {
        var obj = {
            id: que.id,
            selected_option_id: "",
            answer_option_id: "",
            time_taken: "",
        };
        que_arr.push(obj);
        var target_ele = document.querySelector(".mock-test .que-text");
        //var que_div = getMCQQuestionElement(que, target_ele, "mock");
        displayQuestion(que, target_ele, "mock");
    });

    document.querySelector(".page.mock-test .submit-test").addEventListener("click", () => {
        user_data[0].mocks[0].end_time = getCurrentTime();
        var que_arr = user_data[0].mocks[0].questions;

        document.querySelectorAll(".mock-test-sec .que-list .que-div").forEach((que_ele, index) => {
            que_arr[index].id = que_ele.id;
            var options = que_ele.querySelectorAll(".option");
            options.forEach((option) => {
                if (option.classList.contains("selected")) que_arr[index].selected_option_id = option.id;
                if (option.classList.contains("ans")) que_arr[index].answer_option_id = option.id;
            });
        });
        saveDataInLocale("user_data", user_data);

        var total_questions = que_arr.length;
        var questions_attempted = 0;
        var questions_unattempted = 0;
        var correct_questions = 0;
        var wrong_questions = 0;
        que_arr.forEach((que) => {
            if (que.selected_option_id != "") {
                ++questions_attempted;
                if (que.selected_option_id == que.answer_option_id) ++correct_questions;
                else ++wrong_questions;
            } else {
                ++questions_unattempted;
            }
        });
        var result = user_data[0].mocks[0].result;
        result.total_questions = total_questions;
        result.attempted_questions = questions_attempted;
        result.correct_questions = correct_questions;
        result.incorrect_questions = wrong_questions;

        saveDataInLocale("user_data", user_data);
        document.querySelector(".mock-test-sec").innerHTML = endMockTestHTMLTemplate();

        document.getElementById("total-questions").textContent = total_questions;
        document.getElementById("questions-attempted").textContent = questions_attempted;
        document.getElementById("questions-unattempted").textContent = questions_unattempted;
        document.getElementById("correct-questions").textContent = correct_questions;
        document.getElementById("wrong-questions").textContent = wrong_questions;

        function animateBar(element, percentage) {
            element.style.width = "0";
            setTimeout(() => {
                element.style.width = percentage + "%";
            }, 100);
        }

        // Calculate percentages
        var correct_percentage = (correct_questions / total_questions) * 100;
        var unattempted_percentage = (questions_unattempted / total_questions) * 100;
        var incorrect_percentage = (wrong_questions / total_questions) * 100;

        // Animate bars
        var correctBar = document.getElementById("correct-bar");
        if (correct_questions == 0) {
            correctBar.style.display = "none";
        } else {
            correctBar.textContent = correct_percentage.toFixed(1) + "%";
            animateBar(correctBar, correct_percentage);
        }

        var unattemptedBar = document.getElementById("unattempted-bar");
        if (questions_unattempted == 0) {
            unattemptedBar.style.display = "none";
        } else {
            unattemptedBar.textContent = unattempted_percentage.toFixed(1) + "%";
            animateBar(unattemptedBar, unattempted_percentage);
        }

        var incorrectBar = document.getElementById("incorrect-bar");
        if (wrong_questions == 0) {
            incorrectBar.style.display = "none";
        } else {
            incorrectBar.textContent = incorrect_percentage.toFixed(1) + "%";
            animateBar(incorrectBar, incorrect_percentage);
        }

        document.querySelector(".mock-test-sec .cross").addEventListener("click", () => {
            document.querySelector(".top").classList.remove("hide");
            document.querySelector(".tabs").classList.remove("hide");
            //openMockTestPage("cross");

            document.querySelectorAll(".page.mock > *").forEach((ele) => {
                ele.classList.remove("hide");
                if (ele.classList.contains("mock-test-sec")) ele.classList.add("hide");
                if (ele.classList.contains("list")) ele.classList.add("hide");
                if (ele.classList.contains("head")) {
                    while (ele.querySelector("i").className.indexOf("right") == -1) {
                        ele.click();
                    }
                }
            });
        });
        document.querySelector(".mock-test-sec .show-questions").addEventListener("click", () => {
            que_arr.forEach((que) => {
                var target_ele = document.querySelector(".mock-test-sec .show-que-list");
                //var que_div = getMCQQuestionElement(getQuestionById(que.id), target_ele, "mock-result");
                var que_div = displayQuestion(getQuestionById(que.id), target_ele, "mock-result");
                var id = que.selected_option_id;
                if (id != "") {
                    //var aid = que.answer_option_id;
                    id = escapeCSSSelector(id);
                    que_div.querySelector(`#${id}`).click();
                } else {
                    que_div.querySelectorAll(".option").forEach((opt) => {
                        opt.classList.add("disabled");
                    });
                }
            });
        });
        document.querySelector(".mock-test-sec .start-new-mock").addEventListener("click", () => {
            startNewMockTest();
        });
        //loadPreviousMockResults();
    });
}

function openRandomPractisePage() {
    openPage("random");
    var tar_ele = document.querySelector(".page.random");
    if (!tar_ele.children.length) {
        tar_ele.innerHTML = getRandomPageHTMLTemplate();

        //var ele = tar_ele.querySelector(".head-filter-tag i.fa-search");
        var ele = document.querySelector(".filter-section i.search");
        if (ele) {
            ele.addEventListener("click", (event) => {
                var ele = tar_ele.querySelector(".head-filter-tag");
                Array.from(ele.children).forEach((elem) => {
                    elem.classList.add("hide");
                });

                var input = tar_ele.querySelector(".head-filter-tag input");
                input.classList.remove("hide");
                input.focus();
                input.addEventListener("blur", (event) => {
                    var ele = tar_ele.querySelector(".head-filter-tag");
                    Array.from(ele.children).forEach((elem) => {
                        elem.classList.remove("hide");
                        if (elem == input) elem.classList.add("hide");
                    });
                });
            });
        }

        ele = document.querySelector(".filter-section i.search");
        if (ele) {
            ele.addEventListener("click", (event) => {
                var ele = tar_ele.querySelector(".filter-section div.head");
                Array.from(ele.children).forEach((elem) => {
                    elem.classList.add("hide");
                });

                var input = tar_ele.querySelector(".filter-section input");
                input.classList.remove("hide");
                input.focus();
                input.addEventListener("blur", (event) => {
                    var ele = tar_ele.querySelector(".filter-section div.head");
                    Array.from(ele.children).forEach((elem) => {
                        elem.classList.remove("hide");
                        if (elem == input) elem.classList.add("hide");
                    });
                });
            });
        }

        ele = document.querySelector(".display-filter-tag-list");
        if (ele) {
            ele.addEventListener("click", () => {
                showIndexTagsList("random");
            });
        }
        ele = document.querySelector("i.fa-filter");
        if (ele) {
            ele.addEventListener("click", () => {
                //showIndexTagsList("random");
                let ele = document.querySelector(".page.random .index-tags");
                if (ele) ele.classList.add("open");
            });
        }

        ele = document.querySelector(".filter-section i.filter");
        if (ele) {
            ele.addEventListener("click", () => {
                //showIndexTagsList("random");
                let ele = document.querySelector(".page.random .index-tags");
                if (ele) ele.classList.add("open");
            });
        }

        //displayQuestion();
    }
    //displayQuestion();
}
function showIndexTagsList(type) {
    return;
    var div = document.querySelector(".index-tags");
    if (!div) {
        console.log("No index-tags div");
        return;
    }
    var ee = document.querySelectorAll(".index-tags .me-tag");
    if (!ee) showIndexTagsList();
    div.classList.add("open");
    div.querySelector(".cross").addEventListener("click", () => {
        div.classList.remove("open");
    });

    div.querySelectorAll(".list").forEach((div) => {
        div.classList.add("hide");
        if (div.classList.contains(type)) div.classList.remove("hide");
    });

    if (type == "random") {
        div.querySelector(".head span").textContent = "Filter Tags Index";
    } else if (type == "notes") {
        div.querySelector(".head span").textContent = "Chapter Index";
    } else if (type == "questions") {
        div.querySelector(".head span").textContent = "Mock Questions";
    }
}
function createGlobalVariable(name, value) {
    global[name] = value;
}

function getRandomPageHTMLTemplate() {
    return `<div class="middle main-questions">
                <div class="filter-section">
                    <div class="head">
                        <input type="text" class="filter input hide" placeholder="search filter tags" />
                        <i class="fa-solid fa-search search"></i>
                        <i class="fa-solid fa-filter filter"></i>
                    </div>
                    <div class="filtered-tags hide"></div>
                    <span class="filter-ques-count hide label"></span>
                </div>

                <div class="que-text"></div>
                
            </div>
            <div class="bottom me-dis-flex-co">
                <button class="new-question">✨ New Question</button>
            </div>
            <div class="support-me hide me-dis-flex">
                <i class="fa-solid fa-dollar-sign hide"></i>
                <span> If you like my work, if you feel this app is helping you in any way, please do support me</span>
                <span> support me link</span>
            </div>
            <div class="edit-que"></div>
            `;
}

function displayQuestion(que, tar_ele, type) {
    if (!type || type == "random") {
        if (!que) que = curr_ques;
        else curr_ques = que;
        let ele = document.querySelector(".page.random .que-text");
        if (!ele) document.querySelector(".page.random").innerHTML = getRandomPageHTMLTemplate();
    }

    if (!tar_ele) tar_ele = document.querySelector(".page.random .que-text");
    if (!type) tar_ele.innerHTML = "";

    var que_div = document.createElement("div");
    que_div.className = "que-div";
    que_div.id = que.id;
    tar_ele.appendChild(que_div);

    // question text
    var span = document.createElement("span");
    span.className = "question me-dis-flex";
    que_div.appendChild(span);
    //var tt = getHTMLFormattedText(que.question);
    let text = que.question;
    let lines = text.split("\n");
    let result = "";

    lines.forEach((line) => {
        if (line.trim() === "") {
            result += "<br>";
        } else {
            result += `<span>${line}</span>`;
        }
    });
    var tt = result;
    //tt.appendChild(result);

    var nn = 1;
    if (type == "mock" || type == "mock-result") {
        if (tar_ele.children) nn = tar_ele.children.length;
        nn = nn < 10 ? `0${nn}` : nn;
    } else {
        nn = "Q.";
    }
    let ele = document.querySelector(".filter-section .filtered-tags .tag");
    let ele2 = document.querySelector(".page.random.hide");

    if (ele && !ele2) {
        nn = `Q${curr_que_index + 1}.`;
    }

    span.innerHTML = `<span class="num">${nn}</span>
                      <span class="text">${tt}</span>`;

    if (!type || type == "main") {
        //que_div.querySelector(".question .num").classList.add("hide");
        //que_div.querySelector(".question .text").textContent = "Q. " + que_div.querySelector(".question .text").textContent;
    }

    // mcq options
    var options = document.createElement("div");
    options.className = "options";
    que_div.appendChild(options);

    //shuffleArray(que.options); // shuffle the mcq options every time the question opens

    que.options.forEach((opt, index) => {
        var optionLetters = ["(a)", "(b)", "(c)", "(d)"];
        var text = opt.text.replace(" #ans", "");

        var div = document.createElement("div");
        div.className = "option";
        div.id = opt.id;
        div.innerHTML = `<span>${index + 1}</span>
                        <span class="text">${text}</span>`;
        options.appendChild(div);
        if (opt.text.includes("#ans")) {
            div.classList.add("ans");
        }

        /*var span = document.createElement("span");
        span.className = "option me-cp";
        span.id = opt.id;
        
        var optionText = optionLetters[index] + " " + opt.text.replace(" #ans", "");
        span.textContent = optionText;
        if (opt.text.includes("#ans")) {
            span.classList.add("ans");
        }
        options.appendChild(span);
        */

        if (type == "mock-result") return;

        div.addEventListener("click", (event) => {
            var span = event.target.closest(".option");
            if (type == "mock") {
                var dot = parseInt(span.closest(".que-div").querySelector(".question").children[0].textContent);
                var dot = document.querySelector(".que-list-dots").children[dot - 1];
                span.closest(".que-div")
                    .querySelectorAll(".option")
                    .forEach((opt) => {
                        if (opt != span) opt.classList.remove("selected");
                        dot.classList.remove("selected");
                    });
                if (span.classList.contains("selected")) {
                    span.classList.remove("selected");
                    dot.classList.remove("selected");
                } else {
                    span.classList.add("selected");
                    dot.classList.add("selected");
                }
                return;
            }

            var que_div_ele = span.closest(".que-div"); // tar_ele.querySelector(".que-div");
            span.classList.add("selected");
            if (span.classList.contains("ans")) {
                //span.classList.add("correct-ans");
                span.classList.add("correct");
            } else {
                //span.classList.add("wrong-ans");
                span.classList.add("wrong");
            }

            que_div_ele.querySelectorAll(".option").forEach((optionSpan) => {
                if (optionSpan.classList.contains("ans")) {
                    // optionSpan.classList.add("correct-ans");
                    optionSpan.classList.add("correct");
                }
            });

            que_div_ele.querySelectorAll(".option").forEach((optionSpan) => {
                optionSpan.classList.add("disabled");
            });

            if (!type || type == "random") {
                // showing the explanations for only the random question or question in random page
                // not showing explanations for the mock questions and pre-mock-questions

                //explanation of the id and the value of the ID in the value

                var que_div = document.querySelector(".page.random .que-text .que-div");
                var div = document.createElement("div");
                div.className = "explanations me-dis-flex-co";
                que_div.appendChild(div);
                var exp_div = div;

                var span = document.createElement("span");
                span.className = "label";
                span.textContent = "Explanation:";
                div.appendChild(span);

                if (que.page_uid && que.page_uid != "") {
                    let span = document.createElement("span");
                    span.className = "page-link link";
                    let page = "";
                    for (var i = 0; i < pages_data.length; i++) {
                        if (que.page_uid == pages_data[i].id) {
                            page = pages_data[i];
                            break;
                        }
                    }
                    let page_title = page.page_title;
                    let parent_block_uid = que.parent_block_uid ? que.parent_block_uid : null;
                    span.textContent = `Open Notes: "${page_title}"`;
                    if (parent_block_uid) {
                        let text = getBlockText(que.page_uid, parent_block_uid);
                        if (text) span.innerHTML = getHTMLFormattedText(text);
                    }

                    exp_div.appendChild(span);

                    span.addEventListener("click", () => {
                        openNotesPageById(que.page_uid, parent_block_uid);
                    });
                    if (!page_title) exp_div.classList.add("hide");
                }
                if (que.explanation_id && que.explanation_id != "") {
                    var text = getExplanationTextById(que.explanation_id);
                    let sss = document.createElement("span");
                    sss.className = "explanation-text";
                    sss.textContent = text;
                    div.appendChild(sss);
                }

                if (que.linked_block_id && que.linked_block_id != "") {
                    var obj = getLinkedBlockObjectById(que.linked_block_id);
                    var block_id = obj.block_id;
                    var page_id = obj.page_id;

                    var block_text = getBlockText(block_id, page_id);

                    var div2 = document.createElement("div");
                    div2.className = "me-exp-block me-dis-flex-co";
                    div.appendChild(div2);

                    var span1 = document.createElement("span");
                    span1.className = "link";
                    span1.textContent = "open in notes";
                    div2.appendChild(span1);

                    span1.addEventListener("click", (event) => {
                        //openNotePage(block_id, page_id);
                        openNotesPageById(page_id, block_id);
                    });

                    var span2 = document.createElement("span");
                    span2.className = "exp-text";
                    span2.innerHTML = getHTMLFormattedText(block_text);
                    div2.appendChild(span2);
                }

                if (que.video && que.video != "") {
                    let video_id = que.video.video_id;
                    let time = que.video.time;

                    var tar = span.closest(".que-div").querySelector("div.explanations");
                    if (!tar) {
                        var que_div = document.querySelector(".page.random .que-text .que-div");
                        var div = document.createElement("div");
                        div.className = "explanations me-dis-flex-co";
                        que_div.appendChild(div);
                        tar = div;

                        var span = document.createElement("span");
                        span.className = "label";
                        span.textContent = "Explanation:";
                        div.appendChild(span);
                    }
                    var div = document.createElement("div");
                    div.className = "video-exp-blocks me-dis-flex";
                    tar.appendChild(div);

                    var icon = document.createElement("i");
                    //icon.className = "fa-sharp fa-solid fa-play";
                    icon.className = "fa-brands fa-youtube";
                    div.appendChild(icon);

                    var span = document.createElement("span");
                    span.className = "video";
                    span.textContent = "Click to play the video explanation";
                    div.appendChild(span);

                    div.addEventListener("click", (event) => {
                        var div2 = event.target.closest(".que-div").querySelector("div.explanations .me-iframe");
                        if (div2) div2.remove();
                        div2 = document.createElement("div");
                        div2.className = "video-player me-iframe";
                        tar.appendChild(div2);
                        let iframe = getVideoIframeElement(video_id);
                        div2.appendChild(iframe);
                        playVideoPlayer(time, video_id, div2);

                        //div2.innerHTML = `<iframe class="rm-iframe rm-video-player" frameborder="0" allowfullscreen="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" title="THE LIVING WORLD in 1 Shot: FULL CHAPTER COVERAGE (Theory+PYQs) ||  Prachand NEET 2024" width="640" height="360" src="https://www.youtube.com/embed/${video_id}?enablejsapi=1&amp;origin=http://silju.in&amp;widgetid=5" id="widget6"></iframe>`;
                        //if (testing) div2.innerHTML = `<iframe class="rm-iframe rm-video-player" frameborder="0" allowfullscreen="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" title="THE LIVING WORLD in 1 Shot: FULL CHAPTER COVERAGE (Theory+PYQs) ||  Prachand NEET 2024" width="640" height="360" src="https://www.youtube.com/embed/${video_id}?enablejsapi=1&amp;origin=http://127.0.0.1:5500&amp;widgetid=5" id="widget6"></iframe>`;

                        // Initialize and play the video player after a delay to ensure iframe is added to the DOM
                        // setTimeout(function () {
                        //  playVideoPlayer(time, video_id, div2);
                        // }, 3000);
                        /*
                    div2 = document.createElement("div");
                    div2.className = "video-player me-iframe";
                    tar.appendChild(div2);
                    div2.innerHTML = `<iframe  class="rm-iframe rm-video-player" frameborder="0" allowfullscreen="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" title="THE LIVING WORLD in 1 Shot: FULL CHAPTER COVERAGE (Theory+PYQs) ||  Prachand NEET 2024" width="640" height="360" src="https://www.youtube.com/embed//${video_id}?enablejsapi=1&amp;origin=https%3A%2F%2Fhttp://127.0.0.1:5501&amp;widgetid=5" id="widget6"></iframe>`;
                    //div2.innerHTML = `<iframe id="videoPlayer" class="rm-iframe rm-video-player" frameborder="0" allowfullscreen="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" title="THE LIVING WORLD in 1 Shot: FULL CHAPTER COVERAGE (Theory+PYQs) ||  Prachand NEET 2024" width="640" height="360" src="https://www.youtube.com/embed//${video_id}?enablejsapi=1&amp;origin=https%3A%2F%2Froamresearch.com&amp;widgetid=5" id="widget6"></iframe>`;

                    setTimeout(function () {
                        playVideoPlayer(time, video_id, div2);
                    }, 3000);*/
                    });
                }

                if (que.linked_video_id && que.linked_video_id != "") {
                    var obj = getLinkedVideoObjectById(que.linked_video_id);
                    let video_id = obj.video_id;
                    let time = 0;
                    for (var i = 0; i < obj.linked_questions.length; i++) {
                        if (obj.linked_questions[i].que_id == curr_ques.id) {
                            time = obj.linked_questions[i].time;
                            break;
                        }
                    }

                    var tar = span.closest(".que-div").querySelector("div.explanations");
                    if (!tar) {
                        var que_div = document.querySelector(".page.random .que-text .que-div");
                        var div = document.createElement("div");
                        div.className = "explanations me-dis-flex-co";
                        que_div.appendChild(div);
                        tar = div;

                        var span = document.createElement("span");
                        span.className = "label";
                        span.textContent = "Explanation:";
                        div.appendChild(span);
                    }
                    var div = document.createElement("div");
                    div.className = "video-exp-blocks me-dis-flex";
                    tar.appendChild(div);

                    var icon = document.createElement("i");
                    //icon.className = "fa-sharp fa-solid fa-play";
                    icon.className = "fa-brands fa-youtube";
                    div.appendChild(icon);

                    var span = document.createElement("span");
                    span.className = "video";
                    span.textContent = "Click to play the video explanation";
                    div.appendChild(span);

                    div.addEventListener("click", (event) => {
                        var div2 = event.target.closest(".que-div").querySelector("div.explanations .me-iframe");
                        if (div2) div2.remove();
                        div2 = document.createElement("div");
                        div2.className = "video-player me-iframe";
                        tar.appendChild(div2);
                        //div2.innerHTML = `<iframe class="rm-iframe rm-video-player" frameborder="0" allowfullscreen="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" title="THE LIVING WORLD in 1 Shot: FULL CHAPTER COVERAGE (Theory+PYQs) ||  Prachand NEET 2024" width="640" height="360" src="https://www.youtube.com/embed/${video_id}?enablejsapi=1&amp;origin=http://silju.in&amp;widgetid=5" id="widget6"></iframe>`;
                        if (testing) div2.innerHTML = `<iframe class="rm-iframe rm-video-player" frameborder="0" allowfullscreen="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" title="THE LIVING WORLD in 1 Shot: FULL CHAPTER COVERAGE (Theory+PYQs) ||  Prachand NEET 2024" width="640" height="360" src="https://www.youtube.com/embed/${video_id}?enablejsapi=1&amp;origin=http://127.0.0.1:5500&amp;widgetid=5" id="widget6"></iframe>`;

                        // Initialize and play the video player after a delay to ensure iframe is added to the DOM
                        setTimeout(function () {
                            playVideoPlayer(time, video_id, div2);
                        }, 3000);
                        /*
                    div2 = document.createElement("div");
                    div2.className = "video-player me-iframe";
                    tar.appendChild(div2);
                    div2.innerHTML = `<iframe  class="rm-iframe rm-video-player" frameborder="0" allowfullscreen="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" title="THE LIVING WORLD in 1 Shot: FULL CHAPTER COVERAGE (Theory+PYQs) ||  Prachand NEET 2024" width="640" height="360" src="https://www.youtube.com/embed//${video_id}?enablejsapi=1&amp;origin=https%3A%2F%2Fhttp://127.0.0.1:5501&amp;widgetid=5" id="widget6"></iframe>`;
                    //div2.innerHTML = `<iframe id="videoPlayer" class="rm-iframe rm-video-player" frameborder="0" allowfullscreen="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" title="THE LIVING WORLD in 1 Shot: FULL CHAPTER COVERAGE (Theory+PYQs) ||  Prachand NEET 2024" width="640" height="360" src="https://www.youtube.com/embed//${video_id}?enablejsapi=1&amp;origin=https%3A%2F%2Froamresearch.com&amp;widgetid=5" id="widget6"></iframe>`;

                    setTimeout(function () {
                        playVideoPlayer(time, video_id, div2);
                    }, 3000);*/
                    });
                }
            }
        });
    });
    if (testing && false) {
        var edit_div = document.querySelector(".edit-que");
        edit_div.innerHTML = `<div class="add-explanation  me-dis-flex-co">
                                    <textarea name="explanation" class="explanation" placeholder="explanation" id="" cols="30" rows="4"></textarea>
                                    <input type="text" class="linked-blocks" placeholder="linked-blocks">
                                    <input type="text" class="video-link" placeholder="video link">    
                                    <button class="update-que">update</button>
                                </div>`;

        var arr = [];
        //var data = getDataFromLocale("ssc_other_data");
        //explanation_data = data[0].data;
        explanation_data = getDataFromLocale("explanation_data");
        linked_blocks_data = getDataFromLocale("linked_blocks_data");
        video_links_data = getDataFromLocale("video_links_data");

        explanation_data.forEach((item) => {
            arr.push(item.text + "  ((" + item.id + "))");
        });
        var exp_ele = edit_div.querySelector("textarea.explanation");
        exp_ele.addEventListener("input", (event) => {
            setAutoComplete(event, arr, "explanation");
        });
        // load data

        //explanation value
        let exp_id = curr_ques.explanation_id;
        if (exp_id && exp_id.trim() != "") {
            let exp_text = getExplanationTextById(exp_id);
            exp_ele.value = exp_text;
        } else {
            exp_ele.value = "NO TEXT";
        }

        //Linked Blocks
        var linked_block_ele = edit_div.querySelector(".linked-blocks");
        let linked_block_id = curr_ques.linked_block_id;

        if (linked_block_id && linked_block_id.trim() != "") {
            let obj = getLinkedBlockObjectById(linked_block_id);
            linked_block_ele.value = `${obj.block_id}:${obj.page_id}`;
        } else {
            linked_block_ele.value = "NO ID";
        }

        // video id
        var video_ele = edit_div.querySelector(".video-link");
        let video_obj_id = curr_ques.linked_video_id;

        if (video_obj_id && video_obj_id.trim() != "") {
            let obj = getLinkedVideoObjectById(video_obj_id);
            let video_id = obj.video_id;
            let time = 0;
            for (var i = 0; i < obj.linked_questions.length; i++) {
                if (obj.linked_questions[i].que_id == curr_ques.id) {
                    time = obj.linked_questions[i].time;
                    break;
                }
            }
            video_ele.value = `${video_id} : ${time}`;
        } else {
            video_ele.value = "NO Video";
        }

        var update_btn = document.querySelector(".random .update-que");

        update_btn.addEventListener("click", () => {
            curr_ques.linked_blocks = [];
            var exp_text = document.querySelector(".add-explanation .explanation").value.trim();
            var exp_obj = "";
            if (exp_text != "") {
                var exp_id = getExplanationId(exp_text);
                if (exp_id) {
                    curr_ques.explanation_id = exp_id;
                    var new_exp_text = exp_text.replace(/\(\(.+?\)\)/, "");
                    updateExplanationObject(exp_id, new_exp_text, curr_ques.id);
                } else {
                    exp_obj = {
                        id: generateUniqueId(),
                        text: exp_text,
                        linked_questions: [],
                    };
                    curr_ques.explanation_id = exp_obj.id;
                    exp_obj.linked_questions.push(curr_ques.id);
                    explanation_data.push(exp_obj);
                }
                saveDataInLocale("explanation_data", explanation_data);
            }

            var block_ids = document.querySelector(".add-explanation  .linked-blocks ").value.trim();
            if (block_ids != "") {
                var parts = block_ids.split(":");
                var block_id = parts[0];
                var obj = getLinkedBlockObjectById(block_id);
                if (obj) {
                    if (!obj.linked_questions.includes(curr_ques.id)) obj.linked_questions.push(curr_ques.id);
                    curr_ques.linked_block_id = obj.id;
                } else {
                    obj = {
                        id: generateUniqueId(),
                        block_id: parts[0],
                        page_id: parts[1],
                        linked_questions: [],
                    };
                    curr_ques.linked_block_id = obj.id;
                    obj.linked_questions.push(curr_ques.id);
                    linked_blocks_data.push(obj);
                }
                curr_ques.linked_blocks.push(obj);
                saveDataInLocale("linked_blocks_data", linked_blocks_data);
            }

            var video_exp = document.querySelector(".add-explanation .video-link").value.trim();
            if (video_exp != "") {
                var obj = getYoutubeObj(video_exp);
                var video_id = obj.video_id;
                var obj2 = getLinkedVideoObjectById(video_id);
                if (obj2) {
                    var is_present = false;
                    curr_ques.linked_video_id = obj2.id;
                    obj2.linked_questions.forEach((item) => {
                        if (item.que_id == curr_ques.id) {
                            is_present = true;
                        }
                    });
                    if (!is_present) {
                        obj2.linked_questions.push({
                            time: obj.time,
                            que_id: curr_ques.id,
                        });
                    }
                } else {
                    obj2 = {
                        id: generateUniqueId(),
                        video_id: obj.video_id,
                        linked_questions: [],
                    };
                    obj2.linked_questions.push({
                        time: obj.time,
                        que_id: curr_ques.id,
                    });
                    video_links_data.push(obj2);
                    curr_ques.linked_video_id = obj2.id;
                }
                saveDataInLocale("video_links_data", video_links_data);
            }
            updated_ques.unshift(curr_ques);
            saveDataInLocale("updated_ques", updated_ques);
        });
    }
    if (testing && false && (!que.linked_blocks || !que.linked_blocks.length)) {
        var span = document.createElement("span");
        span.className = "is-linked incorrect";
        span.textContent = "NOT LINKED";
        que_div.appendChild(span);
    }
    return que_div;
}
function getExplanationId(exp_text) {
    const match = exp_text.match(/\(\((.+?)\)\)/);
    return match ? match[1] : null;
}
function updateExplanationObject(exp_id, new_text, que_id) {
    const exp_obj = explanation_data.find((exp) => exp.id === exp_id);
    if (exp_obj) {
        exp_obj.text = new_text;
        if (!exp_obj.linked_questions.contains(que_id)) exp_obj.linked_questions.push(que_id);
        console.log("Explanation object not found");
        saveDataInLocale("explanation_data", explanation_data);
    } else {
        console.log("Explanation object not found");
    }
}
function practiseUpdateQuestions() {
    fil_ques = updated_ques;
    curr_que_index = 0;
    curr_ques = fil_ques[0];
    displayQuestion();
}

var test_data = [];
async function loadDataItems() {
    return;
    var ee = getDataFromLocale("exam");
    if (ee) exam = ee;
    var name = "";
    var isOnline = checkInternetConnection();
    if (isOnline) {
        // load que data
        var filename = `silju_${exam}_questions`;
        var id = gist_id[filename];
        filename = filename + ".json";
        que_data = await getDataFromGit(id, filename);
        name = `${exam}_que_data`;
        if (que_data == null) {
            data = getDataFromLocale(name);
            if (!data) que_data = [];
            que_data = data;
        } else {
            saveDataInLocale(name, que_data);
        }
        console.log("que_data[] loaded");

        // load notes data
        filename = `silju_${exam}_notes`;
        id = gist_id[filename];
        filename = filename + ".json";
        notes_data = await getDataFromGit(id, filename);

        name = `${exam}_notes_data`;
        if (notes_data == null) {
            data = getDataFromLocale(name);
            if (!data) notes_data = [];
            notes_data = data;
        } else {
            saveDataInLocale(name, notes_data);
        }
        console.log("notes_data[] loaded");

        // load other data
        filename = `silju_${exam}_other`;
        id = gist_id[filename];
        filename = filename + ".json";
        other_data = await getDataFromGit(id, filename);

        name = `${exam}_other_data`;
        if (other_data == null) {
            data = getDataFromLocale(name);
            if (!data) other_data = [];
            other_data = data;
        } else {
            saveDataInLocale(name, other_data);
        }
        console.log("other_data[] loaded");
    } else {
        var name = `${exam}_que_data`;
        que_data = getDataFromLocale(name);
        name = `${exam}_notes_data`;
        notes_data = getDataFromLocale(name);
        name = `${exam}_other_data`;
        other_data = getDataFromLocale(name);
    }
    name = `user_data_${exam}`;
    var data = getDataFromLocale(name);
    user_data = data;
    if (!data) user_data = [];

    setTimeout(() => {
        addTagIndexList();
        addChapterIndexList();
        initialLoading();
    }, 1000);
}

async function updateOtherData() {
    var arr = [];
    var data = getDataFromLocale("explanation_data");
    var obj = {
        name: "explanation",
        data: data,
    };
    arr.push(obj);

    data = getDataFromLocale("linked_blocks_data");
    obj = {
        name: "linked_blocks",
        data: data,
    };
    arr.push(obj);

    data = getDataFromLocale("video_links_data");
    obj = {
        name: "video_links",
        data: data,
    };
    arr.push(obj);

    var filename = `silju_${exam}_other`;
    var id = gist_id[filename];
    filename = filename + ".json";
    var name = `${exam}_other_data`;
    saveDataInLocale(name, arr);
    await updateGistFile(filename, id, arr);
}

function openAboutMePage() {
    openPage("about-me");
    var tar_ele = document.querySelector(".page.about-me");
    if (!tar_ele.childNodes.length) {
        var div = document.createElement("div");
        div.className = "me-pic-name";
        tar_ele.appendChild(div);

        var img = document.createElement("img");
        img.src = "./assets/me.jpg";
        div.appendChild(img);

        var span = document.createElement("span");
        span.className = "me-name";
        span.textContent = "Mehboob Elahi";
        div.appendChild(span);

        var id = "mehboobelahi05";
        var link = ["facebook", "twitter", "instagram", "youtube"];

        div = document.createElement("div");
        div.className = "social-media";
        tar_ele.appendChild(div);

        link.forEach((site) => {
            var a = document.createElement("a");
            a.className = `icon ${name}`;
            a.target = "_blank";
            a.href = `https://${site}.com/${id}`;
            div.appendChild(a);
            if (site == "youtube") a.href = `https://www.${site}.com/@${id}/featured`;

            var img = document.createElement("img");
            img.src = `./assets/${site}.png`;
            a.appendChild(img);
        });
        var text = ["Hello everyone, I'm Mehboob Elahi from Kargil, Ladakh. I have developed this app to make your journey of competitive exams easy and joyful, and I hope that it is very useful in your prepration", "About me:", "B.Tech ECE from NIT Warangal", "Software engineer with 3.5 years of experiance in MNCs", "Cleared UPSC prelims", "Currently a govt. employee in the revenue department under UT Ladakh govt."];
        div = document.createElement("div");
        div.className = "about-me-text";
        tar_ele.appendChild(div);
        text.forEach((tt, index) => {
            var span = document.createElement("span");
            span.className = "text-" + index;
            span.textContent = tt;
            div.appendChild(span);
        });
    }
}

function getExplanationTextById(id) {
    for (var i = 0; i < explanation_data.length; i++) {
        if (explanation_data[i].id == id) {
            return explanation_data[i].text;
        }
    }
}
function getLinkedBlockObjectById(id) {
    for (var i = 0; i < linked_blocks_data.length; i++) {
        if (linked_blocks_data[i].id == id) return linked_blocks_data[i];
    }
}
function getLinkedVideoObjectById(id) {
    for (var i = 0; i < video_links_data.length; i++) {
        if (video_links_data[i].id == id) return video_links_data[i];
    }
}

// Image upload
/*
async function uploadImage() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
        const file = e.target.files[0];
        popupAlert("Image is loading...", true);
        setTimeout(function () {
            removePopupAlert();
        }, 10000);

        //interval_save_image = setInterval(saveImage, 1000);
        if (file) {
            const storageRef = ref(storage, `images/${username}/${file.name}`);
            const uploadTask = uploadBytes(storageRef, file);

            uploadTask
                .then(() => {
                    // Upload completed successfully, get the download URL
                    getDownloadURL(storageRef)
                        .then((downloadURL) => {
                            console.log("Image uploaded. URL: " + downloadURL);
                            image_url = downloadURL;
                            return downloadURL;
                        })
                        .catch((error) => {
                            console.error("Error getting download URL:", error);
                        });
                })
                .catch((error) => {
                    console.error("Error uploading image:", error);
                });
        }
    };

    input.click();
}

var interval_save_image;
var image_url = "";
async function getImageURL() {
    
    var url = await uploadImage();
    
    var text = "test image is added" + generateUniqueId();
    var obj = {
        url: url,
        text: text,
        linked_block: [],
        linked_questions: [],
    };
    if (!user_data[0].images) user_data[0].images = [];
    user_data[0].images.push(obj);
    saveDataInLocale("user_data", user_data);
}
function saveImage(url) {
    if (image_url != "") {
        image_url = "";
        clearInterval(interval_save_image);
    }
}
*/
async function uploadImage() {
    return new Promise((resolve, reject) => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = (e) => {
            const file = e.target.files[0];
            popupAlert("Image is loading...", true);
            setTimeout(function () {
                removePopupAlert();
            }, 10000);

            if (file) {
                const storageRef = ref(storage, `images/${username}/${file.name}`);
                const uploadTask = uploadBytes(storageRef, file);

                uploadTask
                    .then(() => {
                        // Upload completed successfully, get the download URL
                        getDownloadURL(storageRef)
                            .then((downloadURL) => {
                                console.log("Image uploaded. URL: " + downloadURL);
                                var image_url = downloadURL;
                                resolve(downloadURL);
                            })
                            .catch((error) => {
                                console.error("Error getting download URL:", error);
                                reject(error);
                            });
                    })
                    .catch((error) => {
                        console.error("Error uploading image:", error);
                        reject(error);
                    });
            } else {
                reject(new Error("No file selected"));
            }
        };

        input.click();
    });
}
async function getImageURL(event) {
    try {
        const url = await uploadImage(); // Wait for the URL
        image_url = url;
        if (url) {
            console.log("URL added" + url);
            return url;
            //const text = "test image is added " + generateUniqueId();
        }
    } catch (error) {
        console.error("Error getting image URL:", error);
    }
}

function getVideoIframeElement(video_id) {
    const iframe = document.createElement("iframe");
    iframe.className = "rm-iframe rm-video-player";
    iframe.frameBorder = "0";
    iframe.allowFullscreen = true;
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    iframe.width = "640";
    iframe.height = "360";
    iframe.src = `https://www.youtube.com/embed/${video_id}?enablejsapi=1&amp;origin=http://127.0.0.1:5500&amp;widgetid=5`;
    iframe.id = "widget6";

    return iframe;
}

function getURLParameters(url) {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname.split("/");

    if (pathname.length >= 3) {
        const exam = pathname[2];
        const que_id = pathname[3];
        return { exam, que_id };
    } else {
        return { exam: null, que_id: null };
    }
}

function addTagIndexList() {
    var index_tags = "";
    for (var i = 0; i < other_data.length; i++) {
        if (other_data[i].type == "tags_index") {
            index_tags = other_data[i].data;
        }
    }
    var tar_ele = document.querySelector(".page.random .index-tags .random");

    if (!tar_ele) {
        let ele = document.querySelector(".page.random");

        let div1 = document.createElement("div");
        div1.className = "index-tags";
        ele.appendChild(div1);
        div1.innerHTML = `<div class="head">
                            <span> Tag Index </span>
                            <span class="cross close">X</span>
                         </div>`;
        div1.querySelector(".cross").addEventListener("click", () => {
            div1.classList.remove("open");
        });

        let div2 = document.createElement("div");
        div2.className = "list random";
        div1.appendChild(div2);
        tar_ele = div2;
    }

    index_tags.forEach((tag) => {
        addTagIndexItem(tag, tar_ele, 0);
    });
}
function addTagIndexItem(tag, tar_ele, level) {
    tag = tag.name ? tag : tag[0];
    var children = tag.children;
    var span = "";
    if (children.length) {
        let div = document.createElement("div");
        div.className = `me-tag level-${level}`;
        tar_ele.appendChild(div);

        let div2 = document.createElement("div");
        div2.className = "tag-item";
        div.appendChild(div2);

        let i = document.createElement("i");
        i.className = "arrow-icon fa-solid fa-chevron-right";
        div2.appendChild(i);
        i.addEventListener("click", (event) => {
            let i = event.target;
            let div = i.closest(".me-tag");
            let children_ele = div.querySelector(".tag-children");
            children_ele.classList.toggle("hide");

            if (children_ele.classList.contains("hide")) {
                i.className = "arrow-icon fa-solid fa-chevron-right";
            } else {
                i.className = "arrow-icon fa-solid fa-chevron-down";
            }
        });

        span = document.createElement("span");
        span.className = "link name";
        let name = tag.name;
        if (name.indexOf("[[") == -1) span.className = "name";
        name = name.replace("[[", "").replace("]]", "");
        span.textContent = name.toLowerCase();
        div2.appendChild(span);

        let div3 = document.createElement("div");
        div3.className = "tag-children hide";
        div.appendChild(div3);

        children.forEach((child) => {
            var i = level + 1;
            addTagIndexItem(child, div3, i);
        });
    } else {
        let div = document.createElement("div");
        div.className = `me-tag level-${level}`;
        tar_ele.appendChild(div);

        span = document.createElement("span");
        span.className = "link name";
        let name = tag.name;
        if (name.indexOf("[[") == -1) span.className = "name";
        name = name.replace("[[", "").replace("]]", "");
        span.textContent = name.toLowerCase();
        div.appendChild(span);
    }
    if (span.classList.contains("link")) {
        span.addEventListener("click", () => {
            var tags = [];
            let tag = span.textContent;
            let link_spans = span.closest(".me-tag").querySelectorAll(".name");
            link_spans.forEach((ss) => {
                tags.push(ss.textContent);
            });

            filterQuestionsOnTagBased(tag, tags, span);
            curr_que_index = 0;
            curr_ques = fil_ques[0];
            displayQuestion(curr_ques);
        });
    }
}

function loadTasksPage() {
    openPage("tasks");
    var tar = document.querySelector(".page.tasks");
    var input = tar.querySelector("input");
    if (!input) {
        input = document.createElement("input");
        input.type = "text";
        input.className = "tasks";
        input.placeholder = "Add new task";
        tar.appendChild(input);
        input.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                var item = input.value.trim();
                if (!user_data[0].tasks) user_data[0].tasks = [];
                var tasks = user_data[0].tasks;
                tasks.unshift(item);
                saveDataInLocale("user_data", user_data);
                addTaskItem(item);
                input.value = ""; // Clear the input after adding the task
            }
        });

        let div = document.createElement("div");
        div.className = "tasks-list";
        tar.appendChild(div);

        var tasks = user_data[0].tasks;
        if (!tasks) return;
        tasks.forEach((item) => {
            addTaskItem(item);
        });
    }
}
function addTaskItem(item) {
    let tar = document.querySelector(".tasks-list");

    let div = document.createElement("div");
    div.className = "task";
    tar.appendChild(div);

    let span = document.createElement("span");
    span.className = "check-span";
    div.appendChild(span);
    span.addEventListener("click", () => {
        removeElementFromArray(user_data[0].tasks, item);
        div.remove();
    });

    let span2 = document.createElement("span");
    span2.className = "name";
    span2.textContent = item;
    div.appendChild(span2);
}

function addImageItem(obj, image_div) {
    var div_images_list = image_div.querySelector(".images-list");

    let div1 = document.createElement("div");
    div1.className = "me-image me-dis-flex-co";
    div_images_list.appendChild(div1);

    let div2 = document.createElement("div");
    div2.className = "top me-dis-flex";
    div1.appendChild(div2);

    let span1 = document.createElement("span");
    span1.className = "update link hide";
    span1.textContent = "update";
    div2.appendChild(span1);

    let span2 = document.createElement("span");
    span2.className = "delete link";
    span2.textContent = "delete";
    div2.appendChild(span2);
    span2.addEventListener("click", (event) => {
        let span = event.target;
        let img_id = span.closest(".me-image").querySelector("img").id;
        let block_id = span.closest(".me-block.heading").id;

        if (img_id) {
            var images = user_data[0].images;
            for (let i = 0; i < images.length; i++) {
                let isDeleted = false;
                if (images[i].id == img_id) {
                    let linked_blocks = images[i].linked_block;

                    for (let j = 0; j < linked_blocks.length; j++) {
                        if (linked_blocks[j].block_id == block_id) {
                            removeElementFromArray(linked_blocks, linked_blocks[j]);
                            isDeleted = true;
                            saveDataInLocale("user_data", user_data);
                            span.closest(".me-image").remove();
                        }
                    }
                    console.log("image item deleted");
                }

                if (isDeleted) break;
            }
        }
    });

    let div3 = document.createElement("div");
    div3.className = "image";
    div1.appendChild(div3);

    var img = document.createElement("img");
    img.src = obj.url;
    img.id = obj.id;
    img.className = "me-image";
    div3.appendChild(img);

    //image_div.querySelector(".show-image").classList.remove("hide");
}

async function fetchDataFromFile(filename) {
    try {
        const response = await fetch(`${filename}.json`);
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }

        const data = await response.json();

        //console.log("Fetched data:", data); // Log fetched data for debugging

        // Ensure data is in the expected format
        if (Array.isArray(data)) {
            return data;
        } else {
            console.error("The fetched data is not an array.");
            return [];
        }
    } catch (error) {
        console.error("There has been a problem with your fetch operation:", error);
    }
}

async function loadDataFromFiles() {
    que_data = await fetchDataFromFile(`data_${exam}_questions`);
    console.log("me: que_data[] loaded");
    notes_data = await fetchDataFromFile(`data_${exam}_notes`);
    console.log("me: notes_data[] loaded");
    other_data = await fetchDataFromFile(`data_${exam}_other`);
    console.log("me: other_data[] loaded");
    //console.log("Array data:", array_data); // Log the array data
    //displayData(array_data);
    //name = `user_data_${exam}`;
    user_data = getDataFromLocale(`user_data_${exam}`);

    //if (!user_data) user_data = [];
    if (!user_data || !user_data.length) {
        user_data = [];
        user_data.push({ username: "mehboob", daily_practise_questions: [] });
    }
    if (!user_data[0].username) {
        while (!user_data[0].username) {
            user_data.shift();
        }
    }
    console.log("me: user_data[] loaded");
    setTimeout(() => {
        addTagIndexList();
        //addChapterIndexList();
        //loadNotesData();
        initialLoading();
    }, 1000);
}

function openMyNotesPage2() {
    openPage("my-notes");

    var page_div = document.querySelector(".page.my-notes");
    var ele = page_div.querySelector(".images .image");
    if (ele) return;

    var ele2 = page_div.querySelector(".head");
    if (!ele2) {
        page_div.innerHTML = `<div class="tabs">
                                <div class="tab images">Images</div>
                                <div class="tab videos">videos</div>
                                <div class="tab links">links</div>
                                <div class="tab refresh">links</div>
                            </div>
                            <div class="content-list">
                                <div class="content images hide"></div>
                                <div class="content images hide"></div>
                                <div class="content images hide"></div>
                            </div>`;
    }
}

function openMyNotesPage() {
    openPage("my-notes");

    var page_div = document.querySelector(".page.my-notes");
    var ele = page_div.querySelector(".images .image");
    if (ele) return;

    var ele2 = page_div.querySelector(".head");
    if (!ele2) {
        page_div.innerHTML = `<div class="head top">
                            <div class="title">User Notes</div>
                            <i class="fa-solid fa-arrows-rotate refresh"></i>
                        </div>
                        <div class="chapters"></div>`;
    }

    page_div.querySelector("i.refresh").addEventListener("click", () => {
        page_div.querySelector(".chapters").innerHTML = "";
        openMyNotesPage();
    });

    notes_data.forEach((item) => {
        let children = item.children;
        children.forEach((child) => {
            checkLinkedImagesForPage(child);
        });
    });
}
function checkLinkedImagesForPage(block) {
    var page_div = document.querySelector(".page.my-notes");
    if (block.text.indexOf("[[") != -1) {
        let page_uid = block.id;
        //if (!user_data[0].image) user_data[0].images = [];
        var images = user_data[0].images;

        images.forEach((image) => {
            let linked_block = image.linked_block;
            linked_block.forEach((blk) => {
                if (blk.page_id == page_uid) {
                    let id = escapeCSSSelector(page_uid);
                    let ele = page_div.querySelector(`#${id}`);
                    if (!ele) {
                        var div = document.createElement("div");
                        div.id = page_uid;
                        div.className = "chapter-name me-dis-flex-co";
                        let tar_ele = page_div.querySelector(".chapters");
                        tar_ele.appendChild(div);
                        ele = div;

                        var div1 = document.createElement("div");
                        div1.className = "head me-dis-flex";
                        div.appendChild(div1);

                        div1.addEventListener("click", () => {
                            let ele = div1.closest(".chapter-name").querySelector("div.images");
                            if (ele) {
                                ele.classList.toggle("hide");
                                if (ele.classList.contains("hide")) {
                                    div1.children[0].className = "fa-solid fa-chevron-right";
                                } else {
                                    div1.children[0].className = "fa-solid fa-chevron-down";
                                }
                            }
                        });

                        let icon = document.createElement("i");
                        icon.className = "fa-solid fa-chevron-right";
                        div1.appendChild(icon);

                        let span1 = document.createElement("span");
                        span1.textContent = block.text.replace(/\[\[|\]\]/g, "");
                        div1.appendChild(span1);

                        var div2 = document.createElement("div");
                        div2.className = "images hide";
                        div.appendChild(div2);
                    }

                    let div3 = document.createElement("div");
                    div3.className = "image me-dis-flex-co";
                    div3.setAttribute("page-uid", blk.page_id);
                    div3.setAttribute("block-uid", blk.block_id);
                    let tar_ele = ele.querySelector(".images");
                    tar_ele.appendChild(div3);

                    let span2 = document.createElement("span");
                    span2.className = "link open-note";
                    span2.textContent = "open note block";
                    div3.appendChild(span2);
                    span2.addEventListener("click", () => {
                        openNotesPageById(blk.page_id, blk.block_id);
                    });

                    var img = document.createElement("img");
                    img.src = image.url;
                    img.id = image.id;
                    div3.appendChild(img);
                }
            });
        });
    }
    if (block.children) {
        block.children.forEach((child) => {
            checkLinkedImagesForPage(child);
        });
    }
}

function getBlockHTMLTemplate() {
    return `<div class="me-block-main">
                <div class="me-block-text">
                    <div class="text">
                        <span class="bullet"></span>
                        <span class="text-inner"></span>
                    </div>
                    <div class="icon_">
                        <span class="plus">+</span>
                        <span class="linked-ques"></span>
                    </div>
                </div>
                <div class="me-block-icons hide">
                    <div class="add">
                        <div class="head_">
                            <span class="label">Add items:</span>
                            <div class="icons">
                                <i class="fa-brands fa-youtube video"></i>
                                <i class="fa-solid fa-image image"></i>
                                <i class="fa-solid fa-link link"></i>
                                <i class="fa-solid fa-text mytext hide"></i>
                                <i class="fa-solid fa-xmark cross me-ml"></i>
                            </div>
                        </div>

                        <div class="inputs hide">
                            <input type="text" class="link-item" />
                            <input type="text" class="text" />
                            <button class="add">add</button>
                        </div>
                    </div>
                </div>
                <div class="linked-items hide">
                    <div class="head hide">
                        <i class="fa-solid arrow fa-chevron-right"></i>
                        <span class="link">Show linked items</span>
                    </div>
                    <div class="linked-content">
                        <div class="tabs">
                            <div class="linked-item tab videos hide">Videos</div>
                            <div class="linked-item tab images hide">Images</div>
                            <div class="linked-item tab links hide">Links</div>
                        </div>
                        <div class="content-list">
                            <div class="list videos hide"></div>
                            <div class="list images hide"></div>
                            <div class=" list links hide"></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="children">
        </div>    `;
}

function setBlockIconsEvents(div) {
    var ele = "";
    ele = div.querySelector(".icon_ .plus");
    if (ele) {
        ele.addEventListener("click", (event) => {
            var ele = event.target;
            if (ele.classList.contains("active")) {
                ele.classList.remove("active");
                div.querySelector(".me-block-icons").classList.add("hide");
                return;
            }
            //ele.classList.add("active");
            div.querySelector(".me-block-icons").classList.remove("hide");
        });
    }

    ele = div.querySelector(".me-block-icons .video");
    if (ele) {
        ele.addEventListener("click", (event) => {
            var ele = event.target;
            div.querySelector(".me-block-icons .inputs").className = "inputs video";

            let inputs = div.querySelectorAll(".me-block-icons .inputs input");
            inputs[0].classList.remove("hide");
            inputs[0].value = "";
            inputs[0].placeholder = "Paste youtube video linke add time hh:mm:ss";
            inputs[1].classList.remove("hide");
            inputs[1].value = "";
            inputs[1].placeholder = "Add description text";
        });
    }
    ele = div.querySelector(".me-block-icons .link");
    if (ele) {
        ele.addEventListener("click", (event) => {
            var ele = event.target;
            //div.querySelector(".me-block-icons .inputs").classList.remove("hide");
            div.querySelector(".me-block-icons .inputs").className = "inputs link";
            let inputs = div.querySelectorAll(".me-block-icons .inputs input");
            inputs[0].classList.remove("hide");
            inputs[0].value = "";
            inputs[0].placeholder = "Paste link here";
            inputs[1].classList.remove("hide");
            inputs[1].value = "";
            inputs[1].placeholder = "Add description text";
        });
    }
    ele = div.querySelector(".me-block-icons .image");
    if (ele) {
        ele.addEventListener("click", (event) => {
            var ele = event.target;
            //div.querySelector(".me-block-icons .inputs").classList.remove("hide");
            image_url = null;
            div.querySelector(".me-block-icons .inputs").className = "inputs hide";
            var url = getImageURL(event);
            var image_url_interval = setInterval(() => {
                if (image_url) {
                    clearInterval(image_url_interval);
                    url = image_url;
                    div.querySelector(".me-block-icons .inputs").className = "inputs image";
                    let inputs = div.querySelectorAll(".me-block-icons .inputs input");
                    inputs[0].classList.add("hide");
                    inputs[0].value = image_url;

                    inputs[1].classList.remove("hide");
                    inputs[1].value = "";
                    inputs[1].placeholder = "Add description text";
                }
            }, 1000);
        });
    }
    ele = div.querySelector(".me-block-icons .add  .icons .cross");
    if (ele) {
        ele.addEventListener("click", (event) => {
            event.target.closest(".me-block-icons").classList.add("hide");
        });
    }
    ele = div.querySelector(".me-block-icons button.add");
    if (ele) {
        ele.addEventListener("click", (event) => {
            let btn = event.target;
            let classes = ["video", "link", "image"];
            let inputs_ele = div.querySelector(".me-block-icons .inputs");
            let type = classes.find((cls) => inputs_ele.classList.contains(cls));
            let inputs = div.querySelectorAll(".me-block-icons .inputs input");
            if (type == "video") {
                let video_link = inputs[0].value.trim();
                let obj = getYoutubeObj(video_link);

                var obj2 = {
                    linked_blocks: [],
                    video_id: obj.video_id,
                    time: obj.time,
                    text: inputs[1].value.trim(),
                    id: generateUniqueId(),
                };
                let lbobj = {
                    block_id: btn.closest(".me-block").id,
                    page_id: btn.closest(".me-block").getAttribute("page-id"),
                };
                obj2.linked_blocks.push(lbobj);
                if (!user_data[0].videos) user_data[0].videos = [];
                user_data[0].videos.push(obj2);
                saveDataInLocale("user_data", user_data);
            }
            if (type == "link") {
                let obj2 = {
                    linked_blocks: [],
                    url: inputs[0].value.trim(),
                    text: inputs[1].value.trim(),
                    id: generateUniqueId(),
                };
                let lbobj = {
                    block_id: btn.closest(".me-block").id,
                    page_id: btn.closest(".me-block").getAttribute("page-id"),
                };
                obj2.linked_blocks.push(lbobj);
                if (!user_data[0].links) user_data[0].links = [];
                user_data[0].links.push(obj2);
                saveDataInLocale("user_data", user_data);
            }
            if (type == "image") {
                let obj2 = {
                    linked_blocks: [],
                    id: generateUniqueId(),
                    url: inputs[0].value.trim(),
                    text: inputs[1].value.trim(),
                };
                let lbobj = {
                    block_id: btn.closest(".me-block").id,
                    page_id: btn.closest(".me-block").getAttribute("page-id"),
                };
                obj2.linked_blocks.push(lbobj);
                if (!user_data[0].images) user_data[0].images = [];
                user_data[0].images.push(obj2);
                saveDataInLocale("user_data", user_data);
            }
            popupAlert("Item added");
            inputs_ele.classList.add("hide");
            addBlockLinkedItems(div);
        });
    }
    ele = div.querySelector(".linked-items .head");
    if (ele) {
        ele.addEventListener("click", (event) => {
            let ele = event.target.closest(".linked-items");
            let ele2 = ele.querySelector(".linked-content");
            ele2.classList.toggle("hide");
            if (ele2.classList.contains("hide")) {
                ele.querySelector(".head i").className = "fa-solid arrow fa-chevron-right";
                ele.querySelector(".head span").className = "Show linked items";
            } else {
                ele.querySelector(".head i").className = "fa-solid arrow fa-chevron-down";
                ele.querySelector(".head span").className = "Hide linked items";
            }
        });
    }

    let eles = div.querySelectorAll(".linked-items .tabs .tab");
    if (eles) {
        eles.forEach((ele) => {
            ele.addEventListener("click", () => {
                let classes = ["videos", "links", "images"];
                let type = classes.find((cls) => ele.classList.contains(cls));
                eles.forEach((tab) => {
                    if (tab != ele) tab.classList.remove("active");
                });
                let eless = div.querySelectorAll(".content-list > .list");
                eless.forEach((ddiv) => {
                    ddiv.classList.add("hide");
                });
                ele.classList.toggle("active");
                debugger;
                if (ele.classList.contains("active")) {
                    div.querySelector(`.content-list > .list.${type}`).classList.remove("hide");
                }
            });
        });
    }
}

function addBlockLinkedItems(div) {
    debugger;
    var block_id = div.id;
    if (block_id == "NClzsgLw0") debugger;
    div.querySelector(".content-list .videos").innerHTML = "";
    div.querySelector(".content-list .images").innerHTML = "";
    div.querySelector(".content-list .links").innerHTML = "";
    var linked_div = div.querySelector(".linked-items");

    var videos = user_data[0].videos;
    videos.forEach((video) => {
        video.linked_blocks.forEach((blk) => {
            if (blk.block_id == block_id) {
                debugger;
                linked_div.classList.remove("hide");
                var div1 = document.createElement("div");
                div1.className = "video";
                div1.id = video.id ? video.id : "";

                let tar_ele = linked_div.querySelector(".content-list .videos");
                tar_ele.appendChild(div1);
                let time_hh = convertTimeSecondToHour(video.time);
                let iframe_id = tar_ele.closest(".me-block").id + video.video_id;
                div1.innerHTML = `<div class="head_">
                                <span class="cross">X</span>
                            </div>
                            <div class="me-iframe">
                               <iframe  id="${iframe_id}"class="rm-iframe rm-video-player" frameborder="0" allowfullscreen="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" title="THE LIVING WORLD in 1 Shot: FULL CHAPTER COVERAGE (Theory+PYQs) ||  Prachand NEET 2024" width="640" height="360" src="https://www.youtube.com/embed/${video.video_id}?enablejsapi=1&amp;origin=http://127.0.0.1:5500&amp;widgetid=5" ></iframe>;
                            </div>
                            <div class="text">
                                <span>${time_hh}: ${video.text}</span>
                            </div>
                            `;

                div1.querySelector(".text").addEventListener("click", (event) => {
                    let tar = event.target.closest(".video");
                    playVideoPlayer(video.time, video.video_id, tar);
                });
                linked_div.querySelector(".tabs .videos").classList.remove("hide");
            }
        });
    });

    var links = user_data[0].links;
    links.forEach((link) => {
        link.linked_blocks.forEach((blk) => {
            if (blk.block_id == block_id) {
                linked_div.classList.remove("hide");
                var div1 = document.createElement("div");
                div1.className = "link";
                div1.id = link.id ? link.id : "";
                let tar_ele = linked_div.querySelector(".content-list .links");
                tar_ele.appendChild(div1);

                let a = document.createElement("a");
                a.href = link.url;
                a.target = "blank";
                a.textContent = link.text;
                div1.appendChild(a);

                linked_div.querySelector(".tabs .links").classList.remove("hide");
            }
        });
    });

    var images = user_data[0].images;
    images.forEach((image) => {
        image.linked_blocks.forEach((blk) => {
            if (blk.block_id == block_id) {
                linked_div.classList.remove("hide");
                var div1 = document.createElement("div");
                div1.className = "image";
                div1.id = image.id ? image.id : "";
                let tar_ele = linked_div.querySelector(".content-list .images");
                tar_ele.appendChild(div1);

                div1.innerHTML = `<div class="head_">
                                    <span class="cross">X</span>
                                </div>
                                <div class="image-inner">
                                    <img src="${image.url}" id="${image.id}" alt="">
                                </div>`;
                linked_div.querySelector(".tabs .images").classList.remove("hide");
            }
        });
    });
}
