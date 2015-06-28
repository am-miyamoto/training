var express = require('express')
  ;
var router = express.Router();

router.get('/', function(req, res) {
  if (!req.query.myname) {
    return res.redirect('/login');
  };

  var myname = req.query.myname;
  return db.getUsernames()
  .then(function(usernames) {
    return res.render('main', { myname: myname,  usernames: usernames });;
  });
});

module.exports = router;
