const express = require('express');
const router = express.Router();
const entriesCtrl = require('../controllers/entries');

router.delete('/:id', entriesCtrl.deleteEntry);

module.exports = router;