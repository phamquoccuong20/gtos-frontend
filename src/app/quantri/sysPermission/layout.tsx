import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Quản lý Quyền",
};

interface SysPermissionLayoutProps {
  children: React.ReactNode;
}

const SysPermissionLayout: React.FC<SysPermissionLayoutProps> = ({ children }) => {
  return (
    <div className="h-full flex flex-col bg-slate-50">
      {children}
    </div>
  );
};

export default SysPermissionLayout;
