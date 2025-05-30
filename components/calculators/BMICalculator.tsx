import React, { useState, useEffect, useMemo } from 'react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import CalculatorWrapper from './CalculatorWrapper';
import { BmiUnitSystem, CalculatorType } from '../../types';
import { CALCULATOR_INFO } from '../../constants';

interface BmiCategoryDetails {
    text: string;
    emoji: string;
    colorClasses: string;
}

const BMICalculator: React.FC = () => {
  const [unitSystem, setUnitSystem] = useState<BmiUnitSystem>(BmiUnitSystem.METRIC);
  const [weight, setWeight] = useState<string>('');
  const [heightCm, setHeightCm] = useState<string>('');
  const [heightFt, setHeightFt] = useState<string>('');
  const [heightIn, setHeightIn] = useState<string>('');

  const [bmi, setBmi] = useState<number | null>(null);
  const [bmiCategoryDetails, setBmiCategoryDetails] = useState<BmiCategoryDetails | null>(null);

  const [weightError, setWeightError] = useState<string>('');
  const [heightError, setHeightError] = useState<string>('');

  const calculatorDetails = useMemo(() => CALCULATOR_INFO.find(c => c.type === CalculatorType.BMI), []);
  const title = calculatorDetails?.name || "BMI Calculator";

  const validateInputs = (): boolean => {
    let isValid = true;
    const w = parseFloat(weight);

    if (isNaN(w) || w <= 0) {
      setWeightError('Weight must be a positive number.');
      isValid = false;
    } else {
      setWeightError('');
    }

    if (unitSystem === BmiUnitSystem.METRIC) {
      const hCm = parseFloat(heightCm);
      if (isNaN(hCm) || hCm <= 0) {
        setHeightError('Height must be a positive number.');
        isValid = false;
      } else {
        setHeightError('');
      }
    } else { // Imperial
      const hFt = parseFloat(heightFt);
      const hIn = parseFloat(heightIn);
      // Height in inches can be 0 if feet is specified, and vice-versa, but not both 0.
      if ((isNaN(hFt) || hFt < 0) || (isNaN(hIn) || hIn < 0) || ( (hFt <= 0 && hIn <= 0) && (hFt+hIn <=0) )) {
         setHeightError('Valid height (ft and/or in) required.');
         isValid = false;
      } else {
        setHeightError('');
      }
    }
    return isValid;
  };

  const calculateBMI = () => {
    if (!validateInputs()) {
      setBmi(null);
      setBmiCategoryDetails(null);
      return;
    }

    const weightInput = parseFloat(weight); // This is either kg or lbs based on unitSystem
    let heightMeters: number;
    let weightForCalcKg: number;


    if (unitSystem === BmiUnitSystem.METRIC) {
      heightMeters = parseFloat(heightCm) / 100;
      weightForCalcKg = weightInput; // weight is already in kg
    } else { // Imperial
      const ft = parseFloat(heightFt) || 0; // default to 0 if NaN
      const inch = parseFloat(heightIn) || 0; // default to 0 if NaN
      const totalInches = (ft * 12) + inch;
      heightMeters = totalInches * 0.0254; // Convert inches to meters
      weightForCalcKg = weightInput * 0.453592; // Convert lbs to kg
    }

    if (heightMeters <= 0 || weightForCalcKg <=0) { // also check weightForCalcKg
        setBmi(null);
        setBmiCategoryDetails({ text: 'Invalid input', emoji: '⚠️', colorClasses: 'bg-gray-200 text-gray-800'});
        return;
    }
    
    const bmiResult = weightForCalcKg / (heightMeters * heightMeters);

    if(isFinite(bmiResult)) {
        setBmi(bmiResult);
        if (bmiResult < 18.5) setBmiCategoryDetails({text: 'Underweight', emoji: '😥', colorClasses: 'bg-blue-200 text-blue-800 dark:bg-blue-700 dark:text-blue-100'});
        else if (bmiResult < 24.9) setBmiCategoryDetails({text: 'Normal weight', emoji: '😊', colorClasses: 'bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-100'});
        else if (bmiResult < 29.9) setBmiCategoryDetails({text: 'Overweight', emoji: '😟', colorClasses: 'bg-yellow-200 text-yellow-800 dark:bg-yellow-600 dark:text-yellow-100'});
        else setBmiCategoryDetails({text: 'Obesity', emoji: '😲', colorClasses: 'bg-red-200 text-red-800 dark:bg-red-700 dark:text-red-100'});
    } else {
        setBmi(null);
        setBmiCategoryDetails(null);
    }
  };
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(calculateBMI, [weight, heightCm, heightFt, heightIn, unitSystem]);


  const unitSystemOptions = useMemo(() => [
    { value: BmiUnitSystem.METRIC, label: 'Metric (kg, cm)' },
    { value: BmiUnitSystem.IMPERIAL, label: 'Imperial (lbs, ft, in)' },
  ],[]);

  const howToUse = (
    <>
      <p>The BMI (Body Mass Index) Calculator estimates your body fat based on your weight and height.🧍‍♀️🧍‍♂️</p>
      <ol className="list-decimal list-inside mt-2 space-y-1">
        <li> wybrać Select your preferred unit system (Metric or Imperial).</li>
        <li>⚖️ Enter your weight.</li>
        <li>📏 Enter your height.
          <ul className="list-disc list-inside ml-4">
            <li>For Metric: Enter height in centimeters (cm).</li>
            <li>For Imperial: Enter height in feet (ft) and inches (in).</li>
          </ul>
        </li>
        <li>✅ The calculator will display your BMI value and the corresponding BMI category.</li>
      </ol>
    </>
  );
  const metaDescription = "Calculate your Body Mass Index (BMI) quickly and easily. Supports both metric (kg, cm) and imperial (lbs, ft, in) units. Find out if you are underweight, normal weight, overweight, or obese.";

  return (
    <CalculatorWrapper title={title} howToUse={howToUse} metaDescription={metaDescription}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Select
            label="Unit System"
            id="unitSystem"
            options={unitSystemOptions}
            value={unitSystem}
            onChange={(e) => {
              setUnitSystem(e.target.value as BmiUnitSystem);
              setWeightError(''); setHeightError(''); setBmi(null); setBmiCategoryDetails(null);
              // Clear values when switching systems to avoid confusion
              setWeight(''); setHeightCm(''); setHeightFt(''); setHeightIn('');
            }}
            containerClassName="mb-6"
          />
          <Input
            label={`Weight (${unitSystem === BmiUnitSystem.METRIC ? 'kg' : 'lbs'})`}
            id="weight"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            error={weightError}
            placeholder={unitSystem === BmiUnitSystem.METRIC ? 'e.g., 70' : 'e.g., 150'}
            unit={unitSystem === BmiUnitSystem.METRIC ? 'kg' : 'lbs'}
          />
          {unitSystem === BmiUnitSystem.METRIC ? (
            <Input
              label="Height (cm)"
              id="heightCm"
              type="number"
              value={heightCm}
              onChange={(e) => setHeightCm(e.target.value)}
              error={heightError}
              placeholder="e.g., 175"
              unit="cm"
            />
          ) : (
            <>
            <div className={`grid grid-cols-2 gap-4 ${heightError ? 'mb-0' : 'mb-4'}`}> {/* Adjust margin if error is present */}
              <Input
                label="Height (ft)"
                id="heightFt"
                type="number"
                value={heightFt}
                onChange={(e) => setHeightFt(e.target.value)}
                placeholder="e.g., 5"
                unit="ft"
                containerClassName="mb-0" // Remove default bottom margin from Input
              />
              <Input
                label="Height (in)"
                id="heightIn"
                type="number"
                value={heightIn}
                onChange={(e) => setHeightIn(e.target.value)}
                placeholder="e.g., 9"
                unit="in"
                containerClassName="mb-0" // Remove default bottom margin from Input
              />
            </div>
            {heightError && <p className="mt-1 text-xs text-red-500">{heightError}</p>}
            </>
          )}
          <Button onClick={calculateBMI} className="w-full mt-4" size="lg">
             <i className="fas fa-calculator mr-2"></i> Calculate BMI
          </Button>
        </div>

        {bmi !== null && bmiCategoryDetails && (
          <div className="bg-primary-50 dark:bg-gray-700 p-6 rounded-lg flex flex-col justify-center items-center text-center animate-fade-in">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Your BMI Result</h3>
            <p className="text-5xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              {bmi.toFixed(1)}
            </p>
            <div className={`text-xl font-semibold px-4 py-2 rounded-full flex items-center space-x-2 ${bmiCategoryDetails.colorClasses}`}>
              <span className="text-2xl">{bmiCategoryDetails.emoji}</span>
              <span>{bmiCategoryDetails.text}</span>
            </div>
            <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                BMI Categories: &lt;18.5 Underweight, 18.5-24.9 Normal, 25-29.9 Overweight, &ge;30 Obesity.
            </p>
          </div>
        )}
         {bmi === null && (weight || heightCm || heightFt || heightIn) && (weightError || heightError) && !bmiCategoryDetails && (
            <div className="bg-red-50 dark:bg-red-900/50 p-6 rounded-lg flex flex-col justify-center items-center text-center animate-fade-in">
                 <i className="fas fa-exclamation-triangle text-red-500 text-3xl mb-2"></i>
                <p className="text-red-700 dark:text-red-300">Please correct the input errors to calculate BMI.</p>
            </div>
        )}

      </div>
    </CalculatorWrapper>
  );
};

export default BMICalculator;
