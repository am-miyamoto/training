var express = require('express')
, bodyParser = require('body-parser')
, config = ('./config')
, validater = require('../public/js/validation');
;

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
  return res.render('main', { username: username });

});
module.exports.app = app;
