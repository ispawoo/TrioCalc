import React, { useState, useEffect, useCallback } from 'react';
import { Theme, CalculatorType } from './types';
import { CALCULATOR_INFO } from './constants';
import Layout from './components/Layout';
import LoanEMICalculator from './components/calculators/LoanEMICalculator';
import BMICalculator from './components/calculators/BMICalculator';
import PercentageCalculator from './components/calculators/PercentageCalculator';

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) return savedTheme;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  const [activeCalculator, setActiveCalculator] = useState<CalculatorType>(CALCULATOR_INFO[0].type);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  const renderCalculator = () => {
    switch (activeCalculator) {
      case CalculatorType.LOAN_EMI:
        return <LoanEMICalculator />;
      case CalculatorType.BMI:
        return <BMICalculator />;
      case CalculatorType.PERCENTAGE:
        return <PercentageCalculator />;
      default:
        // Should not happen if activeCalculator is always a valid type
        return <LoanEMICalculator />; 
    }
  };

  return (
    <Layout
      theme={theme}
      toggleTheme={toggleTheme}
      activeCalculator={activeCalculator}
      setActiveCalculator={setActiveCalculator}
    >
      <div className="animate-fade-in">
        {renderCalculator()}
      </div>
    </Layout>
  );
};

export default App;
