import React from "react";
import ReactDOM from "react-dom/client";

export function LoadHTML() {
    return <div className="container-inner"> HELLO WORLD </div>;
}

export function loadHTML(arg) {
    const container = document.querySelector(".container");
    ReactDOM.render(<LoadHTML />, container);
}

// Call the function when the DOM is fully loaded
window.onload = () => {
    loadHTML("home"); // Initial load
};
/*
export function LoadHTML() {
    return (
        <div className="container-inner">
            <div className={`main tabs flex justify-center align-middle gap-4 px-4 py-4 border-b-2`}>
                <div className="tab home text-gray-500 cursor-pointer" onClick={() => openTab("home")}>
                    Home
                </div>
                <div className="tab mcq text-gray-500 cursor-pointer" onClick={() => openTab("mcq")}>
                    MCQ
                </div>
                <div className="tab notes text-gray-500 cursor-pointer" onClick={() => openTab("notes")}>
                    Notes
                </div>
                <div className="tab mock text-gray-500 cursor-pointer" onClick={() => openTab("mock")}>
                    Mock
                </div>
                <div className="hidden tab user text-gray-500 cursor-pointer" onClick={() => openTab("user")}>
                    User
                </div>
            </div>

            <div className="main tab-containers flex flex-col justify-center items-center gap-4">
                <div className="app-loading bg-black fixed top-0 left-0 w-full h-full flex justify-center items-center">
                    <img src="/assets/esa_logo.png" alt="app-logo" className="w-1/4 rounded-full rotate" />
                </div>

                <div className="tab-container page home max-h-[calc(100vh - 70px)] overflow-y-scroll pb-30 hide ">
                    <h1>Home</h1>
                </div>
                <div className="tab-container page mcq max-h-[calc(100vh - 70px)] overflow-y-scroll pb-30 hide">
                    <h1>MCQ</h1>
                </div>
                <div className="tab-container page notes max-h-[calc(100vh - 70px)] overflow-y-scroll pb-30 hide">
                    <h1>Notes</h1>
                </div>
                <div className="tab-container page mock max-h-[calc(100vh - 70px)] overflow-y-scroll pb-30 hide">
                    <h1>Mock</h1>
                </div>
                <div className="tab-container page user max-h-[calc(100vh - 70px)] overflow-y-scroll pb-30 hide">
                    <h1>User</h1>
                </div>
            </div>
        </div>
    );
}

export function loadHTML(arg) {
    let container = document.querySelector(".container");
    if (arg !== "home") {
        ReactDOM.render(<LoadSignInPageHTML />, container);
    } else {
        ReactDOM.render(<LoadHTML />, container);
    }
}

// Execute when the DOM is fully loaded
window.onload = () => {
    loadHTML("home"); // Initial load
};
*/
