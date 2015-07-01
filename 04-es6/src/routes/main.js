let express = require('express')
  , Users = require('../model/users')
  , session = require('express-session')
  ;
let router = express.Router();

router.get('/', function(req, res) {
  let username = req.session.username;
  if (!username) {
    return res.redirect('/login');
  };
  let db = new Users();
  return db.connect()
  .then(function() {
    return db.getUsernames()
  }).then(function(usernames) { // getUserNames
    return res.render('main', { username: username,  usernames: usernames });
  });
});

module.exports = router;
