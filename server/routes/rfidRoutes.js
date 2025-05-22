const express = require('express');
const { getRFID } = require('../controller/readRifdController');
const router = express.Router();

router.get('/', getRFID);

module.exports = router;
