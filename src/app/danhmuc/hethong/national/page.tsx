
"use client";

import React, { useState, useMemo, useEffect } from 'react';
import * as Icons from 'lucide-react';
import NationalTable from './components/Table/NationalTable';
import AddRowsModal from '@/components/AddRowsModal';
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal';
import UpdateCountryModal from './components/UpdateCountryModal';
import { Country } from '@/types/types';
import { MOCK_COUNTRIES } from '@/data/constants';

const NationalPage: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>(MOCK_COUNTRIES);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [checkedIds, setCheckedIds] = useState<Set<number>>(new Set());
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [countryToUpdate, setCountryToUpdate] = useState<Country | null>(null);
  
  // State cho thông báo thành công
  const [showToast, setShowToast] = useState(false);

  const hasChanges = useMemo(() => {
    return countries.some(c => c.isDraft);
  }, [countries]);

  const filteredCountries = useMemo(() => {
    return countries.filter(c => 
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      c.code.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, countries]);

  const handleRowClick = (country: Country) => {
    setCountryToUpdate(country);
    setIsUpdateModalOpen(true);
  };

  const toggleCheck = (id: number) => {
    const newChecked = new Set(checkedIds);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setCheckedIds(newChecked);
  };

  const toggleCheckAll = () => {
    if (checkedIds.size === filteredCountries.length) {
      setCheckedIds(new Set());
    } else {
      setCheckedIds(new Set(filteredCountries.map(c => c.id)));
    }
  };

  const handleAddRows = (count: number) => {
    const newDrafts: Country[] = Array.from({ length: count }).map((_, i) => ({
      id: Date.now() + i,
      code: '',
      name: '',
      nativeName: '',
      flagCode: 'un',
      region: '',
      isDraft: true
    }));

    setCountries(prev => [...newDrafts, ...prev]);
  };

  const handleConfirmDelete = () => {
    setCountries(prev => prev.filter(c => !checkedIds.has(c.id)));
    setCheckedIds(new Set());
    if (selectedCountry && checkedIds.has(selectedCountry.id)) {
      setSelectedCountry(null);
    }
  };

  const handleUpdateCountry = (updatedCountry: Country) => {
    setCountries(prev => prev.map(c => c.id === updatedCountry.id ? { ...updatedCountry, isDraft: true } : c));
  };

  const handleSaveAll = () => {
    const drafts = countries.filter(c => c.isDraft);
    const incomplete = drafts.some(c => !c.name || !c.code);
    
    if (incomplete) { 
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    setCountries(prev => prev.map(c => ({ ...c, isDraft: false })));
    
    // Hiển thị thông báo thành công
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] flex flex-col font-sans overflow-x-hidden">
      <main className="flex-1 flex flex-col relative">
        
        {/* TOAST NOTIFICATION - Cập nhật border-radius thành 4px */}
        {showToast && (
          <div className="fixed top-6 right-6 z-[100] animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="bg-[#1864ab] text-white px-6 py-4 rounded-[4px] shadow-2xl flex items-center gap-4 border border-blue-400/30 backdrop-blur-sm">
              <div className="bg-white/20 p-1.5 rounded-[4px]">
                <Icons.CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-sm tracking-tight uppercase">Thông báo hệ thống</span>
                <span className="text-blue-100 text-xs font-semibold">Cập nhật dữ liệu thành công!</span>
              </div>
            </div>
          </div>
        )}

        {/* SUB-HEADER CARD WITH INTEGRATED STATS */}
        <div className="px-6 mt-4">
          <div className="bg-white rounded-[4px] shadow-sm border border-slate-200 p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-md shadow-blue-200 flex-shrink-0">
                <Icons.Flag className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 leading-tight">Quản lý Danh mục Quốc gia</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Cấu hình danh mục hệ thống</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="bg-slate-50 border border-slate-100 rounded-[4px] px-5 py-2.5 flex items-center gap-3 shadow-sm">
                <div className="w-8 h-8 rounded-[4px] bg-blue-100 flex items-center justify-center text-blue-600">
                  <Icons.Globe className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9px] font-black text-slate-400 uppercase block leading-none">TỔNG QUỐC GIA</span>
                  <span className="text-base font-black text-slate-800">{countries.length} <small className="text-[10px] text-green-500 font-bold">+2</small></span>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-[4px] px-5 py-2.5 flex items-center gap-3 shadow-sm">
                <div className="w-8 h-8 rounded-[4px] bg-indigo-100 flex items-center justify-center text-indigo-600">
                  <Icons.MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9px] font-black text-slate-400 uppercase block leading-none">KHU VỰC</span>
                  <span className="text-base font-black text-slate-800">12</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SELECTION / FILTER BAR */}
        <div className="px-6 mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-wider">
              <Icons.MapPin className="w-3 h-3 text-blue-500" />
              Chọn Khu vực / Châu lục
            </div>
            <select className="w-full bg-white border border-slate-200 rounded-[4px] px-4 py-3 text-sm text-slate-600 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none appearance-none font-medium">
              <option>Tất cả Khu vực...</option>
              <option>Southeast Asia</option>
              <option>Europe</option>
              <option>North America</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-wider">
              <Icons.Users className="w-3 h-3 text-blue-500" />
              Nhóm Quốc gia
            </div>
            <select className="w-full bg-white border border-slate-200 rounded-[4px] px-4 py-3 text-sm text-slate-600 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none appearance-none font-medium">
              <option>Tất cả Nhóm...</option>
              <option>A-Z List</option>
              <option>Strategic Partners</option>
            </select>
          </div>
        </div>

        {/* CONTENT AREA - Grouped Frame */}
        <div className="p-6">
          <div className="bg-white rounded-[4px] shadow-sm border border-slate-200 overflow-hidden">
            {/* Action Toolbar Inside Frame */}
            <div className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100">
              <div className="relative group max-w-md w-full">
                <Icons.Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Tìm kiếm nhanh tên hoặc mã ISO..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 rounded-[4px] border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-sm placeholder:text-slate-400"
                />
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsDeleteModalOpen(true)}
                  disabled={checkedIds.size === 0}
                  className={`px-4 py-2.5 font-black text-[10px] uppercase tracking-wider rounded-[4px] flex items-center gap-2 transition-all border ${
                    checkedIds.size > 0 
                      ? 'bg-red-50 text-red-600 border-red-100 hover:bg-red-100 cursor-pointer shadow-sm' 
                      : 'bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed opacity-50'
                  }`}
                >
                  <Icons.Trash2 className="w-3.5 h-3.5" />
                  Xóa ({checkedIds.size})
                </button>
                
                <button 
                  onClick={handleSaveAll}
                  disabled={!hasChanges}
                  className={`px-4 py-2.5 font-black text-[10px] uppercase tracking-wider rounded-[4px] flex items-center gap-2 transition-all border shadow-sm ${
                    hasChanges 
                      ? 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 cursor-pointer animate-pulse-subtle ring-2 ring-blue-500/20' 
                      : 'bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed opacity-50'
                  }`}
                >
                  <Icons.Save className="w-3.5 h-3.5" />
                  Lưu thay đổi
                </button>

                <button 
                  onClick={() => setIsAddModalOpen(true)}
                  className="px-5 py-2.5 bg-blue-600 text-white font-black text-[10px] uppercase tracking-wider rounded-[4px] flex items-center gap-2 hover:bg-blue-700 transition-all shadow-md active:scale-95"
                >
                  <Icons.Plus className="w-4 h-4" />
                  Thêm dòng
                </button>
              </div>
            </div>

            {/* Main Table Inside Frame with Padding */}
            <div className="p-4">
              <NationalTable 
                countries={filteredCountries} 
                onSelect={handleRowClick}
                selectedId={selectedCountry?.id}
                checkedIds={checkedIds}
                onToggleCheck={toggleCheck}
                onToggleCheckAll={toggleCheckAll}
                onUpdateDraft={handleUpdateCountry}
              />
            </div>
          </div>
          
          <footer className="pt-6 pb-10 text-center">
            <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase opacity-60">
              © 2024 SAIGON PORT - GTOS CORE ENGINE - VERSION 4.2.0 PRO
            </p>
          </footer>
        </div>

        {/* Add Rows Modal */}
        <AddRowsModal 
          isOpen={isAddModalOpen} 
          onClose={() => setIsAddModalOpen(false)}
          onConfirm={handleAddRows}
        />

        <ConfirmDeleteModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleConfirmDelete}
            count={selectedCountry?.id}
            entityName="dòng"
            />

        {/* Update Country Modal */}
        <UpdateCountryModal 
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          country={countryToUpdate}
          onUpdate={handleUpdateCountry}
        />
      </main>
      <style>{`
        @keyframes pulse-subtle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.95; transform: scale(1.02); }
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default NationalPage;
