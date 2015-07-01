let express = require('express')
  , Users = require('../model/users')
  , session = require('express-session')
  ;
let router = express.Router();

router.get('/', (req, res) => {
  if (!req.session || !req.session.username) {
    return res.redirect('/login');
  };
  let username = req.session.username;
  let db = new Users();
  return db.connect()
  .then(() => {
    return db.getUsernames()
  }).then((usernames) => {
    return res.render('main', { username, usernames });
  });
});

module.exports = router;
