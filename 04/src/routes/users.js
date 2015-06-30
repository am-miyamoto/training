var express = require('express')
  , session = require('express-session')
  ;
var router = express.Router();

router.post('/', function(req, res) {
  var myname = req.session.name;
  if (!myname) {
    return res.redirect('/login');
  };
  var other_name = req.body.other_name;
  return res.render('users', { myname: myname,  other_name: other_name });
});

module.exports = router;
