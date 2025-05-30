import React from 'react';
import Card from '../ui/Card';

interface CalculatorWrapperProps {
  title: string;
  howToUse: React.ReactNode; // Can be string or JSX for richer content
  metaDescription: string;
  children: React.ReactNode; // The calculator form and results
}

const CalculatorWrapper: React.FC<CalculatorWrapperProps> = ({ title, howToUse, metaDescription, children }) => {
  return (
    <div className="space-y-8">
      <Card title={title}>
        {children}
      </Card>

      <Card title="How to Use This Tool">
        <div className="prose prose-sm dark:prose-invert max-w-none">
          {typeof howToUse === 'string' ? <p>{howToUse}</p> : howToUse}
        </div>
      </Card>
      
      <Card title="Meta Description">
        <p className="text-sm text-gray-600 dark:text-gray-400">{metaDescription}</p>
      </Card>
    </div>
  );
};

export default CalculatorWrapper;
