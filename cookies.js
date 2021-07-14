const express = require("express");
const app = express();
const port = 3000;
const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.get('/', (req, res) => {
    res.cookie("name", "express").send("cookie set");
    console.log("Cookies: ", req.cookies);
});

app.get('/clear_cookie_name', (req, res) => {
    res.clearCookie("name");
    res.send("Cookie name cleared");
});

app.listen(port, () => console.log(`Server running at port ${port}`));