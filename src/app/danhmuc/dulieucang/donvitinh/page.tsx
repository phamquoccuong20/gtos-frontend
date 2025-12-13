"use client";

import { useMemo, useState } from "react";
import type { TableProps } from "antd";
import { Form, Input, InputNumber, Modal } from "antd";
import SearchBar from "../components/SearchBar";
import DataTable from "../components/Table";

import raw from "@/data/donvitinh.json";

type Row = {
  stt?: number;
  id: number;          
  maDVT: string;
  tenDVT: string;
  editable?: boolean;
};

const INITIAL: Row[] = (raw as any[]).map((r, i) => ({
  id: r.stt ?? i + 1,
  stt: r.stt,
  maDVT: r.maDVT ?? "",
  tenDVT: r.tenDVT ?? "",
}));

export default function DonViTinhPage() {
  const [q, setQ] = useState("");
  const [data, setData] = useState<Row[]>(INITIAL);
  const [open, setOpen] = useState(false);
  const [addCount, setAddCount] = useState<number | null>(null);
  const [form] = Form.useForm<Row>();

  const filtered = useMemo(() => {
    if (!q) return data;
    const n = q.toLowerCase();
    return data.filter((r) =>
      [r.maDVT, r.tenDVT].some((v) =>
        String(v ?? "").toLowerCase().includes(n)
      )
    );
  }, [data, q]);

  const updateCell = (id: number, field: keyof Row, value: any) => {
    setData(prev =>
      prev.map(r => (r.id === id ? { ...r, [field]: value } : r))
    );
  };

  const addBlankRows = (n: number) => {
    const ts = Date.now();
    const rows: Row[] = Array.from({length: n}, (_: unknown, i: number) => ({
      id: -(ts + i),
      editable: true,
      maDVT: "",
      tenDVT: "",
    }));
    setData(prev => [ ...rows, ...prev]);
  };

  const AddRowsModal = (
    <Modal
      open={open}
      title="Thêm dữ liệu"
      onCancel={() => setOpen(false)}
      onOk={() => { addBlankRows(addCount || 1); setOpen(false);}}
      okText="Thêm"
      width="fit-content"
      cancelText="Hủy"
      centered
    >
      <div style={{marginTop: 25 }}>Nhập số dòng cần thêm:</div>
      <InputNumber
        placeholder="Nhập số dòng"
        min={1}
        max={500}
        value={addCount ?? undefined}
        onChange={(v) => setAddCount(typeof v === 'number' ? v : null)}
        style={{ width: 300, marginTop: 8 }}
      />
    </Modal>
  )

  const columns: TableProps<Row>["columns"] = [
    { 
        title: "Mã đơn vị tính", 
        dataIndex: "maDVT",
        width: 140, sorter: (a, b) => a.maDVT.localeCompare(b.maDVT),
        align:"center",
        render: (val, r) =>
          r.editable
            ? <Input
                bordered={false}
                value={val}
                onChange={e => updateCell(r.id, "maDVT", e.target.value)}
                style={{ textAlign: "center", width: "100%", height: "100%" }}
              />
            : val
    },
    {
        title: "Tên đơn vị tính", 
        dataIndex: "tenDVT", 
        width: 140,
        sorter: (a, b) => a.tenDVT.localeCompare(b.tenDVT) ,
        align:"center",
        render: (val, r) =>
        r.editable
          ? <Input
              bordered={false}
              value={val}
              onChange={e => updateCell(r.id, "tenDVT", e.target.value)}
              style={{ textAlign: "center", width: "100%", height: "100%" }}
            />
          : val
    },
  ]

  const onAdd = () => {
    form.resetFields();
    setOpen(true);
  }
  const onEdit = (record: Row) => {
    form.setFieldsValue(record);
    setOpen(true);
  }

  const onSave = () => {
    form.submit();
  };

  const onDeleteSelected = (keys: React.Key[]) => {
    const set = new Set(keys);
    setData((prev) => prev.filter((r) => !set.has(r.id)));
  };

  const onCreate = async () => {
    const v = await form.validateFields();
    if (data.some((r) => r.id === v.id)) {
      setData((prev) => prev.map((r) => (r.id === v.id ? v : r)));
    } else {
      setData((prev) => [...prev, { ...v, id: (prev.at(-1)?.id ?? 0) + 1 }]);
    }
    setOpen(false);
    form.resetFields();
  };

  return (
    <div className="space-y-4">
      <DataTable<Row>
        title="ĐƠN VỊ TÍNH"
        rowKey="id"
        columns={columns}
        data={filtered}
        leftSlot={
          <SearchBar label="Tìm:" onChange={setQ} />
        }
        onSave={onSave}
        onAdd={onAdd}
        onDeleteSelected = {onDeleteSelected}
        scrollY={ 'calc(100vh - 412px)' }
      />
      {AddRowsModal}
    </div>
  );
}