"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as LucideIcons from "lucide-react";
import navDataRaw from "../data/navdata.json";

// Define the shape of our navigation data
interface NavItem {
  key: string;
  label: string;
  href?: string;
  icon?: string;
  children?: NavItem[];
}

const navData = navDataRaw as { items: NavItem[] };

// Helper to map icon names from JSON to Lucide components
const getIcon = (iconName: string, size: number = 18) => {
  const nameMap: Record<string, string> = {
    "home": "Home",
    "cog": "Settings",
    "cogs": "Settings2",
    "users": "Users",
    "user": "User",
    "user-lock": "UserCheck",
    "stream": "Menu",
    "anchor": "Anchor",
    "dollar-sign": "DollarSign",
    "globe": "Globe",
    "compass": "Compass",
    "calendar-check": "CalendarCheck",
    "warehouse": "Warehouse",
    "project-diagram": "Network",
    "boxes": "Package",
    "box": "Box",
    "tasks": "ListTodo",
    "exchange-alt": "ArrowLeftRight",
    "route": "Route",
    "sliders-h": "SlidersHorizontal",
    "clipboard-check": "ClipboardCheck",
    "user-tag": "UserCog",
    "toolbox": "Wrench",
    "ship": "Ship",
    "id-badge": "BadgeInfo",
    "percentage": "Percent",
    "clipboard-list": "ClipboardList",
    "calendar-alt": "CalendarDays",
    "binoculars": "Binoculars",
    "truck": "Truck",
    "sync": "RefreshCw",
    "truck-moving": "Truck",
    "file-import": "FileInput",
    "file-export": "FileOutput",
    "file-invoice-dollar": "FileText",
    "file-invoice": "FileText",
    "print": "Printer",
    "ban": "Ban",
    "history": "History",
    "pen": "Pen",
    "barcode": "ScanBarcode",
    "file-contract": "FileSignature",
    "door-open": "DoorOpen",
    "hand-holding-usd": "HandCoins",
    "chart-bar": "BarChart3",
    "handshake": "Handshake",
    "random": "Shuffle",
    "th": "Grid",
    "file-alt": "FileText",
    "landmark": "Landmark",
    "file-signature": "FileSignature",
    "download": "Download",
    "money-bill": "Banknote",
    "book": "Book",
    "layers": "Layers",
    "bar-chart-3": "BarChart3",
    "help-circle": "HelpCircle",
    "x": "X",
    "ruler-combined": "Ruler",
  };

  const lucideName = nameMap[iconName] || "Circle";
  const IconComponent = (LucideIcons as any)[lucideName] || LucideIcons.Circle;
  return <IconComponent size={size} />;
};

