import React from 'react';

interface GateIconProps {
    size: number;
    className?: string;
    strokeWidth?: number;
}

const GateIcon: React.FC<GateIconProps> = ({ size, className, strokeWidth = 2 }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M4 6h16" />
        <path d="M4 18h16" />
        <path d="M6 6v12" />
        <path d="M18 6v12" />
        <path d="M11 6v12" />
        <path d="M13 6v12" />
    </svg>
);

export default GateIcon;
