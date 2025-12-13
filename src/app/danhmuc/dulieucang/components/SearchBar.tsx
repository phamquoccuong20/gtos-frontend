"use client";

import { Input } from "antd";
import { useEffect, useState } from "react";

type Props = {
  value?: string;
  placeholder?: string;
  onChange: (value: string) => void; 
  debounceMs?: number;
  className?: string;
  defaultValue?: string;
  label?: string;
  onAdd?: () => void;
  addText?: string;
};

export default function SearchBar({
  // value = "",
  placeholder = "Tìm kiếm…",
  onChange,
  debounceMs = 300,
  className,
  defaultValue = "",
  label,
  onAdd,
  addText,
}: Props) {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    const t = setTimeout(() => onChange(value.trim()), debounceMs);
    return () => clearTimeout(t);
  }, [value, debounceMs, onChange]);

  return (
    <div className={["flex items-center gap-2", className].filter(Boolean).join(" ")}>
      {label ? <span className="text-slate-700">{label}</span> : null}
      <Input.Search
        allowClear
        value={value}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        onSearch={(v) => setValue(v)}
        style={{ maxWidth: 320 }}
      />
    </div>
  );
}