users_login_info = {
    asdasxaddasd: {
        name: "asdasdasdasd",
        email: "asdasdasdasd",
        password: "asdasdasdasd",
        exam: "ssc",
        userid: "asdasdasdasd",
    },
    asdaadasdasd: {
        name: "asdasdasdasd",
        email: "asdasdasdasd",
        password: "asdasdasdasd",
        exam: "ssc",
        userid: "asdasdasdasd",
    },
    asdasdsdfdasd: {
        name: "asdasdasdasd",
        email: "asdasdasdasd",
        password: "asdasdasdasd",
        exam: "ssc",
        userid: "asdasdasdasd",
    },
};

getBlockInfo("cAd7Q_x8M").children.forEach((block) => {
    debugger;
    let str = block.string + block.children[0].string;
    //let str = "**Callous**: *(adjective)* insensitive or unfeeling  Example*: He walked around like a zombie after staying up all night";

    // Replace *( with ( and )* with *
    str = str.replace(/\*\(/g, "(").replace(/\)\*/g, ")");

    // Update part of speech abbreviations
    str = str
        .replace(/\(adjective\)/g, "(adj.)")
        .replace(/\(noun\)/g, "(n.)")
        .replace(/\(verb\)/g, "(v.)")
        .replace(/\(adverb\)/g, "(adv.)");

    // Extract word, meaning, and example
    const word = str.match(/\*\*(.*?)\*\*/)[1];
    const meanings = str.match(/: (.*?) Example\*/)[1];
    const example = str.match(/Example\*: (.*)/)[1];

    let obj = {
        word: word,
        meanings: meanings,
        example: example,
    };
    console.log(obj);
});
