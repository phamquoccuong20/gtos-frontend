import React from 'react';

interface GroupUserLayoutProps {
    children: React.ReactNode;
}

/**
 * Layout for GroupUser section
 * This can contain shared UI elements like breadcrumbs, section headers, etc.
 */
export const GroupUserLayout: React.FC<GroupUserLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-50/50">
            {children}
        </div>
    );
};

export default GroupUserLayout;
