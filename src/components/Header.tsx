"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import { Menu, Bell, Settings, User, ChevronDown } from "lucide-react";
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

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isBellShaking, setIsBellShaking] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Dynamic title lookup
  const pageTitle = useMemo(() => {
    const findLabel = (items: NavItem[], path: string): string | null => {
      for (const item of items) {
        // Check for exact match first
        if (item.href === path) return item.label;

        // If we want to handle partial matches or sub-paths, we could add logic here.
        // For now, let's also recurse into children.
        if (item.children) {
          const childLabel = findLabel(item.children, path);
          if (childLabel) return childLabel;
        }
      }
      return null;
    };

    // If no match found, default to nothing or "Dashboard" if explicit match fails
    // However, since we want to show the category name, if it's strictly the root /dashboard we know it's DASHBOARD.
    // Let's rely on finding it in the JSON. If not found, fallback to 'GTOS'.
    const foundLabel = findLabel(navData.items, pathname);
    return foundLabel || "DASHBOARD";
  }, [pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        settingsRef.current &&
        !settingsRef.current.contains(event.target as Node)
      ) {
        setIsSettingsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="h-15 w-full flex items-center pr-6 pl-1 relative z-[60]">
      {/* 1. Menu Button - Detached, Dark Blue, Full Height */}
      <button
        onClick={onMenuClick}
        className="relative h-[96%] w-16 shrink-0 focus:outline-none group active:scale-95 transition-transform duration-200"
      >
        {/* Composite Background Shape */}
        <div className="absolute inset-0 flex transition-colors group-hover:brightness-110 my-[1px]">
          {/* Left Part: Straight Rectangle with rounded corners */}
          <div className="h-full w-3/4 bg-[#0054a6] rounded-l-lg z-10 shadow-sm my-[1px]"></div>

          {/* Right Part: Skewed Rectangle to create the slant */}
          <div className="h-full w-1/2 -ml-5 bg-[#0054a6] rounded-r-lg transform -skew-x-[15deg] origin-bottom-left z-0 shadow-sm my-[1px]"></div>
        </div>

        {/* Icon Layer */}
        <div className="absolute inset-0 flex items-center justify-center z-20 text-white">
          <Menu size={30} strokeWidth={2.5} />
        </div>
      </button>

      {/* 2. Main Branding Bar - Image Background */}
      {/* Replaced CSS shapes with an img tag as requested */}
      <div className="flex-1 h-full relative min-w-0 ml-2 -mr-6 z-10">
        {/* Background Image */}
        {/* 
            TODO: Replace the src below with the actual path to your uploaded image asset.
            Example: src="/header-bg.png"
        */}
        <img
          src="/img/header.png"
          alt="Header Background"
          className="inset-0 w-full h-full object-fill rounded-l-2xl"
        />

        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-center px-8 text-white z-10">
          {/* GTOS Text */}
          <div className="flex flex-col justify-center pointer-events-none gap-2">
            <h1 className="text-2xl font-bold tracking-wide">GTOS</h1>
            <span className="text-[11px] text-[#002F60] uppercase tracking-wider font-bold opacity-90 truncate max-w-[150px] sm:max-w-none">
              {pageTitle}
            </span>
          </div>

          {/* 
            CENTER BUTTON - Absolutely Centered in the Bar -translate-x-1/2
          */}
          <div className="absolute left-1/2 top-1/2 -translate-y-1/2 z-20 hidden md:block">
            <button className="bg-white/20 hover:bg-white/30 text-white px-[12px] py-[6px] rounded-[4px] text-sm font-bold backdrop-blur-md border border-white/20 shadow-lg transition-all whitespace-nowrap">
              Cảng Tân Thuận
            </button>
          </div>
        </div>
      </div>

      {/* 3. Right Icons Area - On White Background - blue bar overlaps on top */}
      <div className="flex items-center gap-3 pl-32 pr-2 shrink-0 bg-white shadow-lg rounded-bl -ml-28 h-full">
        {/* Notification */}
        <button
          onClick={() => {
            setIsBellShaking(true);
            setTimeout(() => setIsBellShaking(false), 500);
          }}
          className="p-3 hover:bg-gray-100 text-gray-500 hover:text-blue-600 rounded-full transition-colors relative"
        >
          <Bell size={22} className={isBellShaking ? 'animate-wiggle' : ''} />
          <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        {/* Settings Dropdown */}
        <div className="relative" ref={settingsRef}>
          <button
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className={`p-3 rounded-full transition-colors ${isSettingsOpen
              ? "bg-blue-50 text-blue-600"
              : "text-gray-500 hover:bg-gray-100 hover:text-blue-600"
              }`}
          >
            <Settings
              size={22}
              className={`transition-transform duration-500 ${isSettingsOpen ? 'rotate-180' : 'rotate-0'}`}
            />
          </button>

          {isSettingsOpen && (
            <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl py-1.5 text-gray-700 border border-gray-100 animate-in fade-in zoom-in-95 duration-200 origin-top-right z-[200] ring-1 ring-black/5">
              <button
                className="w-full text-left px-5 py-2.5 hover:bg-blue-50 hover:text-blue-600 text-sm font-medium transition-colors border-b border-gray-50"
                onClick={() => setIsSettingsOpen(false)}
              >
                Tally
              </button>
              <button
                className="w-full text-left px-5 py-2.5 hover:bg-blue-50 hover:text-blue-600 text-sm font-medium transition-colors"
                onClick={() => setIsSettingsOpen(false)}
              >
                Bãi/Kho
              </button>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-2 cursor-pointer hover:bg-gray-50 p-1.5 rounded-full pr-4 transition-colors border border-transparent hover:border-gray-100">
          <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 shadow-sm border border-blue-100">
            <User size={20} />
          </div>
          <div className="flex flex-col hidden sm:flex">
            <span className="text-sm font-bold text-gray-700 leading-tight">
              Admin
            </span>
            <span className="text-[10px] text-gray-400 font-medium">
              Super User
            </span>
          </div>
          <ChevronDown size={14} className="text-gray-400" />
        </div>
      </div>
    </header>
  );
};

export default Header;
