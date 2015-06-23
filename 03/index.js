// require
var express = require('express');
var app = express();

// middle ware
app.use('/public', express.static('public'));

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
// console.log(req.body);
// console.log(req.params);
// console.log(req.path);
// console.log(req.query);

// server start
console.log('listen at 3000');
app.listen(3000);
