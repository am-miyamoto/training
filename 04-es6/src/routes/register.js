let express = require('express')
  , validater = require('../../public/js/validation')
  , session = require('express-session')
  , Users = require('../model/users')
  ;
let router = express.Router();

router.get('/', (req, res) => {
  return res.render('register', { errors: '' });
});

router.post('/', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let confirm_password = req.body.confirm_password;
  let errors = validater.registerValidation({ username, password, confirm_password });
  if(errors.length > 0) {
    return res.status(400).render('register', { errors: errors });
  }
  let db = new Users();
  db.connect()
  .then((result) => {
    return db.register(username, password);
  }).then((user) => {
    req.session.username = username;
    return res.redirect('/main');
  }).catch((err) => {
    let errors = [];
    errors.push(err);
    return res.status(400).render('register', { errors });
  });
});

module.exports = router;
