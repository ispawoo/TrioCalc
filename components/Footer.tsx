import React from 'react';
import { FOOTER_TEXT, AUTHOR_LINK } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-center py-6 border-t border-gray-200 dark:border-gray-700">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {FOOTER_TEXT.split(':')[0]}:{' '}
        <a 
          href={AUTHOR_LINK} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary-600 dark:text-primary-400 hover:underline"
        >
          {FOOTER_TEXT.split(':').slice(1).join(':').trim()}
        </a>
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
        &copy; {new Date().getFullYear()} Triocalc. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;