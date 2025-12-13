import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import { SortField, SortOrder } from '../types';

interface SortHeaderProps {
    label: string;
    field: SortField;
    sortField: SortField;
    sortOrder: SortOrder;
    onSort: (field: SortField) => void;
    className?: string;
}

const SortHeader: React.FC<SortHeaderProps> = ({
    label,
    field,
    sortField,
    sortOrder,
    onSort,
    className = ""
}) => (
    <th
        className={`px-[10px] py-[10px] border-b border-r border-slate-200 text-left text-[12px] font-bold text-blue-600 uppercase tracking-wider cursor-pointer group hover:bg-blue-50 ${className}`}
        onClick={() => onSort(field)}
    >
        <div className="flex items-center gap-2">
            {label}
            <ArrowUpDown
                size={12}
                className={`text-blue-400 group-hover:text-blue-600 transition-colors ${sortField === field ? 'text-blue-700' : ''}`}
            />
        </div>
    </th>
);

export default SortHeader;
