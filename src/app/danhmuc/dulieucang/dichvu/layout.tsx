import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Quản lý Dịch vụ",
};

interface DichVuLayoutProps {
    children: React.ReactNode;
}

export default function DichVuLayout({ children }: DichVuLayoutProps) {
    return (
        <div className="dichvu-layout">
            {children}
        </div>
    );
}
