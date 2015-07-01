let express = require('express')
  , validater = require('../../public/js/validation')
  , Users = require('../model/users')
  , session = require('express-session')
  ;
let router = express.Router();

router.get('/', function(req, res) {
  return res.render('login', { errors: null });
});

router.post('/', function(req, res) {
  let username = req.body.username;
  let password = req.body.password;
  let errors = validater.loginValidation({ username, password });
  if(errors.length > 0) {
    return res.status(400).render('login', { errors });
  }
  let db = new Users();
  db.connect()
  .then(function(result) {
    return db.login(username, password);
  }).then(function(result) {
    if (result !== true) {
      return res.status(401).render('login', { errors: ['ログイン情報が間違っています'] });
    }
    req.session.username = username;
    return res.redirect('/main');
  }).catch(function(err) {
    console.log(err);
    return res.status(500).send('server error');
  });
});
module.exports = router;
