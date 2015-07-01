let express = require('express')
  , session = require('express-session')
  ;
let router = express.Router();

router.get('/:name', function(req, res) {
  if (!req.session || !req.session.username) {
    return res.redirect('/login');
  }
  let username = req.session.username;
  let name = req.params.name;
  return res.render('users', { username, name });
});

module.exports = router;
