"use client";

import { Button } from "antd";

interface Props {
  onLoad: () => void;
  onSave: () => void;
}

export default function HeaderActions({ onLoad, onSave }: Props) {
  return (
    <div className="header-actions">
      <Button type="primary" onClick={onLoad}>
        Nạp dữ liệu
      </Button>

      <Button type="default" onClick={onSave}>
        Lưu dữ liệu
      </Button>
    </div>
  );
}
