"use client";

import React, { useState } from "react";
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
const getIcon = (iconName: string) => {
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
    "x": "X"
  };

  const lucideName = nameMap[iconName] || "Circle";
  // Explicitly cast to any to allow dynamic access by string name
  // This avoids TypeScript errors about Element implicit 'any' type
  const IconComponent = (LucideIcons as any)[lucideName] || LucideIcons.Circle;
  return <IconComponent size={20} />;
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const [expandedKeys, setExpandedKeys] = useState<Record<string, boolean>>({});

  const toggleExpand = (key: string) => {
    setExpandedKeys(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const renderNavItem = (item: NavItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedKeys[item.key];
    const isActive = item.href ? pathname === item.href : false;

    // Distinct styling for top-level headers vs items
    const isTopLevel = level === 0;

    return (
      <div key={item.key} className="select-none">
        {hasChildren ? (
          <div
            onClick={() => toggleExpand(item.key)}
            className={`flex items-center px-4 py-3 cursor-pointer transition-colors duration-200 
              ${isTopLevel
                ? "hover:bg-blue-50/50 mt-1"
                : "hover:bg-gray-50"
              }
            `}
            style={{ paddingLeft: `${level * 12 + 24}px` }}
          >
            <span className={`mr-3 ${isTopLevel ? "text-blue-800" : "text-gray-500"}`}>
              {item.icon ? getIcon(item.icon) : <LucideIcons.Circle size={isTopLevel ? 18 : 14} />}
            </span>
            <span className={`flex-1 text-sm ${isTopLevel ? "font-bold uppercase tracking-wide text-gray-700" : "text-gray-600"}`}>
              {item.label}
            </span>
            <span className="text-gray-400">
              {isExpanded ? <LucideIcons.ChevronDown size={16} /> : <LucideIcons.ChevronRight size={16} />}
            </span>
          </div>
        ) : (
          <Link
            href={item.href || "#"}
            onClick={onClose}
            className={`flex items-center px-4 py-3 transition-all duration-200 group
              ${isActive
                ? "bg-blue-50 text-blue-700 font-medium border-r-4 border-blue-600"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:translate-x-1"
              }
            `}
            style={{ paddingLeft: `${level * 12 + 24}px` }}
          >
            <span className={`mr-3 ${isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"}`}>
              {item.icon ? getIcon(item.icon) : <LucideIcons.Circle size={isTopLevel ? 18 : 14} />}
            </span>
            <span className={`text-sm ${isTopLevel ? "font-bold uppercase tracking-wide" : ""}`}>
              {item.label}
            </span>
          </Link>
        )}

        {hasChildren && item.children && (
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`}
          >
            {item.children.map(child => renderNavItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-[2px] z-30 transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-[320px] bg-white shadow-2xl z-40 transform transition-transform duration-300 ease-out flex flex-col ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="h-20 bg-[#004e9a] flex items-center justify-between px-6 text-white shadow-md flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
              <LucideIcons.Layers size={18} />
            </div>
            <span className="font-bold text-lg tracking-wide">Navigator</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
          >
            <LucideIcons.X size={20} />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 py-4">
          {navData.items.map((item) => renderNavItem(item))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
