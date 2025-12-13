"use client";

import rawData from "@/data/phuonganxepdo.json";
import { Form, Input, InputNumber, message, Modal, Row, Select, TableProps } from "antd";
import { title } from "process";
import { useMemo, useState } from "react";
import DataTable from "../components/Table";
import SearchBar from "../components/SearchBar";
import { PHUONG_AN_OPTIONS, PA_CODE_BY_LABEL, STORAGE_KEY } from "./constants";

type Row = {
  id: number;
  stt: number;
  phuongAn: string;
  maPA: string;
  tenPA: string;
  phanLoai: string;
  editable?: boolean;
};

const INITIAL: Row[] = (rawData as any[]).map((r, i) => ({
  id: r.id ?? i + 1,
  stt: r.stt ?? i + 1,
  phuongAn: PA_CODE_BY_LABEL[r.phuongAn] ?? r.phuongAn,
  maPA: r.maPA ?? "",
  tenPA: r.tenPA ?? "",
  phanLoai: r.phanLoai ?? ""
}));

export default function PhuongAnXepDoPage() {
  const [data, setData] = useState<Row[]>(INITIAL);
  const [q, setQ] = useState("");
  const [form] = Form.useForm<Row>();
  const [open, setOpen] = useState(false);
  const [addCount, setAddCount] = useState<number | null>(null);

  const filtered = useMemo(() => {
    if (!q) return data;
    const n = q.toLowerCase();
    return data.filter((r) =>
      [r.phuongAn, r.maPA].some((v) =>
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
    const base = Date.now();
    const rows: Row[] = Array.from({ length: n }, (_, i) => ({
      id: -(base + i),
      stt: data.length + i + 1,
      phuongAn: "",
      maPA: "",
      tenPA: "",
      phanLoai: "",
      editable: true,
    }));
    setData(prev => [...rows, ...prev]);
  };

  const AddRowsModal = (
    <Modal
      open={open}
      title="Thêm dữ liệu"
      onCancel={() => setOpen(false)}
      onOk={() => { addBlankRows(addCount || 1); setOpen(false); }}
      okText="Thêm"
      width="fit-content"
      afterClose={() => setAddCount(null)}
      cancelText="Hủy"
      centered
    >
      <div style={{ marginTop: 25 }}>Nhập số dòng cần thêm:</div>
      <InputNumber
        placeholder="Nhập số dòng"
        min={1}
        max={500}
        value={addCount ?? undefined}
        onChange={(v) => setAddCount(typeof v === 'number' ? v : null)}
        style={{ width: 300, marginTop: 8 }}
      />
    </Modal>
  );

  const columns: TableProps<Row>["columns"] = useMemo(
    () => [
      {
        title: "Phương án",
        dataIndex: "phuongAn",
        with: 140,
        align: "center",
        render: (val: string, r: Row) =>
          r.editable ? (
            <Select
              variant="borderless"
              options={PHUONG_AN_OPTIONS}
              value={val}
              onChange={(v) => updateCell(r.id, "phuongAn", v)}
              labelRender={(item) => item?.value ?? ""}
              suffixIcon={null}
              style={{ textAlign: "center", width: "100%", height: "100%" }}
            />
          ) : (
            val ?? ""
          ),
      },
      {
        title: "Mã phương án xếp dỡ", dataIndex: "maPA", with: 80, align: "center",
        sorter: (a, b) => a.maPA.localeCompare(b.maPA),
        render: (val, r) =>
          r.editable
            ? <Input
              variant="borderless"
              value={val}
              onChange={e => updateCell(r.id, "maPA", e.target.value)}
              style={{ textAlign: "center", width: "100%", height: "100%" }}
            />
            : val
      },
      {
        title: "Tên phương án xếp dỡ", dataIndex: "tenPA", with: 80, align: "center",
        sorter: (a, b) => a.tenPA.localeCompare(b.tenPA),
        render: (val, r) =>
          r.editable
            ? <Input
              variant="borderless"
              value={val}
              onChange={e => updateCell(r.id, "tenPA", e.target.value)}
              style={{ textAlign: "center", width: "100%", height: "100%" }}
            />
            : val
      },
      {
        title: "Phân loại", dataIndex: "phanLoai", with: 80, align: "center",
        sorter: (a, b) => a.phanLoai.localeCompare(b.phanLoai),
        render: (val, r) =>
          r.editable
            ? <Input
              variant="borderless"
              value={val}
              onChange={e => updateCell(r.id, "phanLoai", e.target.value)}
              style={{ textAlign: "center", width: "100%", height: "100%" }}
            />
            : val
      }
    ], [data]
  );

  const onDeleteSelected = (keys: React.Key[]) => {
    const set = new Set(keys);
    setData((prev) => prev.filter((r) => !set.has(r.stt)));
  }

  const onAdd = () => {
    form.resetFields();
    setOpen(true);
  }

  const onSave = () => {
    message.success("Dữ liệu đã được lưu");
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

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
        title="PHƯƠNG ÁN XẾP DỠ"
        rowKey="id"
        columns={columns}
        onAdd={onAdd}
        onSave={onSave}
        leftSlot={
          <SearchBar label="Tìm:" onChange={setQ} />
        }
        onDeleteSelected={onDeleteSelected}
        data={filtered}
        scrollY={'calc(100vh - 422px)'}
      />
      {AddRowsModal}
    </div>
  )
}