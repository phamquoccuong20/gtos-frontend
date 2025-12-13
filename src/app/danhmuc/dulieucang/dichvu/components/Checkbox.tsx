import React from 'react';
import { Check } from 'lucide-react';

interface CheckboxProps {
    checked: boolean;
    onChange: () => void;
    label?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, label }) => {
    return (
        <div
            className="flex items-center cursor-pointer group"
            onClick={(e) => { e.stopPropagation(); onChange(); }}
        >
            <div className={`
        relative flex items-center justify-center w-5 h-5 rounded border-2 transition-all duration-200
        ${checked
                    ? 'bg-blue-600 border-blue-600 shadow-md shadow-blue-200'
                    : 'bg-white border-slate-300 group-hover:border-blue-400'
                }
      `}>
                <Check
                    size={12}
                    strokeWidth={3.5}
                    className={`text-white transition-transform duration-200 ${checked ? 'scale-100' : 'scale-0'}`}
                />
            </div>
            {label && <span className="ml-3 text-[14px] text-slate-600 select-none group-hover:text-slate-900">{label}</span>}
        </div>
    );
};

export default Checkbox;
