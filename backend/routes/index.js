const express = require('express');
const router = express.Router();

// Import route modules
const healthRoutes = require('./health');

// Use route modules
router.use('/health', healthRoutes);

module.exports = router; 