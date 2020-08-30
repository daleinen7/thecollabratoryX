const express = require('express');
const router = express.Router();
const entriesCtrl = require('../controllers/entries');

router.delete('/:id', isLoggedIn, entriesCtrl.deleteEntry);

module.exports = router;

function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}