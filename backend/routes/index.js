const express = require('express');
const router = express.Router();

// Basic API routes
router.get('/api/status', (req, res) => {
  res.json({ 
    status: 'running', 
    service: 'DocBuilder Backend',
    version: '1.0.0'
  });
});

module.exports = router; 