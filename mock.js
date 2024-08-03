export function openMockTestPage3() {
    openPage("mock");
    let ele = document.querySelector(".page.mock .new-mock");
    if (!ele) {
        loadNewMockTestSection3();
        loadPredefinedMocks3();
        loadMockTestHistory3();
    }
}

export function alter3() {
    console("aler3 three is called");
}

export function loadNewMockTestSection3() {
    let page = document.querySelector(".page.mock");
    page.innerHTML = `<div>
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
                                <div class="mock-chapters-list list me-header-inner-list hide"></div>
                            </div>
                            <div></div>
                        </div>
                    </div>
                </div>

                <div class="mock-test-sec hide me-dis-flex-co"></div>`;

    let div = page.querySelector(".new-mock");
    debugger;
    let ele = div.querySelector(".me-header");
    if (ele) {
        ele.addEventListener("click", (event) => {
            debugger;
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
            let eee = div.querySelector(".mock-chapters .mock-chapters-list");
            eee.classList.toggle("hide");
            if (eee.classList.contains("hide")) {
                head.querySelector("i").className = "fa-solid arrow fa-chevron-right";
            } else {
                head.querySelector("i").className = "fa-solid arrow fa-chevron-down";
                let tar = div.querySelector(".mock-chapters-list");
                debugger;
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
}

export function loadPredefinedMocks3() {
    let ele = document.querySelector(".page.mock > div");

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
                //loadPreviousMockResults();
            }
        });
    }
    let list_ele = div.querySelector(".mock-test-list");
    mocks_data.forEach((mock, index) => {
        var div_mock = document.createElement("div");
        div_mock.className = "pd-mock";
        list_ele.appendChild(div_mock);

        div_mock.innerHTML = `
                            <span class="start link">Start mock test ${index + 1}</span>
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
                    //loadPreviousMockResults();
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

export function loadMockTestHistory3() {
    let ele = document.querySelector(".page.mock > div");

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
