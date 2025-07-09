import { 
  HOURS_SAVED_PER_INVOICE, 
  BASELINE_CAR_CO2, 
  CO2_PER_PUBLIC_TRIP, 
  CO2_PER_OTHER_TRIP, 
  TRIPS_PER_QUARTER 
} from '../utils/constants';
import bonvoyoLogo from '../assets/Bonvoyo_Logo.png';
import { useLanguage } from '../utils/LanguageContext';
import translations from '../utils/translations';

/**
 * Component to display calculated savings based on form inputs
 */
const Report = ({ formData, onContactClick }) => {
  const { employees, percentCar, percentPublic, percentOther, budget } = formData;
  const { language } = useLanguage();
  const t = translations.report;
  
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
      <h2>{t.title[language]}</h2>
      
      <div className="report-card">
        <div className="report-item">
          <h3>{t.invoices[language]}</h3>
          <p className="report-value">{invoicesPerQuarter.toLocaleString()}</p>
          <p className="report-description">{t.invoicesDesc[language]}</p>
        </div>
        
        <div className="report-item">
          <h3>{t.time[language]}</h3>
          <p className="report-value">{timeSaved.toLocaleString(undefined, { maximumFractionDigits: 1 })}</p>
          <p className="report-description">{t.timeDesc[language]}</p>
        </div>
        
        <div className="report-item">
          <h3>{t.co2[language]}</h3>
          <p className="report-value">
            {(co2Reduction / 1000).toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </p>
          <p className="report-description">{t.co2Desc[language]}</p>
        </div>
        
        <div className="report-item">
          <h3>{t.budget[language]}</h3>
          <p className="report-value">€{quarterlyBudget.toLocaleString()}</p>
          <p className="report-description">{t.budgetDesc[language]}</p>
        </div>
      </div>
      
      <div className="report-contact-button-container">
        <button className="report-contact-button" onClick={onContactClick}>
          {translations.hero.contactButton[language]}
        </button>
      </div>
      
      <div className="report-summary">
        <p>
          {t.summary[language]}{' '}
          <strong>{co2ReductionPercentage.toFixed(1)}%</strong>{' '}
          {t.summaryEnd[language]}
        </p>
      </div>
      
      <div className="bonvoyo-promo">
        <img src={bonvoyoLogo} alt="Bonvoyo Logo" className="bonvoyo-promo-image" />
        <div className="bonvoyo-promo-text">
          <h3>{t.whyBonvoyo[language]}</h3>
          <div className="feature-list">
            {t.features[language].map((feature, index) => (
              <div className="feature-item" key={index}>
                <span className="feature-icon">✓</span>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report; 