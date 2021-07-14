const express = require("express");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const upload = multer();
const app = express();
const port = 3000;

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.array());
app.use(cookieParser());
app.use(session({secret: "Your secret key", saveUninitialized: true, resave: true}));


var users = [];

app.get('/signup', (req, res) => {
    res.render("signup");
});

app.post('/signup', (req, res) => {
    if(!req.body.id || !req.body.password){
        res.status(404).send("Invalid details");
    }else{
        users.filter(function(user){
            if(req.body.id === user.id){
                res.render("signup", {
                    message: "User already exists"
                });
            }
        });
        var newUser = {id: req.body.id, password: req.body.password}
        users.push(newUser);
        req.session.user = newUser;
        console.log(req.session);
        res.redirect('/protected_page');
    }
});

function checkSignIn(req, res, next) {
  if (req.session.user) {
    next();
    console.log(req.session.user);
  } else {
    var err = new Error("Not logged in");
    console.log(req.session.user);
    next(err);
  }
}

app.get('/protected_page', checkSignIn, (req, res) => {
    res.render("protected_page", {id: req.session.user.id});
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.post("/login", function (req, res) {
  console.log(users);
  if (!req.body.id || !req.body.password) {
    res.render("login", { message: "Please enter both id and password" });
  } else {
    users.filter(function (user) {
      if (user.id === req.body.id && user.password === req.body.password) {
        req.session.user = user;
        res.redirect("/protected_page");
      }
    });
    res.render("login", { message: "Invalid credentials!" });
  }
});

app.get("/logout", function (req, res) {
  req.session.destroy(function () {
    console.log("user logged out.");
  });
  res.redirect("/login");
});

app.use("/protected_page", function (err, req, res, next) {
  console.log(err);
  //User should be authenticated! Redirect him to log in.
  res.redirect("/login");
});

app.listen(port, () => console.log(`Server is running at port ${port}`));