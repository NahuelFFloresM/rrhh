var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/nueva/basica', function(req, res, next) {
  res.render('newf');
});

module.exports = router;
