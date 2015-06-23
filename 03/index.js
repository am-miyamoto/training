// require
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// setting
// http://expressjs.com/guide/using-template-engines.html
app.set('views', './views');
app.set('view engine', 'ejs');

// middle ware
app.use('/public', express.static('public'));

// Content-type
// application/x-www-form-urlencoded -> username=soneda&item=10
// application/json
// multipart/form-data (file upload)
app.use(bodyParser.urlencoded({ extended: true }));

// routing
// GET http://localhost:3000/hello -> world
app.get('/hello', function(req, res) {
  res.send('world');
});

// GET http://localhost:3000/search?q=node -> node
app.get('/search', function(req, res) {
  console.log(req.query);
  res.send(req.query.a+req.query.b);
});

// GET http://localhost:3000/users/soneda  -> soneda
app.get('/users/:id', function(req, res) {
  console.log(req.path);
  console.log(req.params);
  res.send(req.params.id);
});

// GET
app.get('/sendfile', function(req, res) {
  res.sendFile('sample.html');
});

// GET
app.get('/submit', function(req, res) {
  console.log(req.body);
  console.log(req.params);
  console.log(req.path);
  console.log(req.query);
  res.send(req.query.username);
});

// POST
app.post('/submit', function(req, res) {
  res.send(req.body);
});

// GET /ejs
app.get('/ejs', function(req, res) {
   var id = req.query.id;
  res.redirect('/hello');
  // res.render('index', {id: id});
});

var users = {
  soneda: 'abcdefg'
};

app.get('/test', function(req, res){
  console.log(req.query);
  var username = req.query.username;
  console.log(username);
  console.log(users.soneda);
  console.log(users[username]);
  if(users[username] && req.query.password === users[username]) {
    res.send('ok');
  } else {
    res.status(401).send('ng');
  }
});

app.post('/test', function(req, res){
  var username = req.body.username;
  var password = req.body.password;

  if(users[username] && password === users[username]) {
    res.send('ok');
  } else {
    res.send('ng');
  }
});

// console.log(req.body);
// console.log(req.params);
// console.log(req.path);
// console.log(req.query);



// server start
console.log('listen at 3000');
app.listen(3000);
