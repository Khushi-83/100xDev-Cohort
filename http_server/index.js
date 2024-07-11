const http = require("http");
const fs = require("fs");
const myServer = http.createServer((req, res) => {
  const log = `${Date.now()} ${req.url}: New Req Received\n`;  
    fs.appendFile("log.txt", log, (err, data)=> {
        switch(req.url){
            case "/": res.end("Hello World!!");
            break;
            case "/about": res.end("Hi, I am Khus Sinha");
            break;
            case "/contact": res.end("Contact me at sinhakhushi0803@gmail.com");
            break;
            default: res.end("404 Page Not Found");     
        }
        
    }); 
});

myServer.listen(3000, () => console.log("Server Started!"));
