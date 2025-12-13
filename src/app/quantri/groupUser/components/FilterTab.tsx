import React from 'react';

interface FilterTabProps {
    label: string;
    active: boolean;
    onClick: () => void;
}

export const FilterTab: React.FC<FilterTabProps> = ({ label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`
      px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wide transition-all whitespace-nowrap
      ${active
                ? 'bg-slate-800 text-white shadow-md shadow-slate-500/20'
                : 'bg-transparent text-slate-500 hover:bg-slate-100'
            }
    `}
    >
        {label}
    </button>
);

export default FilterTab;
