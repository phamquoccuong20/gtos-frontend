import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Search, 
  RotateCcw, 
  Plus, 
  Save, 
  FileUp, 
  Trash2, 
  X,
  ClipboardCheck
} from 'lucide-react';
import VesselSelectionModal from './modals/VesselSelectionModal';
import BargeSelectionModal from './modals/BargeSelectionModal';
import VehiclePlanTable from './tables/VehiclePlanTable';

interface VehiclePlanProps {
  onBack: () => void;
}

const MOCK_ORDERS = [
  { orderNo: '2603050001', owner: 'CỬA HÀNG BÌNH AN', vesselName: 'HOANG DUY 03', billQty: '100', billWeight: '500' },
  { orderNo: '2603050002', owner: 'CỬA HÀNG BÌNH AN', vesselName: 'HOANG DUY 03', billQty: '150', billWeight: '750' },
  { orderNo: '2603050003', owner: 'Công Ty TNHH Tiếp Vận Hoàng Thiên Nam', vesselName: 'STAR TYCHE', billQty: '200', billWeight: '1000' },
  { orderNo: '2603050004', owner: 'Công Ty TNHH Tiếp Vận Hoàng Thiên Nam', vesselName: 'STAR TYCHE', billQty: '250', billWeight: '1250' },
  { orderNo: '2603050005', owner: 'VINHCEH LOGISTICS', vesselName: 'VINHCEH', billQty: '300', billWeight: '1500' },
  { orderNo: '2603050006', owner: 'VIET THUAN GROUP', vesselName: 'VIET THUAN 095-02', billQty: '350', billWeight: '1750' },
  { orderNo: '2602270003', owner: 'Công Ty TNHH Tiếp Vận Hoàng Thiên Nam', vesselName: 'NAU1', billQty: '10', billWeight: '30' },
  { orderNo: '2602270004', owner: 'Công Ty TNHH Tiếp Vận Hoàng Thiên Nam', vesselName: 'NAU1', billQty: '20', billWeight: '60' },
];

const INITIAL_DATA_XE = [
  { id: 1, owner: 'CỬA HÀNG BÌNH AN', orderNo: '2603050001', vehicleName: '67F03333', trailerNo: '67RM03333', weight: '35000', driver: 'DUY', contact: '', note: '' },
  { id: 2, owner: 'CỬA HÀNG BÌNH AN', orderNo: '2603050001', vehicleName: '67F04444', trailerNo: '67RM04444', weight: '35000', driver: 'DUY', contact: '', note: '' },
  { id: 3, owner: 'Công Ty TNHH Tiếp Vận Hoàng Thiên Nam', orderNo: '2603050003', vehicleName: '67F05555', trailerNo: '67RM05555', weight: '35000', driver: 'DUY', contact: '', note: '' },
];

const INITIAL_DATA_SALAN = [
  { id: 1, owner: 'Công Ty TNHH Tiếp Vận Hoàng Thiên Nam', orderNo: '2602270003', billQty: '10', billWeight: '30', planQty: '5', planWeight: '5', vehicleName: 'SL11', note: '' },
];

