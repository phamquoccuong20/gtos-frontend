import { ReactNode } from 'react';

export type SortOrder = 'asc' | 'desc' | null;

/**
 * Column definition for the DataTable.
 * T is the data type of each row.
 */
export interface ColumnDef<T> {
  /** Unique key identifying the column — must match a key in T for sorting/filtering */
  key: string;
  /** Header label displayed in <th> */
  label: string;
  /** Minimum width CSS value, e.g. '160px' */
  minWidth?: string;
  /** Fixed width CSS value, e.g. '80px' */
  width?: string;
  /** Whether this column supports sorting/filtering via popover */
  sortable?: boolean;
  /** Custom render function for each cell. If not provided, defaults to String(row[key]) */
  render?: (value: any, row: T, index: number) => ReactNode;
  /** Align text: 'left' | 'center' | 'right'. Default: 'left' */
  align?: 'left' | 'center' | 'right';
}

export interface DataTableProps<T extends Record<string, any>> {
  /** The full data array */
  data: T[];
  /** Column definitions */
  columns: ColumnDef<T>[];
  /** Unique key field in T, used for selection (default: 'id') */
  rowKey?: keyof T;
  /** Fields to search across when using the search bar */
  searchableFields?: (keyof T)[];
  /** Page size (default: 10) */
  pageSize?: number;
  /** Show row numbering column (STT). Default: true */
  showRowNumber?: boolean;
  /** Show checkbox selection column. Default: true */
  showSelection?: boolean;
  /** Callback when a row is clicked */
  onRowClick?: (row: T) => void;
  /** Called when user clicks delete with selected IDs */
  onDelete?: (ids: string[]) => void;
  /** Called when user clicks Add */
  onAdd?: (count: number) => void;
  /** Called when user clicks Save */
  onSave?: () => void;
  /** Whether data has unsaved changes */
  isDirty?: boolean;
  /** Whether save is in progress */
  isSaving?: boolean;
  /** Title displayed in the table header */
  title?: string;
  /** Subtitle displayed below the title */
  subtitle?: string;
  /** Icon element for the header */
  headerIcon?: ReactNode;
  /** Empty state message */
  emptyMessage?: string;
  /** Custom render for STT column (e.g. for "Mới" badge). Gets (row, globalIndex) */
  renderRowNumber?: (row: T, globalIndex: number) => ReactNode;
  /** Extra action buttons to show in header */
  extraActions?: ReactNode;
}
