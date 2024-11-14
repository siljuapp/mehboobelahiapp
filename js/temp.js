let bb = "ahzXbOiGV";
bb = getBlockInfo(bb);
bb.children.forEach((child) => {
    let str = child.string.replace("**Explanation:**", "Explanation:");
    window.roamAlphaAPI.updateBlock({
        block: {
            uid: child.uid,
            string: str,
        },
    });
});

que_data.forEach((que) => {
    updateData(que.id);
});

async function updateData(id) {
    let data_ref = database.ref(`${exam}/questionInfo/${id}`);
    let data = await getDataFromFirebaseUsingRef(data_ref);
    debugger;
    data = data ? data : {};

    data_ref = database.ref(`esa_data/${exam}/mcq_data/${id}/selected_options_info`);
    await data_ref.set(data);
}

async function updateAllMcqIds() {
    let all_mcqs = que_data.concat(shared_mcqs);
    all_mcq_ids = [];
    all_mcqs.forEach((mcq) => {
        all_mcq_ids.push(mcq.id);
    });
    let data_ref = database.ref(`esa_data/${exam}/all_mcq_ids`);
    data_ref.set(all_mcq_ids);
}

async function test() {
    let ref = database.ref(`esa_data/${exam}/users_login_info`);
    let data = await getDataFromFirebaseUsingRef(ref);
}
