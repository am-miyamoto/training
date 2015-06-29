var express = require('express')
  , validater = require('../../public/js/validation') // エイリアスをサーバ内に置く方が良い
  ;
var router = express.Router();

router.get('/', function(req, res) {
  return res.render('login', { error_reasons: '' });
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
    return res.status(400).render('login', { error_reasons: errors });
  }

  db.connect()
  .then(function(result) {
    return db.login(username, password);
  }).then(function(result) {
    if (result !== true) {
      return res.status(401).render('login', { error_reasons: ['ログイン情報が間違っています'] });
    }
    // 1, session を使う
    // 2, URL を文字列操作で作らない
    return res.redirect('/main?myname=' + username);
  }).catch(function(error) { // err
    console.log(error); // console.error(err)
    return res.status(500).send('server error');
  });
});

module.exports = router;
