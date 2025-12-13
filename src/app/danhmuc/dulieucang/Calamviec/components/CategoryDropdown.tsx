import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Building2, ChevronDown } from 'lucide-react';

type CategoryType = 'hanh_chinh' | 'ca_ngay' | 'ca_dem';

interface CategoryDropdownProps {
    value: CategoryType;
    onChange: (value: string) => void;
}

const CATEGORY_OPTIONS = [
    { value: 'hanh_chinh', label: 'Hành chính', icon: Building2, className: 'bg-slate-100 text-slate-600 border-slate-200' },
    { value: 'ca_ngay', label: 'Ca Ngày', icon: Sun, className: 'bg-amber-50 text-amber-700 border-amber-200' },
    { value: 'ca_dem', label: 'Ca Đêm', icon: Moon, className: 'bg-blue-50 text-blue-600 border-blue-200' },
];

export const CategoryDropdown: React.FC<CategoryDropdownProps> = ({ value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedOption = CATEGORY_OPTIONS.find(opt => opt.value === value) || CATEGORY_OPTIONS[0];
    const IconComponent = selectedOption.icon;

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={dropdownRef} className="relative inline-block">
            {/* Selected Value Button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`inline-flex items-center gap-1 px-2 py-1 rounded border text-[14px] font-medium cursor-pointer outline-none transition-all ${selectedOption.className}`}
            >
                <IconComponent size={14} />
                <span>{selectedOption.label}</span>
                <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute z-50 mt-1 left-1/2 -translate-x-1/2 bg-white border border-slate-200 rounded shadow-lg min-w-[140px]">
                    {CATEGORY_OPTIONS.map((option) => {
                        const OptionIcon = option.icon;
                        return (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => {
                                    onChange(option.value);
                                    setIsOpen(false);
                                }}
                                className={`w-full flex items-center gap-2 px-3 py-2 text-[14px] font-medium hover:bg-slate-50 transition-colors ${option.value === value ? 'bg-slate-50' : ''
                                    }`}
                            >
                                <span className={`p-1 rounded ${option.className}`}>
                                    <OptionIcon size={14} />
                                </span>
                                <span className="text-slate-700">{option.label}</span>
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
