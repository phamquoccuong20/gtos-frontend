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

// Also export as named export for page.tsx usage
export const GroupUserLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-50/50">
            {children}
        </div>
    );
};
