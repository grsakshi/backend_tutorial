var express = require("express");
var multer = require("multer");
var upload = multer();
var app = express();
var mongoose = require('mongoose');

const port = 3000;

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

app.put("/people/:id", function (req, res) {
  Person.findByIdAndUpdate(req.params.id, req.body, function (err, response) {
    if (err)
      res.json({
        message: "Error in updating person with id " + req.params.id,
      });
    res.json(response);
  });
});

app.get('/person', function(req, res){
  res.render('form');
});

app.get("/people", function (req, res) {
  Person.find(function (err, response) {
    res.json(response);
  });
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

app.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});