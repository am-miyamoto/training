var express = require('express')
, bodyParser = require('body-parser')
, config = ('./config')
, validater = require('../public/js/validation')
, config = require('config')
, Database = require('./model/users')
;

var db = new Database(config.database);
global.db = db; // TODO remove db from global scope.
var app = express();
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/login', require('./routes/login'));
// app.use('/register', require('./routes/register'));
// app.use('/main', require('./routes/main'));

app.get('/register', function(req, res) {
  return res.render('register', { error_reasons: '' });
});

app.post('/register', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var params = {
    username: username,
    password: password
  };

  var errors = validater.validation(params);
  if(errors.length > 0) {
    return res.status(400).render('register', { error_reasons: errors })
  }

  db.connect()
  .then(function(result) {
    return db.register(username, password);
  }).then(function(user) {
    return showMainPage(res, user.username);
  }).catch(function(error) {
    console.log(error);
    return res.statu(500).send('server error');
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
