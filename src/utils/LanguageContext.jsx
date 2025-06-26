import { createContext, useState, useContext, useEffect } from 'react';

// Create language context
export const LanguageContext = createContext();

// Language provider component
export const LanguageProvider = ({ children }) => {
  // Get saved language from localStorage or default to German
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('bonvoyo-language');
    return savedLanguage || 'de';
  });

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('bonvoyo-language', language);
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  // Toggle between German and English
  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'de' ? 'en' : 'de');
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 