import { 
  HOURS_SAVED_PER_INVOICE, 
  BASELINE_CAR_CO2, 
  CO2_PER_PUBLIC_TRIP, 
  CO2_PER_OTHER_TRIP, 
  TRIPS_PER_QUARTER 
} from '../utils/constants';
import bonvoyoLogo from '../assets/Bonvoyo_Logo.png';

/**
 * Component to display calculated savings based on form inputs
 */
const Report = ({ formData }) => {
  const { employees, percentCar, percentPublic, percentOther, budget } = formData;
  
  // Calculate invoices per quarter (3 per employee)
  const invoicesPerQuarter = employees * 3;
  
  // Calculate employee time saved
  const timeSaved = invoicesPerQuarter * HOURS_SAVED_PER_INVOICE;
  
  // Calculate CO₂ reduction
  const co2Reduction = 
    employees * (percentPublic / 100) * CO2_PER_PUBLIC_TRIP * TRIPS_PER_QUARTER +
    employees * (percentOther / 100) * CO2_PER_OTHER_TRIP * TRIPS_PER_QUARTER;
  
  // Calculate baseline CO₂ emissions (if everyone drove)
  const baselineCO2 = employees * BASELINE_CAR_CO2 * TRIPS_PER_QUARTER;
  
  // Calculate CO₂ reduction percentage
  const co2ReductionPercentage = (co2Reduction / baselineCO2) * 100;
  
  // Calculate quarterly budget
  const quarterlyBudget = employees * budget * 3;
  
  return (
    <div className="report" id="results-section">
      <h2>Your Quarterly Savings with Bonvoyo</h2>
      
      <div className="report-card">
        <div className="report-item">
          <h3>Invoices Processed</h3>
          <p className="report-value">{invoicesPerQuarter.toLocaleString()}</p>
          <p className="report-description">automated & tax-optimized</p>
        </div>
        
        <div className="report-item">
          <h3>Time Saved</h3>
          <p className="report-value">{timeSaved.toLocaleString(undefined, { maximumFractionDigits: 1 })}</p>
          <p className="report-description">HR administrative hours</p>
        </div>
        
        <div className="report-item">
          <h3>CO₂ Reduction</h3>
          <p className="report-value">
            {(co2Reduction / 1000).toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </p>
          <p className="report-description">kg CO₂-eq for ESG reporting</p>
        </div>
        
        <div className="report-item">
          <h3>Budget Optimization</h3>
          <p className="report-value">€{quarterlyBudget.toLocaleString()}</p>
          <p className="report-description">tax-optimized mobility spend</p>
        </div>
      </div>
      
      <div className="report-summary">
        <p>
          By implementing Bonvoyo's mobility budget solution, you're reducing CO₂ emissions by approximately{' '}
          <strong>{co2ReductionPercentage.toFixed(1)}%</strong> while offering your employees flexible transport choices.
        </p>
      </div>
      
      <div className="bonvoyo-promo">
        <img src={bonvoyoLogo} alt="Bonvoyo Logo" className="bonvoyo-promo-image" />
        <div className="bonvoyo-promo-text">
          <h3>Why Choose Bonvoyo?</h3>
          <div className="feature-list">
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Complete end-to-end mobility budget management</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Seamless integration with DB Navigator and partner apps</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>GoBD-compliant & GDPR-secure data handling</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Automated tax optimization for maximum employee value</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report; 