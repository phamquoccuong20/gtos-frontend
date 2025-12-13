import React from 'react';

interface GiamSatCauBenLayoutProps {
    children: React.ReactNode;
}

export default function GiamSatCauBenLayout({ children }: GiamSatCauBenLayoutProps) {
    return (
        <div className="h-full w-full overflow-hidden">
            {children}
        </div>
    );
}
