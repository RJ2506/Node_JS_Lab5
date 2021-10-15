const fs = require("fs");
const path = require("path");

const username = "Jojo";
const password = "P@ssw0rd123";
const blog_name = "Jo_Blog";
const like_user = "RJ"

const title = "Kenshiro meme";
const like_counter = {
  lk: 1,
  lb: "you",
};
const content = "Omai wa mou Shindeiru ..... Nani??!!!!";

const FOLDER_PATH = path.join(__dirname, blog_name);
const BLOG_PATH = path.join(__dirname, "RJ_Blog");
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

//read the directory if the file exists
const fsreadDir = (directory) => {
  return new Promise((resolve, reject) => {
    fs.readdir(directory, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

//check if the username already exists
const checkData = (data, username) => {
  return new Promise((resolve, reject) => {
    const user = data.filter((account) => account.includes(username));
    const string_user = user.join(" ");
    if (string_user !== "") {
      reject(err);
    } else {
      resolve();
    }
  });
};

//check if the user who likes the post does exists
const checkUser = (data, like_name) => {
  return new Promise((resolve, reject) => {
    const user = data.filter((account) => account.includes(like_name));
    const string_user = user.join(" ");
    if (string_user === "") {
      reject(err);
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
      .catch((err) => reject(new Error("User already exists")));
  });
};

// create Blog
const createABlog = (blogName) => {
  return new Promise((resolve, reject) => {
    fsmkdir(blogName)
      .then(() => resolve())
      .catch((err) => reject(new Error("Blog already exists")));
  });
};

// createPost(postTitle, postContent, blogName)
const createPost = (postTitle, postContent, blogName) => {
  return new Promise((resolve, reject) => {
    fsreadDir(blogName)
      .then((data) => {
        const title = `${postTitle.replace(" ", "_")}`;
        if (data.includes(`${title}.txt`)) {
          resolve(
            fsWritefileP(
              `${path.join(blogName, title)}${Math.floor(Math.random() * 100000)}.txt`,
              `\nlikes: 1
              \nliked by: you
              \n\n${postContent} `
            )
          );
        } else {
          resolve(
            fsWritefileP(`${path.join(blogName, title)}.txt`,  
            `\nlikes: 1
            \nliked by: you
            \n\n${postContent} `)
          );
        }
      })
      .catch(() => reject(new Error("Blog name doesn't exists")));
  });
};
//update the content
const updatePost = (postTitle, post, postContent, username) => {
  return new Promise((resolve, reject) => {
    const post_contents = `likes: ${post["lk"] += 1}\nliked by: ${post["lb"] = `${post["lb"]}, ${username}`}\n\n${postContent}`;
    fsWritefileP(path.join(BLOG_PATH, `${postTitle.replace(" ", "_")}.txt`), post_contents)
      .then(() => resolve())
      .catch(() => reject(err))
  });
};

//inumerate the number of likes and append the user
const likePost = (postTitle, like_user, post, postContent) => {
  return new Promise((resolve, reject) => {
    fsReadfileP(FILE_NAME)
      .then((data) => checkUser(data, like_user))
      .then(() => resolve(updatePost(postTitle, post, postContent, like_user)))
      .catch(() => reject(err));
  });
};

fsReadfileP(FILE_NAME)
  .then((data) => {
    register(FILE_NAME, data, username, password).then(() => { });
    console.log("Account has been registered");
  })
  .then(() => {
    createABlog(FOLDER_PATH);
    console.log("Blog has been created");
  })
  .then(() => {
    createPost(title, content, BLOG_PATH);
    console.log("Post have been created");
  })
  .then(() => {
    likePost(title, like_user, like_counter, content);
    console.log("Post updated")
  })
  .catch((err) => console.log(err.message));