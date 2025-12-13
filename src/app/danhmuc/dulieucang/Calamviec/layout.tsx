"use client";
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-background text-textPrimary font-sans pb-[10px]">
            {/* Main Content Container - Full width */}
            <div className="w-full p-[10px]">
                {children}
            </div>
        </div>
    );
}
