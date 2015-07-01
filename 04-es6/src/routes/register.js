let express = require('express')
  , validater = require('../../public/js/validation')
  , session = require('express-session')
  , Users = require('../model/users')
  ;
let router = express.Router();

router.get('/', function(req, res) {
  return res.render('register', { error_reasons: '' });
});

router.post('/', function(req, res) {
  let username = req.body.username;
  let password = req.body.password;
  let confirm_password = req.body.confirm_password;
  let params = {
    username: username,
    password: password,
    confirm_password: confirm_password
  };
  let errors = validater.registerValidation(params);
  if(errors.length > 0) {
    return res.status(400).render('register', { error_reasons: errors });
  }
  let db = new Users();
  db.connect()
  .then(function(result) {
    return db.register(username, password);
  }).then(function(user) {
    req.session.username = username;
    return res.redirect('/main');
  }).catch(function(err) {
    let err_arry = []; // errors = [], error_reasons = []
    err_arry.push(err);
    console.log(err);
    return res.status(400).render('register', { error_reasons: err_arry });
  });
});

module.exports = router;
