// src/utils/nav.ts
export type NavNode = {
  key: string;
  label: string;
  icon?: string;
  href?: string;          // chỉ có ở leaf
  children?: NavNode[];
};

/**
 * Duyệt toàn bộ cây nav và trả về Map: href -> mảng chain key từ gốc tới leaf
 * Ví dụ: "/danh-muc/dulieucang/ca-lam-viec" => ["danh-muc","du-lieu-cang","ca-lam-viec"]
 */
export function buildHrefIndex(nodes: NavNode[]) {
  const byHref = new Map<string, string[]>();

  const walk = (arr: NavNode[], chain: string[]) => {
    for (const n of arr) {
      const next = [...chain, n.key];
      if (n.href) byHref.set(n.href, next);
      if (n.children?.length) walk(n.children, next);
    }
  };

  walk(nodes, []);
  return byHref;
}

/**
 * Tìm href khớp “dài nhất” với pathname hiện tại (supports nested [...slug]).
 * Ví dụ pathname="/danh-muc/dulieucang/phuong-an/xep-do?foo=1"
 * -> best "/danh-muc/dulieucang/phuong-an/xep-do"
 */
export function findBestHrefMatch(pathname: string, hrefIdx: Map<string, string[]>) {
  let best: string | undefined;
  for (const h of hrefIdx.keys()) {
    if (pathname.startsWith(h)) {
      if (!best || h.length > best.length) best = h;
    }
  }
  return best ? { href: best, chain: hrefIdx.get(best)! } : undefined;
}

/**
 * Trả về {openKeys, selectedKey} dựa trên pathname và cây nav
 */
export function getNavStateFromPathname(pathname: string, nodes: NavNode[]) {
  const idx = buildHrefIndex(nodes);
  const best = findBestHrefMatch(pathname, idx);
  if (!best) return { openKeys: [] as string[], selectedKey: undefined as string | undefined };
  const chain = best.chain;
  return { openKeys: chain.slice(0, -1), selectedKey: chain.at(-1) };
}
