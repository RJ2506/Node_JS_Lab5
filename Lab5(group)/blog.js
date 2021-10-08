const fs = require("fs");
const process = require("process");
const path = require("path");
let arg = process.argv;
let user_account = `username: ${arg[2]} password: ${arg[3]}`;
let blog_name = arg[4];

let folder_path = path.join(__dirname, blog_name);
const FILE_NAME = "database.txt";
const FILE_PATH = path.join(__dirname, folder_path, FILE_NAME);

// register(username,password)
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

const fsAppendUserP = (file, user, data) => {
    return new Promise((resolve, reject) => {
        if (data.includes(user)) {
            reject(new Error("User already exist \nPlease enter a new user name"));
        } else {
            fs.appendFile(file, `${user}\n`, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        }
    });
};

// createABlog(blogName)
const createABlog = (blogName) => {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(blogName)) {
            reject(new Error("Blog already exists"));
        } else {
            fs.mkdir(blogName, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        }
    });
};

// createPost(postTitle, postContent, blogName)
const createPost = (postTitle, postContent, blogName) => {};

// likePost(blogName, postTitle, username)

fsReadfileP(FILE_NAME)
    .then((data) => {
        fsAppendUserP(FILE_NAME, user_account, data);
        console.log("Account registered");
    })
    .then(() => {
        createABlog(folder_path);
        console.log("Blog has been created");
    })
    .then((blogName) => createPost(title, content, blogName))
    .catch((err) => console.log(err.message));