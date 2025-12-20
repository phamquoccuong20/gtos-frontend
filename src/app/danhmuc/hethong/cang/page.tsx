'use client';

import React, { useState, useCallback, useRef } from 'react';
import PortTable from './components/Table/PortTable';
import { INITIAL_PORTS } from './constants';
import { Port } from './types';

const CangPage: React.FC = () => {
  const [ports, setPorts] = useState<Port[]>(INITIAL_PORTS);
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Lưu trữ bản sao dữ liệu cuối cùng đã được "Lưu"
  const lastSavedPorts = useRef<string>(JSON.stringify(INITIAL_PORTS));

  const checkDirty = (currentPorts: Port[]) => {
    setIsDirty(JSON.stringify(currentPorts) !== lastSavedPorts.current);
  };

  const handleDeletePort = useCallback((id: string) => {
    setPorts(prev => {
      const next = prev.filter(p => p.id !== id);
      checkDirty(next);
      return next;
    });
  }, []);

  const handleAddPort = useCallback((count: number) => {
    const newPorts: Port[] = Array.from({ length: count }).map((_, i) => ({
      id: Math.random().toString(36).substr(2, 9),
      stt: 0, // Sẽ được đánh lại khi nhấn Lưu, tạm thời để 0 hoặc STT ảo
      country: '',
      code: '',
      name: '',
      status: 'active' as const
    }));
    
    setPorts(prev => {
      const next = [...newPorts, ...prev];
      setIsDirty(true);
      return next;
    });
  }, []);

  const handleUpdatePort = useCallback((updatedPort: Port) => {
    setPorts(prev => {
      const next = prev.map(p => p.id === updatedPort.id ? updatedPort : p);
      checkDirty(next);
      return next;
    });
  }, []);

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    // Giả lập gọi API lưu dữ liệu
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Đánh lại số thứ tự STT: Hàng mới nhất (đầu mảng) là 1
    const reIndexedPorts = ports.map((port, index) => ({
      ...port,
      stt: index + 1
    }));
    
    setPorts(reIndexedPorts);
    lastSavedPorts.current = JSON.stringify(reIndexedPorts);
    setIsDirty(false);
    setIsSaving(false);
    
    console.log("Dữ liệu đã được lưu và đánh lại STT thành công!");
  }, [ports]);

  return (
    <div className="flex-1 bg-white rounded-[4px] shadow-[0_1px_2px_0_rgba(0,0,0,0.03),0_1px_6px_-1px_rgba(0,0,0,0.02),0_2px_4px_0_rgba(0,0,0,0.02)] overflow-hidden border border-[#f0f0f0]">
      <PortTable 
        ports={ports} 
        onDelete={handleDeletePort} 
        onAdd={handleAddPort} 
        onUpdate={handleUpdatePort}
        onSave={handleSave}
        isDirty={isDirty}
        isSaving={isSaving}
      />
    </div>
  );
};

export default CangPage;
