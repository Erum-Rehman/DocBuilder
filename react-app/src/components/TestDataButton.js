import React from 'react';
import { DEFAULT_TEST_DATA } from '../utils/constants';

const TestDataButton = ({ onFillForm }) => {
  const handleTestData = () => {
    onFillForm(DEFAULT_TEST_DATA);
  };

  return (
    <button 
      type="button" 
      onClick={handleTestData}
      className="test-data-button"
      title="Fill form with test data"
    >
      🧪 Fill Test Data
    </button>
  );
};

export default TestDataButton;