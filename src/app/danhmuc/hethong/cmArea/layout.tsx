
import React from 'react';

export const metadata = {
  title: 'Quản lý Vùng Phụ',
  description: 'Danh mục Quản lý Vùng Phụ và Sức chứa',
};

export default function AreaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full">
      {children}
    </div>
  );
}
