var express = require('express')
  , validater = require('../../public/js/validation')
  , session = require('express-session')
  , Users = require('../model/users')
  ;
var router = express.Router();

router.get('/', function(req, res) {
  return res.render('register', { error_reasons: '' });
});

router.post('/', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var confirm_password = req.body.confirm_password;

  var params = {
    username: username,
    password: password,
    confirm_password: confirm_password
  };

  var errors = validater.validation(params);
  if(errors.length > 0) {
    return res.status(400).render('register', { error_reasons: errors })
  }
  var db = new Users();
  db.connect()
  .then(function(result) {
    return db.register(username, password);
  }).then(function(user) {
    req.session.name = username;
    return res.redirect('/main');
  }).catch(function(err) {
    console.log(err);
    return res.status(500).send('server error');
  });
});

module.exports = router;
