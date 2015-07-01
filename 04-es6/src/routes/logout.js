let express = require('express')
  , session = require('express-session')
  ;
let router = express.Router();

router.get('/', (req, res) => {
  req.session.destroy();
  return res.render('logout');
});

module.exports = router;
