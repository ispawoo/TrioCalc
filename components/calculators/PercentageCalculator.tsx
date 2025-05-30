import React, { useState, useEffect, useMemo } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import CalculatorWrapper from './CalculatorWrapper';
import { CalculatorType } from '../../types';
import { CALCULATOR_INFO } from '../../constants';

const PercentageCalculator: React.FC = () => {
  const [percentage, setPercentage] = useState<string>('10');
  const [value, setValue] = useState<string>('100');
  const [result, setResult] = useState<number | null>(null);

  const [percentageError, setPercentageError] = useState<string>('');
  const [valueError, setValueError] = useState<string>('');
  
  const calculatorDetails = useMemo(() => CALCULATOR_INFO.find(c => c.type === CalculatorType.PERCENTAGE), []);
  const title = calculatorDetails?.name || "Percentage Calculator";


  const validateInputs = (): boolean => {
    let isValid = true;
    const p = parseFloat(percentage);
    const v = parseFloat(value);

    // Allow 0 and negative numbers for both percentage and value
    if (isNaN(p)) { 
      setPercentageError('Percentage must be a valid number.');
      isValid = false;
    } else {
      setPercentageError('');
    }

    if (isNaN(v)) { 
      setValueError('Value must be a valid number.');
      isValid = false;
    } else {
      setValueError('');
    }
    return isValid;
  };

  const calculatePercentage = () => {
    if (!validateInputs()) {
      setResult(null);
      return;
    }
    const percentageFloat = parseFloat(percentage);
    const valueFloat = parseFloat(value);
    const calculatedResult = (percentageFloat / 100) * valueFloat;

    if(isFinite(calculatedResult)) {
        setResult(calculatedResult);
    } else {
        setResult(null); // Should not happen with isNaN checks, but good practice
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(calculatePercentage, [percentage, value]);

  const howToUse = (
    <>
      <p>This Percentage Calculator helps you find 'What is X% of Y?'. 🎯</p>
      <ol className="list-decimal list-inside mt-2 space-y-1">
        <li>1️⃣ Enter the percentage you want to find (X).</li>
        <li>2️⃣ Enter the value from which you want to calculate the percentage (Y).</li>
        <li>✅ The calculator will display the result.</li>
      </ol>
      <p className="mt-2">💡 Example: To find 20% of 150, enter 20 for X and 150 for Y. The result will be 30.</p>
    </>
  );
  const metaDescription = "Calculate percentages easily. Find 'X% of Y' with this simple online percentage calculator. Useful for various math and daily life calculations.";

  return (
    <CalculatorWrapper title={title} howToUse={howToUse} metaDescription={metaDescription}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div>
          <Input
            label="Percentage (X)" // Removed % from label, unit prop handles it
            id="percentage"
            type="number"
            value={percentage}
            onChange={(e) => setPercentage(e.target.value)}
            error={percentageError}
            placeholder="e.g., 25"
            unit="%"
          />
          <Input
            label="Value (Y)"
            id="value"
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            error={valueError}
            placeholder="e.g., 200"
          />
          <Button onClick={calculatePercentage} className="w-full mt-4" size="lg">
            <i className="fas fa-calculator mr-2"></i> Calculate
          </Button>
        </div>
        
        {result !== null && (
          <div className="bg-primary-50 dark:bg-gray-700 p-6 rounded-lg text-center animate-fade-in">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">🎉 Result 🎉</h3>
            <p className="text-4xl font-bold text-primary-600 dark:text-primary-400">
              {result.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 5 })} 
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              ({percentage}% of {value} is {result.toLocaleString(undefined, {  minimumFractionDigits: 0, maximumFractionDigits: 5 })})
            </p>
          </div>
        )}
        {result === null && (percentage || value) && (percentageError || valueError) && (
            <div className="bg-red-50 dark:bg-red-900/50 p-6 rounded-lg flex flex-col justify-center items-center text-center animate-fade-in">
                 <i className="fas fa-exclamation-triangle text-red-500 text-3xl mb-2"></i>
                <p className="text-red-700 dark:text-red-300">Please correct the input errors.</p>
            </div>
        )}
      </div>
    </CalculatorWrapper>
  );
};

export default PercentageCalculator;
