"use client";

import { Modal, Table, Input, Radio, Select, Button } from "antd";
import { useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { fetchVessels } from "../../services/truckOut.service";
// import { VesselInfo } from "@/types/truckOut";
import { VesselInfo } from "../../types/truckOut";

interface Props {
  open: boolean;
  onClose: () => void;
  onSelect: (info: VesselInfo) => void;
}

export default function VoyageSelector({ open, onClose, onSelect }: Props) {
  const [rows, setRows] = useState<VesselInfo[]>([]);
  const [year, setYear] = useState<number>(2025);
  const [name, setName] = useState<string>("");

  async function load() {
    const res = await fetchVessels({
      filter: {
        VesselName: { operation: "like", value: name },
        Status: { operation: "in", value: [0, 1, 2, 3, 4, 5] },
      },
    });

    setRows(res.data);
  }

  const columns: ColumnsType<VesselInfo> = [
    { title: "Tên tàu", dataIndex: "VesselName" },
    { title: "Chuyến nhập", dataIndex: "InboundVoyage" },
    { title: "Chuyến xuất", dataIndex: "OutboundVoyage" },
    { title: "ATA", dataIndex: "ATA" },
  ];

  return (
    <Modal
      open={open}
      onCancel={onClose}
      onOk={onClose}
      width={900}
      title="Chọn tàu"
    >
      <div className="filter-row">
        <Input
          placeholder="Tên tàu"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Select
          value={year}
          onChange={setYear}
          options={Array.from({ length: 10 }).map((_, i) => ({
            value: 2016 + i,
            label: 2016 + i,
          }))}
        />
        <Button onClick={load}>Nạp</Button>
      </div>

      <Table
        columns={columns}
        dataSource={rows}
        rowKey="VoyageKey"
        onRow={(record) => ({
          onDoubleClick: () => {
            onSelect(record);
            onClose();
          },
        })}
      />
    </Modal>
  );
}
