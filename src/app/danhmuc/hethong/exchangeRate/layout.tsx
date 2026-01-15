
import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Tỷ giá",
};

/**
 * Layout component for Exchange Rate module
 * Wraps the exchange rate pages with common UI elements
 */
export default function ExchangeRateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="exchange-rate-layout">
      {children}
    </div>
  );
}
