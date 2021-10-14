const fs = require("fs");
const path = require("path");

let user_account = "username: RJ password: P@ssw0rd ";
let blog_name = "RJ_Blog";

let title = "super mario";
let content = `
like: 1
like by: you

Omae wa mou
Shindeiru
Nani!!!!!!!

`;
let folder_path = path.join(__dirname, blog_name);
let post_folder = path.join(__dirname, "RJ_Blog");
const FILE_NAME = "database.txt";

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

const register = (file, user, data) => {
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
const createPost = (postTitle, postContent, blogName) => {
    return new Promise((resolve, reject) => {
        fs.readdir(blogName, (err, file) => {
            if (err) {
                reject(new Error(`${blogName} doesn't exists`));
            } else {
                if (file.includes(`${postTitle.replace(" ", "_")}.txt`)) {
                    //make space into  _ then add +1 at the end
                    fs.writeFile(
                        `${path.join(blogName, postTitle.replace(" ", "_"))}1.txt`,
                        postContent,
                        (err) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve();
                            }
                        }
                    );
                } else {
                    // make space into _ of the title
                    // write / post a content
                    fs.writeFile(
                        `${path.join(blogName, postTitle.replace(" ", "_"))}.txt`,
                        postContent,
                        (err) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve();
                            }
                        }
                    );
                }
            }
        });
    });
};

// likePost(blogName, postTitle, username)
const likePost = (blogName, postTitle, username) => {
    return new Promise((resolve, rejext) => {
        fs.readFile(FILE_NAME, (err, data) => {
            if (err) {
                rejext(err);
            } else {}
        });
    });
};

fsReadfileP(FILE_NAME)
    .then((data) => {
        register(FILE_NAME, user_account, data);
        console.log("Account registered");
    })
    .then(() => {
        createABlog(folder_path);
        console.log("Blog has been created");
    })
    .then(() => {
        createPost(title, content, post_folder);
        console.log("Post created");
    })
    .then(() => {
        likePost("RJ_Blog", "super_mario.txt", "RJ");
    })
    .catch((err) => console.log(err.message));