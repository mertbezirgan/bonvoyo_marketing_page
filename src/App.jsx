import { useState, useRef, useCallback } from 'react';
import Hero from './components/Hero';
import SavingsForm from './components/SavingsForm';
import Report from './components/Report';
import LanguageSwitcher from './components/LanguageSwitcher';
import { useLanguage } from './utils/LanguageContext';
import translations from './utils/translations';
import './styles/components.css';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    employees: 100,
    percentCar: 70,
    percentPublic: 25,
    percentOther: 5,
    budget: 150
  });
  
  const calculatorRef = useRef(null);
  const { language } = useLanguage();
  
  const handleFormChange = useCallback((data) => {
    setFormData(data);
  }, []);
  
  const scrollToCalculator = () => {
    calculatorRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="app">
      <div className="language-switcher-container">
        <LanguageSwitcher />
      </div>
      <Hero onCTAClick={scrollToCalculator} />
      
      <div className="container">
        <div className="calculator-section" ref={calculatorRef}>
          <div className="two-column-layout">
            <SavingsForm onFormChange={handleFormChange} />
            <Report formData={formData} />
          </div>
        </div>
        
        <footer className="footer">
          <p>© {new Date().getFullYear()} {translations.footer.copyright[language]}</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
