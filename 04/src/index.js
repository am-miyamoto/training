var express = require('express')
, bodyParser = require('body-parser')
, validater = require('../public/js/validation')
, config = require('config')
;

var app = express();
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/login', require('./routes/login'));
app.use('/register', require('./routes/register'));
app.use('/main', require('./routes/main'));

module.exports.app = app;
