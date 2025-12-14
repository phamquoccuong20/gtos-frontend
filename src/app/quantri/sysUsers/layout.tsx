import React from 'react';

/**
 * Layout for sysUsers section
 * This can contain shared UI elements like breadcrumbs, section headers, etc.
 */
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
