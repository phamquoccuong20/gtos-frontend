'use client';

import React, { useState } from 'react';
import { Ship, ChevronDown, Globe, Link as LinkIcon, User } from 'lucide-react';
import { Language } from '../types';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  onLogout?: () => void;
  onShowHelp?: () => void;
}

export default function Header({ language, setLanguage, onLogout, onShowHelp }: HeaderProps) {
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showLinksDropdown, setShowLinksDropdown] = useState(false);

  return (
    <header 
      className="bg-white border-b border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
      style={{
        borderRadius: '4px', // STRICT RULE - Set all border-radius to 4px
        padding: '14px',    // STRICT RULE - Set padding to 14px
      }}
    >
      {/* Brand logo imitating the screenshot */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          {/* MTIP Red/Blue styled logo markup */}
          <div className="flex items-baseline gap-1.5 select-none">
            <span className="text-3xl font-extrabold tracking-tight text-red-600 font-sans" style={{ fontStyle: 'normal' }}>
              MTIP
            </span>
            <div className="flex flex-col leading-none">
              <span className="text-[10px] font-bold text-slate-800 uppercase tracking-wider">My Thuy</span>
              <span className="text-[8px] text-blue-600 font-semibold uppercase tracking-widest">International Port JVC</span>
            </div>
          </div>
        </div>

        <div className="h-6 w-[1px] bg-slate-200 hidden md:block"></div>

        {/* Dynamic port indicator */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <Ship className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
          <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-[4px] border border-blue-100 uppercase tracking-wider">
            Live Link
          </span>
        </div>
      </div>

      {/* Main GTOS Cảng Mỹ Thủy title */}
      <div className="text-center md:flex-1 md:px-4">
        <h1 className="text-lg md:text-xl font-bold text-red-600 tracking-wide select-none flex items-center justify-center gap-2 font-sans">
          GTOS - CẢNG MỸ THUỶ
        </h1>
      </div>

      {/* Right controls */}
      <div className="flex items-center flex-wrap gap-[14px]">
        {/* Language selector replica */}
        <div className="relative">
          <button
            id="btn-language-selector"
            onClick={() => {
              setShowLangDropdown(!showLangDropdown);
              setShowLinksDropdown(false);
            }}
            className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold px-2.5 py-1.5 cursor-pointer smooth-all text-slate-700"
            style={{ borderRadius: '4px' }}
          >
            <Globe className="w-3.5 h-3.5 text-slate-500" />
            <span>{language === 'VI' ? 'Tiếng Việt' : 'English'}</span>
            <span className="ml-1 text-[10px] bg-red-100 text-red-700 font-bold px-1 py-0.2" style={{ borderRadius: '4px' }}>
              {language}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>
          
          {showLangDropdown && (
            <div 
              className="absolute right-0 mt-1 w-36 bg-white border border-slate-200 shadow-md z-10 overflow-hidden"
              style={{ borderRadius: '4px' }}
            >
              <button
                id="btn-lang-vi"
                onClick={() => {
                  setLanguage('VI');
                  setShowLangDropdown(false);
                }}
                className={`w-full text-left px-3 py-2 text-xs hover:bg-slate-50 smooth-all font-medium ${language === 'VI' ? 'text-blue-600 bg-blue-50/50' : 'text-slate-600'}`}
              >
                🇻🇳 Tiếng Việt (VI)
              </button>
              <button
                id="btn-lang-en"
                onClick={() => {
                  setLanguage('EN');
                  setShowLangDropdown(false);
                }}
                className={`w-full text-left px-3 py-2 text-xs hover:bg-slate-50 smooth-all font-medium ${language === 'EN' ? 'text-blue-600 bg-blue-50/50' : 'text-slate-600'}`}
              >
                🇺🇸 English (EN)
              </button>
            </div>
          )}
        </div>

        {/* Replica of "LIÊN KẾT TRANG" dropdown */}
        <div className="relative">
          <button
            id="btn-links-dropdown"
            onClick={() => {
              setShowLinksDropdown(!showLinksDropdown);
              setShowLangDropdown(false);
            }}
            className="flex items-center gap-1.5 hover:text-blue-600 text-xs text-slate-500 smooth-all font-medium py-1.5 cursor-pointer"
          >
            <LinkIcon className="w-3.5 h-3.5" />
            <span>LIÊN KẾT TRANG</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>

          {showLinksDropdown && (
            <div 
              className="absolute right-0 mt-1 w-48 bg-white border border-slate-200 shadow-md z-10 overflow-hidden text-xs"
              style={{ borderRadius: '4px' }}
            >
              <a 
                href="#dt"
                className="block px-3 py-2 text-slate-600 hover:text-blue-600 hover:bg-slate-50 smooth-all"
                onClick={() => setShowLinksDropdown(false)}
              >
                Quản lý Tàu cập cảng
              </a>
              <a 
                href="#kh"
                className="block px-3 py-2 text-slate-600 hover:text-blue-600 hover:bg-slate-50 smooth-all"
                onClick={() => setShowLinksDropdown(false)}
              >
                Hồ sơ Khách hàng
              </a>
              <a 
                href="#kb"
                className="block px-3 py-2 text-slate-600 hover:text-blue-600 hover:bg-slate-50 smooth-all"
                onClick={() => setShowLinksDropdown(false)}
              >
                Khai báo hàng hoá
              </a>
            </div>
          )}
        </div>

        {/* User login representation */}
        <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1.5 select-none" style={{ borderRadius: '4px' }}>
          <div className="w-2 h-2 rounded-[4px] bg-emerald-500 animate-pulse"></div>
          <User className="w-3.5 h-3.5 text-slate-400" />
          <span>Xin chào, <span className="font-bold text-slate-800">admin</span></span>
        </div>

        {/* Demo dynamic reset triggers inside header actions or logout description */}
        <button
          id="btn-trigger-help"
          onClick={onShowHelp}
          className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-1.5 cursor-pointer smooth-all font-medium"
          style={{ borderRadius: '4px' }}
        >
          Hỗ trợ
        </button>
      </div>
    </header>
  );
}
