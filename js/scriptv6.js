(function () {
    /*import React from "react";
import { Tldraw } from "tldraw";
import "tldraw/tldraw.css"; // Import tldraw styles

    /* import React from "react";
import ReactDOM from "react-dom";
*/

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
    const auth = firebase.auth();
    const provider = new firebase.auth.GoogleAuthProvider();

    let exam = "ssc";
    let is_mobile = true;
    let subjects = {
        ssc: ["general studies", "english", "aptitude", "reasoning"],
        neet: ["biology", "chemistry", "physics"],
        upsc: ["polity", "economics", "geography", "history", "science", "int_relations", "current_affairs"],
    };

    let deferredPrompt;

    window.addEventListener("beforeinstallprompt", (e) => {
        e.preventDefault();
        deferredPrompt = e;
        // Show install button or prompt the user
        const installButton = document.getElementById("install-button");
        installButton.style.display = "block";

        installButton.addEventListener("click", () => {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === "accepted") {
                    console.log("User accepted the install prompt");
                } else {
                    console.log("User dismissed the install prompt");
                }
                deferredPrompt = null;
            });
        });
    });

    function LoadingAnimation() {
        return (
            <div className="flex flex-col justify-center items-center h-screen">
                <div id="loading-animation" className="flex justify-center items-center h-screen">
                    <div className="relative w-24 h-24">
                        <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-500 rounded-full animate-spin"></div>
                        <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-purple-500 rounded-full animate-spin" style={{ animationDirection: "reverse", animationDuration: "1s" }}></div>

                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center shadow-lg">
                                <span className="text-3xl font-bold text-gray-100 transform -rotate-12" style={{ fontFamily: "Arial, sans-serif" }}>
                                    E
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    function selectExam(event) {
        exam = event.target.innerText.toLowerCase();
        event.target
            .closest(".exams")
            .querySelectorAll("span")
            .forEach((span) => {
                span.classList.remove("active");
            });
        event.target.classList.add("active");
    }

    function LoadSignInPageHTML() {
        let url_items = parseURL(window.location.href);
        exam = url_items.length ? url_items[0] : exam;

        let previous_login_emails = localStorage.getItem(`previous_login_emails`);
        if (previous_login_emails) previous_login_emails = JSON.parse(previous_login_emails);
        if (!previous_login_emails) previous_login_emails = [];

        return (
            <div className="container-inner flex flex-col justify-center items-center h-[100vh] w-full">
                <div className="hide mt-10 transform -translate-y-1/2">
                    <div className="hide w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-3xl font-bold text-white transform -rotate-12" style={{ fontFamily: "Arial, sans-serif" }}>
                            E
                        </span>
                        <h1 className="text-xl font-bold text-gray-800">ELAHI</h1>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center gap-2 w-full px-1">
                    <h1 className="text-[2.5em] font-bold text-gray-800">ELAHI</h1>
                    <span className="text-[1.4em] text-gray-500">A Social Study App</span>
                    <span className="text-md text-gray-500">Learn, Share, and Succeed Together</span>
                    <span className="text-gray-500 text-center ">First ever digital educational product from Ladakh</span>
                </div>

                <div className="exam block w-full h-auto">
                    <div className="flex flex-col justify-center items-center gap-2 my-2 mt-7">
                        <h1 className="text-xl  text-gray-600">Select Exam:</h1>
                        <div className="flex justify-center items-center gap-2 exams">
                            <span
                                className={`text-sm text-gray-500 border bg-order-gray-500 px-2 py-1 rounded-md cursor-pointer ${exam == "ssc" ? "active" : ""}`}
                                onClick={(event) => {
                                    selectExam(event);
                                }}
                            >
                                SSC
                            </span>
                            <span
                                className={`text-sm text-gray-500 border bg-order-gray-500 px-2 py-1 rounded-md cursor-pointer ${exam == "neet" ? "active" : ""}`}
                                onClick={(event) => {
                                    selectExam(event);
                                }}
                            >
                                NEET
                            </span>
                            <span
                                className={`text-sm text-gray-500 border bg-order-gray-500 px-2 py-1 rounded-md cursor-pointer ${exam == "upsc" ? "active" : ""}`}
                                onClick={(event) => {
                                    selectExam(event);
                                }}
                            >
                                UPSC
                            </span>
                        </div>
                        <select
                            className="w-[fit-content] p-2 rounded-md hide"
                            onChange={(event) => {
                                exam = event.target.value.toLowerCase();
                            }}
                        >
                            <option value="ssc">SSC</option>
                            <option value="neet">NEET</option>
                            <option value="upsc">UPSC</option>
                        </select>
                    </div>
                </div>

                <div className="flex justify-center items-center gap-2 my-2 mt-5">
                    <button
                        id="google-sign-in-btn"
                        className="google-signin flex justify-center items-center gap-2 border border-gray-500  px-3 py-2 rounded-md"
                        onClick={() => {
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
                                        userid: getUniqueId(),
                                        joined_at: new Date().toISOString(),
                                    };
                                    checkIsUserExist(user.email);
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
                        }}
                    >
                        <i className="bi bi-google"></i>
                        <span className="text-sm text-gray-700">Sign in with Google</span>
                    </button>
                </div>

                <div className="block w-full h-auto my-2 mt-5">
                    <div className="flex flex-col justify-center items-center gap-2">
                        <span className={`${previous_login_emails.length ? "block" : "hide"} text-md text-gray-500`}>Login by previous emails:</span>
                        <div className="flex justify-start items-center gap-2">
                            {previous_login_emails.map((email) => {
                                return (
                                    <span className="text-blue-500 border border-blue-500 px-3 py-2 rounded-md cursor-pointer" onClick={() => checkIsUserExist(email)}>
                                        {email}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="app-features w-full flex flex-col justify-start items-start gap-2 mt-5  py-3 px-4  my-5">
                    <h1 className="text-xl font-bold text-gray-500">App Features:</h1>
                    <div className="flex justify-start mcq items-center gap-2">
                        <i class="bi bi-check-circle text-green-500"></i>
                        <span className="text-sm text-gray-500">Practise, Create and Share MCQs</span>
                    </div>
                    <div className="flex justify-start notes items-center gap-2">
                        <i class="bi bi-check-circle text-green-500"></i>
                        <span className="text-sm text-gray-500">Read Crips & Clear Notes</span>
                    </div>
                    <div className="flex justify-start own-notes items-center gap-2">
                        <i class="bi bi-check-circle text-green-500"></i>
                        <span className="text-sm text-gray-500">Add Your Own Notes</span>
                    </div>
                    <div className="flex justify-start mcq items-center gap-2">
                        <i class="bi bi-check-circle text-green-500"></i>
                        <span className="text-sm text-gray-500">Watch Videos and Add Your Own Videos</span>
                    </div>
                    <div className="flex justify-start mcq items-center gap-2">
                        <i class="bi bi-check-circle text-green-500"></i>
                        <span className="text-sm text-gray-500">Give and Share Custom Mock Tests</span>
                    </div>
                    <div className="flex justify-start mcq items-center gap-2">
                        <i class="bi bi-check-circle text-green-500"></i>
                        <span className="text-sm text-gray-500">And many more things..</span>
                    </div>
                </div>
            </div>
        );
    }

    function getUserLoginDataFromFirebase(email) {
        all_users_info.forEach((user_info) => {
            if (user_info.email == email) {
                return user_info;
            }
        });
        return null;
    }

    function LoadHTML() {
        setTimeout(() => {
            initialLoading();
            openPageBasedOnURL();
        }, 2000);
        if (window.innerWidth < 600) {
            document.body.classList.add("mobile");
            is_mobile = true;
        }

        return (
            <div className="container-inner">
                <div className={`hide  main tabs flex justify-center align-middle gap-5 h-[50px]px-4 py-4 border-b-2`}>
                    <div className="tab home flex justify-center items-center gap-2 text-gray-500 cursor-pointer active transition duration-300 ease-in-out" onClick={() => openTab("home")}>
                        <i className="fa-regular fa-house"></i>
                        <span className="">Home</span>
                    </div>
                    <div className="tab mcq flex justify-center items-center gap-2 text-gray-500 cursor-pointer transition duration-300 ease-in-out" onClick={() => openTab("mcq")}>
                        <i class="fa-regular fa-list"></i>
                        <span className="">MCQ</span>
                    </div>
                    <div className="tab notes flex justify-center items-center gap-2 text-gray-500 cursor-pointer transition duration-300 ease-in-out" onClick={() => openTab("notes")}>
                        <i class="fa-regular fa-book"></i>
                        <span className="">Notes</span>
                    </div>
                    <div className="tab mock flex justify-center items-center gap-2 text-gray-500 cursor-pointer transition duration-300 ease-in-out" onClick={() => openTab("mock")}>
                        <i class="fa-regular fa-list-check"></i>
                        <span className="">Mock</span>
                    </div>
                </div>

                <div className={` main tabs top flex justify-start align-center gap-2 h-[50px] w-full px-4 py-2 border-b-2 fixed top-0 left-0 right-0 bg-white text-gray-700`}>
                    <div className="tab  app-name flex justify-start items-center gap-3 cursor-pointer" onClick={() => openTab("home")}>
                        <span className="text-xl font-bold">ELAHI</span>
                    </div>
                    <div className="icons flex justify-end items-center gap-2"></div>
                </div>

                <div className={` main tabs bottom flex justify-center align-middle gap-5 h-[60px] w-full px-4 py-1 border-t-2 fixed top-[92%] left-0 right-0 bg-white text-gray-700`}>
                    <div className="tab home flex flex-col justify-center items-center   cursor-pointer  transition duration-300 ease-in-out mb-2 py-1 px-2 rounded-md" onClick={(event) => openTab(event, "home")}>
                        <i class="bi bi-house-door"></i>
                        <span className="">Home</span>
                    </div>
                    <div className="tab mcq flex flex-col justify-center items-center   cursor-pointer  transition duration-300 ease-in-out mb-2 py-1 px-2 rounded-md" onClick={(event) => openTab(event, "mcq")}>
                        <i class="bi bi-list-ol"></i>
                        <span className="">MCQ</span>
                    </div>
                    <div className="tab notes flex flex-col justify-center items-center   cursor-pointer  transition duration-300 ease-in-out mb-2 py-1 px-2 rounded-md" onClick={(event) => openTab(event, "notes")}>
                        <i class="bi bi-card-text"></i>
                        <span className="">Notes</span>
                    </div>
                    <div className="tab mock flex flex-col justify-center items-center   cursor-pointer  transition duration-300 ease-in-out mb-2 py-1 px-2 rounded-md" onClick={(event) => openTab(event, "mock")}>
                        <i class="bi bi-card-checklist"></i>
                        <span className="">Mock</span>
                    </div>

                    <div className="tab user flex flex-col justify-center items-center   cursor-pointer  transition duration-300 ease-in-out mb-2 py-1 px-2 rounded-md" onClick={(event) => openTab(event, "user")}>
                        <i class="bi bi-person"></i>
                        <span className="">User</span>
                    </div>
                </div>

                <div className=" main tab-containers flex justify-center items-center gap-4 h-full pt-[50px] pb-[70px]">
                    <div className="tab-container page home flex justify-center items-start gap-2 h-[calc(100vh-107px)] fixed overflow-y-scroll top-[50px] hide "></div>

                    <div className="tab-container page mcq flex justify-center items-start gap-2 h-[calc(100vh-107px)] fixed overflow-y-scroll top-[50px] pb-[50px] hide ">
                        <h1>MCQ</h1>
                    </div>
                    <div className="tab-container page notes  flex justify-center items-start gap-2 h-[calc(100vh-107px)] fixed overflow-y-scroll top-[50px]  hide">
                        <h1>Notes</h1>
                    </div>
                    <div className="tab-container page mock max-h-[calc(100vh - 120px)] overflow-y-scroll hide">
                        <h1>Mock</h1>
                    </div>
                    <div className="tab-container page vocab max-h-[calc(100vh - 120px)] overflow-y-scroll hide">
                        <h1>Vocab</h1>
                    </div>
                    <div className="tab-container page user max-h-[calc(100vh - 120px)] overflow-y-scroll hide">
                        <h1>User</h1>
                    </div>
                </div>
            </div>
        );
    }

    function animateLoader() {
        const loader = document.getElementById("elahi-loader");
        const letters = loader.querySelectorAll("span");

        letters.forEach((letter, index) => {
            setTimeout(() => {
                letter.classList.add("animate-spin");
                setTimeout(() => {
                    letter.classList.remove("animate-spin");
                    letter.classList.add("animate-fadeOut");
                }, 1000);
            }, index * 200);
        });

        setTimeout(() => {
            return;
            loader.classList.add("animate-fadeOut");
            setTimeout(() => {
                loader.style.display = "none";
            }, 1000);
        }, 3000); // Increased from 2500 to 3000 to give more time for the animation
    }

    function loadHTML(arg) {
        let container = document.querySelector(".app-container");
        if (arg == "loading") {
            ReactDOM.render(<LoadingAnimation />, container);
        }
        if (arg == "signin") {
            ReactDOM.render(<LoadSignInPageHTML />, container);
        }
        if (arg == "home") {
            ReactDOM.render(<LoadHTML />, container);
        }
        //ReactDOM.render(<LoadHTML />, container);
    }

    function initialLoading() {
        let div = document.createElement("div");
        div.className = "me-overlays";
        document.body.appendChild(div);

        is_mobile = window.innerWidth < 768 ? true : false;
        if (is_mobile) {
            document.body.classList.add("mobile");
        }
        //if (!userdata) getUserData();
        //loadHomePage();
        //document.querySelector(".app-loading").classList.add("hide");
        //loadHomePage();
        //openTab("home");

        loadMcqPage();
        loadMcqTags();
        loadDailyPractiseQuestions();
        curr_que_index = 0;
        filtered_ques = sortArrayRandomly(que_data);
        //openMcq(filtered_ques[curr_que_index]);

        loadNotesPage();
        loadMockTestPage();
        loadUserPage();
        //loadVocabPage();
    }

    function loadVocabPage() {
        return;
    }

    function openVocabWord(obj) {
        //let vocab_word_div = document.querySelector(".vocab-word-div");
        //vocab_word_div.innerHTML = LoadVocabWord(obj);
    }

    function OverlayHTML() {
        return (
            <div className="me-overlay bg-transparent opacity-5">
                <div className=" opacity-100"></div>
            </div>
        );
    }

    function loadUserPage() {
        let container = document.querySelector(".tab-container.page.user");
        ReactDOM.render(<LoadUserPageHTML />, container);
    }
    async function checkIsUserExist(email) {
        //await getAllUsersInfo();
        exam = exam.toLowerCase();
        let data_ref = database.ref(`esa_data/${exam}/users_login_info`);
        let all_users_info = await getDataFromFirebaseUsingRef(data_ref);

        all_users_info = all_users_info ? all_users_info : [];

        let user_info = null;
        for (const userId in all_users_info) {
            if (all_users_info[userId].email === email) {
                user_info = all_users_info[userId];
                break;
            }
        }

        if (user_info) {
            user_login_data = user_info;
            popupAlert("User already exists");
        } else {
            await database.ref(`esa_data/${exam}/users_login_info/${user_login_data.userid}`).set(user_login_data);
            console.log(`esa: New user created: ${user_login_data.userid}`);
        }
        localStorage.setItem(`esa_user_login_data`, JSON.stringify(user_login_data));

        let previous_login_emails = localStorage.getItem(`previous_login_emails`);
        if (previous_login_emails) previous_login_emails = JSON.parse(previous_login_emails);
        if (!previous_login_emails) previous_login_emails = [];
        if (!previous_login_emails.includes(email)) previous_login_emails.push(email);
        localStorage.setItem(`previous_login_emails`, JSON.stringify(previous_login_emails));

        postSignIn();
    }

    function saveESALocalData() {
        console.log("Saving data with exam:", exam); // Debugging line
        localStorage.setItem(`esa_local_data_${exam}`, JSON.stringify(esa_local_data));
        console.log("esa: esa_local_data saved");
    }

    function getESALocalData() {
        console.log("Getting data with exam:", exam); // Debugging line
        let data = localStorage.getItem(`esa_local_data_${exam}`);
        esa_local_data = data ? JSON.parse(data) : {};
        console.log("esa: esa_local_data loaded", esa_local_data);
    }

    function LoadUserPageHTML() {
        setTimeout(() => {
            loadUserMCQs();
        }, 1000);
        return (
            <div className="user-page">
                <div className="user-page-container-inner flex flex-col justify-start items-start max-h-[100vh] w-full">
                    <div className="hide search-div flex justify-center items-center gap-2 w-full p-2 m-2 text-gray-500 border-2 rounded-full">
                        <i className="bi bi-person"></i>
                        <input type="text" className="search-input" placeholder="Search users" />
                    </div>
                </div>
                <div className="user-info-div name-dp flex justify-start items-start gap-2 w-full p-2 m-2 text-sm ">{LoadLoginUserProfileHeader()}</div>

                <div className="hide flex justify-center items-center w-full text-sm text-gray-500 gap-2 py-2">
                    <span className="text-blue-500  flex-1 text-center  cursor-pointer  ">Edit Profile</span>
                    <span className="text-blue-500 flex-1   text-sm  text-center cursor-pointer">100 Followers</span>
                    <span className="text-blue-500 flex-1   text-sm  text-center cursor-pointer"> 200 Followers</span>
                </div>
                <div className="user-mcqs-div flex flex-col justify-start items-start gap-2 w-full  text-sm border-t">
                    <div className="flex justify-start items-center gap-2 w-full p-2">
                        <h1 className="text-gray-500 text-[1.2em] p-2 w-[fit-content]">Your Created MCQs</h1>
                        <div className="ml-auto mr-[10px] flex-1  flex justify-end items-center gap-2 w-full">
                            <i className="bi bi-plus-circle text-xl text-gray-500 cursor-pointer ml-auto" onClick={() => createMCQs()}></i>
                            <i className="bi bi-arrow-clockwise refresh-btn text-xl text-gray-500 cursor-pointer" onClick={() => loadUserMCQs()}></i>
                            <i
                                className="bi bi-shuffle text-xl text-gray-500 cursor-pointer"
                                onClick={() => {
                                    user_mcqs = sortArrayRandomly(user_mcqs);
                                    loadUserMCQs();
                                }}
                            ></i>
                        </div>
                    </div>
                    <div className="user-mcqs-list w-full"></div>
                </div>
            </div>
        );
    }

    function LoadLoginUserProfileHeader() {
        let div = document.querySelector(".user-info-div.name-dp");

        // Get latest Followers data of the login user
        followers_data = null;
        getFollowersData(user_login_data.userid);

        let interval = setInterval(() => {
            if (div && followers_data) {
                // Update followers and followings of the login user
                userdata.followers = followers_data.followers ? followers_data.followers : [];
                userdata.followings = followers_data.followings ? followers_data.followings : [];

                clearInterval(interval);
                ReactDOM.unmountComponentAtNode(div);
                ReactDOM.render(
                    <div className="block w-full">
                        <div className="flex justify-start items-start gap-2">
                            <img src={user_login_data.photo_url} alt="user" className="w-10 h-10 rounded-full" />
                            <div className="flex flex-col justify-start items-start">
                                <span className="text-gray-500">{user_login_data.display_name}</span>
                                <span className="text-gray-500">@{user_login_data.username}</span>
                            </div>
                            <span
                                className="sign-out-btn cursor-pointer link ml-auto mr-[10px]"
                                onClick={() => {
                                    onSignOut();
                                }}
                            >
                                Sign Out
                            </span>
                        </div>

                        <div className=" flex justify-center items-center w-full text-sm text-gray-500 gap-2 py-2">
                            <span className="text-blue-500  flex-1 text-center  cursor-pointer  ">Edit Profile</span>
                            <span className="text-blue-500 flex-1   text-sm  text-center cursor-pointer" onClick={() => loadLoginUserFollowers()}>
                                {" "}
                                {userdata.followers.length} Followers
                            </span>
                            <span className="text-blue-500 flex-1   text-sm  text-center cursor-pointer" onClick={() => loadLoginUserFollowings()}>
                                {" "}
                                {userdata.followings.length} Followings
                            </span>
                        </div>
                    </div>,
                    div
                );
            }
        }, 100);
    }
    function loadLoginUserFollowers() {
        popupAlert("Followers");
    }
    function loadLoginUserFollowings() {
        popupAlert("Followings");
    }

    function loadUserMCQs(userid) {
        // to get shared mcqs of the login_user or shared_
        userid = userid ? userid : user_login_data.userid;
        shared_mcqs = shared_mcqs ? shared_mcqs : [];
        user_mcqs = shared_mcqs.filter((que) => que.userid == userid);

        let container = document.querySelector(".page.user .user-mcqs-list");
        if (user_login_data.userid !== userid) container = document.querySelector(".me-overlay .shared-user-mcqs-list");

        ReactDOM.unmountComponentAtNode(container);
        ReactDOM.render(<LoadUserMCQsHTML userid={userid} />, container);
    }
    function LoadUserMCQsHTML({ userid }) {
        return (
            <div className="user-mcqs-list-inner block h-[calc(100vh-170px)] overflow-y-scroll w-full">
                {user_mcqs.length > 0 ? (
                    user_mcqs.map((que, index) => {
                        return (
                            <div className={`question-div block h-auto w-full `} key={index}>
                                {GetMCQHTML({ que: que, type: "user-mcq", index: index + 1, is_show_icons: true, is_show_tags: true })}
                            </div>
                        );
                    })
                ) : (
                    <span className="text-gray-500 text-center w-full">No User MCQs</span>
                )}
            </div>
        );
    }

    let timeline_data = [
        {
            date: "2024",
            events: [
                {
                    order: 0,
                    event: "This is a new world oi asd a sd asdasda adsdasda sdasdasdasd asd",
                },
                {
                    order: 1,
                    event: "This is a new ",
                },
                {
                    order: 2,
                    event: "This is a new world oi asd a sd asdasda adsdasda sdasdasdasd asd",
                },
            ],
        },
        {
            date: "2023",
            events: [
                {
                    order: 0,
                    event: "This is a new world oi asd a sd asdasda adsdasda sdasdasdasd asd",
                },
                {
                    order: 1,
                    event: "This is a new ",
                },
                {
                    order: 2,
                    event: "This is a new world oi asd a sd asdasda adsdasda sdasdasdasd asd",
                },
            ],
        },
    ];
    function LoadHomePageHTML() {
        return (
            <div>
                <div className="page-container flex flex-col justify-center items-center w-full h-full">
                    <div className="flex flex-col justify-center items-center gap-2 w-full px-1">
                        <h1 className="text-[2.5em] font-bold text-gray-800">ELAHI</h1>
                        <span className="text-[1.4em] text-gray-500">A Social Study App</span>
                        <span className="text-md text-gray-500">Learn, Share, and Succeed Together</span>
                        <span className="text-gray-500 text-center ">First ever digital educational product from Ladakh</span>
                    </div>

                    <div className="me-footer flex flex-col justify-center items-center gap-2 w-full py-2 mt-4">
                        <span className=" text-sm text-gray-500 ">Build with ❤️ by Mehboob Elahi</span>
                        <div className=" hide social-media flex justify-center items-center gap-4 opacity-70">
                            <a href="https://facebook.com/mehboobelahi05" target="_blank">
                                <i className="bi bi-facebook px-2 py-1 bg-gray-200 rounded-md"></i>
                            </a>
                            <a href="https://instagram.com/mehboobelahi05" target="_blank">
                                <i className="bi bi-instagram px-2 py-1 bg-gray-200 rounded-md"></i>
                            </a>
                            <a href="https://youtube.com/@mehboobelahi05/featured" target="_blank">
                                <i className="bi bi-youtube px-2 py-1 bg-gray-200 rounded-md"></i>
                            </a>
                            <a href="https://twitter.com/mehboobelahi05" target="_blank">
                                <i className="bi bi-twitter px-2 py-1 bg-gray-200 rounded-md"></i>
                            </a>
                        </div>
                    </div>

                    <div className="telegram-link  flex flex-col justify-center items-center gap-2  py-3 px-4  my-3">
                        <span className="text-sm text-gray-500">If you have any question or suggestion, you can ask in the telegram channel</span>
                        <a href="https://t.me/+xq5ZadcYXyRmY2Y1" target="_blank" className="flex justify-center items-center gap-2 bg-219CD7 rounded-full px-4 py-2">
                            <i class="bi bi-telegram text-xl"></i>
                            <span className="text-sm">Join Telegram Channel</span>
                        </a>
                    </div>

                    <div className="flex flex-col justify-center items-center gap-2  py-3 px-4  my-3">
                        <span className="text-xl text-gray-500"> 👇👇 Must Read 👇👇</span>
                        <span className="text-sm text-gray-500">If you are running the elahi app on the mobile web browser, then I suggest you to install the android app for better experince.</span>
                        <a
                            href="https://www.dropbox.com/scl/fi/3z7xmgawalrw6jftfw4zn/Elahi-2.apk?rlkey=cp3gubu852qbf87f4hd6pqkai&dl=1
"
                            target="_blank"
                            className="flex justify-center items-center gap-2 border border-blue-500  rounded-full px-4 py-2"
                        >
                            <i class="bi bi-google-play text-xl"></i>
                            <span className="text-sm">Download Android App</span>
                        </a>
                        <div className="flex flex-col justify-center items-start gap-2 px-3 mt-2">
                            <div className="flex justify-start items-center gap-2">
                                <i class="bi bi-exclamation-triangle-fill text-yellow-500 text-xl w-[20px]"></i>
                                <span className="text-sm text-gray-500">Note:</span>
                            </div>
                            <span className="text-[0.8em] text-gray-500  flex-1">This is an ".apk" file so when you install the app in your android phone, you need to allow installation from unknown sources. You may see a waring or "saying gangerious", no need to worry, and continue installation. </span>
                        </div>
                    </div>

                    <div className="app-link flex flex-col justify-center items-center gap-2  py-3 px-4  my-3">
                        <span className="text-sm text-gray-500">If you find this app useful, then do help me by sharing the app link with your friends</span>

                        <div
                            className="text-sm text-blue-500 mt-4 cursor-pointer link flex justify-center items-center gap-2 border border-blue-500 rounded-full px-4 py-2"
                            onClick={() => {
                                let url = `https://www.dropbox.com/scl/fi/3z7xmgawalrw6jftfw4zn/Elahi-2.apk?rlkey=cp3gubu852qbf87f4hd6pqkai&dl=1`;
                                copyToClipboard(url);
                                popupAlert("copied the app link");
                            }}
                        >
                            <i className="bi bi-share text-xl"></i>
                            <span className="text-sm link ">Share the app link</span>
                        </div>
                        <div
                            className=" hide flex justify-center items-center gap-2 px-4 py-2 cursor-pointer link bg-white border border-blue-500 rounded-full"
                            onClick={() => {
                                let url = window.location.href;
                                copyToClipboard(url);
                                popupAlert("copied the app link");
                                if (navigator.share) {
                                    navigator
                                        .share({
                                            title: "Elahi Study App",
                                            text: "Check out this app",
                                            url: url,
                                        })
                                        .then(() => {
                                            popupAlert("shared the app link");
                                        })
                                        .catch((error) => {
                                            popupAlert("error while sharing the app link: " + error);
                                        });
                                } else {
                                    popupAlert("sharing is not supported in your browser");
                                }
                            }}
                        >
                            <i className="bi bi-share text-xl"></i>
                            <span className="text-sm link ">Share App Link</span>
                        </div>
                    </div>

                    <div
                        className={`hide flex justify-center items-center gap-2 py-4 cursor-pointer ${is_mobile ? "" : "hide"} `}
                        onClick={() => {
                            popupAlert("Will be added soon ... ");
                        }}
                    >
                        <i className="fa-regular fa-download link"></i>
                        <span className="text-sm link">Download android app</span>
                    </div>

                    <div className="app-features w-full flex flex-col justify-start items-start gap-2  py-3 px-4  my-5">
                        <h1 className="text-xl font-bold text-gray-500">App Features:</h1>
                        <div className="flex justify-start mcq items-center gap-2">
                            <i class="bi bi-check-circle text-green-500"></i>
                            <span className="text-sm text-gray-500">Practise, Create and Share MCQs</span>
                        </div>
                        <div className="flex justify-start notes items-center gap-2">
                            <i class="bi bi-check-circle text-green-500"></i>
                            <span className="text-sm text-gray-500">Read Crips & Clear Notes</span>
                        </div>
                        <div className="flex justify-start own-notes items-center gap-2">
                            <i class="bi bi-check-circle text-green-500"></i>
                            <span className="text-sm text-gray-500">Add Your Own Notes</span>
                        </div>
                        <div className="flex justify-start mcq items-center gap-2">
                            <i class="bi bi-check-circle text-green-500"></i>
                            <span className="text-sm text-gray-500">Watch Videos and Add Your Own Videos</span>
                        </div>
                        <div className="flex justify-start mcq items-center gap-2">
                            <i class="bi bi-check-circle text-green-500"></i>
                            <span className="text-sm text-gray-500">Give and Share Custom Mock Tests</span>
                        </div>
                        <div className="flex justify-start mcq items-center gap-2">
                            <i class="bi bi-check-circle text-green-500"></i>
                            <span className="text-sm text-gray-500">And many more things..</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    let all_tags = [];
    function loadAllTags() {
        console.log("loadAllTags called");
        //let all_ques = que_data.concat(shared_ques);
        que_data.forEach((obj) => {
            obj.tags.forEach((tag) => {
                if (!all_tags.includes(tag)) all_tags.push(tag);
            });
        });
    }
    function shareLink(type) {
        alert("App link in not yet prepared");
    }

    function downloadApp() {
        alert("App is not available yet");
    }

    function loadHomePage() {
        let div = document.querySelector(".page.home");
        ReactDOM.render(<LoadHomePageHTML />, div);
    }
    function loadMcqPage() {
        let div = document.querySelector(".page.mcq");
        ReactDOM.render(<LoadMcqPageHTML />, div);
    }
    function LoadMcqPageHTML() {
        let interval = setInterval(() => {
            let div = document.querySelector(".page.mcq .que-text");
            if (div) {
                clearInterval(interval);
                loadMCQList();
            }
        }, 200);

        return (
            <div className={`mcq-page-inner flex flex-col gap-2  w-full overflow-y-scroll`}>
                <span className="hide text-transparent text-center bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-xl p-2 font-bold">Practice Random MCQs</span>
                <div className="hide today-practised-questions flex flex-col gap-2 justify-center items-center border-b "></div>

                <div class="hide block max-w-full overflow-x-auto py-2">
                    <div class="flex space-x-4 text-blue-500 text-sm">
                        <div class="inline-flex items-center whitespace-nowrap border border-blue-500 rounded-md p-2 min-w-[160px] cursor-pointer" onClick={() => searchMcqs()}>
                            <i class="bi bi-search"></i>
                            <span class="ml-2">Search MCQs by text</span>
                        </div>
                        <div class="inline-flex items-center whitespace-nowrap border border-blue-500 rounded-md p-2 min-w-[160px] cursor-pointer" onClick={() => openOverlay("filter-mcq-overlay")}>
                            <i class="bi bi-funnel"></i>
                            <span class="ml-2">Filter MCQs by tags</span>
                        </div>
                        <div class="inline-flex items-center whitespace-nowrap border border-blue-500 rounded-md p-2 min-w-[140px] cursor-pointer" onClick={() => createMCQs()}>
                            <i class="bi bi-plus-circle"></i>
                            <span class="ml-2">Add new MCQs</span>
                        </div>
                        <div
                            class="inline-flex items-center whitespace-nowrap border border-blue-500 rounded-md p-2 min-w-[150px] cursor-pointer"
                            onClick={(event) => {
                                let overlay_name = "bookmarked-questions-overlay";
                                let overlay_div = document.querySelector(`.${overlay_name}`);
                                overlay_div = document.createElement("div");
                                overlay_div.className = `me-overlay ${overlay_name}`;
                                document.querySelector(".me-overlays").appendChild(overlay_div);
                                ReactDOM.render(<BookmarkedQuestionsOverlayHTML />, overlay_div);
                            }}
                        >
                            <i class="bi bi-bookmark-star"></i>
                            <span class="ml-2">Bookmarked MCQs</span>
                        </div>
                    </div>
                </div>

                <div class="hide block subject-div max-w-full overflow-x-auto py-2">
                    <div class="flex space-x-4 ">
                        {subjects[exam].map((subject, index) => (
                            <span
                                key={index} // Add a key for each child in the list
                                className=" subject inline-flex items-center whitespace-nowrap border text-gray-500 h-[22px] rounded-md px-2 py-1 min-w-[fit-content] cursor-pointer"
                                onClick={(event) => filterMcqsBySubject(subject, event)}
                            >
                                {capitalFirstLetterOfEachWord(subject)}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="hide subject-div flex justify-center items-center gap-2 w-full overflow-x-scroll">
                    <span className="text-sm hide ">Filter MCQs by subject</span>
                    <div className="  flex justify-center items-center gap-2 w-full py-2 px-1  overflow-x-scroll whitespace-nowrap">
                        {subjects[exam].map((subject, index) => (
                            <span
                                key={index} // Add a key for each child in the list
                                className=" mx-1 border rounded-md bg-gray-50  text-gray-500 px-2 py-1 text-sm cursor-pointer subject"
                                onClick={(event) => filterMcqsBySubject(subject, event)}
                            >
                                {capitalFirstLetterOfEachWord(subject)}
                            </span>
                        ))}
                    </div>
                </div>
                <div className=" hide filter-message-div flex flex-col justify-start items-start flex-wrap gap-2 py-2 px-3 bg-blue-100   rounded-md">
                    <div className="flex justify-start items-center gap-2">
                        <span className="text-sm flex  flex-wrap flex-1 filter-mcq-message text-gray-700 "></span>
                        <i className="bi bi-x-circle clear-filter ml-auto cursor-pointer text-red-600 mt-1 hide" onClick={() => clearFilter()}></i>
                    </div>
                    <span className="text-sm text-gray-700 cursor-pointer" onClick={() => downloadMcqsAsPdf()}>
                        Download filtered mcqs as pdf
                    </span>
                </div>
                <div className="que-text border-t-2"></div>
                <div className="show-more-mcqs link px-auto py-2 link px-auto text-center cursor-pointer" onClick={() => showMoreMcqs()}>
                    show more
                </div>
                <div className="hide bottom flex justify-center items-center ">
                    <button className="bg-gray-200 w-[300px] text-gray-700 px-4 py-2  rounded-md" onClick={() => nextQuestion()}>
                        Next Question
                    </button>
                </div>
            </div>
        );
    }

    function showMoreMcqs() {
        for (let i = mcq_list_index; i < 30; i++) {
            if (filtered_ques.length <= mcq_list_index) {
                document.querySelector(".show-more-mcqs").classList.add("hide");
                return;
            }
            ++mcq_list_index;
            let que = filtered_ques[mcq_list_index];
            let div = document.querySelector(".mcq-list-inner");
            div.appendChild(document.createElement("div"));
            ReactDOM.render(<GetMCQHTML que={que} index={mcq_list_index} type="random" is_show_icons={true} is_show_tags={true} />, div.lastChild);
        }
    }
    function loadMCQList() {
        let div = document.querySelector(".page.mcq .que-text");
        ReactDOM.unmountComponentAtNode(div); // ele.innerHTML = "";
        mcq_list_index = 0;
        //div.innerHTML = "";
        ReactDOM.render(<LoadMCQListHTML />, div);
    }

    let mcq_list_index = 0;
    function LoadMCQListHTML() {
        try {
            let fil_ques = filtered_ques.length > 30 ? filtered_ques.slice(0, 30) : filtered_ques;
            setTimeout(() => {
                if (fil_ques.length == filtered_ques.length) {
                    document.querySelector(".show-more-mcqs").classList.add("hide");
                }
            }, 1000);
            return (
                <div className="mcq-list-inner block">
                    {fil_ques.map((que, index) => (
                        <div key={index} className="question-div">
                            <GetMCQHTML que={que} index={index} type="random" is_show_icons={true} is_show_tags={true} />
                        </div>
                    ))}
                </div>
            );
        } catch (error) {
            console.error(error);
            return <div></div>;
        }
    }

    const { jsPDF } = window.jspdf;

    function GetMCQHTML({ que, index, type, is_show_icons, is_show_tags, selected_option_id, search_text }) {
        try {
            //r
            if (!que || !que.question) {
                //popupAlert("MCQ not found", 3, "red");
                return;
            }
            que = que.id ? que : getQuestionById(que);
            if (!que) {
                //popupAlert("MCQ not found", 3, "red");
                return;
            }

            let user_info = null;
            que.comments_count = que.comments_count ? que.comments_count : 0;

            if (que.userid)
                if (!que) {
                    popupAlert("MCQ not found", 3, "red");
                    return;
                }
            userdata.bookmarked_questions = userdata.bookmarked_questions ? userdata.bookmarked_questions : [];

            let is_bookmarked = userdata.bookmarked_questions.includes(que.id);
            document.querySelector(".show-more-mcqs").classList.remove("hide");

            // When mcq is a shared mcq

            let is_followed;
            if (que.userid) {
                //get user info

                user_info = all_users_login_info.find((user_info) => user_info.userid === que.userid); //getUserInfoById(que.userid); //all_users_info.find((user_info) => user_info.userid === que.userid);

                //check if user is followed
                userdata.followings = userdata.followings ? userdata.followings : [];
                is_followed = userdata.followings.find((id) => id == user_info.userid);
            }

            return (
                <div className="mcq-div block" key={index}>
                    <div className="mcq-item  que-div border-b-2 border-gray-300 py-2 px-3" id={que.id}>
                        <div className="question py-2 text-md flex justify-start items-baseline gap-2">
                            <span className="text-md font-bold que-num w-[30px] hide"> {index ? `Q${index}.` : "Q."} </span>
                            <div className="text-[1.2em] font-bold flex-1 flex flex-wrap" dangerouslySetInnerHTML={{ __html: getHTMLFormattedText(que.question) }}></div>
                        </div>
                        <div className="options flex flex-col gap-2">
                            {que.options.map((option, index) => (
                                <div
                                    id={`${option.id}`}
                                    className={`flex justify-start  items-start gap-2  cursor-pointer option border bg-gray-100 rounded-md p-2  
                        ${option.text.indexOf("#ans") !== -1 ? "answer" : ""}  
                        ${selected_option_id == option.id ? "selected" : ""} 
                        ${selected_option_id == option.id && option.text.indexOf("#ans") !== -1 ? "correct" : ""}    
                        ${selected_option_id == option.id && option.text.indexOf("#ans") === -1 ? "wrong " : ""} 
                        ${que.correct_option_index == index ? "answer " : ""}
                        ${selected_option_id != undefined && selected_option_id != option.id && option.text.indexOf("#ans") !== -1 ? "correct " : ""}  
                        ${selected_option_id ? "disabled" : ""} `}
                                    key={index}
                                    onClick={(event) => {
                                        if (option.text.indexOf("#ans") !== -1 || que.correct_option_index === index) {
                                            // Pass click coordinates to blastCrackers
                                            const { clientX: x, clientY: y } = event;
                                            setTimeout(() => {
                                                blastCrackers(x, y);
                                            }, 500);
                                        }
                                        checkAnswer(event, que, type);
                                    }}
                                >
                                    <span className="text-sm option-index text-gray-400 ">{index + 1}.</span>
                                    <span className="text-sm option-text" dangerouslySetInnerHTML={{ __html: getHTMLFormattedText(option.text.replace("#ans", "")) }}></span>
                                    <span className="text-sm percentage-attempted ml-auto"></span>
                                </div>
                            ))}
                        </div>
                        <div class={`block ${is_show_tags ? "" : "hide"} tags items-center whitespace-nowrap py-2 w-full border-t-2 mt-4`}>
                            {que.tags.map((tag, index) => {
                                if (["mock", "practice", "random", "random-mcq"].includes(tag)) return;
                                return (
                                    <span key={index} className="mx-1 text-[0.9em]  border border-blue-500 rounded-md  text-blue-500 px-2 py-1 text-sm cursor-pointer" onClick={(event) => filterMcqsByTag(tag, event)}>
                                        {tag}
                                    </span>
                                );
                            })}
                        </div>
                        <div className={` hide tags flex justify-start items-start gap-3 py-3 border-t-2 mt-2  link ${is_show_tags ? "" : "hide"} `}>
                            <div class="block max-w-full overflow-x-auto py-2">
                                <div class="flex space-x-4 text-blue-500 text-sm"></div>
                            </div>
                        </div>

                        <div className={` icons flex justify-center items-center gap-4 py-2 border-t-0 mt-1  link ${is_show_icons ? "" : "hide"} `}>
                            <i class="bi bi-heart hide text-[1.2em] cursor-pointer"></i>
                            <i className={`bi ${userdata.bookmarked_questions.includes(que.id) ? "bi-bookmark-fill bookmarked" : "bi-bookmark"}  text-[1.2em] cursor-pointer`} onClick={(event) => bookmarkMcq(que, event)}></i>
                            <i className="bi bi-share text-[1.2em] cursor-pointer" onClick={(event) => shareMCQ(que, event)}></i>
                            <i className="bi bi-flag text-[1.2em] cursor-pointer" onClick={(event) => openReportMCQSection(que.id, event)}></i>
                            {type != "full-screen" && (
                                <i className="hide bi bi-chat-text comment-icon  text-[1.2em] cursor-pointer" onClick={(event) => openMCQInFullScreen(que)}>
                                    <span className="comment-count pl-[3px]"></span>
                                </i>
                            )}
                            <i className="hide bi bi-file-text text-[1.2em] cursor-pointer" onClick={(event) => showMCQExplanation(que, event)}></i>
                            <i className="hide bi bi-bullseye text-[1.2em] linked-block-icon cursor-pointer" onClick={(event) => openNotesPage(que.linked_blocks[0].page_id, que.linked_blocks[0].block_id, null)}></i>
                            {que.linked_videos && que.linked_videos.length > 0 && <i className="hide bi bi-youtube video-icon cursor-pointer  text-xl text-red-500" onClick={(event) => openMCQYoutubeVideo(que.linked_videos[0].video_id, que.linked_videos[0].time_in_sec, event)}></i>}
                            {que.external_link != "" && (
                                <i
                                    className="hide bi bi-box-arrow-up-right external-link-icon text-[1.2em] text-blue-500 cursor-pointer"
                                    onClick={(event) => {
                                        let a = document.createElement("a");
                                        a.href = que.external_link;
                                        a.target = "_blank";
                                        a.click();
                                    }}
                                ></i>
                            )}
                            {que.exams && que.exams.length > 0 && (
                                <span
                                    className="text-sm text-blue-500 cursor-pointer"
                                    onClick={(event) => {
                                        let div = event.target.closest(".mcq-item").querySelector(".pyqs-div");
                                        if (div) {
                                            div.remove();
                                            return;
                                        }
                                        div = document.createElement("div");
                                        div.className = "pyqs-div";
                                        event.target.closest(".mcq-item").appendChild(div);

                                        ReactDOM.render(<LoadPyqOverlayHtml exams={que.exams} />, div);
                                    }}
                                >
                                    PYQ
                                </span>
                            )}
                            <span className="ml-auto hide-span"></span>
                            <i class="hide hide-ele bi bi-fullscreen ml-auto font-bold text-[1.2em] cursor-pointer" onClick={(event) => openMCQInFullScreen(que)}></i>
                            {que.userid && que.userid == user_login_data.userid && <i className="bi bi-trash text-[1.2em] text-red-400 cursor-pointer" onClick={(event) => deleteUserMCQ(que, event)}></i>}
                        </div>

                        {user_info && <div className={`block shared-user-info  w-100`}>{UserInfoInMCQ({ user_info })}</div>}
                        {type == "full-screen" && <div className="mcq-comments-section w-full h-full block mt-2 pt-6 border-t-2">{getMCQCommentSection(que)}</div>}
                    </div>
                </div>
            );
        } catch (error) {
            console.error(que ? que.id : "no que", error);
            return <div></div>;
        }
    }

    function openReportMCQSection(id, event) {
        let div = document.createElement("div");
        div.className = "report-mcq-section block";
        event.target.closest(".mcq-item").appendChild(div);
        ReactDOM.render(<ReportMCQSection id={id} />, div);
    }
    function ReportMCQSection({ id }) {
        return (
            <div className="report-mcq-section-inner block border-t-2 mt-2">
                <div className="flex flex-col justify-start items-start gap-2">
                    <span className="text-sm text-gray-500 py-2">Report MCQ:</span>
                    <textarea className="w-[90%] h-[80px] border-2 px-3 py-2  rounded-md" placeholder="Please describe the issue with this MCQ"></textarea>
                    <div className="flex justify-end items-start gap-2 pr-7 w-full">
                        <button className=" px-2 py-1 text-blue-500 cursor-pointer" onClick={(event) => event.target.closest(".report-mcq-section").remove()}>
                            Cancel
                        </button>
                        <button className="border border-blue-500 rounded-md px-2 py-1 text-blue-500 cursor-pointer" onClick={(event) => submitMCQReport(id, event)}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        );
    }
    async function submitMCQReport(id, event) {
        let message = event.target.closest(".report-mcq-section").querySelector("textarea").value;
        if (message == "") {
            popupAlert("Please describe the issue with this MCQ");
            return;
        }
        let obj = {
            userid: user_login_data.userid,
            create_date: getTodayDate(),
            que_id: id,
            message: message,
        };
        let ref = database.ref(`esa_data/${exam}/reported_mcqs`);
        let data = await getDataFromFirebaseUsingRef(ref);
        data = data ? data : [];
        data.push(obj);
        await ref.set(data);
        event.target.closest(".report-mcq-section").remove();
        popupAlert("Your report has been submited; Thanks for reporting :-)");
    }

    function GetMCQCommentCount(que_id) {
        let span = document.createElement("span");
        span.className = "comment-count";
        span.innerHTML = 30;
        return <div>JJ</div>;
    }

    function LoadPyqOverlayHtml({ exams }) {
        return (
            <div className="pyqs-div-inner flex flex-col justify-start items-start gap-2">
                <span className="text-sm text-gray-500">The MCQ was asked in:</span>
                {exams.map((exam, index) => (
                    <span key={index} className="text-sm text-blue-500 cursor-pointer" onClick={(event) => {}}>
                        {exam}
                    </span>
                ))}
            </div>
        );
    }
    //UserInfoInMCQ({ user_info }
    async function ABCD(userid, this_div) {
        let user_info = await getUserInfoById(userid);
        ReactDOM.render(<UserInfoInMCQ user_info={user_info} />, this_div);
    }

    function UserInfoInMCQ({ user_info }) {
        //user_info = user_info.id ? user_info : await getUserInfoById(user_info.userid);
        let is_followed = isFollowed(user_info.userid);
        return (
            <div className="flex justify-start items-start gap-2">
                <span>Shared by: </span>
                {user_info.userid === user_login_data.userid && (
                    <span
                        className="text-blue-500 cursor-pointer"
                        onClick={(event) => {
                            openTab("user");
                        }}
                    >
                        You
                    </span>
                )}
                {user_info.userid !== user_login_data.userid && (
                    <span className="text-blue-500 cursor-pointer" onClick={(event) => openSharedUserProfile(user_info.userid)}>
                        {user_info.display_name}
                    </span>
                )}

                {false && user_info.userid !== user_login_data.userid ? (
                    is_followed ? (
                        <span className="text-gray-500">Following</span>
                    ) : (
                        <span className={`follow border border-blue-500 rounded-md px-2 text-[0.9em]  text-blue-500  cursor-pointer`} onClick={(event) => followUser(user_info.userid, event)}>
                            Follow
                        </span>
                    )
                ) : (
                    ""
                )}
            </div>
        );
    }

    function isFollowed(userid) {
        userdata.followings = userdata.followings ? userdata.followings : [];
        return userdata.followings.includes(userid);
    }

    function openMCQYoutubeVideo(video_id, time, event) {
        let is_video_already_open = event.target.closest(".mcq-item").querySelector(".mcq-video-div");
        if (is_video_already_open) {
            is_video_already_open.remove();
            return;
        }
        let div = document.createElement("div");
        div.className = "mcq-video-div border-t mt-1 pt-1 ";
        event.target.closest(".mcq-item").appendChild(div);

        ReactDOM.render(<LoadMCQYoutubeVideoHtml video_id={video_id} time={time} event={event} />, div);
    }

    function LoadMCQYoutubeVideoHtml({ video_id, time, event }) {
        let interval = setInterval(() => {
            let target = event.target.closest(".mcq-div").querySelector(".mcq-video-div-inner");
            if (target) {
                initializeYouTubePlayer(time, video_id, target);
                clearInterval(interval);
            }
        }, 200);

        var url = window.location.href; // Get the current URL
        url = url.substring(0, url.indexOf("//#", 8));

        return (
            <div className="mcq-video-div-inner">
                <div className="flex justify-end items-end gap-2 hide">
                    <i
                        className="bi bi-x-circle close-video text-red-500 cursor-pointer"
                        onClick={(event) => {
                            //me_video_player.pauseVideo();
                            me_video_player = null;
                            event.target.closest(".mcq-video-div").remove();
                        }}
                    ></i>
                </div>
                <div className="me-iframe-div">
                    <iframe id={video_id} class="rm-iframe rm-video-player m-[0px] w-[100%] h-[200px]" frameborder="0" allowfullscreen="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" title="THE LIVING WORLD in 1 Shot: FULL CHAPTER COVERAGE (Theory+PYQs) ||  Prachand NEET 2024" width="640" height="360" src={`https://www.youtube.com/embed/${video_id}?enablejsapi=1&amp;origin=${url}&amp;widgetid=5`}></iframe>
                </div>
            </div>
        );
    }

    async function followUser(user_info, event) {
        let userid = user_info.userid;
        //add userid to followings
        userdata.followings = userdata.followings ? userdata.followings : [];
        if (!userdata.followings.includes(user_info.userid)) {
            userdata.followings.push(user_info.userid);
        }
        saveUserData();

        //add userif to followers of other one
        let data_ref = database.ref(`esa_data/${exam}/users_data/${userid}/followers`);
        let data = await getDataFromFirebaseUsingRef(data_ref);
        data = data ? data : [];
        if (!data.includes(user_login_data.userid)) {
            data.push(user_login_data.userid);
        }
        await data_ref.set(data);

        popupAlert(`You are now following "${user_info.display_name}"`);

        let is_mcq = event.target.closest(".mcq-div");
        if (is_mcq) {
            let div = is_mcq.querySelector(".shared-user-info");
            if (div) {
                ReactDOM.unmountComponentAtNode(div);
                let user_info = await getUserInfoById(userid); //all_users_info.find((user_info) => user_info.userid === userid);
                ReactDOM.render(<UserInfoInMCQ user_info={user_info} />, div);
            }
        }
        let is_user_profile_page = event.target.closest(".shared-user-profile-overlay");
        if (is_user_profile_page) {
            LoadSharedUserProfileFollowerSection({ user_info });
        }
    }

    async function unfollowUser(user_info, event) {
        let userid = user_info.userid;
        //add userid to followings
        let index = userdata.followings.findIndex((id) => id == userid);
        if (index != -1) {
            userdata.followings.splice(index, 1);
        }
        saveUserData();
        console.log(`user removed from userdata.followings[]`);

        //add userif to followers of other one
        let data_ref = database.ref(`esa_data/${exam}/users_data/${userid}/followers`);
        let data = await getDataFromFirebaseUsingRef(data_ref);
        data = data ? data : [];
        index = data.findIndex((id) => id == user_login_data.userid);
        if (index != -1) {
            data.splice(index, 1);
        }
        await data_ref.set(data);
        console.log(`user removed from  others.followers[]`);
        popupAlert(`You have unfollowed "${user_info.display_name}"`);

        let is_mcq = event.target.closest(".mcq-div");
        if (is_mcq) {
            let div = is_mcq.querySelector(".shared-user-info");
            if (div) {
                ReactDOM.unmountComponentAtNode(div);
                let user_info = await getUserInfoById(userid); //all_users_info.find((user_info) => user_info.userid === userid);
                ReactDOM.render(<UserInfoInMCQ user_info={user_info} />, div);
            }
        }
        let is_user_profile_page = event.target.closest(".shared-user-profile-overlay");
        if (is_user_profile_page) {
            LoadSharedUserProfileFollowerSection({ user_info });
        }
    }

    async function openSharedUserProfile(userid) {
        let user_info = await getUserInfoById(userid); //all_users_info.find((user_info) => user_info.userid === userid);

        let div = document.createElement("div");
        div.className = "me-overlay shared-user-profile-overlay bg-white";
        document.querySelector(".me-overlays").appendChild(div);

        ReactDOM.render(<LoadSharedUserProfileHtml user_info={user_info} />, div);
    }
    function LoadSharedUserProfileHtml({ user_info }) {
        setTimeout(() => {
            loadUserMCQs(user_info.userid);
        }, 1000);

        return (
            <div className="user-page shared-user-profile-overlay-inner w-full h-full">
                <div className="user-info-div name-dp flex justify-start items-start gap-2 w-full px-2 py-4 text-sm ">
                    <img src={user_info.photo_url} alt="user" className="w-10 h-10 rounded-full" />
                    <div className="flex flex-col justify-start items-start">
                        <span className="text-gray-500">{user_info.display_name}</span>
                        <span className="text-gray-500">@{user_info.username}</span>
                    </div>
                    <i className="bi bi-x-circle text-xl ml-auto cursor-pointer mr-[10px]" onClick={(event) => event.target.closest(".me-overlay").remove()}></i>
                </div>

                <div className="block followers-followings-div text-sm text-gray-500 gap-2 py-2">{LoadSharedUserProfileFollowerSection({ user_info })}</div>

                <div className="user-mcqs-div flex flex-col justify-start items-start gap-2 w-full  text-sm border-t">
                    <div className="flex justify-start items-center gap-2 w-full p-2">
                        <h1 className="text-gray-500 text-[1.2em] p-2 w-[fit-content]">Shared MCQs</h1>
                        <div className="ml-auto mr-[10px] flex-1  flex justify-end items-center gap-2 w-full">
                            <i
                                className="bi bi-shuffle text-xl text-gray-500 cursor-pointer"
                                onClick={() => {
                                    //user_mcqs = sortArrayRandomly(user_mcqs);
                                    loadUserMCQs(user_info.userid);
                                }}
                            ></i>
                        </div>
                    </div>
                    <div className="shared-user-mcqs-list w-full"></div>
                </div>
            </div>
        );
    }

    async function getFollowersData(userid) {
        let data_ref = database.ref(`esa_data/${exam}/data/users/${userid}/followers`);
        let data = await getDataFromFirebaseUsingRef(data_ref);
        let followers = data ? data : [];

        data_ref = database.ref(`esa_data/${exam}/data/users/${userid}/followings`);
        data = await getDataFromFirebaseUsingRef(data_ref);
        let followings = data ? data : [];

        followers_data = {
            followers: followers,
            followings: followings,
        };
    }
    let followers_data = null;
    function LoadSharedUserProfileFollowerSection({ user_info }) {
        followers_data = null;
        getFollowersData(user_info.userid);
        let interval = setInterval(() => {
            if (followers_data) {
                let is_followed = isFollowed(user_info.userid);
                clearInterval(interval);
                let div = document.querySelector(".shared-user-profile-overlay-inner .followers-followings-div");
                ReactDOM.render(
                    <div className="flex justify-center items-center w-full text-sm text-gray-500 gap-2 py-2">
                        <span className="text-blue-500 flex-1   text-sm  text-center cursor-pointer" onClick={(event) => showFollowers(followers_data.followers)}>
                            {followers_data.followers.length} Followers
                        </span>
                        <span className="text-blue-500 flex-1   text-sm  text-center cursor-pointer" onClick={(event) => showFollowings(followers_data.followings)}>
                            {followers_data.followings.length} Followings
                        </span>
                        {is_followed ? (
                            <span className="text-blue-500 border border-blue-500 rounded-md flex-1   text-sm  text-center cursor-pointer" onClick={(event) => unfollowUser(user_info, event)}>
                                Unfollow
                            </span>
                        ) : (
                            <span className="text-blue-500 border border-blue-500 rounded-md flex-1   text-sm  text-center cursor-pointer" onClick={(event) => followUser(user_info, event)}>
                                Follow
                            </span>
                        )}
                        <span className=" text-red-500  flex-1 text-sm  text-center cursor-pointer">Block</span>
                    </div>,
                    div
                );
            }
        }, 100);
        return <div className="text-sm text-gray-500"></div>;
    }

    function showFollowers(followers) {
        popupAlert(`${followers.length} Followers`);
    }
    function showFollowings(followings) {
        popupAlert(`${followings.length} Followings`);
    }

    function showMCQExplanation(que, event) {
        if (!que.explanation || que.explanation.trim() === "") {
            return;
        }
        let div = event.target.closest(".mcq-item").querySelector(".mcq-explanation-div");
        if (div) {
            div.remove();
            return;
        }

        div = document.createElement("div");
        div.className = "mcq-explanation-div block w-full h-full";
        event.target.closest(".mcq-item").appendChild(div);
        ReactDOM.render(<LoadMCQExplanationHtml que={que} />, div);
    }
    function LoadMCQExplanationHtml({ que }) {
        let is_linked_blocks = que.linked_blocks && que.linked_blocks.length > 0;
        let page_id = null;
        let block_id = null;
        if (is_linked_blocks) {
            page_id = que.linked_blocks[0].page_id;
            block_id = que.linked_blocks[0].block_id;
        }
        return (
            <div className="mcq-explanation-div-inner block w-full h-full border-t mt-1 pt-1">
                <div className="flex justify-start items-start gap-4  py-1">
                    <span className="text-sm font-bold text-gray-500">Explanation</span>
                    {is_linked_blocks && (
                        <span className="text-sm text-blue-500 cursor-pointer" onClick={(event) => openNotesPage(page_id, block_id, null)}>
                            <i className="bi bi-box-arrow-up-right" onClick={(event) => openNotesPage(que.linked_blocks[0].page_id, que.linked_blocks[0].block_id, null)}></i>
                        </span>
                    )}
                    <i
                        className="bi bi-x-circle  cursor-pointer text-red-500"
                        onClick={(event) => {
                            event.target.closest(".mcq-explanation-div").remove();
                        }}
                    ></i>
                </div>
                <div className="block w-full py-2">
                    <div className="flex justify-start items-start gap-2">
                        <span className={`${que.explanation.trim() != "" ? "" : "hide"}`} dangerouslySetInnerHTML={{ __html: getHTMLFormattedText(que.explanation.trim() != "" ? que.explanation : getBlockText(page_id, block_id)) }}></span>
                        <div className={`${que.explanation.trim() != "" ? "hide" : ""}`}></div>
                    </div>
                </div>
            </div>
        );
    }

    function getBlockText(page_id, block_id) {
        let page = pages_data.find((page) => page.id == page_id);

        for (let i = 0; i < page.data.length; i++) {
            let block = page.data[i];
            let text = checkBlockText(block, block_id);
            if (text) {
                return text;
            }
        }
        return null;
    }

    function checkBlockText(block, block_id, target) {
        if (block.id == block_id) {
            return block.text;
        } else {
            let children = block.children ? block.children : [];
            for (let i = 0; i < children.length; i++) {
                let child = children[i];
                let text = checkBlockText(child, block_id, target);
                if (text) {
                    return text;
                } else {
                    return null;
                }
            }
        }
        return null;
    }

    function deleteUserMCQ(que, event) {
        let is_online = navigator.onLine;
        if (!is_online) {
            popupAlert("Question cannot be added as you are offline");
            return;
        }

        let index = user_mcqs.findIndex((q) => q.id == que.id);
        if (index != -1) {
            user_mcqs.splice(index, 1);
            event.target.closest(".question-div").remove();
            popupAlert("Question has been deleted", 3, "red");
        }

        index = shared_mcqs.findIndex((q) => q.id == que.id);
        if (index != -1) {
            shared_mcqs.splice(index, 1);
        }

        let user_ref = database.ref(`esa_data/${exam}/data/shared_mcqs`);
        user_ref.once("value").then(function (snapshot) {
            let obj = snapshot.val();

            if (!obj) {
                obj = [];
            }

            let index = obj.findIndex((q) => q.id == que.id);
            if (index != -1) {
                obj.splice(index, 1);
            }

            database.ref(`esa_data/${exam}/data/shared_mcqs`).set(obj);
            popupAlert("Question has been deleted", 3, "red");
        });
    }
    function shareMCQ(que, event) {
        let que_id = event.target.closest(".que-div").id;
        const currentUrl = window.location.href;
        const url = `${currentUrl}/${que_id}`;

        if (is_mobile && navigator.share) {
            copyToClipboard(url); // Fallback to copy URL to clipboard
            popupAlert("Link copied to clipboard");
            navigator
                .share({
                    title: "Share Current Question",
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
            //takeScreenshot(que_div);
        } else {
            // Fallback for browsers that do not support Web Share API
            copyToClipboard(currentUrl); // Copy URL to clipboard
            popupAlert("Question Link copied");
        }
    }
    function bookmarkMcq(que, event) {
        let is_bookmarked = event.target.classList.contains("bookmarked");
        if (is_bookmarked) {
            event.target.classList.remove("bookmarked", "bi-bookmark-fill");
            removeItemFromArray(userdata.bookmarked_questions, que.id);
            event.target.classList.add("bi-bookmark");
            popupAlert("Removed from bookmarked questions");
        } else {
            event.target.classList.remove("bi-bookmark");
            event.target.classList.add("bookmarked", "bi-bookmark-fill");
            userdata.bookmarked_questions.unshift(que.id);
            popupAlert("Added to bookmarked questions");
        }
        saveUserData();
    }

    function removeItemFromArray(array, item) {
        const index = array.indexOf(item);
        if (index > -1) {
            array.splice(index, 1);
        }
        return array;
    }
    function openMCQInFullScreen(que) {
        let div = document.querySelector(".mcq-full-screen-overlay");
        if (div) {
            div.remove();
        }
        div = document.createElement("div");
        div.className = "mcq-full-screen-overlay me-overlay bg-white";
        document.querySelector(".me-overlays").appendChild(div);
        ReactDOM.render(<LoadMCQFullScreenHtml que={que} />, div);
    }

    function LoadMCQFullScreenHtml({ que }) {
        setTimeout(() => {
            return;
            let type = undefined;
            let target = document.querySelector(".mcq-full-screen-inner");
            let tags_div = target.querySelector(" .tags");
            tags_div.classList.add("hide");
            if (!type || type != "mock") {
                tags_div.classList.remove("hide");
                ReactDOM.render(<McqTagsHTML que={que} />, tags_div);
            }

            let exam_info_div = target.querySelector(".exam-info");
            exam_info_div.classList.add("hide");
            if ((!type || type != "mock") && que.exams && que.exams.length > 0) {
                exam_info_div.classList.remove("hide");
                ReactDOM.render(<McqExamsHTML que={que} />, exam_info_div);
            }

            let question_action_items_div = target.querySelector(".question-action-items");
            question_action_items_div.classList.add("hide");
            if (!type || type != "mock") {
                question_action_items_div.classList.remove("hide");
                ReactDOM.render(<McqQuestionActionItemsHTML que={que} />, question_action_items_div);
            }

            if (!type) {
                let url = window.location.href; // Get the current URL
                let ind = url.indexOf("#"); // Find the position of '#'

                if (url.includes("mcq")) {
                    let abc = url.substring(0, ind !== -1 ? ind : url.length);
                    window.location.href = abc + `#/${exam}/mcq/${que.id}`;
                }
            }
        }, 1000);
        return (
            <div className="mcq-full-screen-inner w-full h-full">
                <div className="flex justify-start items-center gap-2 py-3 px-2">
                    <i
                        class="bi bi-arrow-left-circle text-xl cursor-pointer px-4 py-3"
                        onClick={(event) => {
                            let url = window.location.href;
                            window.location.href = url.substring(0, url.lastIndexOf("/"));
                            event.target.closest(".me-overlay").remove();
                        }}
                    ></i>
                    <span className="text-xl font-bold text-gray-700">MCQ</span>
                </div>
                {GetMCQHTML({ que: que, index: 0, type: "full-screen", is_show_icons: true, is_show_tags: true })}
            </div>
        );
    }

    function getMCQCommentSection(que) {
        setTimeout(() => {
            loadMCQComments(que);
        }, 1000);
        return (
            <div className="mcq-comment-section-inner w-full h-full block">
                <div className="header-section flex flex-col justify-start items-start gap-2">
                    <div className="flex justify-start items-start gap-2">
                        <i class="bi bi-exclamation-triangle-fill text-yellow-500 text-xl w-[20px]"></i>
                        <span className="text-[0.8em] text-gray-500 flex-1">Please don't add any inappropriate comments. If found, your account may be deleted permanently.</span>
                    </div>
                    <textarea className="border border-gray-500 rounded-md px-2 py-1 w-full h-[70px]" placeholder="Add a comment..."></textarea>
                    <button className="bg-blue-500 text-white px-2 py-1 ml-auto rounded-md" onClick={(event) => addNewCommentOnMCQ(que, event)}>
                        Add Comment
                    </button>
                </div>
                <span className="text-xl mt-4 mb-2 text-gray-700">Comments</span>
                <div className="mcq-comments-section-list w-full h-full block">
                    <span className="text-sm text-gray-500">No any comments yet</span>
                </div>
            </div>
        );
    }

    async function getCommentsOfMCQ(que_id) {
        let data_ref = database.ref(`esa_data/${exam}/mcq_data/${que_id}/comments`);
        let data = await getDataFromFirebaseUsingRef(data_ref);
        data = data ? data : [];
        return data;
    }

    async function loadMCQComments(que) {
        let comments = await getMCQCommentsObject(que);

        let comment_divs = document.querySelectorAll(".mcq-comments-section-list .comment-div");
        comment_divs = comment_divs ? comment_divs : [];
        if (comment_divs.length === comments.length) return;

        let list_div = document.querySelector(".mcq-comments-section-list");
        if (list_div) list_div.innerHTML = ""; //ReactDOM.unmountComponentAtNode(list_div);

        let arr = comments.reverse();
        arr.forEach(async (comment) => {
            let user_info = await getUserInfoById(comment.userid);
            let div = document.createElement("div");
            div.className = "comment-div";
            list_div.appendChild(div);
            ReactDOM.render(<LoadComments comment={comment} user_info={user_info} que={que} />, div);
        });

        // empty content of div
    }

    async function addNewCommentOnMCQ(que, event) {
        let comment = event.target.closest(".mcq-comment-section-inner").querySelector("textarea").value;
        if (comment.trim() == "") return;

        let timestamp = new Date().getTime();
        let date = new Date(timestamp);
        let formattedDate = date.toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });

        let comment_obj = {
            id: getUniqueId(),
            text: comment,
            userid: user_login_data.userid,
            date: formattedDate,
            upvotes: [],
            downvotes: [],
            replies: [],
        };

        let data_ref = database.ref(`esa_data/${exam}/mcq_data/${que.id}/comments`);
        let data = await getDataFromFirebaseUsingRef(data_ref);
        data = data ? data : [];
        data.unshift(comment_obj);
        await data_ref.set(data);

        for (let i = 0; i < que_data.length; i++) {
            let q = que_data[i];
            if (q.id == que.id) {
                q.comments_count = q.comments_count ? q.comments_count : 0;
                q.comments_count += 1;
                console.log(`que_data updated ${que}`);
                break;
            }
        }

        await database.ref(`esa_data/${exam}/mcqs`).set(que_data);
        console.log("online mcq data updates");

        event.target.closest(".mcq-comment-section-inner").querySelector("textarea").value = "";

        userdata.mcq_comments = userdata.mcq_comments ? userdata.mcq_comments : [];
        let obj = {
            que_id: que.id,
            comment_id: comment_obj.id,
        };
        userdata.mcq_comments.unshift(obj);
        saveUserData();

        loadMCQComments(que);
    }

    function LoadComments({ comment, user_info, que }) {
        return (
            <div className="comment-item border-b-2 py-2 my-2 block">
                <div className="comment flex flex-col justify-start items-start gap-2">
                    <div className="flex justify-start items-start gap-2">
                        <img src={user_info.photo_url} className="w-10 h-10 rounded-full" />
                        <div className="flex flex-col justify-start items-start gap-0">
                            <span className="text-sm text-gray-700">{user_info.display_name}</span>
                            <span className="text-sm text-gray-500">@{user_info.username}</span>
                        </div>
                        <span className="text-xs text-gray-500">{comment.date}</span>
                        {comment.userid == user_login_data.userid && <i class="bi bi-trash cursor-pointer text-red-500" onClick={(event) => deleteCurrentComment(comment, event, que)}></i>}
                    </div>
                    <span className="text-sm">{comment.text}</span>
                    <div className="icons flex justify-start items-start gap-4">
                        <div className="upvote flex justify-start items-start gap-2">
                            <i class="bi bi-hand-thumbs-up" onClick={(event) => updateCurrentComment(comment, user_info, event, "upvote", que)}></i>
                            {comment.upvotes && <span className="text-sm">{comment.upvotes.length}</span>}
                        </div>
                        <div className="downvote flex justify-start items-start gap-2">
                            <i class="bi bi-hand-thumbs-down" onClick={(event) => updateCurrentComment(comment, user_info, event, "downvote", que)}></i>
                            {comment.downvotes && <span className="text-sm">{comment.downvotes.length}</span>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    async function deleteCurrentComment(comment, event, que) {
        let data_ref = database.ref(`esa_data/${exam}/mcq_data/${que.id}/comments`);
        let comments = await getDataFromFirebaseUsingRef(data_ref);
        comments = comments ? comments : [];
        let index = comments.findIndex((c) => c.id == comment.id);
        if (index != -1) {
            comments.splice(index, 1);
            userdata.mcq_comments = userdata.mcq_comments.filter((c) => c.comment_id != comment.id);
            saveUserData();
            popupAlert("Comment has been deleted");
        }
        await data_ref.set(comments);

        loadMCQComments(que);
    }

    async function updateCurrentComment(comment, user_info, event, type, que) {
        let data_ref = database.ref(`esa_data/${exam}/mcq_data/${que.id}/comments`);
        let comments = await getDataFromFirebaseUsingRef(data_ref);

        comments.forEach((comment_obj) => {
            comment_obj.upvotes = comment_obj.upvotes ? comment_obj.upvotes : [];
            comment_obj.downvotes = comment_obj.downvotes ? comment_obj.downvotes : [];
            if (comment_obj.id == comment.id) {
                if (type == "upvote") {
                    if (!comment_obj.upvotes.includes(user_login_data.userid)) {
                        comment_obj.upvotes.unshift(user_login_data.userid);
                        comment_obj.downvotes = removeItemFromArray(comment_obj.downvotes, user_login_data.userid);
                    } else {
                        comment_obj.upvotes = removeItemFromArray(comment_obj.upvotes, user_login_data.userid);
                    }
                } else if (type == "downvote") {
                    if (!comment_obj.downvotes.includes(user_login_data.userid)) {
                        comment_obj.downvotes.unshift(user_login_data.userid);
                        comment_obj.upvotes = removeItemFromArray(comment_obj.upvotes, user_login_data.userid);
                    } else {
                        comment_obj.downvotes = removeItemFromArray(comment_obj.downvotes, user_login_data.userid);
                    }
                }
                comment = comment_obj;
            }
        });
        await data_ref.set(comments);

        let div = event.target.closest(".comment-div");
        if (div) {
            emptyElementInReact(div);
        }

        //div.innerHTML = "";
        ReactDOM.render(<LoadComments comment={comment} user_info={user_info} que={que} />, div);
    }
    function emptyElementInReact(div) {
        ReactDOM.unmountComponentAtNode(div);
        //div.innerHTML = "";
    }

    async function getMCQCommentsObject(que) {
        let data_ref = database.ref(`esa_data/${exam}/mcq_data/${que.id}/comments`);
        let data = await getDataFromFirebaseUsingRef(data_ref);
        data = data ? data : [];
        return data;
    }
    function downloadMcqsAsPdf(ques, name) {
        if (!name) {
            let message = document.querySelector(".filter-mcq-message").textContent;
            let tag_name = message.match(/\[(.*?)\]/)[1];
            name = tag_name.replace(/ /g, "_");
        }

        name = `elahistudyapp_mcqs_${name}`;
        let all_ques = ques ? ques : filtered_ques;

        if (!all_ques || all_ques.length === 0) {
            alert("No questions to download. Please filter some questions first.");
            return;
        }

        const doc = new jsPDF();
        const url = `https://elahistudyapp.in//#/${exam}/home`;
        const mcqUrl = `https://elahistudyapp.in//#/${exam}/mcq/`;

        let y = 20;
        const lineHeight = 5;
        const pageHeight = doc.internal.pageSize.height;
        const marginBottom = 10;
        const marginX = 15;
        const boxPadding = 7;
        const boxWidth = doc.internal.pageSize.width - marginX * 2;

        // Function to calculate the height needed for a question and its options
        function calculateQuestionHeight(que) {
            let questionLines = doc.splitTextToSize(que.question, boxWidth - boxPadding * 2);
            let questionHeight = questionLines.length * lineHeight; // Correctly calculate height for multi-line questions
            questionHeight += que.options.length * lineHeight; // Height for options
            questionHeight += lineHeight; // Height for the link
            return questionHeight;
        }

        function addTopLink() {
            doc.setTextColor(0, 0, 255);
            doc.textWithLink("MCQs Downloaded from Elahi Study App", doc.internal.pageSize.width / 2, 10, { url: url, align: "center" });
            doc.setTextColor(0, 0, 0);
        }

        all_ques.forEach((que, index) => {
            const questionHeight = calculateQuestionHeight(que) + boxPadding * 2;

            // Adjust margin for question boxes (for gap between questions)
            const questionMargin = 10; // You can set this to any value for the desired gap

            // Check if the question fits in the remaining space on the current page
            if (y + questionHeight > pageHeight - marginBottom) {
                doc.addPage();
                y = 20;
                addTopLink();
            }

            if (index === 0) {
                addTopLink();
            }

            // Set background and border for MCQ box
            doc.setFillColor(240, 240, 240);
            doc.setDrawColor(250, 250, 250);
            doc.roundedRect(marginX, y, boxWidth, questionHeight, 2, 2, "FD");

            y += boxPadding;

            // Ensure font size is consistent for all questions
            doc.setFontSize(12); // Make sure the font size is uniform
            doc.setFont("helvetica", "bold");
            const questionLines = doc.splitTextToSize(`Q${index + 1}: ${que.question}`, boxWidth - boxPadding * 2);
            doc.text(questionLines, marginX + boxPadding, y);
            y += questionLines.length * lineHeight;

            doc.setFont("helvetica", "normal");
            let correctOption = "";
            que.options.forEach((option, optIndex) => {
                let optionText = option.text.replace("#ans", "");
                if (option.text.includes("#ans")) {
                    correctOption = String.fromCharCode(65 + optIndex);
                }
                const optionLines = doc.splitTextToSize(`(${String.fromCharCode(65 + optIndex)}) ${optionText}`, boxWidth - boxPadding * 2);
                doc.text(optionLines, marginX + boxPadding + 5, y);
                y += optionLines.length * lineHeight;
            });

            y += 5;
            if (correctOption) {
                doc.setFontSize(8); // Set smaller font size for the correct answer
                doc.text(`Correct Answer: (${correctOption})`, marginX + boxPadding, y);
                y += lineHeight; // Add a small gap after the correct answer
            }

            // Add "open mcq in app" link
            const queLink = mcqUrl + que.id;
            doc.setTextColor(0, 0, 255);
            doc.setFontSize(8);
            doc.textWithLink("open mcq in app", marginX + boxPadding, y, { url: queLink });
            doc.setTextColor(0, 0, 0);
            y += lineHeight + 5;

            // Add space between questions
            y += questionMargin; // Adding the margin between questions

            if (y > pageHeight - marginBottom) {
                doc.addPage();
                y = 20;
                addTopLink();
            }
        });

        doc.save(name);
    }

    function NotesPageHTML() {
        return (
            <div className="notes-page-inner flex flex-col h-full w-full">
                <div class="hide block max-w-full overflow-x-auto px-1 py-1 border-b-2">
                    <div class="flex space-x-4 text-blue-500  py-2 px-2 text-sm">
                        <div class="inline-flex items-center whitespace-nowrap border border-blue-500 rounded-md p-2 min-w-[fit-content] cursor-pointer" onClick={() => searchInNotesLoadOverlay()}>
                            <i class="bi bi-search"></i>
                            <span class="ml-2">Search in Notes</span>
                        </div>
                        <div class="inline-flex items-center whitespace-nowrap border border-blue-500 rounded-md p-2 min-w-[fit-content] cursor-pointer" onClick={() => openOverlay("note-chapter-list-overlay")}>
                            <i class="bi bi-list"></i>
                            <span class="ml-2">Chapters List</span>
                        </div>
                        <div
                            class="hide inline-flex items-center whitespace-nowrap border border-blue-500 rounded-md p-2 min-w-[fit-content] cursor-pointer"
                            onClick={() => {
                                let overlay_name = "handnotes-list-overlay";
                                let overlay_div = document.querySelector(`.${overlay_name}`);
                                if (!overlay_div) {
                                    overlay_div = document.createElement("div");
                                    overlay_div.className = `me-overlay ${overlay_name}`;
                                    document.querySelector(".me-overlays").appendChild(overlay_div);
                                    ReactDOM.render(<HandnotesListOverlayHTML />, overlay_div);
                                }
                                openOverlay(overlay_name);
                            }}
                        >
                            <i class="bi bi-pencil"></i>
                            <span class="ml-2">Handnotes</span>
                        </div>
                    </div>
                </div>

                <div className="hide flex gap-5 h-full justify-center items-center p-2 border-b-2 border-gray-300 ">
                    <div className="search-notes flex justify-center items-center gap-2 border rounded-md px-2 py-1 cursor-pointer link" onClick={() => searchInNotesLoadOverlay()}>
                        <i className="fa-light fa-magnifying-glass text-sm"></i>
                        <span className="text-sm text-no-wrap opacity-70"> {is_mobile ? "Search in notes" : "Search in notes"}</span>
                    </div>

                    <div className="chapter-list flex justify-center items-center gap-2 border rounded-md px-2 py-1 cursor-pointer link" onClick={() => openOverlay("note-chapter-list-overlay")}>
                        <i className="fa-regular fa-list text-sm"></i>
                        <span className="text-sm text-no-wrap opacity-70">{is_mobile ? "Chapters list" : "Chapter list"}</span>
                    </div>

                    <div
                        className="handnotes-list flex justify-center items-center gap-2 border rounded-md px-2 py-1 cursor-pointer link"
                        onClick={() => {
                            let overlay_name = "handnotes-list-overlay";
                            let overlay_div = document.querySelector(`.${overlay_name}`);
                            if (!overlay_div) {
                                overlay_div = document.createElement("div");
                                overlay_div.className = `me-overlay ${overlay_name}`;
                                document.querySelector(".me-overlays").appendChild(overlay_div);
                                ReactDOM.render(<HandnotesListOverlayHTML />, overlay_div);
                            }
                            openOverlay(overlay_name);
                        }}
                    >
                        <i class="fa-solid fa-pen-swirl"></i>
                        <span className="text-sm text-no-wrap opacity-70">{is_mobile ? "Handnotes" : "Handnotes"}</span>
                    </div>
                </div>
                <div className="main-notes-page w-full h-full">
                    <div className="chapter h-full w-full  flex flex-col" id="dwd">
                        <div className="title page-title me-bold text-xl px-2 py-3" id=""></div>
                        <div className="me-iframe-div"></div>
                        <div className="children block  h-[calc(100vh-200px)]  p-2 overflow-y-scroll">
                            <span className="text-gray-700 p-3 text-md align-middle"> Open a note from the chapter list or search in notes... </span>
                        </div>
                    </div>
                    <div className="pdf h-full w-full h-ful flex flex-col hide">
                        <div className="search-pdf-div mx-4 my-2 px-4 py-2 border rounded-md flex justify-center items-center gap-2">
                            <i class="bi bi-search"></i>
                            <input type="search" className="p-1 align-middle focus:outline-none text-sm" placeholder="Search pdf by title" />
                        </div>
                        <div className="pdf-list-div border-t-2 w-full h-full p-2 ">
                            {pdf_data.map((pdf) => {
                                return (
                                    <div className="pdf-item block border px-4 py-1 m-2 rounded-md w-[90%] " id={pdf.id}>
                                        <div className="flex justify-start items-start gap-2 cursor-pointer" onClick={() => openPdfFile(pdf.url, pdf.title)}>
                                            <i class="bi bi-file-earmark-pdf text-[3em] text-red-500 w-10 h-[45px]"></i>
                                            <div className="flex flex-col justify-start items-start">
                                                <span className="text-xl text-gray-700 title">{pdf.title}</span>
                                                <span className="text-xs border border-gray-500 rounded-md px-1 py-0.5 text-gray-500">{pdf.subject}</span>
                                            </div>
                                            <span className=" hide pdf-name text-xs text-gray-500">
                                                {pdf.title} {pdf.subject}
                                            </span>
                                        </div>
                                        <div className="icons flex justify-start items-start gap-3 pt-1">
                                            <i class="bi bi-bookmark text-[1.2em] text-gray-500"></i>
                                            <i class="bi bi-share text-[1.2em] text-gray-500"></i>
                                            <i class="bi bi-download text-[1.2em] text-gray-500"></i>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    let handnotes_index = 0;
    function openHandnotesItem(id) {
        id = id ? id : handnotes_data[handnotes_index].id;
        let handnote = handnotes_data.find((item) => item.id == id);
        let link = handnote.link;
        let texts = handnote.texts;
        let title = texts.join(" - ");
        /* document.querySelector(".handnotes-embed-section").innerHTML = `
    <iframe class="rm-iframe-component w-full h-full" 
            src="https://www.tldraw.com/ro/${link}" 
            frameborder="0" 
            allowfullscreen>
    </iframe>`; */
        let srcc = `https://www.tldraw.com/ro/${link}`;
        document.querySelector(".handnotes-embed-section iframe").src = srcc;
    }
    function HandnotesListOverlayHTML() {
        setTimeout(() => {
            handnotes_index = 0;
            //openHandnotesItem(handnotes_data[handnotes_index].id);
        }, 1000);
        return (
            <div className="container handnotes-list-overlay-inner flex flex-col justify-center items-center gap-2 p-0 h-90vh w-90vw">
                <div className="flex justify-center items-center gap-2">
                    <div className="search-div flex justify-center items-center gap-2   rounded-md px-2 py-1 border-2 border-gray-400 w-[80%] h-[40px] mx-auto my-3">
                        <i className="fa-regular fa-magnifying-glass"></i>
                        <input
                            type="search"
                            className="p-1 align-middle focus:outline-none text-sm"
                            placeholder="Search handnotes topic"
                            onKeyUp={(event) => {
                                let arr = [];
                                handnotes_data.forEach((item) => {
                                    item.texts.forEach((text) => {
                                        if (text.toLowerCase().includes(event.target.value.toLowerCase())) {
                                            arr.push({ text: text, id: item.id });
                                        }
                                    });
                                });
                                setAutoComplete(event, arr, "handnotes");
                            }}
                        />
                    </div>
                    <i
                        class="fa-solid fa-list text-gray-400 "
                        onClick={(event) => {
                            const overlay = document.createElement("div");
                            overlay.className = "handnotes-list-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50";
                            overlay.innerHTML = `
                                <div class="bg-white rounded-lg p-6 max-w-3xl max-h-[90vh] overflow-y-auto">
                                    <div class="flex justify-start items-center gap-2">
                                        <h2 class="text-2xl font-bold mb-4">Handnotes List</h2>
                                        <button class="mx-2 bg-red-500 text-white px-4 py-2 rounded" 
                                                onclick="this.closest('.handnotes-list-overlay').remove()">
                                            X
                                        </button>
                                    </div>
                                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        ${handnotes_data
                                            .map(
                                                (note) => `
                                    <div class="border link p-3 rounded hover:bg-gray-100 cursor-pointer" id="${note.id}"
                                    
                                         >
                                        ${note.texts.map((text) => `<p class="text-sm">${text}</p>`).join("")}
                                    </div>
                                `
                                            )
                                            .join("")}
                                    </div>
                                </div>
                                    `;

                            overlay.querySelectorAll(".link").forEach((link) => {
                                link.addEventListener("click", (event) => {
                                    let link_ele = event.target.closest(".link");
                                    openHandnotesItem(link_ele.id);
                                    overlay.remove();
                                });
                            });
                            document.body.appendChild(overlay);
                        }}
                    ></i>
                </div>
                <div className="handnotes-embed-section border-2  w-full  h-[80vh] ">
                    <iframe className="handnote-iframe w-full h-full" src="https://www.tldraw.com/s/v2_c_MomGMMpUXtgECoQ6oY34q?d=v-374.-2588.2205.1449.page" frameborder="0" allowFullScreen></iframe>
                </div>
                <div className="bottom-section flex justify-center items-center gap-2 p-2 h-[40px] mb-7 ">
                    <div
                        className="flex justify-center items-center gap-2 px-3 py-2  border-2 border-gray-400 rounded-md cursor-pointer"
                        onClick={() => {
                            --handnotes_index;
                            if (handnotes_index < 0) handnotes_index = handnotes_data.length - 1;
                            openHandnotesItem(handnotes_data[handnotes_index].id);
                        }}
                    >
                        <i class="fa-regular fa-chevron-left "></i>
                        <span className="text-sm">Prev</span>
                    </div>
                    <div
                        className="flex justify-center items-center gap-2 px-3 py-2  border-2 border-gray-400 rounded-md cursor-pointer"
                        onClick={() => {
                            ++handnotes_index;
                            if (handnotes_index >= handnotes_data.length) handnotes_index = 0;
                            openHandnotesItem(handnotes_data[handnotes_index].id);
                        }}
                    >
                        <i class="fa-regular fa-chevron-right "></i>
                        <span className="text-sm">Next</span>
                    </div>
                    <div
                        className="flex justify-center  items-center gap-2 px-3 py-2   border-2 border-gray-400 rounded-md cursor-pointer"
                        onClick={() => {
                            handnotes_index = Math.floor(Math.random() * handnotes_data.length);
                            openHandnotesItem(handnotes_data[handnotes_index].id);
                        }}
                    >
                        <i class="fa-regular  fa-random "></i>
                        <span className="text-sm">Random</span>
                    </div>
                    <div className="flex justify-center items-center gap-2 px-3 py-2 ">
                        <i
                            class="fa-regular   fa-xmark-circle text-red-500 cursor-pointer"
                            onClick={(event) => {
                                event.target.closest(".me-overlay").remove();
                            }}
                        ></i>
                    </div>
                </div>
            </div>
        );
    }

    function loadNotesPage() {
        let target_div = document.querySelector(".main .page.notes");
        ReactDOM.render(<NotesPageHTML />, target_div);

        // Add Notes Chapter List Items in Overlay
        let overlay_class_name = "me-overlay note-chapter-list-overlay hide";
        let div = document.createElement("div");
        div.className = overlay_class_name;
        document.querySelector(".me-overlays").appendChild(div);
        ReactDOM.render(<NotesChapterListHTML />, div);

        // Load Notes Chapters List
        let target = document.querySelector(".note-chapter-list-overlay .chapter-list");
        let level = 0;
        notes_data.forEach((item) => {
            addNotesChapterListItem(item, target, level);
        });
    }

    let pages_data = [];
    function addNotesChapterListItem(item, target, level) {
        item = item[0] ? item[0] : item;
        let div = document.createElement("div");
        target.appendChild(div);
        ReactDOM.render(<NotesChapterItem item={item} level={level} />, div);

        item.children = item.children ? item.children : [];
        if (item.children.length) {
            let target = div.querySelector(".children");
            item.children.forEach((child) => {
                addNotesChapterListItem(child, target, level + 1);
            });
        }

        if (item.type == "page") {
            pages_data.push(item);
        }
    }

    function NotesChapterItem({ item, level }) {
        let is_page_link = false;
        if (item.text.indexOf("[[") != -1) is_page_link = true;

        let paddingClass = "";
        if (level === 1) {
            paddingClass = "pl-2";
        } else if (level === 2) {
            paddingClass = "pl-4";
        } else if (level === 3) {
            paddingClass = "pl-6";
        } else {
            paddingClass = ""; // Default or no padding
        }
        let regex = /\[\[(.*?)\]\]/;
        let extractedName = item.text.replace(regex, "$1");

        return (
            <div className={`chapter-item level-${level} ${paddingClass} flex flex-col gap-2`}>
                <div className="chapter-item-main flex justify-start items-center gap-1 cursor-pointer">
                    <i className="fa-solid fa-circle link hide text-7px opacity-70"></i>
                    <span className={`chapter-name text-no-wrap ${item.type} text-sm ${is_page_link ? "link" : ""} `} id={`${item.id ? item.id : ""}`} onClick={(event) => openNotesPage(item.id, null, event)}>
                        {capitalFirstLetterOfEachWord(extractedName)}
                    </span>
                </div>
                <div className="children"></div>
            </div>
        );
    }

    function openNotesPage(page_id, block_id, event) {
        if (event && event.target && event.target.classList.contains("heading")) {
            alert("heading");
            return;
        }
        openTab("notes");
        openInMainNotesPage("chapter");

        if (page_id || page_id != "") {
            // Add page_uid in the url if not already present
            if (window.location.href.indexOf(page_id) == -1) {
                window.location.href = window.location.href + `/${page_id}`;
            }
        }

        let page = pages_data.find((page) => page.id == page_id);

        userdata.recent_opened_notes = userdata.recent_opened_notes ? userdata.recent_opened_notes : [];
        let recent_note_pages = userdata.recent_opened_notes;

        let obj = {
            title: page.title,
            page_id: page_id,
        };
        if (recent_note_pages.length > 10) {
            recent_note_pages.pop(); // Remove the last element
            recent_note_pages.unshift(obj); // Add the new element at the beginning
        } else {
            recent_note_pages.unshift(obj);
        }
        saveUserData();

        let page_title_div = document.querySelector(".page.notes .chapter .title");

        page_title_div.id = page.id;
        let regex = /\[\[(.*?)\]\]/;
        page_title_div.textContent = page.title.replace(regex, "$1");

        let target = document.querySelector(".page.notes .chapter .children");
        target.innerHTML = "";
        document.querySelector(".page.notes .chapter .me-iframe-div").innerHTML = "";
        let level = 0;
        let page_data = page.data;
        page_data.forEach((block) => {
            addNotesBlock(block, target, level);
        });

        if (block_id) {
            let block = document.querySelector(`div[id="${block_id}"]`);
            //if (block) smoothScrollToBlock(block);
            block.scrollIntoView({ behavior: "smooth", block: "center" });
            block.style.backgroundColor = "#ffd589";
            setTimeout(() => {
                block.style.backgroundColor = "";
            }, 3000);
        }

        if (event) closeOverlay(event);
    }
    function smoothScrollToBlock(block) {
        //let block_div = block.closest(".block-div");
        if (block) block.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    function addNotesBlock(block, target, level) {
        let div = document.createElement("div");
        div.className = "block-div block h-auto";
        target.appendChild(div);
        ReactDOM.render(<NotesBlockHTML block={block} level={level} />, div);

        div.querySelectorAll(".video").forEach((video_ele) => {
            video_ele.addEventListener("click", (event) => {
                let video_id = video_ele.getAttribute("id");
                let time = parseInt(video_ele.getAttribute("time"));
                playVideoPlayer(video_id, time, event);
            });
        });

        block.children = block.children ? block.children : [];
        if (block.children.length) {
            //let target = div.querySelector(".children");
            block.children.forEach((child) => {
                addNotesBlock(child, target, level + 1);
            });
        }
    }

    function NotesBlockHTML({ block, level }) {
        let containsPDF = false;
        let pdfLabel = "";
        let pdfLink = "";

        // Regex to extract markdown links and check if label contains "PDF"
        block.text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, label, link) => {
            if (label.includes("PDF")) {
                containsPDF = true;
                pdfLabel = label;
                pdfLink = link;
            }
        });

        let linked_mcqs = getBlockLinkMCQs(block);

        if (containsPDF) {
            // Return this if the text contains "PDF"
            return (
                <div className={`level-${level} flex flex-col flex-grow gap-2`}>
                    <div className={`block-main ${block.heading ? "heading" : ""}`} id={block.id}>
                        <div className="block-text flex justify-start items-start gap-2">
                            <span className={`bullet ${block.heading ? "hide" : ""}`}></span>
                            <div
                                className="pdf-link flex justify-center items-center gap-2 border border-blue-300 rounded-md p-2 cursor-pointer"
                                onClick={(event) => {
                                    openPdfFile(pdfLink, pdfLabel);
                                    return;
                                    let pdf_overlay_div = document.querySelector(".pdf-overlay-div");
                                    if (pdf_overlay_div) {
                                        openOverlay("pdf-overlay-div");
                                    } else {
                                        pdf_overlay_div = document.createElement("div");
                                        pdf_overlay_div.className = "pdf-overlay-div me-overlay";
                                        document.querySelector(".me-overlays").appendChild(pdf_overlay_div);
                                        ReactDOM.render(<PdfOverlayHTML link={pdfLink} label={pdfLabel} />, pdf_overlay_div);
                                        openOverlay("pdf-overlay-div");
                                    }
                                }}
                            >
                                <i className="fa-regular fa-file-pdf" style={{ color: "#cb1010" }}></i>
                                <span className="text-sm text-blue-500">{pdfLabel}</span>
                            </div>
                        </div>
                    </div>
                    <div className="children"></div>
                </div>
            );
        } else {
            return (
                <div className={`flex flex-col flex-grow level-${level}`}>
                    <div className={`block-main   ${block.heading ? "heading" : ""}`} id={block.id}>
                        <div className="block-text flex justify-start items-start gap-1">
                            <div className="bullet-div w-[15px] px-1 flex flex-col justify-center items-center">
                                <span
                                    className={`bullet hide ${block.heading ? "hide" : ""}`}
                                    onClick={(event) => {
                                        //event.target.closest(".block-main").querySelector(".block-action-icons").classList.toggle("hide");
                                    }}
                                ></span>
                                <i
                                    class="bi bi-plus text-gray-500"
                                    onClick={(event) => {
                                        event.target.closest(".block-main").querySelector(".block-action-icons").classList.toggle("hide");
                                    }}
                                ></i>
                                {!block.heading && linked_mcqs.length > 0 ? (
                                    <i
                                        class=" text-blue-500 cursor-pointer hide"
                                        onClick={(event) => {
                                            popupAlert(linked_mcqs.length + " mcqs are linked");
                                            openBlockLinkedMCQs(linked_mcqs, event);
                                        }}
                                    >
                                        {linked_mcqs.length}
                                    </i>
                                ) : (
                                    ""
                                )}
                            </div>

                            <div className="flex-1 flex flex-col justify-start items-start gap-2 w-full">
                                <div className="hide block-action-icons pl-5 flex justify-start items-center gap-2 flex-wrap">
                                    <i
                                        class="hide bi bi-plus-circle text-xl cursor-pointer"
                                        onClick={(event) => {
                                            let page_uid = event.target.closest(".main-notes-page").querySelector(".page-title").id;
                                            let block_id = event.target.closest(".block-main").id;
                                            let ids = `${page_uid}::${block_id}`;
                                            copyToClipboard(ids);
                                            popupAlert("Block id copied");
                                        }}
                                    ></i>
                                    <i class="bi bi-share text-gray-500 cursor-pointer" onClick={(event) => shareBlockLink(event)}></i>
                                    <span className="bi bi-plus-circle text-gray-500 cursor-pointer" onClick={(event) => createMCQs(event, "block-mcq")}></span>
                                </div>
                                <span className="text flex-1" dangerouslySetInnerHTML={{ __html: getHTMLFormattedText(block.text) }}></span>
                                <div className="block-link-icons flex justify-center items-center gap-2 ">
                                    {linked_mcqs.length > 0 ? (
                                        <div
                                            className="flex justify-center items-center gap  border-blue-500 rounded-md px-0 py-1 h-[20px] cursor-pointer"
                                            onClick={(event) => {
                                                openBlockLinkedMCQs(linked_mcqs, event);
                                            }}
                                        >
                                            <i className="hide bi bi-patch-question cursor-pointer text-blue-500"></i>

                                            <span className="text-blue-500">{linked_mcqs.length} linked mcqs</span>
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="children flex flex-col flex-grow"></div>
                </div>
            );
        }
    }

    function openBlockLinkedMCQs(linked_mcqs, event) {
        let div = document.querySelector(".block-linked-mcqs-overlay");
        if (div) {
            div.remove();
            div = null;
        }
        div = document.createElement("div");
        div.className = "me-overlay block-linked-mcqs-overlay mt-[40vh] w-full border-t-4 bg-gray-50";
        document.querySelector(".me-overlays").appendChild(div);
        ReactDOM.render(<LinkedMCQsOverlayHTML linked_mcqs={linked_mcqs} />, div);
        openOverlay("block-linked-mcqs-overlay");
    }

    function LinkedMCQsOverlayHTML({ linked_mcqs }) {
        return (
            <div className="block-linked-mcqs-overlay-inner w-full">
                <div className="header border-b-2 flex justify-center items-center gap-2 px-5 py-2 ">
                    <span className="text-[1.2em] font-bold">Block Linked MCQs</span>
                    <i
                        class="bi bi-x-circle text-[1.2em] cursor-pointer ml-auto"
                        onClick={(event) => {
                            event.target.closest(".me-overlay").remove();
                            //closeOverlay(event);
                        }}
                    ></i>
                </div>
                <div className="linked-mcqs-list max-h-[55vh] overflow-y-scroll pb-[70px]">
                    {linked_mcqs.map((mcq, index) => (
                        <div className="linked-mcq-item mcq-div">{GetMCQHTML({ que: mcq, index: index, type: "random", is_show_icons: true, is_show_tags: true })}</div>
                    ))}
                </div>
            </div>
        );
    }

    function getBlockLinkMCQs(block) {
        let all_mcqs = shared_mcqs.concat(que_data);
        let linked_mcqs = all_mcqs.filter((mcq) => mcq.linked_blocks && mcq.linked_blocks[0] && mcq.linked_blocks[0].block_id == block.id);
        if (linked_mcqs.length != 0) {
            let arr = [];
            linked_mcqs.forEach((mcq) => {
                if (!arr.includes(mcq)) arr.push(mcq);
            });
            linked_mcqs = arr;
        }
        return linked_mcqs;
    }

    function shareBlockLink(event) {
        let page_uid = event.target.closest(".main-notes-page").querySelector(".page-title").id;
        let block_id = event.target.closest(".block-main").id;
        const currentUrl = window.location.href;

        let url = `${currentUrl}/${block_id}`;
        if (is_mobile && navigator.share) {
            copyToClipboard(url); // Fallback to copy URL to clipboard
            popupAlert("Link copied to clipboard");
            navigator
                .share({
                    title: "Share Current Question",
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
            //takeScreenshot(que_div);
        } else {
            // Fallback for browsers that do not support Web Share API
            copyToClipboard(currentUrl); // Copy URL to clipboard
            popupAlert("Question Link copied");
        }

        popupAlert("Block link copied");
    }
    function openPdfFile(link, label) {
        let pdf_overlay_div = document.createElement("div");
        pdf_overlay_div.className = "open-pdf-file-overlay-div me-overlay";
        document.querySelector(".me-overlays").appendChild(pdf_overlay_div);
        ReactDOM.render(<PdfOverlayHTML link={link} label={label} />, pdf_overlay_div);
        openOverlay("open-pdf-file-overlay-div");
    }

    function PdfOverlayHTML({ link, label }) {
        link = link.replace("/view?usp=sharing", "/preview");
        return (
            <div className="pdf-overlay-div-inner w-[100vw] h-[100vh] bg-white">
                <div className="top-section flex justify-center items-center gap-2 p-3">
                    <span className="text-lg font-bold flex-1">{label}</span>
                    <i
                        className="bi bi-x-circle w-[20px] h-[20px]  cursor-pointer text-xl align-right ml-auto"
                        onClick={(event) => {
                            event.target.closest(".me-overlay").remove();
                        }}
                    ></i>
                </div>
                <iframe src={link} className="w-full h-[calc(100vh-45px)]"></iframe>
            </div>
        );
    }

    function NotesBlockHTML__({ block, level }) {
        text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, function (match, label, link) {
            if (label.includes("PDF")) {
                // Check if the link or label contains "PDF"
                return `<div class="pdf-link flex justify-center items-center gap-2 border border-blue-300 rounded-md p-2 cursor-pointer" 
                    onclick="openPdf('${link}')">
                    <i class="fa-regular fa-file-pdf" style="color: #cb1010;"></i>
                    <span class="text-sm text-blue-500">${label}</span>
                </div>`;
            }
        });
        return (
            <div className={`block level-${level} flex flex-col gap-2`}>
                <div className={`block-main ${block.heading ? "heading" : ""}`} id={block.id}>
                    <div className="block-text flex justify-start items-start gap-2">
                        <span className={`bullet ${block.heading ? "hide" : ""} `}></span>
                        <span className="text flex-1" dangerouslySetInnerHTML={{ __html: getHTMLFormattedText(block.text) }}></span>
                    </div>
                </div>
                <div className="children"></div>
            </div>
        );
    }

    function NotesBlock({ block, level }) {
        return <div className="block level-${level}"></div>;
    }
    function NotesChapterListHTML() {
        return (
            <div className="container flex flex-col justify-center items-start gap-2 p-0 h-90vh w-90vw">
                <div className="search-div bg-blue-100 flex justify-center p-4 items-center gap-2 h-full w-full">
                    <div className="flex justify-center items-center gap-2  rounded-md px-2 py-1 border-2 border-gray-400 ">
                        <i className="bi bi-funnel"></i>
                        <input type="text" className="bg-blue-100 p-1 align-middle focus:outline-none text-sm" placeholder="Filter chapters" onKeyUp={(event) => filterChapterNames(event)} />
                    </div>
                    <i className="bi bi-x-circle cursor-pointer text-xl align-right ml-auto" onClick={(event) => closeOverlay(event)}></i>
                </div>
                <div className="chapter-list  px-7 py-5 max-h-[calc(100vh-80px)] overflow-y-scroll  bg-white"></div>
            </div>

            /*<div className="container flex flex-col justify-start items-start ">
            <div className=" flex justify-center items-center p-3  ">
                <span> Chapter List Index</span>
                <i className="bi bi-x-circle cursor-pointer text-xl align-right ml-auto" onClick={(event) => closeOverlay(event)}></i>
            </div>
            <div className="flex justify-center items-center gap-2 border-2 border-gray-500 border-radius-md m-2 p-2">
                <i className="fa-regular fa-magnifying-glass"></i>
                <input type="text" className="p-1 text-sm w-full flex-1 outline-none" placeholder="Filter chapter" onChange={(event) => filterChapterNames(event)} />
            </div>
            <div className="chapter-list  px-4 py-2 max-h-[calc(100vh-120px)] overflow-y-scroll"></div>
        </div>
        */
        );
    }

    function searchInNotesLoadOverlay(search_text) {
        let search_div = document.querySelector(".search-notes-overlay");
        if (search_div) {
            search_div.remove();
            search_div = null;
        }
        if (!search_div) {
            let div = document.createElement("div");
            div.className = "search-notes-overlay me-overlay";
            document.querySelector(".me-overlays").appendChild(div);
            ReactDOM.render(<SearchNotesOverlayHTML search_text={search_text} />, div);
        }
        openOverlay("search-notes-overlay");
        setTimeout(() => {
            if (search_text) {
                searchInNotes(null, search_text);
            } else {
                let input = document.querySelector(".search-notes-overlay input");
                if (input) input.focus();
            }
        }, 1000);
    }
    function SearchNotesOverlayHTML({ search_text }) {
        return (
            <div className="container flex flex-col justify-center items-start gap-2 p-0 h-90vh w-90vw">
                <div className="search-div bg-blue-100 flex justify-center p-4 items-center gap-2 h-full w-full">
                    <div className="flex justify-center items-center gap-2  rounded-md px-2 py-1 border-2 border-gray-400 ">
                        <i className="fa-regular fa-magnifying-glass"></i>
                        <input type="text" className="bg-blue-100 p-1 align-middle focus:outline-none text-sm" placeholder="Search in notes" onKeyUp={(event) => searchInNotes(event, search_text)} />
                    </div>
                    <i className="bi bi-x-circle cursor-pointer text-xl align-right ml-auto" onClick={(event) => closeOverlay(event)}></i>
                </div>
                <div className="search-results p-3 max-h-[calc(100vh-80px)] overflow-y-scroll  bg-white"></div>
            </div>
        );
    }
    function searchInNotes(event, search_text) {
        //if (event.key == "Enter") {
        let input_value = search_text ? search_text : event.target.value.trim();
        if (search_text) {
            document.querySelector(".search-notes-overlay input").value = search_text;
        }
        if (input_value == "") {
            let search_results = document.querySelector(".search-notes-overlay .search-results");
            search_results.innerHTML = "";
            return;
        }
        let search_results = document.querySelector(".search-notes-overlay .search-results");
        search_results.innerHTML = "";
        searchForTextInNotes(input_value);
        //}
    }

    function searchForTextInNotes(text) {
        let i = 0;
        var parent_path_items = [];
        pages_data.forEach((page) => {
            let obj = {
                text: page.title.replace("[[", "").replace("]]", ""),
                page_id: page.id,
            };
            parent_path_items[i] = obj;

            page.data.forEach((block) => {
                findSearchTextInBlocks(block, text, parent_path_items, i + 1);
            });
        });
    }
    function findSearchTextInBlocks(block, text, parent_path_items, i) {
        if (block.text.toLowerCase().includes(text.toLowerCase())) {
            const regex = new RegExp(text, "gi");
            let text_2 = block.text.replace(regex, (match) => `^^${match}^^`);
            let div = document.createElement("div");
            div.className = "search-result-item my-7";
            //let text = block.text;
            ReactDOM.render(<SearchResultItemHTML block={block} text={text_2} parent_path_items={parent_path_items} />, div);
            let search_results = document.querySelector(".search-notes-overlay .search-results");
            search_results.appendChild(div);
        }
        block.children = block.children ? block.children : [];
        block.children.forEach((child) => {
            let obj = {
                text: block.text,
                block_id: block.id,
            };
            //parent_path_items[i] = obj;
            findSearchTextInBlocks(child, text, parent_path_items, i + 1);
        });
    }
    function SearchResultItemHTML({ block, text, parent_path_items }) {
        return (
            <div className="search-result-item">
                <div className="path my-4 flex justify-start items-center gap-2 flex-wrap">
                    {parent_path_items && parent_path_items.length > 0 ? (
                        parent_path_items.map((item, index) => (
                            <span
                                key={item.page_id || item.block_id} // Use a unique key
                                className="path-item link cursor-pointer"
                                page_id={item.page_id || ""}
                                block_id={item.block_id || ""}
                                onClick={(event) => openNotesPage(item.page_id, item.block_id, event)}
                                dangerouslySetInnerHTML={{ __html: getHTMLFormattedText(item.text) }}
                            ></span>
                        ))
                    ) : (
                        <span>No paths available</span> // Fallback if no items
                    )}
                </div>
                <div
                    className="block-text cursor-pointer"
                    page_id={block.page_id}
                    block_id={block.block_id}
                    dangerouslySetInnerHTML={{ __html: getHTMLFormattedText(text) }}
                    onClick={(event) => {
                        openNotesPage(block.page_id, block.id, event);
                        closeOverlay(event);
                    }}
                ></div>
            </div>
        );
    }

    function filterChapterNames(event) {
        let input_value = event.target.value.trim();
        let overlay_div = event.target.closest(".me-overlay");
        let chapter_list = overlay_div.querySelector(".chapter-list");
        let chapters = overlay_div.querySelectorAll(".chapter-item");
        chapters.forEach((chapter) => {
            if (chapter.textContent.toLowerCase().includes(input_value.toLowerCase())) {
                chapter.classList.remove("hide");
            } else {
                chapter.classList.add("hide");
            }
        });
    }

    function capitalFirstLetterOfEachWord(str) {
        return str.toLowerCase().replace(/(?:^|\s)\S/g, function (a) {
            return a.toUpperCase();
        });
    }

    function searchMcqs(search_text) {
        let search_div = document.querySelector(".search-mcq-overlay");
        if (!search_div) {
            let div = document.createElement("div");
            div.className = "search-mcq-overlay me-overlay";
            document.querySelector(".me-overlays").appendChild(div);
            ReactDOM.render(<SearchMcqOverlayHTML />, div);
        }
        openOverlay("search-mcq-overlay");
        if (!search_text) return;
        let interval = setInterval(() => {
            let input = document.querySelector(".search-mcq-overlay input");
            if (input) {
                clearInterval(interval);
                input.value = search_text ? search_text : "";
                //document.querySelector(".search-mcq-btn").click();
                findMCQsByText(search_text);
            }
        }, 100);
    }
    function SearchMcqOverlayHTML() {
        return (
            <div className="container search-mcq-overlay-inner flex flex-col h-full w-full">
                <div className="search-mcq-header px-4 py-2  flex justify-center items-center gap-2">
                    <span className="text-[15px] font-bold">Search MCQs by text</span>
                    <i className="bi bi-x-circle cursor-pointer text-xl align-right ml-auto" onClick={(event) => closeOverlay(event)}></i>
                </div>

                <div className="flex justify-center items-center gap-2 p-2 w-full">
                    <div className="flex-1 flex justify-center items-center gap-2  rounded-md px-2 py-1 border border-gray-700 ">
                        <i className="bi bi-search text-gray-700"></i>
                        <input type="search" className="search-mcq-input p-1 align-middle focus:outline-none text-sm" placeholder="Search mcqs by text" onKeyUp={(event) => searchMCQsbyText(event)} />
                    </div>
                    <button className="search-mcq-btn bg-blue-700 text-white rounded-md px-2 py-1 h-[32px] mr-2  cursor-pointer  " onClick={(event) => searchMCQsbyText(event)}>
                        Search
                    </button>
                </div>

                <div class="block max-w-full overflow-x-auto py-1 px-2">
                    <div class="flex space-x-2 text-blue-500 text-sm">
                        <div class="inline-flex items-center whitespace-nowrap border border-blue-500 bg-blue-500 text-white rounded-md min-w-[fit-content] cursor-pointer px-2 py-1 text-[10px] h-[22px]" onClick={(event) => filterSearchedMcqs(event, "all")}>
                            All
                        </div>
                        <div class="inline-flex items-center whitespace-nowrap border border-blue-500 text-blue-500 rounded-md min-w-[fit-content] cursor-pointer px-2 py-1 text-[10px] h-[22px]" onClick={(event) => filterSearchedMcqs(event, "question")}>
                            Question only
                        </div>
                        <div class="inline-flex items-center whitespace-nowrap border border-blue-500  text-blue-500 rounded-md min-w-[fit-content] cursor-pointer px-2 py-1 text-[10px] h-[22px]" onClick={(event) => filterSearchedMcqs(event, "options")}>
                            Options only
                        </div>
                        <div
                            class="inline-flex items-center whitespace-nowrap border border-blue-500  text-blue-500 rounded-md min-w-[fit-content] cursor-pointer px-2 py-1 text-[10px] h-[22px]"
                            onClick={(event) => {
                                let search_text = "__" + event.target.closest(".me-overlay").querySelector(".search-mcq-input").value.trim();

                                let overlay_div = event.target.closest(".me-overlay");
                                let all_ques = overlay_div.querySelector(".search-results").querySelectorAll(".que-div");
                                if (!all_ques) return;

                                let ques = [];
                                all_ques.forEach((que_div) => {
                                    let que = que_data.find((que) => que.id == que_div.id);
                                    if (que) ques.push(que);
                                });
                                ques = ques.length ? ques : null;
                                downloadMcqsAsPdf(ques, search_text);
                            }}
                        >
                            Download as PDF
                        </div>
                    </div>
                </div>

                <div className=" hide filter-searched-mcqs flex justify-center items-center gap-2 my-2 py-2 w-full">
                    <span className="all text-sm bg-blue-500 text-white border-2 rounded-md py-1 px-2 cursor-pointer" onClick={(event) => filterSearchedMcqs(event, "all")}>
                        All
                    </span>
                    <span className="question-only text-sm border-2 rounded-md py-1 px-2 cursor-pointer text-gray-500" onClick={(event) => filterSearchedMcqs(event, "question")}>
                        Question Only
                    </span>
                    <span className="options-only text-sm border-2 rounded-md py-1 px-2 cursor-pointer text-gray-500" onClick={(event) => filterSearchedMcqs(event, "options")}>
                        Options Only
                    </span>
                    <span
                        className="download-as-pdf text-sm border-2 border-blue-500 rounded-md py-1 px-2 cursor-pointer text-blue-500"
                        onClick={(event) => {
                            let search_text = "__" + event.target.closest(".me-overlay").querySelector(".search-mcq-input").value.trim();

                            let overlay_div = event.target.closest(".me-overlay");
                            let all_ques = overlay_div.querySelector(".search-results").querySelectorAll(".que-div");
                            if (!all_ques) return;

                            let ques = [];
                            all_ques.forEach((que_div) => {
                                let que = que_data.find((que) => que.id == que_div.id);
                                if (que) ques.push(que);
                            });
                            ques = ques.length ? ques : null;
                            downloadMcqsAsPdf(ques, search_text);
                        }}
                    >
                        Download as PDF
                    </span>
                </div>

                <span className="text-sm text-gray-500 w-full text-center my-1 searched-mcq-filter-message"></span>
                <span className="text-sm link w-full text-right open-searched-mcqs-in-mcq-page hide px-2 cursor-pointer">Open mcqs in main page</span>
                <div className="search-mcq-by-text-results max-h-[calc(100vh-150px)] border-t-2  overflow-y-scroll  bg-white">
                    <div className="no-searched-mcqs flex justify-center items-center w-full h-full py-5">No searched MCQs</div>
                </div>
            </div>
        );
    }

    async function getUserInfoById(userid) {
        let data_ref = database.ref(`esa_data/${exam}/users_login_info/${userid}`);
        let user_info = await getDataFromFirebaseUsingRef(data_ref);
        return user_info ? user_info : {};
    }

    function filterSearchedMcqs(event, filter_type) {
        event.target.parentElement.querySelectorAll("div").forEach((child) => {
            child.classList.remove("bg-blue-500");
            child.classList.replace("text-white", "text-blue-500"); // Replace works here
        });
        event.target.classList.add("bg-blue-500", "text-white");
        event.target.classList.remove("text-blue-500");

        //alert(filter_type);
        let overlay_div = event.target.closest(".me-overlay");
        let all_ques = overlay_div.querySelector(".search-results").querySelectorAll(".que-div");
        if (!all_ques) return;

        all_ques.forEach((que_div) => {
            que_div.classList.add("hide");
        });
        if (filter_type == "question") {
            let all_ques_ques_only = overlay_div.querySelector(".search-results").querySelectorAll(".que-div:has(.question .me-search)");

            all_ques_ques_only.forEach((que_div) => {
                que_div.classList.remove("hide");
            });
            overlay_div.querySelector(".searched-mcq-filter-message").textContent = `Question Only: ${all_ques_ques_only.length} mcqs found`;
        } else if (filter_type == "options") {
            let all_ques_options_only = overlay_div.querySelector(".search-results").querySelectorAll(".que-div:has(.options .me-search)");

            all_ques_options_only.forEach((que_div) => {
                que_div.classList.remove("hide");
            });
            overlay_div.querySelector(".searched-mcq-filter-message").textContent = `Options Only: ${all_ques_options_only.length} mcqs found`;
        } else {
            all_ques.forEach((que_div) => {
                que_div.classList.remove("hide");
            });
            overlay_div.querySelector(".searched-mcq-filter-message").textContent = `Total: ${all_ques.length} mcqs found`;
        }
    }
    function searchMCQsbyText(event, search_text) {
        let overlay_div = document.querySelector(".search-mcq-overlay");

        if (event && event.target.classList.contains("search-mcq-input")) {
            let search_text = event.target.value.trim();
            if (event.key == "Enter" && search_text != "") {
                findMCQsByText(search_text);
            }
        } else if (event && event.target.classList.contains("search-mcq-btn")) {
            let search_text = overlay_div.querySelector(".search-mcq-input").value.trim(); //event.target.closest(".search-mcq-overlay").querySelector(".search-mcq-input").value.trim();
            if (search_text != "") {
                findMCQsByText(search_text);
            }
        } else if (search_text) {
            if (search_text == "") return;
            overlay_div.querySelector(".search-mcq-input").value = search_text;
            findMCQsByText(search_text);
        }
    }

    function findMCQsByText(input_value) {
        let searh_result_div = document.querySelector(".search-mcq-overlay-inner .search-mcq-by-text-results");
        if (searh_result_div) ReactDOM.unmountComponentAtNode(searh_result_div); //searh_result_div.innerHTML = "";
        let searched_ques = que_data.filter((que) => que.question.toLowerCase().includes(input_value.toLowerCase()) || que.options.some((option) => option.text.toLowerCase().includes(input_value.toLowerCase())));

        ReactDOM.render(<LoadSearchByTextMCQsItemHTML searched_ques={searched_ques} input_value={input_value} />, searh_result_div);

        setTimeout(() => {
            //searh_result_div.scrollTop = searh_result_div.scrollHeight;

            let search_mcq_array = document.querySelectorAll(".search-mcq-by-text-results .mcq-div");
            search_mcq_array = search_mcq_array ? search_mcq_array : [];
            search_mcq_array.forEach((que_div) => {
                que_div.querySelector(".question").innerHTML = que_div.querySelector(".question").innerHTML.replace(new RegExp(input_value, "gi"), (match) => `<span class=" inline-flex bg-yellow-200 mx-1 px-1 me-search ">${match}</span>`);
                que_div.querySelectorAll(".option-text").forEach((option) => {
                    option.innerHTML = option.innerHTML.replace(new RegExp(input_value, "gi"), (match) => `<span class=" inline-flex bg-yellow-200 me-search">${match}</span>`);
                });
            });
        }, 1000);
        return;
        searched_ques.forEach((que) => {
            let que_div = document.createElement("div");
            searh_result_div.appendChild(que_div);

            //que_div.innerHTML = GetMcqDiv(que);
            ReactDOM.render(<GetMcqDiv que={que} search_text={input_value} />, que_div);
            ReactDOM.render(<GetMCQHTML que={que} search_text={input_value} />, que_div);

            //que_div.querySelector(".question .font-bold").className = "text-md font-bold inline-block  whitespace-nowrap";
            que_div.querySelector(".question").innerHTML = que_div.querySelector(".question").innerHTML.replace(new RegExp(input_value, "gi"), (match) => `<span class=" bg-green-300 me-search ">${match}</span>`);
            que_div.querySelectorAll(".option-text").forEach((option) => {
                option.innerHTML = option.innerHTML.replace(new RegExp(input_value, "gi"), (match) => `<span class=" bg-green-300 me-search">${match}</span>`);
            });
            let span = document.createElement("span");
            span.className = "text-sm link w-[fit-content] my-2 cursor-pointer";
            span.textContent = "Open mcq in main page";
            span.onclick = () => {
                closeOverlay(event);
                openMcq(que);
            };
            que_div.querySelector(".options").appendChild(span);
        });
        document.querySelector(".search-mcq-overlay-inner .searched-mcq-filter-message").textContent = `Total:  ${searched_ques.length} mcqs found`;
        if (searched_ques.length) {
            overlay_div.querySelector(".searched-mcq-filter-message").textContent = `Total:  ${searched_ques.length} mcqs found`;
            overlay_div.querySelector(".filter-searched-mcqs").classList.remove("hide");
            let open_mcq_link = event.target.closest(".me-overlay").querySelector(".open-searched-mcqs-in-mcq-page");
            open_mcq_link.classList.remove("hide");
            open_mcq_link.addEventListener("click", (event) => {
                filtered_ques = searched_ques;
                curr_que_index = 0;
                openMcq(filtered_ques[curr_que_index]);
                closeOverlay(event);
                //open_mcq_link.classList.add("hide");
                let filter_message = `Filter:  ${filtered_ques.length} mcqs found for searched text "${input_value}"`;
                setFilterMcqsMessage(filter_message);
            });
        } else {
            //event.target.closest(".me-overlay").querySelector(".searched-mcq-filter-message").textContent = "";
            //event.target.closest(".me-overlay").querySelector(".filter-searched-mcqs").classList.add("hide");
            searh_result_div.innerHTML = "No questions found";
        }
    }

    function LoadSearchByTextMCQsItemHTML({ searched_ques, input_value }) {
        return (
            <div className="search-mcq-by-text-results-inner block">
                {searched_ques.map((que, index) => (
                    <div key={index} className="mcq-div">
                        <GetMCQHTML que={que} search_text={input_value} index={index + 1} type="search-by-text" is_show_icons={true} is_show_tags={false} />
                    </div>
                ))}
            </div>
        );
    }
    function openOverlay(overlay_name) {
        let overlay = document.querySelector(`.${overlay_name}`);
        if (overlay) overlay.classList.remove("hide");
    }
    function closeOverlay(event) {
        let ele = event.target.closest(".me-overlay");
        if (ele) ele.classList.add("hide");
    }

    function reloadMCQs() {
        let ele = document.querySelector(".page.mcq .que-text");
        if (ele) ReactDOM.unmountComponentAtNode(ele); // ele.innerHTML = "";
        filtered_ques = sortArrayRandomly(filtered_ques);
        //document.querySelector(".page.mcq .que-text .mcq-item").scrollIntoView({ behavior: "auto", block: "center" });
        loadMCQList();
    }

    function onSignOut() {
        localStorage.removeItem("esa_user_login_data", null);

        popupAlert("User signed out");
        esa_local_data = {};
        saveESALocalData();
        location.reload(true);
    }

    function createMCQs(event, type) {
        let div = document.querySelector(".create-mcq-overlay.me-overlay");
        if (div) {
            div.remove();
            /*openOverlay("create-mcq-overlay");
        if (type == "block-mcq") {
            let block_id = event.target.closest(".block-main").id;
            let page_id = event.target.closest(".main-notes-page").querySelector(".page-title").id;
            let linked_block_id = `${page_id}::${block_id}`;
            document.querySelector(".create-mcq-overlay .block-link-div input").value = linked_block_id;
        }
        //return;*/
        }
        div = document.createElement("div");
        div.className = "create-mcq-overlay me-overlay";
        document.querySelector(".me-overlays").appendChild(div);
        ReactDOM.render(<CreateMcqOverlayHTML event={event} type={type} />, div);
    }
    let user_questions = [];
    function CreateMcqOverlayHTML({ event, type }) {
        let linked_block_id = "";
        if (type === "block-mcq") {
            let block_id = event.target.closest(".block-main").id;
            let page_id = event.target.closest(".main-notes-page").querySelector(".page-title").id;
            linked_block_id = `${page_id}::${block_id}`;
        }
        setTimeout(() => {
            document.querySelector(".create-mcq-overlay-inner .tags-div input").value = "  ";
            document.querySelector(".create-mcq-overlay-inner .tags-div input").value = "";
        }, 1000);
        return (
            <div className="create-mcq-overlay-inner block h-full w-full bg-white">
                <div className="create-mcq-header-div fixed top-0 left-0 w-full">
                    <div className="create-mcq-header p-2 flex justify-center items-center gap-2">
                        <span className="text-[15px] font-bold">Create MCQs</span>
                        <i
                            className="bi bi-x-circle cursor-pointer text-xl align-right ml-auto"
                            onClick={(event) => {
                                //closeOverlay(event);
                                event.target.closest(".me-overlay").remove();
                            }}
                        ></i>
                    </div>
                </div>

                <div className="create-mcq-body h-[calc(100vh-50px)] overflow-y-scroll py-2 mt-10  block w-full">
                    <div className="question-div block h-auto w-100 ">
                        <span className="text-sm font-bold text-gray-500">Question:</span>
                        <textarea className="w-[90%] p-2 m-2 font-bold border border-gray-400 rounded-md " placeholder="Add question text here"></textarea>
                    </div>

                    <div className="question-div block h-auto w-100 ">
                        <span className="text-sm font-bold text-gray-500">Options:</span>
                        <div className="options w-100">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <div key={index} className="option flex justify-start items-center gap-2 w-full p-2 my-2">
                                    <input type="radio" name="option" className="w-[10px] p-2  border border-gray-400 rounded-md " />
                                    <input type="text" className="flex-1 p-2 border border-gray-400 rounded-md " placeholder="Add option text here" />
                                    <i className="w-[10px] hide fa-solid fa-trash-can text-gray-500 cursor-pointer" onClick={(event) => event.target.closest(".option").remove()}></i>
                                </div>
                            ))}
                            <button
                                className="hide btn-div w-[fit-content] mx-auto px-3 py-2 bg-gray-500 text-gray-100 rounded-md"
                                onClick={(event) => {
                                    let options_div = event.target.closest(".create-mcq-body").querySelector(".options");
                                    let option_div = document.createElement("div");
                                    option_div.className = "option flex justify-start items-center gap-2 p-2 my-2 w-full";
                                    option_div.innerHTML = `
                        <input type="radio" name="option"  class="w-[10px] p-2  border border-gray-400 rounded-md "/>
                        <input type="text" class="flex-1 p-2  border border-gray-400 rounded-md " placeholder="Add option text here" />
                        <i class="w-[10px] fa-solid fa-trash-can text-gray-500 cursor-pointer"
                        onclick="event.target.closest('.option').remove()"
                            ></i>
                        `;

                                    options_div.insertBefore(option_div, options_div.lastElementChild);
                                    option_div.querySelector("input[type='text']").focus();
                                }}
                            >
                                Add option
                            </button>
                        </div>
                    </div>

                    <div className="explanation-div flex flex-col justify-start items-start gap-1 m-1 p-1 w-100">
                        <span className="text-sm font-bold text-gray-500">Explanation:</span>
                        <textarea className="w-[100%] px-2 py-1 border border-gray-400 rounded-md" placeholder="Add explanation here or link to a block"></textarea>
                    </div>
                    <div className="block-link-div block h-auto w-100">
                        <div className="flex flex-col justify-start items-start gap-1 my-1 p-1 w-100">
                            <span className="text-sm font-bold text-gray-500">Link to note block:</span>
                            <input type="text" className="w-[100%] p-2 border border-gray-400 rounded-md  " placeholder="Paste note block id here" value={linked_block_id} />
                        </div>
                    </div>

                    <div className="video-link-div block h-auto w-100 ">
                        <div className=" flex flex-col justify-start items-start gap-1 my-1 p-1 w-100">
                            <span className="text-sm font-bold text-gray-500">Link to youtube video:</span>
                            <input type="text" className="video-link w-[90%] p-2 border border-gray-400 rounded-md " placeholder="Paste youtube link here" />
                            <input type="text" className="video-time w-[90%] p-2  border border-gray-400 rounded-md " placeholder="Add tim e.g 04:55 (hh:mm:ss)" />
                        </div>
                    </div>

                    <div className="external-link-div block h-auto w-100 ">
                        <div className=" flex flex-col justify-start items-start gap-1 my-1 p-1 w-100">
                            <span className="text-sm font-bold text-gray-500">External link:</span>
                            <input type="text" className="link w-[90%] p-2 border border-gray-400 rounded-md " placeholder="Paste external link here" />
                        </div>
                    </div>

                    <div className="hide subject-div flex flex-col justify-start items-start gap-2 my-2 w-full">
                        <span className="text-sm font-bold text-gray-500">Subject:</span>
                        <div className="subjects flex justify-start items-center gap-2">
                            {subjects[exam].map((subject) => (
                                <span
                                    className="text-sm subject border border-gray-400 rounded-md px-2 py-1 text-gray-500 cursor-pointer"
                                    key={subject}
                                    onClick={(event) => {
                                        if (event.target.classList.contains("selected")) return;
                                        let subjects = document.querySelectorAll(".create-mcq-overlay-inner .subject-div .subject");
                                        subjects.forEach((subject) => {
                                            subject.classList.remove("selected");
                                            subject.classList.replace("text-white", "text-gray-500");
                                            subject.classList.remove("bg-blue-500");
                                        });
                                        event.target.classList.add("selected");
                                        event.target.classList.add("bg-blue-500");
                                        event.target.classList.replace("text-gray-500", "text-white");
                                    }}
                                >
                                    {subject}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div class="block subject-div max-w-full overflow-x-auto p-2">
                        <span className="text-sm font-bold text-gray-500">Subject:</span>
                        <div class="flex space-x-4 ">
                            {subjects[exam].map((subject, index) => (
                                <span
                                    key={index} // Add a key for each child in the list
                                    className=" subject inline-flex items-center whitespace-nowrap border text-gray-500 h-[22px] rounded-md px-2 py-1 min-w-[fit-content] cursor-pointer"
                                    onClick={(event) => {
                                        if (event.target.classList.contains("selected")) {
                                            popupAlert("Please select any subject", 3, "red");
                                            return;
                                        }
                                        let subjects = document.querySelectorAll(".create-mcq-overlay-inner .subject-div .subject");
                                        subjects.forEach((subject) => {
                                            subject.classList.remove("selected");
                                            subject.classList.replace("text-white", "text-gray-500");
                                            subject.classList.remove("bg-blue-500");
                                        });
                                        event.target.classList.add("selected");
                                        event.target.classList.add("bg-blue-500");
                                        event.target.classList.replace("text-gray-500", "text-white");
                                    }}
                                >
                                    {capitalFirstLetterOfEachWord(subject)}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="tags-div block m-2  p-2 w-[90%]">
                        <span className="text-sm font-bold text-gray-500">Tags:</span>
                        <div className="tags w-full flex flex-col justify-start items-center gap-2">
                            <input
                                type="text"
                                className="w-full p-2 m-2 border border-gray-400 rounded-md "
                                placeholder="Add tag"
                                onChange={(event) => {
                                    let target = event.target.closest(".tags-div").querySelector(".tags-list");
                                    setAutoComplete(event, all_tags, "new-mcq-tags", target);
                                }}
                            />
                            <div className="tags-list flex  justify-start items-start gap-2 w-full flex-wrap"></div>
                        </div>
                    </div>

                    <div className="block w-full mb-10">
                        <div className=" flex justify-start items-start gap-2">
                            <button
                                className="btn-div w-[80%] mx-auto m-2 px-3 py-2 bg-blue-500 text-white rounded-md"
                                onClick={(event) => {
                                    let is_online = navigator.onLine;
                                    if (!is_online) {
                                        popupAlert("Question cannot be added as you are offline");
                                        return;
                                    }
                                    let question = event.target.closest(".create-mcq-body").querySelector("textarea").value;
                                    question = question.trim();
                                    if (!question) {
                                        popupAlert("Please add question");
                                        return;
                                    }
                                    if (!question.endsWith("?")) question = question + "?";

                                    let options = event.target.closest(".create-mcq-body").querySelector(".options").querySelectorAll("input[type='text']");
                                    let options_text = [];
                                    let correct_option_index;

                                    let id = getUniqueId();
                                    options.forEach((option, index) => {
                                        options_text.push({
                                            id: `${id}_${index}`,
                                            text: option.value,
                                        });
                                        if (option.closest(".option").querySelector("input[type='radio']").checked) correct_option_index = index;
                                    });

                                    if (correct_option_index == undefined) {
                                        popupAlert("Please select correct option");
                                        return;
                                    }

                                    let explanation = event.target.closest(".create-mcq-body").querySelector(".explanation-div textarea").value;

                                    let tags = [];

                                    let subject = event.target.closest(".create-mcq-body").querySelector(".subject-div .selected").textContent.toLowerCase();
                                    if (!subject) {
                                        popupAlert("Please select subject");
                                        return;
                                    }
                                    tags.push(subject);

                                    let new_mcq_tags = event.target.closest(".create-mcq-body").querySelector(".tags-div .tags-list").querySelectorAll(".tag-item .name");
                                    new_mcq_tags.forEach((tag) => {
                                        tags.push(tag.textContent.toLowerCase());
                                    });

                                    //let block_ids = "JNyeAoIpm::aFBzCUkrq";
                                    let block_ids = event.target.closest(".create-mcq-body").querySelector(".block-link-div input").value;
                                    /*
if (match) {
                                    [page_id, block_id] = match.slice(1, 3);
                                }
                                */
                                    // Check if the block_ids string is in the correct format
                                    block_ids = block_ids.split("::");
                                    //let match = block_ids.match(/^([a-zA-Z0-9]{9})::([a-zA-Z0-9]{9})$/);
                                    let page_id = block_ids[0]; //null;
                                    let block_id = block_ids[1]; //null;

                                    let linked_blocks = [];
                                    if (page_id && block_id) {
                                        linked_blocks.push({ page_id, block_id });
                                    }

                                    //Check if the youtube link is valid
                                    let youtube_link = event.target.closest(".create-mcq-body").querySelector(".video-link-div input.video-link").value;
                                    let youtube_time = event.target.closest(".create-mcq-body").querySelector(".video-link-div input.video-time").value;
                                    let video_obj = parseYoutubeLink(youtube_link, youtube_time);

                                    let external_link = event.target.closest(".create-mcq-body").querySelector(".external-link-div input").value.trim();

                                    let que_obj = {
                                        id: id,
                                        question: question,
                                        options: options_text,
                                        explanation: explanation,
                                        correct_option_index: correct_option_index,
                                        tags: tags,
                                        created_on: getCurrentDateTime(),
                                        created_by: user_login_data.userid,
                                        userid: user_login_data.userid,
                                        verified: false,
                                        linked_blocks: linked_blocks,
                                        verfication_status: 0,
                                        external_link: external_link,
                                        linked_videos: video_obj ? [video_obj] : [],
                                        created_at: new Date().toISOString(),
                                    };

                                    saveCreatedMcq(que_obj);
                                    // Add MCQ in the shared mcqs data

                                    // Add
                                }}
                            >
                                Create MCQ
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    async function saveCreatedMcq(que_obj) {
        try {
            let data_ref = database.ref(`esa_data/${exam}/shared_mcqs`);
            let data = await getDataFromFirebaseUsingRef(data_ref);

            data = data ? data : [];
            data.unshift(que_obj);
            await data_ref.set(data);
            console.log("New MCQ has been added in the shared mcqs data");

            // Add MCQ in the user mcqs data
            userdata.shared_mcqs = userdata.shared_mcqs ? userdata.shared_mcqs : [];
            userdata.shared_mcqs.unshift(que_obj.id);
            saveUserData();

            // Add MCQ in the shared mcqs array
            shared_mcqs = shared_mcqs ? shared_mcqs : [];
            shared_mcqs.unshift(que_obj);

            user_mcqs = user_mcqs ? user_mcqs : [];
            user_mcqs.unshift(que_obj.id);
            popupAlert("New MCQ has been created", 3, "green");
        } catch (error) {
            console.log(error);
            popupAlert("Error in saving new MCQ", 3, "red");
        }
    }

    function parseYoutubeLink(youtube_link, youtube_time) {
        // Regular expression to match a valid YouTube link and extract the video ID
        const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = youtube_link.match(youtubeRegex);

        if (!match) {
            // If the link is not valid, return null
            return null;
        }

        // Extract video ID
        const video_id = match[1];

        // Helper function to convert time string to seconds
        function timeToSeconds(time) {
            const timeParts = time.split(":").reverse();
            let seconds = 0;

            // Loop through time parts (ss, mm, hh if present)
            for (let i = 0; i < timeParts.length; i++) {
                let part = parseInt(timeParts[i], 10);
                if (isNaN(part)) return null; // Invalid time part
                seconds += part * Math.pow(60, i);
            }

            return seconds;
        }

        // Check if the link has a time parameter in the URL
        const url = new URL(youtube_link);
        let timeParam = url.searchParams.get("t") || youtube_time;

        // Validate time format if time parameter is provided
        let time_in_sec = 0;
        if (timeParam) {
            const validTimeFormat = /^(\d{1,2}:)?\d{1,2}:\d{2}$/;
            if (validTimeFormat.test(timeParam)) {
                time_in_sec = timeToSeconds(timeParam);
            } else {
                time_in_sec = parseInt(timeParam, 10); // support seconds only format like "t=90"
            }
        }

        return { video_id, time_in_sec };
    }

    let curr_que_index = 0;
    let filtered_ques = [];
    function nextQuestion() {
        ++curr_que_index;
        if (curr_que_index >= filtered_ques.length) curr_que_index = 0;
        openMcq(filtered_ques[curr_que_index]);
    }

    function filterMcqsBySubject(subject, event) {
        subject = subject.toLowerCase();
        let subject_div = event.target.closest(".subject-div");
        //let subject_divs = subject_div.querySelectorAll(".link");
        let active_subject = subject_div.querySelector(".text-blue-500");
        subject_div.querySelectorAll(".subject").forEach((subject) => {
            subject.classList.remove("font-bold");
        });
        if (active_subject) {
            if (active_subject == event.target) {
                event.target.classList.replace("text-blue-500", "text-gray-500");
                filtered_ques = que_data;
            } else {
                active_subject.classList.replace("text-blue-500", "text-gray-500");
                event.target.classList.replace("text-gray-500", "text-blue-500");
                filtered_ques = que_data.filter((que) => que.tags.includes(subject));
            }
        } else {
            event.target.classList.replace("text-gray-500", "text-blue-500");
            filtered_ques = que_data.filter((que) => que.tags.includes(subject));
        }
        let ele = subject_div.querySelector(".text-blue-500");
        if (ele) ele.classList.add("font-bold");
        curr_que_index = 0;
        openMcq(filtered_ques[0]);
    }
    function McqQuestionActionItemsHTML({ que }) {
        userdata.bookmarked_questions = userdata.bookmarked_questions ? userdata.bookmarked_questions : [];
        let is_bookmarked = userdata.bookmarked_questions.some((que) => que.id == que.id);
        return (
            <div className="question-action-items-inner flex flex-col  gap-2">
                <div className=" flex justify-start items-center gap-3">
                    {/* Share Question */}
                    <div
                        className="share-question flex justify-start items-center gap-2 border rounded-md px-2 py-1 cursor-pointer"
                        onClick={(event) => {
                            const currentUrl = window.location.href;

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
                                //takeScreenshot(que_div);
                            } else {
                                // Fallback for browsers that do not support Web Share API
                                copyToClipboard(currentUrl); // Copy URL to clipboard
                                popupAlert("Question Link copied");
                            }
                        }}
                    >
                        <i className=" fa-regular fa-share-nodes link"></i>
                        <span className="link">Share</span>
                    </div>

                    {/* Bookmark Question */}
                    <div
                        className={`bookmark-question ${is_bookmarked ? "bookmarked" : ""} flex justify-start items-center gap-2 border rounded-md px-2 py-1 cursor-pointer`}
                        onClick={(event) => {
                            let bookmark_div = event.target.closest(".bookmark-question");
                            if (bookmark_div.classList.contains("bookmarked")) {
                                bookmark_div.classList.remove("bookmarked");
                                userdata.bookmarked_questions = userdata.bookmarked_questions.filter((que) => que.id != que.id);
                                bookmark_div.children[0].className = "bi bi-bookmark"; //classList.replace("bi-bookmark", "bi-bookmark-check-f");
                                bookmark_div.children[1].textContent = "Bookmark";
                                popupAlert("Question removed from bookmarks");
                            } else {
                                bookmark_div.classList.add("bookmarked");
                                userdata.bookmarked_questions = userdata.bookmarked_questions ? userdata.bookmarked_questions : [];
                                userdata.bookmarked_questions.unshift(que);
                                bookmark_div.children[0].className = "bi bi-bookmark-check link"; //.replace("fa-regular", "fa-solid");
                                bookmark_div.children[1].textContent = "Bookmarked";
                                popupAlert("Question added to bookmarks");
                                //saveUserData();
                            }
                            saveUserData();
                        }}
                    >
                        <i className={` <i class="bi "></i> link ${is_bookmarked ? "bi-bookmark-check link" : "bi-bookmark"}`}> </i>
                        <span className="link">{is_bookmarked ? "Bookmarked" : "Bookmark"}</span>
                    </div>

                    {/* Report Question */}
                    <div
                        className="report-question flex justify-start items-center gap-2 border rounded-md px-2 py-1 cursor-pointer"
                        onClick={(event) => {
                            //event.target.closest(".bookmark-question").classList.toggle("active");
                            event.target.closest(".question-action-items-inner").querySelector(".report-question-message-section").classList.remove("hide");
                        }}
                    >
                        <i className="fa-regular fa-flag link"></i>
                        <span className="link">Report</span>
                    </div>
                </div>
                <div className="report-question-message-section hide flex flex-col items-center gap-2 w-full">
                    <textarea className="w-full p-2 m-2 border border-gray-400 rounded-md " placeholder="Report Reason"></textarea>
                    <div className="buttons w-full flex justify-end items-end gap-2">
                        <span
                            className="cancel-report-question link cursor-pointer mr-[25px] "
                            onClick={(event) => {
                                event.target.closest(".report-question-message-section").classList.add("hide");
                            }}
                        >
                            cancel
                        </span>
                        <button
                            className="report-question bg-blue-500 text-white rounded-md px-2 py-1 cursor-pointer "
                            onClick={(event) => {
                                popupAlert("MCQ has been reported. Thanks for your response");
                                event.target.closest(".report-question-message-section").classList.add("hide");
                            }}
                        >
                            Report
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    async function deleteSharedMcq(id) {
        popupAlert("Deleting MCQ disabled for now", 3, "yellow");
        return;
        let user_ref = database.ref(`esa_data/${exam}/data/shared_mcqs`);
        user_ref.once("value").then(function (snapshot) {
            let obj = snapshot.val();

            //let index = obj.findIndex((q) => q.id == id);
            //obj.splice(index, 1);
            obj = [];
            database.ref(`esa_data/${exam}/data/shared_mcqs`).set(obj);
            popupAlert("Question has been deleted", 3, "red");
        });
    }
    function GetMcqDiv({ que, type, index, selected_option_id }) {
        //que = que.que ? que.que : que;
        que = que.id ? que : getQuestionById(que);

        return (
            <div>
                <div id={que.id} className="que-div w-full flex flex-col gap-2 px-3 py-2">
                    <div className="question py-2 text-md flex justify-start items-baseline gap-2">
                        <span className="text-md font-bold que-num w-[30px] hide"> {index ? `Q${index}.` : "Q."} </span>
                        <div className="text-md font-bold flex-1 flex flex-wrap" dangerouslySetInnerHTML={{ __html: getHTMLFormattedText(que.question) }}></div>
                    </div>

                    <div className="options flex flex-col gap-2">
                        {que.options.map((option, index) => (
                            <div
                                id={`${option.id}`}
                                className={`flex justify-start  items-start gap-2  cursor-pointer option border bg-gray-100 rounded-md p-2  
                        ${option.text.indexOf("#ans") !== -1 || que.correct_option_id == index ? "answer" : ""}  
                        ${selected_option_id == option.id ? "selected" : ""} 
                        ${selected_option_id == option.id && (option.text.indexOf("#ans") !== -1 || que.correct_option_id == index) ? "correct" : ""}    
                        ${selected_option_id == option.id && (option.text.indexOf("#ans") === -1 || que.correct_option_id !== index) ? "wrong " : ""} 
                        ${selected_option_id != undefined && selected_option_id != option.id && (option.text.indexOf("#ans") !== -1 || que.correct_option_id == index) ? "correct " : ""}  
                        ${selected_option_id ? "disabled" : ""} `}
                                key={index}
                                onClick={(event) => checkAnswer(event, que, type)}
                            >
                                <span className="text-sm option-index opacity-25 ">{index + 1}.</span>
                                <span className="text-sm option-text">{option.text.replace("#ans", "")}</span>
                                <span className="text-sm percentage-attempted"></span>
                            </div>
                        ))}
                        <div className="tags  border-t-2 mt-5 hide"></div>
                        <div className="exam-info hide"></div>
                        <div className="explanation hide"></div>
                        <div className="question-action-items hide"></div>
                        <div>
                            {type == "daily" ? (
                                <span
                                    className="link cursor-pointer   pt-2 inline-block  w-auto"
                                    onClick={(event) => {
                                        openMcq(que, null, "daily", selected_option_id, index + 1);
                                        closeOverlay(event);
                                    }}
                                >
                                    Open in main page
                                </span>
                            ) : (
                                ""
                            )}
                        </div>

                        <div className="mcq-comments-section w-full h-full block ">{getMCQCommentSection(que)}</div>
                    </div>
                </div>
            </div>
        );
    }

    async function checkAnswer(event, que, type) {
        let question_id = event.target.closest(".que-div").id;
        let options_div = event.target.closest(".options");
        let option_ele = event.target.closest(".option");
        let selected_option_id = option_ele.id;

        let selected_option = event.target;
        let correct_option_id = options_div.querySelector(".answer").id;

        let options = options_div.querySelectorAll(".option");

        if (type == "mock") {
            let index = parseInt(option_ele.closest(".question-div").id);
            option_ele.classList.toggle("selected");
            if (!options_div.querySelector(".selected")) {
                event.target.closest(".mock-overlay").querySelectorAll(".dot")[index].classList.remove("selected");
                return;
            }

            options.forEach((option) => {
                option.classList.remove("selected");
            });
            option_ele.classList.add("selected");
            event.target.closest(".mock-overlay").querySelectorAll(".dot")[index].classList.add("selected");

            return;
        }

        let explanation_icon = event.target.closest(".mcq-div").querySelector(".bi-file-text");
        if (que.explanation && que.explanation.trim() != "" && explanation_icon) explanation_icon.classList.remove("hide");

        let linked_block_icon = event.target.closest(".mcq-div").querySelector(".linked-block-icon");
        if (que.linked_blocks && que.linked_blocks.length > 0 && linked_block_icon) linked_block_icon.classList.remove("hide");

        let external_link_icon = event.target.closest(".mcq-div").querySelector(".external-link-icon");
        if (que.external_link && que.external_link.trim() != "" && external_link_icon) external_link_icon.classList.remove("hide");

        let linked_video_icon = event.target.closest(".mcq-div").querySelector(".video-icon");
        if (que.linked_videos && que.linked_videos.length > 0 && linked_video_icon) linked_video_icon.classList.remove("hide");

        let comments = await getMCQCommentsObject(que);
        let comment_icon = event.target.closest(".mcq-div").querySelector(".comment-icon");
        if (comment_icon) {
            comment_icon.classList.remove("hide");
            comment_icon.querySelector(".comment-count").textContent = comments.length;
        }

        option_ele.classList.add("selected");

        options.forEach((option) => {
            if (option == option_ele && !option_ele.classList.contains("answer")) {
                option.classList.add("wrong");
            }
            if (option.classList.contains("answer")) {
                option.classList.add("correct");
            }
            option.classList.add("disabled");
        });

        if (option_ele.classList.contains("selected") && option_ele.classList.contains("answer")) blastCrackers();

        let id = que.id;
        let user_ref = database.ref(`${exam}/questionInfo/${id}`);
        let is_online = navigator.onLine;
        if (is_online) {
            user_ref.once("value").then(function (snapshot) {
                let obj = snapshot.val();

                obj = obj ? obj : { options: [] };

                let option_divs = event.target.closest(".options").querySelectorAll(".option");
                let selected_option_div = event.target.closest(".options").querySelector(".selected");

                if (obj.options.length == 0) {
                    option_divs.forEach((option_div, index) => {
                        obj.options.push(0);
                        if (selected_option_div == option_div) obj.options[index] = 1;
                    });
                } else {
                    option_divs.forEach((option_div, index) => {
                        if (selected_option_div == option_div) obj.options[index] = obj.options[index] + 1;
                    });
                }

                database.ref(`${exam}/questionInfo/${id}`).set(obj);

                let totalResponses = obj.options.reduce((acc, curr) => acc + curr, 0);

                option_divs.forEach((option_div, index) => {
                    let percentage_div = option_div.querySelector(".percentage-attempted");
                    if (percentage_div) {
                        let percentage = (obj.options[index] / totalResponses) * 100;
                        let roundedPercentage = Math.round(percentage); // Round to nearest integer
                        percentage_div.textContent = roundedPercentage + "%";
                    }
                });

                let span = document.createElement("span");
                span.className = "total-responses text-gray-500";
                span.textContent = `Total Responses: ${totalResponses}`;
                event.target.closest(".options").appendChild(span);
            });
        }

        let obj = {
            id: que.id,
            selected_option_id: option_ele.id,
            correct_option_id: correct_option_id,
        };
        addMcqToDailyPractisedQuestions(obj);
    }

    function openMcq(que, target, type, selected_option_id, index) {
        let ele = document.querySelector(".mcq-full-screen-overlay");
        if (ele) ele.remove();
        que = que.id ? que : getQuestionById(que);
        openMCQInFullScreen(que);
        return;

        target = target ? target : document.querySelector(".page.mcq .que-text");
        ReactDOM.render(<GetMcqDiv que={que} type={type} index={index} selected_option_id={selected_option_id} />, target);

        if (selected_option_id) {
            target.querySelectorAll(".option").forEach((opt) => {
                opt.classList.add("disabled");
            });
        } else {
            target.querySelectorAll(".option").forEach((opt) => {
                opt.classList.remove("selected");
                opt.classList.remove("correct");
                opt.classList.remove("wrong");
                opt.classList.remove("disabled");
            });
        }

        let tags_div = target.querySelector(".tags");
        tags_div.classList.add("hide");
        if (!type || type != "mock") {
            tags_div.classList.remove("hide");
            ReactDOM.render(<McqTagsHTML que={que} />, tags_div);
        }

        let exam_info_div = target.querySelector(".exam-info");
        exam_info_div.classList.add("hide");
        if ((!type || type != "mock") && que.exams && que.exams.length > 0) {
            exam_info_div.classList.remove("hide");
            ReactDOM.render(<McqExamsHTML que={que} />, exam_info_div);
        }

        let question_action_items_div = target.querySelector(".question-action-items");
        question_action_items_div.classList.add("hide");
        if (!type || type != "mock") {
            question_action_items_div.classList.remove("hide");
            ReactDOM.render(<McqQuestionActionItemsHTML que={que} />, question_action_items_div);
        }

        if (!type) {
            let url = window.location.href; // Get the current URL
            let ind = url.indexOf("#"); // Find the position of '#'

            if (url.includes("mcq")) {
                let abc = url.substring(0, ind !== -1 ? ind : url.length);
                window.location.href = abc + `#/${exam}/mcq/${que.id}`;
            }
        }
    }
    function addMcqTags(que_div, que) {
        let tags_div = document.createElement("div");
        tags_div.className = "tags flex justify-start items-center gap-2 max-w-full overflow-x-scroll";
        que_div.appendChild(tags_div);
    }

    function McqTagsHTML({ que }) {
        return (
            <div className={`tags-inner  que-tags inline-block p-2 items-center ${is_mobile ? "max-w-[80vw]" : "max-w-full"} overflow-x-scroll whitespace-nowrap`}>
                <span className="text-sm inline-block px-2 py-1 hide">Category:</span>
                {que.tags.map((tag, index) => {
                    let ignore_tags = [exam].concat(subjects[exam]); //["ssc", "general studies", "english", "aptitude", "reasoning"];
                    if (ignore_tags.includes(tag.toLocaleLowerCase())) return;
                    return (
                        <span className=" que-tag tag inline-block text-no-wrap border-0 mx-2 bg-blue-50 rounded-md   link px-2 py-1 cursor-pointer" key={index} onClick={(event) => filterMcqsByTag(tag, event)}>
                            {tag.toLowerCase()}
                        </span>
                    );
                })}
            </div>
        );
    }

    function McqExamsHTML({ que }) {
        return (
            <div className={`exam-inner inline-block p-2  items-center ${is_mobile ? "max-w-[80vw]" : "max-w-full"} overflow-x-scroll whitespace-nowrap`}>
                <span className="text-sm inline-block px-2 py-1">Asked in:</span>

                {que.exams.map((exam, index) => {
                    return (
                        <span className="exam inline-block text-no-wrap borde-0 mx-2 bg-gray-200 rounded-md  text-sm text-gray px-2 py-1 cursor-pointer" key={index} onClick={(event) => filterMcqsByExam(exam, event)}>
                            {exam}
                        </span>
                    );
                })}
            </div>
        );
    }

    function filterMcqsByExam(exam, event) {
        filtered_ques = que_data.filter((que) => que.exams && que.exams.includes(exam));
        curr_que_index = 0;
        openMcq(filtered_ques[0]);
        let filter_message = `Filtered:  ${filtered_ques.length} mcqs found for exam "${capitalFirstLetterOfEachWord(exam)}"`;
        setFilterMcqsMessage(filter_message);
    }

    function openTab(event, tabName) {
        tabName = event.target ? tabName : event;

        let tabs = document.querySelectorAll(".main.tabs.bottom  .tab");

        loadTabsTopSection(tabName);

        tabs.forEach((tab) => {
            tab.classList.replace("text-blue-700", "text-gray-700");
            tab.classList.remove("bg-blue-100");
            tab.classList.remove("font-bold");

            if (tab.classList.contains(tabName)) {
                tab.classList.replace("text-gray-700", "text-blue-700");
                tab.classList.add("bg-blue-100");
                tab.classList.add("font-bold");
            }
        });

        //let tabContainers = document.querySelectorAll(".main .tab-container");
        let tabContainers = document.querySelectorAll(".main .page");
        tabContainers.forEach((container) => {
            container.classList.add("hide");

            if (container.classList.contains(tabName)) {
                container.classList.remove("hide");
            }
        });

        setURL(tabName);
        if (tabName == "mock") {
            let ele = document.querySelector(".mock-overlay.hide");
            if (ele) openOverlay("mock-overlay");
        }
    }

    function loadTabsTopSection(tabName) {
        let top_section = document.querySelector(".main.tabs.top");
        //top_section.innerHTML = "";
        ReactDOM.render(<TabsTopSectionHTML tabName={tabName} />, top_section);
    }
    function TabsTopSectionHTML({ tabName }) {
        document.querySelector(".main.tabs.top").classList.remove("hide");
        if (tabName == "home") {
            //document.querySelector(".main.tabs.top").classList.add("hide");
            return (
                <div className="flex justify-between items-center w-full">
                    <span className="text-xl font-bold">HOME</span>
                    <div className="icons flex justify-end items-center gap-2"></div>
                </div>
            );

            return (
                <div className="flex flex-col justify-start items-start w-full gap-1">
                    <div className="flex justify-start items-start gap-2 w-full">
                        <span className=" text-gray-500 ">Signed in as "{user_login_data.display_name}"</span>
                        <span
                            className="sign-out-btn cursor-pointer link"
                            onClick={() => {
                                localStorage.removeItem("esa_user_login_data", null);
                                popupAlert("User signed out");
                                location.reload(true);
                            }}
                        >
                            sign out
                        </span>
                    </div>

                    <div className="flex  justify-start items-start gap-2 w-full">
                        <span>Exam: {exam.toUpperCase()}</span>
                    </div>
                </div>
            );
        }

        if (tabName == "mcq") {
            return (
                <div className="flex justify-between items-center w-full">
                    <span className="text-xl font-bold">MCQs</span>
                    <div className="icons flex justify-end items-center gap-2">
                        <i class="bi bi-search text-xl flex justify-center items-center mr-[5px] cursor-pointer" onClick={() => searchMcqs()}></i>
                        <i class="bi bi-funnel text-xl flex justify-center items-center mr-[5px] cursor-pointer" onClick={() => openOverlay("filter-mcq-overlay")}></i>
                        <i class="hide bi bi-plus-circle text-xl ml-auto flex justify-center items-center mr-[5px] cursor-pointer" onClick={() => createMCQs()}></i>
                        <i
                            class="bi bi-bookmark-check text-xl flex justify-center items-center mr-[5px] cursor-pointer"
                            onClick={(event) => {
                                userdata.bookmarked_questions = userdata.bookmarked_questions ? userdata.bookmarked_questions : [];
                                if (userdata.bookmarked_questions.length == 0) {
                                    popupAlert("No bookmarked questions");
                                    return;
                                }

                                let overlay_div = document.createElement("div");
                                overlay_div.className = `me-overlay bookmarked-questions-overlay h-screen`;
                                document.querySelector(".me-overlays").appendChild(overlay_div);
                                ReactDOM.render(<BookmarkedQuestionsOverlayHTML />, overlay_div);
                            }}
                        ></i>
                        <i class="bi bi-calendar-date text-xl flex justify-center items-center mr-[5px] cursor-pointer" onClick={() => openDailyPractiseMcqs("")}></i>
                        <i class="bi bi-shuffle text-xl flex justify-center items-center mr-[5px] cursor-pointer" onClick={() => reloadMCQs()}></i>
                        <i class="bi bi-plus-circle text-xl flex justify-center items-center mr-[5px] cursor-pointer" onClick={() => createMCQs()}></i>
                    </div>
                </div>
            );
        }

        if (tabName == "notes") {
            return (
                <div className="flex justify-between items-center w-full">
                    <span className="text-xl font-bold">Notes</span>
                    <div className="icons flex justify-end items-center gap-2">
                        <i class="bi bi-search text-xl flex justify-center items-center mr-[5px] cursor-pointer" onClick={() => searchInNotesLoadOverlay()}></i>
                        <i class="bi bi-list text-xl flex justify-center items-center mr-[5px] cursor-pointer" onClick={() => openNotesChapterPageOrChapterListOverlay()}></i>
                        <i class="hide bi bi-play-btn text-xl flex justify-center items-center mr-[5px] cursor-pointer"></i>
                        <i class="hide bi bi-file-earmark-pdf text-xl flex justify-center items-center mr-[5px] cursor-pointer" onClick={() => openPDFPage()}></i>
                        <i
                            class="hide bi bi-bookmark-check text-xl flex justify-center items-center mr-[5px] cursor-pointer"
                            onClick={() => {
                                popupAlert("Bookmarked Note Items");
                            }}
                        ></i>
                        <i
                            class="hide bi bi-pencil text-xl ml-auto flex justify-center items-center mr-[5px] cursor-pointer"
                            onClick={() => {
                                popupAlert("Handwritten Notes Items");
                            }}
                        ></i>
                        <i class="hide bi bi-plus-circle text-xl flex justify-center items-center mr-[5px] cursor-pointer"></i>
                    </div>
                </div>
            );
        }

        if (tabName == "mock") {
            return (
                <div className="flex justify-between items-center w-full">
                    <span className="text-xl font-bold">Mocks</span>
                    <div className="icons flex justify-end items-center gap-2">
                        <i class="new-mock bi bi-plus-circle-dotted text-xl flex justify-center items-center mr-[5px] cursor-pointer" onClick={(event) => switchMockTabs("new-mock", event)}></i>
                        <i class="static-mocks bi bi-list-task text-xl flex justify-center items-center mr-[5px] cursor-pointer" onClick={(event) => switchMockTabs("static-mocks", event)}></i>
                        <i
                            class="mock-history bi bi-clock-history text-xl flex justify-center items-center mr-[5px] cursor-pointer"
                            onClick={(event) => {
                                switchMockTabs("mock-history", event);
                                document.querySelector(".tab-container.mock-history .mock-history-list").innerHTML = "";
                                if (!userdata.mock_tests.length) {
                                    document.querySelector(".tab-container.mock-history .mock-history-list").textContent = "No Mock Test History";
                                    return;
                                }
                                userdata.mock_tests.forEach((mock) => {
                                    let div = document.createElement("div");
                                    div.className = "mock-history-item w-full h-auto my-2";
                                    document.querySelector(".tab-container.mock-history .mock-history-list").appendChild(div);
                                    ReactDOM.render(<MockTestHistoryItemHTML mock={mock} />, div);
                                });
                            }}
                        ></i>
                    </div>
                </div>
            );
        }
        if (tabName == "user") {
            return (
                <div className="search-div flex justify-center items-center gap-2 w-full  text-gray-500 border-2 rounded-full">
                    <i className="bi bi-person"></i>
                    <input type="text" className="search-input focus-outline-none" placeholder="Search users" />
                </div>
            );
        }
    }

    function openPDFPage() {
        openInMainNotesPage("pdf");
    }

    function openInMainNotesPage(type) {
        document.querySelectorAll(".main-notes-page > div").forEach((div) => {
            div.classList.add("hide");
        });
        document.querySelector(`.main-notes-page > div.${type}`).classList.remove("hide");
    }

    function setURL(tabName) {
        let url = window.location.href;
        let ind = url.indexOf("#");
        if (ind != -1) {
            url = url.substring(0, ind - 1);
        }
        window.location.href = url + `/#/${exam.toLocaleLowerCase()}/${tabName}`;
        if (tabName == "notes") {
            debugger;
            let id = document.querySelector(".main-notes-page .page-title").id;
            if (id && id != undefined && id != "") window.location.href = window.location.href + `/${id}`;
        }
    }

    //loadHomePage();

    function openNotesChapterPageOrChapterListOverlay() {
        let ele = document.querySelector(".main-notes-page > div.chapter.hide");
        if (ele) {
            openInMainNotesPage("chapter");
        } else {
            openOverlay("note-chapter-list-overlay");
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

    function openDailyPractiseMcqs(url) {
        let overlay = document.querySelector(".me-overlay.daily-practise-mcqs-overlay");
        if (!overlay) {
            overlay = document.createElement("div");
            overlay.className = `me-overlay daily-practise-mcqs-overlay`;
            document.querySelector(".me-overlays").appendChild(overlay);
            ReactDOM.render(<DailyPractiseMcqsOverlayHTML />, overlay);
        }
        openOverlay("daily-practise-mcqs-overlay");
    }

    function DailyPractiseMcqsOverlayHTML__() {
        userdata.daily_practise_questions = userdata.daily_practise_questions ? userdata.daily_practise_questions : [];
        return (
            <div className="daily-practise-mcqs-overlay-inner max-h-screen w-full bg-white">
                <div className="header flex justify-between items-center gap-2 px-4 py-2">
                    <span className="text-[1.3em] font-bold">Daily Practise MCQs</span>
                    <i className="bi bi-x-circle text-xl flex justify-center items-center mr-[5px] cursor-pointer" onClick={(event) => closeOverlay(event)}></i>
                </div>
                <div className="block max-w-full overflow-x-auto px-1 py-1 border-b-2">
                    <div className="flex space-x-4 text-blue-500 py-2 px-2 text-sm">
                        {userdata.daily_practise_questions.map((item, index) => {
                            return (
                                <div
                                    key={index} // or use a unique identifier from your item
                                    className="inline-flex items-center whitespace-nowrap bg-gray-100 rounded-md p-2 min-w-[fit-content] cursor-pointer"
                                    onClick={() => {
                                        popupAlert(`Opening Daily Practise MCQs for ${item.date}`, 5, "bg-blue-500");
                                    }}
                                >
                                    {item.date}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }

    function DailyPractiseMcqsOverlayHTML() {
        userdata.daily_practise_questions = userdata.daily_practise_questions ? userdata.daily_practise_questions : [];
        setTimeout(() => {
            return;
            let item = userdata.daily_practise_questions[0];
            let total_questions = item.questions.length;
            let total_correct = 0;
            let total_wrong = 0;
            item.questions.forEach((que) => {
                if (que.correct_option_id == que.selected_option_id) total_correct++;
                else total_wrong++;
            });
            loadDailyPractiseMcqs(item, total_questions, total_correct, total_wrong);
        }, 1000);
        return (
            <div className="daily-practise-mcqs-overlay-inner h-screen w-full bg-white">
                <div className="header flex justify-between items-center gap-2 px-4 py-2">
                    <span className="text-[1.3em] font-bold">Daily Practised MCQs</span>
                    <i
                        className="bi bi-x-circle text-xl flex justify-center items-center mr-[5px] cursor-pointer"
                        onClick={(event) => {
                            event.target.closest(".me-overlay").remove();
                        }}
                    ></i>
                </div>
                <div className="block max-w-full overflow-x-auto px-1 py-1 border-b-2">
                    <div className="flex space-x-4 text-blue-500 py-2 px-2 text-sm">
                        {userdata.daily_practise_questions.map((item, index) => {
                            let date = convertDateTo_Aug_10_2024_Format(item.date);
                            let total_questions = item.questions.length;
                            let total_correct = 0;
                            let total_wrong = 0;

                            item.questions.forEach((que) => {
                                if (que.correct_option_id === que.selected_option_id) total_correct++;
                                else total_wrong++;
                            });

                            return (
                                <div
                                    key={index} // or use a unique identifier from your item
                                    className="inline-flex items-center whitespace-nowrap border border-gray-200  bg-gray-100 rounded-md p-2 min-w-[fit-content] cursor-pointer"
                                    onClick={(event) => loadDailyPractiseMcqs(event, item, total_questions, total_correct, total_wrong)}
                                >
                                    <div className="flex flex-col justify-center items-center gap-2">
                                        <span className="text-gray-700 font-bold">{date}</span>
                                        <div className="flex justify-center items-center gap-2">
                                            <span className="bg-gray-300 text-gray-500 px-2 rounded-md text-[0.9em]">{total_questions}</span>
                                            <span className="bg-red-200 text-red-500 px-2 rounded-md text-[0.9em]">{total_correct}</span>
                                            <span className="bg-green-200 text-green-500 px-2 rounded-md text-[0.9em]">{total_wrong}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="que-section"></div>
            </div>
        );
    }

    function loadDailyPractiseMcqs(event, item, total_questions, total_correct, total_wrong) {
        let div = document.querySelector(".daily-practise-mcqs-overlay-inner").querySelector(".que-section");
        ReactDOM.render(<LoadDailyPractiseMcqsHTML item={item} total_questions={total_questions} total_correct={total_correct} total_wrong={total_wrong} />, div);
    }

    function LoadDailyPractiseMcqsHTML({ item, total_questions, total_correct, total_wrong }) {
        return (
            <div className="load-daily-practise-mcqs-html flex flex-col justify-center items-center gap-2">
                <div className="header flex justify-center items-center gap-2 py-2 w-full px-4">
                    <span className="text-gray-700 font-bold text-[1.3em] ">{convertDateTo_Aug_10_2024_Format(item.date)}</span>

                    <div className="flex justify-center items-center gap-2 ml-auto">
                        <span className="bg-gray-200 text-gray-500 font-bold ml-auto p-1 rounded-md cursor-pointer" onClick={(event) => filterDailyPractiseMcqs(event, "all")}>
                            {total_questions < 10 ? "0" + total_questions : total_questions}
                        </span>
                        <span className="bg-green-200 text-green-500 font-bold p-1 rounded-md cursor-pointer" onClick={(event) => filterDailyPractiseMcqs(event, "correct")}>
                            {total_correct < 10 ? "0" + total_correct : total_correct}
                        </span>
                        <span className="bg-red-200 text-red-500 font-bold p-1 rounded-md cursor-pointer" onClick={(event) => filterDailyPractiseMcqs(event, "wrong")}>
                            {total_wrong < 10 ? "0" + total_wrong : total_wrong}
                        </span>
                    </div>
                </div>
                <div className="que-list h-[calc(100vh-170px)] overflow-y-scroll w-full">
                    {item.questions.map((que, index) => {
                        let quess = getQuestionById(que.id);
                        return (
                            <div className={`question-div ${que.selected_option_id == que.correct_option_id ? "correct" : "wrong"}`} key={index} id={index}>
                                {GetMCQHTML({ que: quess, type: "pre-mock-test", index: index + 1, selected_option_id: que.selected_option_id, is_show_icons: true })}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    function filterDailyPractiseMcqs(event, type) {
        let questions = event.target.closest(".daily-practise-mcqs-overlay-inner").querySelectorAll(".question-div");
        if (type == "all") {
            questions.forEach((que) => {
                que.classList.remove("hide");
            });
            return;
        }
        if (type == "correct") {
            questions.forEach((que) => {
                que.classList.add("hide");
                if (que.classList.contains("correct")) que.classList.remove("hide");
            });
        }
        if (type == "wrong") {
            questions.forEach((que) => {
                que.classList.add("hide");
                if (que.classList.contains("wrong")) que.classList.remove("hide");
            });
        }
        event.target.closest(".daily-practise-mcqs-overlay-inner").querySelector(".que-list .question-div").scrollIntoView({ behavior: "auto" });
    }

    function DailyPractiseMcqsOverlayHTML_1() {
        return (
            <div className="daily-practise-mcqs-overlay-inner max-h-screen w-full bg-white">
                <div className="header flex justify-between items-center gap-2 px-4 py-2">
                    <span className="text-[1.3em] font-bold">Daily Practise MCQs</span>
                    <i class="bi bi-x-circle text-xl flex justify-center items-center mr-[5px] cursor-pointer" onClick={(event) => closeOverlay(event)}></i>
                </div>
                <div class="block max-w-full overflow-x-auto px-1 py-1 border-b-2">
                    <div class="flex space-x-4 text-blue-500  py-2 px-2 text-sm">
                        {userdata.daily_practise_mcqs.map((item, index) => {
                            let date = convertDateTo_Aug_10_2024_Format(item.date);
                            let total_questions = item.total_questions;
                            let total_correct = 0;
                            let total_wrong = 0;
                            item.questions.forEach((que) => {
                                if (que.correct_option_id == que.selected_option_id) total_correct++;
                                else total_wrong++;
                            });
                            return (
                                <div class="inline-flex items-center whitespace-nowrap border border-blue-500 rounded-md p-2 min-w-[fit-content] cursor-pointer" onClick={() => searchInNotesLoadOverlay()}>
                                    <div className="flex flex-col justify-center items-center gap-2">
                                        <span>{date}</span>
                                        <div className="flex justify-center items-center gap-2">
                                            <span>{total_questions}</span>
                                            <span>{total_correct}</span>
                                            <span>{total_wrong}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }

    async function openPageBasedOnURL(url) {
        //url = url ? url : window.location.href;
        url = load_url ? load_url : url;
        let url_items = parseURL(url);

        if (url_items.length) {
            exam = url_items[0];
            localStorage.setItem("esa_exam", exam);
            let page = url_items[1];
            page = page == "question" ? "mcq" : page;
            openTab(page);
            debugger;
            if (page == "mcq") {
                let que_id = url_items[2];
                if (que_id) {
                    let que = getQuestionById(que_id);
                    setTimeout(() => {
                        openMCQInFullScreen(que);
                    }, 1000);
                }
                return;
            } else if (page == "notes") {
                let page_id = url_items[2];
                let block_id = url_items[3];
                if (page_id && block_id) {
                    openNotesPage(page_id, block_id, null);
                } else {
                    openNotesPage(page_id, null, null);
                }
            }

            //openPage(page);
        }
    }

    async function loadData() {
        exam = exam.toLowerCase();

        // First try to get the userdata from local storage if not found then get it from firebase
        userdata = localStorage.getItem(`esa_${exam}_${user_login_data.userid}_userdata`);
        if (userdata) {
            userdata = JSON.parse(userdata);
        } else {
            await getUserData();
            localStorage.setItem(`esa_${exam}_${user_login_data.userid}_userdata`, JSON.stringify(userdata));
        }

        // app data
        let app_data = localStorage.getItem(`esa_data_${exam}`);
        if (app_data) {
            app_data = JSON.parse(app_data);
        } else {
            app_data = {
                all_users_login_info: [],
                roam_data: {},
                mcqs: [],
                shared_mcqs: [],
            };

            let data = await getAllUsersLoginInfo();
            app_data.all_users_login_info = data ? data : [];

            data = await getRoamData();
            app_data.roam_data = data ? data : {};

            data = await getMCQsData();
            app_data.mcqs = data ? data : [];

            data = await getSharedMCQsData();
            app_data.shared_mcqs = data ? data : [];

            localStorage.setItem(`esa_data_${exam}`, JSON.stringify(app_data));
        }

        // get all users info
        all_users_login_info = app_data.all_users_login_info ? app_data.all_users_login_info : [];

        // get roam data
        let data = app_data.roam_data ? app_data.roam_data : {};
        que_data = data.questions ? data.questions : [];
        notes_data = data.notes ? data.notes : [];
        tags_list = data.tags ? data.tags : [];
        static_mocks = data.mocks ? data.mocks : [];
        handnotes_data = data.handnotes ? data.handnotes : [];
        pdf_data = data.pdfs ? data.pdfs : [];
        vocab_data = data.vocab ? data.vocab : [];

        // get all mcqs
        let mcqs_data = app_data.mcqs ? app_data.mcqs : [];
        que_data = mcqs_data;
        empty_question_mcqs = que_data.filter((q) => q.question.trim() == "");
        que_data = que_data.filter((q) => q.question.trim() != "");

        // get all shared mcqs
        let shared_mcqs_data = app_data.shared_mcqs ? app_data.shared_mcqs : [];
        shared_mcqs = [];
        Object.values(shared_mcqs_data).forEach((mcq) => {
            shared_mcqs.push(mcq);
        });

        //Get users mcqs
        shared_mcqs.forEach((mcq) => {
            if (mcq.userid === user_login_data.userid) {
                if (mcq.options[0].id) {
                    user_mcqs.push(mcq.id);
                }
            }
        });
    }

    let all_users_login_info = null;
    async function getAllUsersLoginInfo() {
        let ref = database.ref(`esa_data/${exam}/users_login_info`);
        let data = await getDataFromFirebaseUsingRef(ref);

        //data = data ? data : [];
        all_users_login_info = [];
        Object.values(data).forEach((info) => {
            all_users_login_info.push(info);
        });

        console.log(`esa: all_users_login_info fetched for ${exam}`);
        return all_users_login_info;
    }

    async function getRoamData() {
        let ref = database.ref(`esa_data/${exam}/roam_data`);
        let data = await getDataFromFirebaseUsingRef(ref);
        data = data ? data : {};
        console.log(`esa: roam_data fetched for ${exam}`);
        return data;
    }

    async function getMCQsData() {
        let ref = database.ref(`esa_data/${exam}/mcqs`);
        let data = await getDataFromFirebaseUsingRef(ref);
        data = data ? data : [];
        console.log(`esa: mcqs fetched for ${exam}`);
        return data;
    }

    async function getSharedMCQsData() {
        let ref = database.ref(`esa_data/${exam}/shared_mcqs`);
        let data = await getDataFromFirebaseUsingRef(ref);
        data = data ? data : [];
        console.log(`esa: shared_mcqs fetched for ${exam}`);
        return data;
    }

    async function getDataFromFirebaseUsingRef(ref) {
        let snapshot = await ref.once("value");
        let obj = snapshot.val();
        return obj;
    }

    let users_login_info = null;
    async function getAllUsersInfo() {
        //if (all_users_info) return;
        exam = exam.toLowerCase();
        let data_ref = database.ref(`esa_data/${exam}/users_login_info`);
        users_login_info = await getDataFromFirebaseUsingRef(data_ref);

        users_login_info = users_login_info ? users_login_info : [];

        console.log(`esa: all_users_info fetched for ${exam} = ${users_login_info}`);
    }

    async function lastDataLoaded() {}

    //openPageBasedOnURL();
    function getQuestionById(que_id) {
        let all_ques = que_data.concat(shared_mcqs);
        let que = all_ques.find((que) => que.id == que_id);
        return que;
    }

    let que_data = null,
        shared_ques = null,
        esa_ques = null,
        pdf_data = null,
        handnotes_data = null,
        all_ques = null,
        follower_ques = null,
        notes_data = null,
        tags_list = null,
        static_mocks = null,
        userdata = null,
        app_level_data = null,
        vocab_data = null,
        user_mcqs = [],
        shared_mcqs = [];

    const handler = {
        set(target, property, value) {
            console.log(`Setting ${property} to ${value}`);
            target[property] = value;
            return true; // Indicate success
        },
    };

    shared_mcqs = new Proxy(shared_mcqs, handler);
    let mcqs_firebase = [];
    let all_mcqs_ids = [];
    let empty_question_mcqs = [];
    let test_mcqs = [];
    let testing = false;
    async function getDataFromFirebase() {
        var is_online = navigator.onLine;
        if (!is_online) {
            popupAlert("You are offline, Your data may not be updated data..", 5, "bg-red-500");
            return;
        }

        // Get roam shared data from firebase
        let data_ref = database.ref(`esa_data/${exam}/roam_data`);
        var data = await getDataFromFirebaseUsingRef(data_ref);
        data = data ? data : {};

        /*que_data = data.ques_data ? data.ques_data : [];
    notes_data = data.notes_data ? data.notes_data : [];
    tags_list = data.tags_list ? data.tags_list : [];
    static_mocks = data.mocks_data ? data.mocks_data : [];
    handnotes_data = data.handnotes ? data.handnotes : [];
    pdf_data = data.pdfs ? data.pdfs : [];
    vocab_data = data.vocab_data ? data.vocab_data : [];
    */
        que_data = data.questions ? data.questions : [];
        notes_data = data.notes ? data.notes : [];
        tags_list = data.tags ? data.tags : [];
        static_mocks = data.mocks ? data.mocks : [];
        handnotes_data = data.handnotes ? data.handnotes : [];
        pdf_data = data.pdfs ? data.pdfs : [];
        vocab_data = data.vocab ? data.vocab : [];

        let mcqs_data = await getDataFromFirebaseUsingRef(database.ref(`esa_data/${exam}/mcqs`));
        que_data = mcqs_data ? mcqs_data : [];
        /*Object.values(mcqs_data).forEach((mcq) => {
        que_data.push(mcq);
    });*/
        empty_question_mcqs = que_data.filter((q) => q.question.trim() == "");
        que_data = que_data.filter((q) => q.question.trim() != "");

        let shared_mcqs_data = await getDataFromFirebaseUsingRef(database.ref(`esa_data/${exam}/shared_mcqs`));
        shared_mcqs = [];
        Object.values(shared_mcqs_data).forEach((mcq) => {
            shared_mcqs.push(mcq);
            //all_mcqs_ids.push(mcq.id);
        });

        all_mcqs_ids = await getDataFromFirebaseUsingRef(database.ref(`esa_data/${exam}/all_mcq_ids`));

        que_data = shared_mcqs.concat(que_data);
        esa_ques = que_data;

        test_mcqs = await getDataFromFirebaseUsingRef(database.ref(`esa_data/${exam}/test_mcqs`));
        test_mcqs = test_mcqs ? test_mcqs : [];
        //que_data = que_data.concat(test_mcqs);

        shared_mcqs.forEach((mcq) => {
            if (mcq.userid === user_login_data.userid) {
                if (mcq.options[0].id) {
                    user_mcqs.push(mcq.id);
                }
            }
        });

        console.log(`data retrieved from firebase for ${exam}`);
        return;

        /*let data = {};
    let last_data_update_time_local = localStorage.getItem(`esa_${exam}_data_last_update_time`);
    let local_data_string = localStorage.getItem(`esa_${exam}_data`);

    if (local_data_string) {
        data = JSON.parse(local_data_string);
    }
    let is_online = navigator.onLine;
    if (is_online) {
        let user_ref = database.ref(`esa_data/${exam}/data_last_update_time`);
        let snapshot = await user_ref.once("value");
        let data_last_update_time_firebase = snapshot.val() || "nothing";
        if (true || last_data_update_time_local != data_last_update_time_firebase || !data.ques_data) {
            await getAllUsersInfo();
            let user_ref = database.ref(`esa_data/${exam}/data`);
            let snapshot = await user_ref.once("value");
            data = snapshot.val() || {};
            console.log(`esa: data retrieved from firebase for ${exam}`);
            // store the update locale data here in the app
            let last_update_time = data_last_update_time_firebase;
            localStorage.setItem(`esa_${exam}_data`, JSON.stringify(data));
            localStorage.setItem(`esa_${exam}_data_last_update_time`, last_update_time);
        } else {
            console.log(`esa:data retrieved from local storage for ${exam}`);
        }
    } else {
        popupAlert("You are offline, Your data may not be updated data..", 5, "bg-red-500");
        console.log(`esa:data retrieved from local storage for ${exam}`);
    }

    esa_ques = data.ques_data ? data.ques_data : [];
    que_data = esa_ques;
    notes_data = data.notes_data ? data.notes_data : [];
    tags_list = data.tags_list ? data.tags_list : [];
    static_mocks = data.mocks_data ? data.mocks_data : [];
    handnotes_data = data.handnotes ? data.handnotes : [];
    pdf_data = data.pdfs ? data.pdfs : [];
    vocab_data = data.vocab_data ? data.vocab_data : [];
    shared_mcqs = data.shared_mcqs ? data.shared_mcqs : [];
    que_data = shared_mcqs.concat(que_data);
    shared_mcqs.forEach((mcq) => {
        if (mcq.userid === user_login_data.userid) {
            if (mcq.options[0].id) {
                user_mcqs.push(mcq);
            }
        }
    });
    console.log(`data retrieved from firebase for ${exam}`);
    //alert(`data retrieved from firebase for ${exam}`);
    await getAllUsersInfo();
    //initialLoading();
    */
    }

    function getHTMLFormattedText(text, search_text) {
        if (!text) text = "";
        text = text.replaceAll("nn_ll", "\n");

        // Replace [[ and ]] with an empty string
        text = text.replace(/\[\[|\]\]/g, "");
        if (search_text) {
            text = text.replace(new RegExp(search_text, "gi"), (match) => `<span class="bg-yellow-200">${match}</span>`);
        }

        // Convert **hello** to bold <span>
        text = text.replace(/\*\*(.*?)\*\*/g, '<span class="me-bold">$1</span>');

        // Convert ^^hello^^ to highlight <span>
        text = text.replace(/\^\^(.*?)\^\^/g, '<span class="me-highlight">$1</span>');

        // Convert ![text](src_link) to <img>
        text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<span class="show-image hide">Show images</span> <img className="me-image" src="$2" alt="$1">');

        // Convert [text](link) to <a>
        text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="link" target="_blank">$1</a>');

        // Convert {video:ASDASDDE:399} to <i className="fa-brands fa-youtube video" id="video-id" time="399"></i> fa-duotone fa-solid fa-play
        //text = text.replace(/\{video:([^:]+):(\d+)\}/g, '<i className="fa-brands fa-youtube video" id="$1" time="$2"></i>');
        text = text.replace(/\{video:([^:]+):(\d+)\}/g, '<i class="bi bi-play-btn video cursor-pointer " id="$1" time="$2"></i>');

        // Convert \n to <br>
        text = text.replaceAll("me_new_line", "<div class='w-full'></div>");
        text = text.replace(/\n/g, "<br>");

        text = text.replace(/(\d+)_fraction_(\d+)/g, (match, a, b) => convertFractions(a, b));
        text = text.replace(/(\d+)_power_(\d+)/g, (match, a, b) => convertPower(a, b));
        return text;
    }

    function convertPower(a, b) {
        return `<span class="inline-block mx-2">
                    <span>${a}</span>
                    <sup>${b}</sup>
                </span>`;
    }

    function convertFractions(a, b) {
        return `
    <span class="inline-block mx-2">
      <span class="block">${a}</span>
      <span class="block border-t border-gray-600">${b}</span>
    </span>
  `;
    }

    function openPdf({ link }) {
        popupAlert(`Opening PDF: ${link}`, 10, "bg-blue-500");
    }
    function setFilterMcqsMessage(message) {
        document.querySelector(".filter-mcq-message").textContent = message;
        if (message == "") {
            document.querySelector(".clear-filter").classList.add("hide");
        } else {
            document.querySelector(".clear-filter").classList.remove("hide");
        }
    }
    function clearFilter() {
        setFilterMcqsMessage("");
        filtered_ques = que_data;
        curr_que_index = 0;
        openMcq(que_data[curr_que_index]);
    }
    function loadMcqTags() {
        let div = document.createElement("div");
        div.className = "me-overlay filter-mcq-overlay hide";
        document.querySelector(".me-overlays").appendChild(div);
        ReactDOM.render(<McqFilterTagsHTML />, div);

        let target_div = div.querySelector(".tab-container.subject-wise");
        let level = 0;
        tags_list.forEach((tag_item) => {
            addSubjectWiseMqcTagItem(tag_item, target_div, level);
        });

        loadAllTags();
        //Load all tags in the all-tags tab
        all_tags = sortItems(all_tags);
        all_tags.forEach((tag) => {
            let count = que_data.filter((q) => q.tags.includes(tag)).length;
            let tag_div = document.createElement("div");
            tag_div.className = "tag flex justify-center items-center text-sm text-blue-500 border-2 border-blue-500 rounded-md px-2 py-1 cursor-pointer";
            tag_div.textContent = capitalFirstLetterOfEachWord(tag);
            tag_div.innerHTML = `<div class="tag-item flex justify-center items-center w-[fit-content] gap-2">
                            <span class="name">${tag}</span>
                            <span class="count">${count}</span>
                        </div>`;
            tag_div.onclick = (event) => {
                let div = event.target.closest(".tag");
                let tag = div.querySelector(".name").textContent.trim();
                filterMcqsByTag(tag, event);
            };
            div.querySelector(".filter-mcq-overlay .tab-container.all-tags").appendChild(tag_div);
        });
    }
    function addSubjectWiseMqcTagItem(tag_item, target_div, level) {
        tag_item = tag_item[0] ? tag_item[0] : tag_item;
        let div = document.createElement("div");

        target_div.appendChild(div);

        ReactDOM.render(<ChapterWiseMcqTagItemHTML tag_item={tag_item} level={level} />, div);

        tag_item.children = tag_item.children ? tag_item.children : [];
        if (tag_item.children.length > 0) {
            tag_item.children.forEach((child) => {
                let target_div = div.querySelector(".children");
                addSubjectWiseMqcTagItem(child, target_div, level + 1);
            });
        }
    }
    function filterMcqs() {
        openOverlay("filter-mcq-overlay");
    }
    function ChapterWiseMcqTagItemHTML({ tag_item, level }) {
        //tag_item = tag_item[0] ? tag_item[0] : tag_item;
        let paddingClass = "";
        if (level === 1) {
            paddingClass = "pl-2";
        } else if (level === 2) {
            paddingClass = "pl-4";
        } else if (level === 3) {
            paddingClass = "pl-6";
        } else {
            paddingClass = ""; // Default or no padding
        }
        let regex = /\[\[(.*?)\]\]/;
        let tag_name = tag_item.name.replace(regex, "$1");
        return (
            <div className={`tag-item level-${level} ${paddingClass} flex flex-col gap-2`}>
                <div className="main-tag flex justify-start items-center gap-1 cursor-pointer" onClick={(event) => filterMcqsByTag(tag_name, event)}>
                    <i className="fa-solid fa-circle link hide text-7px opacity-70"></i>
                    <span className="tag-name text-no-wrap link text-sm" onClick={(event) => filterMcqsByTag(tag_name, event)}>
                        {capitalFirstLetterOfEachWord(tag_name)}
                    </span>
                </div>
                <div className="children"></div>
            </div>
        );
    }
    function McqFilterTagsHTML() {
        return (
            <div className=" container filter-mcq-overlay-inner flex flex-col  h-full w-full ">
                <div className="filter-mcq-header p-4 flex justify-center items-center gap-2">
                    <span className="text-[15px] font-bold">Filter MCQs</span>
                    <i className="bi bi-x-circle cursor-pointer text-xl align-right ml-auto" onClick={(event) => closeOverlay(event)}></i>
                </div>
                <div class="block subject-div h-[75px] w-full overflow-x-auto py-2 px-3">
                    <span>Filter by subject:</span>
                    <div class="flex space-x-4 py-2 ">
                        {subjects[exam].map((subject, index) => (
                            <span
                                key={index} // Add a key for each child in the list
                                className=" subject inline-flex items-center whitespace-nowrap border text-gray-500 h-[22px] rounded-md px-2 py-1 min-w-[fit-content] cursor-pointer"
                                onClick={(event) => filterMcqsByTag(subject, event)}
                            >
                                {capitalFirstLetterOfEachWord(subject)}
                            </span>
                        ))}
                    </div>
                </div>

                <div class="block  h-[75px] w-full overflow-x-auto py-1 px-3">
                    <div class="flex space-x-4 py-2 ">
                        <span
                            // Add a key for each child in the list
                            className=" shared-mcq inline-flex items-center whitespace-nowrap border text-gray-500 h-[22px] rounded-md px-2 py-1 min-w-[fit-content] cursor-pointer"
                            onClick={(event) => filterSharedMCQs("all", event)}
                        >
                            Shared MCQs
                        </span>
                        <span
                            // Add a key for each child in the list
                            className=" shared-mcq inline-flex items-center whitespace-nowrap border text-gray-500 h-[22px] rounded-md px-2 py-1 min-w-[fit-content] cursor-pointer"
                            onClick={(event) => filterSharedMCQs("verified", event)}
                        >
                            Verified
                        </span>
                        <span
                            // Add a key for each child in the list
                            className=" shared-mcq inline-flex items-center whitespace-nowrap border text-gray-500 h-[22px] rounded-md px-2 py-1 min-w-[fit-content] cursor-pointer"
                            onClick={(event) => filterSharedMCQs("unverified", event)}
                        >
                            Unverified
                        </span>
                    </div>
                </div>

                <div className="flex flex-col justify-start items-start w-full  px-3 ">
                    <span className="block h-auto py-2">Filter by tags:</span>
                    <div className="flex justify-center items-center gap-2  h-auto py-2  w-full">
                        <div className="flex justify-center items-center gap-2  w-full rounded-md px-2 py-1 my-3  border border-gray-500 ">
                            <i className="bi bi-funnel"></i>
                            <input type="text" className="filter-mcq-input p-1 align-middle focus:outline-none text-sm" placeholder="Filter mcqs by tags" onKeyUp={(event) => filterMcqTagItems(event)} />
                        </div>
                    </div>
                </div>

                <div className=" hide flex justify-center items-center gap-2  text-gray-700 border-2 rounded-md">
                    <i className="bi bi-funnel w-[15px]"></i>
                    <input type="text" className="filter-mcq-input py-2 px-3 flex-1 align-middle focus:outline-none text-sm" placeholder="Filter mcqs by tags" onKeyUp={(event) => filterMcqsByTag(event)} />
                </div>

                <div className="tab-section h-full w-full">
                    <div className="tabs flex justify-center align-middle gap-4 p-3 w-full">
                        <div className="tab flex justify-center flex-1 py-1 px-2 subject-wise cursor-pointer bg-blue-400 text-white rounded-md text-sm text-no-wrap mx-2 h-[25px]" onClick={(event) => switchFilterMCQsTabs("subject-wise", event)}>
                            Subject Wise
                        </div>
                        <div className="tab flex justify-center flex-1 py-1 px-2 all-tags cursor-pointer  text-gray-500 rounded-md text-sm text-no-wrap mx-2 h-[25px]" onClick={(event) => switchFilterMCQsTabs("all-tags", event)}>
                            All Tags
                        </div>
                    </div>
                    <div className="tab-containers flex  border-t-2 p-2 ">
                        <div className="tab-container  subject-wise  ml-4  w-full  max-h-[calc(100vh-250px)] overflow-y-scroll mb-20px "> </div>
                        <div className="tab-container all-tags  w-full   hide gap-2 flex justify-start flex-wrap  max-h-[calc(100vh-250px)] overflow-y-scroll mb-20px"></div>
                    </div>
                </div>
                <div className=" hide search-mcq-footer p-4 flex justify-center items-center gap-2">
                    <button className="search-mcq-btn bg-blue-500 text-white rounded-md px-2 py-1 cursor-pointer  " onClick={(event) => filterMcqsByTag(event)}>
                        Filter
                    </button>
                </div>
            </div>
        );
    }

    async function filterSharedMCQs(status, event) {
        //let data_ref = database.ref(`esa_data/${exam}/shared_mcqs`);
        //let data = await getDataFromFirebaseUsingRef(data_ref);
        //shared_mcqs = data ? data : [];

        if (status == "all") {
            filtered_ques = shared_mcqs;
        } else if (status == "verified") {
            filtered_ques = shared_mcqs.filter((mcq) => mcq.verified == true);
        } else if (status == "unverified") {
            filtered_ques = shared_mcqs.filter((mcq) => mcq.verified == false);
        }
        if (event) closeOverlay(event);
        loadMCQList();

        console.log(`filterSharedMCQs: ${status}`);
    }

    function switchFilterMCQsTabs(tab_name, event) {
        event.target
            .closest(".tab-section")
            .querySelectorAll(".tab")
            .forEach((tab) => {
                tab.classList.remove("bg-blue-400");
                tab.classList.replace("text-white", "text-gray-500");
            });
        event.target.classList.add("bg-blue-400");
        event.target.classList.replace("text-gray-500", "text-white");

        let tab_containers = event.target.closest(".tab-section").querySelectorAll(".tab-container");
        tab_containers.forEach((container) => {
            container.classList.add("hide");
        });
        let selected_tab_container = event.target.closest(".tab-section").querySelector(`.tab-container.${tab_name}`);
        selected_tab_container.classList.remove("hide");
    }
    function filterMcqsByTag(tag, event) {
        openTab("mcq");
        tag = tag ? tag.toLowerCase() : event.target.textContent.trim().toLowerCase();
        //tag = tag.textContent.trim().toLowerCase();
        let tag_array = [tag];
        let tag_item_names = document.querySelectorAll(".filter-mcq-overlay .subject-wise .tag-name");
        tag_item_names.forEach((tag_item_name) => {
            if (tag_item_name.textContent.trim().toLowerCase() == tag) {
                let children = tag_item_name.closest(".tag-item").querySelector(".children");
                let child_tag_names = children.querySelectorAll(".tag-name");
                child_tag_names.forEach((child_tag_name) => {
                    tag_array.push(child_tag_name.textContent.trim().toLowerCase());
                });
            }
        });

        /*
    filtered_ques = que_data.filter((que) => {
        //let que_tags = que.tags.map((tag) => tag.toLowerCase());
        //let que_tags = que.tags
        return tag_array.some((tag) => que.tags.includes(tag));
    });
    */
        filtered_ques = [];
        que_data.forEach((que) => {
            if (tag_array.some((tag) => que.tags.includes(tag))) {
                filtered_ques.push(que);
            }
        });
        loadMCQList();
        popupAlert(`Filtered:  ${filtered_ques.length} mcqs found for #[${capitalFirstLetterOfEachWord(tag)}]`, 5, "bg-blue-500");
        closeOverlay(event);
        return;
        //curr_que_index = 0;
        //openMcq(filtered_ques[0]);

        let filter_message = `Filtered:  ${filtered_ques.length} mcqs found for #[${capitalFirstLetterOfEachWord(tag)}]`;
        setFilterMcqsMessage(filter_message);
    }
    function filterMcqTagItems(event) {
        let input_value = event.target.value.trim().toLowerCase();
        if (input_value != "") {
            let tag_item_names = document.querySelectorAll(".filter-mcq-overlay .subject-wise .tag-name");
            tag_item_names.forEach((tag_item_name) => {
                if (tag_item_name.textContent.toLowerCase().includes(input_value)) {
                    tag_item_name.parentElement.classList.remove("hide");
                } else {
                    tag_item_name.parentElement.classList.add("hide");
                }
            });

            let tags = document.querySelectorAll(".filter-mcq-overlay .all-tags .tag");
            tags.forEach((tag) => {
                if (tag.textContent.toLowerCase().includes(input_value)) {
                    tag.classList.remove("hide");
                } else {
                    tag.classList.add("hide");
                }
            });
        }
    }
    function switchTabs(tab_name, event) {
        let tab_section = event.target.closest(".tab-section");
        tab_section.querySelectorAll(".tab").forEach((tab) => {
            tab.classList.remove("active");
        });
        event.target.classList.add("active");

        let tab_containers = tab_section.querySelectorAll(".tab-container");
        tab_containers.forEach((container) => {
            container.classList.add("hide");
        });
        let selected_tab_container = tab_section.querySelector(`.tab-container.${tab_name}`);
        selected_tab_container.classList.remove("hide");
    }

    function sortItems(array) {
        // Use sort() with a custom comparison function
        array.sort((a, b) => {
            // Convert both items to lowercase for case insensitive comparison
            let itemA = a.toLowerCase();
            let itemB = b.toLowerCase();

            // Compare the two items
            if (itemA < itemB) {
                return -1; // a should come before b
            }
            if (itemA > itemB) {
                return 1; // a should come after b
            }
            return 0; // items are equal
        });

        return array; // Return the sorted array
    }

    var me_video_player = null;
    function playVideoPlayer(video_id, time, event, from) {
        let target = "",
            iframe = "";
        target = event.target.closest(".page");

        if (from == "mcq") {
            target = event.target.closest(".mcq-item").querySelector(".mcq-video-div-inner");
            iframe = target.querySelector("iframe");
            //iframe = target.querySelector("iframe");
        }
        if (target.classList.contains("mcq")) {
            openOverlay();
            target = document.querySelector(".me-overlay .content .me-iframe-div");
            iframe = document.querySelector(".me-overlay .content .me-iframe-div iframe");
            if (!target) {
                let div = document.createElement("div");
                div.className = "me-iframe-div";
                div.innerHTML = `<span > TTT </span>`;
                document.querySelector(".me-overlay .content").innerHTML = "";
                document.querySelector(".me-overlay .content").appendChild(div);
                target = div;
                //initializeYouTubePlayer(time, video_id, target);
                //return;
            }
        } else if (target.classList.contains("notes")) {
            target = event.target.closest(".page.notes").querySelector(".me-iframe-div");
            iframe = document.querySelector(".page.notes .me-iframe-div  iframe");
        }

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
    }
    function initializeYouTubePlayer(time, video_id, target) {
        let iframe = target.querySelector("iframe");
        var url = window.location.href; // Get the current URL
        url = url.substring(0, url.indexOf("//#", 8));
        if (!iframe) {
            target.innerHTML = `<div class="header flex justify-end items-center w-[100%]">
                                    <i class="bi bi-x-circle text-xl cursor-pointer cross mr-3" ></i>
                                </div>
                                <div class="me-iframe">
                                <iframe  id="${video_id}"class="rm-iframe rm-video-player w-[100%] h-[200px]" frameborder="0" allowfullscreen="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" title="THE LIVING WORLD in 1 Shot: FULL CHAPTER COVERAGE (Theory+PYQs) ||  Prachand NEET 2024" width="640" height="360" src="https://www.youtube.com/embed/${video_id}?enablejsapi=1&amp;origin=${url}&amp;widgetid=5" ></iframe>
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
    }

    function sortArrayRandomly(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    function loadMockTestPage() {
        let target = document.querySelector(".page.mock");
        ReactDOM.render(<MockTestPageHTML />, target);

        let interval2 = setInterval(() => {
            let ele = document.querySelector(".tab-container.subject-wise ");
            if (ele) {
                clearInterval(interval2);
                document.querySelector(".total-questions-for-mock").value = 20;
                let target_div = ele;
                let level = 0;
                tags_list.forEach((tag_item) => {
                    addSubjectWiseTagItemInNewMockPage(tag_item, target_div, level);
                });
            }
        }, 100);
    }
    function addSubjectWiseTagItemInNewMockPage(tag_item, target_div, level) {
        tag_item = tag_item[0] ? tag_item[0] : tag_item;
        let div = document.createElement("div");

        target_div.appendChild(div);

        ReactDOM.render(<ChapterWiseTagItemInNewMockPageHTML tag_item={tag_item} level={level} />, div);

        tag_item.children = tag_item.children ? tag_item.children : [];
        if (tag_item.children.length > 0) {
            tag_item.children.forEach((child) => {
                let target_div = div.querySelector(".children");
                addSubjectWiseTagItemInNewMockPage(child, target_div, level + 1);
            });
        }
    }
    function ChapterWiseTagItemInNewMockPageHTML({ tag_item, level }) {
        let paddingClass = "";
        if (level === 1) {
            paddingClass = "pl-2";
        } else if (level === 2) {
            paddingClass = "pl-4";
        } else if (level === 3) {
            paddingClass = "pl-6";
        } else {
            paddingClass = ""; // Default or no padding
        }
        let regex = /\[\[(.*?)\]\]/;
        let tag_name = tag_item.name.replace(regex, "$1");
        return (
            <div className={`tag-item level-${level} ${paddingClass} flex flex-col gap-2`}>
                <div
                    className="main-tag flex justify-start items-center gap-1 cursor-pointer"
                    onClick={(event) => {
                        let parent_ele = event.target.closest(".tag-item");
                        if (parent_ele.classList.contains("selected")) {
                            parent_ele.classList.remove("selected");
                            event.target.closest(".main-tag").querySelector("i").className = "bi bi-circle  link ";
                        } else {
                            parent_ele.classList.add("selected");
                            event.target.closest(".main-tag").querySelector("i").className = "bi bi-check-circle  link ";
                        }

                        //ifelement.classList.toggle("fa-circle-check") && element.classList.toggle("fa-circle");
                    }}
                >
                    <i class="bi bi-circle  link "></i>
                    <span className="tag-name text-no-wrap link text-sm">{capitalFirstLetterOfEachWord(tag_name)}</span>
                </div>
                <div className="children"></div>
            </div>
        );
    }

    function switchMockTabs(tab_name, event) {
        let tab_section = document.querySelector(".page.mock .tab-section");
        let tab_containers = tab_section.querySelectorAll(" .tab-container");
        tab_containers.forEach((container) => {
            container.classList.add("hide");
        });
        let selected_tab_container = tab_section.querySelector(`.tab-container.${tab_name}`);
        selected_tab_container.classList.remove("hide");
        if (tab_name == "new-mock") {
            document.querySelector(".new-mock .tab.subject-wise").click();
        }
        return;

        let tabs = tab_section.querySelectorAll(".page-tab");
        tabs.forEach((tab) => {
            tab.classList.remove("font-bold");
            tab.classList.replace("text-blue-700", "text-gray-700");
            tab.classList.remove("bg-blue-100");
            tab.classList.remove("rounded-md");
            if (tab == event.target) {
                tab.classList.add("font-bold");
                tab.classList.replace("text-gray-700", "text-blue-700");
                tab.classList.add("bg-blue-100");
                tab.classList.add("rounded-md");
            }
        });
        let selected_tab = tab_section.querySelector(".text-blue-500");
        if (selected_tab) {
            //selected_tab.classList.replace("text-blue-500", "text-gray-400");
        }
        event.target.classList.replace("text-gray-400", "text-blue-500");
    }

    function filterMockResultMCQs(type) {
        let all_questions = document.querySelectorAll(".mock-overlay .questions-list .question-div");

        all_questions.forEach((question) => {
            question.classList.add("hide");
        });
        if (type == "all") {
            all_questions.forEach((question) => {
                question.classList.remove("hide");
            });
        } else if (type == "attempted") {
            all_questions.forEach((question) => {
                if (question.classList.contains("correct") || question.classList.contains("wrong")) {
                    question.classList.remove("hide");
                }
            });
        } else if (type == "correct") {
            all_questions.forEach((question) => {
                if (question.classList.contains("correct")) {
                    question.classList.remove("hide");
                }
            });
        } else if (type == "wrong") {
            all_questions.forEach((question) => {
                if (question.classList.contains("wrong")) {
                    question.classList.remove("hide");
                }
            });
        }
    }

    function MockTestPageHTML() {
        userdata.mock_tests = userdata.mock_tests ? userdata.mock_tests : [];
        return (
            <div>
                <div className="tab-section flex flex-col gap-2">
                    <div className="page-tabs hide h-[40px] p-2 tabs flex gap-2 border-b-2">
                        <div
                            className="page-tab tab cursor-pointer new-mock  flex-1 flex justify-center items-center font-bold text-blue-700 bg-blue-100 rounded-md"
                            onClick={(event) => {
                                switchMockTabs("new-mock", event);
                                document.querySelector(".new-mock .tab.subject-wise").click();
                            }}
                        >
                            New Mock
                        </div>
                        <div className="page-tab tab cursor-pointer static-mocks flex-1 flex justify-center items-center text-gray-700  " onClick={(event) => switchMockTabs("static-mocks", event)}>
                            Static Mocks
                        </div>
                        <div
                            className="page-tab tab cursor-pointer mock-history flex-1 flex justify-center items-center text-gray-700  "
                            onClick={(event) => {
                                switchMockTabs("mock-history", event);
                                document.querySelector(".tab-container.mock-history .mock-history-list").innerHTML = "";
                                if (!userdata.mock_tests.length) {
                                    document.querySelector(".tab-container.mock-history .mock-history-list").textContent = "No Mock Test History";
                                    return;
                                }
                                userdata.mock_tests.forEach((mock) => {
                                    let div = document.createElement("div");
                                    div.className = "mock-history-item w-full";
                                    document.querySelector(".tab-container.mock-history .mock-history-list").appendChild(div);
                                    ReactDOM.render(<MockTestHistoryItemHTML mock={mock} />, div);
                                });
                            }}
                        ></div>
                    </div>
                    <div className="tabs-container flex flex-col gap-2 py-2 max-h-[calc(100vh-95px)] overflow-y-scroll">
                        <div className="tab-container  new-mock px-2  flex flex-col justify-start items-start gap-2 h-full max-h-[calc(100vh-85px)] overflow-y-scroll">
                            <button className="text-md link border border-blue-500 bg-white text-blue-500  rounded-md py-2 px-4 flex justify-center items-center cursor-pointer my-2" onClick={startNewMockTest}>
                                Start new mock test
                            </button>
                            <button className="hide text-md font-bold link border border-blue-300 bg-white text-blue-600 hover:bg-blue-600 hover:text-white transition duration-200 ease-in-out rounded-md py-2 px-4 inline-block cursor-pointer my-2" onClick={createSharedMockTest}>
                                Create a shared mock test
                            </button>

                            <div className="flex flex-col customise-mock w-full justify-start items-start gap-2">
                                <span className="  text-xl p-2 m-2  text-center w-full  text-gray-500 font-bold">Customise Mock Test</span>
                                <div className=" flex justify-start items-center gap-2 p-2">
                                    <span className="text-md  text-gray-500">Set total questions:</span>
                                    <input type="number" className="total-questions-for-mock w-[50px] p-1 text-center border border-gray-300 rounded-md" />
                                    <span className="text-[9px] text-gray-400">(20 - 50)</span>
                                </div>
                                <div className="flex justify-center items-center w-full  gap-2 p-2">
                                    <span className="text-md  text-gray-500">Select chapter or tags from below:</span>
                                    <span
                                        className="link ml-auto px-3 cursor-pointer"
                                        onClick={(event) => {
                                            let eles = document.querySelectorAll(".customise-mock .selected");
                                            if (eles) {
                                                eles.forEach((ele) => {
                                                    ele.classList.remove("selected");
                                                });
                                            }
                                            eles = document.querySelectorAll(".customise-mock .subject-wise .fa-circle-check");
                                            if (eles) {
                                                eles.forEach((ele) => {
                                                    ele.classList.replace("fa-circle-check", "fa-circle");
                                                });
                                            }
                                        }}
                                    >
                                        clear all
                                    </span>
                                </div>
                                <div className="filter-chapters-tags-div h-full w-full flex flex-col justify-start items-center gap-2 m-2">
                                    <input type="text" className="w-[90%] p-2 border border-gray-300 rounded-full text-center" placeholder=" Filter Chapters or Tags" onKeyUp={(event) => filterMcqTagItemsForCustomMock(event)} />
                                    <div className="tab-section flex flex-col justify-start items-center gap-2 w-full">
                                        <div className="tabs h-[50px] flex justify-center align-middle gap-4 px-2 py-1 w-full border-b-2">
                                            <div className="tab flex justify-center  flex-1 p-2 subject-wise cursor-pointer font-bold text-blue-500 text-sm text-no-wrap" onClick={(event) => switchCustomiseMockTabs("subject-wise", event)}>
                                                Subject Wise
                                            </div>
                                            <div className="tab all-tags flex justify-center flex-1 p-2 cursor-pointer font-bold text-gray-400 text-sm" onClick={(event) => switchCustomiseMockTabs("all-tags", event)}>
                                                All Tags
                                            </div>
                                        </div>
                                        <div className="tab-containers w-full h-full max-h-[70vh] px-3 py-1 flex ">
                                            <div className="tab-container subject-wise w-full px-3 block max-h-[70vh] overflow-y-scroll "></div>
                                            <div className="tab-container all-tags w-full px-3 flex justify-start items-center gap-2 flex-wrap max-h-[70vh] overflow-y-scroll  hide ">
                                                {all_tags.map((tag) => (
                                                    <span
                                                        key={tag} // Use a unique key for each item
                                                        className="tag flex justify-center items-center text-sm text-blue-500 border-2 border-blue-500 rounded-md px-2 py-1 cursor-pointer"
                                                        onClick={(event) => {
                                                            //Remove all the selected subjects..
                                                            let eles = document.querySelectorAll(".customise-mock .subject-wise .selected");
                                                            if (eles) {
                                                                eles.forEach((ele) => {
                                                                    ele.classList.remove("selected");
                                                                });
                                                            }
                                                            eles = document.querySelectorAll(".customise-mock .subject-wise .fa-circle-check");
                                                            if (eles) {
                                                                eles.forEach((ele) => {
                                                                    ele.classList.replace("fa-circle-check", "fa-circle");
                                                                });
                                                            }
                                                            event.target.classList.toggle("selected");
                                                        }}
                                                    >
                                                        {tag.toLowerCase()}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-container static-mocks hide flex flex-col  justify-start items-center gap-2 h-[calc(100vh-85px)]">{LoadStaticMockTestContainer()}</div>
                        <div className="tab-container mock-history  max-h-[calc(100vh-170px)] overflow-y-scroll block h-full w-full">
                            <h1 className="text-xl font-bold text-gray-500 text-center">Mock Test History</h1>
                            <div className="hide flex justify-center items-center gap-2 border border-gray-300 rounded-full px-2 m-2 w-[90%]">
                                <i className="bi bi-search text-gray-400"></i>
                                <input type="text" className="w-[200px] text-center py-1 px-2  focus:outline-none" placeholder="Search ..." />
                            </div>
                            <div className="mock-history-list w-full border-t-2"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    function LoadStaticMockTestContainer() {
        return (
            <div className="static-mock-test-container block h-screen w-full">
                <h1 className="block text-center text-xl font-bold text-gray-500">Static Mock Tests</h1>
                <div className="block w-full">
                    <div className="hide flex justify-center items-center gap-2 flex-wrap border border-gray-300 rounded-full p-2 m-2">
                        <i className="bi bi-search text-gray-400"></i>
                        <input type="text" className="w-[200px] text-center p-1  focus:outline-none" placeholder="Search ..." />
                    </div>
                </div>

                <div className="static-mock-test-items-container block w-full h-[calc(100vh-150px)] overflow-y-scroll border-t-2">
                    {static_mocks.map((mock) => (
                        <div key={mock.id} className="static-mock-test-item block h-auto w-full mx-2 my-4">
                            <StaticMockTestItemHTML mock={mock} />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    function StaticMockTestItemHTML({ mock }) {
        let sub_wise_ques = [];
        subjects[exam].forEach((subject) => {
            let sub_que_ids = mock.que_ids.filter((id) => que_data.find((que) => que.id == id && que.tags.includes(subject)));
            sub_wise_ques.push(sub_que_ids.length);
        });

        let color = ["bg-red-100", "bg-green-100", "bg-blue-100", "bg-yellow-100", "bg-purple-100"];
        return (
            <div className="static-mock-item-inner flex flex-col gap-2 border-2 mx-2 my-1 px-2 py-4">
                <span className="text-xl font-bold text-gray-600 mock-name">{mock.name}</span>
                <span className=" text-gray-500 py-1">Try "subject wise" or "full" mock test</span>

                <div class=" block subject-div max-w-full overflow-x-auto py-2">
                    <div class="flex space-x-4 ">
                        {subjects[exam].map((subject, index) => (
                            <span
                                className={`subject inline-flex min-w-[fit-content] items-center whitespace-nowrap border border-gray-300 rounded-md py-1 px-2 text-no-wrap cursor-pointer ${color[index]} ${sub_wise_ques[index] ? "" : "disabled"}`}
                                key={index}
                                onClick={() => {
                                    let que_ids = mock.que_ids.filter((id) => que_data.find((que) => que.id == id && que.tags.includes(subject)));

                                    let obj = {
                                        id: mock.id,
                                        name: mock.name,
                                        que_ids: que_ids,
                                    };
                                    startNewMockTest(obj);
                                }}
                            >
                                {capitalFirstLetterOfEachWord(subject) + " (" + sub_wise_ques[index] + ")"}
                            </span>
                        ))}
                    </div>
                </div>

                <span
                    className="full-mock text-blue-500 border bg-gray-100  border-gray-300 rounded-md p-1 px-2 text-center cursor-pointer"
                    onClick={() => {
                        startNewMockTest(mock);
                    }}
                >
                    Full Mock ({mock.que_ids.length})
                </span>
                {mock.pdf && mock.pdf != "" && (
                    <div className="text-md cursor-pointer flex justify-start items-center gap-2 py-1 px-4 border border-gray-500 text-gray-500  rounded-md w-[fit-content] h-[30px]" onClick={() => openPdfFile(mock.pdf, mock.name)}>
                        <i class="bi bi-filetype-pdf text-xl text-red-500"></i>
                        <span>Open PDF</span>
                    </div>
                )}
            </div>
        );
    }

    function setTimer(minutes) {
        const timerElement = document.querySelector(".mock-overlay .timer-text");
        const endTime = Date.now() + minutes * 60 * 1000;

        function updateTimer() {
            const timeLeft = endTime - Date.now();
            if (timeLeft <= 0) {
                timerElement.textContent = "00:00";
                clearInterval(timerInterval);
                document.querySelector(".mock-overlay .submit-test").click();
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

    function filterMcqTagItemsForCustomMock(event) {
        let input_value = event.target.value.trim().toLowerCase();
        if (input_value != "") {
            let tag_item_names = document.querySelectorAll(".new-mock .subject-wise .tag-name");
            tag_item_names.forEach((tag_item_name) => {
                if (tag_item_name.textContent.toLowerCase().includes(input_value)) {
                    tag_item_name.parentElement.classList.remove("hide");
                } else {
                    tag_item_name.parentElement.classList.add("hide");
                }
            });

            let tags = document.querySelectorAll(".new-mock .all-tags .tag");
            tags.forEach((tag) => {
                if (tag.textContent.toLowerCase().includes(input_value)) {
                    tag.classList.remove("hide");
                } else {
                    tag.classList.add("hide");
                }
            });
        }
    }

    function switchCustomiseMockTabs(tab_name, event) {
        let tab_section = event.target.closest(".tab-section");
        let selected_tab = tab_section.querySelector(".text-blue-500");
        if (selected_tab) {
            selected_tab.classList.replace("text-blue-500", "text-gray-400");
        }
        event.target.classList.replace("text-gray-400", "text-blue-500");
        let tab_containers = tab_section.querySelectorAll(".tab-container");
        tab_containers.forEach((container) => {
            container.classList.add("hide");
        });
        let selected_tab_container = tab_section.querySelector(`.tab-container.${tab_name}`);
        selected_tab_container.classList.remove("hide");
    }

    function MockTestHistoryItemHTML({ mock }) {
        return (
            <div className="mock-history-item-inner w-auto flex flex-col justify-start items-start gap-2 flex-wrap border border-gray-300 rounded-md mx-3 py-3 px-2 ">
                <span className="text-xl font-bold text-gray-500  mock-name">{mock.name}</span>
                <span className="text-md text-gray-400">
                    Date: {mock.date.date} at {mock.date.time}
                </span>
                <div className="flex justify-start items-center gap-2 hide">
                    <span className="text-md">Total Questions: {mock.questions.length}</span>
                    <span className="text-md">Total Attempeted: {mock.total_attempeted}</span>
                    <span className="text-md text-green-500">Total Correct: {mock.total_correct}</span>
                    <span className="text-md text-red-500">Total Wrong: {mock.total_wrong}</span>
                </div>

                <div className="flex justify-start items-end gap-2 text-gray-500">
                    <span className="text-sm bg-gray-100 rounded-md p-1 px-2">{mock.questions.length}</span>
                    <span className="text-sm bg-gray-300 rounded-md p-1 px-2">{mock.total_attempeted}</span>
                    <span className="text-sm bg-green-200 rounded-md p-1 px-2">{mock.total_correct}</span>
                    <span className="text-sm bg-red-200 rounded-md p-1 px-2">{mock.total_wrong}</span>
                </div>
                <span
                    className="text-md link cursor-pointer"
                    onClick={() => {
                        let div = document.createElement("div");
                        div.className = "me-overlay prev-mock-test-questions";
                        document.querySelector(".me-overlays").appendChild(div);
                        ReactDOM.render(<PreviousMockTestQuestionsHTML mock={mock} />, div);
                    }}
                >
                    Show questions
                </span>
                <span
                    className="text-md link cursor-pointer hidden"
                    onClick={() => {
                        let div = document.createElement("div");
                        div.className = "me-overlay prev-mock-test-questions";
                        document.querySelector(".me-overlays").appendChild(div);
                        ReactDOM.render(<PreviousMockTestQuestionsHTML mock={mock} />, div);
                    }}
                >
                    Show questions
                </span>
            </div>
        );
    }
    function PreviousMockTestQuestionsHTML({ mock }) {
        return (
            <div className="container m-2 p-2">
                <div className="header flex justify-start items-center gap-2 text-gray-600">
                    <span className="text-xl font-bold">{mock.name}</span>
                    <i
                        className="bi bi-x-circle text-xl cursor-pointer cross px-2 ml-auto "
                        onClick={(event) => {
                            event.target.closest(".me-overlay").remove();
                        }}
                    ></i>
                </div>
                <div className="questions-list max-h-[calc(100vh-50px)] overflow-y-auto">
                    {mock.questions.map((que, index) => {
                        return (
                            <div className="question-div" key={index} id={index}>
                                {GetMcqDiv({ que: que.id, type: "pre-mock-test", index: index + 1, selected_option_id: que.selected_option_id })}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    function popupAlert(message, time_in_sec, color) {
        let ele = document.querySelector(".me-popup-alert");
        if (ele) {
            ele.remove();
        }

        var div = document.createElement("div");
        document.body.append(div);
        div.className = `w-full fixed top-5 left-0 right-0 flex justify-center z-50`;
        ReactDOM.render(<PopupAlertHTMLMessage message={message} color={color} time_in_sec={time_in_sec} />, div);

        if (time_in_sec) {
            setTimeout(function () {
                div.remove();
            }, `${time_in_sec * 1000}`);
        } else {
            setTimeout(function () {
                div.remove();
            }, 3000);
        }
    }

    function PopupAlertHTMLMessage({ message, color, time_in_sec }) {
        let arr = message.split(";");
        return (
            <div className={`me-popup-alert ${color ? `bg-${color}-800` : "bg-blue-800"} px-3 py-2 rounded text-white w-[90%] `}>
                <div className="flex justify-start items-baseline gap-2">
                    <div className="message flex-1 flex flex-col gap-1 justify-start items-start">
                        {arr.map((msg) => (
                            <div className="text-sm">{msg}</div>
                        ))}
                    </div>
                    <i
                        className="bi bi-x-circle text-xl cursor-pointer"
                        onClick={(event) => {
                            event.target.closest(".me-popup-alert").remove();
                        }}
                    ></i>
                </div>
            </div>
        );
    }

    function removePopupAlert() {
        var x = document.querySelector(".me-popup-alert");
        if (x) x.remove();
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
            console.log(`user data loaded successfully`);
        } catch (error) {
            console.error("Error getting userdata from firebase:", error);
        }
    }

    function startNewMockTest(mock_obj) {
        //let mock_overlay = document.querySelector(".me-overlay.mock-overlay");

        mock_obj = mock_obj.que_ids ? mock_obj : null;
        let que_ids = mock_obj ? mock_obj.que_ids : null;
        let fil_ques = sortArrayRandomly(que_data);
        let total_questions = document.querySelector(".total-questions-for-mock").value;
        total_questions = que_ids ? que_ids.length : total_questions ? total_questions : 20;

        fil_ques = que_ids ? que_ids.map((id) => fil_ques.find((que) => que.id == id)) : fil_ques.slice(0, total_questions);
        let selected_chapters_tags = [];
        let chapters_div = document.querySelectorAll(".customise-mock .tag-item.selected .tag-name");
        chapters_div.forEach((div) => {
            selected_chapters_tags.push(div.textContent.toLowerCase());
        });
        if (!mock_obj && selected_chapters_tags.length) {
            //fil_ques = fil_ques.slice(0, total_questions);
            fil_ques = sortArrayRandomly(que_data);
            fil_ques = fil_ques.filter((que) => que.tags.some((tag) => selected_chapters_tags.includes(tag)));
            fil_ques = fil_ques.slice(0, total_questions);
        }

        let mock_overlay = document.createElement("div");
        mock_overlay.className = "me-overlay mock-overlay";
        document.querySelector(".me-overlays").appendChild(mock_overlay);
        ReactDOM.render(<MockTestOverlayHTML fil_ques={fil_ques} total_questions={total_questions} mock_obj={mock_obj} />, mock_overlay);

        setTimeout(() => {
            setTimer(Math.floor(total_questions));
        }, 1000);

        //ReactDOM.render(<MockTestOverlayHTML fil_ques={fil_ques} total_questions={total_questions} />, mock_overlay);
        //openOverlay("mock");
    }
    function MockTestOverlayHTML({ fil_ques, total_questions, mock_obj }) {
        return (
            <div className="container mock-overlay-inner h-full">
                <div className="der flex justify-start items-center h-[65px] w-full overflow-x-auto  p-4 bg-blue-200  gap-2">
                    <div className="timer  flex justify-center items-center gap-2 bg-black text-white rounded-md px-2 py-1">
                        <i className="fa-regular fa-clock"></i>
                        <span className="text-sm timer-text">{"19:00"}</span>
                    </div>
                    <span className="correct bg-green-500  text-white  py-1 px-2 rounded-md">+2</span>
                    <span className=" wrong bg-red-500  text-white rounded-md px-2 py-1">0.6</span>
                    <div className="share hide link flex items-center gap-1">
                        <i className="fa-solid fa-share"></i>
                        <span>Share</span>
                    </div>
                    <span className="text-sm bg-blue-700 font-bold  text-white text-no-wrap  rounded-md px-3 py-1 mx-2 ml-auto cursor-pointer" onClick={(event) => submitMockTest(event, mock_obj)}>
                        Submit
                    </span>
                    <i
                        className="bi bi-x-circle  text-xl text-red-700 cursor-pointer"
                        onClick={(event) => {
                            event.target.closest(".me-overlay").remove();
                        }}
                    ></i>
                </div>

                <div className="content mock-test ">
                    <div className="question-numbers flex justify-start items-center gap-2 flex-wrap  px-3 py-2 border-b-2  max-h-[120px] overflow-y-scroll">
                        {fil_ques.map((ques, index) => (
                            <span
                                className="  question-number dot  bg-gray-200 text-gray-700 rounded-md cursor-pointer text-[10px] py-1 px-2"
                                id={index}
                                key={index}
                                onClick={(event) => {
                                    let i = index;
                                    let question_div = event.target.closest(".me-overlay").querySelectorAll(".que-div")[i];
                                    question_div.scrollIntoView({ behavior: "smooth", block: "center" });
                                    question_div.style.backgroundColor = "#ffe7c9";
                                    setTimeout(() => {
                                        question_div.style.backgroundColor = "";
                                    }, 2000);
                                }}
                            >
                                {index + 1 <= 9 ? `0${index + 1}` : index + 1}
                            </span>
                        ))}
                    </div>
                    <div className="question-list  block max-h-[calc(100vh-170px)] overflow-y-auto py-2">
                        {fil_ques.map((ques, index) => (
                            <div className="question-div" key={index} id={index}>
                                {GetMCQHTML({ que: ques, type: "mock", index: index + 1, is_icse: false, is_show_tags: false })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    function closeMockTest(event) {
        let div = document.createElement("div");
        div.className = "me-overlay close-mock-overlay-confirmation";
        ReactDOM.render(<CloseMockTestOverlayHTML />, div);
    }
    function CloseMockTestOverlayHTML({ event }) {
        return (
            <div className="container">
                <div className="content">
                    <span>Are you sure you want to close this mock test?</span>
                </div>
                <div className="footer flex justify-center items-center gap-2">
                    <span className="btn link cancel">cancel</span>
                    <span
                        className="btn  bg-red-500 text-white ml-auto border border-red-500"
                        onClick={() => {
                            event.target.closest(".me-overlay").remove();
                        }}
                    >
                        Yes, Close this mock test
                    </span>
                </div>
            </div>
        );
    }

    function getMockTextTimeLimit() {
        let total_questions = 10;
        let total_time = 10;
        return 10;
    }
    function createSharedMockTest() {}

    function submitMockTest(event, mock) {
        //let questions_list_div = event.target.closest(".me-overlay").querySelector(".question-list");
        let all_questions_divs = event.target.closest(".me-overlay").querySelectorAll(".que-div");
        let mock_obj = {
            id: mock ? (mock.id ? mock.id : getUniqueId()) : getUniqueId(),
            name: mock ? (mock.name ? mock.name : "Random Mock Test") : "Random Mock Test",
            questions: [],
            total_attempeted: 0,
            total_correct: 0,
            total_wrong: 0,
            date: getTodayDateAndTime(),
        };

        let ques = mock_obj.questions;

        all_questions_divs.forEach((div) => {
            let selected_option_div = div.querySelector(".selected");

            let obj = {
                id: div.id,
                selected_option_id: selected_option_div ? selected_option_div.id : null,
                answer_option_id: div.querySelector(".answer").id,
            };
            if (obj.selected_option_id) {
                mock_obj.total_attempeted++;
                if (obj.selected_option_id == obj.answer_option_id) {
                    mock_obj.total_correct++;
                } else {
                    mock_obj.total_wrong++;
                }

                // Only add the attempted questions in the daily practised questions
                let obj_2 = {
                    id: div.id,
                    selected_option_id: selected_option_div ? selected_option_div.id : null,
                    correct_option_id: div.querySelector(".answer").id,
                };
                addMcqToDailyPractisedQuestions(obj_2);
            }
            ques.push(obj);
        });

        mock_obj.questions = ques;
        userdata.mock_tests = userdata.mock_tests ? userdata.mock_tests : [];
        userdata.mock_tests.unshift(mock_obj);
        saveUserData();

        let overlay = event.target.closest(".me-overlay");
        ReactDOM.render(<MockTestResultHTML mock_obj={mock_obj} />, overlay);
        let mock_result_dom_update = setInterval(() => {
            if (overlay.querySelector(".result-details")) {
                clearInterval(mock_result_dom_update);
                overlay.querySelector(".result-detated").innerHTML = "Mock Test Result";
                mock_obj.questions.forEach((que) => {
                    let selected_option_id = que.selected_option_id;
                    let question_div = overlay.querySelector(`#${que.id}`);
                    if (selected_option_id) {
                        let ele = overlay.querySelector(`#${selected_option_id}`);
                        ele.classList.add("selected");
                        if (selected_option_id == que.answer_option_id) {
                            ele.classList.add("correct");
                        } else {
                            ele.classList.add("wrong");
                            overlay.querySelector(`#${que.answer_option_id}`).classList.add("correct");
                        }
                    } else {
                        let ele = overlay.querySelector(`#${que.answer_option_id}`);
                        ele.classList.add("correct");
                        ele.classList.add("not-attempted");
                    }
                    question_div.querySelectorAll(".option").forEach((option) => {
                        option.classList.add("disabled");
                        option.style.pointerEvents = "none";
                    });
                });
            }
        }, 1000);
    }
    function MockTestResultHTML({ mock_obj }) {
        return (
            <div className="container ">
                <div className="top-section flex justify-between items-center  p-3 gap-2">
                    <span className="text-xl font-bold">Mock Test Result</span>
                    <i
                        className="bi bi-x-circle text-xl ml-auto px-2 cursor-pointer"
                        onClick={(event) => {
                            event.target.closest(".me-overlay").remove();
                        }}
                    ></i>
                </div>

                <div className="hide result-details flex flex-col gap-2 bg-gray-100 p-2 m-2 rounded-md">
                    <span className="text-md ">Total Questions: {mock_obj.questions.length}</span>
                    <span className="text-md ">Total Attempeted: {mock_obj.total_attempeted}</span>
                    <span className="text-md text-green-500">Total Correct: {mock_obj.total_correct}</span>
                    <span className="text-md text-red-500">Total Wrong: {mock_obj.total_wrong}</span>
                </div>
                <div className="marks-details flex flex-col gap-2 bg-gray-50 p-2 m-2 rounded-md border-b-2">
                    <div className="flex justify-start items-start gap-2">
                        <span className="text-md border border-gray-300 rounded-md px-2 py-1 cursor-pointer" onClick={(event) => filterMockResultMCQs("all")}>
                            {mock_obj.questions.length}
                        </span>
                        <span className="text-md border bg-gray-100 border-gray-300 rounded-md px-2 py-1 cursor-pointer" onClick={(event) => filterMockResultMCQs("attempted")}>
                            {mock_obj.total_attempeted}
                        </span>
                        <span className="text-md border bg-green-100 border-green-300 rounded-md px-2 py-1 cursor-pointer" onClick={(event) => filterMockResultMCQs("correct")}>
                            {mock_obj.total_correct}
                        </span>
                        <span className="text-md border bg-red-100 border-red-300 rounded-md px-2 py-1 cursor-pointer" onClick={(event) => filterMockResultMCQs("wrong")}>
                            {mock_obj.total_wrong}
                        </span>
                    </div>
                    <div className="flex flex-col justify-start items-start gap-2">
                        <span className="text-md">Marks: {`${(mock_obj.total_correct * 2 - mock_obj.total_wrong * 0.6).toFixed(2).replace(/\.0+$/, "").replace(/\.00$/, "")} out of ${mock_obj.questions.length * 2}`}</span>
                        <span className="text-md">Percentage: {`${((mock_obj.total_correct / mock_obj.questions.length) * 100).toFixed(1)}%`}</span>
                    </div>
                    <span className="text-[10px] text-gray-400">Corred answer (+2) marks and wrong ans (-0.6) marks</span>
                </div>
                <div
                    className="share-mock hide m-2  link flex justify-center items-center w-auto gap-2 p-1 cursor-pointer rounded-md bg-blue-100"
                    onClick={(event) => {
                        popupAlert("Mock test shared successfully", 5, "bg-green-500");
                    }}
                >
                    <i className="text-md fa-solid fa-share"></i>
                    <span className="text-md  ">Share this mock test</span>
                </div>

                <span className="text-xl m-2 p-2 font-bold text-gray-400">Questions:</span>
                <div className="questions-list block max-h-[70vh] overflow-y-auto">
                    {mock_obj.questions.map((que, index) => (
                        <div className={`question-div m-2 ${que.selected_option_id ? (que.selected_option_id == que.answer_option_id ? "correct" : "wrong") : ""}`} key={index}>
                            {GetMCQHTML({ que: que.id, type: "mock-result", index: index + 1, selected_option_id: que.selected_option_id, is_show_icons: true, is_show_tags: true })}
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    function getUniqueId() {
        var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var id = "";
        for (var i = 0; i < 15; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }
    function getTodayDateAndTime() {
        const now = new Date();

        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
        const day = String(now.getDate()).padStart(2, "0");

        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");

        return {
            date: `${year}-${month}-${day}`,
            time: `${hours}:${minutes}:${seconds}`,
        };
    }

    async function saveUserData() {
        is_online = navigator.onLine;
        if (!is_online) {
            popupAlert("You are offline, cannot save userdata", 5, "red");
            return;
        }

        let data_ref = database.ref(`esa_data/${exam}/users_data/${user_login_data.userid}`);
        await data_ref.set(userdata);
        console.log(`userdata saved successfully to firebase`);
        return;

        // First save userdata to local storage
        let storage_id = getCurrentDateAndTime();
        esa_local_data[`userdata_last_update_time`] = storage_id;
        saveESALocalData();
        localStorage.setItem(`esa_userdata_${exam}`, JSON.stringify(userdata));

        console.log(`userdata saved successfully to local storage with id: ${storate_time}`);

        let is_online = navigator.onLine;
        //let userdata_last_update_time = getCurrentDateAndTime();
        if (is_online) {
            await database.ref(`${exam}/users/${user_login_data.userid}/userdata_last_update_time`).set(last_update_time);
            let user_ref = database.ref(`${exam}/users/${user_login_data.userid}/userdata`);
            await user_ref.set(userdata);
            console.log(`userdata saved successfully in firebase with id: ${last_update_time}`);
        } else {
            popupAlert("You are offline, Your data is stored only in Local Storage", 5, "red");
        }
    }

    let is_online = "";
    async function getUserData() {
        is_online = navigator.onLine;
        if (!is_online) {
            popupAlert("esa: You are offline, cannot fetch userdata", 5, "red");
            return {};
        }
        let data_ref = database.ref(`esa_data/${exam}/users_data/${user_login_data.userid}`);
        let data = await getDataFromFirebaseUsingRef(data_ref);
        userdata = data ? data : {};
        console.log(`esa: Userdata fetched successfully from firebase`);
        return;

        let local_storage_id = localStorage.getItem(`esa_userdata_${exam}_last_update_time`);
        is_online = navigator.onLine;
        if (!local_storage_id) {
            console.log(`esa: local userdata storage id not found`);
            if (!is_online) {
                console.log("esa: No local data found; Online data cannot be fetched as you are offline");
                return {};
            } else {
                let user_ref = database.ref(`${exam}/users/${user_login_data.userid}/userdata`);
                let data = await getDataFromFirebaseUsingRef(user_ref);
                if (!data) {
                    popupAlert("esa: No data found in firebase", 5, "red");
                    return {};
                }
                // get userdata from loc

                userdata = data;
                console.log(`esa: userdata = data from firebase`);
            }
        }

        // Since local storage id is found, get userdata from local storage
        let userdata_str = localStorage.getItem(`esa_userdata_${exam}`);
        if (userdata_str) {
            userdata = JSON.parse(userdata_str);
        } else {
            userdata = null;
        }

        let ref = database.ref(`${exam}/users/${user_login_data.userid}/userdata_last_update_time`);
        let firebase_userdata_storage_id = await getDataFromFirebaseUsingRef(ref);

        // If local and firebase userdata storage id is same and userdata is not null continue with local userdata
        if (firebase_userdata_storage_id && firebase_userdata_storage_id === local_storage_id && userdata) {
            return userdata;
        }

        if (firebase_userdata_storage_id && firebase_userdata_storage_id !== local_storage_id) {
            popupAlert("Local userdata storge id and online userdata storage id are different; Continuing with online userdata", 5, "red");
            let ref = database.ref(`${exam}/users/${user_login_data.userid}/userdata`);
            let data = await getDataFromFirebaseUsingRef(ref);
            if (!data) {
                popupAlert("No data found in firebase; continuing with local userdata", 5, "red");
                console.log("No data found in firebase; continuing with local userdata");
                if (userdata_str) {
                    userdata = JSON.parse(userdata_str);
                    console.log(`userdata = data from local storage`);
                } else {
                    userdata = null;
                }
            }
            userdata = data;
        }
    }

    function handleSelection() {
        const selection = window.getSelection();
        const selectedText = selection.toString();

        if (selectedText.length > 0) {
            openSelectionOverlay(selectedText);
        }
    }

    document.addEventListener("mouseup", handleSelection);
    document.addEventListener("touchend", handleSelection);

    let selection_text_overlay = null;

    function openSelectionOverlay(selectedText) {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();

            // Create overlay only if it doesn't exist
            if (!selection_text_overlay) {
                selection_text_overlay = document.createElement("div");
                selection_text_overlay.className = "text_selection_overlay"; // Overlay class name
                document.body.appendChild(selection_text_overlay); // Append to body or a specific container
            }

            // Set the position of the overlay
            selection_text_overlay.style.position = "absolute";

            // Calculate the initial position
            const overlayHeight = 100; // Adjust to match your overlay's height
            const topPosition = rect.top + window.scrollY - overlayHeight;
            const leftPosition = rect.left + window.scrollX;

            // Get viewport dimensions
            const viewportHeight = window.innerHeight;
            const viewportWidth = window.innerWidth;

            // Adjust the position if it goes off-screen
            if (topPosition < 0) {
                selection_text_overlay.style.top = `${rect.bottom + window.scrollY}px`; // Move below the selection
            } else {
                selection_text_overlay.style.top = `${topPosition}px`;
            }

            if (leftPosition + selection_text_overlay.offsetWidth > viewportWidth) {
                selection_text_overlay.style.left = `${viewportWidth - selection_text_overlay.offsetWidth}px`; // Align to right edge
            } else {
                selection_text_overlay.style.left = `${leftPosition}px`;
            }

            // Render the overlay using React
            ReactDOM.render(<SelectionOverlayHTML selectedText={selectedText} />, selection_text_overlay);

            // Add a click event listener to close the overlay when clicking outside
            document.addEventListener("click", handleClickOutside);
        }
    }

    function handleClickOutside(event) {
        if (selection_text_overlay && !selection_text_overlay.contains(event.target)) {
            closeSelectionOverlay();
        }
    }

    let times = 1;
    function closeSelectionOverlay() {
        if (selection_text_overlay && times >= 2) {
            times = 0;
            ReactDOM.unmountComponentAtNode(selection_text_overlay);
            document.body.removeChild(selection_text_overlay);
            selection_text_overlay = null; // Reset the overlay variable
            document.removeEventListener("click", handleClickOutside); // Clean up the event listener
        }
        ++times;
    }

    function SelectionOverlayHTML({ selectedText }) {
        return (
            <div className="container border border-gray-300 bg-white rounded-md">
                <div className="flex justify-center items-center  max-w-[90vw] overflow-x-auto gap-2 p-2">
                    <div className="search-in-mcq inline-block border rounded-md px-2 py-1 cursor-pointer link text-no-wrap" onClick={() => searchMcqs(selectedText)}>
                        Search in MCQs
                    </div>
                    <div className="search-in-mcq inline-block border rounded-md px-2 py-1 cursor-pointer link text-no-wrap" onClick={(event) => searchInNotesLoadOverlay(selectedText)}>
                        Search in Notes
                    </div>
                </div>
            </div>
        );
    }

    async function clearCache() {
        // Get user data from local storage
        //const user_data = localStorage.getItem(`esa_userdata_${exam}`);
        //user_data = user_data ? JSON.parse(user_data) : {};

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
        //location.reload(true);
    }

    let user_login_data = {};

    // load url is saved so that we can open the share link items after app loading
    let load_url = null;
    var esa_local_data = {};

    async function updateAppLevelData() {
        let ref = database.ref(`esa_data/app_data/last_time_code_update_id`);
        let id = new Date().getTime();
        await ref.set(id);
        popupAlert(`App level data updated successfully`);
    }
    //start app
    let has_updates = false;
    async function startApp() {
        load_url = window.location.href;
        let new_data_structure = localStorage.getItem(`esa_new_data_structure_00`);
        if (!new_data_structure) {
            //popupAlert(`esa: New data structure is not set; Setting it to new_data_structure_2024_11_13_00`);
            new_data_structure = "new_data_structure_2024_11_13_00";
            localStorage.clear();
            localStorage.setItem(`esa_new_data_structure_00`, new_data_structure);
            location.reload(true);
        }
        loadHTML("loading");

        let last_time_code_update_id = localStorage.getItem(`esa_last_time_code_update_id`);
        let ref = database.ref(`esa_data/app_data/last_time_code_update_id`);
        let data = await getDataFromFirebaseUsingRef(ref);
        if (data !== last_time_code_update_id) {
            localStorage.setItem(`esa_last_time_code_update_id`, data);
            clearCache();
            has_updates = true;
        }

        //Get last
        data = localStorage.getItem(`esa_exam_name`);
        exam = data ? data : "ssc";

        //Get exam from url
        let url = window.location.href;
        let url_items = parseURL(url);
        if (url_items.length && url_items[0]) exam = url_items[0];

        // get user_login_data from last saved data;
        user_login_data = localStorage.getItem(`esa_user_login_data`);
        if (user_login_data) user_login_data = JSON.parse(user_login_data);

        if (user_login_data && user_login_data.userid) postSignIn();
        else loadHTML("signin");
    }
    startApp();

    async function postSignIn() {
        exam = exam.toLowerCase();
        localStorage.setItem(`esa_exam_name`, exam);

        let url = window.location.href;
        let url_items = parseURL(url);

        loadHTML("home");
        loadHomePage();
        openTab("home");
        await loadData();

        initialLoading();
        openPageBasedOnURL(url);
    }

    function getCurrentDateAndTime() {
        const date = new Date();

        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
        const dd = String(date.getDate()).padStart(2, "0");
        const hh = String(date.getHours()).padStart(2, "0");
        const min = String(date.getMinutes()).padStart(2, "0");
        const ss = String(date.getSeconds()).padStart(2, "0");

        return `${yyyy}_${mm}_${dd}_${hh}_${min}_${ss}`;
    }

    function BookmarkedQuestionsOverlayHTML() {
        return (
            <div className="container bookmarked-questions-overlay-inner">
                <div className="header flex justify-start items-center gap-2 px-4 py-2 text-gray-600">
                    <span className="text-xl font-bold">Bookmarked Questions</span>
                    <i
                        className="bi bi-x-circle text-xl cursor-pointer"
                        onClick={(event) => {
                            event.target.closest(".me-overlay").remove();
                        }}
                    ></i>
                </div>
                <div className="content question-list h-[calc(100vh-50px)] overflow-y-scroll border-t-2">
                    {userdata.bookmarked_questions.map((que_id, index) => (
                        <div key={index} className="question-div">
                            {GetMCQHTML({ que: que_id, type: "bookmarked", index: index + 1, is_show_icons: true, is_show_tags: true })}
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    function addMcqToDailyPractisedQuestions(que_obj) {
        userdata.daily_practise_questions = userdata.daily_practise_questions ? userdata.daily_practise_questions : [];
        if (!userdata.daily_practise_questions.length || userdata.daily_practise_questions[0].date != getTodayDate()) {
            let obj = {
                date: getTodayDate(),
                questions: [],
            };
            userdata.daily_practise_questions.unshift(obj);
        }

        userdata.daily_practise_questions[0].questions.push(que_obj);
        console.log(`esa: question added to today practised questions`, userdata.daily_practise_questions);
        saveUserData();

        loadDailyPractiseQuestions();
    }
    function loadDailyPractiseQuestions() {
        userdata.daily_practise_questions = userdata.daily_practise_questions ? userdata.daily_practise_questions : [];
        if (userdata.daily_practise_questions.length) {
            if (userdata.daily_practise_questions[0].date == getTodayDate()) {
                let target = document.querySelector(".today-practised-questions");
                let today_questions = userdata.daily_practise_questions[0].questions;
                ReactDOM.render(<DailyPractisedQuestionsHTML today_questions={today_questions} />, target);
            }

            setTimeout(() => {
                const questionsList = document.querySelector(".today-practised-questions .questions-list");
                const lastQuestion = questionsList ? questionsList.lastElementChild : null;

                if (lastQuestion) {
                    //lastQuestion.scrollIntoView({ behavior: "smooth", inline: "start" });
                }
            }, 1000);
        } else {
            return;
        }
    }

    function DailyPractisedQuestionsHTML({ today_questions }) {
        let today_practised_questions = userdata.daily_practise_questions ? userdata.daily_practise_questions : [];
        let total_questions = today_questions.length;
        let correct_questions = today_questions.filter((question) => question.selected_option_id == question.correct_option_id).length;
        let wrong_questions = today_questions.filter((question) => question.selected_option_id != question.correct_option_id).length;
        let correct_questions_ids = today_questions.filter((question) => question.selected_option_id == question.correct_option_id).map((question) => question.id);
        let wrong_questions_ids = today_questions.filter((question) => question.selected_option_id != question.correct_option_id).map((question) => question.id);

        return (
            <div className="today-practised-questions-inner flex flex-col gap-2 w-full my-2 ">
                <span className="flex justify-start items-center gap-2">
                    <span className="today-date-- hide text-xl font-bold  text-gray-700">Today practised MCQs: {getTodayDateMMddyyyy()}</span>
                    <span className="today-date text-[1.2em] font-bold  text-gray-500">Today Practised MCQs:</span>
                    <span className="today-day bg-orange-200  px-2 py-1 text-[10px] rounded-md hide">{getTodayDay()}</span>
                    <div className="today-practised-questions-count flex gap-2 justify-center items-center   px-2 t-gray-500">
                        <span
                            className="total bg-gray-100 text-gray-700 rounded-md px-2 py-1 cursor-pointer text-sm"
                            onClick={() => {
                                let overlay = document.querySelector(".me-overlay.today-practised-questions-overlay");
                                if (!overlay) {
                                    overlay = document.createElement("div");
                                    overlay.className = "me-overlay today-practised-questions-overlay";
                                    document.querySelector(".me-overlays").appendChild(overlay);
                                } else {
                                    openOverlay("today-practised-questions-overlay");
                                }

                                ReactDOM.render(<TodayPractisedQuestionsOverlayHTML today_questions={today_questions} type={"all"} />, overlay);
                            }}
                        >
                            {" "}
                            {total_questions}{" "}
                        </span>
                        <span
                            className="correct bg-green-100 text-green-700 rounded-md px-2 py-1 cursor-pointer text-sm"
                            onClick={() => {
                                let overlay = document.querySelector(".me-overlay.today-practised-questions-overlay");
                                if (!overlay) {
                                    overlay = document.createElement("div");
                                    overlay.className = "me-overlay today-practised-questions-overlay";
                                    document.querySelector(".me-overlays").appendChild(overlay);
                                } else {
                                    openOverlay("today-practised-questions-overlay");
                                }

                                ReactDOM.render(<TodayPractisedQuestionsOverlayHTML today_questions={today_questions} type={"correct"} />, overlay);
                            }}
                        >
                            {" "}
                            {correct_questions}
                        </span>
                        <span
                            className="wrong bg-red-100 text-red-700 rounded-md px-2 py-1 cursor-pointer text-sm"
                            onClick={() => {
                                let overlay = document.querySelector(".me-overlay.today-practised-questions-overlay");
                                if (!overlay) {
                                    overlay = document.createElement("div");
                                    overlay.className = "me-overlay today-practised-questions-overlay";
                                    document.querySelector(".me-overlays").appendChild(overlay);
                                } else {
                                    openOverlay("today-practised-questions-overlay");
                                }

                                ReactDOM.render(<TodayPractisedQuestionsOverlayHTML today_questions={today_questions} type={"wrong"} />, overlay);
                            }}
                        >
                            {wrong_questions}
                        </span>
                    </div>
                </span>
                <div className="today-practised-questions-list flex justify-center items-center w-full gap-2  my-2  border-2  rounded-md ">
                    <span className="hide previous-question bg-gray-200 border w-[20px] rounded-md p-1 m-1 text-gray-700 cursor-pointer"> {"<"} </span>
                    <span className="questions-list inline-block  py-2 px-1 flex-1 questions-list w-full overflow-x-scroll">
                        {today_questions.map((question, index) => (
                            <span
                                className={`question  rounded-md m-1 px-2 py-1 cursor-pointer text-sm text-gray-500 ${question.selected_option_id == question.correct_option_id ? "bg-green-100" : "bg-red-100 "} `}
                                key={index}
                                onClick={() => {
                                    openMcq(question.id, null, "daily", question.selected_option_id, index + 1);
                                }}
                            >
                                {index + 1}
                            </span>
                        ))}
                    </span>
                    <span className="hide next-question bg-gray-200 border w-[20px] rounded-md p-1 m-1 text-gray-700 cursor-pointer">{">"}</span>
                </div>
            </div>
        );
    }

    function TodayPractisedQuestionsOverlayHTML({ today_questions, type }) {
        return (
            <div className="container ">
                <div className="header py-3 px-4 flex justify-center items-center gap-2 text-gray-600 text-xl border-b-2">
                    <span className="text-xl font-bold">{type ? (type == "all" ? "Today Practised All Questions" : type == "correct" ? "Today Practised Correct Questions" : "Today Practised Wrong Questions") : " Practised Questions"}</span>
                    <i
                        className="bi bi-x-circle text-xl ml-auto cursor-pointer"
                        onClick={(event) => {
                            event.target.closest(".me-overlay").remove();
                        }}
                    ></i>
                </div>
                <div className="content block h-full  max-h-[calc(100vh-50px)] overflow-y-scroll px-2 ">
                    {today_questions.map((question, index) => {
                        // Check conditions based on type ("correct" or "wrong")
                        if (type === "correct" && question.selected_option_id !== question.correct_option_id) {
                            return null; // Skip rendering if it's a correct type and selected option is not correct
                        } else if (type === "wrong" && question.selected_option_id === question.correct_option_id) {
                            return null; // Skip rendering if it's a wrong type and selected option is correct
                        }

                        // Render the question div if conditions are met
                        return (
                            <div key={index} className="question-div m-2">
                                {GetMcqDiv({ que: question.id, type: "daily", index: index + 1, selected_option_id: question.selected_option_id })}
                                <span
                                    className="link hide cursor-pointer mb-5 inline-block text-right pr-[20px] w-full"
                                    onClick={(event) => {
                                        openMcq(question.id, null, "daily", question.selected_option_id, index + 1);
                                        closeOverlay(event);
                                    }}
                                >
                                    Open above MCQ in main page
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    function getTodayDate() {
        // in the YYYY-MM-DD format
        var today = new Date();
        var year = today.getFullYear();
        var month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
        var day = String(today.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    function changeExam(exam) {
        let url = window.location.href;
        url = url.substring(0, url.indexOf("/#/"));
        url = url + "/#/" + exam + "/home";
        window.location.href = url;
        location.reload(true);
    }

    let xStart = null;
    let yStart = null;
    let xDiff = null;
    let yDiff = null;
    const SWIPE_THRESHOLD = 100; // Minimum distance in px for the swipe to be registered

    function handleTouchStart(event) {
        const firstTouch = event.touches[0];
        xStart = firstTouch.clientX;
        yStart = firstTouch.clientY;
        xDiff = 0; // Reset xDiff
        yDiff = 0; // Reset yDiff
    }

    function handleTouchMove(event) {
        if (!xStart || !yStart) {
            return;
        }

        let xEnd = event.touches[0].clientX;
        let yEnd = event.touches[0].clientY;

        xDiff = xStart - xEnd;
        yDiff = yStart - yEnd;

        const isHorizontalScroll = canScrollHorizontally(event.target);

        // Only process if it's a horizontal swipe and no horizontal scroll is present
        if (!isHorizontalScroll && Math.abs(xDiff) > Math.abs(yDiff)) {
            event.preventDefault(); // Prevent default scroll behavior when swiping
        }
    }

    function handleTouchEnd(event) {
        if (!xStart || !yStart) {
            return;
        }

        if (Math.abs(xDiff) > SWIPE_THRESHOLD && Math.abs(xDiff) > Math.abs(yDiff)) {
            // Swipe detected and passed the threshold
            if (xDiff > 0) {
                // Swipe left - go to the next tab
                switchTab("left", event);
            } else {
                // Swipe right - go to the previous tab
                switchTab("right", event);
            }
        }

        // Reset starting positions
        xStart = null;
        yStart = null;
        xDiff = null;
        yDiff = null;
    }

    function switchTab(direction, event) {
        if (!event.target.closest(".main.tab-containers .tab-container.page")) {
            return; // Do nothing if the event target doesn't meet the criteria
        }

        const tabs = document.querySelectorAll(".main.tabs > .tab");
        let activeIndex = -1;

        tabs.forEach((tab, index) => {
            if (tab.classList.contains("active")) {
                activeIndex = index;
            }
        });

        if (direction === "left" && activeIndex < tabs.length - 1) {
            // Move to the next tab if not the last tab
            tabs[activeIndex].classList.remove("active");
            tabs[activeIndex + 1].classList.add("active");
            openTab(tabs[activeIndex + 1].textContent.trim().toLowerCase());
        } else if (direction === "right" && activeIndex > 0) {
            // Move to the previous tab if not the first tab
            tabs[activeIndex].classList.remove("active");
            tabs[activeIndex - 1].classList.add("active");
            openTab(tabs[activeIndex - 1].textContent.trim().toLowerCase());
        }
    }

    // Function to check if the target element can scroll horizontally
    function canScrollHorizontally(element) {
        return element.scrollWidth > element.clientWidth;
    }

    // Add touch event listeners
    document.addEventListener("touchstart", (event) => handleTouchStart(event), false);
    document.addEventListener("touchmove", (event) => handleTouchMove(event), false);
    document.addEventListener("touchend", (event) => handleTouchEnd(event), false);

    async function addESADataIntoFirebase() {
        let filename = `my_data_${exam}.json`;

        const response = await fetch(filename);

        const data = await response.json();

        let ques_data = data[0].ques ? data[0].ques : [];
        let notes_data = data[0].notes ? data[0].notes : [];
        let mocks_data = data[0].mocks ? data[0].mocks : [];
        let tags_list = data[0].tags_list ? data[0].tags_list : [];
        let handnotes = data[0].handnotes ? data[0].handnotes : [];
        let pdfs = data[0].pdfs ? data[0].pdfs : [];
        let vocab_data = data[0].vocab ? data[0].vocab : [];

        if (exam == "neet") notes_data = [];

        await database.ref(`esa_data/${exam}/roam_data/questions`).set(ques_data);
        await database.ref(`esa_data/${exam}/roam_data/notes`).set(notes_data);
        await database.ref(`esa_data/${exam}/roam_data/mocks`).set(mocks_data);
        await database.ref(`esa_data/${exam}/roam_data/tags`).set(tags_list);
        await database.ref(`esa_data/${exam}/roam_data/handnotes`).set(handnotes);
        await database.ref(`esa_data/${exam}/roam_data/pdfs`).set(pdfs);
        await database.ref(`esa_data/${exam}/roam_data/vocab`).set(vocab_data);
        //await database.ref(`esa_data/${exam}/roam_data/data_last_update_time`).set(new Date().toISOString());
        popupAlert("Data added to firebase");
    }

    var autocompleteList = "";
    autocompleteList = document.createElement("div");
    autocompleteList.className = "me-autocomplete-list";
    document.body.append(autocompleteList);

    function setAutoComplete(event, arr, type, target) {
        var input = event.target;

        input.addEventListener("input", function () {
            let create_new_tags = false;
            if (type == "add-new-que-tags" || type == "new-mcq-tags") create_new_tags = true;
            var inputValue = input.value.trim().toLowerCase();
            //const matchingNames = [];
            //try {
            let matchingNames;
            if (type == "handnotes") {
                matchingNames = arr.filter((name) => name.text.toLowerCase().includes(inputValue));
            } else {
                matchingNames = arr.filter((name) => name.toLowerCase().includes(inputValue));
            }
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
                if (type == "handnotes") {
                    item.textContent = name.text;
                    item.id = name.id;
                } else {
                    item.textContent = name;
                }

                item.addEventListener("click", (event) => {
                    var tar = input.parentElement;
                    var tag = event.target.textContent.trim();
                    input.value = "";
                    input.focus();
                    autocompleteList.classList.remove("active");
                    if (type == "handnotes") {
                        let id = event.target.id;
                        //let handnote = handnotes.find((handnote) => handnote.id == id);
                        openHandnotesItem(id);
                        return;
                    }

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

                    if (type == "new-mcq-tags") {
                        let all_tags = target.querySelectorAll(".tag-item .name");

                        let is_tag_already_added = false;
                        for (let i = 0; i < all_tags.length; i++) {
                            let tag_item = all_tags[i];
                            if (tag_item.textContent.toLowerCase() == tag.toLowerCase()) {
                                popupAlert(`${tag} is already added`);
                                return;
                            }
                        }

                        let div = document.createElement("div");
                        div.className = "tag-item flex justify-between items-center gap-2 border border-blue-400 rounded-md px-3";
                        div.innerHTML = `<span class="name text-gray-500">${tag.toLowerCase()}</span><span class="remove text-[10px] text-red-700 cursor-pointer">X</span>`;
                        div.querySelector(".remove").addEventListener("click", (event) => {
                            event.target.closest(".tag-item").remove();
                        });
                        target.appendChild(div);
                        return;
                    }

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

    function getCurrentDateTime() {
        const now = new Date();

        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-based in JS
        const day = String(now.getDate()).padStart(2, "0");
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");

        return `${year}${month}${day}${hours}${minutes}${seconds}`;
    }

    function convertDateTo_Aug_10_2024_Format(inputDate) {
        // Split the input date into its components
        const [year, month, day] = inputDate.split("-");

        // Create a new Date object
        const date = new Date(year, month - 1, day); // month is 0-indexed

        // Define options for formatting
        const options = { year: "numeric", month: "short", day: "numeric" };

        // Return the formatted date
        return date.toLocaleDateString("en-US", options);
    }

    async function uploadNewMCQsToFirebase() {
        let exam = "ssc";
        let filename = `../data/new_data_ssc.json`;
        const response = await fetch(filename);
        const data = await response.json();

        data.forEach((q) => {
            if (q.question.trim() == "") {
                console.log(`question without text: ${q.id}`);
            }
        });
        let ids = data.map((q) => q.id);
        let ref = database.ref(`esa_data/${exam}/mcqs`);
        let mcq_data = await getDataFromFirebaseUsingRef(ref);

        let arr = mcq_data.filter((q) => ids.includes(q.id));
        // Remove these entries from mcq_data
        mcq_data = mcq_data.filter((q) => !ids.includes(q.id));

        mcq_data = mcq_data.concat(data);
        await ref.set(mcq_data);

        popupAlert("Data added to firebase");
    }

    async function uploadTestMCQsToFirebase() {
        let exam = "ssc";
        let filename = `../data/test_mcq.json`;
        const response = await fetch(filename);
        const data = await response.json();

        data.forEach((q) => {
            if (q.question.trim() == "") {
                console.log(`question without text: ${q.id}`);
            }
        });
        let ids = data.map((q) => q.id);
        let ref = database.ref(`esa_data/${exam}/test_mcqs`);
        await ref.set(data);
        popupAlert("Test MCQs data added to firebase");

        //let test_mcq_data = await getDataFromFirebaseUsingRef(ref);
        //test_mcq_data = test_mcq_data ? test_mcq_data : [];

        //let arr = mcq_data.filter((q) => ids.includes(q.id));
        // Remove these entries from mcq_data
        //mcq_data = mcq_data.filter((q) => !ids.includes(q.id));

        //mcq_data = mcq_data.concat(data);
    }

    async function updateMCQ(id) {
        let exam = "ssc";
        let ref = database.ref(`esa_data/${exam}/mcqs`);
        let mcq_data = await getDataFromFirebaseUsingRef(ref);
        let mcq = mcq_data.find((q) => q.id == id);

        await ref.set(mcq_data);
    }

    const canvas = document.getElementById("crackerCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Ensure this code is in a place where it can access the `canvas`

    function blastCrackers22(x, y) {
        const canvas = document.getElementById("crackerCanvas");
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const colors = ["#FF5733", "#FFC300", "#DAF7A6", "#FF33FF", "#33FF57"];

        const createParticles = (x, y) => {
            for (let i = 0; i < 50; i++) {
                particles.push({
                    x: x,
                    y: y,
                    size: Math.random() * 15 + 5, // Larger size for particles
                    speedX: (Math.random() - 0.5) * 8,
                    speedY: (Math.random() - 0.5) * 8,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    life: Math.random() * 30 + 10,
                });
            }
        };

        createParticles(x, y);

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((particle, index) => {
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.fill();

                particle.x += particle.speedX;
                particle.y += particle.speedY;
                particle.size *= 0.5; // Slow down the reduction in size
                particle.life -= 1;

                if (particle.life <= 0) particles.splice(index, 1);
            });

            if (particles.length > 0) requestAnimationFrame(animate);
        };

        animate();
    }

    function blastCrackers(x, y) {
        const canvas = document.getElementById("crackerCanvas");
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const colors = ["#FF5733", "#FFC300", "#DAF7A6", "#FF33FF", "#33FF57"];

        const createParticles = (x, y) => {
            for (let i = 0; i < 50; i++) {
                particles.push({
                    x: x,
                    y: y,
                    size: Math.random() * 5 + 1,
                    speedX: (Math.random() - 0.5) * 6,
                    speedY: (Math.random() - 0.5) * 6,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    life: Math.random() * 30 + 10,
                });
            }
        };

        createParticles(x, y);

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((particle, index) => {
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.fill();

                particle.x += particle.speedX;
                particle.y += particle.speedY;
                particle.size *= 0.95;
                particle.life -= 1;

                if (particle.life <= 0) particles.splice(index, 1);
            });

            if (particles.length > 0) requestAnimationFrame(animate);
        };

        animate();
    }

    function blastCrackers__(event) {
        const particles = [];
        const colors = ["#FF5733", "#FFC300", "#DAF7A6", "#FF33FF", "#33FF57"];

        const createParticles = (x, y) => {
            for (let i = 0; i < 50; i++) {
                particles.push({
                    x: x,
                    y: y,
                    size: Math.random() * 5 + 1,
                    speedX: (Math.random() - 0.5) * 6,
                    speedY: (Math.random() - 0.5) * 6,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    life: Math.random() * 30 + 10,
                });
            }
        };

        createParticles(event.clientX, event.clientY);

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((particle, index) => {
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.fill();

                particle.x += particle.speedX;
                particle.y += particle.speedY;
                particle.size *= 0.95;
                particle.life -= 1;

                if (particle.life <= 0) particles.splice(index, 1);
            });

            if (particles.length > 0) requestAnimationFrame(animate);
        };

        animate();
    }

    //document.addEventListener("click", blastCrackers);
})();
