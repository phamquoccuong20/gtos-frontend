"use client";

import { Radio } from "antd";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function TransportTypeSelector({ value, onChange }: Props) {
  return (
    <Radio.Group
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="transport-type-selector"
    >
      <Radio value="1">Xe đầu kéo</Radio>
      <Radio value="2">Romooc</Radio>
      <Radio value="3">Xe nâng bãi</Radio>
      <Radio value="4">Xe nâng hầm</Radio>
      <Radio value="5">Xe nâng đầu cần</Radio>
      <Radio value="6">Cẩu xếp dỡ</Radio>
      <Radio value="7">Tổ CNBX</Radio>
    </Radio.Group>
  );
}
