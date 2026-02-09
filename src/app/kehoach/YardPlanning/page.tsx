"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { VESSELS, CARGO_SUMMARY as INITIAL_CARGO } from './data';
import { FilterState, YardBlock, CargoSummary, Vessel, YardBlockContent } from './types';
import FilterBar from './components/FilterBar';
import YardCard from './components/YardCard';
import Modal from './components/Modal';
import AlertModal from './components/AlertModal';
import { UploadCloud, Plus, RefreshCw, Box, Layers, ArrowRight, Ship, AlertCircle, Check, Search, Inbox, FileQuestion } from './components/Icons';
import { useYardData } from '@/context/YardContext';

const Page: React.FC = () => {
  // --- GET DATA FROM CONTEXT ---
  const { yardData, yardBlockInfos, setYardBlockInfos } = useYardData();

  // --- STATE ---
  const [filters, setFilters] = useState<FilterState>({
    vesselId: null,
    cargoType: null,
    hatch: null,
    dateRange: { start: '2025-12-03', end: '2025-12-10' }
  });

  // Dynamic Data States
  const [cargoList, setCargoList] = useState<CargoSummary[]>(INITIAL_CARGO);
  
  // Generate yardBlocks from cmBlock yardData
  const [yardBlocks, setYardBlocks] = useState<YardBlock[]>([]);
  
  // Zones list for distribution
  const zones = ['Hầm 1', 'Hầm 2', 'Hầm 3', 'Hầm 4'];
  
  // Generate yard blocks from cmBlock data
  useEffect(() => {
    const blocks: YardBlock[] = yardData.map((yard, index) => {
      // Check if there's existing content from yardBlockInfos
      const blockInfo = yardBlockInfos.find(info => info.yardId === yard.id);
      
      return {
        id: `b${yard.id}`,
        name: yard.location,
        zone: zones[index % zones.length],
        vesselName: blockInfo?.contents[0]?.vesselName || '',
        vesselCode: blockInfo?.contents[0]?.vesselCode || '',
        contents: blockInfo?.contents || [],
        capacityCurrent: blockInfo?.currentValue || 0,
        capacityMax: yard.capacity,
        status: 'active' as const
      };
    });
    setYardBlocks(blocks);
  }, [yardData, yardBlockInfos]);

  // Selection States
  const [selectedCargoId, setSelectedCargoId] = useState<string | null>(null);

  // UI States
  const [isLoading, setIsLoading] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  // Modal States
  const [isVesselModalOpen, setIsVesselModalOpen] = useState(false);
  const [isAddToYardModalOpen, setIsAddToYardModalOpen] = useState(false);

  // New State for Viewing Details
  const [viewingYardBlock, setViewingYardBlock] = useState<YardBlock | null>(null);
  const [isViewDetailsModalOpen, setIsViewDetailsModalOpen] = useState(false);

  const [pendingYardBlock, setPendingYardBlock] = useState<YardBlock | null>(null);
  const [quantityInput, setQuantityInput] = useState<number>(1);

  // Vessel Search States (inside modal)
  const [vesselSearchQuery, setVesselSearchQuery] = useState('');
  const [vesselYearFilter, setVesselYearFilter] = useState('2025');
  const [vesselStatusFilter, setVesselStatusFilter] = useState<'all' | 'arriving' | 'departing'>('all');

  // Notification
  const [notification, setNotification] = useState<{ message: string, type: 'error' | 'success' } | null>(null);

  // Alert Modal State
  const [alertModal, setAlertModal] = useState<{ isOpen: boolean; type: 'error' | 'warning' | 'success'; title: string; message: string }>({ isOpen: false, type: 'error', title: '', message: '' });

  // --- RESET FUNCTION ---
  const handleReset = () => {
    setIsResetting(true);

    // Simulate loading and reset after animation
    setTimeout(() => {
      // Reset all data to initial state
      setFilters({
        vesselId: null,
        cargoType: null,
        hatch: null,
        dateRange: { start: '2025-12-03', end: '2025-12-10' }
      });
      setCargoList(INITIAL_CARGO);
      setYardBlocks([]); // Will be regenerated from yardData
      setYardBlockInfos([]); // Clear cargo assignments
      setSelectedCargoId(null);
      setPendingYardBlock(null);
      setQuantityInput(1);
      setVesselSearchQuery('');
      setVesselYearFilter('2025');
      setVesselStatusFilter('all');
      setNotification(null);

      setIsResetting(false);
    }, 800);
  };

  // --- DERIVED STATE ---
  const selectedVesselObj = VESSELS.find(v => v.id === filters.vesselId);

  // Filter Cargo based on Selected Vessel
  const filteredCargoList = filters.vesselId
    ? cargoList.filter(c => c.vesselId === filters.vesselId)
    : [];

  // Get Available Hatches based on Selected Vessel
  const availableHatches = selectedVesselObj?.hatches || [];

  // --- EFFECTS ---

  useEffect(() => {
    if (filters.vesselId) {
      setIsLoading(true);
      // Simulate API call delay when switching vessels
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);

      // Reset cargo selection when vessel changes
      setSelectedCargoId(null);

      return () => clearTimeout(timer);
    }
  }, [filters.vesselId]);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // --- HANDLERS ---

  const handleVesselSelectFromModal = (vessel: Vessel) => {
    setFilters(prev => ({ ...prev, vesselId: vessel.id }));
    setIsVesselModalOpen(false);
  };

  const handleCargoClick = (id: string) => {
    setSelectedCargoId(prev => prev === id ? null : id);
  };

  const handleYardBlockClick = (block: YardBlock) => {
    // If user clicked the card to ADD cargo
    if (!selectedCargoId) {
      setNotification({ message: "Vui lòng chọn hàng hóa trước khi chọn bãi.", type: 'error' });
      return;
    }

    const cargo = cargoList.find(c => c.id === selectedCargoId);
    if (!cargo || cargo.count <= 0) {
      setNotification({ message: "Hàng hóa này đã hết hoặc không hợp lệ.", type: 'error' });
      return;
    }

    setPendingYardBlock(block);
    setQuantityInput(1); // Reset input default
    setIsAddToYardModalOpen(true);
  };

  // Handler for clicking the Info icon
  const handleViewYardDetails = (block: YardBlock) => {
    setViewingYardBlock(block);
    setIsViewDetailsModalOpen(true);
  };

  const confirmAddToYard = () => {
    if (!pendingYardBlock || !selectedCargoId) return;

    const cargo = cargoList.find(c => c.id === selectedCargoId);
    if (!cargo) return;

    const qtyToAdd = Number(quantityInput);

    if (qtyToAdd <= 0) {
      setAlertModal({
        isOpen: true,
        type: 'warning',
        title: 'Số lượng không hợp lệ',
        message: 'Số lượng phải lớn hơn 0. Vui lòng nhập số lượng hợp lệ.'
      });
      return;
    }

    if (qtyToAdd > cargo.count) {
      setAlertModal({
        isOpen: true,
        type: 'error',
        title: 'Không đủ hàng!',
        message: `Số lượng yêu cầu (${qtyToAdd}) vượt quá số lượng còn lại. Chỉ còn ${cargo.count} ${cargo.unit} trong kho.`
      });
      return;
    }

    // 1. Deduct from Cargo List
    setCargoList(prev => prev.map(c =>
      c.id === selectedCargoId ? { ...c, count: c.count - qtyToAdd } : c
    ));

    const weightToAdd = (cargo.weightPerUnit || 1) * qtyToAdd;
    const currentVessel = VESSELS.find(v => v.id === cargo.vesselId);

    // 2. Add to Yard Block (local state)
    setYardBlocks(prev => prev.map(block => {
      if (block.id !== pendingYardBlock.id) return block;

      const existingContentIndex = block.contents.findIndex(c => c.cargoId === selectedCargoId);

      let newContents = [...block.contents];

      // Add vessel info to the content item itself
      if (existingContentIndex >= 0) {
        newContents[existingContentIndex] = {
          ...newContents[existingContentIndex],
          quantity: newContents[existingContentIndex].quantity + qtyToAdd,
          weight: newContents[existingContentIndex].weight + weightToAdd
        };
      } else {
        newContents.push({
          cargoId: cargo.id,
          cargoName: cargo.name,
          quantity: qtyToAdd,
          unit: cargo.unit,
          color: cargo.color,
          weight: weightToAdd,
          vesselName: currentVessel?.name,
          vesselCode: currentVessel?.code
        });
      }

      return {
        ...block,
        contents: newContents,
        capacityCurrent: block.capacityCurrent + weightToAdd,
        // Only set block vessel name if it was previously empty
        vesselName: block.vesselName || (currentVessel ? currentVessel.name : ''),
        vesselCode: block.vesselCode || (currentVessel ? currentVessel.code : ''),
      };
    }));

    // 3. Sync to Context (for cmBlockDesign)
    const yardId = parseInt(pendingYardBlock.id.replace('b', ''));
    const newContent = {
      cargoId: cargo.id,
      cargoName: cargo.name,
      quantity: qtyToAdd,
      unit: cargo.unit,
      color: cargo.color,
      weight: weightToAdd,
      vesselName: currentVessel?.name,
      vesselCode: currentVessel?.code
    };

    setYardBlockInfos(prev => {
      const existingIndex = prev.findIndex(info => info.yardId === yardId);
      const yard = yardData.find(y => y.id === yardId);
      
      if (existingIndex >= 0) {
        // Update existing yard block info
        const updated = [...prev];
        const existingContentIndex = updated[existingIndex].contents.findIndex(c => c.cargoId === cargo.id);
        
        if (existingContentIndex >= 0) {
          // Update existing cargo
          updated[existingIndex].contents[existingContentIndex] = {
            ...updated[existingIndex].contents[existingContentIndex],
            quantity: updated[existingIndex].contents[existingContentIndex].quantity + qtyToAdd,
            weight: updated[existingIndex].contents[existingContentIndex].weight + weightToAdd
          };
        } else {
          // Add new cargo
          updated[existingIndex].contents.push(newContent);
        }
        updated[existingIndex].currentValue += weightToAdd;
        return updated;
      } else {
        // Create new yard block info
        return [...prev, {
          yardId,
          location: yard?.location || pendingYardBlock.name,
          contents: [newContent],
          currentValue: weightToAdd
        }];
      }
    });

    setNotification({ message: `Đã thêm ${qtyToAdd} ${cargo.unit} ${cargo.name} vào bãi ${pendingYardBlock.name}`, type: 'success' });
    setIsAddToYardModalOpen(false);
    setPendingYardBlock(null);
  };

  // --- FILTERED VESSELS FOR MODAL ---
  const filteredVessels = VESSELS.filter(v => {
    const matchesSearch = v.name.toLowerCase().includes(vesselSearchQuery.toLowerCase()) ||
      v.code.toLowerCase().includes(vesselSearchQuery.toLowerCase());
    const matchesYear = v.year === vesselYearFilter;
    const matchesStatus = vesselStatusFilter === 'all' ||
      (vesselStatusFilter === 'arriving' && (v.status === 'arriving' || v.status === 'at_port')) ||
      (vesselStatusFilter === 'departing' && v.status === 'departed');
    return matchesSearch && matchesYear && matchesStatus;
  });

  // --- RENDER HELPERS ---
  const selectedCargoObj = cargoList.find(c => c.id === selectedCargoId);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans relative flex flex-col">

      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-20 right-6 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-fade-in-up
          ${notification.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}`}>
          {notification.type === 'error' ? <AlertCircle size={20} /> : <Check size={20} />}
          <span className="font-medium">{notification.message}</span>
        </div>
      )}

      {/* Top Header */}
      {/* Top Header */}
      <header className="shrink-0 pt-[14px] px-[14px]">
        <div className="max-w-[1600px] mx-auto bg-white rounded border border-slate-200 shadow-sm p-[14px] h-auto sm:h-20 flex flex-col sm:flex-row items-center justify-between gap-[14px]">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 text-white p-2.5 rounded shadow-blue-200 shadow-md">
              <Layers size={22} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">Kế hoạch bãi</h1>
              <p className="text-xs text-slate-500 font-medium">Quản lý và sắp xếp vị trí container</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-600 bg-slate-50 border border-slate-200 rounded hover:bg-white hover:border-blue-300 hover:text-blue-600 transition-all shadow-sm">
              <UploadCloud size={18} />
              <span className="hidden sm:inline">Nạp dữ liệu</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-blue-600 rounded hover:bg-blue-700 shadow-lg shadow-blue-200 hover:shadow-blue-300 transition-all">
              <Plus size={18} />
              <span className="hidden sm:inline">Tạo kế hoạch</span>
            </button>
            <button
              onClick={handleReset}
              disabled={isResetting}
              className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors border border-transparent hover:border-blue-100 disabled:opacity-50"
              title="Làm mới - Xóa hết dữ liệu"
            >
              <RefreshCw size={20} className={`transition-transform duration-700 ${isResetting ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-[1600px] mx-auto px-[14px] py-[14px] flex flex-col min-h-0 overflow-y-auto">

        {/* Filters */}
        <FilterBar
          vessels={VESSELS}
          filters={filters}
          setFilters={setFilters}
          onOpenVesselModal={() => setIsVesselModalOpen(true)}
          availableHatches={availableHatches}
        />

        <div className="flex-1 flex flex-col lg:flex-row gap-[14px] items-start min-h-0 h-full">

          {/* Left Sidebar: Cargo List */}
          <aside className="w-full lg:w-80 shrink-0 transition-all duration-300 h-[409px]">
            <div className="bg-white rounded border border-slate-200 shadow-sm overflow-hidden sticky top-48 min-h-[300px] h-[409px]">
              <div className="p-[14px] border-b border-slate-100 flex justify-between items-center bg-slate-50/80 backdrop-blur">
                <h2 className="font-bold text-slate-800 flex items-center gap-2">
                  <Box size={18} className="text-slate-500" />
                  Danh sách hàng hóa
                </h2>
                {filters.vesselId && (
                  <span className="text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full font-bold">
                    {filteredCargoList.filter(c => c.count > 0).length}
                  </span>
                )}
              </div>

              <div className="divide-y divide-slate-50 max-h-[60vh] overflow-y-auto">
                {/* Condition: No Vessel Selected -> Show "No Data" Empty State */}
                {!filters.vesselId ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center px-4">
                    <div className="bg-slate-50 p-[14px] rounded-full mb-3 text-slate-300">
                      <Inbox size={32} />
                    </div>
                    <p className="text-sm font-medium text-slate-400">No data</p>
                  </div>
                ) : (
                  <>
                    {/* Condition: Vessel Selected but List Empty */}
                    {filteredCargoList.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-10 text-center px-4">
                        <p className="text-sm text-slate-500">Chưa có hàng hóa cho tàu này.</p>
                      </div>
                    ) : (
                      /* Standard List Rendering */
                      filteredCargoList.map(item => {
                        const isSelected = selectedCargoId === item.id;
                        const isOut = item.count === 0;
                        return (
                          <div
                            key={item.id}
                            onClick={() => !isOut && handleCargoClick(item.id)}
                            className={`p-[14px] transition-all cursor-pointer relative
                                ${isOut ? 'opacity-50 bg-slate-50 pointer-events-none' : 'hover:bg-blue-50/50'}
                                ${isSelected ? 'bg-blue-50 border-l-4 border-blue-500 shadow-inner' : 'border-l-4 border-transparent'}
                              `}
                          >
                            <div className="flex justify-between items-center mb-1">
                              <span className={`font-medium transition-colors ${isSelected ? 'text-blue-700' : 'text-slate-700'}`}>
                                {item.name}
                              </span>
                              <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${item.color}`}>
                                {item.unit}
                              </div>
                            </div>
                            <div className="flex justify-between items-center text-sm mt-2">
                              <div className="w-full mr-4">
                                <div className="flex justify-between text-xs text-slate-500 mb-1">
                                  <span>Còn lại</span>
                                  <span>{item.count} / {item.initialCount}</span>
                                </div>
                                <div className="w-full bg-slate-200 rounded-full h-1.5">
                                  <div
                                    className="bg-slate-400 h-1.5 rounded-full transition-all"
                                    style={{ width: `${(item.count / item.initialCount) * 100}%` }}
                                  />
                                </div>
                              </div>
                              {isSelected && <Check size={16} className="text-blue-600 shrink-0 animate-in zoom-in" />}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </>
                )}
              </div>

              {filters.vesselId && filteredCargoList.length > 0 && (
                <div className="p-[14px] bg-slate-50 text-center border-t border-slate-100">
                  <p className="text-xs text-slate-400">Chọn hàng hóa rồi nhấn vào bãi để xếp</p>
                </div>
              )}
            </div>
          </aside>

          {/* Main Content Area: Yard Grid */}
          <div className="flex-1 w-full min-h-0 overflow-hidden flex flex-col bg-slate-100/50 rounded border border-slate-200">
            {/* Scrollable Container */}
            <div className="h-[409px] overflow-auto p-[14px]">
              {/* Case 1: No Vessel Selected (Empty State) */}
              {!filters.vesselId && (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="bg-slate-100 p-[14px] rounded-full mb-4 text-slate-300">
                    <FileQuestion size={48} />
                  </div>
                  <p className="text-slate-400 font-medium">Không có kế hoạch phù hợp</p>
                </div>
              )}

              {/* Case 2: Loading */}
              {isLoading && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-[14px]">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
                    <div key={i} className="bg-white rounded border border-slate-100 shadow-sm h-64 p-[14px] animate-pulse">
                      <div className="flex justify-between mb-6">
                        <div className="h-6 bg-slate-200 rounded w-1/3"></div>
                        <div className="h-6 bg-slate-200 rounded w-1/6"></div>
                      </div>
                      <div className="space-y-4">
                        <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                        <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Case 3: Data Loaded */}
              {!isLoading && filters.vesselId && (
                <div className="grid grid-cols-5 gap-[14px] min-w-[1400px]">
                  {yardBlocks.map(block => (
                    <YardCard
                      key={block.id}
                      data={block}
                      onClick={handleYardBlockClick}
                      onViewDetails={handleViewYardDetails}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* --- MODALS (No changes required for basic modal logic in this step) --- */}
      {/* 1. Vessel Selection Modal */}
      <Modal
        isOpen={isVesselModalOpen}
        onClose={() => setIsVesselModalOpen(false)}
        title="Danh mục tàu"
        size="5xl"
      >
        <div className="flex flex-col gap-6">
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <div className="grid grid-cols-12 gap-4 items-end">
              <div className="col-span-12 md:col-span-4">
                <label className="text-xs font-semibold text-slate-500 uppercase mb-1 block">Tìm kiếm tàu</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Nhập tên tàu hoặc mã..."
                    value={vesselSearchQuery}
                    onChange={(e) => setVesselSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                  />
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
              </div>
              <div className="col-span-6 md:col-span-3">
                <label className="text-xs font-semibold text-slate-500 uppercase mb-1 block">Năm</label>
                <select
                  value={vesselYearFilter}
                  onChange={(e) => setVesselYearFilter(e.target.value)}
                  className="w-full px-3 py-2 rounded border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-white"
                >
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                </select>
              </div>
              <div className="col-span-6 md:col-span-5 flex items-center gap-4 pb-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="vesselStatus"
                    checked={vesselStatusFilter === 'all'}
                    onChange={() => setVesselStatusFilter('all')}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-slate-700">Tất cả</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="vesselStatus"
                    checked={vesselStatusFilter === 'arriving'}
                    onChange={() => setVesselStatusFilter('arriving')}
                    className="text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-sm font-medium text-emerald-700">Đến cảng</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="vesselStatus"
                    checked={vesselStatusFilter === 'departing'}
                    onChange={() => setVesselStatusFilter('departing')}
                    className="text-orange-600 focus:ring-orange-500"
                  />
                  <span className="text-sm font-medium text-orange-700">Rời cảng</span>
                </label>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-100/80">
                <tr>
                  <th className="px-4 py-3 font-semibold border-b">STT</th>
                  <th className="px-4 py-3 font-semibold border-b">Tên tàu</th>
                  <th className="px-4 py-3 font-semibold border-b text-center">Chuyến nhập</th>
                  <th className="px-4 py-3 font-semibold border-b text-center">Chuyến xuất</th>
                  <th className="px-4 py-3 font-semibold border-b text-right whitespace-nowrap">ATA</th>
                  <th className="px-4 py-3 font-semibold border-b text-right whitespace-nowrap">ETA (Dự kiến)</th>
                  <th className="px-4 py-3 font-semibold border-b text-right whitespace-nowrap">ETD</th>
                  <th className="px-4 py-3 font-semibold border-b text-center whitespace-nowrap">Lane nhập</th>
                  <th className="px-4 py-3 font-semibold border-b text-center whitespace-nowrap">Lane xuất</th>
                  <th className="px-4 py-3 font-semibold border-b text-center whitespace-nowrap">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredVessels.map((v, index) => (
                  <tr
                    key={v.id}
                    onClick={() => handleVesselSelectFromModal(v)}
                    className="bg-white hover:bg-blue-50 cursor-pointer transition-colors group"
                  >
                    <td className="px-4 py-3 font-medium text-slate-400 group-hover:text-blue-600">{index + 1}</td>
                    <td className="px-4 py-3 font-bold text-slate-800 group-hover:text-blue-700">{v.name}</td>
                    <td className="px-4 py-3 text-center text-slate-600 font-mono bg-slate-50/50">{v.inboundVoy}</td>
                    <td className="px-4 py-3 text-center text-slate-600 font-mono">{v.outboundVoy}</td>
                    <td className="px-4 py-3 text-right text-slate-600 font-mono whitespace-nowrap">{v.ata || '--'}</td>
                    <td className="px-4 py-3 text-right text-slate-600 font-mono whitespace-nowrap">{v.eta}</td>
                    <td className="px-4 py-3 text-right text-slate-600 font-mono whitespace-nowrap">{v.etd}</td>
                    <td className="px-4 py-3 text-center text-slate-600 whitespace-nowrap">{v.inboundLane}</td>
                    <td className="px-4 py-3 text-center text-slate-600 whitespace-nowrap">{v.outboundLane}</td>
                    <td className="px-4 py-3 text-center whitespace-nowrap">
                      {v.status === 'at_port' && <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-bold">Tại cảng</span>}
                      {v.status === 'arriving' && <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full font-bold">Đang đến</span>}
                      {v.status === 'departed' && <span className="px-2 py-1 bg-slate-100 text-slate-500 text-xs rounded-full font-bold">Đã đi</span>}
                    </td>
                  </tr>
                ))}
                {filteredVessels.length === 0 && (
                  <tr>
                    <td colSpan={10} className="text-center py-8 text-slate-400">Không tìm thấy dữ liệu tàu phù hợp</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center text-xs text-slate-500">
            <span>Hiển thị {filteredVessels.length} dòng</span>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium transition-colors" onClick={() => setIsVesselModalOpen(false)}>Đóng</button>
            </div>
          </div>
        </div>
      </Modal>

      {/* 2. Add To Yard Modal */}
      <Modal
        isOpen={isAddToYardModalOpen}
        onClose={() => setIsAddToYardModalOpen(false)}
        title="Xếp hàng vào bãi"
      >
        {pendingYardBlock && selectedCargoObj && (
          <div className="space-y-6">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-slate-400"><Box size={20} /></div>
                <div>
                  <p className="text-xs text-slate-500 uppercase">Hàng hóa</p>
                  <p className="font-bold text-slate-800">{selectedCargoObj.name}</p>
                </div>
              </div>
              <div className="text-slate-300"><ArrowRight size={20} /></div>
              <div className="flex items-center gap-3 text-right">
                <div>
                  <p className="text-xs text-slate-500 uppercase">Vị trí</p>
                  <p className="font-bold text-blue-700">{pendingYardBlock.name}</p>
                </div>
                <div className="text-blue-500"><Layers size={20} /></div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Số lượng nhập ({selectedCargoObj.unit})
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantityInput(Math.max(1, quantityInput - 1))}
                  className="w-10 h-10 rounded border border-slate-200 flex items-center justify-center hover:bg-slate-100 text-slate-600"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantityInput}
                  onChange={(e) => setQuantityInput(Number(e.target.value))}
                  min="1"
                  max={selectedCargoObj.count}
                  className="flex-1 h-10 text-center border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none font-bold text-lg"
                />
                <button
                  onClick={() => setQuantityInput(Math.min(selectedCargoObj.count, quantityInput + 1))}
                  className="w-10 h-10 rounded border border-slate-200 flex items-center justify-center hover:bg-slate-100 text-slate-600"
                >
                  +
                </button>
              </div>
              <div className="flex justify-between mt-2 text-xs">
                <span className="text-slate-500">Khả dụng: {selectedCargoObj.count}</span>
                <button onClick={() => setQuantityInput(selectedCargoObj.count)} className="text-blue-600 hover:underline">Tối đa</button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <button
                onClick={() => setIsAddToYardModalOpen(false)}
                className="px-4 py-3 rounded-lg border border-slate-200 text-slate-600 font-medium hover:bg-slate-50"
              >
                Hủy bỏ
              </button>
              <button
                onClick={confirmAddToYard}
                className="px-4 py-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
              >
                <Check size={18} />
                Xác nhận xếp hàng
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* 3. View Yard Details Modal */}
      <Modal
        isOpen={isViewDetailsModalOpen}
        onClose={() => setIsViewDetailsModalOpen(false)}
        title={viewingYardBlock ? `Chi tiết hàng hóa: ${viewingYardBlock.name}` : 'Chi tiết'}
      >
        {viewingYardBlock && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm font-semibold text-slate-500">Mã tàu: {viewingYardBlock.vesselCode}</span>
              <span className="text-sm font-semibold text-slate-300">|</span>
              <span className="text-sm font-semibold text-slate-500">{viewingYardBlock.zone}</span>
            </div>

            {viewingYardBlock.contents.length > 0 ? (
              <div className="space-y-2">
                {viewingYardBlock.contents.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-10 rounded-sm ${item.color.replace('text-', 'bg-').split(' ')[0].replace('100', '500')}`}></div>
                      <div>
                        <h4 className="font-bold text-slate-800">{item.cargoName}</h4>
                        <p className="text-xs text-blue-600 font-medium">{item.vesselName || viewingYardBlock.vesselName}</p>
                        <p className="text-xs text-slate-500">{item.unit}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-mono font-bold text-lg text-blue-600">{item.quantity}</p>
                      <p className="text-xs text-slate-400 font-medium">{item.weight} Tấn</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-400 border-2 border-dashed border-slate-100 rounded-lg">
                Chưa có hàng hóa nào trong bãi này.
              </div>
            )}

            <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-100">
              <div>
                <span className="text-xs uppercase text-slate-500 font-bold block">Tổng trọng lượng</span>
                <span className="text-xl font-bold text-slate-800">{viewingYardBlock.capacityCurrent} <span className="text-sm text-slate-400 font-normal">/ {viewingYardBlock.capacityMax} Tấn</span></span>
              </div>
              <button
                onClick={() => setIsViewDetailsModalOpen(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-medium rounded hover:bg-slate-200 transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Alert Modal */}
      <AlertModal
        isOpen={alertModal.isOpen}
        type={alertModal.type}
        title={alertModal.title}
        message={alertModal.message}
        onClose={() => setAlertModal({ ...alertModal, isOpen: false })}
      />

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Page;