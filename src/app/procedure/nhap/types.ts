import { ReactNode } from 'react';

export interface ProcessItem {
  label: string;
  href: string;
  icon: ReactNode;
  isExternal?: boolean;
}

export interface ProcessGroup {
  id: string;
  title: string;
  color: string;
  items: ProcessItem[];
}
