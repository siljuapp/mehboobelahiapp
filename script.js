// Initialise firebase

let is_online = navigator.onLine; // This is just an example. You might have your own way to determine online status.

// Function to initialize Firebase
async function initializeFirebase() {
    try {
        // Dynamically import Firebase modules
        const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js");
        const { getAnalytics } = await import("https://www.gstatic.com/firebasejs/10.5.2/firebase-analytics.js");
        const { getStorage } = await import("https://www.gstatic.com/firebasejs/10.5.2/firebase-storage.js");

        // Firebase configuration
        const firebaseConfig = {
            apiKey: "AIzaSyCv2koOkHrqG_ioHoOU1vuDfI2KPwLNTZM",
            authDomain: "revise-480317.firebaseapp.com",
            projectId: "revise-480317",
            storageBucket: "revise-480317.appspot.com",
            messagingSenderId: "264373202075",
            appId: "1:264373202075:web:faca853c3021e78db36a3e",
            measurementId: "G-2VNZKXQP1Q",
        };

        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const analytics = getAnalytics(app);
        const storage = getStorage(app);

        console.log("Firebase initialized successfully");
    } catch (error) {
        console.error("Error initializing Firebase:", error);
    }
}

// Check if the user is online before initializing Firebase
if (is_online) {
    initializeFirebase();
} else {
    console.log("User is offline. Firebase initialization skipped.");
}

var exam = "ssc";
// gist data
var que_data = [];
var notes_data = [];
var other_data = [];
var tags_list = [];
var user_data = [];
var mocks_data = [];
// ghghghg
var mocks = [];
var me_video_player = null;
var is_mobile = false;
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

//hardReloadCode();
//clearCache();
//getDataFromJSONFiles();

