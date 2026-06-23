"use client";

import React, { useState } from 'react';
import ProcessCard from './components/ProcessCard';
import ManifestEntry from './components/ManifestEntry';
import DeliveryOrder from './components/DeliveryOrder';
import OrderUpdate from './components/OrderUpdate';
import VehiclePlan from './components/VehiclePlan';
import { PROCESS_GROUPS } from './constants';

export default function NhapPage() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'manifest' | 'delivery-order' | 'order-update' | 'vehicle-plan'>('dashboard');

  const handleItemClick = (label: string) => {
    if (label === 'Nhập liệu hàng tổng hợp / Manifest') {
      setCurrentView('manifest');
    } else if (label === 'Lệnh giao hàng') {
      setCurrentView('delivery-order');
    } else if (label === 'Cập nhật & Điều chỉnh thông tin lệnh') {
      setCurrentView('order-update');
    } else if (label === 'Kế hoạch phương tiện nhận hàng từ tàu') {
      setCurrentView('vehicle-plan');
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'manifest':
        return <ManifestEntry onBack={() => setCurrentView('dashboard')} />;
      case 'delivery-order':
        return <DeliveryOrder onBack={() => setCurrentView('dashboard')} />;
      case 'order-update':
        return <OrderUpdate onBack={() => setCurrentView('dashboard')} />;
      case 'vehicle-plan':
        return <VehiclePlan onBack={() => setCurrentView('dashboard')} />;
      default:
        return (
          <div className="p-[14px] bg-[#ffffff] flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-[20px]">
              {PROCESS_GROUPS.map((group) => (
                <ProcessCard 
                  key={group.id} 
                  group={group} 
                  onItemClick={handleItemClick}
                />
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f6f9]">
      <main className="flex-1 w-full max-w-[1400px] mx-auto p-[14px] pt-[30px]">
        {/* Unified Frame (Khung Tổng) */}
        <div className="bg-white border border-[#d1d5db] shadow-[0_4px_25px_rgba(0,0,0,0.06)] rounded-custom overflow-hidden flex flex-col min-h-[85vh]">
          {renderView()}
        </div>
      </main>
    </div>
  );
}
