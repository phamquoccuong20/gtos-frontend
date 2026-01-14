  'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { DataTable } from './components/DataTable';
import { TabType, YardData, BerthData, BittData, EquipmentData, GateData } from './types';
import { YARD_DATA, BERTH_DATA, BITT_DATA, EQUIPMENT_DATA, GATE_DATA, TABS_CONFIG, ICONS } from './constants';
import { AlertTriangle } from 'lucide-react';
import AddRowsModal from '@/components/AddRowsModal';
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal';

import { useDocumentTitle } from '@/hooks/useDocumentTitle';

// ... imports

const Page: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>(TabType.YARD);
  
  // Dynamic Title Management
  const currentTabLabel = useMemo(() => {
    const tab = TABS_CONFIG.find(t => t.id === activeTab);
    return tab ? `${tab.label}` : 'GTOS';
  }, [activeTab]);
  
  useDocumentTitle(currentTabLabel);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  
  // Dynamic data state
  const [yardData, setYardData] = useState<YardData[]>(YARD_DATA);
  const [berthData, setBerthData] = useState<BerthData[]>(BERTH_DATA);
  const [bittData, setBittData] = useState<BittData[]>(BITT_DATA);
  const [equipmentData, setEquipmentData] = useState<EquipmentData[]>(EQUIPMENT_DATA);
  const [gateData, setGateData] = useState<GateData[]>(GATE_DATA);

  // Modal & Editing states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingRowId, setEditingRowId] = useState<number | null>(null);
  
  // Toast notification state
  const [toast, setToast] = useState<{ message: string; visible: boolean; type?: 'success' | 'error' } | null>(null);

  // Ref to the data table container for click-outside detection
  const tableContainerRef = useRef<HTMLDivElement>(null);

  // Handle click outside to exit editing mode
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tableContainerRef.current && 
        !tableContainerRef.current.contains(event.target as Node)
      ) {
        setEditingRowId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Toast auto-hide logic
  useEffect(() => {
    if (toast?.visible) {
      const timer = setTimeout(() => {
        setToast(prev => prev ? { ...prev, visible: false } : null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);



  const filteredData = useMemo(() => {
    const query = searchQuery.toLowerCase();
    if (activeTab === TabType.YARD) {
      return yardData.filter(item => 
        item.location.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      );
    }
    if (activeTab === TabType.BERTH) {
      return berthData.filter(item => 
        item.berthCode.toLowerCase().includes(query)
      );
    }
    if (activeTab === TabType.BITT) {
      return bittData.filter(item => 
        item.berthCode.toLowerCase().includes(query) ||
        item.bittCode.toLowerCase().includes(query)
      );
    }
    if (activeTab === TabType.EQUIPMENT) {
      return equipmentData.filter(item => 
        item.category.toLowerCase().includes(query) ||
        item.equipmentCode.toLowerCase().includes(query) ||
        item.equipmentName.toLowerCase().includes(query)
      );
    }
    if (activeTab === TabType.GATE) {
      return gateData.filter(item => 
        item.gateCode.toLowerCase().includes(query) ||
        item.gateName.toLowerCase().includes(query)
      );
    }
    return [];
  }, [searchQuery, yardData, berthData, bittData, equipmentData, gateData, activeTab]);

  const toggleSelect = (id: number) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const isAllSelected = useMemo(() => {
    return filteredData.length > 0 && filteredData.every(row => selectedIds.has(row.id));
  }, [filteredData, selectedIds]);

  const handleToggleAll = () => {
    const next = new Set(selectedIds);
    if (isAllSelected) {
      filteredData.forEach(row => next.delete(row.id));
    } else {
      filteredData.forEach(row => next.add(row.id));
    }
    setSelectedIds(next);
  };

  const handleRowClick = (row: any) => {
    setEditingRowId(row.id);
  };

  const handleInputChange = (id: number, field: string, value: any) => {
    if (activeTab === TabType.YARD) {
      setYardData(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
    } else if (activeTab === TabType.BERTH) {
      setBerthData(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
    } else if (activeTab === TabType.BITT) {
      setBittData(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
    } else if (activeTab === TabType.EQUIPMENT) {
      setEquipmentData(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
    } else if (activeTab === TabType.GATE) {
      setGateData(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
    }
  };

  const handleConfirmAdd = (count: number) => {
    // const count is now passed as an argument
    
    if (activeTab === TabType.YARD) {
      const newRows: YardData[] = Array.from({ length: count }, (_, i) => ({
        id: Date.now() + i, 
        location: '',
        description: '',
        capacity: 0,
        type: 'Nội bộ',
        crane: ''
      }));
      const updated = [...newRows, ...yardData].map((item, index) => ({ ...item, id: index + 1 }));
      setYardData(updated);
    } else if (activeTab === TabType.BERTH) {
      const newRows: BerthData[] = Array.from({ length: count }, (_, i) => ({
        id: Date.now() + i,
        berthCode: '',
        depth: 0,
        tonnage: 0,
        fromMeter: 0,
        toMeter: 0,
        type: 'Nội bộ'
      }));
      const updated = [...newRows, ...berthData].map((item, index) => ({ ...item, id: index + 1 }));
      setBerthData(updated);
    } else if (activeTab === TabType.BITT) {
      const newRows: BittData[] = Array.from({ length: count }, (_, i) => ({
        id: Date.now() + i,
        berthCode: 'TT2',
        bittCode: '',
        fromMeter: 0,
        toMeter: 0
      }));
      const updated = [...newRows, ...bittData].map((item, index) => ({ ...item, id: index + 1 }));
      setBittData(updated);
    } else if (activeTab === TabType.EQUIPMENT) {
      const newRows: EquipmentData[] = Array.from({ length: count }, (_, i) => ({
        id: Date.now() + i,
        category: 'Yard Tractor',
        equipmentCode: '',
        equipmentName: '',
        type: 'Nội bộ'
      }));
      const updated = [...newRows, ...equipmentData].map((item, index) => ({ ...item, id: index + 1 }));
      setEquipmentData(updated);
    } else if (activeTab === TabType.GATE) {
      const newRows: GateData[] = Array.from({ length: count }, (_, i) => ({
        id: Date.now() + i,
        gateCode: '',
        gateName: '',
        inOutDirection: 'Vào',
        importExportDirection: 'Nhập'
      }));
      const updated = [...newRows, ...gateData].map((item, index) => ({ ...item, id: index + 1 }));
      setGateData(updated);
    }

    setIsModalOpen(false);

    setEditingRowId(1); 
    setSelectedIds(new Set());
    setToast({ message: `Đã thêm ${count} dòng mới`, visible: true, type: 'success' });
  };

  const handleConfirmDelete = () => {
    if (selectedIds.size === 0) return;
    const deletedCount = selectedIds.size;
    if (activeTab === TabType.YARD) {
      const updated = yardData.filter(item => !selectedIds.has(item.id))
        .map((item, index) => ({ ...item, id: index + 1 }));
      setYardData(updated);
    } else if (activeTab === TabType.BERTH) {
      const updated = berthData.filter(item => !selectedIds.has(item.id))
        .map((item, index) => ({ ...item, id: index + 1 }));
      setBerthData(updated);
    } else if (activeTab === TabType.BITT) {
      const updated = bittData.filter(item => !selectedIds.has(item.id))
        .map((item, index) => ({ ...item, id: index + 1 }));
      setBittData(updated);
    } else if (activeTab === TabType.EQUIPMENT) {
      const updated = equipmentData.filter(item => !selectedIds.has(item.id))
        .map((item, index) => ({ ...item, id: index + 1 }));
      setEquipmentData(updated);
    } else if (activeTab === TabType.GATE) {
      const updated = gateData.filter(item => !selectedIds.has(item.id))
        .map((item, index) => ({ ...item, id: index + 1 }));
      setGateData(updated);
    }
    setSelectedIds(new Set());
    setEditingRowId(null);
    setIsDeleteModalOpen(false);
    setToast({ message: `Đã xóa thành công ${deletedCount} dòng`, visible: true, type: 'success' });
  };

  const handleSaveAll = () => {
    setEditingRowId(null);
    setToast({ message: "Dữ liệu đã được lưu thành công!", visible: true, type: 'success' });
  };

  const renderEditableCell = (id: number, field: string, value: any, type: 'text' | 'number' | 'select' = 'text', options?: string[]) => {
    const isEditing = editingRowId === id;
    if (!isEditing) {
      if (type === 'number') return value.toLocaleString();
      return value || '---';
    }

    if (type === 'select') {
      return (
        <select 
          value={value}
          onChange={(e) => handleInputChange(id, field, e.target.value)}
          className="w-full px-2 py-1 bg-white border border-blue-300 rounded focus:ring-2 focus:ring-blue-500/20 outline-none text-sm cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25em_1.25em] bg-[right_0.5rem_center] bg-no-repeat pr-8"
          onClick={(e) => e.stopPropagation()}
        >
          {options?.map(opt => <option key={opt} value={opt}>{opt || '(Trống)'}</option>)}
        </select>
      );
    }

    return (
      <input
        type={type}
        value={value}
        onChange={(e) => handleInputChange(id, field, type === 'number' ? parseInt(e.target.value) || 0 : e.target.value)}
        className="w-full px-2 py-1 bg-white border border-blue-300 rounded focus:ring-2 focus:ring-blue-500/20 outline-none text-sm"
        onClick={(e) => e.stopPropagation()}
        autoFocus={field === 'location' || field === 'berthCode' || field === 'bittCode' || field === 'equipmentCode' || field === 'gateCode'}
      />
    );
  };

  const craneOptions = ['', 'KM 20-1', 'KM 20-2', 'KM 30-1', 'KM 30-2', 'KM 30-3', 'KO32-1', 'KO32-2'];
  const berthCodeOptions = ['K12', 'K12A', 'K12B', 'K12C', 'TT2'];
  const categoryOptions = ['Folk Lift', 'Gantry Crane', 'Romooc', 'Tranfer Crane', 'Vessel Crane', 'Yard Tractor'];
  const inOutOptions = ['Vào', 'Ra'];
  const importExportOptions = ['Nhập', 'Xuất'];

  const yardColumns = [
    { header: 'STT', accessor: 'id' as keyof YardData, align: 'center' as const, width: '60px' },
    { 
      header: 'Vị trí', 
      accessor: 'location' as keyof YardData,
      align: 'center' as const,
      render: (item: YardData) => (
        editingRowId === item.id 
          ? renderEditableCell(item.id, 'location', item.location)
          : <span className="font-mono font-medium text-blue-700 bg-blue-50 px-2 py-1 rounded border border-blue-100">{item.location || '---'}</span>
      )
    },
    { header: 'Diễn giải', accessor: 'description' as keyof YardData, align: 'left' as const, render: (item: YardData) => renderEditableCell(item.id, 'description', item.description) },
    { header: 'Sức chứa', accessor: 'capacity' as keyof YardData, align: 'center' as const, render: (item: YardData) => renderEditableCell(item.id, 'capacity', item.capacity, 'number') },
    { header: 'Thuê', accessor: 'type' as keyof YardData, align: 'center' as const, render: (item: YardData) => renderEditableCell(item.id, 'type', item.type, 'select', ['Nội bộ', 'Thuê']) },
    { header: 'Xe nâng bãi', accessor: 'crane' as keyof YardData, align: 'center' as const, render: (item: YardData) => renderEditableCell(item.id, 'crane', item.crane, 'select', craneOptions) },
  ];

  const berthColumns = [
    { header: 'STT', accessor: 'id' as keyof BerthData, align: 'center' as const, width: '60px' },
    { 
      header: 'Mã bến', 
      accessor: 'berthCode' as keyof BerthData,
      align: 'center' as const,
      render: (item: BerthData) => (
        editingRowId === item.id 
          ? renderEditableCell(item.id, 'berthCode', item.berthCode)
          : <span className="font-semibold text-indigo-700">{item.berthCode || '---'}</span>
      )
    },
    { header: 'Độ sâu (m)', accessor: 'depth' as keyof BerthData, align: 'center' as const, render: (item: BerthData) => renderEditableCell(item.id, 'depth', item.depth, 'number') },
    { header: 'Trọng tải', accessor: 'tonnage' as keyof BerthData, align: 'center' as const, render: (item: BerthData) => renderEditableCell(item.id, 'tonnage', item.tonnage, 'number') },
    { header: 'Từ mét', accessor: 'fromMeter' as keyof BerthData, align: 'center' as const, render: (item: BerthData) => renderEditableCell(item.id, 'fromMeter', item.fromMeter, 'number') },
    { header: 'Đến mét', accessor: 'toMeter' as keyof BerthData, align: 'center' as const, render: (item: BerthData) => renderEditableCell(item.id, 'toMeter', item.toMeter, 'number') },
    { header: 'Thuê', accessor: 'type' as keyof BerthData, align: 'center' as const, render: (item: BerthData) => renderEditableCell(item.id, 'type', item.type, 'select', ['Nội bộ', 'Thuê']) },
  ];

  const bittColumns = [
    { header: 'STT', accessor: 'id' as keyof BittData, align: 'center' as const, width: '60px' },
    { header: 'Mã bến', accessor: 'berthCode' as keyof BittData, align: 'center' as const, render: (item: BittData) => renderEditableCell(item.id, 'berthCode', item.berthCode, 'select', berthCodeOptions) },
    { header: 'Mã bitt', accessor: 'bittCode' as keyof BittData, align: 'center' as const, render: (item: BittData) => renderEditableCell(item.id, 'bittCode', item.bittCode) },
    { header: 'Từ mét', accessor: 'fromMeter' as keyof BittData, align: 'center' as const, render: (item: BittData) => renderEditableCell(item.id, 'fromMeter', item.fromMeter, 'number') },
    { header: 'Đến mét', accessor: 'toMeter' as keyof BittData, align: 'center' as const, render: (item: BittData) => renderEditableCell(item.id, 'toMeter', item.toMeter, 'number') },
  ];

  const equipmentColumns = [
    { header: 'STT', accessor: 'id' as keyof EquipmentData, align: 'center' as const, width: '60px' },
    { 
      header: 'Loại thiết bị', 
      accessor: 'category' as keyof EquipmentData, 
      align: 'center' as const, 
      render: (item: EquipmentData) => renderEditableCell(item.id, 'category', item.category, 'select', categoryOptions) 
    },
    { header: 'Mã thiết bị', accessor: 'equipmentCode' as keyof EquipmentData, align: 'center' as const, render: (item: EquipmentData) => renderEditableCell(item.id, 'equipmentCode', item.equipmentCode) },
    { header: 'Tên thiết bị', accessor: 'equipmentName' as keyof EquipmentData, align: 'center' as const, render: (item: EquipmentData) => renderEditableCell(item.id, 'equipmentName', item.equipmentName) },
    { header: 'Thuê', accessor: 'type' as keyof EquipmentData, align: 'center' as const, render: (item: EquipmentData) => renderEditableCell(item.id, 'type', item.type, 'select', ['Nội bộ', 'Thuê']) },
  ];

  const gateColumns = [
    { header: 'STT', accessor: 'id' as keyof GateData, align: 'center' as const, width: '60px' },
    { header: 'Mã cổng', accessor: 'gateCode' as keyof GateData, align: 'center' as const, render: (item: GateData) => renderEditableCell(item.id, 'gateCode', item.gateCode) },
    { header: 'Tên cổng', accessor: 'gateName' as keyof GateData, align: 'center' as const, render: (item: GateData) => renderEditableCell(item.id, 'gateName', item.gateName) },
    { 
      header: 'Hướng vào/ Ra', 
      accessor: 'inOutDirection' as keyof GateData, 
      align: 'center' as const, 
      render: (item: GateData) => renderEditableCell(item.id, 'inOutDirection', item.inOutDirection, 'select', inOutOptions) 
    },
    { 
      header: 'Hướng Nhập/ Xuất', 
      accessor: 'importExportDirection' as keyof GateData, 
      align: 'center' as const, 
      render: (item: GateData) => renderEditableCell(item.id, 'importExportDirection', item.importExportDirection, 'select', importExportOptions) 
    },
  ];

  return (
    <> 
      {/* Toast Notification Container */}
      {toast?.visible && (
        <div className="fixed top-6 right-6 z-[100] animate-in slide-in-from-right-10 fade-in duration-300">
          <div className={`bg-white border-l-4 ${toast.type === 'error' ? 'border-red-500' : 'border-green-500'} rounded shadow-2xl px-5 py-4 flex items-center gap-4 min-w-[300px]`}>
            <div className={`${toast.type === 'error' ? 'bg-red-100' : 'bg-green-100'} p-2 rounded-full`}>
              {toast.type === 'error' ? <AlertTriangle className="text-red-600" size={20} /> : <ICONS.CheckCircle2 className="text-green-600" size={20} />}
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">Thông báo</p>
              <p className="text-sm text-slate-500">{toast.message}</p>
            </div>
            <button onClick={() => setToast(prev => prev ? { ...prev, visible: false } : null)} className="ml-auto text-slate-300 hover:text-slate-500 transition-colors">
              <ICONS.XCircle size={18} />
            </button>
          </div>
        </div>
      )}

      <div className="space-y-6 animate-in fade-in duration-500 mt-5">
        <div className="bg-white rounded shadow-sm border border-slate-200 p-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="bg-slate-50 p-1 rounded border border-slate-200 inline-flex flex-wrap shadow-inner">
              {TABS_CONFIG.map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setSelectedIds(new Set());
                      setEditingRowId(null);
                    }}
                    className={`flex items-center gap-2.5 px-6 py-2 rounded text-sm font-semibold transition-all duration-200 ${isActive ? 'bg-blue-600 text-white shadow-md shadow-blue-200 translate-y-[-1px]' : 'text-slate-500 hover:text-slate-700 hover:bg-white hover:shadow-sm'}`}
                  >
                    <Icon size={18} className={isActive ? 'text-white' : 'text-slate-400'} />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button onClick={() => setIsDeleteModalOpen(true)} disabled={selectedIds.size === 0} className={`flex items-center gap-2 px-4 py-2 border rounded font-semibold text-sm transition-all active:scale-95 shadow-sm ${selectedIds.size > 0 ? 'bg-white border-red-200 text-red-600 hover:bg-red-50' : 'bg-slate-50 border-slate-200 text-slate-300 cursor-not-allowed'}`}>
                <ICONS.Trash2 size={18} />
                <span>Xóa dòng</span>
              </button>
              <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-white border border-blue-200 text-blue-600 rounded hover:bg-blue-50 font-semibold text-sm transition-all active:scale-95 shadow-sm">
                <ICONS.Plus size={18} />
                <span>Thêm dòng</span>
              </button>
              <button onClick={handleSaveAll} className="flex items-center gap-2 px-6 py-2 bg-white border border-orange-500 text-orange-600 rounded hover:bg-orange-50 font-bold text-sm transition-all active:scale-95 shadow-sm">
                <ICONS.Save size={18} className="text-orange-600" />
                <span>Lưu</span>
              </button>
            </div>
          </div>
        </div>

        <div ref={tableContainerRef} className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-700">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 bg-white border-b border-slate-100">
            <div className="relative flex-1 max-w-md group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <ICONS.Search size={18} className="text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input type="text" placeholder={`Tìm kiếm trong ${activeTab.toLowerCase()}...`} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="block w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded leading-5 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm" />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-sm font-medium text-slate-500">
                Tổng số:<span className="text-blue-600 font-bold ml-1">{filteredData.length} dòng</span>
              </div>
            </div>
          </div>

          <div className="bg-white">
            {activeTab === TabType.YARD && <DataTable columns={yardColumns} data={filteredData as YardData[]} selectedIds={selectedIds} onToggleSelect={toggleSelect} onToggleAll={handleToggleAll} isAllSelected={isAllSelected} onRowClick={handleRowClick} editingId={editingRowId} />}
            {activeTab === TabType.BERTH && <DataTable columns={berthColumns} data={filteredData as BerthData[]} selectedIds={selectedIds} onToggleSelect={toggleSelect} onToggleAll={handleToggleAll} isAllSelected={isAllSelected} onRowClick={handleRowClick} editingId={editingRowId} />}
            {activeTab === TabType.BITT && <DataTable columns={bittColumns} data={filteredData as BittData[]} selectedIds={selectedIds} onToggleSelect={toggleSelect} onToggleAll={handleToggleAll} isAllSelected={isAllSelected} onRowClick={handleRowClick} editingId={editingRowId} />}
            {activeTab === TabType.EQUIPMENT && <DataTable columns={equipmentColumns} data={filteredData as EquipmentData[]} selectedIds={selectedIds} onToggleSelect={toggleSelect} onToggleAll={handleToggleAll} isAllSelected={isAllSelected} onRowClick={handleRowClick} editingId={editingRowId} />}
            {activeTab === TabType.GATE && <DataTable columns={gateColumns} data={filteredData as GateData[]} selectedIds={selectedIds} onToggleSelect={toggleSelect} onToggleAll={handleToggleAll} isAllSelected={isAllSelected} onRowClick={handleRowClick} editingId={editingRowId} />}
          </div>
        </div>
      </div>
      
      <AddRowsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmAdd}
      />

       <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        count={selectedIds.size}
        entityName="dòng"
      />
    </>
  );
};

export default Page;
