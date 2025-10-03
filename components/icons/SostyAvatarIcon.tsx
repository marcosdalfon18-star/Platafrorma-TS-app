import React from 'react';

const SostyAvatarIcon: React.FC<{ className?: string }> = ({ className = "h-10 w-10" }) => (
  <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-label="Avatar de Sosty">
    <defs>
      <linearGradient id="sostyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4F46E5" />
        <stop offset="100%" stopColor="#3B82F6" />
      </linearGradient>
      <radialGradient id="sostyGlow" cx="50%" cy="50%" r="50%">
        <stop offset="70%" stopColor="rgba(255,255,255,0)" />
        <stop offset="100%" stopColor="rgba(199, 210, 254, 0.3)" />
      </radialGradient>
    </defs>
    
    <circle cx="50" cy="50" r="50" fill="url(#sostyGlow)" />
    
    <path 
      d="M50 2 C23.49 2 2 23.49 2 50 C2 76.51 23.49 98 50 98 S98 76.51 98 50 C98 23.49 76.51 2 50 2 Z" 
      fill="url(#sostyGradient)" 
    />
    
    <circle cx="35" cy="45" r="5" fill="white" />
    <circle cx="65" cy="45" r="5" fill="white" />
    
    <path d="M47 30 L53 30 L50 35 Z" fill="rgba(255, 255, 255, 0.7)" />
    
    <path d="M35 65 Q50 75 65 65" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
  </svg>
);

export default SostyAvatarIcon;