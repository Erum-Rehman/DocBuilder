const express = require('express');
const router = express.Router();

// Import route modules
const healthRoutes = require('./health');
const documentsRoutes = require('./documents');

// Use route modules
router.use('/health', healthRoutes);
router.use('/', documentsRoutes);

module.exports = router; 