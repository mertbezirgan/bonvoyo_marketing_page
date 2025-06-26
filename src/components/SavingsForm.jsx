import { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '../utils/LanguageContext';
import translations from '../utils/translations';

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
  const { language } = useLanguage();
  const t = translations.form;

  // Validate that percentages sum to 100%
  useEffect(() => {
    const total = percentCar + percentPublic + percentOther;
    setTotalPercent(total);
    
    if (total !== 100) {
      setError(`${t.error[language]} ${total}%`);
    } else {
      setError('');
    }
  }, [percentCar, percentPublic, percentOther, language, t.error]);

  // Create a memoized form data object to prevent unnecessary updates
  const formData = useCallback(() => ({
    employees,
    percentCar,
    percentPublic,
    percentOther,
    budget
  }), [employees, budget, percentCar, percentPublic, percentOther]);

  // Separate effect to notify parent of form changes without causing infinite loop
  useEffect(() => {
    if (totalPercent === 100) {
      onFormChange(formData());
    }
  }, [totalPercent, onFormChange, formData]);

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
      <h2>{t.title[language]}</h2>
      
      <div className="benefits-banner">
        <div className="benefits-column">
          <h4>{t.forCompanies[language]}</h4>
          <ul>
            {t.companyBenefits[language].map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </div>
        <div className="benefits-column">
          <h4>{t.forEmployees[language]}</h4>
          <ul>
            {t.employeeBenefits[language].map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="employees">{t.employees[language]}</label>
        <input
          id="employees"
          type="number"
          min="1"
          value={employees}
          onChange={(e) => setEmployees(parseInt(e.target.value) || 0)}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="budget">{t.budget[language]}</label>
        <input
          id="budget"
          type="number"
          min="0"
          value={budget}
          onChange={(e) => setBudget(parseInt(e.target.value) || 0)}
        />
      </div>
      
      <h3>{t.transportation[language]}</h3>
      {error && <div className="error-message">{error}</div>}
      
      <div className="transportation-grid">
        <div className="transportation-item">
          <div className="transportation-icon car-icon">🚗</div>
          <label htmlFor="percentCar">{t.car[language]}</label>
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
          <label htmlFor="percentPublic">{t.publicTransport[language]}</label>
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
          <label htmlFor="percentOther">{t.other[language]}</label>
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
        <span>{t.total[language]}: {totalPercent}%</span>
        {totalPercent === 100 && 
          <span className="valid-total">✓</span>
        }
      </div>
      
      <button className="see-results-button" onClick={scrollToResults}>
        {t.seeResults[language]}
      </button>
    </div>
  );
};

export default SavingsForm; 