'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

/**
 * Pagination Component
 * Renders pagination controls with smart page number display
 */
const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const renderPageNumbers = () => {
    return Array.from({ length: totalPages }).map((_, i) => {
      const page = i + 1;
      
      // Show only a few pages if too many
      if (totalPages > 5 && (page > currentPage + 1 || page < currentPage - 1) && page !== 1 && page !== totalPages) {
        if (page === currentPage + 2 || page === currentPage - 2) {
          return <span key={page} className="px-2 text-gray-300">...</span>;
        }
        return null;
      }

      return (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`min-w-[32px] h-8 flex items-center justify-center rounded text-xs font-bold transition-all ${
            currentPage === page 
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
              : 'text-gray-600 hover:bg-white border border-transparent hover:border-gray-200'
          }`}
        >
          {page}
        </button>
      );
    });
  };

  return (
    <div className="p-[14px] flex items-center justify-end border-t border-gray-50 bg-gray-50/20">
      <div className="flex items-center gap-1">
        <button 
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="p-2 border border-gray-200 rounded hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-all text-gray-600"
        >
          <ChevronLeft size={16} />
        </button>
        
        <div className="flex items-center gap-1">
          {renderPageNumbers()}
        </div>

        <button 
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages || totalPages === 0}
          className="p-2 border border-gray-200 rounded hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-all text-gray-600"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
