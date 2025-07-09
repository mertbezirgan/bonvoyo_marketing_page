import bonvoyoLogo from '../assets/Bonvoyo_Logo_weiß.png';
import smartphoneImage from '../assets/Hand_Smartphone.png';
import { useLanguage } from '../utils/LanguageContext';
import translations from '../utils/translations';

/**
 * Hero section component with headline and CTA
 */
const Hero = ({ onCTAClick, onContactClick }) => {
  const { language } = useLanguage();
  const t = translations.hero;

  return (
    <div className="hero">
      <div className="hero-content">
        <img src={bonvoyoLogo} alt="Bonvoyo Logo" className="hero-logo" />
        <h1>{t.title[language]}</h1>
        <p className="hero-subtitle">
          {t.subtitle[language]}
        </p>
        <div className="hero-buttons">
          <button className="cta-button" onClick={onCTAClick}>
            {t.cta[language]}
          </button>
          <button className="contact-button" onClick={onContactClick}>
            {t.contactButton[language]}
          </button>
        </div>
      </div>
      <div className="hero-image-container">
        <img src={smartphoneImage} alt="Bonvoyo App" className="hero-image" />
      </div>
    </div>
  );
};

export default Hero; 