document.addEventListener("DOMContentLoaded", function () {
    //sconst currentURL = window.location.href;
    //const { exam, que_id } = getURLParameters(currentURL);
    var ele = "";

    ele = document.querySelector(".page .main button");
    if (ele) {
        ele.addEventListener("click", (event) => {
            openSidebar(event);
        });
    }
    ele = document.querySelector(".sidebar > .header .cross");
    if (ele) {
        ele.addEventListener("click", (event) => {
            closeSidebar(event);
        });
    }

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
            openTasksPage();
        });
    }

    ele = document.querySelector(".tab.mcq");
    if (ele) {
        ele.addEventListener("click", () => {
            openMCQPage();
        });
    }

    ele = document.querySelector(".tab.home");
    if (ele) {
        ele.addEventListener("click", () => {
            openPage("home");
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

    ele = document.querySelector(".tab.mock");
    if (ele) {
        ele.addEventListener("click", () => {
            openMockPage();
        });
    }
    ele = document.querySelector(".tab.notes");
    if (ele) {
        ele.addEventListener("click", () => {
            openNotesPage2();
        });
    }

    ele = document.querySelector(".tab.more");
    if (ele) {
        ele.addEventListener("click", () => {
            openSettingPage();
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

    function loadAllUnlinkedQuestions() {}

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
    if (window.innerWidth < 500) {
        document.body.classList.add("mobile");
        is_mobile = true;
    }
    document.querySelector(".loading").classList.add("hide");
    document.querySelector(".me-content").classList.remove("hide");
    let target = document.querySelector(".page.home");
    loadPage(target, "home");

    var download_app = setInterval(() => {
        let ele = document.querySelector(".home .share.link");
        if (ele) {
            ele.addEventListener("click", () => {
                let link = `https://elahistudyapp.in//#/${exam}/home`;
                copyToClipboard(link);
                popupAlert("App link copied, Now share with your friends");
            });
        }

        ele = document.querySelector(".download-app");
        if (ele) {
            clearInterval(download_app);
            ele.addEventListener("click", () => {
                const filePath = "/assets/elahi.apk";
                const link = document.createElement("a");
                link.href = filePath;
                link.download = filePath.split("/").pop(); // Sets the download attribute to the filename
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });

            // Check the user-agent string for common patterns in Android .apk environments
            let userAgent = navigator.userAgent.toLowerCase();
            let isAPK = userAgent.includes("android") && userAgent.includes("wv");

            if (isAPK) {
                // If true, show the download link
                ele.style.display = "none";
            }
        }
    }, 1000);

    //openPage("home");
    //openNotesPage2();
    //openPage("home");
    // Load items in home page
    //supportMyWork();
    //addSocialMediaSection();
}

function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    return `${hours}_${minutes}_${seconds}`;
}

function escapeCSSSelector(id) {
    // Escape characters that are not allowed in CSS selectors
    return id.replace(/([!"#$%&'()*+,.\/:;<=>?@[\\\]^`{|}~])/g, "\\$&").replace(/^(-|[0-9])/g, "\\$1");
}

function escapeCSSSelector2(id) {
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
                if (type == "new-mock-select-chapter") {
                    let span = document.createElement("span");
                    span.className = "link chapter";
                    span.textContent = tag;
                    var tar_ele = input.closest(".select-chapter").querySelector(".chapter-list");
                    tar_ele.appendChild(span);
                } else if (type == "explanation") {
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

function loadAllTags(all_tags) {
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
            curr_que_index = 0;
            displayQuestion(fil_ques[curr_que_index]);
            //filterQuestionsOnTagBased("cross");
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
        if (!fil_ques.length) {
            document.querySelector(".page.mcq .main .que-div").classList.add("hide");
            return;
        }
    }
    let ele = document.querySelector(".filtered-tags .tag");
    if (!ele) que_count_ele.classList.add("hide");

    curr_que_index = 0;
    curr_ques = fil_ques[0];
    displayQuestion(curr_ques);
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
    if (time) {
        setTimeout(function () {
            div.remove();
        }, `${time * 1000}`);
    } else {
        setTimeout(function () {
            div.remove();
        }, 3000);
    }
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
    //const fileName = `revise_app_data_${currentDate.getFullYear()}${String(currentDate.getMonth() + 1).padStart(2, "0")}_${String(currentDate.getDate()).padStart(2, "0")}_${String(currentDate.getHours()).padStart(2, "0")}_${String(currentDate.getMinutes()).padStart(2, "0")}.json`;
    const fileName = `revise_app_data_${currentDate.getFullYear()}${String(currentDate.getMonth() + 1).padStart(2, "0")}${String(currentDate.getDate()).padStart(2, "0")}${String(currentDate.getHours()).padStart(2, "0")}${String(currentDate.getMinutes()).padStart(2, "0")}.json`;

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
    if (tab == "home") {
        setHomeUrl();
    } else if (tab == "mock") {
        setMockUrl();
    } else if (tab == "notes") {
        setNotesURL();
    } else if (tab == "more") {
        setMoreURL();
    } else if (tab == "tasks") {
        setTasksURL();
    }
    document.querySelectorAll(".main.tabs > .tab").forEach((tab) => {
        tab.classList.remove("active");
    });
    document.querySelectorAll(".pages > .page").forEach((page) => {
        page.classList.add("hide");
    });
    document.querySelector(`.main.tabs > .tab.${tab}`).classList.add("active");
    document.querySelector(`.pages > .page.${tab}`).classList.remove("hide");
}
function openMockPage() {
    openPage("mock");
    let ele = document.querySelector(".page.mock .new-mock");
    if (!ele) {
        loadNewMockTestSection();
        loadPredefinedMocks();
        loadMockTestHistory();

        ele = document.querySelector(".page.mock .sidebar");
        ele.innerHTML = `
                        <div class="header">
                            <span class="title hide">Title</span>
                            <span class="cross me-mla">X</span>
                        </div>
                        <div class="tabs">
                            <div class="tab prev-mock-questions">Mock Questions</div>
                        </div>
                        <div class="content">
                            <div class="prev-mock-questions"></div>
                        </div>`;
        ele = ele.querySelector(".header .cross");
        if (ele) {
            ele.addEventListener("click", (event) => {
                closeSidebar(event);
            });
        }
        // close sidebar when open for the first time
        closeSidebar(ele);
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
                <span id="start-new-mock" class=" hide link start-new-mock">Start new mock</span>
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

            <div class="result-item marks">
                <span class="result-label">Marks:  </span>
                <span class="result-value" id="marks"></span>
            </div>
            
            <button class="show-questions hide">Show questions</button>
            <div class="show-que-list"></div>
        </div>`;
}

function openNotesPage2(id1, id2) {
    openPage("notes");
    let ele = document.querySelector(".page.notes .main .page-content");
    if (!ele) {
        let main_page = document.querySelector(".page.notes .main");
        main_page.innerHTML = `<div class="header">
                                <i class="fa-light fa-sidebar-flip me-mla"></i>
                                <div class="chapter-index hide">
                                    <i class="fa-solid fa-list-ul"></i>
                                    
                                    <span>Chapters</span>
                                </div>
                            </div>
                            <div class="page-content page-text hide ">
                            <span>Selct a chapter from chapter list</span>
                            </div>`;
        ele = main_page.querySelector(".chapter-index");
        if (ele) {
            ele.addEventListener("click", (event) => {
                openSidebar(event);
            });
        }

        ele = main_page.querySelector(".fa-sidebar-flip");
        if (ele) {
            ele.addEventListener("click", (event) => {
                openSidebar(event);
            });
        }

        let sidebar = document.querySelector(".page.notes .sidebar");
        sidebar.innerHTML = `<div class="header">
                            <span class="title hide">Title</span>
                            <span class="cross me-mla">X</span>
                        </div>
                        <div class="tabs">
                            <div class="tab chapter-index active">Chapters</div>
                            <div class="tab search">Search</div>
                        </div>
                        <div class="content">
                            <div class="chapter-index"></div>
                            <div class="search hide">
                                <div class="top">
                                    <input type="search" class="search" placeholder="Search" />
                                    <button class="search">Search</button>
                                </div>
                                <div class="search-results"></div>
                            </div>
                        </div>`;
        setNotesPageSidebarItemEvents(sidebar);
        addChapterIndexList2(sidebar);
        if (id1) {
            openChapterById(id1, id2);
        }
    } else {
        if (id1) {
            openChapterById(id1, id2);
        }
    }
}

function addChapterIndexList2(sidebar) {
    let ele = sidebar.querySelector(".content > .chapter-index");
    notes_data.forEach((item) => {
        addChapterIndexItem(item, ele, 0);
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
        i.className = "arrow-icon fa-solid fa-chevron-down";
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
            openChapterById(page_id);
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
    var ele = "";
    var div = document.createElement("div");
    div.className = "me-block";
    div.id = item.id;
    div.setAttribute("page-id", item.page_id);
    target.appendChild(div);

    div.innerHTML = getBlockHTMLTemplate();

    if (item.heading) {
        div.classList.add("heading");
        div.classList.add(`level-${level}`);

        ele = div.querySelector(".icon_ .todo");
        ele.classList.remove("hide");
        let read_later_array = user_data[0].tasks.read_later;
        for (let i = 0; i < read_later_array.length; i++) {
            if (read_later_array[i].block_id === item.id) {
                ele.className = "fa-regular todo fa-circle-check";
                break;
            }
        }

        ele.addEventListener("click", (event) => {
            ele = event.target;
            let type = "";
            let read_later_array = user_data[0].tasks.read_later;
            if (ele.classList.contains("fa-circle")) type = "circle";
            else if (ele.classList.contains("fa-circle-check")) type = "check";

            if (type == "circle") {
                ele.className = "fa-regular todo fa-circle-check";

                //const exists = read_later_array.some((obj) => obj.block_id === item.id);

                let obj = {
                    id: generateUniqueId(),
                    page_id: item.page_id,
                    block_id: item.id,
                    text: item.text.replace(/{[^}]*}/g, ""),
                };
                user_data[0].tasks.read_later.push(obj);
                console.log("me: new heading added to read later");
                saveUserData();
                popupAlert("Added to Tasks: Read Later");
            } else if (type == "check") {
                ele.className = "fa-regular todo fa-circle";
                let arr = user_data[0].tasks.read_later.filter((obj) => obj.block_id != item.id);
                user_data[0].tasks.read_later = arr;
                console.log("me: heading removed from read later");
                saveUserData();
                popupAlert("Removed from Tasks: Read Later");
            }
        });
    }

    setBlockIconsEvents(div, item);
    addBlockLinkedItems(div, item);

    let text = item.text;
    if (item.heading) {
        //div.querySelector(".icon_ .share").classList.remove("hide");
    }
    if (text) {
        let ele = div.querySelector(".me-block-text .text-inner");
        text = text.trim();
        ele.innerHTML = getHTMLFormattedText(text);

        let video_elements = ele.querySelectorAll("i.video");
        video_elements.forEach((v_ele) => {
            v_ele.addEventListener("click", (event) => {
                let video_id = v_ele.getAttribute("id");
                let time = parseInt(v_ele.getAttribute("time"));
                playVideoPlayer(video_id, time, event);
            });
        });
        /*
        const imagePattern = /!\[.*?\]\((https:\/\/[^\)]+)\)/;
        const match = text.match(imagePattern);

        if (match) {
            // Extract the URL from the match
            const imageUrl = match[1];
            const textBeforeImage = text.split(imagePattern)[0].trim();
            let displayText = textBeforeImage;
            if (displayText.startsWith("![")) {
                displayText = "";
            } else {
                //let span = document.createElement("span");
                //span.innerHTML = getHTMLFormattedText(displayText);
                ele.innerHTML = getHTMLFormattedText(displayText);
            }

            // Create a new div element with class 'hide-image-element'
            const div = document.createElement("div");
            div.className = "hide-image-element";
            div.textContent = "🖼️ Click to show/hide Image";
            div.addEventListener("click", () => {
                div.querySelector("img").classList.toggle("hide");
            });

            // Create a new img element with the extracted URL as src
            const img = document.createElement("img");
            img.src = imageUrl;
            img.className = "note-image hide";
            img.addEventListener("click", (event) => {
                //showImagesInOverlay(event);
            });

            // Append the img element to the div
            div.appendChild(img);

            // Optionally, append the div to the body or another container

            ele.appendChild(div); //getHTMLFormattedText(text);
        } else {
            //ele.innerHTML = getHTMLFormattedText(text);
            ele.innerHTML = getHTMLFormattedText(text);
        }
        */
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
    text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<span class="show-image hide">Show images</span> <img class="me-image" src="$2" alt="$1">');

    // Convert [text](link) to <a>
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    // Convert {video:ASDASDDE:399} to <i class="fa-brands fa-youtube video" id="video-id" time="399"></i>
    text = text.replace(/\{video:([^:]+):(\d+)\}/g, '<i class="fa-brands fa-youtube video" id="$1" time="$2"></i>');

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

function openChapterById(page_id, block_id) {
    openNotesPage2();
    setNotesURL(page_id);
    let ele = document.querySelector(".page.notes .sidebar .cross");
    if (is_mobile) closeSidebar(ele);

    var data = [];
    for (var i = 0; i < pages_data.length; ++i) {
        if (page_id == pages_data[i].id) {
            data = pages_data[i];
            break;
        }
    }

    var div = document.createElement("div");
    div.id = data.id;
    div.className = "me-block me-page-title page-title";

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

    let div_iframe = document.createElement("div");
    div_iframe.className = "me-iframe-div";
    div.insertBefore(div_iframe, div.children[1]);

    ele = div.querySelector(".me-block-text .text-inner");
    ele.innerHTML = getHTMLFormattedText(data.page_title);

    // block data

    data = data.data;
    ele = div.querySelector(".children"); // target_element
    data.forEach((block) => {
        loadPageText2(block, ele, 0);
    });

    document.querySelector("div.page-text").classList.remove("hide");
    if (block_id) {
        let ttt = block_id;
        ttt = escapeCSSSelector(ttt);
        var block_ele = document.querySelector(`#${ttt}`);
        if (!block_ele) {
            ttt = block_id;
            ttt = escapeCSSSelector2(ttt);
            block_ele = document.querySelector(`#${ttt}`);
        }
        if (block_ele) scrollToView(block_ele);
        else console.error("block id selector issue");
    } else {
        // Show images when the chapter is open, and not when a block is scrolled.
        ele = document.querySelectorAll(".page.notes .hide-image-element");
        ele.forEach((div) => {
            div.click();
        });
    }

    // Now show all images
}

function scrollToView(ele) {
    if (ele.classList.contains("me-block")) {
        ele = ele.querySelector(".me-block-main");
    }
    ele.scrollIntoView({
        behavior: "smooth", // Optional: Smooth scrolling behavior
        block: "center", // Optional: Scroll to the top of the element
    });
    if (ele.classList.contains("me-block")) {
        ele = ele.querySelector(".me-block-main");
        ele.classList.add("focus");
    } else {
        ele.classList.add("focus");
    }

    setTimeout(() => {
        ele.classList.remove("focus");
    }, 4000);
}
function openTestQuestion() {
    var id = "oyxgdCVRPx";
    var que = getQuestionById(id);
    fil_ques[curr_que_index] = que;
    var tar = document.querySelector(".page.random .que-text");
    //getMCQQuestionElement(fil_ques[curr_que_index], tar, "main");
    displayQuestion(que);
}

function generateSomeMocks() {
    for (let i = 0; i < 20; i++) {
        let arr = {
            id: generateUniqueId(),
            que_ids: [],
        };
        let tq = que_data.length;
        for (let i = 0; i < 20; i++) {
            let randomIndex = Math.floor(Math.random() * tq);
            arr.que_ids.push(que_data[randomIndex].id); // Remove the element from the copy and push it to result
        }
        mocks.push(arr);
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

function playVideoPlayer(video_id, time, event) {
    let target = event.target.closest(".page").querySelector(".me-iframe-div");
    const iframe = document.querySelector(".page.notes .me-iframe-div  iframe");
    // If the player is already initialized and the video ID matches, just seek and play
    //let block_id = target.closest(".me-block").id;
    //let new_video_block_id = block_id + video_id;
    if (me_video_player && !iframe) {
        me_video_player = null;
        target.innerHTML = "";
        initializeYouTubePlayer(time, video_id, target);
        return;
    }
    if (me_video_player && iframe.id == video_id) {
        me_video_player.seekTo(time);
        me_video_player.playVideo();
        return;
    }
    if (me_video_player && iframe.id !== video_id) {
        //video_player.destroy();

        //video_player.pauseVideo();
        me_video_player = null;
        target.innerHTML = "";
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
    //const iframe = target.querySelector("iframe");
    let iframe = target.querySelector(" iframe");
    var url = window.location.href; // Get the current URL
    if (url.includes("127.0.0")) {
        url = "http://127.0.0.1:5500";
    } else {
        url = "https://elahistudyapp.in";
    }
    if (!iframe) {
        target.innerHTML = `
                                <div class="header">
                                    <span class="cross">X</span>
                                </div>
                                <div class="me-iframe">
                                <iframe  id="${video_id}"class="rm-iframe rm-video-player" frameborder="0" allowfullscreen="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" title="THE LIVING WORLD in 1 Shot: FULL CHAPTER COVERAGE (Theory+PYQs) ||  Prachand NEET 2024" width="640" height="360" src="https://www.youtube.com/embed/${video_id}?enablejsapi=1&amp;origin=${url}&amp;widgetid=5" ></iframe>
                                </div>
                            `;
        let ele = target.querySelector(".header .cross");
        if (ele) {
            ele.addEventListener("click", () => {
                me_video_player.pauseVideo();
                me_video_player = null;
                target.innerHTML = "";
                return;
            });
        }
        iframe = target.querySelector("iframe");
    }

    me_video_player = new YT.Player(iframe.id, {
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
    //let block_id = target.closest(".me-block").id;
    //old_video_block_id = block_id + video_id;
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
    let videoId = "";
    let timeInSeconds = 0;

    // Extract the video ID from the URL
    const urlMatch = text.match(/(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/);
    if (urlMatch) {
        videoId = urlMatch[1];
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
        //("Invalid time format");
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
    var tar_ele = document.querySelector(".page.mock .mock-history-list");
    tar_ele.innerHTML = "";
    var mocks = user_data[0].mocks;
    if (!mocks) mocks = [];
    mocks.forEach((mock, index) => {
        var div_mock = document.createElement("div");
        div_mock.className = "mock-data me-dis-flex-co";
        div_mock.id = mock.id;
        tar_ele.appendChild(div_mock);

        div_mock.innerHTML = `
                            <span class="date"></span>                    
                            <span class="total-questions"></span>
                            <span class="questions-attempted"></span>
                            <span class="correct-questions correct"></span>
                            <span class="wrong-questiions wrong"></span>
                            <span class="marks"></span>

                            <div class="show-questions link">Show questions</div>
                            `;

        // Now get the mock test data
        let que_arr = mock.questions;
        var total_questions = que_arr.length;
        var questions_attempted = 0;
        var correct_questions = 0;
        var wrong_questions = 0;

        que_arr.forEach((que) => {
            if (que.selected_option_id != "") {
                ++questions_attempted;
                if (que.selected_option_id == que.answer_option_id) ++correct_questions;
                else ++wrong_questions;
            }
        });
        div_mock.querySelector(".date").textContent = `${getFormattedDate(mock.date)}`;
        div_mock.querySelector(".total-questions").textContent = `Total questions:  ${total_questions}`;
        div_mock.querySelector(".questions-attempted").textContent = `Questions attempted:  ${questions_attempted}`;
        div_mock.querySelector(".correct-questions").textContent = `Correct questions:  ${correct_questions}`;
        div_mock.querySelector(".wrong-questiions").textContent = `Wrong questions:  ${wrong_questions}`;

        let marks = correct_questions * 2 - wrong_questions * 0.6;
        marks = marks.toFixed(1);
        div_mock.querySelector(".marks").textContent = `Marks:  ${marks} / ${total_questions * 2}`;

        var passingMarks = total_questions * 2 * 0.35;

        if (marks >= passingMarks) {
            div_mock.classList.add("passed");
        } else {
            div_mock.classList.add("failed");
        }

        let ele = div_mock.querySelector(".show-questions");
        if (ele) {
            ele.addEventListener("click", () => {
                showPreviousMockQuestions(mock);
            });
        }
        /*
        var span0 = document.createElement("span");
        span0.className = "mock-test-num hide";
        span0.textContent = `Mock Test ${index + 1}`;
        div_mock.appendChild(span0);

        var span = document.createElement("span");
        span.className = "date label";
        span.textContent = "Attempted Date: " + getFormattedDate(mock.date); //+ "  (" + getFormattedTime(mock.start_time) + "  -  " + getFormattedTime(mock.end_time) + ")";
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
            showPreviousMockQuestions(mock);
        });
        */
    });
}

function showPreviousMockQuestions(mock) {
    let div = document.querySelector(".page.mock .sidebar .content .prev-mock-questions ");
    div.innerHTML = "";
    openSidebar(div);
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
            span.textContent = `Click to open explanation block in notes.`; // "${page_title}"`;

            que_div.appendChild(span);

            span.addEventListener("click", () => {
                openChapterById(que.page_uid, parent_block_uid);
            });
        }
    });
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
    return "ss:ss";
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

function startNewMockTest(mock) {
    // Load chapters if selected for mock test
    var selected_chapters = [];
    let eee = document.querySelector(".page.mock .me-mock-chapter");
    if (eee) {
        let chapters = document.querySelectorAll(".new-mock .me-mock-chapter");
        chapters.forEach((ele) => {
            if (ele.children[0].checked) {
                selected_chapters.push(ele.children[1].textContent.toLowerCase());
            }
        });
    }

    // Show the mock-test section;
    document.querySelector(".main-content > .me-top").classList.add("hide");
    document.querySelector(".main-content > .pages").classList.add("hide");
    //document.querySelector(".main-content > .mock-test").classList.remove("hide");

    var ele = document.querySelector(".main-content > .mock-test");
    ele.classList.remove("hide");
    ele.innerHTML = getMockTestHTMLTemplate();

    ele.querySelector(".cross").addEventListener("click", () => {
        document.querySelector(".main-content > .me-top").classList.remove("hide");
        document.querySelector(".main-content > .pages").classList.remove("hide");
        document.querySelector(".main-content > .mock-test").classList.add("hide");
    });

    fil_ques = que_data.slice(0, 20);
    var mock_obj = {
        id: mock ? mock.id : generateUniqueId(),
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
    let arr = [];
    if (!mock) {
        if (selected_chapters.length) {
            let chapter_arr = {};
            selected_chapters.forEach((chapter) => {
                chapter_arr[chapter] = [];
            });

            let totalQuestions = 20;
            let questionsPerChapter = Math.floor(totalQuestions / selected_chapters.length);
            let remainingQuestions = totalQuestions % selected_chapters.length;

            selected_chapters.forEach((chapter, index) => {
                let count = questionsPerChapter;
                if (index === selected_chapters.length - 1) {
                    count += remainingQuestions; // Add remaining questions to the last chapter
                }
                let temp_arr = que_data.filter((que) => que.tags.includes(chapter));
                temp_arr = sortArrayRandomly(temp_arr);
                //chapter_arr[chapter] = que_data.filter((que) => que.tags.includes(chapter)).slice(0, count);
                chapter_arr[chapter] = temp_arr.slice(0, count);
            });

            for (let chapter in chapter_arr) {
                chapter_arr[chapter].forEach((que) => {
                    arr.push(que.id);
                });
            }

            //selected_chapters.forEach((chapter) => {});

            ///let filtered_ques = que_data.filter((que) => que.tags.some((tag) => selected_chapters.includes(tag)));
        } else {
            let tq = que_data.length;
            for (let i = 0; i < 20; i++) {
                let randomIndex = Math.floor(Math.random() * tq);
                arr.push(que_data[randomIndex].id); // Remove the element from the copy and push it to result
            }
        }
    } else {
        arr = mock.que_ids;
    }

    var number_of_questions_for_mock = arr.length;
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
            scrollToView(ele);
        });
    }
    setTimer(Math.floor(number_of_questions_for_mock / 2));

    arr.forEach((id) => {
        var obj = {
            id: id,
            selected_option_id: "",
            answer_option_id: "",
            time_taken: "",
        };
        que_arr.push(obj);
        var target_ele = document.querySelector(".mock-test .que-text");
        //var que_div = getMCQQuestionElement(que, target_ele, "mock");
        let que = getQuestionById(id);
        displayQuestion(que, target_ele, "mock");
    });

    let mock_test_div = document.querySelector(".main-content > .mock-test");
    mock_test_div.querySelector(".submit-test").addEventListener("click", () => {
        let mock_test_div = document.querySelector(".main-content > .mock-test");

        // save the mock end time in the top element in mocks which is the latest mock test
        user_data[0].mocks[0].end_time = getCurrentTime();

        // aNoe save all the question data of the mock
        var que_arr = user_data[0].mocks[0].questions;
        mock_test_div.querySelectorAll(".que-div").forEach((que_ele, index) => {
            que_arr[index].id = que_ele.id;
            var options = que_ele.querySelectorAll(".option");
            options.forEach((option) => {
                if (option.classList.contains("selected")) que_arr[index].selected_option_id = option.id;
                if (option.classList.contains("ans")) que_arr[index].answer_option_id = option.id;
            });
        });
        // Now save the user data
        saveDataInLocale("user_data", user_data);

        // Now get the mock test data
        var total_questions = que_arr.length;
        var questions_attempted = 0;
        var correct_questions = 0;
        var wrong_questions = 0;

        que_arr.forEach((que) => {
            if (que.selected_option_id != "") {
                ++questions_attempted;
                if (que.selected_option_id == que.answer_option_id) ++correct_questions;
                else ++wrong_questions;
            }
        });

        mock_test_div = document.querySelector(".main-content > .mock-test");
        mock_test_div.innerHTML = `<div class="mock-result">
                                        <div class="header">
                                            <span>Result</span>
                                            <span class="cross">X</span>
                                        </div>
                                        <span class="total-questions"></span>
                                        <span class="questions-attempted"></span>
                                        <span class="correct-questions correct"></span>
                                        <span class="wrong-questiions wrong"></span>
                                        <span class="marks"></span>

                                        <div class="result-que-list"></div>
                                    </div>`;
        let ele = mock_test_div.querySelector(".header .cross");
        if (ele) {
            ele.addEventListener("click", () => {
                let eee = document.querySelectorAll(".main-content > div");
                eee.forEach((ee) => {
                    if (ee.classList.contains("mock-test")) ee.classList.add("hide");
                    else ee.classList.remove("hide");
                });
            });
        }

        mock_test_div.querySelector(".total-questions").textContent = `Total questions:  ${total_questions}`;
        mock_test_div.querySelector(".questions-attempted").textContent = `Questions attempted:  ${questions_attempted}`;
        mock_test_div.querySelector(".correct-questions").textContent = `Correct questions:  ${correct_questions}`;
        mock_test_div.querySelector(".wrong-questiions").textContent = `Wrong questions:  ${wrong_questions}`;

        let marks = correct_questions * 2 - wrong_questions * 0.6;
        marks = marks.toFixed(1);
        marks = `${marks} / ${total_questions * 2}`;
        mock_test_div.querySelector(".marks").textContent = `Marks:  ${marks}`;

        let tar = mock_test_div.querySelector(".result-que-list");
        que_arr.forEach((item) => {
            var que = getQuestionById(item.id);
            var que_div = displayQuestion(que, tar, "mock-result");
            var id = item.selected_option_id;

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
        });
    });
}

function openMCQPage(id) {
    openPage("mcq");

    var page_main = document.querySelector(".page.mcq > .main .que-text");
    if (!page_main) {
        page_main = document.querySelector(".page.mcq > .main ");
        page_main.innerHTML = getRandomPageHTMLTemplate();
        setMcqPageMainItemEvents(page_main);

        var page_sidebar = document.querySelector(".page.mcq > .sidebar ");
        page_sidebar.innerHTML = `<div class="header">
                            <span class="title">Title</span>
                            <span class="cross me-mla">X</span>
                        </div>
                        <div class="tabs">
                            <div class="tab chapter-tag active">Chapters</div>
                            <div class="tab all-tags">All Tags</div>
                        </div>
                        <div class="content">
                            <div class="chapter-tag"> <span> Chapters </span> </div>
                            <div class="all-tags hide"> 
                                <input type="search" class="search-all-tags" placeholder="Filter Tags">
                                <div class="all-tags-list"></div>
                             </div>
                        </div>`;
        setMcqPageSidebarItemEvents(page_sidebar);

        addTagIndexList(page_sidebar);
        sortArrayRandomly(que_data);
        fil_ques = que_data;
        curr_que_index = 0;
        curr_ques = fil_ques[curr_que_index];
        if (id) {
            let que = getQuestionById(id);
            displayQuestion(que);
        } else displayQuestion();
        if (is_mobile) {
            let ele = document.querySelector(".page.mcq .main .que-div");
            closeSidebar(ele);
        }
    }
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
    return `<div class="middle question-section main-questions">
                <div class="filter-section">
                    <div class="head">
                    
                        <i class="fa-light fa-sidebar-flip me-mla"></i>
                        <div class="filter hide">
                            <i class="fa-regular fa-filter"></i>
                            <span>Filter</span>
                        </div>
                    </div>
                    <div class="filtered-tags hide"></div>
                    <span class="filter-ques-count hide label"></span>
                </div>
                <div class="que-text"></div>
                <button class="new-question">✨ New Question</button>
            </div>
            `;
}

function displayQuestion(que, tar_ele, type) {
    if (!type || type == "random") {
        if (!que) que = curr_ques;
        else curr_ques = que;
        setQuestionURL(curr_ques.id);
    }

    if (!tar_ele) tar_ele = document.querySelector(".page.mcq .main .que-text");
    if (!type || type == "random") tar_ele.innerHTML = "";

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

    // mcq options
    var options = document.createElement("div");
    options.className = "options";
    que_div.appendChild(options);

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

        // No action on options for mock-result, daily-practise-questions;
        //if (type == "mock-result") return;
        if (type == "daily-ques") return;

        // div = option div
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

            var que_div_ele = span.closest(".que-div");

            span.classList.add("selected");

            if (span.classList.contains("ans")) span.classList.add("correct");
            else span.classList.add("wrong");

            // get correct option
            que_div_ele.querySelectorAll(".option").forEach((optionSpan) => {
                if (optionSpan.classList.contains("ans")) {
                    optionSpan.classList.add("correct");
                }
            });

            que_div_ele.querySelectorAll(".option").forEach((optionSpan) => {
                optionSpan.classList.add("disabled");
            });

            if (type == "mock-result") return;

            if (!type || type == "random") {
                var que_div = que_div_ele;

                let ques = user_data[0].daily_practise_questions[0].questions;
                //let ques = arr[0].questions;
                let oobj = {
                    que_id: curr_ques.id,
                    selected_option_id: que_div.querySelector(".option.selected").id,
                    answer_option_id: que_div.querySelector(".option.correct").id,
                };
                ques.unshift(oobj);
                saveUserData();
                //updateDailyQuestionsCircles();

                var div = document.createElement("div");
                div.className = "explanations me-dis-flex-co";
                let exp_div_target = document.querySelector(".page.mcq .main .question-section");
                var exp_div = exp_div_target.querySelector(".explanations");
                if (exp_div) exp_div.remove();
                exp_div_target.appendChild(div);
                //que_div.appendChild(div);
                exp_div = div;

                var span = document.createElement("span");
                span.className = "label";
                span.textContent = "Explanation:";
                exp_div.appendChild(span);

                let me_iframe_div = document.createElement("div");
                me_iframe_div.className = "me-iframe-div";
                exp_div.appendChild(me_iframe_div);

                if (que.explanation && que.explanation != "") {
                    let span = document.createElement("span");
                    span.className = "que-explanation";
                    span.innerHTML = getHTMLFormattedText(que.explanation);
                    exp_div.appendChild(span);

                    let video_elements = span.querySelectorAll("i.video");
                    video_elements.forEach((v_ele) => {
                        v_ele.addEventListener("click", (event) => {
                            let video_id = v_ele.getAttribute("id");
                            let time = parseInt(v_ele.getAttribute("time"));
                            playVideoPlayer(video_id, time, event);
                            scrollToView(me_iframe_div);
                        });
                    });
                }

                if (que.page_uid && que.page_uid != "") {
                    let span = document.createElement("span");
                    span.className = "page-link";
                    let page = "";

                    //popupAlert("Page Data is Not Yet Added");
                    //return;
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
                        openChapterById(que.page_uid, parent_block_uid);
                    });
                    //if (!page_title) exp_div.classList.add("hide");
                }
            }
        });
    });

    // div = share question div
    let idiv = document.createElement("div");
    idiv.className = "que-actions";
    que_div.appendChild(idiv);

    let sdiv = document.createElement("div");
    sdiv.className = "share-question link";
    idiv.appendChild(sdiv);

    sdiv.innerHTML = `<i class="fa-regular fa-share-nodes"></i>
                          <span>Share</span>`;
    sdiv.addEventListener("click", () => {
        let url = window.location.href;
        let ind = url.indexOf("#");
        if (ind != -1) {
            url = url.substring(0, ind - 1);
        }
        url = url + `/#/${exam}/question/${que.id}`;
        copyToClipboard(url);
        popupAlert("Question link copied");
    });
    return que_div;
}

function setQuestionURL(id) {
    let url = window.location.href;
    let ind = url.indexOf("#");
    if (ind != -1) {
        url = url.substring(0, ind - 1);
    }
    window.location.href = url + `/#/${exam}/question/${id}`;
}
function setHomeUrl(id) {
    let url = window.location.href;
    let ind = url.indexOf("#");
    if (ind != -1) {
        url = url.substring(0, ind - 1);
    }
    window.location.href = url + `/#/${exam}/home`;
}
function setMockUrl() {
    let url = window.location.href;
    let ind = url.indexOf("#");
    if (ind != -1) {
        url = url.substring(0, ind - 1);
    }
    window.location.href = url + `/#/${exam}/mock`;
}

function setNotesURL(page_id) {
    let url = window.location.href;
    let ind = url.indexOf("#");
    if (ind != -1) {
        url = url.substring(0, ind - 1);
    }
    if (page_id) window.location.href = url + `/#/${exam}/notes/${page_id}`;
    else window.location.href = url + `/#/${exam}/notes`;
}

function setTasksURL() {
    let url = window.location.href;
    let ind = url.indexOf("#");
    if (ind != -1) {
        url = url.substring(0, ind - 1);
    }
    window.location.href = url + `/#/${exam}/tasks`;
}
function setMoreURL() {
    let url = window.location.href;
    let ind = url.indexOf("#");
    if (ind != -1) {
        url = url.substring(0, ind - 1);
    }
    window.location.href = url + `/#/${exam}/more`;
}

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
function sortArray(array, type) {
    if (type === "az") {
        array.sort();
    } else if (type === "za") {
        array.sort((a, b) => b.localeCompare(a));
    } else {
        console.error("Invalid type parameter. Please use 'az' for ascending or 'za' for descending.");
        return;
    }

    return array;
}

function addTagIndexList(sidebar) {
    var ele = "";
    // Load structured tags
    var index_tags = "";
    for (var i = 0; i < other_data.length; i++) {
        if (other_data[i].type == "tags_index") {
            index_tags = other_data[i].data;
        }
    }

    ele = sidebar.querySelector(".content > .chapter-tag");
    ele.innerHTML = "";
    tags_list.forEach((tag) => {
        addTagIndexItem(tag, ele, 0);
    });

    // Load all tags
    all_tags = [];
    loadAllTags(all_tags);
    all_tags = sortArray(all_tags, "az");
    ele = sidebar.querySelector(".content > .all-tags .all-tags-list");
    ele.innerHTML = "";
    all_tags.forEach((tag) => {
        addAllTagsItems(tag, ele);
    });
}

function addAllTagsItems(tag, tar_ele) {
    var div = document.createElement("div");
    div.className = "tag";
    tar_ele.appendChild(div);

    var span = document.createElement("span");
    span.textContent = tag;
    span.className = "tag-name";
    div.appendChild(span);

    div.addEventListener("click", () => {
        let ele = document.querySelector(".filtered-tags");
        if (ele) ele.innerHTML = "";
        let arr = [];
        arr.push(tag);
        filterQuestionsOnTagBased(tag, arr);
    });
}

function addTagIndexItem(item, tar_ele, level) {
    item = item.name ? item : item[0];
    try {
        var children = item.children;
    } catch {}
    var span = "";
    if (children.length) {
        let div = document.createElement("div");
        div.className = `me-tag level-${level}`;
        tar_ele.appendChild(div);

        let div2 = document.createElement("div");
        div2.className = "tag-item";
        div.appendChild(div2);

        let i = document.createElement("i");
        i.className = "arrow-icon fa-solid fa-chevron-down";
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
        let name = item.name; //tag.name;
        if (name.indexOf("[[") == -1) span.className = "name";
        name = name.replace("[[", "").replace("]]", "");
        span.textContent = name.toLowerCase();
        div2.appendChild(span);

        let div3 = document.createElement("div");
        div3.className = "tag-children";
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
        let name = item.name; //.name;
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
        });
    }
}

function addTagIndexItem2(tag, tar_ele, level) {
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
        i.className = "arrow-icon fa-solid fa-chevron-down";
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
        div3.className = "tag-children";
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
        });
    }
}

