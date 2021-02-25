var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Registration form' });
});

module.exports = router;


router.post('/', (req, res) => {
  console.log(req.body);

  res.render('form', { title: 'Thank you for registering!' });
  
});