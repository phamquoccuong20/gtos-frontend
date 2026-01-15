'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Menu } from 'lucide-react';

export default function NationalSidebarWrapper() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-2 left-2 z-40 p-2 bg-white text-blue-900 rounded-md shadow-md border border-gray-200 hover:bg-gray-50 transition-all active:scale-95"
        >
          <Menu size={20} />
        </button>
      )}
    </>
  );
}
