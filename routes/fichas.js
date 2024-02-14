var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/nueva/basica', function(req, res, next) {
  res.render('newf');
});

router.get('/nuevatipo', function(req,res,next){
  res.render('newt');
});


module.exports = router;
