let names = "";
let emails = "";
all_users_info.forEach((obj) => {
    names += obj.display_name + ", ";
    emails += obj.email + ", ";
});
