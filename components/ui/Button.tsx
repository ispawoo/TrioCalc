import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({ children, className, variant = 'primary', size = 'md', ...props }) => {
  const baseStyles = "font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150 disabled:opacity-50";
  
  let variantStyles = "";
  switch (variant) {
    case 'primary':
      variantStyles = "bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-500";
      break;
    case 'secondary':
      variantStyles = "bg-secondary-500 hover:bg-secondary-600 text-white focus:ring-secondary-400";
      break;
    case 'danger':
      variantStyles = "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500";
      break;
    case 'outline':
      variantStyles = "border border-primary-500 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-700 dark:hover:text-white focus:ring-primary-500";
      break;
  }

  let sizeStyles = "";
  switch (size) {
    case 'sm':
      sizeStyles = "px-3 py-1.5 text-xs";
      break;
    case 'md':
      sizeStyles = "px-4 py-2 text-sm";
      break;
    case 'lg':
      sizeStyles = "px-6 py-3 text-base";
      break;
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
