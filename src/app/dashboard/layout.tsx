'use client';

import React from 'react';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-[#f0f2f5] font-sans text-slate-800">
            {children}
        </div>
    );
}
