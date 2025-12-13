"use client";

import { useMemo, useState } from "react";
import type { TableProps } from "antd";
import { Form, Input, InputNumber, Modal, Select } from "antd";
import SearchBar from "../components/SearchBar";
import DataTable from "../components/Table";

import raw from "@/data/vungphu.json";

type Row = {
  id: number;       
  maArea: string;
  tenArea: string;
  sucChua: number;
  thue: string;
  stt?: number;
};

const INITIAL: Row[] = (raw as any[]).map((r, i) => ({
  id: r.stt ?? i + 1,
  stt: r.stt,
  maArea: r.maArea ?? "",
  tenArea: r.tenArea ?? "",
  sucChua: Number(r.sucChua ?? 0),
  thue: r.thue ?? ""
}));

export default function VungPhuSection() {
  const [q, setQ] = useState("");
  const [data, setData] = useState<Row[]>(INITIAL);

  const filtered = useMemo(() => {
    if (!q) return data;
    const n = q.toLowerCase();
    return data.filter(r =>
      [r.maArea, r.tenArea, String(r.sucChua), r.thue]
        .some(v => String(v ?? "").toLowerCase().includes(n))
    );
  }, [data, q]);

  const columns: TableProps<Row>["columns"] = [
    { 
        title: "Mã Area", 
        dataIndex: "maArea", 
        width: 160, sorter: (a, b) => a.maArea.localeCompare(b.maArea) 
    },
    { 
        title: "Tên Area", 
        dataIndex: "tenArea", sorter: (a, b) => a.tenArea.localeCompare(b.tenArea) 
    },
    { 
        title: "Sức chứa", 
        dataIndex: "sucChua", 
        width: 140, 
        align: "right", sorter: (a, b) => a.sucChua - b.sucChua
     },
    { 
        title: "Thuê", 
        dataIndex: "thue", 
        width: 140, sorter: (a, b) => a.thue.localeCompare(b.thue) 
    }
  ];

  const [open, setOpen] = useState(false);
  const [form] = Form.useForm<Row>();

  const onAdd = () => setOpen(true);
  const onCreate = async () => {
    const v = await form.validateFields();
    setData(prev => [...prev, { ...v, id: (prev.at(-1)?.id ?? 0) + 1 }]);
    setOpen(false);
    form.resetFields();
  };

  const onDeleteSelected = (keys: React.Key[]) => {
    const set = new Set(keys);
    setData(prev => prev.filter(r => !set.has(r.id)));
  };

//   Api later
  const onSave = () => {
    console.log("Saving vung phu rows:", data.length);
  };

  return (
    <section id="vung-phu" className="scroll-mt-[84px] space-y-4">
      <DataTable<Row>
        title="VÙNG PHỤ"
        columns={columns}
        data={filtered}
        rowKey="id"
        leftSlot={<SearchBar label="Tìm:" placeholder="Mã/Tên/Sức chứa/Thuê…" onChange={setQ} />}
        onAdd={onAdd}
        onDeleteSelected={onDeleteSelected}
        onSave={onSave}
        selectable
        showIndex
        scrollY={560}
      />

      <Modal
        title="Thêm vùng phụ"
        open={open}
        onCancel={() => setOpen(false)}
        onOk={onCreate}
        okText="Lưu"
        cancelText="Huỷ"
        destroyOnHidden
      >
        <Form form={form} layout="vertical" initialValues={{ sucChua: 1000, thue: "Nội bộ" }}>
          <Form.Item label="Mã Area" name="maArea" rules={[{ required: true }]}>
            <Input maxLength={20} />
          </Form.Item>
          <Form.Item label="Tên Area" name="tenArea" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Sức chứa" name="sucChua" rules={[{ required: true }]}>
            <InputNumber min={0} className="w-full" />
          </Form.Item>
          <Form.Item label="Thuê" name="thue" rules={[{ required: true }]}>
            <Select
              options={[
                { value: "Nội bộ", label: "Nội bộ" },
                { value: "Thuê ngoài", label: "Thuê ngoài" }
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </section>
  );
}
