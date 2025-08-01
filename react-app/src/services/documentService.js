import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

class DocumentService {
  async generateDocument(documentData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/generate-document`, documentData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error generating document:', error);
      
      // Handle different error types
      if (error.response) {
        // Server responded with error status
        return {
          success: false,
          error: error.response.data?.message || 'Server error occurred',
          status: error.response.status
        };
      } else if (error.request) {
        // Request was made but no response received
        return {
          success: false,
          error: 'No response from server. Please check if the server is running.',
        };
      } else {
        // Something else happened
        return {
          success: false,
          error: 'An unexpected error occurred',
        };
      }
    }
  }

  async downloadDocument(downloadUrl, filename = 'document.pdf') {
    try {
      console.log('Downloading from URL:', downloadUrl);
      console.log('Filename:', filename);

      // Option 1: Try direct download with window.open (for same-origin URLs)
      if (downloadUrl.startsWith('http://localhost:5000')) {
        // For development, try direct download
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', filename);
        link.setAttribute('target', '_blank');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return { success: true };
      }

      // Option 2: Use axios for blob download
      const response = await axios.get(downloadUrl, {
        responseType: 'blob',
        headers: {
          'Accept': 'application/pdf',
        }
      });

      // Create blob link to download
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      return { success: true };
    } catch (error) {
      console.error('Error downloading document:', error);
      console.error('Download URL:', downloadUrl);
      return {
        success: false,
        error: `Failed to download document: ${error.message}`
      };
    }
  }
}

export default new DocumentService();