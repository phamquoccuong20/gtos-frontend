"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type LinkItem = { label: string; href: string };

const QUICK_LINKS: LinkItem[] = [
  { label: "XE ĐẦU KÉO", href: "/xe-dau-keo" },
  { label: "CỔNG", href: "/cong" },
  { label: "KHO/BÃI", href: "/kho-bai" },
  { label: "TALLY", href: "/tally" },
];

export default function HeaderBar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b border-slate-200">
      <div className="h-[72px] px-4 md:px-6 flex items-center gap-4">
        {/* Title */}
        <h1 className="text-[18px] sm:text-[20px] md:text-[22px] font-extrabold tracking-wide text-[#ff4d2e]">
          GTOS - CẢNG TÂN THUẬN
        </h1>

        <div className="ml-auto flex items-center gap-6">
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              className="flex items-center gap-1 text-slate-600 hover:text-slate-900"
              onClick={() => setOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={open}
            >
              <span className="text-sm font-medium">LIÊN KẾT TRANG</span>
              <i
                className={`las la-angle-down transition-transform ${
                  open ? "rotate-180" : ""
                }`}
                aria-hidden
              />
            </button>

            {open && (
              <div
                className="absolute right-0 mt-2 w-56 rounded-lg border border-slate-200 bg-white shadow-lg ring-1 ring-black/5 overflow-hidden"
                role="menu"
                aria-label="Liên kết trang"
              >
                <ul className="py-1">
                  {QUICK_LINKS.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                        onClick={() => setOpen(false)}
                        role="menuitem"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* This is just temporary */}
          <div className="hidden sm:flex items-center gap-2 text-sm text-slate-600">
            <span>Welcome, Administrator</span>
            <i className="las la-arrow-right" aria-hidden />
          </div>
        </div>
      </div>
    </header>
  );
}
