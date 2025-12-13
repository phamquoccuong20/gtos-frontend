import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureToggleProps {
    active: boolean;
    onClick: () => void;
    icon: LucideIcon | React.FC<{ size: number; className?: string }>;
    title: string;
    activeClass: string;
    inactiveClass: string;
}

const FeatureToggle: React.FC<FeatureToggleProps> = ({
    active,
    onClick,
    icon: Icon,
    title,
    activeClass,
    inactiveClass
}) => (
    <button
        onClick={onClick}
        className={`
      relative w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300
      ${active
                ? `${activeClass} shadow-md scale-100`
                : `${inactiveClass} hover:bg-gray-100 scale-95 opacity-60 hover:opacity-100`
            }
    `}
        title={title}
    >
        <Icon size={16} strokeWidth={active ? 2.5 : 2} />
    </button>
);

export default FeatureToggle;
