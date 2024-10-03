(function () {
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

    let exam = "SSC";
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
                        <div className="absolute hide top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="30" cy="30" r="28" fill="url(#gradient)" />
                                <defs>
                                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#4A00E0" />
                                        <stop offset="100%" stopColor="#8E2DE2" />
                                    </linearGradient>
                                </defs>
                                <path d="M20 18 L40 18 L40 24 L26 24 L26 27 L38 27 L38 33 L26 33 L26 36 L40 36 L40 42 L20 42 Z" fill="white" />
                                <path d="M24 21 L36 21 L36 24 L24 24 Z" fill="#4A00E0" />
                                <path d="M24 30 L34 30 L34 33 L24 33 Z" fill="#8E2DE2" />
                                <path d="M24 39 L36 39 L36 42 L24 42 Z" fill="#4A00E0" />
                            </svg>
                        </div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                                <span className="text-3xl font-bold text-white transform -rotate-12" style={{ fontFamily: "Arial, sans-serif" }}>
                                    E
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex hide flex-col justify-center items-center gap-2">
                    <h1 className="text-2xl font-bold text-gray-800">Loading...</h1>
                    <span className="text-sm text-gray-500">Please wait while we load the app</span>
                </div>
            </div>
        );
    }

    function LoadSignInPageHTML() {
        return (
            <div className="container-inner flex flex-col justify-center items-center h-[100vh] w-full">
                <div className="mt-10 transform -translate-y-1/2">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-3xl font-bold text-white transform -rotate-12" style={{ fontFamily: "Arial, sans-serif" }}>
                            E
                        </span>
                    </div>
                </div>
                <div className="app-features flex flex-col justify-start items-start gap-2 m-2 p-2">
                    <h1 className="text-xl font-bold text-gray-800">Features:</h1>
                    <div className="flex justify-start mcq items-center gap-2">
                        <i className="fa-regular fa-circle-check text-green-500"></i>
                        <span className="text-sm text-gray-500">Practise, Create and Share MCQs</span>
                    </div>
                    <div className="flex justify-start notes items-center gap-2">
                        <i className="fa-regular fa-circle-check text-green-500"></i>
                        <span className="text-sm text-gray-500">Read Crips & Clear Notes</span>
                    </div>
                    <div className="flex justify-start own-notes items-center gap-2">
                        <i className="fa-regular fa-circle-check text-green-500"></i>
                        <span className="text-sm text-gray-500">Add Your Own Notes</span>
                    </div>
                    <div className="flex justify-start mcq items-center gap-2">
                        <i className="fa-regular fa-circle-check text-green-500"></i>
                        <span className="text-sm text-gray-500">Watch Videos and Add Your Own Videos</span>
                    </div>
                    <div className="flex justify-start mcq items-center gap-2">
                        <i className="fa-regular fa-circle-check text-green-500"></i>
                        <span className="text-sm text-gray-500">Give and Share Custom Mock Tests</span>
                    </div>
                    <div className="flex justify-start mcq items-center gap-2">
                        <i className="fa-regular fa-circle-check text-green-500"></i>
                        <span className="text-sm text-gray-500">And many more things..</span>
                    </div>
                </div>
                <div className="flex justify-center items-center gap-2 my-2">
                    <button
                        id="google-sign-in-btn"
                        className="google-signin flex justify-center items-center gap-2 border-2 border-gray-300  px-3 py-2 rounded-full"
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
                                    };

                                    //checkIsUserExist(user.email);

                                    //saveDataInLocale("user_login_data", user_login_data);
                                    localStorage.setItem("esa_user_login_data", JSON.stringify(user_login_data));
                                    postSignIn();
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
                        <img src="/assets/google.jpg" alt="" className="w-[20px] h-[20px]" />
                        <span className="text-sm text-gray-700">Continue with Google</span>
                    </button>
                </div>
            </div>
        );
    }

    function LoadHTML() {
        setTimeout(() => {
            initialLoading();
            openPageBasedOnURL(url);
        }, 2000);
        return (
            <div className="container-inner">
                <div className="main tabs flex justify-center align-middle gap-5 h-[50px]px-4 py-4 border-b-2">
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

                <div className=" main tab-containers flex justify-center items-center gap-4">
                    <div className="app-loading bg-black fixed top-0 left-0 w-full h-full flex justify-center items-center hide">
                        <img src="/assets/esa_logo.png" alt="app-logo" className="w-[100px] rounded-full rotate" />
                    </div>

                    <div className="tab-container page home flex justify-center items-start gap-2 h-[calc(100vh-50px)] overflow-y-scroll hide "></div>

                    <div className="tab-container page mcq h-[calc(100vh - 50px)] overflow-y-scroll hide">
                        <h1>MCQ</h1>
                    </div>
                    <div className="tab-container page notes max-h-[calc(100vh - 70px)] overflow-y-scroll pb-30 hide">
                        <h1>Notes</h1>
                    </div>
                    <div className="tab-container page mock h-full hide">
                        <h1>Mock</h1>
                    </div>
                </div>
            </div>
        );
    }

    function animateLoader() {
        debugger;
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
            debugger;
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
        if (!userdata) getUserData();
        loadHomePage();
        //document.querySelector(".app-loading").classList.add("hide");
        openTab("home");

        loadMcqPage();
        loadMcqTags();
        loadDailyPractiseQuestions();
        curr_que_index = 0;
        filtered_ques = sortArrayRandomly(que_data);
        openMcq(filtered_ques[curr_que_index]);

        loadNotesPage();
        loadMockTestPage();
    }

    function OverlayHTML() {
        return (
            <div className="me-overlay bg-transparent opacity-5">
                <div className=" opacity-100"></div>
            </div>
        );
    }

    function LoadHomePageHTML() {
        return (
            <div>
                <div className="user-info  my-3 mx-2 p-2  flex flex-col justify-start items-start gap-2">
                    <div className="flex justify-center items-center">
                        <span className=" text-gray-500 ">Signed in as "{user_login_data.display_name}"</span>
                        <span
                            className="sign-out-btn ml-[30px] cursor-pointer link"
                            onClick={() => {
                                localStorage.removeItem("esa_user_login_data", null);
                                popupAlert("User signed out");
                                location.reload(true);
                            }}
                        >
                            sign out
                        </span>
                    </div>
                    <div className="flex justify-center items-center gap-2 hide">
                        <img src={user_login_data.photo_url} alt="user-photo" className="w-10 rounded-full" />
                        <div className="flex flex-col justify-center items-start">
                            <span className="text-sm text-gray-700">{user_login_data.display_name}</span>
                            <span className="text-sm text-gray-500">{user_login_data.email}</span>
                        </div>
                    </div>
                </div>
                <div className="page-container flex flex-col justify-center items-center">
                    <div className="hide flex flex-col justify-center p-2 items-center gap-2">
                        <img src="/assets/esa_logo.png" alt="app-logo" className="w-1/4 rounded-full" />
                        <h1 className="text-2xl font-bold app-title text-center p-2  hide bg-gradient-to-r from-red-600 to-purple-700 bg-clip-text text-transparent ">Elahi Study App</h1>
                        <h1 className="text-2xl font-bold app-title text-center p-2 text-gray-800">Elahi Study App</h1>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-2">
                        <div className="hide w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-3xl font-bold text-white transform -rotate-12" style={{ fontFamily: "Arial, sans-serif" }}>
                                E
                            </span>
                        </div>
                        <h1 className="text-2xl font-bold app-title text-center p-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Elahi Study App</h1>
                    </div>

                    <span className="text-sm text-gray-500 py-3 ">Build with ❤️ by Mehboob Elahi</span>
                    <div className="social-media flex justify-center items-center gap-4 opacity-70">
                        <a href="https://facebook.com/mehboobelahi05" target="_blank">
                            <i className="fa-brands fa-facebook"></i>
                        </a>
                        <a href="https://instagram.com/mehboobelahi05" target="_blank">
                            <i className="fa-brands fa-instagram"></i>
                        </a>
                        <a href="https://youtube.com/@mehboobelahi05/featured" target="_blank">
                            <i className="fa-brands fa-youtube"></i>
                        </a>
                        <a href="https://twitter.com/mehboobelahi05" target="_blank">
                            <i className="fa-brands fa-twitter"></i>
                        </a>
                    </div>
                    <div
                        className="flex justify-center items-center gap-2 py-4 cursor-pointer"
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
                        <i className="fa-regular fa-share link"></i>
                        <span className="text-sm link ">Share app link with your friends</span>
                    </div>
                    <div
                        className={`flex justify-center items-center gap-2 py-4 cursor-pointer ${is_mobile ? "" : "hide"} `}
                        onClick={() => {
                            popupAlert("Will be added soon ... ");
                        }}
                    >
                        <i className="fa-regular fa-download link"></i>
                        <span className="text-sm link">Download android app</span>
                    </div>

                    <div className="exam-div dropdown-div">
                        <button
                            id="dropßdownHoverButton"
                            data-dropdown-toggle="dropdownHover"
                            data-dropdown-trigger="hover"
                            class="text-gray-500 bg-gray-100 font-medium rounded-lg text-sm px-7 py-2.5 text-center inline-flex items-center"
                            type="button"
                            onClick={(event) => {
                                let exam_div = event.target.closest(".dropdown-div");
                                exam_div.querySelector(".dropdown-options").classList.toggle("hidden");
                            }}
                        >
                            Exam: {exam.toUpperCase()}
                            <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>
                        <div id="dropdownHover" class=" dropdown-options z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-30 dark:bg-gray-700">
                            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200 dropdown-option" aria-labelledby="dropdownHoverButton">
                                <li className="dropdown-option-item" onClick={(event) => changeExam("ssc")}>
                                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        SSC
                                    </a>
                                </li>
                                <li className="dropdown-option-item" onClick={(event) => changeExam("neet")}>
                                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        NEET
                                    </a>
                                </li>
                                <li className="dropdown-option-item" onClick={(event) => changeExam("upsc")}>
                                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        USPC
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <select
                            className="block hide  w-full text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2"
                            onChange={(event) => {
                                let exam = event.target.value;
                                let url = window.location.href;
                                url = url.substring(0, url.indexOf("/#/"));
                                url = url + "/#/" + exam + "/home";
                                window.location.href = url;
                                location.reload(true);
                            }}
                        >
                            <option value="ssc">SSC</option>
                            <option value="neet">NEET</option>
                            <option value="upsc">UPSC</option>
                        </select>
                    </div>

                    <div className="app-features flex flex-col justify-start items-start gap-2 m-2 p-2">
                        <h1 className="text-xl font-bold text-gray-800">Features:</h1>
                        <div className="flex justify-start mcq items-center gap-2">
                            <i className="fa-regular fa-circle-check text-green-500"></i>
                            <span className="text-sm text-gray-500">Practise, Create and Share MCQs</span>
                        </div>
                        <div className="flex justify-start notes items-center gap-2">
                            <i className="fa-regular fa-circle-check text-green-500"></i>
                            <span className="text-sm text-gray-500">Read Crips & Clear Notes</span>
                        </div>
                        <div className="flex justify-start own-notes items-center gap-2">
                            <i className="fa-regular fa-circle-check text-green-500"></i>
                            <span className="text-sm text-gray-500">Add Your Own Notes</span>
                        </div>
                        <div className="flex justify-start mcq items-center gap-2">
                            <i className="fa-regular fa-circle-check text-green-500"></i>
                            <span className="text-sm text-gray-500">Watch Videos and Add Your Own Videos</span>
                        </div>
                        <div className="flex justify-start mcq items-center gap-2">
                            <i className="fa-regular fa-circle-check text-green-500"></i>
                            <span className="text-sm text-gray-500">Give and Share Custom Mock Tests</span>
                        </div>
                        <div className="flex justify-start mcq items-center gap-2">
                            <i className="fa-regular fa-circle-check text-green-500"></i>
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
        let all_ques = esa_ques.concat(shared_ques);
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
        const maxWidth = Math.min(700, window.innerWidth * 0.95);
        return (
            <div className={`flex flex-col gap-2  w-[${maxWidth}px] mx-auto overflow-y-scroll`}>
                <span className="hide text-transparent text-center bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-xl p-2 font-bold">Practice Random MCQs</span>
                <div className="today-practised-questions m-2 flex flex-col gap-2 justify-center items-center "></div>

                <div className="flex justify-start items-center gap-5 p-2">
                    <div className="search-mcq flex justify-center items-center gap-2 border border-blue-600 rounded-md px-2 py-1 cursor-pointer text-blue-600" onClick={() => searchMcqs()}>
                        <i className="fa-light fa-magnifying-glass text-sm"></i>
                        <span className="text-sm text-no-wrap hide "> {is_mobile ? "Search" : "Search by text"}</span>
                        <span className="text-sm text-no-wrap ">Search MCQs by text</span>
                    </div>

                    <div className="filter-mcq flex justify-center items-center gap-2 border border-blue-600 rounded-md px-2 py-1 cursor-pointer text-blue-600" onClick={() => openOverlay("filter-mcq-overlay")}>
                        <i className="fa-regular fa-filter text-sm"></i>
                        <span className="text-sm text-no-wrap opacity-70 hide">{is_mobile ? "Filter" : "Filter by tags"}</span>
                        <span className="text-sm text-no-wrap">Filter MCQs by tags</span>
                    </div>

                    <div className="create-mcq hide flex justify-center items-center gap-2 border rounded-md px-2 py-1 cursor-pointer link" onClick={() => createMCQs()}>
                        <i className="fa-regular fa-add text-sm"></i>
                        <span className="text-sm text-no-wrap opacity-70"> {is_mobile ? "Create" : "Create mcq"} </span>
                    </div>
                    <div
                        className="bookmarked-questions hide flex justify-center items-center gap-2 border rounded-md px-2 py-1 cursor-pointer link"
                        onClick={(event) => {
                            let overlay_name = "bookmarked-questions-overlay";
                            let overlay_div = document.querySelector(`.${overlay_name}`);
                            overlay_div = document.createElement("div");
                            overlay_div.className = `me-overlay ${overlay_name}`;
                            document.querySelector(".me-overlays").appendChild(overlay_div);
                            ReactDOM.render(<BookmarkedQuestionsOverlayHTML />, overlay_div);
                        }}
                    >
                        <i className="fa-regular fa-bookmark text-sm"></i>
                        <span className="text-sm text-no-wrap opacity-70"> {is_mobile ? "Bookmarked" : "Bookmarked Mcqs"} </span>
                    </div>
                </div>

                <div className="subject-div flex justify-center items-center gap-2 w-full overflow-x-scroll">
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
                <div className="filter-message-div flex justify-start items-start flex-wrap gap-2 py-2 px-3 bg-blue-100   rounded-md">
                    <span className="text-sm flex  flex-wrap flex-1 filter-mcq-message text-gray-700 "></span>
                    <i className="fa-regular fa-circle-xmark clear-filter ml-auto cursor-pointer text-red-600 mt-1 hide" onClick={() => clearFilter()}></i>
                </div>
                <div className="que-text"></div>
                <div className="bottom flex justify-center items-center ">
                    <button className="bg-gray-200 w-[300px] text-gray-700 px-4 py-2  rounded-md" onClick={() => nextQuestion()}>
                        Next Question
                    </button>
                </div>
            </div>
        );
    }

    function NotesPageHTML() {
        return (
            <div className="notes-page-inner flex flex-col h-full">
                <div className="flex gap-5 h-full justify-center items-center p-2 border-b-2 border-gray-300 ">
                    <div className="search-notes flex justify-center items-center gap-2 border rounded-md px-2 py-1 cursor-pointer link" onClick={() => searchInNotesLoadOverlay()}>
                        <i className="fa-light fa-magnifying-glass text-sm"></i>
                        <span className="text-sm text-no-wrap opacity-70"> {is_mobile ? "Search in notes" : "Search in notes"}</span>
                    </div>

                    <div className="chapter-list flex justify-center items-center gap-2 border rounded-md px-2 py-1 cursor-pointer link" onClick={() => openOverlay("note-chapter-list-overlay")}>
                        <i className="fa-regular fa-list text-sm"></i>
                        <span className="text-sm text-no-wrap opacity-70">{is_mobile ? "Chapters list" : "Chapter list"}</span>
                    </div>
                </div>
                <div className="chapter h-full w-full  flex flex-col" id="dwd">
                    <div className="title page-title me-bold text-xl px-2 py-3" id="dwd"></div>
                    <div className="me-iframe-div"></div>
                    <div className="children block  min-h-[calc(100vh-150px)] max-h-[calc(100vh-150px)] p-2 overflow-y-scroll">
                        <span className="text-gray-700 p-3 text-md align-middle"> Open a note from the chapter list or search in notes... </span>
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
                    <span className={`chapter-name text-no-wrap ${item.type} text-sm ${is_page_link ? "link" : ""} `} id={`${item.id ? item.id : ""}`} onClick={(event) => openNotesPage(event, item.id)}>
                        {capitalFirstLetterOfEachWord(extractedName)}
                    </span>
                </div>
                <div className="children"></div>
            </div>
        );
    }
    function openNotesPage(event, page_id, block_id) {
        if (event.target && event.target.classList.contains("heading")) {
            alert("heading");
            return;
        }
        openTab("notes");
        let page = pages_data.find((page) => page.id == page_id);
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

        closeOverlay(event);
    }
    function smoothScrollToBlock(block) {
        //let block_div = block.closest(".block-div");
        if (block) block.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    function addNotesBlock(block, target, level) {
        let div = document.createElement("div");
        div.className = "block-div h-full";
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
            let target = div.querySelector(".children");
            block.children.forEach((child) => {
                addNotesBlock(child, target, level + 1);
            });
        }
    }
    function NotesBlockHTML({ block, level }) {
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
                        <i className="fa-regular fa-filter"></i>
                        <input type="text" className="bg-blue-100 p-1 align-middle focus:outline-none text-sm" placeholder="Filter chapters" onKeyUp={(event) => filterChapterNames(event)} />
                    </div>
                    <i className="fa-regular fa-xmark cursor-pointer text-xl align-right ml-auto" onClick={(event) => closeOverlay(event)}></i>
                </div>
                <div className="chapter-list  p-3 max-h-[calc(100vh-80px)] overflow-y-scroll  bg-white"></div>
            </div>

            /*<div className="container flex flex-col justify-start items-start ">
            <div className=" flex justify-center items-center p-3  ">
                <span> Chapter List Index</span>
                <i className="fa-regular fa-xmark cursor-pointer text-xl align-right ml-auto" onClick={(event) => closeOverlay(event)}></i>
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
                    <i className="fa-regular fa-xmark cursor-pointer text-xl align-right ml-auto" onClick={(event) => closeOverlay(event)}></i>
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
                                onClick={(event) => openNotesPage(event, item.page_id, item.block_id)}
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
                        openNotesPage(event, block.page_id, block.id);
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
                <div className="search-mcq-header p-4 flex justify-center items-center gap-2">
                    <span className="text-[15px] font-bold">Search MCQs by text</span>
                    <i className="fa-regular fa-xmark-circle cursor-pointer text-xl align-right ml-auto" onClick={(event) => closeOverlay(event)}></i>
                </div>

                <div className="flex justify-center items-center gap-2   p-2  w-full">
                    <div className="flex justify-center items-center gap-2  rounded-md px-2 py-1 border-2 ">
                        <i className="fa-regular fa-magnifying-glass"></i>
                        <input type="text" className="search-mcq-input p-1 align-middle focus:outline-none text-sm" placeholder="Search mcqs by text" onKeyUp={(event) => searchMCQsbyText(event)} />
                    </div>
                    <button className="search-mcq-btn bg-blue-500 text-white rounded-md px-2 py-1 cursor-pointer  " onClick={(event) => searchMCQsbyText(event)}>
                        Search
                    </button>
                </div>

                <div className="filter-searched-mcqs flex justify-center items-center gap-2 my-2 py-2 w-full">
                    <span className="all text-sm bg-blue-500 text-white border-2 rounded-md py-1 px-2 cursor-pointer" onClick={(event) => filterSearchedMcqs(event, "all")}>
                        All
                    </span>
                    <span className="question-only text-sm border-2 rounded-md py-1 px-2 cursor-pointer text-gray-500" onClick={(event) => filterSearchedMcqs(event, "question")}>
                        Question Only
                    </span>
                    <span className="options-only text-sm border-2 rounded-md py-1 px-2 cursor-pointer text-gray-500" onClick={(event) => filterSearchedMcqs(event, "options")}>
                        Options Only
                    </span>
                </div>

                <span className="text-sm text-gray-500 w-full text-center my-1 searched-mcq-filter-message"></span>
                <span className="text-sm link w-full text-right open-searched-mcqs-in-mcq-page hide px-2 cursor-pointer">Open mcqs in main page</span>
                <div className="search-results p-3 max-h-[calc(100vh-260px)] overflow-y-scroll  bg-white">
                    <div className="no-searched-mcqs flex justify-center items-center w-full h-full py-5">No searched MCQs</div>
                </div>
            </div>
        );
    }
    function filterSearchedMcqs(event, filter_type) {
        debugger;
        event.target.parentElement.querySelectorAll("span").forEach((child) => {
            child.classList.remove("bg-blue-500");
            child.classList.replace("text-white", "text-gray-500"); // Replace works here
        });
        event.target.classList.add("bg-blue-500", "text-white");

        //alert(filter_type);
        let overlay_div = event.target.closest(".me-overlay");
        let all_ques = overlay_div.querySelector(".search-results").querySelectorAll(".que-div");
        if (!all_ques) return;

        all_ques.forEach((que_div) => {
            que_div.classList.add("hide");
        });
        debugger;
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
        debugger;
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
        let searh_result_div = document.querySelector(".search-mcq-overlay-inner .search-results");
        searh_result_div.innerHTML = "";
        let searched_ques = que_data.filter((que) => que.question.toLowerCase().includes(input_value.toLowerCase()) || que.options.some((option) => option.text.toLowerCase().includes(input_value.toLowerCase())));
        searched_ques.forEach((que) => {
            let que_div = document.createElement("div");
            searh_result_div.appendChild(que_div);

            //que_div.innerHTML = GetMcqDiv(que);
            ReactDOM.render(<GetMcqDiv que={que} search_text={input_value} />, que_div);

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
    function openOverlay(overlay_name) {
        let overlay = document.querySelector(`.${overlay_name}`);
        if (overlay) overlay.classList.remove("hide");
    }
    function closeOverlay(event) {
        let ele = event.target.closest(".me-overlay");
        if (ele) ele.classList.add("hide");
    }

    function createMCQs() {
        alert("Create mcqs");
    }

    let curr_que_index = 0;
    let filtered_ques = [];
    function nextQuestion() {
        ++curr_que_index;
        if (curr_que_index >= filtered_ques.length) curr_que_index = 0;
        openMcq(filtered_ques[curr_que_index]);
    }

    function filterMcqsBySubject(subject, event) {
        debugger;

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
                    <div
                        className={`bookmark-question hide ${is_bookmarked ? "bookmarked" : ""} flex justify-start items-center gap-2 border rounded-md px-2 py-1 cursor-pointer`}
                        onClick={(event) => {
                            let bookmark_div = event.target.closest(".bookmark-question");
                            if (bookmark_div.classList.contains("bookmarked")) {
                                bookmark_div.classList.remove("bookmarked");
                                userdata.bookmarked_questions = userdata.bookmarked_questions.filter((que) => que.id != que.id);
                                bookmark_div.children[0].classList.replace("fa-solid", "fa-regular");
                                bookmark_div.children[1].textContent = "Bookmark";
                                saveUserData();
                            } else {
                                bookmark_div.classList.add("bookmarked");
                                userdata.bookmarked_questions = userdata.bookmarked_questions ? userdata.bookmarked_questions : [];
                                userdata.bookmarked_questions.unshift(que);
                                bookmark_div.children[0].classList.replace("fa-regular", "fa-solid");
                                bookmark_div.children[1].textContent = "Bookmarked";
                                saveUserData();
                            }
                        }}
                    >
                        <i className={` fa-bookmark link ${is_bookmarked ? "fa-solid" : "fa-regular"}`}> </i>
                        <span className="link">{is_bookmarked ? "Bookmarked" : "Bookmark"}</span>
                    </div>
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
                    <div className="buttons flex justify-end items-center gap-2">
                        <span
                            className="cancel-report-question link cursor-pointer "
                            onClick={(event) => {
                                event.target.closest(".report-question-message-section").classList.add("hide");
                            }}
                        >
                            cancel
                        </span>
                        <button
                            className="report-question border rounded-md px-2 py-1 cursor-pointer ml-auto"
                            onClick={(event) => {
                                popupAlert("Reported");
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
    function GetMcqDiv({ que, type, index, selected_option_id }) {
        //que = que.que ? que.que : que;
        que = que.id ? que : getQuestionById(que);
        return (
            <div>
                <div id={que.id} className="que-div min-w-320 max-w-90 my-2 w-[min(400px, 90%)] flex flex-col gap-2 box-border border-2 rounded-md p-5">
                    <div className="question py-2 text-md flex justify-start items-baseline gap-2">
                        <span className="text-md font-bold que-num w-[30px]"> {index ? `Q${index}.` : "Q."} </span>
                        <div className="text-md font-bold flex-1 flex flex-wrap" dangerouslySetInnerHTML={{ __html: getHTMLFormattedText(que.question) }}></div>
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
                        ${selected_option_id != undefined && selected_option_id != option.id && option.text.indexOf("#ans") !== -1 ? "correct " : ""}  
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
                    </div>
                </div>
            </div>
        );
    }

    function checkAnswer(event, que, type) {
        let question_id = event.target.closest(".que-div").id;

        let option_ele = event.target.closest(".option");
        let selected_option_id = option_ele.id;

        let options_div = event.target.closest(".options");
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

        let obj = {
            id: que.id,
            selected_option_id: option_ele.id,
            correct_option_id: correct_option_id,
        };
        addMcqToDailyPractisedQuestions(obj);
    }

    function openMcq(que, target, type, selected_option_id, index) {
        que = que.id ? que : getQuestionById(que);
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
                <span className="text-sm inline-block px-2 py-1">Category:</span>
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

    function openTab(tabName) {
        let tabs = document.querySelectorAll(".tab");
        tabs.forEach((tab) => {
            tab.classList.remove("active");
            if (tab.classList.contains(tabName)) {
                tab.classList.add("active");
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
    }

    function setURL(tabName) {
        let url = window.location.href;
        let ind = url.indexOf("#");
        if (ind != -1) {
            url = url.substring(0, ind - 1);
        }
        window.location.href = url + `/#/${exam.toLocaleLowerCase()}/${tabName}`;
    }

    //loadHomePage();

    function parseURL(url) {
        let hashIndex = url.indexOf("#");
        if (hashIndex !== -1) {
            let hashPart = url.slice(hashIndex + 2); // Skip '#/' part
            let items = hashPart.split("/");
            return items;
        }
        return [];
    }

    async function openPageBasedOnURL(url) {
        url = url ? url : window.location.href;
        let url_items = parseURL(url);

        if (url_items.length) {
            exam = url_items[0];
            localStorage.setItem("esa_exam", exam);
            let page = url_items[1];
            page = page == "question" ? "mcq" : page;
            openTab(page);
            if (page == "mcq") {
                let que_id = url_items[2];
                let que = null;
                if (que_id) que = getQuestionById(que_id);
                curr_que_index = 0;
                filtered_ques = sortArrayRandomly(que_data);
                que = que ? que : filtered_ques[curr_que_index];
                openMcq(que);
            }
            //openPage(page);
        } else {
            openTab("home");
        }
    }
    async function loadData() {
        await getUserData();
        await getDataFromFirebase();
    }
    let get_all_user_info = null;
    async function getAllUsersInfo() {
        let user_ref = database.ref(`esa_data/users`);
        let snapshot = await user_ref.once("value");
        let obj = snapshot.val() || [];
        all_users_info = obj;
    }

    async function lastDataLoaded() {}

    //openPageBasedOnURL();
    function getQuestionById(que_id) {
        let que = que_data.find((que) => que.id == que_id);
        return que;
    }

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

    async function getDataFromFirebase() {
        let data = {};
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
            if (last_data_update_time_local != data_last_update_time_firebase || !data.ques_data) {
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
        console.log(`data retrieved from firebase for ${exam}`);
        //alert(`data retrieved from firebase for ${exam}`);
        await getAllUsersInfo();
        //initialLoading();
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
        text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<span class="show-image hide">Show images</span> <img className="me-image" src="$2" alt="$1">');

        // Convert [text](link) to <a>
        text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="link" target="_blank">$1</a>');

        // Convert {video:ASDASDDE:399} to <i className="fa-brands fa-youtube video" id="video-id" time="399"></i> fa-duotone fa-solid fa-play
        //text = text.replace(/\{video:([^:]+):(\d+)\}/g, '<i className="fa-brands fa-youtube video" id="$1" time="$2"></i>');
        text = text.replace(/\{video:([^:]+):(\d+)\}/g, '<i class="fa-brands fa-youtube video cursor-pointer " id="$1" time="$2"></i>');

        // Convert \n to <br>
        text = text.replace(/\n/g, "<br>");

        return text;
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
            let span = document.createElement("span");
            span.className = "tag flex justify-center items-center text-sm text-blue-700 border-2 border-blue-700 rounded-md px-2 py-1 cursor-pointer";
            span.textContent = capitalFirstLetterOfEachWord(tag);
            span.onclick = (event) => filterMcqsByTag(tag, event);
            div.querySelector(".filter-mcq-overlay .tab-container.all-tags").appendChild(span);
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
                    <span className="text-[15px] font-bold">Filter MCQs by tags</span>
                    <i className="fa-regular fa-xmark-circle cursor-pointer text-xl align-right ml-auto" onClick={(event) => closeOverlay(event)}></i>
                </div>

                <div className="flex justify-center items-center gap-2   p-2  w-full">
                    <div className="flex justify-center items-center gap-2  rounded-md px-2 py-1 border border-gray-700 ">
                        <i className="fa-regular fa-filter"></i>
                        <input type="text" className="filter-mcq-input p-1 align-middle focus:outline-none text-sm" placeholder="Filter mcqs by tags" onKeyUp={(event) => filterMcqTagItems(event)} />
                    </div>
                </div>
                <div className=" hide flex justify-center items-center gap-2  text-gray-700 border-2 rounded-md">
                    <i className="fa-regular fa-filter w-[15px]"></i>
                    <input type="text" className="filter-mcq-input py-2 px-3 flex-1 align-middle focus:outline-none text-sm" placeholder="Filter mcqs by tags" onKeyUp={(event) => filterMcqsByTag(event)} />
                </div>

                <div className="tab-section h-full w-full">
                    <div className="tabs flex justify-center align-middle gap-4 p3 border-b-2 w-full">
                        <div className="tab flex justify-center  flex-1 p-2 subject-wise cursor-pointer active text-sm text-no-wrap" onClick={(event) => switchTabs("subject-wise", event)}>
                            Subject Wise
                        </div>
                        <div className="tab all-tags flex justify-center flex-1 p-2 cursor-pointer text-sm" onClick={(event) => switchTabs("all-tags", event)}>
                            All Tags
                        </div>
                    </div>
                    <div className="tab-containers p-3 flex ">
                        <div className="tab-container  subject-wise  ml-4  w-full  max-h-[calc(100vh-220px)] overflow-y-scroll mb-20px "> </div>
                        <div className="tab-container all-tags  w-full   hide gap-2 flex justify-start flex-wrap  max-h-[calc(100vh-220px)] overflow-y-scroll mb-20px"></div>
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
    function filterMcqsByTag(tag, event) {
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

        curr_que_index = 0;
        openMcq(filtered_ques[0]);
        closeOverlay(event);

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
            target.innerHTML = `<div class="header flex justify-end items-center">
                                    <i class="fa-regular fa-circle-xmark text-xl cursor-pointer cross mr-3" ></i>
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
                            event.target.closest(".main-tag").querySelector("i").className = "fa-regular fa-circle link text-7px";
                        } else {
                            parent_ele.classList.add("selected");
                            event.target.closest(".main-tag").querySelector("i").className = "fa-regular fa-circle-check link text-7px";
                        }

                        //ifelement.classList.toggle("fa-circle-check") && element.classList.toggle("fa-circle");
                    }}
                >
                    <i class="fa-regular fa-circle link text-7px"></i>
                    <span className="tag-name text-no-wrap link text-sm">{capitalFirstLetterOfEachWord(tag_name)}</span>
                </div>
                <div className="children"></div>
            </div>
        );
    }

    function switchMockTabs(tab_name, event) {
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

    function MockTestPageHTML() {
        return (
            <div>
                <div className="tab-section flex flex-col gap-2">
                    <div className="page-tabs h-[40px] p-2 tabs flex gap-2 border-2">
                        <div
                            className="page-tab tab cursor-pointer new-mock  flex-1 flex justify-center items-center text-blue-500 font-bold"
                            onClick={(event) => {
                                switchMockTabs("new-mock", event);
                                document.querySelector(".new-mock .tab.subject-wise").click();
                            }}
                        >
                            New Mock
                        </div>
                        <div className="page-tab tab cursor-pointer static-mocks flex-1 flex justify-center items-center text-gray-400 font-bold" onClick={(event) => switchMockTabs("static-mocks", event)}>
                            Static Mocks
                        </div>
                        <div
                            className="page-tab tab cursor-pointer mock-history flex-1 flex justify-center items-center text-gray-400 font-bold"
                            onClick={(event) => {
                                switchMockTabs("mock-history", event);
                                userdata.mock_tests.forEach((mock) => {
                                    let div = document.createElement("div");
                                    div.className = "mock-history-item min-w-[300px] my-2 p-2";
                                    document.querySelector(".tab-container .mock-history-list").appendChild(div);
                                    ReactDOM.render(<MockTestHistoryItemHTML mock={mock} />, div);
                                });
                                if (!userdata.mock_tests.length) {
                                    document.querySelector(".tab-container .mock-history-list").textContent = "No Mock Test History";
                                }
                            }}
                        >
                            Mock History
                        </div>
                    </div>
                    <div className="tabs-container flex flex-col gap-2 py-2 px-3  max-h-[calc(100vh-95px)] overflow-y-scroll">
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
                                                        className="tag flex justify-center items-center text-sm text-blue-700 border-2 border-blue-700 rounded-md px-2 py-1 cursor-pointer"
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
                        <div className="tab-container static-mocks hide flex flex-col  justify-start items-center gap-2 h-full max-h-[calc(100vh-85px)] overflow-y-scroll">
                            <input
                                type="text"
                                className=" w-[90%] p-2 border border-gray-300 rounded-md text-center mx-1 my-2"
                                placeholder="Search or Filter Static Mocks"
                                onChange={(event) => {
                                    let value = event.target.value.trim().toLowerCase();
                                    let mock_names = document.querySelectorAll(".static-mocks .static-mock-item .mock-name");
                                    mock_names.forEach((mock_name) => {
                                        if (mock_name.textContent.toLowerCase().includes(value)) {
                                            mock_name.closest(".static-mock-item").classList.remove("hide");
                                        } else {
                                            mock_name.closest(".static-mock-item").classList.add("hide");
                                        }
                                    });
                                }}
                            />
                            <div className="static-mocks-list border-t-2 py-2">
                                {static_mocks.map((mock) => (
                                    <div className="static-mock-item border border-gray-300 rounded-md p-2 m-2" id={mock.id} key={mock.id}>
                                        <StaticMockTestItemHTML mock={mock} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="tab-container mock-history hide flex justify-center items-center flex-wrap  h-full max-h-[calc(100vh-85px)] overflow-y-scroll">
                            <input
                                type="text"
                                className="p-2 w-[90%] border border-gray-300 rounded-md text-center my-2"
                                placeholder="Search or Filter Mock History"
                                onChange={(event) => {
                                    let value = event.target.value.trim().toLowerCase();
                                    let mock_names = document.querySelectorAll(".mock-history-list .mock-name");
                                    mock_names.forEach((mock_name) => {
                                        if (mock_name.textContent.toLowerCase().includes(value)) {
                                            mock_name.closest(".mock-history-item").classList.remove("hide");
                                        } else {
                                            mock_name.closest(".mock-history-item").classList.add("hide");
                                        }
                                    });
                                }}
                            />
                            <div className="mock-history-list w-full max-h-[calc(100vh-170px)] overflow-y-scroll flex justify-center items-center flex-wrap py-2 border-t-2"></div>
                        </div>
                    </div>
                </div>
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
    function StaticMockTestItemHTML({ mock }) {
        let sub_wise_ques = [];
        subjects[exam].forEach((subject) => {
            let sub_que_ids = mock.que_ids.filter((id) => que_data.find((que) => que.id == id && que.tags.includes(subject)));
            sub_wise_ques.push(sub_que_ids.length);
        });

        let color = ["bg-red-100", "bg-green-100", "bg-blue-100", "bg-yellow-100", "bg-purple-100"];
        return (
            <div className="static-mock-item-inner flex flex-col gap-2">
                <span className="text-xl font-bold text-gray-600 mock-name">{mock.name}</span>
                <span className=" text-gray-500 py-1">You can try subject wise mock test as well</span>
                <div className="subjects flex justify-start items-center max-w-full overflow-x-scroll gap-2">
                    {subjects[exam].map((subject, index) => (
                        <span
                            className={`inline-block subject text-gray-600 border border-gray-300 rounded-md p-1 text-no-wrap cursor-pointer ${color[index]} ${sub_wise_ques[index] ? "" : "disabled"}`}
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
                            {subject}
                        </span>
                    ))}
                </div>
                <span
                    className="full-mock text-blue-500 border bg-gray-200  border-gray-300 rounded-md p-1 px-2 text-center cursor-pointer"
                    onClick={() => {
                        startNewMockTest(mock);
                    }}
                >
                    Full Mock
                </span>
            </div>
        );
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
            <div className="mock-history-item-inner flex flex-col justify-start items-start gap-2 flex-wrap border border-gray-300 rounded-md py-2 px-7 w-[fit-content]">
                <span className="text-xl font-bold text-gray-500 text-center mock-name">{mock.name}</span>
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
                        className="fa-regular fa-circle-xmark text-xl cursor-pointer cross px-2 ml-auto "
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
        var div = document.createElement("div");
        div.className = ` me-popup-alert flex fixed top-5 left-1/2 transform -translate-x-1/2 ${color ? color : "bg-blue-700"} p-2.5 px-3.5 rounded text-white z-50 min-w-[min(300px,70vw)] flex items-baseline`;
        div.innerHTML = `
        <span class="message flex-1">${message}</span>
        <span class="close ml-auto w-5 h-5 flex justify-center items-center cursor-pointer">x</span>
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
                        className="fa-regular fa-circle-xmark  text-xl text-red-700 cursor-pointer"
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
                    <div className="question-list  block max-h-[calc(100vh-170px)] overflow-y-auto py-2 px-4">
                        {fil_ques.map((ques, index) => (
                            <div className="question-div" key={index} id={index}>
                                {GetMcqDiv({ que: ques, type: "mock", index: index + 1 })}
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
                        className="fa-solid fa-xmark text-xl ml-auto px-2 cursor-pointer"
                        onClick={(event) => {
                            event.target.closest(".me-overlay").remove();
                        }}
                    ></i>
                </div>
                <div className="result-details flex flex-col gap-2 bg-gray-100 p-2 m-2 rounded-md">
                    <span className="text-md ">Total Questions: {mock_obj.questions.length}</span>
                    <span className="text-md ">Total Attempeted: {mock_obj.total_attempeted}</span>
                    <span className="text-md text-green-500">Total Correct: {mock_obj.total_correct}</span>
                    <span className="text-md text-red-500">Total Wrong: {mock_obj.total_wrong}</span>
                </div>
                <div className="marks-details flex flex-col gap-2 bg-blue-100 p-2 m-2 rounded-md">
                    <div className="flex justify-between items-center gap-2">
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
                        <div className="question-div m-2" key={index}>
                            {GetMcqDiv({ que: que.id, type: "mock-result", index: index + 1, selected_option_id: que.selected_option_id })}
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

    function saveUserData() {
        localStorage.setItem(`esa_userdata_${exam}`, JSON.stringify(userdata));
        //console.log(`esa: userdata saved successfully to local storage`);
        let is_online = navigator.onLine;
        let userdata_last_update_time = getCurrentDateAndTime();
        if (is_online) {
            database.ref(`${exam}/users/${user_login_data.userid}/userdata`).set(userdata);

            // set last update time..

            database.ref(`${exam}/users/${user_login_data.userid}/userdata_last_update_time`).set(userdata_last_update_time);
            localStorage.setItem(`${exam}_userdata_last_update_time`, userdata_last_update_time);
            console.log(`esa: userdata saved successfully to both local andfirebase`);
        } else {
            localStorage.setItem(`${exam}_userdata_last_update_time`, userdata_last_update_time);
        }
    }
    async function getUserData() {
        //let user_data_last_update_time = localStorage.getItem(`${exam}_userdata_last_update_time`);
        let userdata_str = localStorage.getItem(`esa_userdata_${exam}`);
        if (userdata_str) {
            userdata = JSON.parse(userdata_str);
        } else {
            userdata = {};
        }

        let is_online = navigator.onLine;
        if (!is_online) {
            popupAlert("You are offline, Your data may not be updated data..", 5, "bg-red-500");
            return userdata;
        }

        let last_userdata_update_time_local = localStorage.getItem(`${exam}_userdata_last_update_time`);

        let user_ref = database.ref(`${exam}/users/${user_login_data.userid}/userdata_last_update_time`);
        let snapshot = await user_ref.once("value");
        let userdata_last_update_time_firebase = snapshot.val() || "nothing";

        if (last_userdata_update_time_local != userdata_last_update_time_firebase) {
            //get user data from firebase
            let user_ref = database.ref(`${exam}/users/${user_login_data.userid}/userdata`);
            let snapshot = await user_ref.once("value");
            userdata = snapshot.val() || {};
        }
        return userdata;
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
    //start app

    async function clearCache() {
        // Store user data in a variable

        // Unregister all service workers
        try {
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
        } catch (error) {
            console.error("Error clearing cache:", error);
        }
    }

    let user_login_data = {};

    async function startApp() {
        let local_cache_id = localStorage.getItem("esa_cache_id");
        let cache_id = "2024_10_03_00_00_00";
        if (local_cache_id != cache_id) {
            clearCache();
            localStorage.setItem("esa_cache_id", cache_id);
            //window.location.reload();
        }
        loadHTML("loading");

        user_login_data = localStorage.getItem("esa_user_login_data");
        /*user_login_data = {
        display_name: "Mehboob Elahi",
        email: "mehboob4ias@gmail.com",
        photo_url: "https://lh3.googleusercontent.com/a/ACg8ocKW5Wsgjwx6AGuJxEon1lvuwCGJ_eoW64nRUneHBVjzadW_T7F9Iw=s96-c",
        userid: "UarmygN6ei7Kjo1",
        username: "mehboob4ias",
    };*/
        //localStorage.setItem("esa_user_login_data", JSON.stringify(user_login_data));
        if (user_login_data) {
            user_login_data = JSON.parse(user_login_data);
        } else {
            user_login_data = {};
        }
        //setTimeout(() => {
        if (user_login_data.userid) {
            //loadHTML("home");
            postSignIn();
        } else {
            setTimeout(() => {
                loadHTML("signin");
            }, 2000);
            //document.body.querySelector(".app-loading").classList.add("hide");
            //document.body.querySelector(".container-inner").classList.remove("hide");
        }
        //}, 2000);
    }
    startApp();

    async function postSignIn() {
        loadHTML("loading");
        popupAlert(`Signed in as "${user_login_data.display_name}" & Exam: "${exam.toUpperCase()}"`);
        let url = window.location.href;
        let url_items = parseURL(url);
        exam = url_items.length ? url_items[0] : "ssc";
        localStorage.setItem("esa_exam", exam);

        await loadData();
        loadHTML("home");

        debugger;
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
        let bookmarked_questions = userdata.bookmarked_questions;
        return (
            <div className="container">
                <div className="header flex justify-start items-center gap-2 text-gray-600">
                    <span className="text-xl font-bold">Bookmarked Questions</span>
                    <i
                        className="fa-regular fa-circle-xmark text-xl cursor-pointer"
                        onClick={(event) => {
                            event.target.closest(".me-overlay").remove();
                        }}
                    ></i>
                </div>
                <div className="content">
                    {userdata.bookmarked_questions.map((question, index) => (
                        <div key={index} className="question-div">
                            {GetMcqDiv({ que: question.id, type: "bookmarked", index: index + 1 })}
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
                <span className="flex justify-center items-center gap-2">
                    <span className="today-date-- hide text-xl font-bold  text-gray-700">Today practised MCQs: {getTodayDateMMddyyyy()}</span>
                    <span className="today-date text-xl font-bold  text-gray-500">Today practised MCQs:</span>
                    <span className="today-day bg-orange-200  px-2 py-1 text-[10px] rounded-md hide">{getTodayDay()}</span>
                    <div className="today-practised-questions-count flex gap-2 justify-center items-center ml-auto px-2 t-gray-500">
                        <span
                            className="total bg-gray-100 rounded-full px-2 py-1 cursor-pointer text-sm"
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
                            className="correct bg-green-100 rounded-full px-2 py-1 cursor-pointer text-sm"
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
                            className="wrong bg-red-100 rounded-full px-2 py-1 cursor-pointer text-sm"
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
                        className="fa-regular fa-circle-xmark text-xl ml-auto cursor-pointer"
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
})();
