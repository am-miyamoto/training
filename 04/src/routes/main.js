var express = require('express')
  , Users = require('../model/users')
  , session = require('express-session')
  ;
var router = express.Router();

router.get('/', function(req, res) {
  var myname = req.session.name;
  if (!myname) {
    return res.redirect('/login');
  };
  var db = new Users();
  return db.connect()
  .then(function() {
    return db.getUsernames()
  }).then(function(usernames) {
    return res.render('main', { myname: myname,  usernames: usernames });
  });
});

module.exports = router;
