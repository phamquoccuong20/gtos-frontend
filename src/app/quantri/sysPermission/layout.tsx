import React from 'react';

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
