import { useLanguage } from '../utils/LanguageContext';
import translations from '../utils/translations';

/**
 * Language switcher component
 */
const LanguageSwitcher = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button 
      className="language-switcher" 
      onClick={toggleLanguage}
      aria-label={`Switch to ${language === 'de' ? 'English' : 'German'}`}
    >
      <span className="language-label">{language === 'de' ? 'EN' : 'DE'}</span>
    </button>
  );
};

export default LanguageSwitcher; 