function openTasksPage() {
    openPage("tasks");
    var input = document.querySelector(".page.tasks .daily-tasks input");
    if (input) {
        input.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                var text = input.value.trim();
                if (text == "") return;

                let daily_tasks = user_data[0].tasks.daily_tasks;
                let obj = {
                    type: "todo",
                    text: text,
                };
                //daily_tasks.unshift(item);
                daily_tasks.push(obj);
                saveUserData();
                addTaskItem(obj);
                input.value = ""; // Clear the input after adding the task
            }
        });
    }
    let daily_tasks = user_data[0].tasks.daily_tasks;
    let task = document.querySelector(".page.tasks .daily-task-list .task");
    if (daily_tasks.length && !task) {
        daily_tasks.forEach((obj) => {
            addTaskItem(obj);
        });
    }

    let eee = document.querySelector(".page.tasks .read-later-list");
    eee.innerHTML = "";
    let read_later_arr = user_data[0].tasks.read_later;
    read_later_arr.forEach((obj) => {
        let div = document.createElement("div");
        div.className = "heading";
        div.innerHTML = `  <i class="fa-solid fa-circle-small"></i>
                            <span id="${obj.id}" class="link" page-id="${obj.page_id}" block-id="${obj.block_id}">${obj.text}</span>`;
        eee.appendChild(div);

        let ele = div.querySelector("span");
        if (ele) {
            ele.addEventListener("click", () => {
                let page_id = ele.getAttribute("page-id");
                let block_id = ele.getAttribute("block-id");
                openNotesPage2(page_id, block_id);
            });
        }
    });
}
function addTaskItem(obj) {
    if (!obj.text) return;
    let checked = "";
    let task_div = document.createElement("div");
    task_div.className = "task";

    let daily_task_list_div = document.querySelector(".page.tasks .daily-tasks .daily-task-list");
    if (obj.type == "done") {
        checked = "-check";
        daily_task_list_div.appendChild(task_div);
    }

    let ele = daily_task_list_div.querySelector(".task:has(.fa-circle-check)");
    if (ele) {
        daily_task_list_div.insertBefore(task_div, ele);
    } else {
        daily_task_list_div.appendChild(task_div);
    }

    task_div.innerHTML = `<i class="fa-regular fa-circle${checked}"></i>
                          <span>${obj.text}</span>
                          <i class="fa-regular fa-xmark cross"></i>`;

    ele = task_div.querySelector(".fa-circle");
    if (ele) {
        ele.addEventListener("click", () => {
            task_div.children[0].className = "fa-regular fa-circle-check";
            obj.type = "done";
            saveUserData();
            task_div.remove();
            addTaskItem(obj);
        });
    }

    ele = task_div.querySelector(".cross");
    if (ele) {
        ele.addEventListener("click", () => {
            removeElementFromArray(user_data[0].tasks.daily_tasks, obj);
            saveUserData();
            task_div.remove();
        });
    }
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

var my_data = "";
async function getDataFromJSONFiles() {
    my_data = await fetchDataFromFile(`my_data_${exam}`);
    que_data = my_data[0].ques;
    notes_data = my_data[0].notes;
    tags_list = my_data[0].tags_list;

    mocks_data = await fetchDataFromFile(`mocks_${exam}`);

    user_data = getUserData();

    if (!user_data || !user_data.length) {
        user_data = [];
        var obj = {
            username: "mehboob",
            daily_practise_questions: [],
            mocks: [],
            images: [],
            videos: [],
            links: [],
            starred_questions: [],
        };
        user_data.push(obj);
        saveDataInLocale("user_data", user_data);
    }
    if (!user_data[0].username) {
        while (!user_data[0].username) {
            user_data.shift();
        }
    }
    if (!user_data[0].tasks) {
        user_data[0].tasks = {};
        user_data[0].tasks.daily_tasks = [];
        user_data[0].tasks.read_later = [];
    }
    let dpq = user_data[0].daily_practise_questions;
    let today_date = getTodayDate();

    if (!dpq.length) {
        dpq.unshift({
            date: today_date,
            questions: [],
        });
        saveUserData();
    } else if (dpq[0].date !== today_date) {
        dpq.unshift({
            date: today_date,
            questions: [],
        });
        saveUserData();
    }

    generateSomeMocks();
    console.log("me: user_data[] loaded");
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
                        openChapterById(blk.page_id, blk.block_id);
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
                        <i class="fa-regular todo fa-circle hide "></i>
                        <i class="fa-regular fa-share-nodes share hide"></i>
                        <span class="linked-ques"></span>
                        <i class="fa-brands fa-youtube video hide"></i>
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
                            <span class="">My notes:</span>
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

function setBlockIconsEvents(div, item) {
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

    ele = div.querySelector(".icon_ .share");
    if (ele) {
        ele.addEventListener("click", (event) => {
            var ele = event.target.closest(".me-block");
            let page_id = ele.getAttribute("page-id");
            let block_id = ele.id;
            if (!page_id) {
                page_id = block_id;
                //block_id = null;
            }

            let url = window.location.href;
            let ind = url.indexOf("#");
            if (ind != -1) {
                url = url.substring(0, ind - 1);
            }
            if (block_id) url = url + `/#/${exam}/notes/${page_id}/${block_id}`;
            else url = url + `/#/${exam}/notes/${page_id}`;
            copyToClipboard(url);
            popupAlert("Question link copied");
        });
    }
    if (item && item.video_id != "") {
        return;
        /*let icon = document.createElement("i");
        icon.className = "fa-brands fa-youtube video hhh";
        div.querySelector("span.text-inner").appendChild(icon);
        icon.addEventListener("click", () => {
            
            let ele = document.querySelector(".page-title .me-iframe-div");
            let video_id = item.video_id;
            let time = item.time;

            playVideoPlayer(time, video_id, ele);
        });
        */
        ele = div.querySelector(".icon_ .video");
        ele.classList.remove("hide");
        if (ele) {
            ele.addEventListener("click", (event) => {
                let ele = document.querySelector(".page-title .me-iframe-div");
                let video_id = item.video_id;
                let time = item.time;
                let iframe_id = "";
                playVideoPlayer(time, video_id, ele);
            });
        }
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

                if (ele.classList.contains("active")) {
                    div.querySelector(`.content-list > .list.${type}`).classList.remove("hide");
                }
            });
        });
    }
}

