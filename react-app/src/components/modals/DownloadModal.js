import React from 'react';
import './DownloadModal.css';

const DownloadModal = ({ 
  isOpen, 
  onClose, 
  downloadUrl, 
  documentData, 
  onDownload 
}) => {
  if (!isOpen) return null;

  const handleDownload = () => {
    onDownload();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>✅ Document Generated Successfully!</h2>
          <button className="close-button" onClick={onClose}>
            ✕
          </button>
        </div>
        
        <div className="modal-body">
          <div className="success-message">
            <div className="success-icon">📄</div>
            <p>Your PDF document has been generated and is ready for download.</p>
          </div>

          {documentData && (
            <div className="document-details">
              <h3>Document Details:</h3>
              <div className="details-grid">
                <div className="detail-item">
                  <strong>Full Name:</strong> {documentData.fullName}
                </div>
                <div className="detail-item">
                  <strong>Address:</strong> {documentData.address}
                </div>
                <div className="detail-item">
                  <strong>Date:</strong> {documentData.date}
                </div>
                <div className="detail-item">
                  <strong>Price Range:</strong> ${documentData.priceFrom} - ${documentData.priceTo}
                </div>
                {documentData.salespersonName && (
                  <div className="detail-item">
                    <strong>Salesperson:</strong> {documentData.salespersonName}
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="download-section">
            <p className="download-info">
              Click the button below to download your document:
            </p>
            <button 
              className="download-btn"
              onClick={handleDownload}
            >
              📥 Download Document
            </button>
          </div>

          <div className="download-url-section">
            <label>Direct Download URL:</label>
            <div className="url-container">
              <input 
                type="text" 
                value={downloadUrl} 
                readOnly 
                className="url-input"
              />
              <button 
                className="copy-btn"
                onClick={() => navigator.clipboard.writeText(downloadUrl)}
              >
                📋 Copy
              </button>
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="close-modal-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadModal;