'use client';

import React from 'react';

interface ExchangeRateLayoutProps {
  children: React.ReactNode;
}

/**
 * Layout component for Exchange Rate module
 * Wraps the exchange rate pages with common UI elements
 */
const ExchangeRateLayout: React.FC<ExchangeRateLayoutProps> = ({ children }) => {
  return (
    <div className="exchange-rate-layout">
      {children}
    </div>
  );
};

export default ExchangeRateLayout;
