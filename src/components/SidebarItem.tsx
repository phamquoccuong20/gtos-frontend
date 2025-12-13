// "use client";

// import { usePathname, useRouter } from "next/navigation";
// import { Layout } from "antd";
// import { useEffect, useMemo } from "react";

// import navData from "@/data/navdata.json";
// import type { NavNode } from "@/types/nav";
// import { indexByPath } from "@/lib/nav";

// import { useAppDispatch, useAppSelector } from "@/store/hook";
// import { setCollapsed, setOpenKeys, setSelectedKey } from "@/store/slices/navSlice";
// import Image from "next/image";

// const { Sider } = Layout;
// // Sidebar navigation data
// const NAV: NavNode[] = (navData.items as NavNode[]) ?? [];

// export default function SidebarNav() {
//   const pathname = usePathname() || "/dashboard";
//   const dispatch = useAppDispatch();
//   const { openKeys, selectedKey, collapsed } = useAppSelector((s) => s.nav);

//   const pathIdx = useMemo(() => indexByPath(NAV), []);
//   const levelMap = useMemo(() => {
//     const m: Record<string, number> = {};
//     const walk = (nodes: NavNode[], lvl = 0) => {
//       nodes.forEach((n) => {
//         m[n.key] = lvl;
//         if (n.children?.length) walk(n.children, lvl + 1);
//       });
//     };
//     walk(NAV);
//     return m;
//   }, []);

//   useEffect(() => {
//     const hits = Object.keys(pathIdx).filter((p) => pathname.startsWith(p));
//     if (!hits.length) {
//       dispatch(setSelectedKey(undefined));
//       dispatch(setOpenKeys([]));
//       return;
//     }
//     const best = hits.sort((a, b) => b.length - a.length)[0];
//     const chain = pathIdx[best];
//     dispatch(setSelectedKey(chain.at(-1)));
//     dispatch(setOpenKeys(chain.slice(0, -1)));
//   }, [pathname, pathIdx, dispatch]);

//   const handleToggle = (k: string) => {
//     const isOpen = openKeys.includes(k);
//     if (isOpen) {
//       dispatch(setOpenKeys(openKeys.filter((x) => x !== k)));
//     } else {
//       const lvl = levelMap[k] ?? 0;
//       const keep = openKeys.filter((x) => levelMap[x] !== lvl);
//       dispatch(setOpenKeys([...keep, k]));
//     }
//   };

//   return (
//     <Sider
//       className="sticky top-0 h-svh flex overflow-hidden !bg-[#0a4660]"
//       width={300}
//       theme="light"
//       collapsible
//       collapsed={collapsed}
//       onCollapse={(c) => dispatch(setCollapsed(c))}
//       breakpoint="lg"
//       trigger={null}

//     >

//       <div className="flex h-full min-h-0 w-full flex-col overflow-hidden">

//         <div className="h-[72px] w-full shrink-0 bg-[#dbeef6] px-4 flex items-center justify-center">
//           <Image src="/logo.png" alt="Logo" width={260} height={60} className="h-20 w-auto" priority />
//         </div>

//       <nav
//       className="flex-1 min-h-0 overflow-y-auto overscroll-contain no-scrollbar bg-[#0a4660] text-[#9cd4ea] pr-2"
//       style={{ maxHeight: "calc(100svh - 72px)" }}
//       >
//           <ul className="p-2">
//             {NAV.map((node) => (
//               <SidebarItem
//                 key={node.key}
//                 node={node}
//                 depth={0}
//                 collapsed={collapsed}
//                 openKeys={openKeys}
//                 selectedKey={selectedKey}
//                 onToggle={handleToggle}
//                 onSelect={(k) => dispatch(setSelectedKey(k))}
//               />
//             ))}
//           </ul>
//         </nav>
//       </div>
//     </Sider>
//   );
// }

// function SidebarItem({
//   node,
//   depth,
//   collapsed,
//   openKeys,
//   selectedKey,
//   onToggle,
//   onSelect,
// }: {
//   node: NavNode;
//   depth: number;
//   collapsed: boolean;
//   openKeys: string[];
//   selectedKey?: string;
//   onToggle: (key: string) => void;
//   onSelect: (key: string) => void;
// }) {
//   const router = useRouter();
//   const hasChildren = Array.isArray(node.children) && node.children.length > 0;
//   // console.log("check hasChildren", hasChildren);
//   const isOpen = openKeys.includes(node.key);
//   const isSelected = selectedKey === node.key;

//   const isDashboard =
//     node.href === "/dashboard" ||
//     node.key === "dashboard" ||
//     (typeof node.label === "string" && node.label.toLowerCase() === "dashboard");

//   const isRoot = depth === 0;
//   const baseText = isRoot ? "text-slate-100" : "text-slate-200";
//   const hoverBg = isRoot ? "hover:bg-[#425c77]" : "hover:bg-[#253544]";
//   const selectedBg = isRoot ? "bg-[#425c77]" : "bg-[#253544]";
//   const activeText = !isDashboard && (isSelected || (hasChildren && isOpen)) ? "text-[#9cd4ea]" : "";
//   const activeBg = !isDashboard && (isSelected || (hasChildren && isOpen)) ? selectedBg : "";

//   const BASE_X = 16;
//   const INDENT_STEP = 16;
//   const indentPx = BASE_X + (collapsed ? 0 : depth * INDENT_STEP);

//   return (
//     <li>
//       <div
//         className={[
//           "group flex items-center gap-3 px-4 py-3 rounded-md transition-colors duration-150 cursor-pointer",
//           baseText,
//           hoverBg,
//           "hover:text-[#9cd4ea]",
//           activeBg,
//           activeText,
//           collapsed ? "justify-center" : "",
//         ].join(" ")}
//         style={{ paddingLeft: indentPx }}
//         onClick={() => {
//           if (hasChildren) onToggle(node.key);
//           else {
//             if (!isDashboard) onSelect(node.key);
//             if (node.href) router.push(node.href);
//           }
//         }}
//       >
//         <i className={`las la-${node.icon ?? "box"} text-xl text-current`} aria-hidden />
//         {!collapsed && (
//           <>
//             <span className="flex-1 text-sm">{node.label}</span>
//             {hasChildren && (
//               <i className={`las la-chevron-right transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`} />
//             )}
//           </>
//         )}
//       </div>

//       {hasChildren && (
//         <div className={`grid transition-[grid-template-rows] duration-200 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
//           <ul className={`overflow-hidden mt-1 space-y-1 transition-opacity duration-200 ease-out ${isOpen ? "opacity-100" : "opacity-0"}`}>
//             {node.children!.map((child) => (
//               <SidebarItem
//                 key={child.key}
//                 node={child}
//                 depth={depth + 1}
//                 collapsed={collapsed}
//                 openKeys={openKeys}
//                 selectedKey={selectedKey}
//                 onToggle={onToggle}
//                 onSelect={onSelect}
//               />
//             ))}
//           </ul>
//         </div>
//       )}
//     </li>
//   );
// }
