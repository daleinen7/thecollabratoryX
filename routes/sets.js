const express = require('express');
const router = express.Router();
const setsCtrl = require('../controllers/sets');
const entriesCtrl = require('../controllers/entries');

router.get('/new', isLoggedIn, setsCtrl.new);
router.post('/', isLoggedIn, setsCtrl.create);
router.get('/:id', setsCtrl.show);
router.post('/:id/entries', isLoggedIn, entriesCtrl.create);
router.put('/:id/edit', isLoggedIn, setsCtrl.edit);
router.delete('/:id', isLoggedIn, setsCtrl.delete);

module.exports = router;

function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}0