import React from 'react';

export default function GroupUserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="group-user-layout">
            {children}
        </div>
    );
}
