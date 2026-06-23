/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CustomerType {
  id: string; // Unique transient UUID or continuous count
  code: string; // e.g. FWD, OWN, REC
  name: string; // e.g. FORWARDER, OWNER, RECEIVER
  description: string; // Sub-details for extra UI richness
  createdAt: string;
  isNew?: boolean; // temporary flag for newly created rows that are unsaved
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  action: 'ADD' | 'DELETE' | 'UPDATE' | 'SAVE' | 'RESET' | 'IMPORT' | 'EXPORT';
  details: string;
}

export type Language = 'VI' | 'EN';
