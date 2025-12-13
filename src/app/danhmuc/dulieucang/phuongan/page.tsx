"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Checkbox, Select, message, Modal, Form, Input, Row, InputNumber } from "antd";
import type { TableProps } from "antd";

import rawData from "@/data/phuongan.json";
import DataTable from "../components/Table";
import SearchBar from "../components/SearchBar";


type Row = {
  id: number;
  stt?: number;
  maPA: string;
  transitID?: string;
  tenPA: string;
  huongNX: "Xuất" | "Nhập";
  vaora: "Vào" | "Ra";
  bai: boolean;
  tau: boolean;
  maHQ: number | null;
  editable?: boolean;
};

const HUONG_NX = [
  { label: "Nhập", value: "Nhập" as const },
  { label: "Xuất", value: "Xuất" as const },
];
const VAO_RA = [
  { label: "Vào", value: "Vào" as const },
  { label: "Ra", value: "Ra" as const },
];

const INITIAL: Row[] = (rawData as any[]).map((r, i) => ({
  id: r.id ?? i + 1,
  stt: r.stt ?? i + 1,
  maPA: r.maPA ?? "",
  transitID: r.transitID ?? "",
  tenPA: r.tenPA ?? "",
  huongNX: r.huongNX === "Nhập" ? "Nhập" : "Xuất",
  vaora: r.vaora === "Ra" ? "Ra" : "Vào",
  bai: Boolean(r.bai),
  tau: Boolean(r.tau),
  maHQ: r.maHQ ?? null,
}));

const STORAGE_KEY = "phuongan-data";

