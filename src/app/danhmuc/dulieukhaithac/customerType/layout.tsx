import React from 'react';
import MainLayout from "@/components/MainLayout";

export default function CustomerTypeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MainLayout>
      <div 
        className="w-full min-h-[calc(100vh-60px)] flex flex-col font-sans"
        style={{
          backgroundImage: "linear-gradient(to bottom, rgba(239, 246, 255, 0.85), rgba(219, 234, 254, 0.9)), url('/img/page_bg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        {children}
      </div>
    </MainLayout>
  );
}
