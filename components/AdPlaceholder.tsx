import React from 'react';
import { AD_PLACEHOLDER_TEXT } from '../constants';

interface AdPlaceholderProps {
  position: string;
  className?: string;
}

const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ position, className }) => {
  let dimensionsText = "";
  if (position.toLowerCase().includes("banner")) {
    dimensionsText = "e.g., 728x90 or responsive";
  } else if (position.toLowerCase().includes("sidebar")) {
    dimensionsText = "e.g., 160x600 / 300x250";
  }

  return (
    <aside
      className={`bg-gray-200 dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600 
                  flex items-center justify-center text-gray-500 dark:text-gray-400 p-4 ${className || ''}`}
      aria-label={`Advertisement placeholder: ${position}`}
    >
      <div className="text-center">
        <p className="font-semibold text-lg">{AD_PLACEHOLDER_TEXT}</p>
        <p className="text-sm capitalize">{position}</p>
        {dimensionsText && <p className="text-xs mt-1">({dimensionsText})</p>}
      </div>
    </aside>
  );
};

export default AdPlaceholder;
