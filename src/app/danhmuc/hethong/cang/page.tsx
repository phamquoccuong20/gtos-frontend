'use client';

import React, { useState, useCallback, useRef } from 'react';
import { DataTable, ColumnDef } from '@/components/DataTable';
import { Anchor } from 'lucide-react';
import EditPortModal from './components/EditPortModal';
import { INITIAL_PORTS } from './constants';
import { Port } from './types';

/** Column definitions for the Port table */
const portColumns: ColumnDef<Port>[] = [
  {
    key: 'country',
    label: 'Quốc gia',
    minWidth: '160px',
    sortable: true,
    render: (value) => (
      <span className="text-[14px] text-slate-700 font-medium">{value || '---'}</span>
    ),
  },
  {
    key: 'code',
    label: 'Mã cảng',
    minWidth: '140px',
    sortable: true,
    render: (value) => (
      <span className={`px-2 py-1 rounded border text-[11px] font-bold font-mono ${value ? 'bg-slate-100 text-slate-800 border-slate-200' : 'bg-orange-50 text-orange-400 border-orange-100 italic'}`}>
        {value || 'CHƯA NHẬP'}
      </span>
    ),
  },
  {
    key: 'name',
    label: 'Tên Cảng Biển',
    minWidth: '240px',
    sortable: true,
    render: (value) => (
      <span className="text-[14px] font-bold text-slate-900">{value || '---'}</span>
    ),
  },
  {
    key: 'status',
    label: 'Trạng thái',
    render: (value) => {
      if (value === 'active') {
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Hoạt động
          </span>
        );
      }
      if (value === 'maintenance') {
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-semibold bg-amber-50 text-amber-600 border border-amber-200 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            Bảo trì
          </span>
        );
      }
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-semibold bg-rose-50 text-rose-600 border border-rose-200 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-rose-500" />
          Đóng cửa
        </span>
      );
    },
  },
];

const CangPage: React.FC = () => {
  const [ports, setPorts] = useState<Port[]>(INITIAL_PORTS);
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingPort, setEditingPort] = useState<Port | null>(null);

  const lastSavedPorts = useRef<string>(JSON.stringify(INITIAL_PORTS));

  const checkDirty = (currentPorts: Port[]) => {
    setIsDirty(JSON.stringify(currentPorts) !== lastSavedPorts.current);
  };

  const handleDeletePort = useCallback((ids: string[]) => {
    setPorts(prev => {
      const idsSet = new Set(ids);
      const next = prev
        .filter(p => !idsSet.has(p.id))
        .map((p, index) => ({ ...p, stt: index + 1 }));
      checkDirty(next);
      return next;
    });
  }, []);

  const handleAddPort = useCallback((count: number) => {
    const newPorts: Port[] = Array.from({ length: count }).map(() => ({
      id: Math.random().toString(36).substr(2, 9),
      stt: 0,
      country: '',
      code: '',
      name: '',
      status: 'active' as const,
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
    await new Promise(resolve => setTimeout(resolve, 800));

    const reIndexedPorts = ports.map((port, index) => ({
      ...port,
      stt: index + 1,
    }));

    setPorts(reIndexedPorts);
    lastSavedPorts.current = JSON.stringify(reIndexedPorts);
    setIsDirty(false);
    setIsSaving(false);
  }, [ports]);

  return (
    <div className="flex-1 bg-white rounded-[4px] shadow-[0_1px_2px_0_rgba(0,0,0,0.03),0_1px_6px_-1px_rgba(0,0,0,0.02),0_2px_4px_0_rgba(0,0,0,0.02)] overflow-hidden border border-[#f0f0f0]">
      <DataTable<Port>
        data={ports}
        columns={portColumns}
        rowKey="id"
        searchableFields={['name', 'country', 'code']}
        pageSize={10}
        title="Danh mục Cảng"
        subtitle="Hệ thống quản lý dữ liệu cảng"
        headerIcon={<Anchor size={22} />}
        emptyMessage="Không tìm thấy dữ liệu"
        onRowClick={(port) => setEditingPort(port)}
        onDelete={handleDeletePort}
        onAdd={handleAddPort}
        onSave={handleSave}
        isDirty={isDirty}
        isSaving={isSaving}
        renderRowNumber={(port) =>
          port.stt === 0
            ? <span className="text-blue-500 font-bold italic">Mới</span>
            : port.stt
        }
      />

      <EditPortModal
        isOpen={!!editingPort}
        port={editingPort}
        onClose={() => setEditingPort(null)}
        onSave={handleUpdatePort}
      />
    </div>
  );
};

export default CangPage;