function addBlockLinkedItems(div) {
    var block_id = div.id;
    if (block_id == "NClzsgLw0") div.querySelector(".content-list .videos").innerHTML = "";
    div.querySelector(".content-list .images").innerHTML = "";
    div.querySelector(".content-list .links").innerHTML = "";
    var linked_div = div.querySelector(".linked-items");

    var videos = user_data[0].videos;
    videos.forEach((video) => {
        video.linked_blocks.forEach((blk) => {
            if (blk.block_id == block_id) {
                linked_div.classList.remove("hide");
                let time_hh = convertTimeSecondToHour(video.time);

                var div1 = document.createElement("div");
                div1.className = "video";
                div1.id = video.id ? video.id : "";
                div1.setAttribute("time", video.time);
                let tar_ele = linked_div.querySelector(".content-list .videos");
                tar_ele.appendChild(div1);
                div1.innerHTML = `<span class="link">${time_hh}: ${video.text}</span>`;
                div1.addEventListener("click", () => {
                    let ele = document.querySelector(".page-title .me-iframe-div");
                    playVideoPlayer(video.time, video.video_id, ele);
                    return;
                });
                linked_div.querySelector(".tabs .videos").classList.remove("hide");
                return;
                let iframe_id = tar_ele.closest(".me-block").id + video.video_id;

                var page_link = window.location.href; // Get the current URL
                if (page_link.includes("127.0.0")) {
                    page_link = "http://127.0.0.1:5500";
                } else {
                    page_link = "https://neetflix.life";
                }

                div1.innerHTML = `<div class="head_">
                                <span class="cross">X</span>
                            </div>
                            <div class="me-iframe">
                               <iframe  id="${iframe_id}"class="rm-iframe rm-video-player" frameborder="0" allowfullscreen="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" title="THE LIVING WORLD in 1 Shot: FULL CHAPTER COVERAGE (Theory+PYQs) ||  Prachand NEET 2024" width="640" height="360" src="https://www.youtube.com/embed/${video.video_id}?enablejsapi=1&amp;origin=${page_link}&amp;widgetid=5" ></iframe>
                            </div>
                            <div class="text">
                                
                            </div>
                            `;

                div1.querySelector(".text").addEventListener("click", (event) => {
                    let tar = event.target.closest(".video");
                });
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
                                    <img src="${image.url}"  class="user-image" id="${image.id}" alt="">
                                </div>`;
                let img = div1.querySelector("img");
                img.addEventListener("click", (event) => {
                    //showImagesInOverlay(event);
                });
                linked_div.querySelector(".tabs .images").classList.remove("hide");
            }
        });
    });
}

async function clearCache() {
    // Store user data in a variable
    var user_data = getDataFromLocale("user_data");
    // Unregister all service workers
    if ("serviceWorker" in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (let registration of registrations) {
            await registration.unregister();
        }
    }

    // Clear all caches
    const cacheNames = await caches.keys();
    for (let name of cacheNames) {
        await caches.delete(name);
    }

    // Save the user data back in local storage
    if (user_data) {
        localStorage.setItem("user_data", user_data);
    }

    // Optionally reload the page to apply changes
    //window.location.reload();
}

function saveUserData() {
    saveDataInLocale(`user_data_${exam}`, user_data);
}
function getUserData() {
    return getDataFromLocale(`user_data_${exam}`);
}

function updateDailyQuestionsCircles() {
    let que_div = document.querySelector(".page.random .que-div");
    let div = document.querySelector(".page.random .bottom .daily-practise-questions");
    if (!div) {
        div = document.createElement("div");
        div.className = "daily-practise-questions";
        let ele = document.querySelector(".page.random .bottom");
        ele.appendChild(div);

        div.innerHTML = `<div class="head">
                        <i class="fa-solid fa-chevron-right"></i>
                        <span>Today practise questions</span>
                    </div>
                    <div class="content hide">
                        <div class="circles"></div>
                        <div class="list"></div>
                    </div>`;
        ele = div.querySelector(".head");
        if (ele) {
            ele.addEventListener("click", () => {
                let eee = div.querySelector(".content");
                eee.classList.toggle("hide");
                if (eee.classList.contains("hide")) {
                    div.querySelector(".head i").className = "fa-solid fa-chevron-right";
                    div.querySelector(".head span").textContent = "Today practise questions";
                } else {
                    div.querySelector(".head i").className = "fa-solid fa-chevron-down";
                    div.querySelector(".head span").textContent = "Today practise questions";
                    showDailyQuestions(div);
                }
            });
        }
        //ele = div;
    }
}
function showDailyQuestions(div) {
    let div_circles = div.querySelector(".content .circles");
    if (div_circles) div_circles.innerHTML = "";

    let div_list = div.querySelector(".content .list");
    if (div_list) div_list.innerHTML = "";
    let ques = user_data[0].daily_practise_questions[0].questions;
    if (!ques.length) return;
    //ques = ques[0].questions;

    ques.forEach((qqq, index) => {
        let tar = div.querySelector(".content .list");
        let que = getQuestionById(qqq.que_id);

        let div_dot = document.createElement("div");
        div_dot.className = `que-dot`;
        div_circles.appendChild(div_dot);
        div_dot.addEventListener("click", () => {
            let que_id = qqq.que_id;
            let ele = div_list.querySelector(`#${que_id}`);
            scrollToView(ele);
        });

        let qq_div = displayQuestion(que, tar, "daily-ques");

        if (qqq.selected_option_id === qqq.answer_option_id) {
            let option = qq_div.querySelector(`#${qqq.selected_option_id}`);
            option.classList.add("selected");
            option.classList.add("correct");
            div_dot.classList.add("correct");
        } else {
            let option = qq_div.querySelector(`#${qqq.selected_option_id}`);
            option.classList.add("selected");
            option.classList.add("wrong");
            option = qq_div.querySelector(`#${qqq.answer_option_id}`);
            option.classList.add("correct");
            div_dot.classList.add("wrong");
        }
        qq_div.querySelectorAll(`div.option`).forEach((opt) => {
            opt.classList.add("disabled");
        });
    });
}

function loadMockTestHistory() {
    let ele = document.querySelector(".page.mock> .main");

    var div = document.createElement("div");
    div.className = "mock-history";
    ele.appendChild(div);

    div.innerHTML = `<div class="head me-header">
                        <i class="fa-solid arrow fa-chevron-right"></i>
                        <span>Mock Test History</span>
                    </div>
                    <div class="mock-history-list hide me-header-list me-dis-flex-co">
                    </div>
                    `;
    ele = div.querySelector(".me-header");
    if (ele) {
        addDividerBefore(ele);
        ele.addEventListener("click", (event) => {
            let ele = event.target.closest(".head");
            let eee = document.querySelector(".page.mock .mock-history-list");
            eee.classList.toggle("hide");
            if (eee.classList.contains("hide")) {
                ele.querySelector("i").className = "fa-solid fa-chevron-right";
                //head.querySelector("span").textContent = "Mock History";
            } else {
                ele.querySelector("i").className = "fa-solid fa-chevron-down";
                //head.querySelector("span").textContent = "Mock History";
                loadPreviousMockResults();
            }
        });
    }
}

function loadNewMockTestSection() {
    let main = document.querySelector(".page.mock .main");
    main.innerHTML = `
                    <div class="new-mock me-flex-co">
                        <div class="head me-header">
                            <i class="fa-solid arrow fa-chevron-down"></i>
                            <span class="label">New Mock Test</span>
                        </div>
                        <div class="content me-flex-co">
                            <span class="link start-new-mock">Start a new mock test</span>
                            <div class="mock-chapters">
                                <div class="head me-header-inner">
                                    <i class="fa-solid arrow fa-chevron-right"></i>
                                    <span class="label">Select Chapters</span>
                                </div>
                                <div class="list me-header-inner-list hide">
                                    <input type="search" class="filter" placeholder="filter chapters">
                                    <div class="mock-chapters-list"></div>
                                </div>
                            </div>
                            <div></div>
                        </div>
                    </div>`;

    let div = main.querySelector(".new-mock");

    let ele = div.querySelector(".me-header");
    if (ele) {
        ele.addEventListener("click", (event) => {
            let head = event.target.closest(".head");
            let eee = div.querySelector(".content");
            eee.classList.toggle("hide");
            if (eee.classList.contains("hide")) {
                head.querySelector("i").className = "fa-solid arrow fa-chevron-right";
            } else {
                head.querySelector("i").className = "fa-solid arrow fa-chevron-down";
            }
        });
    }

    ele = div.querySelector(".link.start-new-mock");
    if (ele) {
        ele.addEventListener("click", () => {
            startNewMockTest();
        });
    }

    ele = div.querySelector(".mock-chapters .me-header-inner");
    if (ele) {
        ele.addEventListener("click", (event) => {
            let head = event.target.closest(".head");
            let eee = div.querySelector(".mock-chapters .me-header-inner-list");
            eee.classList.toggle("hide");
            if (eee.classList.contains("hide")) {
                head.querySelector("i").className = "fa-solid arrow fa-chevron-right";
            } else {
                head.querySelector("i").className = "fa-solid arrow fa-chevron-down";
                let tar = div.querySelector(".mock-chapters-list");

                tar.innerHTML = "";
                let chapters = document.querySelectorAll(".page.notes .sidebar .me-chapter .name.link");

                chapters.forEach((chapter) => {
                    let ddd = document.createElement("div");
                    ddd.classList = "me-mock-chapter me-dis-flex";
                    tar.appendChild(ddd);

                    ddd.innerHTML = ` <input type="checkbox" name="" id="">
                          <span class="name">${chapter.textContent}</span>`;
                });
            }
        });
    }
    div.querySelector(".mock-chapters > .head").click();

    ele = div.querySelector(".mock-chapters  input");
    if (ele) {
        ele.addEventListener("input", (event) => {
            const filter = event.target.value.trim().toLowerCase();
            const chapters = div.querySelectorAll(".me-mock-chapter .name");

            // Loop through each tag
            chapters.forEach((chapter) => {
                // Get the text content of the tag and convert it to lowercase
                const tagName = chapter.textContent.toLowerCase();

                // Check if the tag matches the filter
                if (tagName.includes(filter)) {
                    chapter.parentElement.style.display = ""; // Show the tag
                } else {
                    chapter.parentElement.style.display = "none"; // Hide the tag
                }
            });
        });
    }
}
function loadPredefinedMocks() {
    let ele = document.querySelector(".page.mock > .main ");

    var div = document.createElement("div");
    div.className = "pre-defined-mocks";
    ele.appendChild(div);

    div.innerHTML = `<div class="head me-header">
                        <i class="fa-solid arrow fa-chevron-right"></i>
                        <span>Static Mock Tests</span>
                    </div>
                    <div class="mock-test-list list hide me-header-list">
                        
                    </div>
                    `;
    ele = div.querySelector(".me-header");
    if (ele) {
        addDividerBefore(ele);
        ele.addEventListener("click", (event) => {
            let ele = event.target.closest(".head");
            let eee = div.querySelector(".mock-test-list");
            eee.classList.toggle("hide");
            if (eee.classList.contains("hide")) {
                ele.querySelector("i").className = "fa-solid fa-chevron-right";
                //head.querySelector("span").textContent = "Mock History";
            } else {
                ele.querySelector("i").className = "fa-solid fa-chevron-down";
                //head.querySelector("span").textContent = "Mock History";
            }
        });
    }
    let list_ele = div.querySelector(".mock-test-list");
    mocks_data.forEach((mock, index) => {
        var div_mock = document.createElement("div");
        div_mock.className = "pd-mock";
        list_ele.appendChild(div_mock);

        div_mock.innerHTML = `
                            <span class="start link">Mock Test ${index + 1}</span>
                            <div class="history">
                                <div class="head me-header-inner hide">
                                    <i class="fa-solid arrow fa-chevron-right"></i>
                                    <span class="label">History</span>
                                </div>
                                <div class="history-list  me-header-list list hide">
                                </div>
                            </div>`;

        ele = div_mock.querySelector(".me-header-inner");
        let div = div_mock;
        if (ele) {
            //addDividerBefore(ele);
            ele.addEventListener("click", (event) => {
                let ele = event.target.closest(".head");
                let eee = div.querySelector(".me-header-list");
                eee.classList.toggle("hide");
                if (eee.classList.contains("hide")) {
                    ele.querySelector("i").className = "fa-solid fa-chevron-right";
                    //head.querySelector("span").textContent = "Mock History";
                } else {
                    ele.querySelector("i").className = "fa-solid fa-chevron-down";
                    //head.querySelector("span").textContent = "Mock History";
                }
            });
        }

        ele = div_mock.querySelector(".start.link");
        if (ele) {
            ele.addEventListener("click", () => {
                startNewMockTest(mock);
            });
        }
    });
}

function openSettingPage() {
    openPage("more");

    let ele = document.querySelector(".page.more .download");
    if (ele) return;

    var page = document.querySelector(".page.more");

    var div1 = document.createElement("div");
    div1.className = "data-related";
    page.appendChild(div1);

    var div = document.createElement("div");
    div.className = "download";
    div1.appendChild(div);
    div.innerHTML = `
                    <i class="fa-solid  fa-download"></i>
                    <span class="label">Download User Data</span>
                    `;
    div.addEventListener("click", () => {
        downloadJSON(user_data);
    });

    div = document.createElement("div");
    div.className = "import";
    div1.appendChild(div);
    div.innerHTML = `
                    <i class="fa-solid  fa-file-import"></i>
                    <span class="label">Import User Data</span>
                    `;
    div.addEventListener("click", () => {
        importUserData();
    });
}

function supportMyWork() {
    var ele = document.querySelector(".page.home .support-me");
    if (ele) return;

    let page = document.querySelector(".page.home");
    //let intex_tags = document.querySelector(".page.random .index-tags");

    var div = document.createElement("div");
    div.className = "support-me";
    page.appendChild(div);
    //page.insertBefore(div, intex_tags);

    div.innerHTML = `<div class="head me-header">
                        <i class="fa-solid arrow fa-chevron-right"></i>
                        <span class="label"> ₹ Support Me 💵💰💳 🤗</span>
                    </div>
                    <div class="me-header-list  hide list">
                    <span>If you find this app useful in your prepration then do support my work, this will help me continue this project and improve it even further.</span>
                    <div class="upi">
                        <span>You can support me through UPI</span>
                        <div class="upi-id">
                            <span> UPI:</span>
                            <span>6005480317@upi</span>
                            <i class="fa-regular fa-copy copy"></i>
                        </div>
                        <div class="scanner">
                            <span>OR
                            Scan the below QR code:
                            </span>
                        </div>
                    </div>
                    </div>
                    `;

    let img = document.createElement("img");
    img.src = `/assets/gpay_qr_code.jpg`;
    div.querySelector(".upi .scanner").appendChild(img);

    ele = div.querySelector(".me-header");
    if (ele) {
        ele.addEventListener("click", (event) => {
            let ele = event.target.closest(".me-header");
            let eee = div.querySelector(".me-header-list");
            eee.classList.toggle("hide");
            if (eee.classList.contains("hide")) {
                ele.querySelector(".head i").className = "fa-solid arrow fa-chevron-right";
                //ele.querySelector(".head span").className = "Show linked items";
            } else {
                ele.querySelector(".head i").className = "fa-solid arrow fa-chevron-down";
                //ele.querySelector(".head span").className = "Hide linked items";
            }
        });
    }

    ele = div.querySelector(".upi-id");
    if (ele) {
        ele.addEventListener("click", (event) => {
            copyToClipboard("6005480317@upi");
            popupAlert("UPI ID Copied to Clipboard");
        });
    }
}
function addSocialMediaSection() {
    var ele = document.querySelector(".page.home .social-media");
    if (ele) return;

    let page = document.querySelector(".page.home");

    var div = document.createElement("div");
    div.className = "social-media about-me";
    page.appendChild(div);

    var span = document.createElement("h1");
    span.className = "";
    span.textContent = "✨ Follow me:";
    div.appendChild(span);

    var id = "mehboobelahi05";
    var link = ["facebook", "twitter", "instagram", "youtube"];

    var div2 = document.createElement("div");
    div2.className = "social-media .links";
    div.appendChild(div2);

    link.forEach((site) => {
        var a = document.createElement("a");
        a.className = `icon ${name}`;
        a.target = "_blank";
        a.href = `https://${site}.com/${id}`;
        div2.appendChild(a);
        if (site == "youtube") a.href = `https://www.${site}.com/@${id}/featured`;

        var img = document.createElement("img");
        img.src = `./assets/${site}.png`;
        a.appendChild(img);
    });
}

var old_url = "";
var first_time = true;
function openItemBasedOnURL() {
    let obj = null;
    let url = window.location.href;
    if (first_time) {
        obj = parseUrl3(url);

        if (obj.exam) exam = obj.exam;
        first_time = false;
        clearCache();
        getDataFromJSONFiles();
    }

    if (que_data.length && user_data.length) {
    } else {
        return;
    }

    clearInterval(interva_url);
    initialLoading();
    obj = parseUrl3(url);
    old_url = url;
    //url = "http://127.0.0.1:5500/ssc/question/9Km7Pmaa4";
    if (obj.type) {
        exam = obj.exam;
        let type = obj.type;
        let que_id = obj.que_id;
        let page_id = obj.page_id;
        let block_id = obj.block_id;
        openNotesPage2(); // To load the notes data

        if (type == "question") {
            openPage("random");
            if (que_id) {
                openMCQPage(que_id);
                //let que = getQuestionById(que_id);
                //displayQuestion(que);
            }
        } else if (type == "notes") {
            if (block_id) {
                //openChapterById(page_id, block_id);
                openNotesPage2(page_id, block_id);
            } else if (page_id) {
                //openChapterById(page_id);
                openNotesPage2(page_id);
            } else {
                openNotesPage2();
            }
        } else if (type == "home") {
            openPage("home");
        } else if (type == "mock") {
            openMockPage();
        } else if (type == "more") {
            openSettingPage();
        } else if (type == "tasks") {
            openTasksPage();
        } else {
            openPage("home");
        }
    } else {
        openNotesPage2();
        openPage("home");
    }
}
function parseUrl3(url) {
    let urlObj = new URL(url);
    let hashFragment = urlObj.hash.substring(1);
    let segments = hashFragment.split("/").filter((segment) => segment.length > 0);

    let result = {
        exam: null,
        type: null,
        que_id: null,
        page_id: null,
        block_id: null,
    };

    if (segments.length === 0) {
        return result;
    }

    result.exam = segments[0] || null;
    result.type = segments[1] || null;

    if (result.type === "question" && segments.length >= 3) {
        result.que_id = segments[2] || null;
    } else if (result.type === "notes" && segments.length >= 3) {
        result.page_id = segments[2] || null;
        if (segments.length >= 4) {
            result.block_id = segments[3] || null;
        }
    }
    return result;
}
var interva_url = setInterval(() => {
    openItemBasedOnURL();
}, 100);

function openSidebar(event) {
    let ele;

    if (event instanceof Event) {
        ele = event.target;
    } else {
        ele = event;
    }

    let page = ele.closest(".page");
    if (is_mobile) {
        page.children[0].style.flex = "0 0 30%";
        page.children[1].style.flex = "0 0 70%";
    } else {
        page.children[0].style.flex = "0 0 60%";
        page.children[1].style.flex = "0 0 40%";
    }
}

function closeSidebar(event) {
    let ele;

    if (event instanceof Event) {
        ele = event.target;
    } else {
        ele = event;
    }
    let page = ele.closest(".page");
    page.children[0].style.flex = "0 0 100%";
    page.children[1].style.flex = "0 0 0%";
}
function setMcqPageMainItemEvents(main) {
    var ele = "";

    ele = main.querySelector(".filter-section div.filter");
    if (ele) {
        ele.addEventListener("click", (event) => {
            openSidebar(event);
        });
    }

    ele = main.querySelector(".fa-sidebar-flip");
    if (ele) {
        ele.addEventListener("click", (event) => {
            openSidebar(event);
        });
    }

    ele = main.querySelector("button.new-question");
    if (ele) {
        ele.addEventListener("click", () => {
            //unselectSelectQuestionDot();
            ++curr_que_index;
            if (curr_que_index == fil_ques.length) {
                curr_que_index = 0;
                sortArrayRandomly(fil_ques);
            }
            curr_ques = fil_ques[curr_que_index];

            //document.querySelector(".mcq.page .main .que-div").classList.add("flip");
            let exp_div_target = document.querySelector(".page.mcq .main .question-section");
            var exp_div = exp_div_target.querySelector(".explanations");
            if (exp_div) exp_div.remove();

            displayQuestion(curr_ques);
        });
    }
}

function setMcqPageSidebarItemEvents(sidebar) {
    var ele = "";

    ele = sidebar.querySelector(".header .cross");
    if (ele) {
        ele.addEventListener("click", (event) => {
            closeSidebar(event);
        });
    }

    ele = sidebar.querySelector(".all-tags  input");
    if (ele) {
        ele.addEventListener("input", (event) => {
            //var tag = setAutoComplete(event, "filter-all-tags");

            const filter = event.target.value.trim().toLowerCase();

            // Get all tags
            const tags = document.querySelectorAll(".all-tags-list .tag");

            // Loop through each tag
            tags.forEach((tag) => {
                // Get the text content of the tag and convert it to lowercase
                const tagName = tag.querySelector(".tag-name").textContent.toLowerCase();

                // Check if the tag matches the filter
                if (tagName.includes(filter)) {
                    tag.style.display = ""; // Show the tag
                } else {
                    tag.style.display = "none"; // Hide the tag
                }
            });
        });
    }

    let tabs = sidebar.querySelectorAll(".tabs .tab");
    if (tabs) {
        tabs.forEach((tab) => {
            tab.addEventListener("click", (event) => {
                let ele = event.target;
                let classes = ["chapter-tag", "all-tags"];
                let tab_class = classes.find((cls) => ele.classList.contains(cls));

                let tabs2 = sidebar.querySelectorAll(".tabs .tab");
                tabs2.forEach((tab2) => {
                    if (!tab2.classList.contains(tab_class)) tab2.classList.remove("active");
                    else tab2.classList.add("active");
                });

                let pages = sidebar.querySelectorAll(".content > div");
                pages.forEach((page) => {
                    if (!page.classList.contains(tab_class)) page.classList.add("hide");
                    else page.classList.remove("hide");
                });
            });
        });
    }
}

function setNotesPageSidebarItemEvents(sidebar) {
    var ele = "";
    ele = sidebar.querySelector(".header .cross");
    if (ele) {
        ele.addEventListener("click", (event) => {
            closeSidebar(event);
        });
    }

    ele = sidebar.querySelector(".search .top button.search");
    if (ele) {
        ele.addEventListener("click", (event) => {
            let text = sidebar.querySelector(".search .top input").value.trim();
            if (text != "") searchTextInNotes(text);
        });
    }

    ele = sidebar.querySelector(".search .top input");
    if (ele) {
        ele.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                let text = event.target.value.trim();
                if (text != "") searchTextInNotes(text);
            }
        });
    }

    let tabs = sidebar.querySelectorAll(".tabs .tab");
    if (tabs) {
        tabs.forEach((tab) => {
            tab.addEventListener("click", (event) => {
                let ele = event.target;
                let classes = ["chapter-index", "search"];
                let tab_class = classes.find((cls) => ele.classList.contains(cls));

                let tabs2 = sidebar.querySelectorAll(".tabs .tab");
                tabs2.forEach((tab2) => {
                    if (!tab2.classList.contains(tab_class)) tab2.classList.remove("active");
                    else tab2.classList.add("active");
                });

                let pages = sidebar.querySelectorAll(".content > div");
                pages.forEach((page) => {
                    if (!page.classList.contains(tab_class)) page.classList.add("hide");
                    else page.classList.remove("hide");
                });
            });
        });
    }
}

