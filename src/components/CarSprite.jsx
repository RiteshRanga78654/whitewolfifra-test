import React from 'react';

export const CAR_VARIANTS = ['#ef4444', '#f87171', '#3b82f6', '#60a5fa', '#facc15', '#fef08a', '#ffffff', '#9ca3af'];

export const CarSprite = ({ variant = '#ffffff', width = 30 }) => {
  return (
    <svg 
      width={width} 
      height={width / 2} 
      viewBox="0 0 40 20" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: 'visible' }}
    >
      <g transform="translate(-20, -10)"> {/* Center the car on the path */}
        {/* Car Body */}
        <rect width="40" height="20" rx="5" fill={variant} stroke="#000" strokeWidth="1" />
        {/* Windshield */}
        <rect x="10" y="3" width="8" height="14" rx="2" fill="#1f2937" />
        {/* Rear Window */}
        <rect x="28" y="3" width="6" height="14" rx="2" fill="#1f2937" />
        {/* Headlights */}
        <rect x="38" y="2" width="2" height="4" fill="#fef08a" />
        <rect x="38" y="14" width="2" height="4" fill="#fef08a" />
      </g>
    </svg>
  );
};
