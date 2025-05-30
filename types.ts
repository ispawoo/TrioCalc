export enum CalculatorType {
  LOAN_EMI = 'Loan EMI Calculator',
  BMI = 'BMI Calculator',
  PERCENTAGE = 'Percentage Calculator',
}

export type Theme = 'light' | 'dark';

export enum BmiUnitSystem {
  METRIC = 'Metric (kg, cm)',
  IMPERIAL = 'Imperial (lbs, ft, in)',
}

export enum LoanTenureUnit {
  YEARS = 'Years',
  MONTHS = 'Months',
}

export interface CalculatorInfo {
  type: CalculatorType;
  name: string; // Full name for titles, e.g., "🏦 Loan EMI Calculator"
  displayName: string; // Shorter name for navigation, e.g., "Loan EMI"
  icon: string; // Font Awesome class, e.g., "fas fa-coins"
}
