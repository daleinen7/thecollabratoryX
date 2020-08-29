const express = require('express');
const router = express.Router();
const setsCtrl = require('../controllers/sets');
const entriesCtrl = require('../controllers/entries');

router.get('/new', setsCtrl.new);
router.post('/', setsCtrl.create);
router.get('/:id', setsCtrl.show);
router.post('/:id/entries', entriesCtrl.create);
router.put('/:id/edit', setsCtrl.edit);

module.exports = router;