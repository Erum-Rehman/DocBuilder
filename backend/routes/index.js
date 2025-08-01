const express = require('express');
const router = express.Router();

// Import route modules
const documentsRoutes = require('./documents');

// Use route modules - only generate-document endpoint
router.use('/', documentsRoutes);

module.exports = router; 