var express = require('express')
var multer = require('multer')
var upload = multer()
var app = express()
var cookieParser = require("cookie-parser")

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(upload.array())

var movies = require('./movies')
//Route handler
app.use("/movies", movies);

app.listen(3000);