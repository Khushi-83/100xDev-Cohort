// const http = require("http");
// const fs = require("fs");
// const url = require("url");

// const myServer = http.createServer((req, res) => {
//     if (req.url === "/favicon.ico") return res.end();
//     const log = `${Date.now()} ${req.url}: New Req Received\n`; 
//     const myUrl = url.parse(req.url, true);
//     console.log(myUrl);
//     fs.appendFile("log.txt", log, (err, data)=> {
//         switch(myUrl.pathname  ){
//             case "/": 
//             res.end("Hello World!!");
//             break;
//             case "/about": 
//             const username = myUrl.query.myname;
//             res.end(`Hi, ${username}`);
//             break;
//             case "/search": 
//             const search = myUrl.query.search_query;
//             res.end("Your Search results for" + search);
//             break;
//             default: res.end("404 Page Not Found");     
//         }
        
//     }); 
// });

// myServer.listen(3000, () => console.log("Server Started!"));

// Same code in Express JS as the Express Js makes the code clutter free and easy for us to read and understand it.
// url parser is not needed in express becoz, it can inernally parse the url.

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 3000;

app.get("/", (req, res) => {
    res.send("Hello World!!");
});
app.get("/about", (req, res) => {
    const username = req.query.myname;
    res.send(`Hi, ${username}`);
});
app.get("/users", async(req, res) =>{
    const allDbUsers = await User.find({});
    const html = `
    <ul>
       ${allDbUsers.map((user) => `<li>${user.firstname} - ${user.email} </li>`).join('')}
    </ul>
    `;
       res.send(html);
});
app.get("/api/users", (req, res) =>{
    return res.json(users);
});
app.get("/search", (req, res) => {
    const search = req.query.search_query;
    res.send("Your Search results for" + search);
});

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        unique: true,
    },
    age:{
        type: Number,
    },
});

app.post("/api/users", async(req, res)=>{
    if (
        !body ||
        !body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.gender ||
        !body.ip_address 
      )  {
        return res.status(400).json({mag: "All feilds are required"});
    }

    const result = await User.create({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,  
        gender: body.gender,
        ip_address: body.ip_address,           
    });
    console.log("result". result);
    return res.status(201).json({msg: "successfully appended"});
});
mongoose.connect('mongodb://127.0.0.1:27017/TestDB')
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log("Mongo Error", err));

const User = mongoose.model("User", userSchema);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});