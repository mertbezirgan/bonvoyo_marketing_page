import { useState } from 'react';
import { useLanguage } from '../utils/LanguageContext';
import translations from '../utils/translations';

/**
 * Contact form component
 */
const ContactForm = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const { language } = useLanguage();
  const t = translations.contact;

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email || !validateEmail(email)) {
      setIsValid(false);
      return;
    }
    
    setIsValid(true);
    setSubmitted(true);
    
    // Reset form after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
      setEmail('');
    }, 5000);
  };

  return (
    <div className="contact-section" id="contact-section">
      <div className="contact-content">
        <h2>{t.title[language]}</h2>
        <p className="slogan">{t.slogan[language]}</p>
        <p className="contact-subtitle">{t.subtitle[language]}</p>
        
        {!submitted ? (
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">{t.emailLabel[language]}</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setIsValid(true);
                }}
                className={!isValid ? 'invalid' : ''}
                placeholder={t.emailPlaceholder[language]}
              />
              {!isValid && <p className="error-message">{t.emailError[language]}</p>}
            </div>
            <button type="submit" className="submit-button">
              {t.submitButton[language]}
            </button>
          </form>
        ) : (
          <div className="submission-success">
            <div className="success-icon">✓</div>
            <h3>{t.thankYou[language]}</h3>
            <p>{t.confirmation[language]}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactForm; 