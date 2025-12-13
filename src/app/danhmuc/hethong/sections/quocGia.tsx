"use client";

import { useMemo, useState } from "react";
import type { TableProps } from "antd";
import { Form, Input, Modal } from "antd";
import SearchBar from "../components/SearchBar";
import DataTable from "../components/Table";

import raw from "@/data/quocgia.json";

type Row = {
  id: number;          
  maQuocGia: string;
  tenQuocGia: string;
  quocKy: string;
  stt?: number;
};

const INITIAL: Row[] = (raw as any[]).map((r, i) => ({
  id: r.stt ?? i + 1,
  stt: r.stt,
  maQuocGia: r.maQuocGia ?? "",
  tenQuocGia: r.tenQuocGia ?? "",
  quocKy: r.quocKy ?? "",
}));

export default function QuocGiaSection() {
  const [q, setQ] = useState("");
  const [data, setData] = useState<Row[]>(INITIAL);

  const filtered = useMemo(() => {
    if (!q) return data;
    const n = q.toLowerCase();
    return data.filter((r) =>
      [r.maQuocGia, r.tenQuocGia, r.quocKy].some((v) =>
        String(v ?? "").toLowerCase().includes(n)
      )
    );
  }, [data, q]);

  const columns: TableProps<Row>["columns"] = [
    { 
        title: "Mã quốc gia", 
        dataIndex: "maQuocGia", 
        width: 140, sorter: (a, b) => a.maQuocGia.localeCompare(b.maQuocGia) 
    },
    { 
        title: "Tên quốc gia", 
        dataIndex: "tenQuocGia", sorter: (a, b) => a.tenQuocGia.localeCompare(b.tenQuocGia) 
    },
    { 
        title: "Quốc kỳ", 
        dataIndex: "quocKy", 
        width: 120 
    },
  ];


  const [open, setOpen] = useState(false);
  const [form] = Form.useForm<Row>();

  const onAdd = () => setOpen(true);
  const onCreate = async () => {
    const v = await form.validateFields();
    setData((prev) => [...prev, { ...v, id: (prev.at(-1)?.id ?? 0) + 1 }]);
    setOpen(false);
    form.resetFields();
  };

  const onDeleteSelected = (keys: React.Key[]) => {
    const set = new Set(keys);
    setData((prev) => prev.filter((r) => !set.has(r.id)));
  };

//   Api later
  const onSave = () => {
    console.log("Saving countries:", data.length);
  };

  return (
    <section id="quoc-gia" className="scroll-mt-[84px] space-y-4">
      <DataTable<Row>
        title="QUỐC GIA"
        columns={columns}
        data={filtered}
        rowKey="id"
        leftSlot={
          <SearchBar
            label="Tìm:"
            placeholder="Mã / Tên quốc gia / Quốc kỳ…"
            onChange={setQ}
          />
        }
        onAdd={onAdd}
        onDeleteSelected={onDeleteSelected}
        onSave={onSave}
        selectable
        showIndex
        scrollY={560}
      />

      <Modal
        title="Thêm quốc gia"
        open={open}
        onCancel={() => setOpen(false)}
        onOk={onCreate}
        okText="Lưu"
        cancelText="Huỷ"
        destroyOnHidden
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Mã quốc gia" name="maQuocGia" rules={[{ required: true }]} >
            <Input maxLength={3} />
          </Form.Item>
          <Form.Item label="Tên quốc gia" name="tenQuocGia" rules={[{ required: true }]} >
            <Input />
          </Form.Item>
          <Form.Item label="Quốc kỳ" name="quocKy">
            <Input maxLength={3} />
          </Form.Item>
        </Form>
      </Modal>
    </section>
  );
}
