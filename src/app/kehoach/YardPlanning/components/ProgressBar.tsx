import React from 'react';

interface ProgressBarProps {
  current: number;
  max: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, max }) => {
  const percentage = Math.min((current / max) * 100, 100);
  
  let colorClass = 'bg-emerald-500';
  if (percentage > 80) colorClass = 'bg-orange-500';
  if (percentage > 95) colorClass = 'bg-red-500';

  return (
    <div className="w-full mt-2">
      <div className="flex justify-between text-xs mb-1.5 font-medium">
        <span className="text-slate-500">Sức chứa</span>
        <span className={`${percentage > 80 ? 'text-orange-600' : 'text-emerald-600'}`}>
          {current.toLocaleString()} / {max.toLocaleString()} ({percentage.toFixed(0)}%)
        </span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-500 ease-out ${colorClass}`} 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;