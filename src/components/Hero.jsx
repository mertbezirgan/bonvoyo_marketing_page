import bonvoyoLogo from '../assets/Bonvoyo_Logo_weiß.png';
import smartphoneImage from '../assets/Hand_Smartphone.png';

/**
 * Hero section component with headline and CTA
 */
const Hero = ({ onCTAClick }) => {
  return (
    <div className="hero">
      <div className="hero-content">
        <img src={bonvoyoLogo} alt="Bonvoyo Logo" className="hero-logo" />
        <h1>The Complete Mobility Budget Solution</h1>
        <p className="hero-subtitle">
          Empower your employees with flexible transport choices while reducing costs, 
          administrative overhead, and environmental impact. Germany's only end-to-end 
          corporate mobility budget platform.
        </p>
        <button className="cta-button" onClick={onCTAClick}>
          Calculate Your Savings
        </button>
      </div>
      <div className="hero-image-container">
        <img src={smartphoneImage} alt="Bonvoyo App" className="hero-image" />
      </div>
    </div>
  );
};

export default Hero; 