import React from 'react';
import { Search, Ship, Box } from 'lucide-react';
import { ServiceRecord, SortField, SortOrder } from '../types';
import Checkbox from './Checkbox';
import SortHeader from './SortHeader';
import FeatureToggle from './FeatureToggle';
import GateIcon from './GateIcon';
import Pagination from './Pagination';
import { ITEMS_PER_PAGE, PLAN_OPTIONS } from '../constants';

interface ServiceTableProps {
    data: ServiceRecord[];
    selectedIds: Set<string>;
    sortField: SortField;
    sortOrder: SortOrder;
    currentPage: number;
    totalPages: number;
    onSort: (field: SortField) => void;
    onSelectAll: () => void;
    onSelectRow: (id: string) => void;
    onToggleFeature: (id: string, feature: 'isShip' | 'isYard' | 'isGate') => void;
    onUpdateField: (id: string, field: keyof ServiceRecord, value: string | number) => void;
    onPageChange: (page: number) => void;
    filteredDataCount: number;
}

const ServiceTable: React.FC<ServiceTableProps> = ({
    data,
    selectedIds,
    sortField,
    sortOrder,
    currentPage,
    totalPages,
    onSort,
    onSelectAll,
    onSelectRow,
    onToggleFeature,
    onUpdateField,
    onPageChange,
    filteredDataCount
}) => {
    return (
        <>
            {/* Table */}
            <div className="overflow-x-auto min-h-[500px]">
                <table className="min-w-full">
                    <thead className="bg-gradient-to-r from-blue-50 via-indigo-50 to-cyan-50">
                        <tr>
                            <th className="w-16 px-[10px] py-[10px] border-b border-r border-slate-200 bg-blue-50/50">
                                <Checkbox
                                    checked={data.length > 0 && data.every(item => selectedIds.has(item.id))}
                                    onChange={onSelectAll}
                                />
                            </th>
                            <SortHeader label="STT" field="stt" sortField={sortField} sortOrder={sortOrder} onSort={onSort} className="w-20" />
                            <SortHeader label="Mã DV" field="code" sortField={sortField} sortOrder={sortOrder} onSort={onSort} className="w-32" />
                            <SortHeader label="Tên Dịch vụ" field="name" sortField={sortField} sortOrder={sortOrder} onSort={onSort} />
                            <SortHeader label="Phương án" field="plan" sortField={sortField} sortOrder={sortOrder} onSort={onSort} className="w-48 hidden xl:table-cell" />
                            {/* Updated Header with Explicit Titles */}
                            <th className="px-[10px] py-[10px] border-b border-slate-200 w-[320px]">
                                <div className="flex items-center justify-around">
                                    <div className="px-2 py-1 rounded bg-blue-50 border border-blue-100 text-[12px] font-bold text-blue-700 uppercase tracking-wider flex items-center gap-1.5" title="Cột cấu hình cho Tàu">
                                        <Ship size={12} className="text-blue-500" /> Tàu
                                    </div>
                                    <div className="px-2 py-1 rounded bg-indigo-50 border border-indigo-100 text-[12px] font-bold text-indigo-700 uppercase tracking-wider flex items-center gap-1.5" title="Cột cấu hình cho Bãi">
                                        <Box size={12} className="text-indigo-500" /> Bãi
                                    </div>
                                    <div className="px-2 py-1 rounded bg-cyan-50 border border-cyan-100 text-[12px] font-bold text-cyan-700 uppercase tracking-wider flex items-center gap-1.5" title="Cột cấu hình cho Cổng">
                                        <GateIcon size={12} className="text-cyan-500" /> Cổng
                                    </div>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {data.map((item) => {
                            const isSelected = selectedIds.has(item.id);
                            return (
                                <tr
                                    key={item.id}
                                    className={`group transition-all duration-200 hover:bg-slate-50 ${isSelected ? 'bg-primary-50/60' : ''}`}
                                >
                                    <td className="px-[10px] py-[10px] whitespace-nowrap border-r border-slate-100">
                                        <Checkbox checked={isSelected} onChange={() => onSelectRow(item.id)} />
                                    </td>
                                    <td className="px-[10px] py-[10px] whitespace-nowrap border-r border-slate-100">
                                        <input
                                            type="number"
                                            value={item.stt}
                                            onChange={(e) => onUpdateField(item.id, 'stt', e.target.value)}
                                            className="w-12 bg-transparent border-b border-transparent focus:border-blue-300 p-0 text-[14px] text-slate-500 font-medium text-center focus:ring-0 transition-all"
                                        />
                                    </td>
                                    <td className="px-[10px] py-[10px] whitespace-nowrap border-r border-slate-100">
                                        <input
                                            type="text"
                                            value={item.code}
                                            onChange={(e) => onUpdateField(item.id, 'code', e.target.value)}
                                            className="w-20 px-2 py-1 text-[14px] font-bold font-mono text-center bg-white text-slate-700 border border-slate-200 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all shadow-sm"
                                        />
                                    </td>
                                    <td className="px-[10px] py-[10px] border-r border-slate-100">
                                        <input
                                            type="text"
                                            value={item.name}
                                            onChange={(e) => onUpdateField(item.id, 'name', e.target.value)}
                                            className="w-full bg-transparent border border-transparent rounded px-2 py-1 text-[14px] font-medium text-slate-700 placeholder-slate-400 focus:border-blue-400 focus:bg-blue-50/30 focus:outline-none focus:text-blue-700 transition-all"
                                            placeholder="Nhập tên dịch vụ..."
                                        />
                                    </td>
                                    <td className="px-[10px] py-[10px] whitespace-nowrap hidden xl:table-cell border-r border-slate-100">
                                        <select
                                            value={item.plan}
                                            onChange={(e) => onUpdateField(item.id, 'plan', e.target.value)}
                                            className={`w-full bg-white border rounded px-3 py-1.5 text-[14px] font-medium cursor-pointer focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all shadow-sm appearance-none ${item.plan
                                                    ? 'border-blue-200 text-blue-700'
                                                    : 'border-slate-200 text-slate-400'
                                                }`}
                                            style={{
                                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                                                backgroundPosition: 'right 8px center',
                                                backgroundRepeat: 'no-repeat',
                                                backgroundSize: '16px',
                                                paddingRight: '32px'
                                            }}
                                        >
                                            {PLAN_OPTIONS.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="px-[10px] py-[10px] w-[320px]">
                                        <div className="flex items-center justify-around">
                                            {/* Ship Toggle */}
                                            <FeatureToggle
                                                active={item.isShip}
                                                onClick={() => onToggleFeature(item.id, 'isShip')}
                                                icon={Ship}
                                                title="Bật/Tắt: Áp dụng cho Tàu"
                                                activeClass="bg-blue-50 text-blue-600 border border-blue-200 ring-2 ring-blue-100"
                                                inactiveClass="bg-white text-gray-300 border border-gray-200"
                                            />
                                            {/* Yard Toggle */}
                                            <FeatureToggle
                                                active={item.isYard}
                                                onClick={() => onToggleFeature(item.id, 'isYard')}
                                                icon={Box}
                                                title="Bật/Tắt: Áp dụng cho Bãi"
                                                activeClass="bg-indigo-50 text-indigo-600 border border-indigo-200 ring-2 ring-indigo-100"
                                                inactiveClass="bg-white text-gray-300 border border-gray-200"
                                            />
                                            {/* Gate Toggle */}
                                            <FeatureToggle
                                                active={item.isGate}
                                                onClick={() => onToggleFeature(item.id, 'isGate')}
                                                icon={GateIcon}
                                                title="Bật/Tắt: Áp dụng cho Cổng"
                                                activeClass="bg-cyan-50 text-cyan-600 border border-cyan-200 ring-2 ring-cyan-100"
                                                inactiveClass="bg-white text-gray-300 border border-gray-200"
                                            />
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}

                        {filteredDataCount === 0 && (
                            <tr>
                                <td colSpan={6} className="px-6 py-24 text-center">
                                    <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                                        <div className="bg-primary-50 p-4 rounded-full mb-4 shadow-sm">
                                            <Search className="h-8 w-8 text-primary-300" />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-1">Không tìm thấy kết quả</h3>
                                        <p className="text-sm text-gray-500">Chúng tôi không tìm thấy dịch vụ nào khớp với từ khóa của bạn. Hãy thử tìm kiếm khác.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={filteredDataCount}
                itemsPerPage={ITEMS_PER_PAGE}
                onPageChange={onPageChange}
            />
        </>
    );
};

export default ServiceTable;
