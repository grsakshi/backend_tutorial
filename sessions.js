const express = require("express");
const app = express();
const port = 3000;
const session = require("express-session");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(session({ secret: "Shh, its a secret!" }));

app.get("/", (req, res) => {
    if(req.session.page_views){
        req.session.page_views++;
        res.send("You have visited this page " + req.session.page_views + " times");
    }
    else{
        req.session.page_views = 1;
        res.send("Welcome to this page for the first time!");
    }
});

app.listen(port, () => console.log(`Server running at port ${port}`));