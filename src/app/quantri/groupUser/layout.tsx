import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Quản lý nhóm người dùng",
};


export default function GroupUserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="group-user-layout mt-6">
            {children}
        </div>
    );
}
