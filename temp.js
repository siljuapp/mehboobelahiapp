function addTagIndexItem(item, tar_ele, level) {
    item = item.tag ? item.tag : tag[0];
    var children = item.children;
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
        let name = item.tag; //tag.name;
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
        let name = item.tag; //.name;
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


