import React from 'react';

interface TooltipProps {
    children: React.ReactNode;
    content: React.ReactNode;
    visible: boolean;
    x: number;
    y: number;
}

export const Tooltip: React.FC<TooltipProps> = ({ children, content, visible, x, y }) => {
    return (
        <>
            {children}
            {visible && (
                <div
                    className="fixed z-50 bg-white text-slate-700 text-xs rounded shadow-xl p-3 pointer-events-none transition-opacity duration-200 border border-slate-200 backdrop-blur-sm bg-opacity-95"
                    style={{
                        left: x + 16,
                        top: y + 16,
                        minWidth: '240px'
                    }}
                >
                    {content}
                </div>
            )}
        </>
    );
};
