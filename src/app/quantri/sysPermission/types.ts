export interface Permission {
  view: boolean;
  add: boolean;
  edit: boolean;
  delete: boolean;
}

export interface MenuItem {
  id: number;
  stt: number;
  name: string;
  parentCode: string;
  permissions: Permission;
  isHeader?: boolean;
}

export interface Port {
  id: string;
  name: string;
}

export interface AccountGroup {
  id: string;
  name: string;
}
