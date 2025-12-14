import React from 'react';
import { X, Save } from 'lucide-react';
import { User } from '../types';
import { USER_GROUPS } from '../constants';

interface ModalProps {
    isOpen: boolean;
    editingId: number | null;
    formData: Partial<User>;
    onClose: () => void;
    onSave: () => void;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onStatusChange: (status: boolean) => void;
}

export const Modal: React.FC<ModalProps> = ({
    isOpen,
    editingId,
    formData,
    onClose,
    onSave,
    onInputChange,
    onStatusChange,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 p-4 animate-fade-in">
            <div className="bg-white rounded shadow-sm w-full max-w-2xl overflow-hidden border border-slate-200">
                {/* Modal Header */}
                <div className="px-[10px] py-[10px] border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div>
                        <h3 className="text-[18px] font-bold text-slate-800">
                            {editingId ? 'Cập nhật thông tin' : 'Thêm người dùng mới'}
                        </h3>
                        <p className="text-[14px] text-slate-500 mt-0.5">
                            {editingId ? 'Chỉnh sửa thông tin chi tiết của tài khoản.' : 'Nhập thông tin chi tiết để tạo tài khoản mới.'}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Modal Body - Form */}
                <div className="p-[10px] overflow-y-auto max-h-[70vh] custom-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px]">
                        {/* Column 1 */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-[14px] font-semibold text-slate-700 mb-[10px]">
                                    Tên đăng nhập <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username || ''}
                                    onChange={onInputChange}
                                    className="w-full px-3 h-[36px] text-[14px] border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    placeholder="vd: nguyenvan"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Nhóm người dùng</label>
                                <select
                                    name="group"
                                    value={formData.group || 'Nhóm Admin'}
                                    onChange={onInputChange}
                                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                >
                                    {USER_GROUPS.map((group) => (
                                        <option key={group} value={group}>
                                            {group}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email || ''}
                                    onChange={onInputChange}
                                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                    placeholder="example@gtos.vn"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1.5">CMND / CCCD</label>
                                <input
                                    type="text"
                                    name="idNumber"
                                    value={formData.idNumber || ''}
                                    onChange={onInputChange}
                                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                    placeholder="Nhập số ID"
                                />
                            </div>
                        </div>

                        {/* Column 2 */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                    Họ và tên <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName || ''}
                                    onChange={onInputChange}
                                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                    placeholder="Nhập họ tên đầy đủ"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Mã Cảng</label>
                                <input
                                    type="text"
                                    name="portCode"
                                    value={formData.portCode || 'TTP'}
                                    onChange={onInputChange}
                                    readOnly
                                    className="w-full px-3 py-2 text-sm border border-slate-200 bg-slate-50 text-slate-500 rounded-lg cursor-not-allowed"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Số điện thoại</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone || ''}
                                    onChange={onInputChange}
                                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                    placeholder="0901xxxxxx"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Trạng thái</label>
                                <div className="flex items-center gap-6 mt-3">
                                    <label className="flex items-center gap-2 cursor-pointer select-none group">
                                        <input
                                            type="radio"
                                            name="status"
                                            className="hidden"
                                            checked={formData.status === true}
                                            onChange={() => onStatusChange(true)}
                                        />
                                        <div
                                            className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${formData.status === true
                                                ? 'border-indigo-600 bg-indigo-600'
                                                : 'border-slate-300 bg-white group-hover:border-indigo-400'
                                                }`}
                                        >
                                            {formData.status === true && <div className="w-2 h-2 rounded-full bg-white" />}
                                        </div>
                                        <span className={`text-sm font-medium ${formData.status === true ? 'text-indigo-700' : 'text-slate-700'}`}>
                                            Hoạt động
                                        </span>
                                    </label>

                                    <label className="flex items-center gap-2 cursor-pointer select-none group">
                                        <input
                                            type="radio"
                                            name="status"
                                            className="hidden"
                                            checked={formData.status === false}
                                            onChange={() => onStatusChange(false)}
                                        />
                                        <div
                                            className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${formData.status === false
                                                ? 'border-indigo-600 bg-indigo-600'
                                                : 'border-slate-300 bg-white group-hover:border-indigo-400'
                                                }`}
                                        >
                                            {formData.status === false && <div className="w-2 h-2 rounded-full bg-white" />}
                                        </div>
                                        <span className={`text-sm font-medium ${formData.status === false ? 'text-indigo-700' : 'text-slate-700'}`}>
                                            Đã khóa
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Full Width */}
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Địa chỉ</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address || ''}
                                onChange={onInputChange}
                                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                placeholder="Nhập địa chỉ liên hệ"
                            />
                        </div>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="px-[10px] py-[10px] bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-[10px]">
                    <button
                        onClick={onClose}
                        className="px-4 h-[36px] text-[14px] font-medium text-slate-700 hover:bg-slate-200 rounded transition-colors"
                    >
                        Hủy bỏ
                    </button>
                    <button
                        onClick={onSave}
                        className="px-4 h-[36px] text-[14px] font-medium text-white bg-blue-600 hover:bg-blue-700 rounded transition-colors flex items-center gap-2"
                    >
                        <Save size={16} />
                        {editingId ? 'Cập nhật' : 'Lưu lại'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
