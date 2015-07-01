let express = require('express')
  , Users = require('../model/users')
  , session = require('express-session')
  ;
let router = express.Router();

router.get('/', (req, res) => {
  let username = req.session.username;
  if (!username) {
    return res.redirect('/login');
  };
  let db = new Users();
  return db.connect()
  .then(() => {
    return db.getUsernames()
  }).then((usernames) => {
    return res.render('main', { username, usernames });
  });
});

module.exports = router;
