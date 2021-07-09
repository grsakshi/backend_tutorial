var express = require("express");
var multer = require("multer");
var upload = multer();
var app = express();
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/mydb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
.then((res) => {
  console.log("DB Connected");
});


var personSchema = mongoose.Schema({
  name: String,
  age: Number,
  nationality: String
});

var Person = mongoose.model("Person", personSchema);

app.get('/person', function(req, res){
  res.render('form');
});

app.set('view engine', 'pug');
app.set('views', './views');

// for parsing application/json
app.use(express.json());

// for parsing application/xwww-
app.use(express.urlencoded({ extended: true }));
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static('public'));

app.post('/person', function(req, res){
  var personInfo = req.body;
  console.log(personInfo);
  if(!personInfo.name || !personInfo.age || !personInfo.nationality ){
    res.render("show_message", {
      message: "Sorry, you provided wrong info", type: "error"
    });
  } else {
      var newPerson = new Person({
        name: personInfo.name,
        age: personInfo.age,
        nationality: personInfo.nationality,
      });
      // var s = newPerson.save();
      // res.json(s);
      newPerson.save(function(err, Person){
        if (err){
          res.render("show_message", {
            message: "Database error",
            type: "error",
          });}
        else{
          res.render("show_message", {
            message: "New person added",
            type: "success",
            person: personInfo,
          });}
      });
    }
});

app.listen(3000);