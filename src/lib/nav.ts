import type { NavNode } from "@/types/nav";

export function indexByPath(nodes: NavNode[], trail: string[] = [], idx: Record<string, string[]> = {}) {
  for (const n of nodes) {
    const chain = [...trail, n.key];
    if (n.href) idx[n.href] = chain;
    if (n.children?.length) indexByPath(n.children, chain, idx);
  }
  return idx;
}

export function rootKeys(nodes: NavNode[]) {
  return nodes.map((n) => n.key);
}
