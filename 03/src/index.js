// require
var express = require('express');
var bodyParser = require('body-parser');
// var users = require('./model/users')
var config = require('./config');
var Database = require('./model/users');
var validater = require('../public/js/validation');
// var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = express();

// setting
// http://expressjs.com/guide/using-template-engines.html
app.set('views', './views');
app.set('view engine', 'ejs');

// middle ware
// app.use(cookieParser());
app.use(session({ secret: 'vcp training server' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static('public'));

app.get('/1', function(req, res) {
  var name = req.query.name;
  req.session.name = name;
  res.send(name + ' <a href="/2">2</a>');
});

app.get('/2', function(req, res) {
  var name = req.session.name;
  res.send(name + ' <a href="/3">3</a>');
});

app.get('/3', function(req, res) {
  var name = req.session.name;
  req.session.destroy(function(err) {
    res.send(name);
  });
});


module.exports.app = app;
