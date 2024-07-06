const express = require('express');
const { getMetrics } = require('../controllers/metricsController');

const router = express.Router();
const ap = "1";
router.get('/', getMetrics);

module.exports = router;
