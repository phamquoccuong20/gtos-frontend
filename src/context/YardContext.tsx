'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { YardData } from '@/app/danhmuc/dulieucang/cmBlock/types';
import { YARD_DATA } from '@/app/danhmuc/dulieucang/cmBlock/constants';

// Interface cho hàng hóa trong bãi
export interface YardBlockContent {
  cargoId: string;
  cargoName: string;
  quantity: number;
  unit: string;
  color: string;
  weight: number;
  vesselName?: string;
  vesselCode?: string;
}

// Interface cho thông tin bãi kèm hàng hóa
export interface YardBlockInfo {
  yardId: number; // Liên kết với yardData.id
  location: string; // Mã bãi (location từ cmBlock)
  contents: YardBlockContent[]; // Danh sách hàng hóa trong bãi
  currentValue: number; // Tổng giá trị/trọng lượng hiện tại
}

interface YardContextType {
  // Dữ liệu bãi từ cmBlock
  yardData: YardData[];
  setYardData: React.Dispatch<React.SetStateAction<YardData[]>>;
  
  // Thông tin hàng hóa của từng bãi (từ YardPlanning)
  yardBlockInfos: YardBlockInfo[];
  setYardBlockInfos: React.Dispatch<React.SetStateAction<YardBlockInfo[]>>;
  
  // Helper function để thêm hàng vào bãi
  addContentToYard: (yardId: number, content: YardBlockContent) => void;
  
  // Helper function để lấy thông tin bãi kèm hàng
  getYardBlockInfo: (yardId: number) => YardBlockInfo | undefined;
}

const YardContext = createContext<YardContextType | undefined>(undefined);

export const YardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [yardData, setYardData] = useState<YardData[]>(YARD_DATA);
  const [yardBlockInfos, setYardBlockInfos] = useState<YardBlockInfo[]>([]);

  // Thêm hàng vào một bãi
  const addContentToYard = (yardId: number, content: YardBlockContent) => {
    setYardBlockInfos(prev => {
      const existingIndex = prev.findIndex(info => info.yardId === yardId);
      const yard = yardData.find(y => y.id === yardId);
      
      if (existingIndex >= 0) {
        // Cập nhật bãi đã có
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          contents: [...updated[existingIndex].contents, content],
          currentValue: updated[existingIndex].currentValue + content.weight
        };
        return updated;
      } else {
        // Tạo mới record cho bãi
        return [...prev, {
          yardId,
          location: yard?.location || '',
          contents: [content],
          currentValue: content.weight
        }];
      }
    });
  };

  // Lấy thông tin bãi kèm hàng
  const getYardBlockInfo = (yardId: number): YardBlockInfo | undefined => {
    return yardBlockInfos.find(info => info.yardId === yardId);
  };

  return (
    <YardContext.Provider value={{ 
      yardData, 
      setYardData, 
      yardBlockInfos, 
      setYardBlockInfos,
      addContentToYard,
      getYardBlockInfo
    }}>
      {children}
    </YardContext.Provider>
  );
};

export const useYardData = (): YardContextType => {
  const context = useContext(YardContext);
  if (!context) {
    throw new Error('useYardData must be used within a YardProvider');
  }
  return context;
};
