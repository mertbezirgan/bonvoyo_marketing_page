import { useState, useEffect, useRef } from 'react';

/**
 * Form component for collecting user inputs to calculate savings
 */
const SavingsForm = ({ onFormChange }) => {
  const [employees, setEmployees] = useState(100);
  const [percentCar, setPercentCar] = useState(70);
  const [percentPublic, setPercentPublic] = useState(25);
  const [percentOther, setPercentOther] = useState(5);
  const [budget, setBudget] = useState(150);
  const [error, setError] = useState('');
  const [totalPercent, setTotalPercent] = useState(100);
  const resultsSectionRef = useRef(null);

  // Validate that percentages sum to 100%
  useEffect(() => {
    const total = percentCar + percentPublic + percentOther;
    setTotalPercent(total);
    
    if (total !== 100) {
      setError(`Transportation percentages must sum to 100%. Current total: ${total}%`);
    } else {
      setError('');
    }
  }, [percentCar, percentPublic, percentOther]);

  // Separate effect to notify parent of form changes without causing infinite loop
  useEffect(() => {
    if (totalPercent === 100) {
      onFormChange({
        employees,
        percentCar,
        percentPublic,
        percentOther,
        budget
      });
    }
  }, [employees, budget, percentCar, percentPublic, percentOther, totalPercent, onFormChange]);

  // Handle change for percentages without auto-adjusting other values
  const handlePercentChange = (setter, value, field) => {
    const newValue = Math.min(100, Math.max(0, value));
    setter(newValue);
  };

  const scrollToResults = () => {
    // Find the report section by ID
    const reportSection = document.getElementById('results-section');
    if (reportSection) {
      reportSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="savings-form">
      <h2>Calculate Your Potential Savings with Bonvoyo</h2>
      
      <div className="benefits-banner">
        <div className="benefits-column">
          <h4>For Companies</h4>
          <ul>
            <li>Attract & retain top talent</li>
            <li>Reduce fleet management costs</li>
            <li>Automate tax-compliant billing</li>
          </ul>
        </div>
        <div className="benefits-column">
          <h4>For Employees</h4>
          <ul>
            <li>Flexible transport choices</li>
            <li>Tax-optimized benefit value</li>
            <li>Seamless booking experience</li>
          </ul>
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="employees">Number of Employees</label>
        <input
          id="employees"
          type="number"
          min="1"
          value={employees}
          onChange={(e) => setEmployees(parseInt(e.target.value) || 0)}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="budget">Monthly Budget per Employee (€)</label>
        <input
          id="budget"
          type="number"
          min="0"
          value={budget}
          onChange={(e) => setBudget(parseInt(e.target.value) || 0)}
        />
      </div>
      
      <h3>Transportation Distribution</h3>
      {error && <div className="error-message">{error}</div>}
      
      <div className="transportation-grid">
        <div className="transportation-item">
          <div className="transportation-icon car-icon">🚗</div>
          <label htmlFor="percentCar">Car (%)</label>
          <input
            id="percentCar"
            type="number"
            min="0"
            max="100"
            value={percentCar}
            onChange={(e) => handlePercentChange(setPercentCar, parseInt(e.target.value) || 0, 'car')}
          />
        </div>
        
        <div className="transportation-item">
          <div className="transportation-icon public-icon">🚆</div>
          <label htmlFor="percentPublic">Public Transport (%)</label>
          <input
            id="percentPublic"
            type="number"
            min="0"
            max="100"
            value={percentPublic}
            onChange={(e) => handlePercentChange(setPercentPublic, parseInt(e.target.value) || 0, 'public')}
          />
        </div>
        
        <div className="transportation-item">
          <div className="transportation-icon other-icon">🚲</div>
          <label htmlFor="percentOther">Other (%)</label>
          <input
            id="percentOther"
            type="number"
            min="0"
            max="100"
            value={percentOther}
            onChange={(e) => handlePercentChange(setPercentOther, parseInt(e.target.value) || 0, 'other')}
          />
        </div>
      </div>
      
      <div className={`total-percentage ${totalPercent !== 100 ? 'invalid-total' : ''}`}>
        <span>Total: {totalPercent}%</span>
        {totalPercent === 100 && 
          <span className="valid-total">✓</span>
        }
      </div>
      
      <button className="see-results-button" onClick={scrollToResults}>
        See Your Results
      </button>
    </div>
  );
};

export default SavingsForm; 