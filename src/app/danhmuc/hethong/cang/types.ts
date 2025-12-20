
import React from 'react';

export interface Port {
  id: string;
  stt: number;
  country: string;
  code: string;
  name: string;
  status: 'active' | 'maintenance' | 'closed';
}

export interface NavItem {
  label: string;
  icon: React.ReactNode;
  path: string;
  children?: NavItem[];
}
