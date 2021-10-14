const fs = require("fs");
const path = require("path");

const username = "RJ";
const password = "P@ssw0rd";
const blog_name = "RJ_Blog";

const title = "super mario";
const content = `
like: 1
like by: you

Omae wa mou
Shindeiru
Nani!!!!!!!

`;
const folder_path = path.join(__dirname, blog_name);
const post_folder = path.join(__dirname, "RJ_Blog");
const FILE_NAME = "database.txt";

//create a function for fs.readFile
const fsReadfileP = (file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data.toString().split("\n"));
            }
        });
    });
};

//create a function for fs.writeFile
const fsWritefileP = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

//create a function for fs.appendFile
const fsAppendfileP = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.appendFile(file, data, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

//create a function for fs.mkdir
const fsmkdir = (blog) => {
    return new Promise((resolve, reject) => {
        fs.mkdir(blog, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

//check if the username already exists
const checkData = (data, username) => {
    return new Promise((resolve, reject) => {
        const user = data.filter((account) => account.includes(username));
        const string_user = user.join(" ");
        if (string_user === "") {
            reject();
        } else {
            resolve();
        }
    });
};

//check the file if the account doesn't exists
const register = (file, data, user_name, password) => {
    return new Promise((resolve, reject) => {
        checkData(data, user_name)
            .then(() => {
                resolve(
                    fsAppendfileP(file, `username: ${user_name} password: ${password}\n`)
                );
            })
            .catch(() => reject(new Error("User already exists")));
    });
};

const createABlog = (blogName) => {
    return new Promise((resolve, reject) => {
        fsmkdir(blogName)
            .then(() => resolve())
            .catch(() => reject(new Error("Blog already exists")));
    });
};

fsReadfileP(FILE_NAME)
    .then((data) => {
        register(FILE_NAME, data, username, password);
        console.log("Account has been registered");
    })
    .then(() => {
        createABlog(blog_name);
        console.log("Blog has been created");
    })
    .catch((err) => console.log(err.message));