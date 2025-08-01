const express = require('express');
const router = express.Router();
const PDFUtils = require('../utils/pdfUtils');

// Initialize PDF utilities
const pdfUtils = new PDFUtils();

// Generate document endpoint
router.post('/generate-document', async (req, res) => {
  try {
    const { address, priceFrom, priceTo, salespersonName, date, fullName, templateName = 'compliance.pdf' } = req.body;
    
    // Log received data for testing
    console.log('Received document generation request:', {
      address,
      priceFrom,
      priceTo,
      salespersonName,
      date,
      fullName,
      templateName
    });
    
    // Validate required fields
    if (!address) {
      const missingFields = [];
      if (!address) missingFields.push('address');
      
      return res.status(400).json({
        error: 'Missing required fields',
        missingFields: missingFields,
        message: `Please provide all required fields: ${missingFields.join(', ')}`
      });
    }
    
    // Set default price
    const price = 1000; // Default price
    
    // Check if template exists
    const templateExists = await pdfUtils.templateExists(templateName);
    if (!templateExists) {
      return res.status(404).json({
        error: 'Template not found',
        message: `Template '${templateName}' not found in templates folder`,
        availableTemplates: await pdfUtils.listTemplates()
      });
    }
    
    // Fill the PDF template with form data
    const formData = { address, priceFrom, priceTo, salespersonName, date, fullName };
    const result = await pdfUtils.fillPDFTemplate(templateName, formData);
    
    res.status(200).json({
      success: true,
      message: 'Document generated successfully',
      data: {
        documentId: result.filename.replace('.pdf', ''),
        generatedAt: new Date().toISOString(),
        customerInfo: {
          address: address,
          priceFrom: priceFrom,
          priceTo: priceTo,
          salespersonName: salespersonName,
          date: date,
          fullName: fullName
        },
        documentFile: {
          filename: result.filename,
          downloadUrl: result.downloadUrl,
          filePath: result.filePath
        }
      }
    });
    
  } catch (error) {
    console.error('Error generating document:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message || 'Failed to generate document'
    });
  }
});

// Get available templates endpoint
router.get('/templates', async (req, res) => {
  try {
    const templates = await pdfUtils.listTemplates();
    res.status(200).json({
      success: true,
      templates: templates
    });
  } catch (error) {
    console.error('Error listing templates:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to list templates'
    });
  }
});

module.exports = router; 