const VehiclePlan: React.FC<VehiclePlanProps> = ({ onBack }) => {
  const [selectedVessel, setSelectedVessel] = useState<any>(null);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [isVesselModalOpen, setIsVesselModalOpen] = useState(false);
  const [isBargeModalOpen, setIsBargeModalOpen] = useState(false);
  const [activeRowId, setActiveRowId] = useState<number | null>(null);
  const [isAddRowsModalOpen, setIsAddRowsModalOpen] = useState(false);
  const [rowsToAdd, setRowsToAdd] = useState(1);
  const [transportType, setTransportType] = useState<'Xe' | 'Sà lan'>('Xe');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [tableData, setTableData] = useState<any[]>([]);

  const handleVesselSelect = (vessel: any) => {
    setSelectedVessel(vessel);
    setSelectedRows(new Set());
    // Filter or load data for the selected vessel
    const initialSource = transportType === 'Xe' ? INITIAL_DATA_XE : INITIAL_DATA_SALAN;
    const filteredData = initialSource.filter(row => {
      const order = MOCK_ORDERS.find(o => o.orderNo === row.orderNo);
      return order?.vesselName === vessel.name;
    });
    setTableData(filteredData);
  };

  const handleTransportTypeChange = (type: 'Xe' | 'Sà lan') => {
    setTransportType(type);
    setSelectedRows(new Set());
    if (selectedVessel) {
      const initialSource = type === 'Xe' ? INITIAL_DATA_XE : INITIAL_DATA_SALAN;
      const filteredData = initialSource.filter(row => {
        const order = MOCK_ORDERS.find(o => o.orderNo === row.orderNo);
        return order?.vesselName === selectedVessel.name;
      });
      setTableData(filteredData);
    }
  };

  const handleClearVessel = () => {
    setSelectedVessel(null);
    setTableData([]);
  };

  const handleBargeSelect = (barge: any) => {
    if (activeRowId !== null) {
      handleInputChange(activeRowId, 'vehicleName', barge.name);
    }
  };

  const toggleRowSelection = (id: number) => {
    setSelectedRows(prev => {
      const newSelection = new Set(prev);
      if (newSelection.has(id)) {
        newSelection.delete(id);
      } else {
        newSelection.add(id);
      }
      return newSelection;
    });
  };

  const toggleAllSelection = () => {
    if (selectedRows.size === tableData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(tableData.map(row => row.id)));
    }
  };

  const handleDeleteRows = () => {
    if (selectedRows.size === 0) return;
    
    setTableData(prev => prev.filter(row => !selectedRows.has(row.id)));
    setSelectedRows(new Set());
    setSuccessMessage(`Đã xóa ${selectedRows.size} dòng.`);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleInputChange = (id: number, field: string, value: string) => {
    setTableData(prev => prev.map(row => {
      if (row.id === id) {
        const updatedRow = { ...row, [field]: value };
        
        // Auto-fill owner, billQty, and billWeight if orderNo changes
        if (field === 'orderNo') {
          const order = MOCK_ORDERS.find(o => o.orderNo === value);
          if (order) {
            updatedRow.owner = order.owner;
            if (transportType === 'Sà lan') {
              updatedRow.billQty = order.billQty || '';
              updatedRow.billWeight = order.billWeight || '';
            }
          } else {
            updatedRow.owner = '';
            if (transportType === 'Sà lan') {
              updatedRow.billQty = '';
              updatedRow.billWeight = '';
            }
          }
        }
        
        return updatedRow;
      }
      return row;
    }));
  };

  const handleSave = () => {
    if (!selectedVessel) {
      setErrorMessage('Vui lòng chọn tàu chuyến trước khi lưu.');
      return;
    }

    const invalidOrders = tableData.filter(row => {
      if (!row.orderNo) return false;
      const order = MOCK_ORDERS.find(o => o.orderNo === row.orderNo);
      return !order || order.vesselName !== selectedVessel.name;
    });

    if (invalidOrders.length > 0) {
      setErrorMessage('Lệnh giao hàng không hợp lệ.');
      setTimeout(() => setErrorMessage(null), 3000);
      return;
    }

    setSuccessMessage('Lưu kế hoạch thành công!');
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleAddRows = () => {
    const newRows = [];
    const maxId = tableData.reduce((max, item) => Math.max(max, item.id), 0);
    
    for (let i = 1; i <= rowsToAdd; i++) {
      const newRow: any = {
        id: maxId + i,
        owner: '',
        orderNo: '',
        vehicleName: '',
        note: ''
      };

      if (transportType === 'Xe') {
        newRow.trailerNo = '';
        newRow.weight = '';
        newRow.driver = '';
        newRow.contact = '';
      } else {
        newRow.billQty = '';
        newRow.billWeight = '';
        newRow.planQty = '';
        newRow.planWeight = '';
      }

      newRows.unshift(newRow);
    }
    
    setTableData([...newRows, ...tableData]);
    setIsAddRowsModalOpen(false);
    setRowsToAdd(1);
  };

  const triggerBargeSelect = (id: number) => {
    setActiveRowId(id);
    setIsBargeModalOpen(true);
  };

  return (
    <div className="flex flex-col h-full bg-white animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex items-center justify-between p-[14px] border-b border-slate-200 bg-white">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-slate-100 rounded-custom transition-colors text-slate-600"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-[18px] font-bold text-[#1e293b] uppercase tracking-tight">
            KẾ HOẠCH PHƯƠNG TIỆN NHẬN HÀNG TỪ TÀU/SÀ LAN
          </h1>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="text-[12px] font-bold text-blue-600 hover:underline px-3 py-2">
            Tải tệp mẫu
          </button>
          <button 
            disabled={!selectedVessel}
            className={`flex items-center gap-2 px-4 py-2 bg-white border rounded-custom text-[12px] font-bold transition-all ${
              selectedVessel 
                ? 'border-amber-500 text-amber-600 hover:bg-amber-50' 
                : 'border-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <RotateCcw size={16} />
            Nạp dữ liệu
          </button>
          <button 
            onClick={() => setIsAddRowsModalOpen(true)}
            className={`flex items-center gap-2 px-4 py-2 border rounded-custom text-[12px] font-bold transition-all ${
              selectedVessel 
                ? 'bg-white border-emerald-500 text-emerald-600 hover:bg-emerald-50' 
                : 'bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Plus size={16} />
            Thêm mới
          </button>
          <button 
            onClick={handleSave}
            disabled={!selectedVessel}
            className={`flex items-center gap-2 px-4 py-2 rounded-custom text-[12px] font-bold transition-all shadow-sm ${
              selectedVessel 
                ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                : 'bg-indigo-300 text-white cursor-not-allowed'
            }`}
          >
            <Save size={16} />
            Lưu
          </button>
          <button 
            disabled={!selectedVessel}
            className={`flex items-center gap-2 px-4 py-2 rounded-custom text-[12px] font-bold transition-all shadow-sm ${
              selectedVessel 
                ? 'bg-emerald-500 text-white hover:bg-emerald-600' 
                : 'bg-emerald-300 text-white cursor-not-allowed'
            }`}
          >
            <FileUp size={16} />
            Import Excel
          </button>
          <button 
            onClick={handleDeleteRows}
            disabled={!selectedVessel || selectedRows.size === 0}
            className={`flex items-center gap-2 px-4 py-2 bg-white border rounded-custom text-[12px] font-bold transition-all ${
              selectedVessel && selectedRows.size > 0
                ? 'border-red-500 text-red-600 hover:bg-red-50' 
                : 'border-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Trash2 size={16} />
            Xóa dòng
          </button>
        </div>
      </div>

      {/* Filter Section */}
      <div className="p-[14px] border-b border-slate-200 bg-slate-50/30">
        <div className="bg-white p-[14px] border border-slate-200 rounded-custom shadow-sm flex flex-wrap items-center gap-8">
          {/* Vessel Info */}
          <div className="flex items-center gap-3 min-w-[480px]">
            <span className="text-[12px] font-bold text-slate-500 shrink-0">Thông tin tàu</span>
            <div className="relative flex-1 group">
              <input 
                type="text" 
                value={selectedVessel ? `${selectedVessel.name} | ${selectedVessel.inboundVoyage} | ${selectedVessel.outboundVoyage} | ${selectedVessel.atb}` : ''}
                readOnly
                placeholder="Chọn tàu chuyến"
                className="w-full h-10 pl-3 pr-16 border border-slate-200 rounded-custom text-[12px] font-bold text-slate-700 bg-white focus:outline-none focus:border-cyan-500 transition-all cursor-default"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <Search 
                  size={16} 
                  className="text-amber-500 cursor-pointer hover:scale-110 transition-transform" 
                  onClick={() => setIsVesselModalOpen(true)}
                />
                <X 
                  size={16} 
                  className="text-red-500 cursor-pointer hover:scale-110 transition-transform" 
                  onClick={handleClearVessel}
                />
              </div>
            </div>
          </div>

          {/* ETA/ETD */}
          <div className="flex items-center gap-3">
            <span className="text-[12px] font-bold text-slate-500 shrink-0">ETA/ETD</span>
            <div className="flex items-center gap-2">
              <div className="relative">
                <input 
                  type="text" 
                  value={selectedVessel?.eta || ''}
                  readOnly
                  placeholder="ETA"
                  className="w-[180px] h-10 px-3 border border-slate-200 rounded-custom text-[12px] font-bold text-slate-700 bg-white focus:outline-none"
                />
              </div>
              <div className="relative">
                <input 
                  type="text" 
                  value={selectedVessel?.etd || ''}
                  readOnly
                  placeholder="ETD"
                  className="w-[180px] h-10 px-3 border border-slate-200 rounded-custom text-[12px] font-bold text-slate-700 bg-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Transport Type */}
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer group">
              <div 
                onClick={() => handleTransportTypeChange('Xe')}
                className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${transportType === 'Xe' ? 'border-cyan-500 bg-cyan-500' : 'border-slate-300'}`}
              >
                {transportType === 'Xe' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>
              <span className="text-[12px] font-bold text-slate-700">Xe</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <div 
                onClick={() => handleTransportTypeChange('Sà lan')}
                className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${transportType === 'Sà lan' ? 'border-cyan-500 bg-cyan-500' : 'border-slate-300'}`}
              >
                {transportType === 'Sà lan' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>
              <span className="text-[12px] font-bold text-slate-700">Sà lan</span>
            </label>
          </div>
        </div>
      </div>

      {/* Search & Actions Bar */}
      <div className="p-[14px] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-[12px] font-bold text-slate-500">Tìm:</span>
          <div className="relative w-[250px]">
            <input 
              type="text" 
              disabled={!selectedVessel}
              className={`w-full h-9 pl-3 pr-8 border rounded-custom text-[12px] focus:outline-none transition-all ${
                selectedVessel ? 'border-slate-200 focus:border-cyan-500' : 'border-slate-100 bg-slate-50 cursor-not-allowed'
              }`}
            />
            <Search size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-[12px] font-bold text-slate-600">Số dòng: {tableData.length}</span>
          <div className="flex items-center gap-2">
            <button 
              onClick={toggleAllSelection}
              disabled={!selectedVessel || tableData.length === 0}
              className={`flex items-center gap-2 px-3 py-1.5 border rounded-custom text-[11px] font-bold transition-all ${
                selectedVessel && tableData.length > 0
                  ? 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                  : 'bg-white text-slate-300 border-slate-100 cursor-not-allowed'
              }`}
            >
              <ClipboardCheck size={14} />
              {selectedRows.size === tableData.length && tableData.length > 0 ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
            </button>
            <button 
              onClick={() => setSelectedRows(new Set())}
              disabled={selectedRows.size === 0}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-custom text-[11px] font-bold border transition-all ${
                selectedRows.size > 0
                  ? 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  : 'bg-white text-slate-300 border-slate-100 cursor-not-allowed'
              }`}
            >
              <X size={14} />
              Bỏ chọn
            </button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="flex-1 overflow-auto px-[14px] pb-[14px]">
        <VehiclePlanTable 
          selectedVessel={selectedVessel}
          transportType={transportType}
          tableData={tableData}
          selectedRows={selectedRows}
          toggleRowSelection={toggleRowSelection}
          toggleAllSelection={toggleAllSelection}
          handleInputChange={handleInputChange}
          mockOrders={MOCK_ORDERS}
          onBargeSelectTrigger={triggerBargeSelect}
        />
      </div>

      {/* Success/Error Messages */}
      {(errorMessage || successMessage) && (
        <div className="fixed top-6 right-6 z-[200] animate-in slide-in-from-top-5 duration-300">
          <div className={`px-6 py-3 rounded-custom shadow-lg flex items-center gap-3 ${errorMessage ? 'bg-red-500 text-white' : 'bg-emerald-500 text-white'}`}>
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              {errorMessage ? '!' : '✓'}
            </div>
            <span className="text-[14px] font-bold">{errorMessage || successMessage}</span>
          </div>
        </div>
      )}

      <VesselSelectionModal 
        isOpen={isVesselModalOpen}
        onClose={() => setIsVesselModalOpen(false)}
        onSelect={handleVesselSelect}
      />

      <BargeSelectionModal
        isOpen={isBargeModalOpen}
        onClose={() => setIsBargeModalOpen(false)}
        onSelect={handleBargeSelect}
      />

      {/* Add Rows Modal */}
      {isAddRowsModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-[400px] rounded-custom shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white">
              <h2 className="text-[#3b82f6] font-bold text-lg">Thêm dòng mới</h2>
              <button onClick={() => setIsAddRowsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 bg-white">
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-medium text-slate-600">Số dòng cần thêm:</label>
                <input 
                  type="number" 
                  min="1"
                  max="50"
                  value={rowsToAdd}
                  onChange={(e) => setRowsToAdd(parseInt(e.target.value) || 1)}
                  className="w-full h-10 px-3 border border-slate-200 rounded-custom text-[14px] focus:outline-none focus:ring-1 focus:ring-blue-500"
                  autoFocus
                />
              </div>
            </div>
            <div className="p-4 border-t border-gray-100 flex items-center justify-end gap-3 bg-white">
              <button 
                onClick={() => setIsAddRowsModalOpen(false)}
                className="px-6 py-2 text-[14px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-custom transition-all"
              >
                Hủy
              </button>
              <button 
                onClick={handleAddRows}
                className="px-6 py-2 text-[14px] font-bold text-white bg-emerald-500 hover:bg-emerald-600 rounded-custom shadow-sm transition-all"
              >
                Thêm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehiclePlan;
