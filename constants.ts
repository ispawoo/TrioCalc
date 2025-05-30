import { CalculatorType, CalculatorInfo } from './types';

export const APP_TITLE = "Triocalc";
export const APP_TAGLINE = "Your Everyday Calculation Assistant 🧮";

export const CALCULATOR_INFO: CalculatorInfo[] = [
  { type: CalculatorType.LOAN_EMI, name: "🏦 Loan EMI Calculator", displayName: "Loan EMI", icon: "fas fa-coins" },
  { type: CalculatorType.BMI, name: "⚖️ BMI Calculator", displayName: "BMI", icon: "fas fa-weight" },
  { type: CalculatorType.PERCENTAGE, name: "➗ Percentage Calculator", displayName: "Percentage", icon: "fas fa-percentage" },
];

// Keep old export for compatibility if App.tsx still uses it for initial state, though it should use CALCULATOR_INFO[0].type
export const CALCULATORS: CalculatorType[] = CALCULATOR_INFO.map(c => c.type);


export const FOOTER_TEXT = "Designed with ❤️ by: Yasir Ispawoo";
export const AUTHOR_LINK = "https://instagram.com/the.ispawoo";

export const AD_PLACEHOLDER_TEXT = "Advertisement Space";