import React from 'react';

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
