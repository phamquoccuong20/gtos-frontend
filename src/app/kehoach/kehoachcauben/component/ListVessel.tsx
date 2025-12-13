"use client";

import raw from "@/data/kehoachcapben.json";
import { Button, Form, Input, Modal, Table, TableProps, Typography } from "antd";
import { useMemo, useState } from "react";
import styles from "./wharf.module.scss";

type Row = {
  id: number;
  stt?: number;
  VesslName: string;
  VesslID: string;
  dork: string;
  IMO: number | null;
}

const INITIAL: Row[] = (raw as any[]).map((r, i) => ({
  id: r.id ?? i + 1,
  stt: r.stt,
  VesslName: r.VesslName ?? "",
  VesslID: r.VesslID ?? "",
  dork: r.dork ?? "",
  IMO: r.IMO ?? null,
}));

const { Text } = Typography;

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
      title: 'STT', dataIndex: 'stt', width: 30, fixed: 'left' as const, align: "center",
      onHeaderCell: () => ({ style: { background: '#74c0fc', color: '#1971c2' } })
    },
    // { title: 'Mã tàu', dataIndex: 'VesslID', width: 100, align:"center",
    //   onHeaderCell: () => ({ className: styles.colHidden }),
    //   onCell: () => ({ className: styles.colHidden }),
    // },
    {
      title: 'Tên tàu', dataIndex: 'VesslName', width: 100, align: "center",
      onHeaderCell: () => ({ style: { background: '#74c0fc', color: '#1971c2' } })
    },
    {
      title: 'Hãng khai thác', dataIndex: 'dork', width: 70, align: "center",
      onHeaderCell: () => ({ style: { background: '#74c0fc', color: '#1971c2' } })
    },
    {
      title: 'IMO', dataIndex: 'IMO', width: 70, align: "center",
      onHeaderCell: () => ({ style: { background: '#74c0fc', color: '#1971c2' } })
    },
  ];
  return (
    <div>
      <Modal
        open={open}
        title="Danh mục tàu"
        width={800}
        centered
        zIndex={1100}
        onCancel={onClose}
        footer={[
          <Button key="cancel" onClick={() => onClose(false)}>Đóng</Button>,
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
          footer: { paddingLeft: 24, paddingRight: 24, paddingBottom: 20, paddingTop: 20 },
          content: { padding: 0 },
        }}
      >
        <div style={{
          display: "flex", gap: 12, alignItems: "center", marginBottom: 20, paddingLeft: 20, paddingRight: 20,
          borderTop: "1px solid #ced4da", paddingTop: 20
        }}>
          <label>Tìm</label>
          <Input
            placeholder="Tìm nhanh..."
            allowClear
            value={q}
            onChange={(e) => setQ(e.target.value)}
            style={{ width: 200 }}
          />
          <div style={{ marginLeft: "auto" }}>
            <Text>Số dòng: {filtered.length}</Text>
          </div>
        </div>
        <div className="px-5">
          <Table
            key={"th"}
            size="middle"
            columns={columns}
            dataSource={filtered}
            pagination={false}
            sticky
            scroll={{ y: 250 }}
            bordered
            rowClassName={(record) =>
              record.id === selectedKey ? "ant-table-row-selected" : ""
            }
            onRow={(record) => ({
              onDoubleClick: () => {
                setSelectedKey(record.id);
                onClose(false)
              },
              onClick: () => setSelectedKey(record.id)
            })}
          />
        </div>
      </Modal>
    </div>
  )
}