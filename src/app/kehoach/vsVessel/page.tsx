"use client";

import React, { useState, useMemo } from 'react';
import { Ship } from './types';
import { SHIP_TYPES, COUNTRIES, Icons } from './constants';
import { ShipTable } from './components/ShipTable';
import { ShipForm } from './components/ShipForm';
import { DeleteModal } from './components/DeleteModal';
import Layout from './layout';

const INITIAL_SHIPS: Ship[] = [
  {
    id: '1',
    type: 'Sà lan',
    code: 'AG23',
    name: 'Sa lan 2',
    nationality: 'Các tiểu vương quốc Ả Rập thống nhất',
    callSign: 'XVBA',
    imo: '9123456',
    loa: '120.5',
    maxBeam: '22.0',
    depth: '8.5',
    holds: '3',
    grt: '5200',
    dwt: '8500'
  },
  {
    id: '2',
    type: 'Tàu bách hóa',
    code: 'SG69',
    name: 'BIEN DONG STAR',
    nationality: 'Andorra',
    callSign: '3EFC2',
    imo: '9876543',
    loa: '185.2',
    maxBeam: '32.2',
    depth: '14.5',
    holds: '5',
    grt: '28500',
    dwt: '45000'
  }
];

export default function Page() {
  const [ships, setShips] = useState<Ship[]>(INITIAL_SHIPS);
  const [selectedShip, setSelectedShip] = useState<Ship | null>(null);
  const [selectedShipIds, setSelectedShipIds] = useState<Set<string>>(new Set());
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState<Partial<Ship>>({
    type: SHIP_TYPES[0],
    nationality: COUNTRIES[0],
    code: '',
    name: '',
    callSign: '',
    imo: '',
    loa: '',
    maxBeam: '',
    depth: '',
    holds: '',
    grt: '',
    dwt: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const filteredShips = useMemo(() => {
    return ships.filter(s => 
      (s.name && s.name.toLowerCase().includes(searchTerm.toLowerCase())) || 
      (s.code && s.code.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [ships, searchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'code' && value.length > 4) {
      return;
    }
    
    setFormData(prev => {
      const nextData = { ...prev, [name]: value };
      
      if (name === 'name') {
        const cleanName = value
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .trim()
          .toUpperCase();
        
        const words = cleanName.split(/\s+/).filter(w => w.length > 0);
        let generatedCode = '';
        
        if (words.length >= 4) {
          generatedCode = words[0][0] + words[1][0] + words[2][0] + words[3][0];
        } else if (words.length === 3) {
          generatedCode = words[0].substring(0, 2) + words[1][0] + words[2][0];
        } else if (words.length === 2) {
          generatedCode = words[0].substring(0, 2) + words[1].substring(0, 2);
        } else if (words.length === 1) {
          generatedCode = words[0].substring(0, 4);
        }
        
        nextData.code = generatedCode;
      }
      
      return nextData;
    });
  };

  const handleSave = () => {
    if (!formData.code || !formData.name) {
      showNotification('Vui lòng nhập Mã tàu và Tên tàu', 'error');
      return;
    }
    if (selectedShip) {
      setShips(prev => prev.map(s => s.id === selectedShip.id ? { ...s, ...formData } as Ship : s));
      showNotification('Cập nhật thành công');
    } else {
      const newShip: Ship = { ...formData, id: Date.now().toString() } as Ship;
      setShips(prev => [newShip, ...prev]);
      showNotification('Thêm mới thành công');
    }
    resetForm();
  };

  const confirmDelete = () => {
    const count = selectedShipIds.size;
    setShips(prev => prev.filter(ship => !selectedShipIds.has(ship.id)));
    setSelectedShipIds(new Set());
    setShowDeleteModal(false);
    showNotification(`Đã xóa thành công ${count} tàu`);
    if (selectedShip && selectedShipIds.has(selectedShip.id)) {
      resetForm();
    }
  };

  const handleEdit = (ship: Ship) => {
    setSelectedShip(ship);
    setFormData(ship);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setSelectedShip(null);
    setFormData({
      type: SHIP_TYPES[0],
      nationality: COUNTRIES[0],
      code: '', name: '', callSign: '', imo: '', loa: '', maxBeam: '', depth: '', holds: '', grt: '', dwt: ''
    });
  };

  const toggleSelectAll = () => {
    if (selectedShipIds.size === filteredShips.length && filteredShips.length > 0) {
      setSelectedShipIds(new Set());
    } else {
      setSelectedShipIds(new Set(filteredShips.map(s => s.id)));
    }
  };

  const toggleSelectShip = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const newSelected = new Set(selectedShipIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedShipIds(newSelected);
  };

  return (
    <Layout>
      {/* Notification */}
      {notification && (
        <div className={`fixed top-[28px] right-[28px] z-50 p-[14px] rounded-[4px] shadow-2xl text-white transform transition-all duration-300 ${notification.type === 'success' ? 'bg-emerald-600' : 'bg-rose-600'}`}>
          {notification.message}
        </div>
      )}

      {/* Custom Delete Modal */}
      {showDeleteModal && (
        <DeleteModal 
           onClose={() => setShowDeleteModal(false)}
           onConfirm={confirmDelete}
           count={selectedShipIds.size}
        />
      )}

      <div className="flex-1 bg-white border border-slate-200 rounded-[4px] shadow-lg flex flex-col p-[14px] gap-[14px]">
        <header className="bg-white text-slate-800 p-[14px] rounded-[4px] border border-slate-200 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-[4px] text-white shadow-sm">
                <Icons.Ship />
              </div>
              <h1 className="text-lg font-extrabold tracking-tight uppercase text-blue-900">Quản Lý Danh Mục Tàu</h1>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => { resetForm(); showNotification('Đã làm mới dữ liệu'); }}
                className="flex items-center gap-2 px-[14px] py-2 bg-slate-50 hover:bg-slate-100 rounded-[4px] transition-colors text-sm font-semibold border border-slate-200 text-slate-700 shadow-sm"
              >
                <Icons.Refresh />
                <span>Nạp lại</span>
              </button>
              <button 
                onClick={resetForm}
                className="flex items-center gap-2 px-[14px] py-2 bg-blue-600 hover:bg-blue-700 rounded-[4px] transition-colors text-sm font-semibold text-white shadow-md shadow-blue-200"
              >
                <Icons.Plus />
                <span>Thêm mới</span>
              </button>
              <button 
                onClick={() => setShowDeleteModal(true)}
                disabled={selectedShipIds.size === 0}
                className={`flex items-center gap-2 px-[14px] py-2 rounded-[4px] transition-all text-sm font-semibold text-white shadow-md ${selectedShipIds.size > 0 ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-100' : 'bg-slate-300 cursor-not-allowed shadow-none'}`}
              >
                <Icons.Trash />
                <span>Xóa {selectedShipIds.size > 0 ? `(${selectedShipIds.size})` : ''}</span>
              </button>
              <button 
                onClick={handleSave}
                className="flex items-center gap-2 px-[14px] py-2 bg-emerald-600 hover:bg-emerald-700 rounded-[4px] transition-colors text-sm font-semibold text-white shadow-md shadow-emerald-100"
              >
                <Icons.Save />
                <span>Lưu</span>
              </button>
            </div>
          </div>
        </header>

        <ShipForm formData={formData} handleInputChange={handleInputChange} />
        
        <ShipTable 
          filteredShips={filteredShips}
          selectedShipIds={selectedShipIds}
          selectedShip={selectedShip}
          toggleSelectAll={toggleSelectAll}
          toggleSelectShip={toggleSelectShip}
          handleEdit={handleEdit}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>
    </Layout>
  );
}
