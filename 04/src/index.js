var express = require('express')
, bodyParser = require('body-parser')
, config = ('./config')
, validater = require('../public/js/validation')
, config = require('config')
, Database = require('./model/users')
;

var db = new Database(config.database);
var app = express();
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/login', function(req, res) {
  return res.render('login');
});

app.post('/validation', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var params = {
    username: username,
    password: password
  };

  var errors = validater.validation(params);
  if(errors.length > 0) {
    return res.send(errors.join(','));
  }

  db.connect()
  .then(function(result) {
    return db.login(username, password);
  }).then(function(result) {
    console.log(result);
    if (result === true) {
      return showMainPage(res, username);
    }
    return res.send('ng');
  }).catch(function(error) {
    console.log(error);
    return res.send('ng');
  });
});

app.get('/register', function(req, res) {
  return res.render('register');
});

app.post('/registration', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var params = {
    username: username,
    password: password
  };

  var errors = validater.validation(params);
  if(errors.length > 0) {
    return res.send(errors.join(','));
  }

  db.connect()
  .then(function(result) {
    return db.register(username, password);
  }).then(function(user) {
    console.log(user);
    return showMainPage(res, user.username);
  }).catch(function(error) {
    console.log(error);
    return res.send('ng');
  });
});

function showMainPage(res, myname) {
  return db.getUsernames()
  .then(function(usernames) {
    return res.render('main', { myname: myname, usernames: usernames });
  }).catch(function(error) {
    return res.send(error);
  });
}

module.exports.app = app;
