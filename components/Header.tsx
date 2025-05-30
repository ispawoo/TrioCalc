import React from 'react';
import { APP_TITLE, APP_TAGLINE, CALCULATOR_INFO } from '../constants';
import { Theme, CalculatorType, CalculatorInfo } from '../types';

interface HeaderProps {
  theme: Theme;
  toggleTheme: () => void;
  activeCalculator: CalculatorType;
  setActiveCalculator: (calculator: CalculatorType) => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, activeCalculator, setActiveCalculator }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="text-center sm:text-left mb-2 sm:mb-0">
            <h1 className="text-2xl font-bold text-primary-600 dark:text-primary-400 flex items-center">
              <i className="fas fa-calculator mr-2 text-xl"></i> {/* Generic Logo Icon */}
              {APP_TITLE}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">{APP_TAGLINE}</p>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label={theme === 'light' ? 'Switch to dark mode 🌞' : 'Switch to light mode 🌜'}
          >
            {theme === 'light' ? <i className="fas fa-moon text-xl text-primary-600"></i> : <i className="fas fa-sun text-xl text-yellow-400"></i>}
          </button>
        </div>
        <nav className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <ul className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-3"> {/* Adjusted gap for better spacing */}
            {CALCULATOR_INFO.map((calc: CalculatorInfo) => (
              <li key={calc.type}>
                <button
                  onClick={() => setActiveCalculator(calc.type)}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center space-x-2
                    ${activeCalculator === calc.type 
                      ? 'bg-primary-500 text-white shadow-md' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-gray-700 hover:shadow-sm'}`}
                  aria-current={activeCalculator === calc.type ? "page" : undefined}
                >
                  <i className={`${calc.icon} text-base w-4 text-center`}></i>
                  <span>{calc.displayName}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
