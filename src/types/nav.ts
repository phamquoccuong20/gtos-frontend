export type NavNode = {
  key: string;
  label: string;
  href?: `/${string}`;
  icon?: string;          
  children?: NavNode[];
};