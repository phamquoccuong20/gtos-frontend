"use client";

import { Table, Checkbox } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TruckOutItem } from "../../types/truckOut";

interface Props {
  data: TruckOutItem[];
  cellarCount: number;
  onChange: (newRows: TruckOutItem[]) => void;
}

export default function TruckOutTable({ data, cellarCount, onChange }: Props) {
  const baseCols: ColumnsType<TruckOutItem> = [
    {
      title: "STT",
      width: 60,
      render: (_, __, index) => index + 1,
    },
    {
      title: "Số xe",
      dataIndex: "DeviceID",
      width: 140,
    },
    {
      title: "Thuê",
      dataIndex: "isLease",
      width: 100,
      render: (v) =>
        v === 1 ? "Thuê" : v === 2 ? "Tân Thuận 2" : "Tân Thuận 1",
    },
  ];

  const cellarCols: ColumnsType<TruckOutItem> =
    cellarCount > 0
      ? Array.from({ length: cellarCount }).map((_, i) => ({
          title: `Hầm ${i + 1}`,
          dataIndex: `Cellar_${i + 1}`,
          width: 90,
          render: (_, row, rowIndex) => (
            <Checkbox
              checked={row[`Cellar_${i + 1}`] === 1}
              onChange={(e) => {
                const newData = [...data];
                newData[rowIndex][`Cellar_${i + 1}`] = e.target.checked ? 1 : 0;
                onChange(newData);
              }}
            />
          ),
        }))
      : [
          {
            title: "Phân bổ",
            dataIndex: "Cellar_Salan",
            width: 100,
            render: (_, row, rowIndex) => (
              <Checkbox
                checked={row["Cellar_Salan"] === 1}
                onChange={(e) => {
                  const newData = [...data];
                  newData[rowIndex]["Cellar_Salan"] = e.target.checked ? 1 : 0;
                  onChange(newData);
                }}
              />
            ),
          },
        ];

  return (
    <Table
      rowKey="DeviceID"
      columns={[...baseCols, ...cellarCols]}
      dataSource={data}
      pagination={false}
      scroll={{ y: "60vh" }}
    />
  );
}
