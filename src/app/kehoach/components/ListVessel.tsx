"use client";

import raw from "@/data/listvessel.json";
import {
  Button,
  Form,
  Input,
  Modal,
  Radio,
  Select,
  Space,
  Table,
  TableProps,
  Typography,
} from "antd";
import { useMemo, useState } from "react";

type Row = {
  id: number;
  stt: number;
  VesslName: string;
  LastPort: string;
  NextPort: string;
  ATA: string;
  ETA: string;
  ETD: string;
  InLane: string;
  OutLane: string;
};

const options = [
  { label: "2020", value: "2021" },
  { label: "2022", value: "2022" },
  { label: "2023", value: "2023" },
  { label: "2024", value: "2024" },
  { label: "2025", value: "2025" },
];

const { Text } = Typography;

const INITIAL = (raw as any[]).map((r, i) => ({
  id: r.id ?? i + 1,
  stt: r.stt ?? i + 1,
  VesslName: r.VesslName ?? "",
  LastPort: r.LastPort ?? "",
  NextPort: r.NextPort ?? "",
  ATA: r.ATA ?? "",
  ETA: r.ETA ?? "",
  ETD: r.ETD ?? "",
  InLane: r.InLane ?? "",
  OutLane: r.OutLane ?? "",
}));

export default function ListVessel({ open, onClose, onConfirm }: any) {
  const [q, setQ] = useState("");
  const [data, setData] = useState<Row[]>(INITIAL);
  const [selectedKey, setSelectedKey] = useState<number | null>(null);
  const [form] = Form.useForm<Row>();

  const filtered = useMemo(() => {
    if (!q) return data;
    const s = q.toLowerCase();
    return data.filter((r) => JSON.stringify(r).toLowerCase().includes(s));
  }, [data, q]);

  const columns: TableProps<Row>["columns"] = [
    {
      title: "STT",
      dataIndex: "stt",
      width: 70,
      fixed: "left" as const,
      align: "center",
      onHeaderCell: () => ({
        style: { background: "#1971c2", color: "white", border: "none" },
      }),
    },
    {
      title: "Tên tàu",
      dataIndex: "VesslName",
      width: 160,
      align: "center",
      onCell: (record) => ({
        style: {
          background: record.ETA ? undefined : "#fff1f0",
        },
      }),
      onHeaderCell: () => ({
        style: { background: "#1971c2", color: "white", border: "none" },
      }),
    },
    {
      title: "Chuyến nhập",
      dataIndex: "LastPort",
      width: 120,
      align: "center",
      onHeaderCell: () => ({
        style: { background: "#1971c2", color: "white", border: "none" },
      }),
    },
    {
      title: "Chuyến xuất",
      dataIndex: "NextPort",
      width: 120,
      align: "center",
      onHeaderCell: () => ({
        style: { background: "#1971c2", color: "white", border: "none" },
      }),
    },
    {
      title: "ATA",
      dataIndex: "ATA",
      width: 160,
      align: "center",
      onHeaderCell: () => ({
        style: { background: "#1971c2", color: "white", border: "none" },
      }),
    },
    {
      title: "ETA",
      dataIndex: "ETA",
      width: 160,
      align: "center",
      onHeaderCell: () => ({
        style: { background: "#1971c2", color: "white", border: "none" },
      }),
    },
    {
      title: "ETD",
      dataIndex: "ETD",
      width: 160,
      align: "center",
      onHeaderCell: () => ({
        style: { background: "#1971c2", color: "white", border: "none" },
      }),
    },
    {
      title: "Lane nhập",
      dataIndex: "InLane",
      width: 120,
      align: "center",

      onHeaderCell: () => ({
        style: { background: "#1971c2", color: "white", border: "none" },
      }),
    },
    {
      title: "Lane xuất",
      dataIndex: "OutLane",
      width: 120,
      align: "center",
      onHeaderCell: () => ({
        style: { background: "#1971c2", color: "white", border: "none" },
      }),
    },
  ];
  return (
    <>
      <Modal
        open={open}
        title="Danh mục tàu"
        width={1000}
        centered
        zIndex={1100}
        onCancel={onClose}
        footer={[
          <Button key="cancel" onClick={() => onClose(false)}>
            Đóng
          </Button>,
          <Button
            key="ok"
            type="primary"
            disabled={!selectedKey}
            onClick={() => {
              const selected = data.find((r) => r.id === selectedKey);
              if (selected) {
                onConfirm(selected);
              }
            }}
          >
            Xác nhận
          </Button>,
        ]}
        okButtonProps={{ disabled: !selectedKey }}
        onOk={onClose}
        styles={{
          body: { padding: 0 },
          header: { paddingTop: 20, paddingLeft: 24, paddingRight: 24 },
          footer: {
            paddingLeft: 24,
            paddingRight: 24,
            paddingBottom: 20,
            paddingTop: 20,
          },
          content: { padding: 0 },
        }}
      >
        <Form
          form={form}
          layout="inline"
          style={{
            marginBottom: 20,
            gap: 8,
            rowGap: 8,
            alignItems: "center",
            borderTop: "2px solid #ced4da",
            marginTop: 20,
            paddingTop: 20,
            paddingRight: 20,
            paddingLeft: 20,
            justifyContent: "space-between",
          }}
        // onFinish={handleLoad}
        >
          <Form.Item name="name" label="Tàu" style={{ minWidth: 200 }}>
            <Input
              allowClear
              placeholder="Tên tàu"
            // onPressEnter={handleLoad}
            />
          </Form.Item>
          <Form.Item name="year" label="Năm">
            <Select options={options} style={{ width: 120 }} />
          </Form.Item>
          <Form.Item noStyle shouldUpdate>
            {() => (
              <Space align="center" style={{ marginLeft: 8 }}>
                <Form.Item name="direction" style={{ marginBottom: 0 }}>
                  <Radio.Group>
                    <Radio value="direction">Đến cảng</Radio>
                    <Radio value="depart">Rời cảng</Radio>
                  </Radio.Group>
                </Form.Item>
              </Space>
            )}
          </Form.Item>
          <div>
            <label>Tìm</label>
            <Input
              placeholder="Tìm nhanh..."
              allowClear
              value={q}
              onChange={(e) => setQ(e.target.value)}
              style={{ width: 200 }}
            />
          </div>
        </Form>
        <div
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
            marginBottom: 20,
            paddingLeft: 20,
            paddingRight: 20,
            borderTop: "1px solid #ced4da",
            paddingTop: 20,
          }}
        >
          <div style={{ marginLeft: "auto" }}>
            <Text>Số dòng: {filtered.length}</Text>
          </div>
        </div>
        <div className="px-5">
          <Table
            rowKey="id"
            size="middle"
            columns={columns}
            dataSource={filtered}
            pagination={false}
            sticky
            scroll={{ y: 250, x: 1100 }}
            bordered
            rowClassName={(record) =>
              record.id === selectedKey ? "ant-table-row-selected" : ""
            }
            onRow={(record) => ({
              onDoubleClick: () => {
                setSelectedKey(record.id);
                onClose(false);
              },
              onClick: () => setSelectedKey(record.id),
            })}
          />
        </div>
      </Modal>
    </>
  );
}