function searchTextInNotes(search_text) {
    let tar_ele = document.querySelector(".page.notes .sidebar .search-results");
    tar_ele.innerHTML = "";
    pages_data.forEach((page) => {
        let page_id = page.id;
        let data = page.data;
        data.forEach((block) => {
            searchTextInBlocks(block, page_id, tar_ele, search_text);
        });
    });
}
function searchTextInBlocks(block, page_id, tar_ele, search_text) {
    let text = block.text;
    const regex = new RegExp(search_text, "i");
    let is_text = regex.test(text);

    if (is_text) {
        const regex = new RegExp(search_text, "gi");
        text = text.replace(regex, (match) => `^^${match}^^`);

        let ttt = page_id;
        ttt = escapeCSSSelector(ttt);
        var ele = document.querySelector(`.page.notes .sidebar .content .chapter-index #${ttt}`);
        if (!ele) {
            ttt = page_id;
            ttt = escapeCSSSelector2(ttt);
            ele = document.querySelector(`.page.notes .sidebar .content .chapter-index #${ttt}`);
        }
        let par_ele = ele.closest(".children").parentElement.querySelector(".name");
        let arr = [];
        arr.push(par_ele.textContent);
        arr.push(ele.textContent);

        let div = document.createElement("div");
        div.id = block.id;
        div.setAttribute("page-id", page_id);
        div.className = "me-search-block";
        tar_ele.appendChild(div);
        div.addEventListener("click", () => {
            openChapterById(page_id, block.id);
        });

        let div2 = document.createElement("div");
        div2.className = "path";
        div.appendChild(div2);

        arr.forEach((aa) => {
            let span = document.createElement("span");
            span.textContent = aa + " > ";
            div2.appendChild(span);
        });

        let span2 = document.createElement("span");
        span2.innerHTML = getHTMLFormattedText(text);
        div.appendChild(span2);
    }
    if (block.children.length) {
        block.children.forEach((child) => {
            searchTextInBlocks(child, page_id, tar_ele, search_text);
        });
    }
}
function showImagesInOverlay(event) {
    let img = event.target;
    let ele = "";
    var div = document.createElement("div");
    div.className = "me-image-overlay me-io";
    div.innerHTML = `
                    <i class="fa-regular fa-xmark cross me-mla"></i>
                    <img id="overlay-img" class="overlay-img" src="" alt="Image" />
                    <i class="fa-regular fa-chevron-left prev"></i>
                    <i class="fa-regular fa-chevron-right next"></i>
                    `;
    document.body.appendChild(div);

    ele = div.querySelector(".cross");
    if (ele) {
        ele.addEventListener("click", () => {
            div.remove();
        });
    }

    if (img.classList.contains("user-image")) {
        let all_images = document.querySelectorAll(".page-title  .user-image");
        let current_image_index = 0;
        all_images.forEach((image, index) => {
            if (image === img) current_image_index = index;
        });
        div.querySelector("img").src = all_images[current_image_index].src;

        div.querySelector(".next").addEventListener("click", () => {
            ++current_image_index;
            if (current_image_index == all_images.length) --current_image_index;
            div.querySelector("img").src = all_images[current_image_index].src;
            return;
        });

        div.querySelector(".prev").addEventListener("click", () => {
            --current_image_index;
            if (current_image_index == all_images.length) ++current_image_index;
            div.querySelector("img").src = all_images[current_image_index].src;
            return;
        });
    } else if (img.classList.contains("note-image")) {
        let all_images = document.querySelectorAll(".page-title > .chidlren .note-image");
        let current_image_index = 0;
        all_images.forEach((image, index) => {
            if (image === img) current_image_index = index;
        });

        div.querySelector("img").src = all_images[current_image_index].src;

        div.querySelector(".next").addEventListener("click", () => {
            ++current_image_index;
            if (current_image_index == all_images.length) --current_image_index;
            div.querySelector("img").src = all_images[current_image_index].src;
            return;
        });

        div.querySelector(".prev").addEventListener("click", () => {
            --current_image_index;
            if (current_image_index == all_images.length) ++current_image_index;
            div.querySelector("img").src = all_images[current_image_index].src;
            return;
        });
    }
}

function loadPage(target, page_name) {
    // Construct the path to the HTML file assuming it's in the same directory
    var filePath = page_name + ".html";

    // Create a new XMLHttpRequest (XHR) object
    var xhr = new XMLHttpRequest();

    // Set up the xhr object
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // If successful, set the target element's innerHTML to the loaded content
                target.innerHTML = xhr.responseText;
            } else {
                // If error, handle it accordingly (e.g., log it, show an error message)
                console.error("Error loading page:", xhr.status, xhr.statusText);
            }
        }
    };

    // Open the XHR request
    xhr.open("GET", filePath, true);

    // Send the request
    xhr.send();
}
