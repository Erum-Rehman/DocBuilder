import React, { useState } from 'react';

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
  const [downloadUrl, setDownloadUrl] = useState('');

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
    setDownloadUrl('');
    
    try {
      const response = await fetch('http://localhost:5000/api/generate-document', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Document generated:', result);
        
        // Set download URL
        if (result.data && result.data.documentFile && result.data.documentFile.downloadUrl) {
          setDownloadUrl(`http://localhost:5000${result.data.documentFile.downloadUrl}`);
        }
      } else {
        console.error('Failed to generate document');
        alert('Failed to generate document. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error generating document. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="user-form-container">
      <div className="user-form-wrapper">
        <h2 className="user-form-title">Document Generator Form</h2>
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

        {downloadUrl && (
          <div className="download-section">
            <h3>PDF Generated Successfully!</h3>
            <a 
              href={downloadUrl} 
              download 
              className="download-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download PDF
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserForm; 