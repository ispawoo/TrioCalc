import React, { useState, useEffect, useMemo } from 'react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import CalculatorWrapper from './CalculatorWrapper';
import { LoanTenureUnit, CalculatorType } from '../../types';
import { CALCULATOR_INFO } from '../../constants';

const LoanEMICalculator: React.FC = () => {
  const [principal, setPrincipal] = useState<string>('100000');
  const [annualRate, setAnnualRate] = useState<string>('10');
  const [tenure, setTenure] = useState<string>('5');
  const [tenureUnit, setTenureUnit] = useState<LoanTenureUnit>(LoanTenureUnit.YEARS);
  
  const [emi, setEmi] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);
  const [totalPayment, setTotalPayment] = useState<number | null>(null);

  const [principalError, setPrincipalError] = useState<string>('');
  const [rateError, setRateError] = useState<string>('');
  const [tenureError, setTenureError] = useState<string>('');

  const calculatorDetails = useMemo(() => CALCULATOR_INFO.find(c => c.type === CalculatorType.LOAN_EMI), []);
  const title = calculatorDetails?.name || "Loan EMI Calculator";

  const validateInputs = (): boolean => {
    let isValid = true;
    const p = parseFloat(principal);
    const r = parseFloat(annualRate);
    const t = parseFloat(tenure);

    if (isNaN(p) || p <= 0) {
      setPrincipalError('Principal must be a positive number.');
      isValid = false;
    } else {
      setPrincipalError('');
    }

    if (isNaN(r) || r <= 0) {
      setRateError('Interest rate must be a positive number.');
      isValid = false;
    } else {
      setRateError('');
    }
    
    if (isNaN(t) || t <= 0) {
      setTenureError('Tenure must be a positive number.');
      isValid = false;
    } else {
      setTenureError('');
    }
    return isValid;
  };
  
  const calculateEMI = () => {
    if (!validateInputs()) {
      setEmi(null);
      setTotalInterest(null);
      setTotalPayment(null);
      return;
    }

    const pFloat = parseFloat(principal);
    const annualRateFloat = parseFloat(annualRate);
    const tenureFloat = parseFloat(tenure);

    const monthlyRate = annualRateFloat / (12 * 100);
    const numberOfMonths = tenureUnit === LoanTenureUnit.YEARS ? tenureFloat * 12 : tenureFloat;

    if (monthlyRate === 0) { 
        const calculatedEmi = pFloat / numberOfMonths;
        setEmi(calculatedEmi);
        setTotalInterest(0);
        setTotalPayment(pFloat);
        return;
    }

    const emiCalc = (pFloat * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) / (Math.pow(1 + monthlyRate, numberOfMonths) - 1);
    
    if (isFinite(emiCalc) && numberOfMonths > 0) {
      const totalPaid = emiCalc * numberOfMonths;
      setEmi(emiCalc);
      setTotalInterest(totalPaid - pFloat);
      setTotalPayment(totalPaid);
    } else {
      setEmi(null);
      setTotalInterest(null);
      setTotalPayment(null);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(calculateEMI, [principal, annualRate, tenure, tenureUnit]);


  const tenureOptions = useMemo(() => [
    { value: LoanTenureUnit.YEARS, label: 'Years' },
    { value: LoanTenureUnit.MONTHS, label: 'Months' },
  ],[]);

  const howToUse = (
    <>
      <p>The Loan EMI (Equated Monthly Installment) Calculator helps you determine the monthly payment for a loan. 💰</p>
      <ol className="list-decimal list-inside mt-2 space-y-1">
        <li>➡️ Enter the total loan amount (Principal).</li>
        <li>📈 Enter the annual interest rate (%).</li>
        <li>🗓️ Enter the loan tenure (duration) and select whether it's in years or months.</li>
        <li>✅ The calculator will display your monthly EMI, total interest payable, and total amount you'll pay over the loan tenure.</li>
      </ol>
    </>
  );

  const metaDescription = "Calculate your Equated Monthly Installment (EMI) for home loans, car loans, or personal loans. Enter principal, interest rate, and tenure to get your monthly payment, total interest, and total payment.";

  return (
    <CalculatorWrapper title={title} howToUse={howToUse} metaDescription={metaDescription}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Input
            label="Principal Loan Amount"
            id="principal"
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            error={principalError}
            placeholder="e.g., 100000"
            unit="💲" // Using emoji for currency symbol
          />
          <Input
            label="Annual Interest Rate (%)"
            id="annualRate"
            type="number"
            value={annualRate}
            onChange={(e) => setAnnualRate(e.target.value)}
            error={rateError}
            placeholder="e.g., 10"
            unit="%"
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Loan Tenure"
              id="tenure"
              type="number"
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
              error={tenureError}
              placeholder="e.g., 5"
            />
            <Select
              label="Tenure Unit"
              id="tenureUnit"
              options={tenureOptions}
              value={tenureUnit}
              onChange={(e) => setTenureUnit(e.target.value as LoanTenureUnit)}
            />
          </div>
           <Button onClick={calculateEMI} className="w-full mt-4" size="lg">
            <i className="fas fa-calculator mr-2"></i> Calculate EMI
          </Button>
        </div>
        
        {emi !== null && totalInterest !== null && totalPayment !== null && (
          <div className="bg-primary-50 dark:bg-gray-700 p-6 rounded-lg space-y-3 flex flex-col justify-center animate-fade-in">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3 text-center">📊 Loan Summary</h3>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Monthly EMI</p>
              <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                💲{emi.toFixed(2)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Interest Payable</p>
              <p className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
                💲{totalInterest.toFixed(2)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Payment (Principal + Interest)</p>
              <p className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
                💲{totalPayment.toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </div>
    </CalculatorWrapper>
  );
};

export default LoanEMICalculator;
