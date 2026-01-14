
import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Quản lý Cảng",
};
interface CangLayoutProps {
  children: React.ReactNode;
}

const CangLayout: React.FC<CangLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#f0f2f5] text-[#262626]">
      <main className="flex-1 flex flex-col w-full max-w-[1600px] mx-auto p-[10px]">
        {children}
        
        <footer className="py-[12px] px-[10px] text-center text-[12px] text-slate-500">
          <p>&copy; {new Date().getFullYear()} GTOS - Hệ thống Quản trị Cảng hiện đại. Được phát triển bởi <span className="text-[#1890ff] font-semibold">CEH Software</span>.</p>
        </footer>
      </main>
    </div>
  );
};

export default CangLayout;
