'use client';

import React from 'react';

interface ProgressBarProps {
  value: number;
  max: number;
  color?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ value, max, color }) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  const getProgressColor = () => {
    if (percentage > 90) return 'bg-red-500';
    if (percentage > 70) return 'bg-orange-500';
    if (percentage > 40) return 'bg-blue-500';
    return 'bg-emerald-500';
  };

  return (
    <div className="w-full bg-slate-100 rounded-[4px] h-2.5 overflow-hidden">
      <div 
        className={`h-full transition-all duration-500 ease-out ${getProgressColor()} rounded-[4px]`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default ProgressBar;
