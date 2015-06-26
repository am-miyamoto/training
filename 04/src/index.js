var express = require('express')
  , bodyParser = require('body-parser')
  , config = ('./config')
  ;

var app = express();
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/public', express.static('public'));

app.get('/login', function(req, res) {
  return res.render('login');
});

module.exports.app = app;
