'use client';

import React, { useState, useRef, useEffect } from 'react';
import PermissionTable from './components/Table/PermissionTable';
import { PORTS, ACCOUNT_GROUPS, INITIAL_DATA } from './constants';
import { MenuItem } from './types';
import { UserCircle, Ship, Shield, ChevronDown, Check, Layers, CheckCircle, X } from 'lucide-react';

const SysPermissionPage: React.FC = () => {
  const [selectedPort, setSelectedPort] = useState<string | null>(null);
  const [selectedGroup, setSelectedGroup] = useState(ACCOUNT_GROUPS[0].id);
  
  // Create a store to hold permissions for EACH group independently
  // Key: Group ID, Value: MenuItem[]
  const [permissionStore, setPermissionStore] = useState<Record<string, MenuItem[]>>(() => {
    const store: Record<string, MenuItem[]> = {};
    // Initialize every group with a deep copy of INITIAL_DATA
    ACCOUNT_GROUPS.forEach(group => {
      store[group.id] = JSON.parse(JSON.stringify(INITIAL_DATA));
    });
    return store;
  });

  const [loading, setLoading] = useState(false);
  
  // States for custom dropdowns
  const [isPortOpen, setIsPortOpen] = useState(false);
  const [isGroupOpen, setIsGroupOpen] = useState(false);

  // Toast notification state
  const [toast, setToast] = useState<{ show: boolean; message: string }>({ show: false, message: '' });

  // Refs for click outside handling
  const portRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (portRef.current && !portRef.current.contains(event.target as Node)) {
        setIsPortOpen(false);
      }
      if (groupRef.current && !groupRef.current.contains(event.target as Node)) {
        setIsGroupOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSave = (updatedData: MenuItem[]) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      // Update the store specifically for the selected group
      setPermissionStore(prevStore => ({
        ...prevStore,
        [selectedGroup]: updatedData
      }));
      
      setLoading(false);
      
      const groupName = ACCOUNT_GROUPS.find(g => g.id === selectedGroup)?.name;
      setToast({ show: true, message: `Đã lưu phân quyền cho nhóm ${groupName} thành công!` });
      // Auto hide toast after 3 seconds
      setTimeout(() => setToast({ show: false, message: '' }), 3000);
    }, 800);
  };

  const currentPortName = PORTS.find(p => p.id === selectedPort)?.name || "Chọn Cảng / Chi nhánh...";
  const currentGroupName = ACCOUNT_GROUPS.find(g => g.id === selectedGroup)?.name;

  // Retrieve the specific data for the current selected group
  // Fallback to INITIAL_DATA copy if something goes wrong, though init ensures it exists
  const currentPermissionsData = permissionStore[selectedGroup] || INITIAL_DATA;

  // Custom Shadow style to match requirement
  const cardShadowClass = "shadow-[0_1px_2px_0_rgba(0,0,0,0.03),0_1px_6px_-1px_rgba(0,0,0,0.02),0_2px_4px_0_rgba(0,0,0,0.02)]";

  return (
    <>
    <div className="flex flex-col h-full bg-slate-50 overflow-x-hidden font-['Roboto',sans-serif] text-[14px] text-[#1f2937]">

      {/* Main Scrollable Area - Adjusted padding to 10px */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden p-[10px] bg-slate-50/50 pt-[20px]">
        <div className="max-w-full mx-auto flex flex-col h-full">
          
          {/* SECTION 1: Header Info & Stats Card */}
          <div className={`bg-white rounded-[4px] border border-slate-200 p-[10px] mb-[10px] ${cardShadowClass}`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-[10px]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-500">
                   <Shield size={20} />
                </div>
                <div>
                  <h2 className="text-[18px] font-bold text-orange-500 tracking-tight font-['Be_Vietnam_Pro'] leading-tight">Phân Quyền Người Dùng</h2>
                  <p className="text-slate-400 text-[14px]">Cấu hình quyền truy cập chi tiết</p>
                </div>
              </div>

              {/* Stats Section */}
              <div className="flex flex-wrap items-center gap-[10px]">
                 {/* Stat 1 */}
                 <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-[4px] border border-slate-100">
                    <div className="text-indigo-600">
                       <Layers size={16} />
                    </div>
                    <div>
                       <p className="text-[10px] text-slate-400 font-bold uppercase">Tổng mục</p>
                       <p className="text-[14px] font-bold text-slate-800">{currentPermissionsData.length}</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: Filters Card */}
          <div className={`bg-white rounded-[4px] border border-slate-200 p-[10px] mb-[10px] relative z-20 ${cardShadowClass}`}>
            {/* Filters Grid - 10px gap */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[10px] items-end">
              
              {/* Custom Dropdown: Port */}
              <div className="space-y-1 relative" ref={portRef}>
                <label className="text-[14px] text-slate-700 flex items-center gap-2 font-medium">
                  <Ship size={14} className="text-blue-500"/> Chọn Cảng / Chi nhánh
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsPortOpen(!isPortOpen)}
                    // Control height 36px, radius 4px
                    className={`relative w-full h-[36px] bg-slate-50 border rounded-[4px] px-3 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-[14px] hover:bg-white transition-colors flex items-center justify-between ${!selectedPort ? 'border-blue-300 ring-2 ring-blue-500/10' : 'border-slate-200 focus:border-blue-500'}`}
                  >
                    <span className={`block truncate mr-2 ${!selectedPort ? 'text-slate-400' : 'text-slate-800'}`}>{currentPortName}</span>
                    <ChevronDown size={14} className="text-slate-500 flex-shrink-0" />
                  </button>

                  {isPortOpen && (
                    <div className="absolute z-50 mt-1 w-full bg-white shadow-lg max-h-60 rounded-[4px] py-1 text-base overflow-auto focus:outline-none text-[14px]">
                      {PORTS.map((port) => (
                        <div
                          key={port.id}
                          className={`cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-blue-50 ${selectedPort === port.id ? 'text-blue-900 font-medium bg-blue-50/50' : 'text-slate-900'}`}
                          onClick={() => {
                            setSelectedPort(port.id);
                            setIsPortOpen(false);
                          }}
                        >
                          <span className="block truncate">{port.name}</span>
                          {selectedPort === port.id && (
                            <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-600">
                              <Check size={14} />
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Custom Dropdown: Account Group */}
              <div className="space-y-1 relative" ref={groupRef}>
                <label className="text-[14px] text-slate-700 flex items-center gap-2 font-medium">
                   <UserCircle size={14} className="text-indigo-500"/> Nhóm tài khoản
                </label>
                <div className="relative">
                  <button
                    type="button"
                    disabled={!selectedPort}
                    onClick={() => setIsGroupOpen(!isGroupOpen)}
                    // Control height 36px, radius 4px
                    className={`relative w-full h-[36px] bg-slate-50 border border-slate-200 rounded-[4px] px-3 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-[14px] hover:bg-white transition-colors flex items-center justify-between disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <span className="block truncate mr-2">{currentGroupName}</span>
                    <ChevronDown size={14} className="text-slate-500 flex-shrink-0" />
                  </button>

                  {isGroupOpen && (
                    <div className="absolute z-50 mt-1 w-full bg-white shadow-lg max-h-60 rounded-[4px] py-1 text-base overflow-auto focus:outline-none text-[14px] animate-in fade-in zoom-in-95 duration-100">
                      {ACCOUNT_GROUPS.map((group) => (
                        <div
                          key={group.id}
                          className={`cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-indigo-50 ${selectedGroup === group.id ? 'text-indigo-900 font-medium bg-indigo-50/50' : 'text-slate-900'}`}
                          onClick={() => {
                            setSelectedGroup(group.id);
                            setIsGroupOpen(false);
                          }}
                        >
                          <span className="block truncate">{group.name}</span>
                          {selectedGroup === group.id && (
                            <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-indigo-600">
                              <Check size={14} />
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="hidden lg:block text-right pb-1">
                 <div className="inline-flex flex-col items-end">
                   <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Đang chỉnh sửa</span>
                   <span className="font-bold text-indigo-600 truncate max-w-[200px] text-[14px]">{currentGroupName}</span>
                 </div>
              </div>
            </div>
          </div>

          {/* Content Area - Data Grid */}
          <div className="flex-1 min-h-[500px]">
            {!selectedPort ? (
              <div className={`flex flex-col items-center justify-center h-full bg-white rounded-[4px] border border-slate-200 p-8 text-center ${cardShadowClass}`}>
                  <div className="bg-slate-50 p-6 rounded-full border border-slate-100 mb-4 animate-in fade-in zoom-in-50 duration-300">
                    <Ship size={64} className="text-slate-300" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Vui lòng chọn Cảng / Chi nhánh</h3>
                  <p className="text-slate-500 max-w-md mx-auto">
                    Để bắt đầu cấu hình phân quyền người dùng, bạn cần chọn một Cảng hoặc Chi nhánh làm việc từ danh sách phía trên.
                  </p>
                  <button 
                    onClick={() => setIsPortOpen(true)}
                    className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-[4px] transition-colors shadow-sm"
                  >
                    Chọn Cảng ngay
                  </button>
              </div>
            ) : loading ? (
               <div className={`flex items-center justify-center h-full bg-white rounded-[4px] border border-slate-200 ${cardShadowClass}`}>
                  <div className="flex flex-col items-center">
                     <div className="w-8 h-8 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                     <span className="mt-3 text-[14px] text-slate-500 font-medium">Đang lưu dữ liệu...</span>
                  </div>
               </div>
            ) : (
              <PermissionTable data={currentPermissionsData} onSave={handleSave} />
            )}
          </div>
        </div>
      </main>
    </div>

      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-20 right-4 z-50 animate-in slide-in-from-right fade-in duration-300">
          <div className="bg-white border border-green-200 rounded-lg shadow-lg p-4 flex items-start gap-3 min-w-[320px] max-w-[400px]">
            <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle size={18} className="text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-[14px] font-semibold text-slate-800">Thành công!</p>
              <p className="text-[13px] text-slate-600 mt-0.5">{toast.message}</p>
            </div>
            <button 
              onClick={() => setToast({ show: false, message: '' })}
              className="flex-shrink-0 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SysPermissionPage;
