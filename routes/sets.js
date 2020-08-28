const express = require('express');
const router = express.Router();
const setsCtrl = require('../controllers/sets');

router.get('/new', setsCtrl.new);
router.post('/', setsCtrl.create);
router.get('/sets/:id', setsCtrl.show);

module.exports = router;