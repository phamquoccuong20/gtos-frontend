
import React from 'react';
import { ICONS } from '../constants';

interface Column<T> {
  header: string;
  accessor: keyof T | 'actions';
  render?: (item: T) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
  width?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
  selectedIds?: Set<number>;
  onToggleSelect?: (id: number) => void;
  onToggleAll?: () => void;
  isAllSelected?: boolean;
  editingId?: number | null;
}

export function DataTable<T extends { id: number }>({ 
  columns, 
  data, 
  onRowClick,
  selectedIds,
  onToggleSelect,
  onToggleAll,
  isAllSelected,
  editingId
}: DataTableProps<T>) {
  return (
    <div className="overflow-auto max-h-[calc(100vh-280px)] relative border border-slate-200 rounded-md">
      <table className="w-full text-left border-collapse min-w-[800px]">
        <thead>
          <tr className="bg-[#d0ebff] border-b border-blue-100">
            {onToggleSelect && (
              <th className="py-2 px-[14px] w-12 text-center sticky top-0 z-20 bg-[#d0ebff] border-b border-blue-100">
                <input 
                  type="checkbox" 
                  checked={isAllSelected}
                  onChange={() => onToggleAll?.()}
                  className="w-4 h-4 text-blue-600 bg-white border-none rounded focus:ring-0 cursor-pointer accent-blue-600"
                />
              </th>
            )}
            {columns.map((col, idx) => (
              <th 
                key={idx} 
                className={`py-2 px-[14px] text-xs font-bold text-[#1971c2] uppercase tracking-wider sticky top-0 z-20 bg-[#d0ebff] border-b border-blue-100 ${
                  col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'
                }`}
                style={{ width: col.width }}
              >
                <div className={`flex items-center gap-1 group cursor-pointer hover:opacity-80 transition-opacity ${
                  col.align === 'center' ? 'justify-center' : col.align === 'right' ? 'justify-end' : 'justify-start'
                }`}>
                  {col.header}
                  <ICONS.ChevronDown size={14} className="opacity-0 group-hover:opacity-100" />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.length > 0 ? (
            data.map((row, idx) => {
              const isEditing = editingId === row.id;
              return (
                <tr 
                  key={row.id} 
                  onClick={() => onRowClick?.(row)}
                  className={`group transition-all cursor-pointer 
                    ${isEditing ? 'bg-blue-50/80 ring-2 ring-inset ring-blue-400 z-10' : 'hover:bg-slate-50'} 
                    ${selectedIds?.has(row.id) ? 'bg-blue-50' : ''}`}
                >
                  {onToggleSelect && (
                    <td className="p-[14px] text-center" onClick={(e) => e.stopPropagation()}>
                      <input 
                        type="checkbox" 
                        checked={selectedIds?.has(row.id)}
                        onChange={() => onToggleSelect(row.id)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-none rounded focus:ring-0 cursor-pointer accent-blue-600"
                      />
                    </td>
                  )}
                  {columns.map((col, cIdx) => (
                    <td 
                      key={cIdx} 
                      className={`p-3 text-sm text-slate-600 ${
                        col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'
                      }`}
                    >
                      {col.render ? col.render(row) : (row[col.accessor as keyof T] as any)}
                    </td>
                  ))}
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={columns.length + (onToggleSelect ? 1 : 0)} className="p-10 text-center text-slate-400">
                <div className="flex flex-col items-center gap-2">
                  <ICONS.Search size={32} className="text-slate-200" />
                  <p>Không có dữ liệu phù hợp</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
