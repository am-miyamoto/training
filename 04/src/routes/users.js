var express = require('express')
  , session = require('express-session')
  ;
var router = express.Router();

router.get('/', function(req, res) {
  var myname = req.session.name;
  if (!myname) {
    return res.redirect('/login');
  };
  return res.render('users', { myname: myname,  other_name: 'hoge' });
});

module.exports = router;
