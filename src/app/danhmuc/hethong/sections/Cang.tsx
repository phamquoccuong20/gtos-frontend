"use client";

import { useMemo, useState } from "react";
import { Form, Input, Modal } from "antd";
import type { TableProps } from "antd";
import SearchBar from "../components/SearchBar";
import DataTable from "../components/Table";

import raw from "@/data/cang.json";

type Row = {
  id: number; 
  quocGia: string;
  maCang: string;
  tenCang: string;
  stt?: number; 
};

const INITIAL: Row[] = (raw as any[]).map((r, i) => ({
  id: r.stt ?? i + 1,
  stt: r.stt,
  quocGia: r.quocGia ?? "",
  maCang: r.maCang ?? "",
  tenCang: r.tenCang ?? "",
}));

export default function Cang() {
  const [q, setQ] = useState("");
  const [data, setData] = useState<Row[]>(INITIAL);

  const filtered = useMemo(() => {
    if (!q) return data;
    const n = q.toLowerCase();
    return data.filter((r) =>
      [r.quocGia, r.maCang, r.tenCang].some((v) =>
        String(v ?? "")
          .toLowerCase()
          .includes(n)
      )
    );
  }, [data, q]);

  const columns: TableProps<Row>["columns"] = [
    { title: "Quốc gia", dataIndex: "quocGia" },
    {
      title: "Mã cảng",
      dataIndex: "maCang",
      width: 140,
      sorter: (a, b) => a.maCang.localeCompare(b.maCang),
    },
    {
      title: "Tên cảng",
      dataIndex: "tenCang",
      sorter: (a, b) => a.tenCang.localeCompare(b.tenCang),
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

//   Will be implemented later
  const onSave = () => {
    console.log("save", data.length, "rows");
  };

  return (
    <section id="cang" className="scroll-mt-[84px] space-y-4">
      <DataTable<Row>
        title="CẢNG"
        columns={columns}
        data={filtered}
        rowKey="id"
        leftSlot={
          <SearchBar
            label="Tìm:"
            placeholder="Quốc gia / Mã / Tên cảng…"
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
        title="Thêm cảng"
        open={open}
        onCancel={() => setOpen(false)}
        onOk={onCreate}
        okText="Lưu"
        cancelText="Huỷ"
        destroyOnHidden
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Quốc gia"
            name="quocGia"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Mã cảng" name="maCang" rules={[{ required: true }]}>
            <Input maxLength={10} />
          </Form.Item>
          <Form.Item
            label="Tên cảng"
            name="tenCang"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </section>
  );
}
