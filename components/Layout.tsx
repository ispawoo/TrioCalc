import React from 'react';
import Header from './Header';
import Footer from './Footer';
import AdPlaceholder from './AdPlaceholder';
import { Theme, CalculatorType } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  theme: Theme;
  toggleTheme: () => void;
  activeCalculator: CalculatorType;
  setActiveCalculator: (calculator: CalculatorType) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, theme, toggleTheme, activeCalculator, setActiveCalculator }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        theme={theme} 
        toggleTheme={toggleTheme} 
        activeCalculator={activeCalculator}
        setActiveCalculator={setActiveCalculator}
      />
      
      <AdPlaceholder position="Top Banner" className="w-full h-24 md:h-32" />

      <div className="flex-grow w-full max-w-screen-xl mx-auto px-2 sm:px-4 py-4 md:py-6">
        <div className="md:grid md:grid-cols-[auto_1fr_auto] md:gap-4 lg:gap-6">
          <AdPlaceholder position="Left Sidebar" className="hidden md:block w-40 lg:w-52 h-96 md:h-[600px] sticky top-24" />
          
          <main className="flex-grow min-w-0"> {/* min-w-0 is important for flex/grid children */}
            {children}
          </main>
          
          <AdPlaceholder position="Right Sidebar" className="hidden md:block w-40 lg:w-52 h-96 md:h-[600px] sticky top-24" />
        </div>
      </div>
      
      <AdPlaceholder position="Bottom Banner" className="w-full h-24 md:h-32 mt-auto" />
      <Footer />
    </div>
  );
};

export default Layout;
