const firebaseConfig = {
    apiKey: "AIzaSyBJA35C49-PGhTYOLq6M2WCogPrAf4N1Xo",
    authDomain: "siljuapp-4c428.firebaseapp.com",
    projectId: "siljuapp-4c428",
    storageBucket: "siljuapp-4c428.appspot.com",
    messagingSenderId: "577085941993",
    appId: "1:577085941993:web:85460382e9e73d29a12878",
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();
firebase.analytics();

// VARIABLES

var exam = "ssc";
let ver_ques = [];
let unver_ques = [];
var total_visitors = 0;
var user_login_data = {};
var userdata = null;
var first_time = true;
var user_questions = [];
function signinSetup() {
    // Initialize Firebase Auth
    const auth = firebase.auth();
    const provider = new firebase.auth.GoogleAuthProvider();

    // Function to sign in with Google
    document.getElementById("google-sign-in-btn").onclick = function () {
        auth.signInWithPopup(provider)
            .then((result) => {
                // This gives you a Google Access Token
                const credential = result.credential;
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;

                user_login_data = {
                    email: user.email,
                    display_name: user.displayName,
                    photo_url: user.photoURL,
                    username: user.email.substring(0, user.email.indexOf("@")),
                    userid: generateUniqueId(),
                };

                checkIsUserExist(user.email);
                saveDataInLocale("user_login_data", user_login_data);

                postLogin();
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential = error.credential;

                console.error("Error during signInWithPopup:", errorCode, errorMessage);
                //alert("Error: " + errorMessage);
            });
    };

    // Function to sign out
    /* 
    document.getElementById("sign-out-btn").onclick = function () {
        auth.signOut()
            .then(() => {
                saveDataInLocale("user_login_data", null);
                alert("User signed out");
                //location.reload(true);

                document.querySelector(".start.login").classList.remove("hide");
                document.querySelector(".content").classList.add("hide");
            })
            .catch((error) => {
                console.error("Sign out error:", error);
                alert("Error: " + error.message);
            });
    }; */

    // Optional: Monitor authentication state
    auth.onAuthStateChanged((user) => {
        if (user && false) {
            // User is signed in, show user info

            let gmail = user.email;
            let display_name = user.displayName;
            let photo_url = user.photoURL;
            let username = gmail.substring(0, gmail.indexOf("@"));

            user_login_data = {
                gmail: gmail,
                display_name: display_name,
                photo_url,
                username: username,
            };

            let user_ref = database.ref(`users/${username}`);
            user_ref.once("value").then(function (snapshot) {
                let obj = snapshot.val();

                if (obj) {
                    //user_data = getUserData(); // Getting userdata from locale
                    //if (!user_data[0]) user_data[0] = obj.data[exam];
                    user_data[0] = obj.data[exam];
                } else {
                    let obj = {
                        username: user_login_data.username,
                        display_name: user_login_data.display_name,
                        gmail: user_login_data.gmail,
                    };
                    database.ref(`users/${username}/user_info`).set(obj);
                    //database.ref(`users/${username}/data/${exam}`).set(user_data[0]);
                }
            });

            let ele = document.querySelector(".user-info");
            ele.classList.remove("hide");
            ele.querySelector(".name-photo img").src = photo_url;
            ele.querySelector(".name").textContent = display_name;
            ele.querySelector(".email").textContent = gmail;

            document.getElementById("google-sign-in-btn").classList.add("hide");
        } else {
            // No user is signed in, hide user info
            //document.getElementById("user-info").style.display = "none";
            document.getElementById("google-sign-in-btn").classList.remove("hide");
        }
    });
}

var subjects = {
    neet: ["Biology", "Physics", "Chemistry"],
    ssc: ["General Studies", "English", "Aptitude", "Reasoning"],
    upsc: ["History", "Polity", "Economy", "Int Relations", "Environment"],
};

let is_online = navigator.onLine; // This is just an example. You might have your own way to determine online status.

var all_tags = [];
var new_add_ques_tags = [];

var que_type = "mcq";
var fil_vocab = [];
var curr_vocab = "";
var curr_vocab_index = 0;
// ghghghg
var me_video_player = null;
var is_mobile = false;
var video_links_data = [];
var tttt = [];
//load data
var testing = true;
var updated_ques = [];

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
let user = {
    id: "",
    username: "",
};
// is

var data_other = [];
var autocompleteList = "";

let gist_ids = {
    usernames: "46125033e188871ffa4ea94580d78995",
    user_data: "73963e176edf6bfa16363d810838622a",
};

var git_token = "";

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

    ele = document.querySelector(".tab.user");
    if (ele) {
        ele.addEventListener("click", () => {
            loadUserPage();
            openPage("user");
        });
    }

    let touchStartY = 0;
    let touchEndY = 0;

    function handleTouchStart(event) {
        touchStartY = event.changedTouches[0].clientY;
    }

    function handleTouchEnd(event) {
        touchEndY = event.changedTouches[0].clientY;
        if (touchEndY > touchStartY + 50) {
            // Swipe down threshold
            event.preventDefault(); // Prevent default action on swipe-down
        }
    }

    /*document.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchend", handleTouchEnd, { passive: false });
    */

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
async function initialLoading() {
    if (window.innerWidth < 550) {
        document.body.classList.add("mobile");
        is_mobile = true;
    }
    document.querySelector(".loading").classList.add("hide");
    document.querySelector(".me-content").classList.remove("hide");

    setHomePageEvents();

    //let target = document.querySelector(".page.home");
    //loadPage(target, "home");

    // Set Id to track Users
    /*
    let user_id_for_tracking = localStorage.getItem("user_id_for_tracking");
    if (!user_id_for_tracking) {
        user_id_for_tracking = generateUniqueId();
        saveDataInLocale("user_id_for_tracking", user_id_for_tracking);
    }
    let user_ref = database.ref(`${exam}/visitor_ids`);
    user_ref.once("value").then(function (snapshot) {
        let obj = snapshot.val();
        if (!obj) {
            obj = {
                visitor_ids: [],
            };
        }
        if (!obj.visitor_ids.includes(user_id_for_tracking)) obj.visitor_ids.push(user_id_for_tracking);
        database.ref(`${exam}/visitor_ids`).set(obj);
        let div = document.querySelector(".total-visitors .num");
        div.textContent = obj.visitor_ids.length;
    });
    */

    let div = document.createElement("div");
    div.className = "me-overlay hide";
    document.body.appendChild(div);
    div.innerHTML = `<div class="content"></div>`;
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
        let create_new_tags = false;
        if (type == "add-new-que-tags") create_new_tags = true;
        var inputValue = input.value.trim().toLowerCase();
        //const matchingNames = [];
        //try {
        const matchingNames = arr.filter((name) => name.toLowerCase().includes(inputValue));
        //} catch (e) {}
        if (!matchingNames.length && !create_new_tags) {
            autocompleteList.classList.remove("active");
            return null;
        }
        autocompleteList.innerHTML = "";

        if (create_new_tags) {
            const inputItem = document.createElement("div");
            inputItem.textContent = 'new: "' + inputValue + '"';

            inputItem.addEventListener("click", (event) => {
                var tar = input.parentElement;
                var tag = event.target.textContent.match(/"([^"]*)"/)[1].trim();
                new_add_ques_tags.push(tag);
                input.value = "";
                input.focus();
                autocompleteList.classList.remove("active");
                addTagElementInTarget(type, tag, target);
            });
            autocompleteList.appendChild(inputItem);
        }

        matchingNames.forEach((name) => {
            const item = document.createElement("div");
            item.textContent = name;

            item.addEventListener("click", (event) => {
                var tar = input.parentElement;
                var tag = event.target.textContent.trim();
                input.value = "";
                input.focus();
                autocompleteList.classList.remove("active");

                if (type == "search-users") {
                    let username = tag.split("@")[1];
                    for (let i = 0; i < all_users_info.length; i++) {
                        let user_info = all_users_info[i];
                        if (!user_info) continue;
                        if (user_info.username == username) {
                            displayUserPage(user_info);
                            autocompleteList.classList.remove("active");
                            return;
                        }
                    }
                }

                addTagElementInTarget(type, tag, target);
                return;

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
    let all_ques = esa_ques.concat(shared_ques);
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
    let data = localStorage.getItem(key);
    if (data) {
        try {
            data = JSON.parse(data);
        } catch {
            return null;
        }
    }
    return data;
}

function saveDataInLocale(key, data) {
    data = JSON.stringify(data);
    localStorage.setItem(key, data);
    console.log(`Data for "${key}" saved in locale`);
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
    for (const que of all_ques) {
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
    for (var i = 0; i < 15; i++) {
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
        //popupAlert("Gist updated successfully");
        new_ques = [];
        saveDataInLocale("new_ques", new_ques);
    } catch (error) {
        console.error("Failed to update gist:", error);
        //popupAlert("Failed to Update Gist");
    }
}

async function updateGistFile(id, filename, data_in_array) {
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

function popupAlert(message, time_in_sec, color) {
    var div = document.createElement("div");
    div.className = "me-popup-alert" + (color ? ` ${color}` : "");
    div.innerHTML = `
        <span class="message">${message}</span>
        <span class="close">x</span>
    `;
    document.body.append(div);
    div.querySelector(".close").addEventListener("click", () => {
        div.remove();
    });
    if (time_in_sec) {
        setTimeout(function () {
            div.remove();
        }, `${time_in_sec * 1000}`);
    } else {
        setTimeout(function () {
            div.remove();
        }, 5000);
    }
}

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

function addTagElementInTarget(type, tag, target) {
    tag = tag.trim().toLowerCase();
    let tag_div = getTagElement(tag);
    if (target) {
        let tags = target.querySelectorAll(".name");
        tags.forEach((tag_span) => {
            if (tag_span.textContent == tag) {
                popupAlert("Duplicate tag");
                return;
            }
        });
        target.appendChild(tag_div);
    }
    tag_div.querySelector(".cross").addEventListener("click", () => {
        tag_div.remove();
    });
}
function getTagElement(tag) {
    var div = document.createElement("div");
    div.className = "tag";
    div.innerHTML = `<span class="name">${tag}</span>
                     <span class="cross">x</span>`;
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
    setUrl(tab);
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
        ele = document.querySelector(".page.mock .main");
        ele.innerHTML = `
                        <div class="page-tabs">
                            <div class="new-mock active">New Mock</div>
                            <div class="static-mock">Static Mocks</div>
                            <div class="mock-history">Mock History</div>
                        </div>
                        <div class="page-content">
                            <div class="new-mock"> NEW MOCK </div>
                            <div class="static-mock hide"> STATIC MOCK </div>
                            <div class="mock-history hide"> MOCK HISTORY </div>
                        </div>`;

        let tabs = document.querySelectorAll(".page.mock .main .page-tabs > div");
        tabs.forEach((tab) => {
            tab.addEventListener("click", (event) => {
                let tab_ele = event.target;
                let tab_classes = ["new-mock", "static-mock", "mock-history"];
                let tab_class = tab_classes.find((cls) => tab_ele.classList.contains(cls));

                let tabs2 = document.querySelectorAll(".page.mock .main .page-tabs > div");
                tabs2.forEach((tab2) => {
                    if (!tab2.classList.contains(tab_class)) tab2.classList.remove("active");
                    else tab2.classList.add("active");
                });

                let pages = document.querySelectorAll(".page.mock .main  .page-content > div");
                pages.forEach((page) => {
                    if (!page.classList.contains(tab_class)) page.classList.add("hide");
                    else page.classList.remove("hide");
                });
            });
        });

        loadNewMockTestSection();
        loadPredefinedMocks();
        loadMockTestHistory();
        ele = document.querySelector(".page.mock .main .page-tabs .mock-history");
        if (ele) {
            ele.addEventListener("click", () => {
                loadMockTestHistory();
            });
        }

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
                            <div class="tab chapter-index active">Chapter List</div>
                            <div class="tab search">Search in Notes</div>
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

        /*
        div2.innerHTML = `<i class="fa-regular fa-circle"></i>
        <span class="name link">${item.text}</span>`;

        let i2 = document.createElement("i");
        i2.className = "fa-regular fa-circle";
        div2.appendChild(i2);
        */
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

        //ele = div.querySelector(".icon_ .todo");
        //ele.classList.remove("hide");

        /* let read_later_array = userdata.tasks.read_later ? userdata.tasks.read_later : [];
        for (let i = 0; i < read_later_array.length; i++) {
            if (read_later_array[i].block_id === item.id) {
                ele.className = "fa-regular todo fa-circle-check";
                break;
            }
        } */
        // ele
        if (false) {
            ele.addEventListener("click", (event) => {
                ele = event.target;
                let type = "";
                let read_later_array = userdata.tasks.read_later ? userdata.tasks.read_later : [];
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

    let children = item.children ? item.children : [];
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
            //i.className = "fa-brands fa-youtube video";
            i.className = "fa-duotone fa-solid fa-play video";
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

    // Convert {video:ASDASDDE:399} to <i class="fa-brands fa-youtube video" id="video-id" time="399"></i> fa-duotone fa-solid fa-play
    //text = text.replace(/\{video:([^:]+):(\d+)\}/g, '<i class="fa-brands fa-youtube video" id="$1" time="$2"></i>');
    text = text.replace(/\{video:([^:]+):(\d+)\}/g, '<i class="fa-duotone fa-solid fa-play video" id="$1" time="$2"></i>');

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
    block.children = block.children ? block.children : [];
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

    ele = div.querySelector(".icon_");
    if (ele) ele.classList.remove("hide");

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

function playVideoPlayer(video_id, time, event) {
    let target = "",
        iframe = "";
    target = event.target.closest(".page");
    if (target.classList.contains("mcq")) {
        openOverlay();
        target = document.querySelector(".me-overlay .content .me-iframe-div");
        iframe = document.querySelector(".me-overlay .content .me-iframe-div iframe");
        if (!target) {
            let div = document.createElement("div");
            div.className = "me-iframe-div";
            div.innerHTML = `<span > TTT </span>`;
            document.querySelector(".me-overlay .content").appendChild(div);
            target = div;
            //initializeYouTubePlayer(time, video_id, target);
            //return;
        }
    } else if (target.classList.contains("notes")) {
        target = event.target.closest(".page").querySelector(".me-iframe-div");
        iframe = document.querySelector(".page.notes .me-iframe-div  iframe");
    }
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
    let iframe = target.querySelector("iframe");
    var url = window.location.href; // Get the current URL
    url = url.substring(0, url.indexOf("//#", 8));
    if (!iframe) {
        target.innerHTML = `<div class="header">
                                    <span class="cross">X</span>
                                </div>
                                <div class="me-iframe">
                                <iframe  id="${video_id}"class="rm-iframe rm-video-player" frameborder="0" allowfullscreen="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" title="THE LIVING WORLD in 1 Shot: FULL CHAPTER COVERAGE (Theory+PYQs) ||  Prachand NEET 2024" width="640" height="360" src="https://www.youtube.com/embed/${video_id}?enablejsapi=1&amp;origin=${url}&amp;widgetid=5" ></iframe>
                                </div>
                            `;
        let ele = target.querySelector(".header .cross");
        if (ele) {
            ele.addEventListener("click", (event) => {
                let ele = event.target.closest(".me-overlay");
                me_video_player.pauseVideo();
                me_video_player = null;
                target.innerHTML = "";
                if (ele) {
                    closeOverlay();
                }
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
    var mocks = userdata.mocks;
    if (!mocks) mocks = [];
    mocks.forEach((mock, index) => {
        var div_mock = document.createElement("div");
        div_mock.className = "mock-data me-dis-flex-co";
        div_mock.id = mock.id;
        tar_ele.appendChild(div_mock);
        div_mock.innerHTML = `
                                                        <span class="date">Aug 10th, 2024</span>
                            <div class="questions_">
                                <span class="total">20</span>
                                <span class="attempted">10</span>
                                <span class="correct">5</span>
                                <span class="incorrect">5</span>
                            </div>
                            <div class="me-dis-flex">
    <div class="marks">
        <span>Marks: 20 / 40</span>
    </div>
    <span class="link show-questions">Show questions</span>
</div>
                            `;

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

        if (!questions_attempted) {
            div_mock.remove();
            return;
        }
        //let date = getFormattedDate(mock.date);
        let date = getFormattedDateMMddYYYY(mock.date);

        div_mock.querySelector(".date").textContent = `${date}`;
        div_mock.querySelector(".total").textContent = `Total: ${total_questions}`;
        div_mock.querySelector(".attempted").textContent = `Attempted: ${questions_attempted}`;
        div_mock.querySelector(".correct").textContent = `Correct: ${correct_questions}`;
        div_mock.querySelector(".incorrect").textContent = `Incorrect: ${wrong_questions}`;

        let marks = correct_questions * 2 - wrong_questions * 0.6;
        marks = marks.toFixed(1);
        div_mock.querySelector(".marks span").textContent = `Marks:  ${marks} / ${total_questions * 2}`;

        var passingMarks = total_questions * 2 * 0.35;

        if (marks >= passingMarks) {
            div_mock.querySelector(".marks").classList.add("pass");
        } else {
            div_mock.querySelector(".marks").classList.add("fail");
        }

        let ele = div_mock.querySelector(".show-questions");
        if (ele) {
            ele.addEventListener("click", () => {
                showPreviousMockQuestions(mock);
            });
        }
    });
}

function showPreviousMockQuestions(mock) {
    let div = document.querySelector(".page.mock .sidebar .content .prev-mock-questions ");
    div.innerHTML = "";
    openSidebar(div);
    mock.questions.forEach((item) => {
        var que = getQuestionById(item.id);
        var que_div = displayQuestion(que, div, "prev-mock-que");
        displayQuestionActionItems(que_div, que);
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

function startNewMockTest(mock, type) {
    // Load chapters if selected for mock test

    var selected_chapters = [];
    let chapters = document.querySelectorAll(".new-mock .mock-chapters-list .tag-item");
    if (chapters) {
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
        let ele = document.querySelector(".me-overlay .content");
        ele.innerHTML = `<div class="finish-mock">
                            <div class="close">
                                <span>Are you sure, you want to close this mock test</span>
                                <div class="buttons">
                                    <button class="no">No</button>
                                    <button class="yes">Yes, Cancel this Mock</button>
                                </div>
                            </div>
                            <div class="submit_">
                                <span>If you want to submit your test?</span>
                                <button class="submit">Submit Test</button>
                            </div>
                        </div>`;

        openOverlay();
        let eee = ele.querySelector(".yes");
        eee.addEventListener("click", () => {
            closeOverlay();
            document.querySelector(".main-content > .me-top").classList.remove("hide");
            document.querySelector(".main-content > .pages").classList.remove("hide");
            document.querySelector(".main-content > .mock-test").classList.add("hide");
            return;
        });
        eee = ele.querySelector(".no");
        eee.addEventListener("click", () => {
            closeOverlay();
            return;
        });
        eee = ele.querySelector(".submit");
        eee.addEventListener("click", () => {
            closeOverlay();
            let aaa = document.querySelector(".mock-test .submit-test");
            if (aaa) aaa.click();
            return;
        });
    });

    fil_ques = ver_ques.slice(0, 20);
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

    if (!userdata.mocks) userdata.mocks = [];

    userdata.mocks.unshift(mock_obj);
    var que_arr = [];
    que_arr = userdata.mocks[0].questions;

    let arr = [];

    let mock_questions_length = parseInt(document.querySelector(".total-mock-questions input").value);
    mock_questions_length = mock_questions_length ? mock_questions_length : 20;
    if (mock_questions_length < 20) mock_questions_length = 20;
    if (mock_questions_length > 50) mock_questions_length = 50;

    let is_pyq_based = document.querySelector(".pyq-based-mock input").checked;

    if (!mock) {
        if (selected_chapters.length) {
            let all_ques = ver_ques;
            all_ques = sortArrayRandomly(all_ques);
            let i = 0;
            let y = 0;
            while (y < mock_questions_length && i < all_ques.length) {
                if (selected_chapters.some((tag) => all_ques[i].tags.includes(tag))) {
                    if (is_pyq_based) {
                        if (all_ques[i].tags.includes("pyq")) {
                            arr.push(all_ques[i].id);
                            ++y;
                        }
                    } else {
                        arr.push(all_ques[i].id);
                        ++y;
                    }
                }
                ++i;
            }
            mock_questions_length = y;
            /*
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
            */
        } else {
            let all_ques = ver_ques;
            all_ques = sortArrayRandomly(all_ques);
            let i = 0;
            let y = 0;
            while (y < mock_questions_length && i < all_ques.length) {
                if (is_pyq_based) {
                    if (all_ques[i].tags.includes("pyq")) {
                        arr.push(all_ques[i].id);
                        ++y;
                    }
                } else {
                    arr.push(all_ques[i].id);
                    ++y;
                }
                ++i;
            }
            mock_questions_length = y;
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
        userdata.mocks[0].end_time = getCurrentTime();

        // aNoe save all the question data of the mock
        var que_arr = userdata.mocks[0].questions;

        mock_test_div.querySelectorAll(".que-div").forEach((que_ele, index) => {
            que_arr[index].id = que_ele.id;
            var options = que_ele.querySelectorAll(".option");
            options.forEach((option) => {
                if (option.classList.contains("selected")) que_arr[index].selected_option_id = option.id;
                if (option.classList.contains("ans")) que_arr[index].answer_option_id = option.id;
            });
        });
        saveUserData();
        // Now save the user data

        //let all_que_divs = mock_test_div.querySelectorAll(".que-div");
        updateQuestionInfo(mock_test_div);

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
            var que_div = displayQuestion(que, tar, "mock_results");
            displayQuestionActionItems(que_div, que);
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
    if (id != "load") openPage("mcq");

    var page_main = document.querySelector(".page.mcq > .main .que-text");
    if (!page_main) {
        page_main = document.querySelector(".page.mcq > .main ");
        page_main.innerHTML = getRandomPageHTMLTemplate();
        setMcqPageMainItemEvents(page_main);

        updateTodayQuestionsCount();

        var page_sidebar = document.querySelector(".page.mcq > .sidebar ");
        page_sidebar.innerHTML = `<div class="header">
                            <span class="title">Select tags to filter questions</span>
                            <span class="cross me-mla">X</span>
                        </div>
                        <span class="info hide"></span>

                        <div class="tabs">
                            <div class="tab chapter-tag active">Tag Hierarchy</div>
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

function updateTodayQuestionsCount() {
    // No updatation when the user is not signed in
    let username = user_login_data.username;
    if (!username) return;
    //
    //
    let total_ele = document.querySelector(".page.mcq .main .today-questions .total");
    let correct_ele = document.querySelector(".page.mcq .main .today-questions .correct");
    let incorrect_ele = document.querySelector(".page.mcq .main .today-questions .incorrect");
    let marks_ele = document.querySelector(".page.mcq .main .today-questions .marks");

    let que_list_ele = document.querySelector(".page.mcq .main .today-questions .questions-list");

    if (!userdata.daily_questions) userdata.daily_questions = []; // Initialise

    if (!userdata.daily_questions.length || userdata.daily_questions[0].date != getTodayDate()) return;

    let today_questions = userdata.daily_questions[0].questions;
    let total_questions = today_questions.length;
    total_ele.textContent = total_questions;

    let correct_questions_count = 0;
    let incorrect_questions_count = 0;
    que_list_ele.innerHTML = "";

    today_questions
        .slice()
        .reverse()
        .forEach((que, index) => {
            let div = document.createElement("div");
            div.id = que.que_id;
            div.textContent = index + 1 + "";
            que_list_ele.appendChild(div);
            //div.setAttribute("selected_option_id", que.selected_option_id);
            //div.setAttribute("selected_option_id", que.selected_option_id);
            if (que.selected_option_id == que.answer_option_id) {
                div.classList.add("correct");
                ++correct_questions_count;
            } else {
                div.classList.add("incorrect");
                ++incorrect_questions_count;
            }

            div.addEventListener("click", () => {
                let quee = getQuestionById(que.que_id);
                let que_div = displayQuestion(quee);
                let options = que_div.querySelectorAll(".option");
                options.forEach((option) => {
                    option.classList.add("disabled");
                    if (option.id == que.selected_option_id) {
                        if (option.id == que.answer_option_id) option.classList.add("correct");
                        else option.classList.add("incorrect");
                    } else if (option.id == que.answer_option_id) {
                        option.classList.add("correct");
                    }
                });
            });
        });

    const lastElement = que_list_ele.lastElementChild;
    // Check if the last element exists
    if (lastElement) {
        // Scroll the container horizontally to the last element
        que_list_ele.scrollLeft = lastElement.offsetLeft + lastElement.offsetWidth - que_list_ele.clientWidth;
    }

    correct_ele.textContent = correct_questions_count;
    incorrect_ele.textContent = incorrect_questions_count;

    let marks = 2 * correct_questions_count - 0.6 * incorrect_questions_count;
    marks = marks.toFixed(1);
    let total_marks = 2 * total_questions;
    marks_ele.textContent = `Marks: ${marks} / ${total_marks}`;

    var passingMarks = total_questions * 2 * 0.35;
    if (marks >= passingMarks) {
        marks_ele.classList.remove("fail");
        marks_ele.classList.add("pass");
    } else {
        marks_ele.classList.remove("pass");
        marks_ele.classList.add("fail");
    }
}

function getRandomPageHTMLTemplate() {
    let todat_date = getTodayDateMMddyyyy();
    let today_day = getTodayDay();
    return `<div class="middle question-section main-questions">
    
        <div class="top-sec">
            <div class="today-questions">
                <div class="today">
                    <span class="date">${todat_date}</span>
                    <span class="day">${today_day}</span>
                </div>
                <div class="question-count">
                    <span class="num total">0</span>
                    <span class="num correct">0</span>
                    <span class="num incorrect">0</span>
                </div>
                <span class="marks"></span>
                <div class="questions-list"> </div>
            </div>
            <i class="fa-regular fa-circle-plus me-mla plus"></i>    
            <i class="fa-light fa-sidebar-flip "></i>
        </div>
                <div class="top-sec hide">
                    <div class="today-ques">
                        <span class="title header">Today Practise Questions</span>
                        <span class="num total-ques">Total attempted: 20</span>
                        <span class="num correct">Correct: 15</span>
                        <span class="num incorrect">Incorrect: 10</span>
                        <span class="num marks">Score: 33 / 40</span>
                        <span class="view-ques link">View questions</span>
                    </div>
                    <i class="fa-light fa-sidebar-flip me-mla"></i>
                </div>

                <span class="bookmark link hide">Show bookmarked questions</span>
                
                <div class="que-type">

                    <div class="top">
                        <span class="label">Filter questions by type:</span>
                    </div>
                    <div class="types">
                        <span class="type verified active">Verified</span>
                        <span class="type unverified hide">Unverified</span>
                        <span class="type following hide">Following</span>
                    </div>
                </div>
                <div class="subject-type">
    <span class="label">Filter By Subject:</span>
    <div class="subject"></div>
</div>
                <div class="subject hide"> </div>
                <div class="filter-section">
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
        setUrl(`question/${que.id}`);
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
    //var tt =  result;

    var tt = getHTMLFormattedText(result);
    //tt.appendChild(result);

    var nn = 1;
    if (type == "mock" || type == "mock_results") {
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
        div.innerHTML = `<span class="number">${index + 1}</span>
                        <span class="text">${text}</span>`;
        options.appendChild(div);
        if (opt.text.includes("#ans")) {
            div.classList.add("ans");
        }

        // No action on options for mock_results, daily-practise-questions;
        //if (type == "mock-result") return;
        if (type == "daily-ques") return;

        // div = option div
        div.addEventListener("click", (event) => {
            var span = event.target.closest(".option");
            var que_div_ele = span.closest(".que-div");

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

            //let que_info = updateQuestionInfo(que.id);

            let obj = null;
            let id = que.id;
            let user_ref = database.ref(`${exam}/questionInfo/${id}`);
            let is_online = navigator.onLine;
            if (is_online) {
                user_ref.once("value").then(function (snapshot) {
                    let obj = snapshot.val();
                    console.log(obj); // This will log the data fetched from Firebase

                    if (obj) {
                        let options = que_div_ele.querySelectorAll(".options .option");
                        let selected_option = que_div_ele.querySelector(".options .option.selected");
                        options.forEach((option, index) => {
                            if (selected_option == option) obj.options[index] = obj.options[index] + 1;
                        });
                    } else {
                        obj = {
                            options: [],
                        };
                        let options = que_div_ele.querySelectorAll(".options .option");
                        let selected_option = que_div_ele.querySelector(".options .option.selected");
                        options.forEach((option) => {
                            if (selected_option == option) obj.options.push(1);
                            else obj.options.push(0);
                        });
                    }
                    database.ref(`${exam}/questionInfo/${id}`).set(obj);

                    let totalResponses = obj.options.reduce((acc, curr) => acc + curr, 0);

                    let options = que_div_ele.querySelectorAll(".options .option");
                    options.forEach((option, index) => {
                        let numberElement = option.querySelector(".number");
                        if (numberElement) {
                            let percentage = (obj.options[index] / totalResponses) * 100;
                            let roundedPercentage = Math.round(percentage); // Round to nearest integer
                            numberElement.textContent = roundedPercentage + "%";
                            numberElement.className = "percentage"; // Add "percentage" class to style percentages
                        }
                    });

                    let options_div = que_div_ele.querySelector(".options");
                    let span = document.createElement("span");
                    span.className = "total-responses";
                    span.textContent = `Total Responses: ${totalResponses}`;
                    options_div.appendChild(span);
                });
            }

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

            let explanation_text = que.explanation;
            let video_items = getVideoItemsFromText(explanation_text);
            video_items = video_items ? video_items : [];
            var exp__div = "";
            if (video_items.length) {
                exp__div = document.createElement("div");
                exp__div.className = "explanation-videos";
                que_div_ele.insertBefore(exp__div, que_div_ele.children[2]);
                exp__div.innerHTML = `<span class="label" style="color: gray;">Explanations:</span>`;
            }
            video_items.forEach((video_item) => {
                let video_id = video_item.video_id;
                let time = video_item.time;
                //let event = video_item.event;
                getVideoInfoUsingVideoId(video_id).then((channel_info) => {
                    let channel_name = channel_info.channel_name;
                    let channel_url = channel_info.channel_url;

                    let div = document.createElement("div");
                    div.className = "explanation-video";
                    div.innerHTML = `
                                            <span class="video-label">Watch </span>
                                            <i class="fa-brands fa-youtube"></i>
                                            
                                            <span>  | From channel:</span>
                                            <a href="${channel_url}" target="_blank">${channel_name}</a>
                                        `;
                    exp__div.appendChild(div);
                    div.querySelector("i.fa-youtube").addEventListener("click", (event) => {
                        playVideoPlayer(video_id, time, event);
                    });
                });
            });

            if (type == "mock_results" || type == "daily-ques" || type == "user_question" || type == "bookmarked_question") {
                displayQuestionActionItems(que_div_ele, que);
                return;
            }

            if (!type || type == "random") {
                var que_div = que_div_ele;

                // Save daily practise questions;
                let dpq = userdata.daily_questions;
                let today_date = getTodayDate();
                if (!dpq.length || dpq[0].date != today_date) {
                    let obj = {
                        date: getTodayDate(),
                        questions: [],
                    };
                    dpq.unshift(obj);
                }

                let today_questions = userdata.daily_questions[0].questions;
                let obj = {
                    que_id: curr_ques.id,
                    selected_option_id: que_div.querySelector(".option.selected").id,
                    answer_option_id: que_div.querySelector(".option.correct").id,
                };
                today_questions.unshift(obj);
                saveUserData();
                console.log(`me: question saved to daily_practise_questions[]`);
                updateTodayQuestionsCount();
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

                if (false && que.explanation && que.explanation != "") {
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

                        if (text == "" || text.includes("soon...")) {
                            exp_div.classList.add("hide");
                        } else span.innerHTML = getHTMLFormattedText(text);
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

    que.exams = que.exams ? que.exams : [];
    if (que.exams.length && (!type || type == "random")) {
        // Show exam asked as well
        let div = document.createElement("div");
        div.className = "exams-asked";
        que_div.appendChild(div);

        div.innerHTML = `<span>Asked in:</span>
                         <div class="exams"></div>`;

        que.exams.forEach((exam) => {
            let span = document.createElement("span");
            span.className = "exam";
            span.textContent = exam;
            div.querySelector(".exams").appendChild(span);
        });
    }

    if (!type || type == "random") {
        let div = document.createElement("div");
        div.className = "tags";
        que_div.appendChild(div);

        div.innerHTML = `<span>Category: </span>
                        <div class="tag-list"></div>`;

        let ignore_list = ["ssc", "general studies", "mock"];
        let temp_tags = [];
        que.tags.forEach((tag) => {
            let span = document.createElement("span");
            span.className = "tag";
            span.textContent = tag;
            let ele = div.querySelector(".tag-list");
            if (!ignore_list.includes(tag.toLowerCase())) ele.appendChild(span);
            ignore_list.push(tag.trim().toLowerCase());

            span.addEventListener("click", () => {
                let tag = span.textContent.trim().toLowerCase();
                let tags = [tag];
                let eee = document.querySelectorAll(".sidebar .tag-item .name");
                let is_found = false;
                eee.forEach((ee) => {
                    if (ee.textContent.trim().toLowerCase() == tag) {
                        ee.click();
                        is_found = true;
                    }
                });

                if (!is_found) filterQuestionsOnTagBased(tag, tags);
            });
        });
    }

    if (!type || type == "random") {
        // username shared by
        if (que.userid) {
            displayUsernameInSharedQuestion(que_div, que.userid);
        }

        if (que.verified == false) {
            displayQuestionVerficationStatus(que_div, que);
        }

        displayQuestionActionItems(que_div, que);
    }

    let note_span = document.createElement("span");
    note_span.className = "me-note que-marks-note";
    note_span.textContent = "Note: correct answer (+2) marks, wrong answer (-0.6) marks";
    que_div.appendChild(note_span);
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
    /* var index_tags = "";
    for (var i = 0; i < other_data.length; i++) {
        if (other_data[i].type == "tags_index") {
            index_tags = other_data[i].data;
        }
    }
    */

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

function addTagIndexItem_old(item, tar_ele, level) {
    item = item.name ? item : item[0];
    try {
        var children = item.children ? item.children : [];
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
            let tag = span.textContent.trim();
            let link_spans = span.closest(".me-tag").querySelectorAll(".name");
            link_spans.forEach((ss) => {
                tags.push(ss.textContent);
            });

            filterQuestionsOnTagBased(tag, tags, span);
        });
    }
}

function addTagIndexItem(item, tar_ele, level) {
    item = item.name ? item : item[0];
    try {
        var children = item.children ? item.children : [];
    } catch {}

    let div = "";
    let ele = "";
    if (children.length) {
        div = document.createElement("div");
        div.className = `me-tag level-${level}`;
        tar_ele.appendChild(div);

        //let tag_name = item.name.replace("[[", "").replace("]]", "").toLowerCase();
        let tag_name = item.name.replace("[[", "").replace("]]", "");
        div.innerHTML = `<div class="tag-item">
                            <i class="fa-solid fa-circle"></i>
                            <span class="link name">${tag_name}</span>
                        </div>
                        <div class="children tag-children"></div>`;

        ele = div.querySelector(".children");
        children.forEach((child) => {
            var i = level + 1;
            addTagIndexItem(child, ele, i);
        });
    } else {
        div = document.createElement("div");
        div.className = `me-tag level-${level}`;
        tar_ele.appendChild(div);

        //let tag_name = item.name.replace("[[", "").replace("]]", "").toLowerCase();
        let tag_name = item.name.replace("[[", "").replace("]]", "");

        div.innerHTML = `<div class="tag-item">
                            <i class="fa-solid fa-circle"></i>
                            <span class="link name">${tag_name}</span>
                        </div>`;
    }

    ele = div.querySelector("span.link");
    if (ele) {
        ele.addEventListener("click", () => {
            var tags = [];
            let tag = ele.textContent.trim().toLowerCase();
            let link_spans = ele.closest(".me-tag").querySelectorAll(".name");
            link_spans.forEach((ss) => {
                tags.push(ss.textContent.trim().toLowerCase());
            });

            filterQuestionsOnTagBased(tag, tags, ele);
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

async function addESADataIntoFirebase() {
    let filename = `my_data_${exam}.json`;

    const response = await fetch(filename);

    const data = await response.json();

    let ques_data = data[0].ques ? data[0].ques : [];
    let notes_data = data[0].notes ? data[0].notes : [];
    let mocks_data = data[0].mocks ? data[0].mocks : [];
    let tags_list = data[0].tags_list ? data[0].tags_list : [];

    if (exam == "neet") notes_data = [];

    database.ref(`esa_data/${exam}/data/ques_data`).set(ques_data);
    database.ref(`esa_data/${exam}/data/notes_data`).set(notes_data);
    database.ref(`esa_data/${exam}/data/mocks_data`).set(mocks_data);
    database.ref(`esa_data/${exam}/data/tags_list`).set(tags_list);
    popupAlert("Data added to firebase");
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
                    <div class="icon_ ">
                        <span class="plus hide">+</span> 
                        <i class="fa-regular todo fa-circle hide "></i>
                        <i class="fa-regular fa-share-nodes share"></i>
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
            //div.querySelector(".me-block-icons").classList.remove("hide");
        });
    }

    ele = div.querySelector(".icon_ .share");
    if (ele) {
        ele.addEventListener("click", (event) => {
            var ele = event.target.closest(".me-block");
            let page_id = ele.getAttribute("page-id");
            let block_id = ele.id;
            let currentUrl = window.location.href + `/${block_id}`;
            if (is_mobile && navigator.share) {
                // Use Web Share API to share
                navigator
                    .share({
                        title: "Shared Note Link",
                        url: currentUrl,
                    })
                    .then(() => {
                        console.log("Link shared successfully");
                        popupAlert("Link shared successfully");
                    })
                    .catch((error) => {
                        console.error("Error sharing link:", error);
                        copyToClipboard(currentUrl); // Fallback to copy URL to clipboard
                        popupAlert("Link copied to clipboard");
                    });
            } else {
                // Fallback for browsers that do not support Web Share API
                copyToClipboard(currentUrl); // Copy URL to clipboard
                popupAlert("Link copied to clipboard");
            }
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

    var videos = userdata.videos ? userdata.videos : [];
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

    var links = userdata.links ? userdata.links : [];
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

    var images = userdata.images ? userdata.images : [];
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
    let userid = user_login_data.userid;
    if (!userid) return;
    saveDataInLocale(`esa_userdata_${exam}`, userdata);
    let is_online = navigator.onLine;

    if (is_online) {
        database.ref(`${exam}/users/${userid}/userdata`).set(userdata);
    } else {
        popupAlert("Your Data is NOT saved in cloud.. You are offline..");
    }
}
function getUserData() {
    return null;
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
    let ele = document.querySelector(".page.mock > .main  .page-content > .mock-history");
    ele.innerHTML = `<div class="mock-history-list"> `;
    loadPreviousMockResults();
    return;
    var div = document.createElement("div");
    div.className = "mock-history";
    ele.appendChild(div);

    div.innerHTML = `<div class="head me-header">
                        <i class="fa-solid arrow fa-chevron-right"></i>
                        <span>Mock Test History</span>
                    </div>
                    <div class="mock-history-list">
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
    let ele = document.querySelector(".page.mock .main .page-content .new-mock");
    ele.innerHTML = `<div class="mock-links">
    <span class="start-new-mock link"> Start a new mock test</span>
    <span class="shared-mock link"> Create a shared mock test</span>
</div>
<div class="shared-mock-link hide">
    <div class="head_">
        <span>Shared mock test link</span>
        <i class="fa-regular fa-circle-xmark cross"></i>
    </div>

    <div class="link">
        <span></span>
        <i class="fa-regular fa-copy"></i>
    </div>
</div>
                    <div class="pyq-based-mock hide">
    <input type="checkbox">
    <span>Mock test based on "PYQs" only</span>
</div>
                    <div class="total-mock-questions">
                        <span>Set total questions (20-50): </span>
                        <input type="number" value="20" />
                    </div>
                    <div class="mock-chapters">
                        <div class="top">
                            <span class="label">Select Chapters</span>
                            <span class="link clear-all">Clear all</span>
                        </div>
                        <input type="search" class="filter" placeholder="Type to filter chapters" />
                        <div class="mock-chapters-list">
                            <div class="me-mock-chapter me-dis-flex">
                                <input type="checkbox" name="" id="" />
                                <span class="name">Harappan Civilization</span>
                            </div>
                        </div>
                    </div>
                        `;

    let div = ele;

    if (exam == "neet" && false) {
        for (let i = 0; i < que_data.length; i++) {
            if (que_data[i].tags.includes("pyq")) {
                let pyq_mock_link = div.querySelector(".pyq-based-mock");
                pyq_mock_link.classList.remove("hide");
                break;
            }
        }
    }

    ele = div.querySelector(".start-new-mock");
    if (ele) {
        ele.addEventListener("click", () => {
            startNewMockTest();
        });
    }

    ele = div.querySelector(".shared-mock");
    if (ele) {
        ele.addEventListener("click", () => {
            let is_online = navigator.onLine;
            if (!is_online) {
                popupAlert("You are offline..");
                return;
            }
            createSharedMock();
        });
    }

    // Load all chapters

    ele = div.querySelector(".clear-all");
    ele.addEventListener("click", () => {
        ele = div.querySelectorAll(".mock-chapters-list .tag-item input");

        ele.forEach((ee) => {
            ee.checked = false;
        });
    });

    ele = div.querySelector(".mock-chapters-list");

    let chapter_tags_element = document.querySelector(".page.mcq .sidebar .content .chapter-tag");
    if (!chapter_tags_element) {
        openMCQPage("load");
        chapter_tags_element = document.querySelector(".page.mcq .sidebar .content .chapter-tag");
    }
    chapter_tags_element = chapter_tags_element.innerHTML;
    ele.innerHTML = chapter_tags_element;

    ele = ele.querySelectorAll(".tag-item");

    ele.forEach((ee) => {
        // ee.children[0].innerHTML = "fa-regular fa-circle";
        let name = ee.children[1].textContent;
        ee.innerHTML = `<input type="checkbox">
                        <span class="link name">${name}</span>`;
        ee.children[0].addEventListener("click", (event) => {
            let inp = event.target;
            let ele = inp.closest(".me-tag");
            ele = ele.querySelector(".children");
            ele = ele.querySelectorAll(".tag-item");
            if (ele) {
                ele.forEach((item) => {
                    item.children[0].checked = inp.checked;
                });
            }
        });
    });

    /* ele.innerHTML = "";
    let chapters = document.querySelectorAll(".page.notes .sidebar .me-chapter .name.link");

    chapters.forEach((chapter) => {
        let ddd = document.createElement("div");
        ddd.classList = "me-mock-chapter me-dis-flex";
        ele.appendChild(ddd);

        ddd.innerHTML = ` <input type="checkbox" name="" id="">
                          <span class="name">${chapter.textContent}</span>`;
    });
    */

    ele = div.querySelector(".mock-chapters  input");
    if (ele) {
        ele.addEventListener("input", (event) => {
            const filter = event.target.value.trim().toLowerCase();
            const chapters = div.querySelectorAll(".tag-item .name");

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

function loadNewMockTestSection2() {
    let ele = document.querySelector(".page.mock .main .page-content .new-mock");
    ele.innerHTML = `<div class="mock-links">
    <span class="start-new-mock link"> Start a new mock test</span>
    <span class="shared-mock link"> Create a shared mock test</span>
</div>
<div class="shared-mock-link hide">
    <span>Copy and share the shared mock test link</span>
    <span class="link"></span>
    <i class="fa-regular fa-copy"></i>
</div>
    <span class="start-new-pyq-mock hide"> Start a new mock based on PYQs</span>
                    <div class="mock-chapters">
                        <div class="top">
                            <span class="label">Select Chapters</span>
                            <span class="link clear-all">Clear all</span>
                        </div>
                        <input type="search" class="filter" placeholder="Type to filter chapters" />
                        <div class="mock-chapters-list">
                            <div class="me-mock-chapter me-dis-flex">
                                <input type="checkbox" name="" id="" />
                                <span class="name">Harappan Civilization</span>
                            </div>
                        </div>
                    </div>
                        `;

    let div = ele;

    ele = div.querySelector(".start-new-mock");
    if (ele) {
        ele.addEventListener("click", () => {
            startNewMockTest();
        });
    }

    // Load all chapters

    ele = div.querySelector(".clear-all");
    ele.addEventListener("click", () => {
        ele = div.querySelector(".mock-chapters-list");
        ele.innerHTML = "";
        let chapters = document.querySelector(".page.mcq .sidebar .content .chapter-tag");
        let links = chapters.querySelectorAll(".link.name");
        links.forEach((link) => {
            let div = document.createElement("div");
            div.className = "name link";
            div.innerHTML = `<input type="checkbox">
            <span>${link.textContent}</span>`;
            link.parentNode.replaceChild(div, link);
        });
    });

    ele = div.querySelector(".mock-chapters-list");
    ele.innerHTML = "";
    //let chapters = document.querySelectorAll(".page.notes .sidebar .me-chapter .name.link");

    let chapters = document.querySelector(".page.mcq .sidebar .content .chapter-tag");
    ele.appendChild(chapters);

    let links = chapters.querySelectorAll(".link.name");
    links.forEach((link) => {
        let div = document.createElement("div");
        div.className = "name link";
        div.innerHTML = `<input type="checkbox">
            <span>${link.textContent}</span>`;
        link.parentNode.replaceChild(div, link);
    });

    ele = div.querySelector(".mock-chapters  input_");
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
    let ele = document.querySelector(".page.mock > .main  .page-content > .static-mock");
    closeSidebar(ele);
    ele.innerHTML = "";

    var div = document.createElement("div");
    div.className = "pre-defined-mocks";
    ele.appendChild(div);
    div.innerHTML = `
                    <input type="search" class="filter hide" placeholder="Search mock test" />    
                    <div class="mock-test-list"></div>
                    `;
    ele = div.querySelector("input");
    if (ele) {
        ele.addEventListener("input", (event) => {
            const filter = event.target.value.trim().toLowerCase();
            const pd_mocks = div.querySelectorAll(".pd-mock");

            // Loop through each tag
            pd_mocks.forEach((pd_mock) => {
                // Get the text content of the tag and convert it to lowercase
                const tagName = pd_mock.querySelector(".name").textContent.toLowerCase();

                // Check if the tag matches the filter
                if (tagName.includes(filter)) {
                    pd_mock.parentElement.style.display = ""; // Show the tag
                } else {
                    pd_mock.parentElement.style.display = "none"; // Hide the tag
                }
            });
        });
    }

    let list_ele = div.querySelector(".mock-test-list");

    static_mocks.forEach((mock, index) => {
        var div_mock = document.createElement("div");
        div_mock.className = "pd-mock";
        div_mock.id = mock.id;
        list_ele.appendChild(div_mock);

        let mock_name = mock.name;
        let pdf_link = mock.pdf ? mock.pdf : "";

        div_mock.innerHTML = `
                            <span class="name">${mock_name}</span>
                            <div class="sections">
                                <span class="sub gs">GS</span>
                                <span class="sub english">English</span>
                                <span class="sub aptitude">Aptitude</span>
                                <span class="sub reasoning">Reasoning</span>
                            </div>
                            <span class="all">Full Test</span>
                            <a href="${pdf_link}" class="download-pdf" target="_blank">
                                <i class="fa-solid fa-file-pdf"></i>
                                <span>Download pdf </span>
                                <i class="fa-solid fa-arrow-down-to-bracket"></i>
                            </a>
                            `;

        ele = div_mock.querySelector(".me-header-inner");
        let div = div_mock;

        if (pdf_link == "") {
            div.querySelector(".download-pdf").classList.add("hide");
        }

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
        let mock_ques = {
            gs: [],
            english: [],
            aptitude: [],
            reasoning: [],
        };
        mock.que_ids.forEach((id) => {
            let que = getQuestionById(id);
            if (que.tags.includes("general studies")) mock_ques.gs.push(id);
            if (que.tags.includes("english")) mock_ques.english.push(id);
            if (que.tags.includes("aptitude")) mock_ques.aptitude.push(id);
            if (que.tags.includes("reasoning")) mock_ques.reasoning.push(id);
        });

        ele = div_mock.querySelector(".gs");
        if (!mock_ques.gs.length) ele.classList.add("disabled");
        else {
            ele.addEventListener("click", () => {
                let obj = {
                    id: `${mock.id}__1`,
                    que_ids: mock_ques.gs,
                };
                startNewMockTest(obj);
            });
        }
        ele = div_mock.querySelector(".english");
        if (!mock_ques.english.length) ele.classList.add("disabled");
        else {
            ele.addEventListener("click", () => {
                let obj = {
                    id: `${mock.id}__2`,
                    que_ids: mock_ques.english,
                };
                startNewMockTest(obj);
            });
        }
        ele = div_mock.querySelector(".aptitude");
        if (!mock_ques.aptitude.length) ele.classList.add("disabled");
        else {
            ele.addEventListener("click", () => {
                let obj = {
                    id: `${mock.id}__3`,
                    que_ids: mock_ques.aptitude,
                };
                startNewMockTest(obj);
            });
        }

        ele = div_mock.querySelector(".reasoning");
        if (!mock_ques.reasoning.length) ele.classList.add("disabled");
        else {
            ele.addEventListener("click", () => {
                let obj = {
                    id: `${mock.id}__4`,
                    que_ids: mock_ques.reasoning,
                };
                startNewMockTest(obj);
            });
        }
        ele = div_mock.querySelector(".all");
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

// Load Data
var que_data = null,
    shared_ques = null,
    esa_ques = null,
    all_ques = null,
    follower_ques = null,
    all_users_info = null,
    notes_data = null,
    tags_list = null,
    static_mocks = null,
    userdata = null,
    app_level_data = null;
//start from here
async function startApp() {
    clearCache();
    signinSetup();
    let url_items = parseURL(window.location.href);
    if (url_items.length) {
        exam = url_items[0];
        localStorage.setItem("esa_exam", exam);
    } else {
        exam = localStorage.getItem("esa_exam");
        exam = exam ? exam : "ssc";
    }
    document.querySelector(".home .exam select").value = exam;
    user_login_data = getDataFromLocale("user_login_data");
    await getAllUsersInfo();
    if (user_login_data) {
        for (let i = 0; i < all_users_info.length; i++) {
            if (all_users_info[i].email == user_login_data.email) {
                user_login_data = all_users_info[i];
                break;
            }
        }
        saveDataInLocale("user_login_data", user_login_data);
        postLogin();
    } else {
        document.querySelector(".start.login").classList.remove("hide");
        document.querySelector(".content").classList.add("hide");
    }
    return;
}
async function openPageBasedOnURL() {
    let url = window.location.href;
    let url_items = parseURL(url);
    if (url_items.length) exam = url_items[0];
    exam = localStorage.getItem("esa_exam") || exam;
    if (url_items.length) {
        exam = url_items[0];
        localStorage.setItem("esa_exam", exam);
        let page = url_items[1];
        page = page == "question" ? "mcq" : page;
        openPage(page);

        openNotesPage2(); // To load the notes data

        if (page == "question") {
            openPage("mcq");
            let que_id = url_items[2];
            if (que_id) {
                let que = getQuestionById(que_id);
                if (que) {
                    displayQuestion(que);
                }
            }
        } else if (page == "notes") {
            let page_id = url_items[2];
            let block_id = url_items[3];
            if (block_id) {
                openNotesPage2(page_id, block_id);
            } else if (page_id) {
                //openChapterById(page_id);
                openNotesPage2(page_id);
            } else {
                openNotesPage2();
            }
        } else if (page == "home") {
            openPage("home");
        } else if (page == "mock") {
            openMockPage();

            let sub_page = url_items[2];
            if (sub_page == "shared") {
                let id = url_items[3];
                let user_ref = database.ref(`${exam}/sharedmock/${id}`);
                user_ref.once("value").then(function (snapshot) {
                    openMockPage();
                    let obj = snapshot.val();
                    if (obj) {
                        startNewMockTest(obj);
                    } else {
                        popupAlert("The share mock has expired");
                    }
                });
            }
        } else {
            openPage("home");
        }
    } else {
        //openNotesPage2();
        openPage("home");
    }
}

function parseURL(url) {
    let hashIndex = url.indexOf("#");
    if (hashIndex !== -1) {
        let hashPart = url.slice(hashIndex + 2); // Skip '#/' part
        let items = hashPart.split("/");
        return items;
    }
    return [];
}

startApp();

function openSidebar(event) {
    let ele;

    if (event instanceof Event) {
        ele = event.target;
    } else {
        ele = event;
    }

    let page = ele.closest(".page");
    if (is_mobile) {
        page.children[0].style.flex = "0 0 20%";
        page.children[1].style.flex = "0 0 80%";
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

    ele = main.querySelectorAll(".que-type .type");
    if (ele) {
        ele.forEach((eee) => {
            eee.addEventListener("click", (event) => {
                loadRefreshQuestions();
                let ele = event.target;
                if (ele.classList.contains("active")) return;

                main.querySelectorAll(".que-type .type").forEach((ee) => {
                    ee.classList.remove("active");
                });
                ele.classList.add("active");

                //loadRefreshQuestions();

                if (ele.classList.contains("verified")) {
                    que_data = esa_ques.concat(ver_ques);
                } else if (ele.classList.contains("unverified")) {
                    que_data = unver_ques;
                } else if (ele.classList.contains("following")) {
                    que_data = follower_ques;
                }
                que_data = sortArrayRandomly(que_data);

                curr_que_index = 0;
                fil_ques = que_data;
                fil_ques = sortArrayRandomly(fil_ques);
                curr_ques = fil_ques[0];
                displayQuestion();
            });
        });
    }
    ele = main.querySelector(".que-type .types");
    if (shared_ques.length) {
        ele.querySelector(".unverified").classList.remove("hide");
    }
    if (follower_ques.length) {
        ele.querySelector(".following").classList.remove("hide");
    }

    ele = main.querySelector("span.link.bookmark");
    userdata.bookmarks = userdata.bookmarks ? userdata.bookmarks : [];
    if (userdata.bookmarks.length) {
        main.querySelector("span.link.bookmark").classList.remove("hide");
    }
    ele.addEventListener("click", () => {
        openOverlay();
        let eee = document.querySelector(".me-overlay .content");

        eee.innerHTML = `<div class="bookmark-list">
        <div class="header">
            <span class="head-label">Bookmark Questions</span>
            <i class="fa-regular fa-circle-xmark close"></i>
        </div>
        <div class="bookmark-items"></div>
        </div>`;

        let bookmark_items = eee.querySelector(".bookmark-items");
        userdata.bookmarks.forEach((id) => {
            let que = getQuestionById(id);
            if (!que) return;
            let target = eee.querySelector(".bookmark-items");
            let que_div = displayQuestion(que, target, "bookmarked_question");
        });
        eee.querySelector(".close").addEventListener("click", closeOverlay);
    });

    ele = main.querySelector(".fa-sidebar-flip");
    if (ele) {
        ele.addEventListener("click", (event) => {
            openSidebar(event);
        });
    }

    ele = main.querySelector(".top-sec i.plus");
    if (ele) {
        ele.addEventListener("click", () => {
            openOverlay();
            let eee = document.querySelector(".me-overlay .content");

            eee.innerHTML = `<div class="add-vocab">
                                <div class="header">
                                    <span class="head-label">Add new word</span>
                                    <i class="fa-regular fa-circle-xmark close"></i>
                                </div>
                                <input type="text" class="word" placeholder="Add new work here" />
                                <textarea name="" id="" cols="30" rows="6" class="local" placeholder="Meaning in native language"></textarea>
                                <textarea name="" id="" cols="30" rows="6" class="english hide" placeholder="Meaning in english"></textarea>
                                <button class="add">Add</button>
                            </div>
                            `;

            eee.innerHTML = `<div class="items">
    <span class="link">Add vocab</span>
    <span class="link">Add questions</span>
</div>`;

            eee.innerHTML = `
                            <div class="add-question">
                                <div class="top">
                                    <span class="title">Add Questions</span>
                                    <i class="fa-solid fa-xmark close"></i>
                                </div>

                                <div class="que-section">
                                    <textarea name="" id="" cols="30" rows="3" class="question" placeholder="Question text"></textarea>
                                    <div class="options">
                                        <div class="option">
                                            <input type="radio" name="option" />
                                            <input type="text" placeholder="Option 1" />
                                        </div>
                                        <div class="option">
                                            <input type="radio" name="option" />
                                            <input type="text" placeholder="Option 2" />
                                        </div>
                                        <div class="option">
                                            <input type="radio" name="option" />
                                            <input type="text" placeholder="Option 3" />
                                        </div>
                                        <div class="option">
                                            <input type="radio" name="option" />
                                            <input type="text" placeholder="Option 4" />
                                        </div>
                                        <button class="add-options">Add options</button>
                                    </div>
                                    <div class="add-subject">
                                    <span>Subject:</span>
                                    </div>

                                    <div class="tags-sec">
                                        <input type="search" placeholder="Add Tags" />
                                        <div class="tags"></div>
                                    </div>
                                    <input type="text" placeholder="Previous Exam" class="exams hide" />
                                    <button class="add-new-question">Add Questions</button>
                                </div>
                            </div>
                            `;

            let ele = eee.querySelector(".add-options");
            if (ele) {
                ele.addEventListener("click", () => {
                    let div = document.createElement("div");
                    div.className = "option";
                    let options = eee.querySelector(".options");
                    let child = options.children.length;
                    div.innerHTML = `<input type="radio" name="option" />
                                            <input type="text" placeholder="Option ${child}" />`;
                    let bfr = eee.querySelector(".add-options");
                    options.insertBefore(div, bfr);
                    div.querySelector("input[type='text']").focus();
                });
            }

            ele = eee.querySelector(".close");
            if (ele) {
                ele.addEventListener("click", () => {
                    closeOverlay();
                });
            }

            ele = eee.querySelector(".add-subject");
            let subjects_ = subjects[exam];
            subjects_.forEach((sub) => {
                let span = document.createElement("span");
                let sub_class = sub.toLowerCase();
                span.className = `subject ${sub_class}`;
                span.textContent = sub;
                ele.appendChild(span);
            });
            ele = ele.querySelector(".subject");
            if (ele) {
                ele = eee.querySelectorAll(".add-subject .subject");
                ele.forEach((sub) => {
                    sub.addEventListener("click", (event) => {
                        let cele = event.target;
                        if (cele.classList.contains("selected")) return;
                        let sss = eee.querySelectorAll(".add-subject .subject");
                        sss.forEach((ss) => {
                            ss.classList.remove("selected");
                        });
                        cele.classList.add("selected");
                    });
                });
            }

            ele = eee.querySelector(".tags-sec input");
            if (ele) {
                ele.addEventListener("focus", (event) => {
                    let tags = all_tags.concat(new_add_ques_tags);
                    let target = eee.querySelector(".tags-sec .tags");
                    setAutoComplete(event, tags, "add-new-que-tags", target);
                });
            }

            ele = eee.querySelector("button.add-new-question");
            if (ele) {
                ele.addEventListener("click", () => {
                    let id = generateUniqueId();
                    let question = eee.querySelector("textarea.question").value.trim();
                    if (question == "") {
                        popupAlert("Question text cannot be empty", 5, "red");
                        return;
                    }
                    if (!question.endsWith("?")) {
                        question += " ?";
                    }

                    let options = [];
                    let option_ele = eee.querySelectorAll(".option");

                    let is_ans_selected = false;
                    option_ele.forEach((option) => {
                        if (option.children[0].checked) is_ans_selected = true;
                    });
                    if (!is_ans_selected) {
                        popupAlert("No Answer is selected", 5, "red");
                        return;
                    }
                    option_ele.forEach((option, index) => {
                        // Assume the first child is a radio input and the second child is a text element
                        let radio = option.querySelector("input[type='radio']"); // or option.children[0]
                        let text = option.children[1].value.trim();

                        // Check if the radio button is checked
                        if (radio && radio.checked) {
                            text += " #ans";
                        }

                        // Create and push the object to the options array
                        let obj = {
                            id: id + "_" + (index + 1),
                            text: text,
                        };

                        options.push(obj);
                    });

                    let subject = eee.querySelector(".subject.selected");
                    if (!subject) {
                        popupAlert("Select a subject", 5, "red");
                        return;
                    }
                    let tags = [];
                    subject = subject.textContent.trim().toLowerCase();
                    tags.push(subject);

                    let tag_names = eee.querySelectorAll(".tags .name");
                    tag_names = tag_names.length ? tag_names : [];
                    tag_names.forEach((name_span) => {
                        let tag = name_span.textContent;
                        if (!tags.includes(tag)) tags.push(tag);
                    });

                    if (question.toLowerCase().startsWith("who ")) {
                        if (!tags.includes("person")) tags.push("person");
                    }
                    let verification_status = {
                        question: 0,
                        options: 0,
                        answer: 0,
                        tags: 0,
                    };

                    let que_obj = {
                        question: question,
                        options: options,
                        userid: user_login_data.userid,
                        tags: tags,
                        id: id,
                        verified: false,
                        verification_status: verification_status,
                        create_date: getTodayDate(),
                        update_date: "",
                        linked_block: "",
                        explanation: "",
                        video_link: "",
                    };

                    let username = user_login_data.username;
                    if (!username) {
                        popupAlert("Question cannot be added as you are not sigined in");
                        return;
                    }

                    let is_online = navigator.onLine;
                    if (!is_online) {
                        if (!username) {
                            popupAlert("You are Offline");
                            return;
                        }
                    }
                    if (!username) {
                        popupAlert("Question cannot be added as you are offline");
                        return;
                    }

                    let user_ref = database.ref(`${exam}/shared_questions/data`);
                    user_ref.once("value").then(function (snapshot) {
                        let obj = snapshot.val();

                        if (!obj) {
                            obj = [];
                        }
                        obj.unshift(que_obj);
                        user_questions.unshift(que_obj);
                        database.ref(`${exam}/shared_questions/data`).set(obj);
                        popupAlert("Question has been created", 5, "green");
                        loadUserQuestions();
                        shared_ques.push(que_obj);
                    });
                });
            }

            /*
            eee.querySelector(".header .close").addEventListener("click", closeOverlay);

            eee.querySelector("button.add").addEventListener("click", () => {
                let word = eee.querySelector(".word").value.trim();
                let local_meaning = eee.querySelector(".local").value.trim();
                let english_meaning = eee.querySelector(".english").value.trim();

                if (word == "") return;

                // Initialize the meanings array
                let words = [];
                let local_meanings = [];

                // Check if the word contains a comma
                if (word.includes(",")) {
                    // Split the word into an array by commas and trim extra spaces
                    words = word.split(",").map((w) => w.trim());

                    // Split local_meaning into lines
                    local_meanings = local_meaning.split("\n").map((line) => line.trim());
                }
                if (!user_data[0].vocab) user_data[0].vocab = [];
                if (words.length) {
                    words.forEach((word, index) => {
                        let obj = {
                            id: generateUniqueId(),
                            word: word,
                            local_meaning: local_meanings[index] ? local_meanings[index] : "",
                            english_meaning: "",
                            level: "hard",
                        };
                        user_data[0].vocab.unshift(obj);
                    });
                } else {
                    let obj = {
                        id: generateUniqueId(),
                        word: word,
                        local_meaning: local_meaning,
                        english_meaning: english_meaning,
                        level: "hard",
                    };

                    user_data[0].vocab.unshift(obj);
                }

                saveUserData();
                popupAlert(`"${word}" added to your vocab`);
            });
            */
        });
    }

    ele = main.querySelector(".subject");
    if (ele) {
        ele.innerHTML = "";

        let arr = subjects[exam];
        arr.forEach((sub) => {
            let span = document.createElement("span");
            span.className = sub.toLowerCase();
            span.textContent = sub;
            ele.appendChild(span);
            span.addEventListener("click", () => {
                let name = span.textContent.trim().toLowerCase();
                let tag_items = document.querySelectorAll(".mcq.page .sidebar .tag-item .name");
                tag_items.forEach((item) => {
                    let tag = item.textContent.trim().toLowerCase();
                    if (tag == name) item.click();
                });
            });
        });

        if (!userdata.vocab) userdata.vocab = [];
        if (userdata.vocab.length) {
            let span = document.createElement("span");
            span.className = "my-vocab";
            span.textContent = "my vocab";
            ele.appendChild(span);

            span.addEventListener("click", () => {
                que_type = "vocab";
                fil_vocab = user_data[0].vocab;
                fil_vocab = sortArrayRandomly(fil_vocab);
                // Define a custom sort order
                const levelOrder = {
                    hard: 1,
                    medium: 2,
                    easy: 3,
                };

                // Sort the array
                fil_vocab.sort((a, b) => {
                    return levelOrder[a.level] - levelOrder[b.level];
                });

                curr_vocab_index = 0;
                displayVocab();
            });
        }
    }

    if (false) {
        ele.forEach((ee) => {
            ee.addEventListener("click", () => {
                let class_name = ee.className;
                let tags = document.querySelectorAll(".mcq.page .sidebar .tag-item .name");
                if (class_name == "gs") {
                    tags.forEach((tags_ele) => {
                        let name = tags_ele.textContent.trim().toLowerCase();
                        if (name == "general studies") tags_ele.click();
                    });
                } else if (class_name == "english") {
                    tags.forEach((tags_ele) => {
                        let name = tags_ele.textContent.trim().toLowerCase();
                        if (name == "english") tags_ele.click();
                    });
                } else if (class_name == "aptitude") {
                    tags.forEach((tags_ele) => {
                        let name = tags_ele.textContent.trim().toLowerCase();
                        if (name == "aptitude") tags_ele.click();
                    });
                } else if (class_name == "reasoning") {
                    tags.forEach((tags_ele) => {
                        let name = tags_ele.textContent.trim().toLowerCase();
                        if (name == "reasoning") tags_ele.click();
                    });
                }
            });
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
            //downloadQuestionsAsHTMLFiles();

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

    let eee = document.querySelector(".page.notes .sidebar .search-results div");
    if (!eee) {
        tar_ele.innerHTML = "No result found";
    }
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
    block.children = block.children ? block.children : [];
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

function getTodayDateMMddyyyy() {
    const today = new Date();
    const options = { year: "numeric", month: "short", day: "numeric" };
    const dateString = today.toLocaleDateString("en-US", options);

    // Format the day with ordinal suffix
    const day = today.getDate();
    const dayWithSuffix = day + getDaySuffix(day);

    // Format the month and year
    const month = today.toLocaleString("en-US", { month: "short" });
    const year = today.getFullYear();

    // Format: "Aug 15th, 1947"
    return `${month} ${dayWithSuffix}, ${year}`;
}

function getDaySuffix(day) {
    const j = day % 10;
    const k = day % 100;
    if (j === 1 && k !== 11) {
        return "st";
    }
    if (j === 2 && k !== 12) {
        return "nd";
    }
    if (j === 3 && k !== 13) {
        return "rd";
    }
    return "th";
}

function getTodayDay() {
    const today = new Date();
    const options = { weekday: "long" };
    return today.toLocaleDateString("en-US", options);
}

function confirmCloseMockTest() {
    let ele = document.querySelector(".me-overlay .content");
    ele.innerHTML = `<span>Do you really want to close this mock test</span>
                    <div class="buttons">
                        <button class="no">No</button>
                        <button class="yes">Yes</button>
                    </div>`;

    openOverlay();
    let eee = ele.querySelector(".no");
    eee.addEventListener("click", () => {
        closeOverlay();
        return false;
    });
    eee = ele.querySelector(".yes");
    eee.addEventListener("click", () => {
        closeOverlay();
        return true;
    });
}

function closeOverlay() {
    document.querySelector(".me-overlay").classList.add("hide");
}
function openOverlay() {
    document.querySelector(".me-overlay").classList.remove("hide");
}

function getFormattedDateMMddYYYY(date) {
    // Create a new Date object from the input date string
    const dateObj = new Date(date);

    // Define options for date formatting
    const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
    };

    // Format the date
    const formattedDate = dateObj.toLocaleDateString("en-US", options);

    // Extract day part of the formatted date
    const day = dateObj.getDate();

    // Add ordinal suffix to the day
    const suffix = day % 10 === 1 && day !== 11 ? "st" : day % 10 === 2 && day !== 12 ? "nd" : day % 10 === 3 && day !== 13 ? "rd" : "th";

    // Replace day with the day plus the suffix
    const formattedDateWithSuffix = formattedDate.replace(day, day + suffix);

    // Return the formatted date with ordinal suffix
    return formattedDateWithSuffix;
}

async function getMeaning(word) {
    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch. Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

function adjustTextareaHeight(textareaElement) {
    textareaElement.style.height = "auto"; // Reset height to auto to correctly calculate scrollHeight
    textareaElement.style.height = textareaElement.scrollHeight + "px"; // Set the height to scrollHeight
}
async function displayVocab(obj) {
    if (!obj) obj = fil_vocab[curr_vocab_index];

    let meaning = obj.english_meaning != "" ? obj.english_meaning : await getMeaning(obj.word.toLowerCase());
    obj.english_meaning = meaning;
    saveUserData();

    let ele = document.querySelector(".page.mcq .main .que-text");
    ele.innerHTML = `<div class="vocab">
                        <span class="word">${obj.word}</span>
                        <span class="check link">Show meaning</span>
                        <div class="word-meaning hide">
                            <div class="levels">
                        <span>Level:</span>
                            <div class="level">
                                <span class="hard">hard</span>
                                <span class="medium">medium</span>
                                <span class="easy">easy</span>
                            </div>
                        </div>
                              
                            <textarea cols="30" rows="2" class="local "></textarea>
                            
                            <span class="find-in-notes link hide">The word "${obj.word}" has been found in notes</span>
                            <div class="english ">
                                <span class="word_">Meaning of "${obj.word}"</span>
                            </div>
                        </div>
                        <button class="new-word" style="width: 100%;">New Word</button>
                    </div>
    `;

    let eee = ele.querySelector(".check");
    eee.addEventListener("click", () => {
        ele.querySelector(".check").classList.add("hide");
        ele.querySelector(".word-meaning").classList.remove("hide");
        if (false && obj.english_meaning == "") {
            obj.english_meaning = meaning;
            saveUserData();
        }

        let levels = ele.querySelectorAll(".level span");
        levels.forEach((span) => {
            if (span.classList.contains(obj.level)) span.classList.add("active");
        });
        levels.forEach((level) => {
            level.addEventListener("click", () => {
                levels.forEach((ll) => {
                    ll.classList.remove("active");
                });
                level.classList.add("active");
                obj.level = level.textContent.trim().toLowerCase();
                saveUserData();
            });
        });

        let input_local = ele.querySelector("textarea.local");
        input_local.value = obj.local_meaning.trim() == "" ? "Add your text" : obj.local_meaning;
        input_local.addEventListener("input", () => {
            obj.local_meaning = input_local.value.trim();
            adjustTextareaHeight(input_local);
            saveUserData();
        });

        let em = obj.english_meaning[0];
        let eee = ele.querySelector(".english");
        em.meanings.forEach((meaning) => {
            let div_ = document.createElement("div");
            div_.className = "part-of-speech";
            eee.appendChild(div_);

            let span = document.createElement("span");
            span.textContent = `Part of speech:  ${meaning.partOfSpeech}`;
            div_.appendChild(span);

            let div = document.createElement("div");
            div.className = "definitions";
            div.textContent = `Definitions:`;
            div_.appendChild(div);

            meaning.definitions.forEach((definition, index) => {
                let span = document.createElement("span");
                span.className = "definition";
                span.textContent = `${index + 1}.  ${definition.definition}`;
                div.appendChild(span);
            });

            div = document.createElement("div");
            div.className = "synonyms";
            div_.appendChild(div);

            span = document.createElement("span");
            span.className = "";
            span.textContent = `Synonyms:`;
            div.appendChild(span);

            meaning.synonyms.forEach((synonym) => {
                let span = document.createElement("span");
                span.className = "synonym";
                span.textContent = `${synonym}`;
                div.appendChild(span);
            });
        });
    });

    eee = ele.querySelector(".find-in-notes");

    // Create a temp element and add all the search results into this element
    let tar_ele = document.createElement("div");
    pages_data.forEach((page) => {
        let page_id = page.id;
        let data = page.data;
        data.forEach((block) => {
            searchTextInBlocks(block, page_id, tar_ele, obj.word);
        });
    });
    // If the temp element has children means the word is in notes .. thus show the link
    if (tar_ele.children.length) eee.classList.remove("hide");
    eee.addEventListener("click", () => {
        openNotesPage2();
        let eee = document.querySelector(".page.notes .main i");
        openSidebar(eee);

        document.querySelector(".page.notes .sidebar  .tab.search").click();
        document.querySelector(".page.notes .sidebar  .top input.search").value = obj.word;
        searchTextInNotes(obj.word);
    });

    eee = ele.querySelector(".new-word");
    eee.addEventListener("click", () => {
        ++curr_vocab_index;
        if (curr_vocab_index == fil_vocab.length) curr_vocab_index = 0;
        displayVocab();
    });
}

async function updateQuestionInfo(mock_test_div) {
    let all_que_divs = mock_test_div.querySelectorAll(".que-div");
    let i = 0;
    let is_online = navigator.onLine;
    while (is_online && i < all_que_divs.length) {
        let que_div = all_que_divs[i];
        let id = que_div.id;
        let user_ref = database.ref(`${exam}/questionInfo/${id}`);

        try {
            let snapshot = await user_ref.once("value");
            let obj = snapshot.val() || { options: [] };

            let options = que_div.querySelectorAll(".option");
            let selected_option = que_div.querySelector(".option.selected");

            options.forEach((option, index) => {
                if (selected_option === option) {
                    obj.options[index] = (obj.options[index] || 0) + 1;
                } else {
                    obj.options[index] = obj.options[index] || 0;
                }
            });

            await database.ref(`${exam}/questionInfo/${id}`).set(obj);
            ++i;
        } catch (error) {
            console.error("Error updating question info:", error);
        }
    }
}

async function createSharedMock() {
    var selected_chapters = [];
    let chapters = document.querySelectorAll(".new-mock .mock-chapters-list .tag-item");
    if (chapters) {
        chapters.forEach((ele) => {
            if (ele.children[0].checked) {
                selected_chapters.push(ele.children[1].textContent.toLowerCase());
            }
        });
    }

    let mock_questions_length = parseInt(document.querySelector(".total-mock-questions input").value);
    mock_questions_length = mock_questions_length ? mock_questions_length : 20;
    if (mock_questions_length < 20) mock_questions_length = 20;
    if (mock_questions_length > 50) mock_questions_length = 50;

    let arr = [];

    let is_pyq_based = document.querySelector(".pyq-based-mock input").checked;

    if (selected_chapters.length) {
        let all_ques = que_data;
        all_ques = sortArrayRandomly(all_ques);
        let i = 0;
        let y = 0;
        while (y < mock_questions_length && i < all_ques.length) {
            if (selected_chapters.some((tag) => all_ques[i].tags.includes(tag))) {
                if (is_pyq_based) {
                    if (all_ques[i].tags.includes("pyq")) {
                        arr.push(all_ques[i].id);
                        ++y;
                    }
                } else {
                    arr.push(all_ques[i].id);
                    ++y;
                }
            }
            ++i;
        }
        mock_questions_length = y;
    } else {
        let all_ques = que_data;
        all_ques = sortArrayRandomly(all_ques);
        let i = 0;
        let y = 0;
        while (y < mock_questions_length && i < all_ques.length) {
            if (is_pyq_based) {
                if (all_ques[i].tags.includes("pyq")) {
                    arr.push(all_ques[i].id);
                    ++y;
                }
            } else {
                arr.push(all_ques[i].id);
                ++y;
            }
            ++i;
        }
        mock_questions_length = y;
    }

    let id = generateUniqueId();
    let obj = {
        id: id,
        que_ids: arr,
        users: [],
    };
    await database.ref(`${exam}/sharedmock/${id}`).set(obj);

    let ele = document.querySelector(".shared-mock-link");
    if (ele) {
        ele.classList.remove("hide");

        let url = window.location.href;
        let ind = url.indexOf("#");
        if (ind != -1) {
            url = url.substring(0, ind - 1);
        }
        url = url + `/#/${exam}/mock/shared/${id}`;
        ele.querySelector(".link span").textContent = url;

        ele.querySelector(".link").addEventListener("click", () => {
            if (is_mobile && navigator.share) {
                // Use Web Share API to share
                navigator
                    .share({
                        title: "Shared Mock Link",
                        url: url,
                    })
                    .then(() => {
                        console.log("Link shared successfully");
                        popupAlert("Link shared successfully");
                    })
                    .catch((error) => {
                        console.error("Error sharing link:", error);
                        copyToClipboard(url); // Fallback to copy URL to clipboard
                        popupAlert("Link copied to clipboard");
                    });
            } else {
                // Fallback for browsers that do not support Web Share API
                copyToClipboard(url); // Copy URL to clipboard
                popupAlert("Link copied to clipboard");
            }
        });
        ele.querySelector(".cross").addEventListener("click", () => {
            ele.classList.add("hide");
        });
    }
}

async function getUserDataFromFirebase() {
    let userid = user_login_data.userid;
    let user_ref = database.ref(`${exam}/users/${userid}/userdata`);
    let is_online = navigator.onLine;
    if (!is_online) {
        popupAlert("You are offline, Userdata cannot be retrieved");
        return null;
    }
    try {
        let snapshot = await user_ref.once("value");
        let obj = snapshot.val() || {};
        userdata = obj;
        return obj;
    } catch (error) {
        console.error("Error getting userdata from firebase:", error);
    }
}

async function getDataFromFireBase() {
    let user_ref = database.ref(`esa_data/${exam}/data`);
    let snapshot = await user_ref.once("value");
    let obj = snapshot.val() || null;
    return obj;
}
async function getAppLevelDataFromFireBase() {
    let user_ref = database.ref(`esa_app_level_data`);
    let snapshot = await user_ref.once("value");
    let obj = snapshot.val() || [];
    return obj;
}
async function saveAppLevelDataInFireBase() {
    await database.ref(`esa_app_level_data`).set(app_level_data);
}
async function getSharedQuestionsFromFirebase() {
    let user_ref = database.ref(`${exam}/shared_questions/data`);
    let snapshot = await user_ref.once("value");
    let obj = snapshot.val() || null;

    shared_ques = obj ? obj : [];

    return obj;
}

function getCurrentTimeSTamp() {
    const now = new Date();

    // Extract year, month, day, hour, minute, second and pad with zeros if necessary
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(now.getDate()).padStart(2, "0");
    const hour = String(now.getHours()).padStart(2, "0");
    const minute = String(now.getMinutes()).padStart(2, "0");
    const second = String(now.getSeconds()).padStart(2, "0");

    // Construct the timestamp string
    const timestampString = `${year}${month}${day}${hour}${minute}${second}`;
    return timestampString;
    // Convert the string to an integer
    //const timestampInteger = parseInt(timestampString, 10);

    //timestampInteger;
}

async function postLogin() {
    let userid = user_login_data.userid;
    let user_ref = database.ref(`${exam}/users/${userid}/user_info`);
    let snapshot = await user_ref.once("value");
    let obj = snapshot.val() || null;
    if (!obj) {
        user_ref.set(user_login_data);
    }

    document.querySelector(".start.login").classList.add("hide");
    document.querySelector(".content").classList.remove("hide");
    document.querySelector(".main-content").classList.remove("hide");
    // Hide google sigin btn
    // document.getElementById("google-sign-in-btn").classList.add("hide");
    // Show user-info
    //let ele = document.querySelector(".user-info");
    //ele.classList.remove("hide");
    //ele.querySelector(".name-photo img").src = user_login_data.photo_url;
    //ele.querySelector(".name").textContent = user_login_data.display_name;
    //ele.querySelector(".username").textContent = "@" + user_login_data.username;
    //popupAlert(`Signed in as "${user_login_data.display_name}"`);
    popupAlert(`Signed in as "${user_login_data.display_name}" &  Exam: "${exam.toUpperCase()}"`);

    await getAllUsersInfo();

    let data = await getDataFromFireBase();
    data = data ? data : {};
    esa_ques = data.ques_data ? data.ques_data : [];
    que_data = esa_ques;
    notes_data = data.notes_data ? data.notes_data : [];
    tags_list = data.tags_list ? data.tags_list : [];
    static_mocks = data.mocks_data ? data.mocks_data : [];
    console.log(`ESA data loaded`);

    await loadRefreshQuestions();
    //await getSharedQuestionsFromFirebase();

    //userdata = await getUserDataFromFirebase();
    //if (!userdata) userdata = {};

    if (!userdata.daily_questions) {
        // Check for old data
        let old_user_data = localStorage.getItem(`user_data_${exam}`);
        if (old_user_data) {
            old_user_data = JSON.parse(old_user_data);
            old_user_data = old_user_data[0];
            userdata.daily_questions = old_user_data.daily_questions ? old_user_data.daily_questions : [];
            userdata.mocks = old_user_data.mock_tests ? old_user_data.mock_tests : [];
            userdata.images = old_user_data.images ? old_user_data.images : [];
            userdata.videos = old_user_data.videos ? old_user_data.videos : [];
            userdata.links = old_user_data.links ? old_user_data.links : [];
            saveUserData();
            //localStorage.removeItem(`user_data_${exam}`);
        }
    }

    initialLoading();
    loadUserPage();
    openPageBasedOnURL();
}

function loadUserPage() {
    let user_page = document.querySelector(".user.page");
    user_page.innerHTML = `
                      <div class="search-users">
                            <i class="fa-regular fa-user"></i>
                            <input type="search" class="search" placeholder="Search users" />
                        </div>
                        
                        <div class="user-info">
                            <div class="name-photo">
                                <canvas id="profileCanvas" width="200" height="200"></canvas>
                                <div class="name-email">
                                    <span class="name">${user_login_data.display_name}</span>
                                    <span class="username"> @${user_login_data.username}</span>
                                    <span class="email"> ${user_login_data.email}</span>
                                </div>
                                <span class="edit link">Edit profile</span>
                                <span id="sign-out-btn">sign out</span>
                            </div>
                            <div class="followings-info">
                                <div class="following">
                                    <span class="count"></span>
                                    <span>Following</span>
                                </div>
                                <div class="followers">
                                    <span class="count"></span>
                                    <span>Followers</span>
                                </div>
                            </div>

                        </div>
                        <div class="top-sec hide">
                            <div class="filter">
                                <i class="fa-regular fa-filter"></i>
                                <span>filter</span>
                            </div>
                            <div class="search">
                                <i class="fa-regular fa-magnifying-glass"></i>
                                <span>search</span>
                            </div>
                            <div class="refresh">
                                <i class="fa-solid fa-rotate-right"></i>
                                <span>refresh</span>
                            </div>
                        </div>
                        <div class="user-question-sec">
                            <h2> Shared ${exam.toUpperCase()} Questions</h2>
                            <div class="user-questions"></div>
                        </div>
                        
    `;
    userdata.following = userdata.following ? userdata.following : [];
    user_page.querySelector(".following .count").textContent = userdata.following.length;

    userdata.followers = userdata.followers ? userdata.followers : [];
    user_page.querySelector(".followers .count").textContent = userdata.followers.length;

    setProfileCanvaPic(user_page);
    let signout_btn = user_page.querySelector("#sign-out-btn");
    signout_btn.addEventListener("click", () => {
        saveDataInLocale("user_login_data", null);
        //alert("User signed out");
        //location.reload(true);

        document.querySelector(".start.login").classList.remove("hide");
        document.querySelector(".content").classList.add("hide");
    });
    loadUserQuestions();
    let refresh_ele = user_page.querySelector(".refresh");
    if (refresh_ele) {
        refresh_ele.addEventListener("click", () => {
            loadUserQuestions();
        });
    }

    let edit_profile = user_page.querySelector(".edit");
    if (edit_profile) {
        edit_profile.addEventListener("click", () => {
            openOverlay();
            let overlay_content = document.querySelector(".me-overlay .content");
            overlay_content.innerHTML = `
            <div class="update-user indo">
                <h3>Update User Info</h3>
                <div class="display_name">
                    <span class="label">Display Name</span>
                    <input type="text" class="display_name" />
                </div>

                <div class="username">
                    <span class="label">Username</span>
                    <input type="text" class="username" />
                </div>

                <div class="btns">
                    <span class="link close">close</span>
                    <button class="update">Update</button>
                </div>
            </div>
            `;

            overlay_content.querySelector(".display_name input").value = user_login_data.display_name;
            overlay_content.querySelector(".username input").value = user_login_data.username;

            overlay_content.querySelector(".close").addEventListener("click", () => {
                closeOverlay();
            });

            overlay_content.querySelector(".update").addEventListener("click", () => {
                let display_name = overlay_content.querySelector(".display_name input").value;
                let username = overlay_content.querySelector(".username input").value;
                updateUserInfo(display_name, username);
            });
        });
    }

    let search_ele = user_page.querySelector(".search-users input");
    search_ele.addEventListener("focus", (event) => {
        let arr = [];

        all_users_info.forEach((user) => {
            let name = user.display_name + "  @" + user.username;
            if (user.username != user_login_data.username) arr.push(name);
        });
        setAutoComplete(event, arr, "search-users");
        //search_ele.parentElement.style.border = "2px solid blue";
    });
    search_ele.addEventListener("blur", () => {
        //search_ele.parentElement.style.border = "0px solid gray";
    });
}

function loadUserQuestions() {
    let target_ele = document.querySelector(".page.user .user-questions");
    target_ele.innerHTML = "";
    user_questions.forEach((que) => {
        let que_div = displayQuestion(que, target_ele, "user_question");
        //target_ele.appendChild(que_div);
        let div = document.createElement("div");
        div.className = "delete";

        div.innerHTML = `
        <i class="fa-solid fa-trash-can"></i>
        <span>Delete</span>
        `;
        que_div.appendChild(div);

        div.addEventListener("click", () => {
            openOverlay();
            let overlay = document.querySelector(".me-overlay .content");
            overlay.innerHTML = `
            <div class="confirmation delete-question ">
                <span>Are you sure you want to delete this question?</span>
                <div class="btns">
                    <span class="no link">No</span>
                    <button class="yes">Yes</button>
            </div>
            `;
            overlay.querySelector(".yes").addEventListener("click", () => {
                deleteSharedQuestion(que.id);
                que_div.remove();
                closeOverlay();
            });
            overlay.querySelector(".no").addEventListener("click", () => {
                closeOverlay();
            });
        });
    });
}

async function displayUsernameInSharedQuestion(que_div, userid) {
    let div = document.createElement("div");
    div.className = "shared-by";
    que_div.appendChild(div);

    let user_ref = database.ref(`${exam}/users/${userid}/user_info`);
    let snapshot = await user_ref.once("value");
    let obj = snapshot.val();
    let display_name = obj.display_name;

    div.innerHTML = `<span style="color:gray">Shared by: </span>
                    <span class="name link">${display_name}</span>
                    <span class="follow link"> follow </span>
                    `;

    if (obj.userid == user_login_data.userid) {
        div.querySelector(".follow").classList.add("hide");
        div.querySelector(".name").textContent = "You";
    }

    let display_name_ele = div.querySelector(".name");
    display_name_ele.addEventListener("click", () => {
        if (obj.userid == user_login_data.userid) {
            openPage("user");
            return;
        }
        displayUserPage(obj);
    });

    let is_followed = false;
    userdata.following = userdata.following ? userdata.following : [];
    is_followed = userdata.following.includes(obj.userid);

    let span_follow = div.querySelector(".follow");
    if (is_followed) {
        span_follow.className = "following";
        span_follow.textContent = "Following";
    } else {
        span_follow.addEventListener("click", () => {
            userdata.following.push(obj.userid);

            updateFollowerData(obj);

            saveUserData();
            popupAlert(`You have now followed "${display_name}"`);
            span_follow.className = "following";
            span_follow.textContent = "Following";
            span_follow.addEventListener("click", () => {});
        });
    }
}

async function updateFollowerData(obj) {
    let user_ref = database.ref(`${exam}/users/${obj.userid}/userdata`);
    let snapshot = await user_ref.once("value");
    let new_obj = snapshot.val() || {};
    new_obj.followers = new_obj.followers ? new_obj.followers : [];
    new_obj.followers.push(user_login_data.userid);
    await user_ref.set(new_obj);
}

async function saveQuestionReportMessage(id, text, div) {
    let user_ref = database.ref(`${exam}/reported_questions`);

    let snapshot = await user_ref.once("value");
    let obj = snapshot.val() || [];

    let re_obj = {
        que_id: id,
        message: text,
        reported_by: user_login_data.username,
        reported_date: getTodayDate(),
    };
    obj.push(re_obj);
    await database.ref(`${exam}/reported_questions`).set(obj);
    popupAlert("Question has been reported", 5, "green");
    div.remove();
}

function displayUserPage(obj) {
    openOverlay();
    let overlay = document.querySelector(".me-overlay .content");
    overlay.innerHTML = getUserPageHTMLTemplate(obj);

    overlay.querySelector(".close").addEventListener("click", () => {
        closeOverlay();
    });

    shared_ques.forEach((que) => {
        if (que.userid == obj.userid) {
            let tar = overlay.querySelector(".user-questions");
            let que_div = displayQuestion(que, tar, "user_question");
            displayQuestionActionItems(que_div, que);
        }
    });
}

function getUserPageHTMLTemplate(user_login_data) {
    return `
    <div class="user-page">
        <div class="top">
            <i class="fa-solid fa-arrow-left-long close"></i>
            <div class="user-info">
                <div class="name-photo">
                    <img src="${user_login_data.photo_url}" class="photo" />
                    <div class="name-email">
                        <span class="name">${user_login_data.display_name}</span>
                        <span class="username">@${user_login_data.username}</span>
                    </div>
                </div>
            </div>
            <div class="followings-info hide">
                                <div class="following">
                                    <span class="count"></span>
                                    <span>Following</span>
                                </div>
                                <div class="followers">
                                    <span class="count"></span>
                                    <span>Followers</span>
                                </div>
                            </div>
            <div class="follow-info hide ">
                <span class="follow link hide">Follow</span>
                <span class="unfollow link hide">Unfollow</span>
            </div>
            

        </div>
        <div class="header">
            <h3>Shared ${exam.toUpperCase()} Questions</h3>
        </div>
        <div class="user-questions"></div>
    </div>
    `;
}

async function deleteSharedQuestion(id) {
    await database.ref(`${exam}/shared_questions/data/${id}`).remove();
    shared_ques = shared_ques.filter((que) => que.id != id);
    popupAlert("Question has been deleted", 5, "green");
}

function displayQuestionActionItems(que_div, que) {
    // div = share question div
    let idiv = document.createElement("div");
    idiv.className = "que-actions";
    que_div.appendChild(idiv);

    let sdiv = document.createElement("div");
    sdiv.className = "bookmark-question link";
    idiv.appendChild(sdiv);

    let is_que_bookmarked = userdata.bookmarks ? userdata.bookmarks.includes(que.id) : false;
    if (is_que_bookmarked) {
        sdiv.innerHTML = `<i class="fa-solid fa-bookmark"></i>
                          <span>Bookmarked</span>`;
    } else {
        sdiv.innerHTML = `<i class="fa-regular fa-bookmark"></i>
                          <span>Bookmark</span>`;
    }

    sdiv.addEventListener("click", () => {
        userdata.bookmarks = userdata.bookmarks ? userdata.bookmarks : [];

        if (is_que_bookmarked) {
            // Remove from bookmarks
            userdata.bookmarks.splice(userdata.bookmarks.indexOf(que.id), 1);
            que_div.querySelector(".bookmark-question i").className = "fa-regular fa-bookmark";
            que_div.querySelector(".bookmark-question  span").textContent = "Bookmark";
            popupAlert("Question removed from bookmarks");
            is_que_bookmarked = false;
        } else {
            // Add to bookmarks
            is_que_bookmarked = true;
            userdata.bookmarks.push(que.id);
            que_div.querySelector(".bookmark-question i").className = "fa-solid fa-bookmark";
            que_div.querySelector(".bookmark-question  span").textContent = "Bookmarked";
            popupAlert("Question added to bookmarks");
        }
        userdata.bookmarks = userdata.bookmarks ? userdata.bookmarks : [];
        if (userdata.bookmarks.length) {
            document.querySelector(".page.mcq .main span.link.bookmark").classList.remove("hide");
        }
        saveUserData();
    });

    sdiv = document.createElement("div");
    sdiv.className = "report-question link";
    idiv.appendChild(sdiv);

    sdiv.innerHTML = `<i class="fa-duotone fa-solid fa-circle-exclamation"></i>
                          <span>Report</span>`;
    sdiv.addEventListener("click", () => {
        let div = document.createElement("div");
        div.className = "report";
        let ele_bfr = que_div.querySelector(".me-note");
        que_div.insertBefore(div, ele_bfr);
        div.innerHTML = `
            <textarea name="" id="" cols="30" rows="5" placeholder="Add report message here"></textarea>
            <div class="bottom">
                <span class="link cancel">cancel</span>
                <button class="submit">Submit</button>
            </div>
            `;

        div.querySelector(".cancel").addEventListener("click", () => {
            div.remove();
        });
        div.querySelector(".submit").addEventListener("click", () => {
            let text = div.querySelector("textarea").value.trim();
            if (text == "") {
                popupAlert("Report message cannot be empty", 5, "red");
                return;
            }
            saveQuestionReportMessage(que.id, text, div);
        });
    });

    sdiv = document.createElement("div");
    sdiv.className = "share-question link";
    idiv.appendChild(sdiv);

    sdiv.innerHTML = `<i class="fa-regular fa-share-nodes"></i>
                          <span>Share</span>`;
    sdiv.addEventListener("click", () => {
        const currentUrl = window.location.href;

        // Check if Web Share API is supported

        if (is_mobile && navigator.share) {
            // Use Web Share API to share
            navigator
                .share({
                    title: "Share Current Question",
                    url: currentUrl,
                })
                .then(() => {
                    console.log("Link shared successfully");
                    popupAlert("Link shared successfully");
                })
                .catch((error) => {
                    console.error("Error sharing link:", error);
                    copyToClipboard(currentUrl); // Fallback to copy URL to clipboard
                    popupAlert("Link copied to clipboard");
                });
        } else {
            // Fallback for browsers that do not support Web Share API
            copyToClipboard(currentUrl); // Copy URL to clipboard
            popupAlert("Question Link copied");
        }
    });
}

async function displayQuestionVerficationStatus(que_div, que) {
    return;
    let div = document.createElement("div");
    div.className = "verification-status";
    que_div.appendChild(div);

    div.innerHTML = `
    <span>Could you pleaseerify this question:</span>
    <span class="yes link">Yes</span>
    <div class="verify-items hide">
        <div class="item question">
            <input type="checkbox" name="" id="">
            <span>Question is propert</span>
        </div>
        <div class="item options">
            <input type="checkbox" name="" id="">
            <span>Options are proper</span>
        </div>
        <div class="item answer">
            <input type="checkbox" name="" id="">
            <span>Answer is correct</span>
        </div>
        <div class="item tags">
            <input type="checkbox" name="" id="">
            <span>Tags are proper</span>
        </div>
        <button class="submit">Submit</button>
    </div>
    `;

    div.querySelector(".yes").addEventListener("click", () => {
        div.querySelector(".verify-items").classList.remove("hide");
    });

    div.querySelector(".submit").addEventListener("click", () => {
        let obj = {
            question: div.querySelector(".question input").checked ? que.verification_status.question + 1 : que.verification_status.question,
            options: div.querySelector(".options input").checked ? que.verification_status.options + 1 : que.verification_status.options,
            answer: div.querySelector(".answer input").checked ? que.verification_status.answer + 1 : que.verification_status.answer,
            tags: div.querySelector(".tags input").checked ? que.verification_status.tags + 1 : que.verification_status.tags,
        };

        //Update shared_question verification status in firebase
        updateQuestionVerficationStatus(que.id, obj);

        div.remove();
    });
}
async function updateQuestionVerficationStatus(id, obj) {
    const ref = database.ref(`${exam}/shared_questions/data`);

    // Fetch the current value of 'data' arrays̤
    ref.once("value", (snapshot) => {
        const data = snapshot.val();
        const index = data.findIndex((item) => item.id === id);
        if (index !== -1) data[index].verification_status = obj;

        ref.set(data)
            .then(() => {
                popupAlert("Verification status updated successfully", 5, "green");
            })
            .catch((error) => {
                popupAlert("Error updating verification status", 5, "red");
            });
    });
}

async function checkIsUserExist(email) {
    let user_ref = database.ref(`esa_data/users`);
    let snapshot = await user_ref.once("value");
    let obj = snapshot.val() || [];
    for (let i = 0; i < obj.length; i++) {
        if (obj[i].email == email) {
            user_login_data = obj[i];
            return user_login_data;
        }
    }
    obj.push(user_login_data);
    await user_ref.set(obj);
}

async function getAllUsersInfo() {
    let user_ref = database.ref(`esa_data/users`);
    let snapshot = await user_ref.once("value");
    let obj = snapshot.val() || [];
    all_users_info = obj;
}

async function updateUserInfo(display_name, username) {
    let user_ref = database.ref(`esa_data/users`);
    let snapshot = await user_ref.once("value");
    let obj = snapshot.val() || [];
    if (!obj[0]) obj.splice(0, 1);
    for (let i = 0; i < obj.length; i++) {
        if (obj[i].username == username && obj[i].username != user_login_data.username) {
            popupAlert("Username already exists", 5, "red");
            return;
        }
    }
    let index = obj.findIndex((item) => item.userid == user_login_data.userid);

    user_login_data.display_name = display_name;
    user_login_data.username = username;

    const initials = display_name.charAt(0);
    const avatarUrl = getAvatarUrl(initials);
    user_login_data.photo_url = avatarUrl;
    if (index !== -1) {
        obj[index].display_name = display_name;
        obj[index].username = username;
        obj[index].photo_url = avatarUrl;
    }
    //obj.push(user_login_data);

    await user_ref.set(obj);
    await database.ref(`${exam}/users/${user_login_data.userid}/user_info`).set(user_login_data);
    saveDataInLocale("user_login_data", user_login_data);
    loadUserPage();
    popupAlert("User info updated successfully", 5, "green");
    closeOverlay();
}

function updateBookmarQuestions() {}

function getAvatarUrl(initials, size = 200) {
    const cleanInitials = initials.trim().toLowerCase();
    const hash = CryptoJS.MD5(cleanInitials).toString(CryptoJS.enc.Hex);
    const baseUrl = "https://www.gravatar.com/avatar/";
    const query = `d=identicon&s=${size}`;
    return `${baseUrl}${hash}?${query}`;
}

function setProfileCanvaPic(ele) {
    const canvas = ele.querySelector("canvas");
    const ctx = canvas.getContext("2d");

    function drawProfilePicture(initial) {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw background (you can customize colors and styles)
        ctx.fillStyle = getRandomColor();
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw initial
        ctx.font = "80px Arial"; // Font size and family
        ctx.fillStyle = "black"; // Text color
        ctx.textAlign = "center"; // Center the text horizontally
        ctx.textBaseline = "middle"; // Center the text vertically
        ctx.font = "bold 100px Arial"; // Make the text bold
        ctx.fillText(initial.toUpperCase(), canvas.width / 2, canvas.height / 2); // Draw initial in the center
    }

    // Example usage:
    const name = user_login_data.display_name;
    const initial = name.charAt(0); // Get the first character of the name
    drawProfilePicture(initial);
}

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

async function loadRefreshQuestions() {
    let ele = document.querySelector(".que-type .types");
    await getSharedQuestionsFromFirebase();
    ver_ques = [];
    unver_ques = [];
    user_questions = [];

    shared_ques.forEach((que) => {
        if (que.userid === user_login_data.userid) user_questions.push(que);

        if (que.verified) {
            ver_ques.push(que);
        } else {
            unver_ques.push(que);
        }
    });
    ver_ques = ver_ques.concat(esa_ques);
    all_ques = esa_ques.concat(shared_ques);

    if (shared_ques.length) {
        if (ele) ele.querySelector(".unverified").classList.remove("hide");
    }
    await getUserDataFromFirebase();
    if (!userdata.following) userdata.following = [];
    follower_ques = [];

    shared_ques.forEach((que) => {
        if (userdata.following.includes(que.userid)) follower_ques.push(que);
    });
    if (follower_ques.length) {
        if (ele) ele.querySelector(".following").classList.remove("hide");
    } else {
        if (ele) ele.querySelector(".following").classList.add("hide");
    }
}

function setUrl(tab) {
    let url = window.location.href;
    let ind = url.indexOf("#");
    if (ind != -1) {
        url = url.substring(0, ind - 1);
    }
    window.location.href = url + `/#/${exam}/${tab}`;
}

function setHomePageEvents() {
    let ele = document.querySelector(".home .share.link");
    if (ele) {
        ele.addEventListener("click", () => {
            let link = `https://elahistudyapp.in//#/${exam}/home`;
            copyToClipboard(link);
            popupAlert("App link copied");
        });
    }
    ele = document.querySelector(".download-app");
    ele.addEventListener("click", () => {
        const filePath = "/assets/elahi.apk";
        const link = document.createElement("a");
        link.href = filePath;
        link.download = filePath.split("/").pop(); // Sets the download attribute to the filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    let exam_select = document.querySelector(".page.home .exam select");
    exam_select.onchange = function () {
        let url = window.location.href;
        exam = exam_select.value;
        localStorage.setItem("esa_exam", exam);
        setUrl("home");
        location.reload();
    };
}
//const Youtube_API = "AIzaSyBVZm9SQX17luce8LDzPzy-HmG3YkjKAt8";

async function getVideoInfoUsingVideoId(video_id) {
    const apiKey = "AIzaSyBVZm9SQX17luce8LDzPzy-HmG3YkjKAt8";
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${video_id}&key=${apiKey}&part=snippet`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Network response was not ok.");
        }

        const data = await response.json();
        if (data.items.length === 0) {
            throw new Error("No video found with that ID.");
        }

        const channelTitle = data.items[0].snippet.channelTitle;
        const channelId = data.items[0].snippet.channelId;
        const channelUrl = `https://www.youtube.com/channel/${channelId}`;
        const videoTitle = data.items[0].snippet.title;

        return {
            channel_name: channelTitle,
            channel_url: channelUrl,
            video_title: videoTitle,
        };
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

function getVideoItemsFromText(text) {
    let pattern = /\{video:([^:}]+):([^:}]+)\}/g;

    // Array to store all matches
    let matches = [];
    let match;

    // Loop through all matches found in the text
    while ((match = pattern.exec(text)) !== null) {
        let video_id = match[1]; // Extract the video_id (the first capture group)
        let time = match[2]; // Extract the time (the second capture group)
        matches.push({ video_id, time });
    }
    return matches;
}
