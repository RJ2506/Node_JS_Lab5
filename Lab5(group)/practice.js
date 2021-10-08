const fs = require("fs");
const process = require("process");

let arg = process.argv;
user = "RJ";

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
            fs.appendFile(file, user, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        }
    });
};

fsReadfileP("database.txt")
    .then((data) => fsAppendUserP("database.txt", user, data))
    .catch((err) => console.log(err.message));
// fsAppendUserP("database.txt", `RJ`);
// fs.writeFile(
//     "database.txt",
//     `username: RJ password: 2503\nusername: RJssa password: 2503\nusername: RJss password: 2503\nusername: RJs password: 2503\n`,
//     (err) => {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log("file saved");
//         }
//     }
// );

// fs.appendFile();

// fs.readFile("database.txt", (err, data) => {
//     let files = [];
//     if (err) {
//         console.log(err);
//     } else {
//         for (const user of data.toString()) {
//             console.log(user);
//         }
//     }
//     console.log(files);
// });