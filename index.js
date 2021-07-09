var express = require('express')
var app = express()

app.use('/static', express.static('public'));

app.set('view engine', 'pug');
app.set('views', './views');
//Route handler
app.get("/first-template", function (req, res) {
  res.render("first_view");
});

app.get("/dynamic_view", function (req, res) {
  res.render("dynamic", {
    name: "Tutor",
    url: "http://www.tutorialspoint.com",
  });
});

app.listen(3000);