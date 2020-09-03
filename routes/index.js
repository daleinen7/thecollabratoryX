const express = require('express');
const router = express.Router();
const passport = require('passport');
const Set = require('../models/set')

/* GET home page. */
router.get('/', function(req, res, next) {
  // If the user is logged in show their followed sets
  if (req.user) {
    Set.find({'followedBy': {$in: req.user._id}}, function(err, followedSets) {
      // individual arrays for each category
      const instruments = [];
      const effects = [];
      const roles = [];
      const universals = [];
      
      for (let i = 0; i < followedSets.length; i++) {
        for (let j = 0; j < followedSets[i].entries.length; j++) {
          ent = followedSets[i].entries[j];

          switch (ent.category) {
            case 'instrument':
              instruments.push(ent.description);
              break;
            case 'effect':
              effects.push(ent.description);
              break;
            case 'role':
              roles.push(ent.description);
              break;
            case 'universal': 
              universals.push(ent.description);
              break;
            default:
              break;
          }
        }
      }

      Set.find({'followedBy': {$nin: req.user._id}}, function(err, unfollowedSets) {
        res.render('index', { 
          title: 'the Collabratory',
          followedSets,
          unfollowedSets,
          instruments,
          effects,
          roles,
          universals
        });
      });
    });
  } else {
    // Otherwise show all sets
    Set.find({}, function(err, unfollowedSets) {

      const instruments = [];
      const effects = [];
      const roles = [];
      const universals = [];
      
      for (let i = 0; i < unfollowedSets.length; i++) {
        for (let j = 0; j < unfollowedSets[i].entries.length; j++) {
          ent = unfollowedSets[i].entries[j];

          switch (ent.category) {
            case 'instrument':
              instruments.push(ent.description);
              break;
            case 'effect':
              effects.push(ent.description);
              break;
            case 'role':
              roles.push(ent.description);
              break;
            case 'universal': 
              universals.push(ent.description);
              break;
            default:
              break;
          }
        }
      }

      res.render('index', { 
        title: 'the Collabratory',
        unfollowedSets,
        instruments,
        effects,
        roles,
        universals
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