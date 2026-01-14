
import React from 'react';
import { Metadata } from 'next';
import NationalSidebarWrapper from './NationalSidebarWrapper';

export const metadata: Metadata = {
  title: "Quản lý Quốc gia",
};


export default function NationalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <NationalSidebarWrapper />
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}
