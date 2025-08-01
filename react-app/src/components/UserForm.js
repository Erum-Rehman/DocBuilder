import React, { useState } from 'react';
import documentService from '../services/documentService';
import DownloadModal from './modals/DownloadModal';
import TestDataButton from './TestDataButton';

const UserForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    date: '',
    priceFrom: '',
    priceTo: '',
    salespersonName: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState('');
  const [apiResponse, setApiResponse] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setDownloadUrl('');
    
    try {
      const result = await documentService.generateDocument(formData);
      
      if (result.success) {
        console.log('Document generated:', result.data);
        setApiResponse(result.data);
        
        // Set download URL and show modal
        if (result.data?.data?.documentFile?.downloadUrl) {
          const fullDownloadUrl = `http://localhost:5000${result.data.data.documentFile.downloadUrl}`;
          console.log('Full download URL:', fullDownloadUrl);
          console.log('Document filename:', result.data.data.documentFile.filename);
          setDownloadUrl(fullDownloadUrl);
          setShowModal(true);
        } else {
          console.error('No download URL found in response:', result.data);
        }
      } else {
        setError(result.error || 'Failed to generate document');
        console.error('Failed to generate document:', result.error);
      }
    } catch (error) {
      setError('An unexpected error occurred');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    if (downloadUrl && apiResponse?.data?.documentFile?.filename) {
      const result = await documentService.downloadDocument(downloadUrl, apiResponse.data.documentFile.filename);
      if (!result.success) {
        setError(result.error);
      }
    } else {
      // Fallback: just trigger download with generic filename
      if (downloadUrl) {
        const result = await documentService.downloadDocument(downloadUrl, 'document.pdf');
        if (!result.success) {
          setError(result.error);
        }
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleFillTestData = (testData) => {
    setFormData(testData);
    setError('');
  };

  return (
    <div className="user-form-container">
      <div className="user-form-wrapper">
        <h2 className="user-form-title">Document Generator Form</h2>
        <div className="test-data-section">
          <TestDataButton onFillForm={handleFillTestData} />
        </div>
        <form className="user-form" onSubmit={handleSubmit}>
          <div className="user-form-group">
            <label htmlFor="fullName" className="user-form-label">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="user-form-input"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="user-form-group">
            <label htmlFor="address" className="user-form-label">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="user-form-textarea"
              placeholder="Enter your address"
              rows="4"
              required
            />
          </div>

          <div className="user-form-group">
            <label htmlFor="date" className="user-form-label">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="user-form-input"
              required
            />
          </div>

          <div className="price-range-container">
            <div className="user-form-group">
              <label htmlFor="priceFrom" className="user-form-label">
                Price From
              </label>
              <select
                id="priceFrom"
                name="priceFrom"
                value={formData.priceFrom}
                onChange={handleInputChange}
                className="user-form-input"
              >
                <option value="">Select starting price</option>
                <option value="1000">1,000</option>
                <option value="2500">2,500</option>
                <option value="5000">5,000</option>
                <option value="7500">7,500</option>
                <option value="10000">10,000</option>
                <option value="15000">15,000</option>
                <option value="20000">20,000</option>
                <option value="25000">25,000</option>
                <option value="30000">30,000</option>
                <option value="50000">50,000</option>
              </select>
            </div>

            <div className="user-form-group">
              <label htmlFor="priceTo" className="user-form-label">
                Price To
              </label>
              <select
                id="priceTo"
                name="priceTo"
                value={formData.priceTo}
                onChange={handleInputChange}
                className="user-form-input"
              >
                <option value="">Select ending price</option>
                <option value="2500">2,500</option>
                <option value="5000">5,000</option>
                <option value="7500">7,500</option>
                <option value="10000">10,000</option>
                <option value="15000">15,000</option>
                <option value="20000">20,000</option>
                <option value="25000">25,000</option>
                <option value="30000">30,000</option>
                <option value="50000">50,000</option>
                <option value="75000">75,000</option>
                <option value="100000">100,000</option>
              </select>
            </div>
          </div>

          <div className="user-form-group">
            <label htmlFor="salespersonName" className="user-form-label">
              Salesperson's Name
            </label>
            <input
              type="text"
              id="salespersonName"
              name="salespersonName"
              value={formData.salespersonName}
              onChange={handleInputChange}
              className="user-form-input"
              placeholder="Enter salesperson's name"
            />
          </div>

          <button 
            type="submit" 
            className="user-form-submit-button"
            disabled={isLoading}
          >
            {isLoading ? 'Generating PDF...' : 'Generate PDF Document'}
          </button>
        </form>

        {error && (
          <div className="error-section">
            <p className="error-message">❌ {error}</p>
          </div>
        )}

        <DownloadModal
          isOpen={showModal}
          onClose={handleCloseModal}
          downloadUrl={downloadUrl}
          documentData={formData}
          onDownload={handleDownload}
        />
      </div>
    </div>
  );
};

export default UserForm; 