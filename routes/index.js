var express = require('express');
var router = express.Router();
const queue = require('../queue.js')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Sign up for Raancher Cloud' });
});

module.exports = router;


router.post('/', (req, res) => {
  console.log(req.body);

  // Write user information to queue for processing by the backend
  queue.putUserReg({
    email: req.body.email, 
    first_name: req.body.first_name, 
    last_name: req.body.last_name})

  res.render('form', { title: 'Thank you for registering!' });
  
});