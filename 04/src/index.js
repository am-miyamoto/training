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
app.use('/register', require('./routes/register'));
app.use('/main', require('./routes/main'));

module.exports.app = app;
