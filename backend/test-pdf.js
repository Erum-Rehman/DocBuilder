const PDFUtils = require('./utils/pdfUtils');

async function testPDFGeneration() {
  try {
    const pdfUtils = new PDFUtils();
    
    // Test data
    const formData = {
      fullName: 'John Doe',
      address: '123 Main Street, City, State 12345',
      date: '2024-01-15',
      price: 1500
    };
    
    console.log('Testing PDF generation...');
    console.log('Form data:', formData);
    
    // Check available templates
    const templates = await pdfUtils.listTemplates();
    console.log('Available templates:', templates);
    
    if (templates.length === 0) {
      console.log('No templates found. Please add a PDF template to the templates folder.');
      return;
    }
    
    // Use the first available template
    const templateName = templates[0];
    console.log(`Using template: ${templateName}`);
    
    // Generate the PDF
    const result = await pdfUtils.fillPDFTemplate(templateName, formData);
    
    console.log('PDF generated successfully!');
    console.log('Result:', result);
    console.log(`Download URL: http://localhost:5000${result.downloadUrl}`);
    
  } catch (error) {
    console.error('Error testing PDF generation:', error);
  }
}

// Run the test
testPDFGeneration(); 