import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = "h-24 w-24" }) => (
  <svg
    className={className}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Talento Sostenible Logo"
  >
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#5F8587" />
        <stop offset="100%" stopColor="#B0C7C8" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="20" fill="url(#logoGradient)" />
    <text 
      x="50%" 
      y="52%" 
      dominantBaseline="middle" 
      textAnchor="middle" 
      fontFamily="Arial, sans-serif" 
      fontSize="50" 
      fontWeight="bold"
      fill="white"
      letterSpacing="-2"
    >
      TS
    </text>
  </svg>
);

export default Logo;