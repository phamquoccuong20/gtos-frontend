import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Quản lý Người dùng",
};


export default function SysUsersLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50/50">
            {children}
        </div>
    );
}
