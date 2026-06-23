import React from 'react';

export default function NhapLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full min-h-0 flex-1">
      {children}
    </div>
  );
}
