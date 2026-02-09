'use client';

import React, { useState, useRef, useMemo } from 'react';
import { YardSection } from './types';
import { YardCard, DetailSidebar } from './components';
import { useYardData } from '@/context/YardContext';

// Mảng màu để phân bố cho các khu vực
const COLOR_THEMES = [
  'blue', 'yellow', 'amber', 'indigo', 'emerald', 'rose', 'sky', 'orange',
  'teal', 'cyan', 'violet', 'fuchsia', 'pink', 'lime', 'green', 'stone'
];

export default function CmBlockDesignPage() {
  // Lấy dữ liệu từ context (shared với cmBlock và YardPlanning)
  const { yardData, yardBlockInfos } = useYardData();
  
  // Chuyển đổi yardData từ cmBlock sang định dạng YardSection cho cmBlockDesign
  // Kết hợp với yardBlockInfos để lấy thông tin hàng hóa từ YardPlanning
  const yardSections = useMemo<YardSection[]>(() => {
    return yardData.map((yard, index) => {
      // Tìm thông tin hàng hóa từ yardBlockInfos (được thêm từ YardPlanning)
      const blockInfo = yardBlockInfos.find(info => info.yardId === yard.id);
      
      // Chuyển đổi contents từ YardBlockContent sang YardItem format
      const items = blockInfo?.contents.map((content, idx) => ({
        id: `item-${yard.id}-${idx}`,
        code: content.cargoName,
        quantity: content.quantity,
        weight: content.weight
      })) || [];

      return {
        id: yard.id.toString(),
        name: yard.location,
        label: yard.description,
        capacity: yard.capacity,
        currentValue: blockInfo?.currentValue || 0,
        items: items,
        colorTheme: COLOR_THEMES[index % COLOR_THEMES.length]
      };
    });
  }, [yardData, yardBlockInfos]);

  const [selectedSection, setSelectedSection] = useState<YardSection | null>(null);
  
  // Viewport and Panning Refs
  const viewportRef = useRef<HTMLDivElement>(null);
  const isDraggingMap = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const scrollLeft = useRef(0);
  const scrollTop = useRef(0);
  const [cursorClass, setCursorClass] = useState('cursor-grab');

  // Yard Card Drag & Drop Refs (disabled since yardSections comes from context)
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const handleDragStart = (index: number) => {
    dragItem.current = index;
  };

  const handleDragEnter = (index: number) => {
    dragOverItem.current = index;
    // Drag-drop reordering disabled - data is managed by cmBlock
  };

  const handleDragEnd = () => {
    dragItem.current = null;
    dragOverItem.current = null;
  };

  // Panning Logic
  const onMouseDown = (e: React.MouseEvent) => {
    if (e.target !== e.currentTarget && !(e.target as HTMLElement).classList.contains('panning-zone')) {
      return;
    }

    isDraggingMap.current = true;
    setCursorClass('cursor-grabbing');
    startX.current = e.pageX - (viewportRef.current?.offsetLeft || 0);
    startY.current = e.pageY - (viewportRef.current?.offsetTop || 0);
    scrollLeft.current = viewportRef.current?.scrollLeft || 0;
    scrollTop.current = viewportRef.current?.scrollTop || 0;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingMap.current || !viewportRef.current) return;
    e.preventDefault();
    const x = e.pageX - (viewportRef.current.offsetLeft || 0);
    const y = e.pageY - (viewportRef.current.offsetTop || 0);
    const walkX = (x - startX.current) * 1.5;
    const walkY = (y - startY.current) * 1.5;
    viewportRef.current.scrollLeft = scrollLeft.current - walkX;
    viewportRef.current.scrollTop = scrollTop.current - walkY;
  };

  const onMouseUp = () => {
    isDraggingMap.current = false;
    setCursorClass('cursor-grab');
  };

  return (
    <div className="h-screen bg-[#f1f5f9] flex flex-col overflow-hidden p-[14px]">
      <div className="flex-1 flex flex-col bg-white rounded border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 shrink-0 z-20">
        <div className="max-w-[100vw] mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 bg-blue-600 rounded-[4px] flex items-center justify-center text-white shadow-md shadow-blue-200">
              <i className="fas fa-map-marked-alt text-lg"></i>
            </div>
            <div>
              <p className="text-sm text-blue-600 font-black uppercase tracking-widest leading-none mb-0.5">ĐỊNH NGHĨA SƠ ĐỒ BÃI</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">BẢN ĐỒ TRỰC QUAN 2D</p>
            </div>
          </div>

          <div className="flex items-center gap-4">

            {/* Legend */}
            <div className="hidden lg:flex items-center px-5 py-2 bg-slate-50 rounded-[4px] border border-slate-200 gap-6 shadow-inner">
               <div className="flex items-center gap-2">
                 <div className="w-4 h-4 rounded-[3px] bg-emerald-500 shadow-sm shadow-emerald-100 border border-white"></div>
                 <span className="text-xs font-black text-slate-700 uppercase tracking-tight">Trống</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-4 h-4 rounded-[3px] bg-blue-500 shadow-sm shadow-blue-100 border border-white"></div>
                 <span className="text-xs font-black text-slate-700 uppercase tracking-tight">Hoạt động</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-4 h-4 rounded-[3px] bg-red-500 shadow-sm shadow-red-100 border border-white"></div>
                 <span className="text-xs font-black text-slate-700 uppercase tracking-tight">Đầy bãi</span>
               </div>
            </div>
            
            <button className="px-6 py-2 bg-blue-600 text-white rounded-[4px] hover:bg-blue-700 transition-all shadow-md hover:shadow-xl hover:shadow-blue-200 text-sm font-black flex items-center gap-2 active:scale-95 group">
              <i className="fas fa-save text-sm group-hover:animate-bounce"></i>
              <span>LƯU SƠ ĐỒ</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden flex flex-col relative bg-white">
        {/* Grid View (2D Map) */}
        <div 
          ref={viewportRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          className={`flex-1 overflow-auto relative group/viewport select-none ${cursorClass}`}
        >
          {/* Grid Background */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.05]" 
               style={{ 
                 backgroundImage: `
                   linear-gradient(to right, #64748b 1px, transparent 1px),
                   linear-gradient(to bottom, #64748b 1px, transparent 1px)
                 `, 
                 backgroundSize: '120px 120px' 
               }}>
          </div>
          <div className="absolute inset-0 pointer-events-none opacity-[0.02]" 
               style={{ 
                 backgroundImage: `
                   linear-gradient(to right, #64748b 1px, transparent 1px),
                   linear-gradient(to bottom, #64748b 1px, transparent 1px)
                 `, 
                 backgroundSize: '30px 30px' 
               }}>
          </div>

          <div className="p-12 min-w-[3000px] min-h-[1400px] relative panning-zone">
            <div className="grid grid-cols-8 gap-x-12 gap-y-10 pointer-events-none">
              {yardSections.map((section, index) => (
                <div key={section.id} className="w-[340px] pointer-events-auto">
                  <YardCard 
                    index={index}
                    section={section} 
                    onSelect={setSelectedSection}
                    onDragStart={handleDragStart}
                    onDragEnter={handleDragEnter}
                    onDragEnd={handleDragEnd}
                    isDragging={dragItem.current === index}
                  />
                </div>
              ))}

              {Array.from({ length: 16 }).map((_, i) => (
                <div key={`empty-zone-${i}`} className="w-[340px] h-[320px] border-2 border-dashed border-slate-100 rounded-[4px] flex flex-col items-center justify-center text-slate-200 bg-slate-50/20 group/empty hover:bg-slate-50 transition-colors pointer-events-auto">
                  <div className="w-10 h-10 rounded-[4px] border-2 border-slate-100 flex items-center justify-center group-hover/empty:scale-110 transition-transform">
                    <i className="fas fa-plus opacity-20 group-hover/empty:opacity-50 text-xs"></i>
                  </div>
                  <span className="mt-3 text-[8px] font-black uppercase tracking-[0.2em] opacity-30 group-hover/empty:opacity-60">Vùng quy hoạch {16 + i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      </div>

      {/* Detail Sidebar */}
      <DetailSidebar 
        section={selectedSection} 
        onClose={() => setSelectedSection(null)} 
      />
    </div>
  );
}
