const { PDFDocument, rgb } = require('pdf-lib');
const fs = require('fs').promises;
const path = require('path');

class PDFUtils {
  constructor() {
    this.templatePath = path.join(__dirname, '../templates');
    this.uploadsPath = path.join(__dirname, '../uploads');
  }

  async fillPDFTemplate(templateName, formData) {
    try {
      // Load the existing PDF template
      const templateFilePath = path.join(this.templatePath, templateName);
      const templateBytes = await fs.readFile(templateFilePath);
      
      // Load the PDF document
      const pdfDoc = await PDFDocument.load(templateBytes);
      
      // Get pages
      const pages = pdfDoc.getPages();
      if (pages.length === 0) {
        throw new Error('PDF template has no pages');
      }
      
      // Check if page 2 exists, if not create it
      let secondPage;
      if (pages.length >= 2) {
        secondPage = pages[1]; // Page 2 (index 1)
      } else {
        // Create page 2 if it doesn't exist
        secondPage = pdfDoc.addPage();
      }
      
      // Check if page 3 exists, if not create it
      let thirdPage;
      if (pages.length >= 3) {
        thirdPage = pages[2]; // Page 3 (index 2)
      } else {
        // Create pages until we have page 3
        while (pdfDoc.getPageCount() < 3) {
          pdfDoc.addPage();
        }
        thirdPage = pdfDoc.getPages()[2]; // Page 3
      }
      
      // Check if page 4 exists, if not create it
      let fourthPage;
      if (pages.length >= 4) {
        fourthPage = pages[3]; // Page 4 (index 3)
      } else {
        // Create pages until we have page 4
        while (pdfDoc.getPageCount() < 4) {
          pdfDoc.addPage();
        }
        fourthPage = pdfDoc.getPages()[3]; // Page 4
      }
      
      const { width, height } = secondPage.getSize();
      
      // Define text positions for Full Name field
      // Coordinates adjusted to fill the form field properly
      const textPositions = {
        fullName: { x: 200, y: height - 150 }, // Adjusted for form field location
        address: { x: 150, y: height - 250 },
        date: { x: 150, y: height - 300 },
        price: { x: 150, y: height - 350 }
      };
      
      // Add text overlays
      const fontSize = 12;
      const textColor = rgb(0, 0, 0); // Black color
      
      // Add Full Name - DISABLED
      // if (formData.fullName) {
      //   // Lower-Center position + 15px up + 15px left
      //   const perfectPosition = {
      //     x: 135, // Center position - 15px left
      //     y: height - 235, // Lower-Center (height - 250) + 15px up
      //   };
      //   
      //   firstPage.drawText(formData.fullName, {
      //     x: perfectPosition.x,
      //     y: perfectPosition.y,
      //     size: 12, // Normal font size
      //     color: textColor,
      //   });
      //   
      //   console.log(`PDF dimensions: ${width} x ${height}`);
      //   console.log(`Full Name placed at perfect position: x=${perfectPosition.x}, y=${perfectPosition.y}`);
      // }
      
      // Add Address - Perfect position on Page 2
      if (formData.address) {
        // Debug: Show page dimensions
        console.log(`PDF Page dimensions: Width=${width}, Height=${height}`);
        
        // Mid-Center position + 300px up - 40px down - 5px left
        const perfectAddressPosition = {
          x: 195, // Mid-Center x position - 5px left
          y: 660, // Mid-Center (400) + 300px up - 40px down
        };
        
        // Place address on Page 2
        secondPage.drawText(formData.address, {
          x: perfectAddressPosition.x,
          y: perfectAddressPosition.y,
          size: 12, // Normal font size
          color: textColor,
        });
        
        // Place same address on Page 4 - 1.5px down
        fourthPage.drawText(formData.address, {
          x: perfectAddressPosition.x,
          y: perfectAddressPosition.y - 1.5, // 1.5px down from page 2 position
          size: 12, // Normal font size
          color: textColor,
        });
        
        console.log(`Address placed on PAGE 2 at: x=${perfectAddressPosition.x}, y=${perfectAddressPosition.y}`);
        console.log(`Address placed on PAGE 4 at: x=${perfectAddressPosition.x}, y=${perfectAddressPosition.y - 1.5}`);
      }
      
              // Add Price From field on Page 3 - 200px up + 80px left
        if (formData.priceFrom) {
          const priceFromPosition = {
            x: 80, // 150 - 80px left
            y: 305, // 120 + 200px up
          };
        
        thirdPage.drawText(formData.priceFrom, {
          x: priceFromPosition.x,
          y: priceFromPosition.y,
          size: 12,
          color: textColor,
        });
        
        console.log(`Price From value "${formData.priceFrom}" placed on PAGE 3 at: x=${priceFromPosition.x}, y=${priceFromPosition.y}`);
      }
      
              // Add Price To field on Page 3 - same level as Price From
        if (formData.priceTo) {
          const priceToPosition = {
            x: 200, // 150 + 800px right
            y: 305, // Same Y as Price From
          };
        
        thirdPage.drawText(formData.priceTo, {
          x: priceToPosition.x,
          y: priceToPosition.y,
          size: 12,
          color: textColor,
        });
        
        console.log(`Price To value "${formData.priceTo}" placed on PAGE 3 at: x=${priceToPosition.x}, y=${priceToPosition.y}`);
      }
      
      // Add Salesperson's Name on Page 3 (bottom)
      if (formData.salespersonName) {
        const salespersonPage3Position = {
          x: 225, // Center position
          y: 190, // Bottom of page 3
        };
        
        thirdPage.drawText(formData.salespersonName, {
          x: salespersonPage3Position.x,
          y: salespersonPage3Position.y,
          size: 12,
          color: textColor,
        });
        
        console.log(`Salesperson's Name value "${formData.salespersonName}" placed on PAGE 3 (bottom) at: x=${salespersonPage3Position.x}, y=${salespersonPage3Position.y}`);
      }
      
      // Add Salesperson's Name on Page 4 (bottom)
      if (formData.salespersonName) {
        const salespersonPage4Position = {
          x: 225, // Center position
          y: 165, // Bottom of page 4
        };
        
        fourthPage.drawText(formData.salespersonName, {
          x: salespersonPage4Position.x,
          y: salespersonPage4Position.y,
          size: 12,
          color: textColor,
        });
        
        console.log(`Salesperson's Name value "${formData.salespersonName}" placed on PAGE 4 (bottom) at: x=${salespersonPage4Position.x}, y=${salespersonPage4Position.y}`);
      }
      
      // Save the modified PDF with unique filename
      const timestamp = Date.now();
      const filename = `filled_document_${timestamp}.pdf`;
      const outputPath = path.join(this.uploadsPath, filename);
      
      const pdfBytes = await pdfDoc.save();
      await fs.writeFile(outputPath, pdfBytes);
      
      // Return the file path and download URL
      return {
        filename: filename,
        filePath: outputPath,
        downloadUrl: `/uploads/${filename}`,
        success: true
      };
      
    } catch (error) {
      console.error('Error filling PDF template:', error);
      throw new Error(`Failed to fill PDF template: ${error.message}`);
    }
  }

  async listTemplates() {
    try {
      const files = await fs.readdir(this.templatePath);
      return files.filter(file => file.endsWith('.pdf'));
    } catch (error) {
      console.error('Error listing templates:', error);
      return [];
    }
  }

  async templateExists(templateName) {
    try {
      const templatePath = path.join(this.templatePath, templateName);
      await fs.access(templatePath);
      return true;
    } catch (error) {
      return false;
    }
  }
}

module.exports = PDFUtils; 