const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user')
const Set = require('../models/set')

/* GET home page. */
router.get('/', function(req, res, next) {
  Set.find({}, function(err, sets) {
    console.log(req.user);
    res.render('index', { 
      title: 'Homepage for The Collabratory',
      user: req.user,
      name: req.query.name,
      sets
    })
  })  
});

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
  successRedirect : '/',
  failureRedirect : '/'
  }
));

// OAuth logout
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;