export default function PhuongAnPage() {
  const [data, setData] = useState<Row[]>(INITIAL);
  const [q, setQ] = useState("");
  const [form] = Form.useForm<Row>();
  const [addCount, setAddCount] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        setData(JSON.parse(cached) as Row[]);
      } else {
        const mapped: Row[] = (rawData as any[]).map((x) => ({
          id: x.id,
          stt: x.stt,
          maPA: x.maPA,
          transitID: x.transitID,
          tenPA: x.tenPA,
          huongNX: x.huongNX,
          vaora: x.vaora,
          bai: Boolean(x.bai),
          tau: Boolean(x.tau),
          maHQ: x.maHQ ?? null,
        }));
        setData(mapped);
      }
    } catch {
      setData([]);
    }
  }, []);

  // useEffect(() => {
  //   if (data.length) {
  //     localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  //   }
  // }, [data]);


  const updateCell = (id: number, field: keyof Row, value: any) => {
    setData(prev =>
      prev.map(r => (r.id === id ? { ...r, [field]: value } : r))
    );
  };

  const addBlankRows = (n: number) => {
    const base = Date.now();
    const rows: Row[] = Array.from({length: n}, (_, i) => ({
      id: -(base + i),
      maPA: "",
      transitID: "",
      tenPA: "",
      huongNX: "Nhập",
      vaora: "Vào",
      bai: false,
      tau: false,
      maHQ: null,
      editable: true,
    }));
    setData(prev => [...rows, ...prev]);
  };

  const AddRowsModal = (
    <Modal
      open={open}
      title="Thêm dữ liệu"
      onCancel={() => setOpen(false)}
      onOk={() => { addBlankRows(addCount || 1); setOpen(false);}}
      okText="Thêm"
      width="fit-content"
      afterClose={() => setAddCount(null)}
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

  const filtered = useMemo(() => {
    if (!q) return data;
    const n = q.toLowerCase();
    return data.filter((r) =>
      [r.maPA, r.tenPA].some((v) =>
        String(v ?? "").toLowerCase().includes(n)
      )
    );
  }, [data, q]);

  const columns: TableProps<Row>["columns"] = useMemo(
    () => [
      {
        title: "Hướng Nhập/Xuất",
        dataIndex: "huongNX",
        width: 100,
        align: "center",
        render: (val: Row["huongNX"], r: Row) =>
          r.editable ? (
            <Select
              variant="borderless"
              options={HUONG_NX as any}
              value={val}
              onChange={(v) => updateCell(r.id, "huongNX", v)}
              suffixIcon={null}
              style={{ width: "100%" }}
            />
          ) : ( val ?? "" ),
      },
      {
        title: "transitID",
        dataIndex: "transitID",
        width: 100,
        align: "center",
        sorter: (a, b) => (a.transitID ?? "").localeCompare(b.transitID ?? ""),
        render: (val, r) =>
          r.editable
            ? ( <Input
              variant="borderless"
              value={val}
              onChange={e => updateCell(r.id, "transitID", e.target.value)}
              style={{ textAlign: "center", width: "100%", height: "100%" }}
            /> )
          : val
      },
      {
        title: "Vào/Ra",
        dataIndex: "vaora",
        width: 90,
        align: "center",
        render: (val: Row["vaora"], r: Row) =>
          r.editable ? (
            <Select
              variant="borderless"
              options={VAO_RA as any}
              value={val}
              onChange={(v) => updateCell(r.id, "vaora", v)}
              suffixIcon={null}
              style={{ width: "100%" }}
            />
          ) : ( val ?? "" ),
      },
      { title: "Mã phương án", dataIndex: "maPA", width: 120, align: "center",
        sorter: (a, b) => a.maPA.localeCompare(b.maPA),
        render: (val, r) =>
          r.editable
            ? ( <Input
              variant="borderless"
              value={val}
              onChange={e => updateCell(r.id, "maPA", e.target.value)}
              style={{ textAlign: "center", width: "100%", height: "100%" }}
            /> )
          : val
      },
        
      { title: "Tên phương án", dataIndex: "tenPA", align: "center",
        sorter: (a, b) => a.tenPA.localeCompare(b.tenPA),
        render: (val, r) =>
          r.editable
            ? ( <Input
              variant="borderless"
              value={val}
              onChange={e => updateCell(r.id, "tenPA", e.target.value)}
              style={{ textAlign: "center", width: "100%", height: "100%" }}
            /> )
          : val
      },
      {
        title: "Bãi",
        dataIndex: "bai",
        width: 80,
        align: "center",
        sorter: (a, b) => Number(a.bai) - Number(b.bai),
        render: (val, r) =>
        <Checkbox
          checked={!!val}
          onChange={(e) => updateCell(r.id, "bai", e.target.checked)}
        />,
      },
      {
        title: "Tàu",
        dataIndex: "tau",
        width: 80,
        align: "center",
        sorter: (a, b) => Number(a.tau) - Number(b.tau),
         render: (val, r) =>
        <Checkbox
          checked={!!val}
          onChange={(e) => updateCell(r.id, "tau", e.target.checked)}
        />,
      },
      {
        title: "Mã HQ",
        dataIndex: "maHQ",
        width: 90,
        align: "center",
        render: (val, r) =>
          r.editable
            ? ( <Input
              variant="borderless"
              value={val}
              onChange={e => updateCell(r.id, "maHQ", e.target.value)}
              style={{ textAlign: "center", width: "100%", height: "100%" }}
            /> )
          : val
      },
    ],
    [data]
  );

  const onAdd = () => {
    form.resetFields();
    setOpen(true);
  }

  const onSave = () => {
    message.success("Dữ liệu đã được lưu");
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  const onDeleteSelected = (keys: React.Key[]) => {
    const set = new Set(keys);
    setData((prev) => prev.filter((r) => !set.has(r.id)));
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
        title="PHƯƠNG ÁN"
        rowKey="id"
        columns={columns}
        onAdd={onAdd}
        onSave={onSave}
        leftSlot={
          <SearchBar label="Tìm:" onChange={setQ} />
        }
        onDeleteSelected={onDeleteSelected}
        data={filtered}
        scrollY={ 'calc(100vh - 425px)' }
      />
      {AddRowsModal}
    </div>
  );
}
