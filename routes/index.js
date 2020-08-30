const express = require('express');
const router = express.Router();
const passport = require('passport');
const Set = require('../models/set')

/* GET home page. */
router.get('/', function(req, res, next) {
  // If the user is logged in show their followed sets
  if (req.user) {
    Set.find({'followedBy': {$in: req.user._id}}, function(err, followedSets) {
      Set.find({'followedBy': {$nin: req.user._id}}, function(err, unfollowedSets) {
        res.render('index', { 
          title: 'Homepage for The Collabratory',
          followedSets,
          unfollowedSets
        });
      });
    });
  } else {
    // Otherwise show all sets
    Set.find({}, function(err, unfollowedSets) {
      res.render('index', { 
        title: 'Homepage for The Collabratory',
        unfollowedSets
      });
    });
  }
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