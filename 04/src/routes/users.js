var express = require('express')
  , session = require('express-session')
  ;
var router = express.Router();

router.get('/:name', function(req, res) {
  if (!req.session || !req.session.username) {
    return res.redirect('/login');
  }
  var username = req.session.username;
  var name = req.params.name;
  return res.render('users', { username: username,  name: name });
});

module.exports = router;
