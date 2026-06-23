import React from 'react';

export default function TinhTrangHangHoaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div 
      className="w-full min-h-[calc(100vh-60px)] flex flex-col font-sans text-[#262626]"
      style={{
        backgroundImage: "linear-gradient(to bottom, rgba(239, 246, 255, 0.85), rgba(219, 234, 254, 0.9)), url('/img/page_bg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <main className="flex-1 flex flex-col w-full max-w-[1600px] mx-auto p-[20px]">
        {children}
        
        <footer className="py-[12px] px-[10px] text-center text-[12px] text-slate-500 select-none">
          <p>&copy; {new Date().getFullYear()} GTOS - Hệ thống Quản trị Cảng hiện đại. Được phát triển bởi <span className="text-[#1890ff] hover:underline cursor-pointer font-semibold">CEH Software.</span></p>
        </footer>
      </main>
    </div>
  );
}
