import React, { useState } from 'react';

const UserForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    date: '',
    price: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you can add your form submission logic
  };

  return (
    <div className="user-form-container">
      <div className="user-form-wrapper">
        <h2 className="user-form-title">User Information Form</h2>
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

          <div className="user-form-group">
            <label htmlFor="price" className="user-form-label">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="user-form-input"
              placeholder="Enter price"
              min="0"
              step="0.01"
              required
            />
          </div>

          <button type="submit" className="user-form-submit-button">
            Submit Form
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserForm; 