
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f8fafc] p-[14px] flex flex-col gap-[14px] relative">
      {children}
    </div>
  );
}
