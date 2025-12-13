"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

interface MainLayoutProps {
    children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-svh overflow-hidden">
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />
            <div className="flex min-w-0 flex-1 flex-col bg-white">
                <Header onMenuClick={() => setIsSidebarOpen(true)} />
                <main className="min-h-0 flex-1 overflow-hidden bg-gray-50">
                    {children}
                </main>
            </div>
        </div>
    );
}
