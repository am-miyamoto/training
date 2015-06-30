var express = require('express')
  , session = require('express-session')
  ;
var router = express.Router();

router.get('/', function(req, res) {
  req.session.destroy();
  return res.render('logout');
});

module.exports = router;
