var express = require('express')
  , Users = require('../model/users')
  , session = require('express-session')
  ;
var router = express.Router();

router.get('/', function(req, res) {
  var username = req.session.username;
  if (!username) {
    return res.redirect('/login');
  };
  var db = new Users();
  return db.connect()
  .then(function() {
    return db.getUsernames()
  }).then(function(usernames) { // getUserNames
    return res.render('main', { username: username,  usernames: usernames });
  });
});

module.exports = router;
