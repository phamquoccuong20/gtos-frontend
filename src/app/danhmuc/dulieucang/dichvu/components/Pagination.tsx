import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    onPageChange
}) => {
    // Generate page numbers
    const renderPaginationButtons = () => {
        const buttons = [];
        const maxVisibleButtons = 5;

        let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
        let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

        if (endPage - startPage + 1 < maxVisibleButtons) {
            startPage = Math.max(1, endPage - maxVisibleButtons + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => onPageChange(i)}
                    className={`w-8 h-8 rounded text-[14px] font-bold flex items-center justify-center transition-all shadow-sm ${currentPage === i
                        ? 'bg-blue-600 text-white'
                        : 'bg-white hover:bg-slate-50 text-slate-600 border border-transparent hover:border-slate-200'
                        }`}
                >
                    {i}
                </button>
            );
        }
        return buttons;
    };

    const startItem = totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    return (
        <div className="border-t border-slate-100 bg-slate-50 p-[10px] flex items-center justify-between">
            <p className="text-[14px] font-medium text-slate-500">
                Hiển thị <span className="font-bold text-slate-700">
                    {startItem}-{endItem}
                </span> trên tổng số <span className="font-bold text-slate-700">{totalItems}</span> bản ghi
            </p>

            <div className="flex items-center gap-[10px]">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded bg-white border border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-200 disabled:opacity-50 disabled:hover:text-slate-400 disabled:cursor-not-allowed transition-all shadow-sm"
                >
                    <ChevronLeft size={16} />
                </button>

                <div className="flex items-center gap-1">
                    {renderPaginationButtons()}
                </div>

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className="p-2 rounded bg-white border border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-200 disabled:opacity-50 disabled:hover:text-slate-400 disabled:cursor-not-allowed transition-all shadow-sm"
                >
                    <ChevronRight size={16} />
                </button>
            </div>
        </div>
    );
};

export default Pagination;