// Card icon colors for L3 items (cycling through)
const cardColors = [
  "#3b82f6", "#8b5cf6", "#f59e0b", "#10b981", "#f43f5e", "#06b6d4",
  "#6366f1", "#ec4899", "#14b8a6", "#f97316", "#84cc16", "#a855f7",
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const [expandedL1, setExpandedL1] = useState<string | null>(null);
  const [selectedL2, setSelectedL2] = useState<string | null>(null);

  // Find selected L2 data
  const expandedL1Data = navData.items.find(item => item.key === expandedL1);
  const selectedL2Data = expandedL1Data?.children?.find(item => item.key === selectedL2);
  const showRightPanel = selectedL2 !== null && selectedL2Data?.children && selectedL2Data.children.length > 0;

  // Close on Escape key
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Auto-detect current page and expand the correct sections
  useEffect(() => {
    if (isOpen) {
      for (const item of navData.items) {
        if (item.href === pathname) {
          setExpandedL1(item.key);
          return;
        }
        if (item.children) {
          for (const child of item.children) {
            if (child.href === pathname) {
              setExpandedL1(item.key);
              setSelectedL2(child.key);
              return;
            }
            if (child.children) {
              for (const gc of child.children) {
                if (gc.href === pathname) {
                  setExpandedL1(item.key);
                  setSelectedL2(child.key);
                  return;
                }
              }
            }
          }
        }
      }
    }
  }, [isOpen, pathname]);

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      setExpandedL1(null);
      setSelectedL2(null);
    }
  }, [isOpen]);

  const handleL1Click = (item: NavItem) => {
    if (!item.children || item.children.length === 0) {
      onClose();
      return;
    }
    if (expandedL1 === item.key) {
      setExpandedL1(null);
      setSelectedL2(null);
    } else {
      setExpandedL1(item.key);
      setSelectedL2(null);
    }
  };

  const handleL2Click = (item: NavItem) => {
    if (!item.children || item.children.length === 0) {
      onClose();
      return;
    }
    setSelectedL2(selectedL2 === item.key ? null : item.key);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/25 z-[70] transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Container */}
      <div
        ref={panelRef}
        className={`fixed top-0 left-0 h-full z-[80] flex transition-transform duration-300 ease-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* ══════════ LEFT SIDEBAR ══════════ */}
        <div className="w-[280px] h-full bg-white flex flex-col shadow-xl shrink-0 border-r border-gray-100">

          {/* Header: Logo + Close */}
          <div className="flex items-center justify-between px-5 h-[60px] shrink-0 bg-[#004e9a]">
            <div className="flex items-center gap-2">
              <div className="flex gap-[3px]">
                <div className="w-[7px] h-[7px] rounded-full bg-white/70" />
                <div className="w-[7px] h-[7px] rounded-full bg-white/40" />
              </div>
              <span className="font-extrabold text-[15px] tracking-tight">
                <span className="text-white">GTOS</span>
                <span className="text-white/60 font-medium ml-0.5">Port</span>
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-white/20 rounded-lg transition-colors text-white/70 hover:text-white"
            >
              <LucideIcons.X size={16} />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 overflow-y-auto py-3 px-3">
            {navData.items.map((item) => {
              const hasChildren = item.children && item.children.length > 0;
              const isExpanded = expandedL1 === item.key;
              const isActivePage = !hasChildren && item.href === pathname;

              return (
                <div key={item.key} className="mb-0.5">
                  {/* L1 item */}
                  {hasChildren ? (
                    <button
                      onClick={() => handleL1Click(item)}
                      className={`
                        w-full flex items-center gap-3 px-3 py-[10px] rounded-lg text-[13px] font-semibold transition-all duration-200 text-left group
                        ${isExpanded
                          ? "bg-blue-50 text-[#004e9a]"
                          : "text-gray-700 hover:bg-gray-50 hover:text-gray-800"
                        }
                      `}
                    >
                      <span className={`shrink-0 ${isExpanded ? "text-[#004e9a]" : "text-gray-400 group-hover:text-gray-500"}`}>
                        {item.icon ? getIcon(item.icon, 18) : <LucideIcons.Circle size={18} />}
                      </span>
                      <span className="flex-1 truncate">{item.label}</span>
                      <LucideIcons.ChevronRight
                        size={14}
                        className={`shrink-0 transition-transform duration-200 ${isExpanded ? "rotate-90 text-[#004e9a]" : "text-gray-300"}`}
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href || "#"}
                      onClick={onClose}
                      className={`
                        flex items-center gap-3 px-3 py-[10px] rounded-lg text-[13px] font-semibold transition-all duration-200 group
                        ${isActivePage
                          ? "bg-blue-50 text-[#004e9a]"
                          : "text-gray-700 hover:bg-gray-50 hover:text-gray-800"
                        }
                      `}
                    >
                      <span className={`shrink-0 ${isActivePage ? "text-[#004e9a]" : "text-gray-400 group-hover:text-gray-500"}`}>
                        {item.icon ? getIcon(item.icon, 18) : <LucideIcons.Circle size={18} />}
                      </span>
                      <span className="flex-1 truncate">{item.label}</span>
                    </Link>
                  )}

                  {/* L2 children (expanded inline) */}
                  {hasChildren && (
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"}`}
                    >
                      <div className="ml-3 pl-3 mt-1 mb-1 border-l-[2px] border-gray-200">
                        {item.children?.map((child) => {
                          const childHasChildren = child.children && child.children.length > 0;
                          const isL2Active = selectedL2 === child.key;
                          const isChildPage = !childHasChildren && child.href === pathname;

                          return childHasChildren ? (
                            <button
                              key={child.key}
                              onClick={() => handleL2Click(child)}
                              className={`
                                w-full flex items-center gap-2.5 px-3 py-[9px] rounded-lg text-[13px] font-medium transition-all duration-200 text-left group mb-0.5
                                ${isL2Active
                                  ? "bg-[#004e9a] text-white font-semibold shadow-sm"
                                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-700"
                                }
                              `}
                            >
                              <span className={`shrink-0 ${isL2Active ? "text-white/80" : "text-gray-400"}`}>
                                {child.icon ? getIcon(child.icon, 15) : <LucideIcons.Circle size={15} />}
                              </span>
                              <span className="flex-1 truncate">{child.label}</span>
                              {isL2Active && (
                                <LucideIcons.ChevronRight size={13} className="text-white/60 shrink-0" />
                              )}
                            </button>
                          ) : (
                            <Link
                              key={child.key}
                              href={child.href || "#"}
                              onClick={onClose}
                              className={`
                                flex items-center gap-2.5 px-3 py-[9px] rounded-lg text-[13px] font-medium transition-all duration-200 group mb-0.5
                                ${isChildPage
                                  ? "bg-[#004e9a] text-white font-semibold shadow-sm"
                                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-700"
                                }
                              `}
                            >
                              <span className={`shrink-0 ${isChildPage ? "text-white/80" : "text-gray-400"}`}>
                                {child.icon ? getIcon(child.icon, 15) : <LucideIcons.Circle size={15} />}
                              </span>
                              <span className="flex-1 truncate">{child.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Footer: User info */}
          <div className="border-t border-gray-100 px-4 py-3 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-xs font-bold">
                AD
              </div>
              <div className="min-w-0">
                <p className="text-[12px] font-semibold text-gray-700 truncate">Admin User</p>
                <p className="text-[10px] text-gray-400 truncate">admin@gtos-port.vn</p>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════ RIGHT PANEL: L3 Cards ══════════ */}
        <div
          className={`h-full bg-[#f8f9fb] flex flex-col transition-all duration-300 ease-out overflow-hidden ${showRightPanel ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          style={{ width: showRightPanel ? "calc(100vw - 280px)" : "0px" }}
        >
          {showRightPanel && selectedL2Data && (
            <>
              {/* Right panel header */}
              <div className="px-10 pt-8 pb-6 shrink-0">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#004e9a] flex items-center justify-center text-white shadow-md">
                    {selectedL2Data.icon ? getIcon(selectedL2Data.icon, 24) : <LucideIcons.Circle size={24} />}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{selectedL2Data.label}</h2>
                    <p className="text-sm text-gray-400 mt-0.5">Chọn loại nghiệp vụ bạn muốn thực hiện</p>
                  </div>
                </div>
              </div>

              {/* Cards grid */}
              <div className="flex-1 overflow-y-auto px-10 pb-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {selectedL2Data.children?.map((item, idx) => {
                    const isCurrentPage = item.href === pathname;
                    const color = cardColors[idx % cardColors.length];

                    return (
                      <Link
                        key={item.key}
                        href={item.href || "#"}
                        onClick={onClose}
                        className={`
                          relative bg-white rounded-2xl border transition-all duration-200 group overflow-hidden
                          ${isCurrentPage
                            ? "border-[#004e9a]/30 shadow-lg shadow-blue-100 ring-1 ring-[#004e9a]/10"
                            : "border-gray-100 hover:border-gray-200 hover:shadow-lg hover:-translate-y-0.5"
                          }
                        `}
                      >
                        <div className="p-5">
                          {/* Icon */}
                          <div
                            className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-105"
                            style={{
                              backgroundColor: isCurrentPage ? "#004e9a" : color + "14",
                              color: isCurrentPage ? "white" : color,
                            }}
                          >
                            {item.icon ? getIcon(item.icon, 20) : <LucideIcons.Circle size={20} />}
                          </div>

                          {/* Title */}
                          <h3 className={`text-[14px] font-semibold mb-1 ${isCurrentPage ? "text-[#004e9a]" : "text-gray-800"}`}>
                            {item.label}
                          </h3>

                          {/* Description (generated from label) */}
                          <p className="text-[12px] text-gray-400 leading-relaxed">
                            Quản lý {item.label.toLowerCase()}
                          </p>
                        </div>

                        {/* Active indicator */}
                        {isCurrentPage && (
                          <div className="absolute top-0 left-0 w-full h-[3px] bg-[#004e9a] rounded-b" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {/* Empty state when no L2 is selected but panel might show */}
          {!showRightPanel && expandedL1 && (
            <div className="flex-1 flex items-center justify-center text-gray-300">
              <div className="text-center">
                <LucideIcons.MousePointerClick size={48} className="mx-auto mb-4 opacity-30" />
                <p className="text-sm text-gray-400">Chọn danh mục bên trái</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
