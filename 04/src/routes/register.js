var express = require('express')
  , validater = require('../../public/js/validation')
  ;
var router = express.Router();

router.get('/', function(req, res) {
  return res.render('register', { error_reasons: '' });
});

router.post('/', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var params = {
    username: username,
    password: password
  };

  var errors = validater.validation(params);
  if(errors.length > 0) {
    return res.status(400).render('register', { error_reasons: errors })
  }

  db.connect()
  .then(function(result) {
    return db.register(username, password);
  }).then(function(user) {
    return res.redirect('/main?myname=' + username);
  }).catch(function(err) {
    console.log(err);
    return res.statu(500).send('server error');
  });
});

module.exports = router;
