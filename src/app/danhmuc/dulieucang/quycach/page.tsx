"use client";

import {Form, Input, InputNumber, message, Modal, TableProps } from "antd";
import { useEffect, useMemo, useState } from "react";
import DataTable from "../components/Table";
import SearchBar from "../components/SearchBar";
import rawData from "@/data/quycach.json";

type Row = {
  id: number;
  stt: number;
  maBai: string;
  maQC: string;
  tenQC: string;
  dai: number | null;
  rong: number | null,
  trongluong: number | null;
  editable?: boolean;
}

const INITIAL: Row[] = (rawData as any[]).map((r, i) => ({
  id: r.id ?? i + 1,
  stt: r.stt ?? i + 1,
  maBai : r.maBai ?? "",
  maQC: r.maQC ?? "",
  tenQC: r.tenQC ?? "",
  dai: r.dai ?? null,
  rong: r.rong ?? null,
  trongluong: r.trongluong ?? null,

}));

const STORAGE_KEY = "huongnx-data";

export default function LoaiCongViecPage() {
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
        const mapped: Row[] = (rawData as any[]).map((x , idx) => ({
          id: x.id ?? `${Date.now()}-${idx}`,
          stt: x.stt,
          maBai : x.maBai,
          maQC: x.maQC,
          tenQC: x.tenQC,
          dai: x.dai,
          rong: x.rong,
          trongluong: x.trongluong
        }));
        setData(mapped);
      }
    } catch (error) {
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
  const rows: Row[] = Array.from({ length: n }, (_, i) => ({
    id: -(base + i),
    stt: data.length + i + 1,
    maBai: "",
    maQC: "",
    tenQC: "",
    dai: null,
    rong: null,
    trongluong: null,
    editable: true,

  }));
  setData(prev => [...rows, ...prev]);
};

  const filtered = useMemo(() => {
    if (!q) return data;
    const n = q.toLowerCase();
    return data.filter((r) =>
      [r.maBai, r.maQC, r.tenQC].some((v) =>
        String(v ?? "").toLowerCase().includes(n)
      )
      );
    }, [data, q]);

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
    );

  const columns: TableProps<Row>["columns"] = useMemo(
    () => [
      { title: "Mã bãi", dataIndex: "maBai", with: 100, align: "center",
        render: (val, r) =>
          r.editable
            ? ( <Input
              variant="borderless"
              value={val}
              onChange={e => updateCell(r.id, "maBai", e.target.value)}
              style={{ textAlign: "center", width: "100%", height: "100%" }}
            /> )
          : val
      },
      { title: "Mã quy cách", dataIndex: "maQC", with: 90, align: "center",
        render: (val, r) =>
          r.editable
            ? ( <Input
              variant="borderless"
              value={val}
              onChange={e => updateCell(r.id, "maQC", e.target.value)}
              style={{ textAlign: "center", width: "100%", height: "100%" }}
            /> )
          : val
      },
      { title: "Tên quy cách", dataIndex: "tenQC", with: 90, align: "center",
        render: (val, r) =>
          r.editable
            ? ( <Input
              variant="borderless"
              value={val}
              onChange={e => updateCell(r.id, "tenQC", e.target.value)}
              style={{ textAlign: "center", width: "100%", height: "100%" }}
            /> )
          : val
      },
      { title: "Dài", dataIndex: "dai", with: 100, align: "center",
        render: (val, r) =>
          r.editable
            ? ( <Input
              variant="borderless"
              value={val}
              onChange={e => updateCell(r.id, "dai", e.target.value)}
              style={{ textAlign: "center", width: "100%", height: "100%" }}
            /> )
          : val
      },
      { title: "Rộng", dataIndex: "rong", with: 100, align: "center",
        render: (val, r) =>
          r.editable
            ? ( <Input
              variant="borderless"
              value={val}
              onChange={e => updateCell(r.id, "rong", e.target.value)}
              style={{ textAlign: "center", width: "100%", height: "100%" }}
            /> )
          : val
      },
      { title: "Trọng lượng", dataIndex: "trongluong", with: 80, align: "center",
        render: (val, r) =>
          r.editable
            ? ( <Input
              variant="borderless"
              value={val}
              onChange={e => updateCell(r.id, "trongluong", e.target.value)}
              style={{ textAlign: "center", width: "80%", height: "100%" }}
            /> )
          : val
      },
    ], [data]
  );

  const onDeleteSelected = (keys: React.Key[]) => {
    const set = new Set(keys);
    setData((prev) => prev.filter((r) => !set.has(r.id)));
  }

  const onSave = () => {
    message.success("Dữ liệu đã được lưu");
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  const onAdd = () => {
    form.resetFields();
    setOpen(true);
  }

  return (
    <section id="huong-nhap-xuat" className="mb-8 scroll-mt-[84px] space-y-4">
      <DataTable<Row>
        title="QUY CÁCH"
        rowKey="id"
        columns={columns}
        onAdd={onAdd}
        onSave={onSave}
        leftSlot={
          <SearchBar label="Tìm:" onChange={setQ} />
        }
        onDeleteSelected={onDeleteSelected}
        data={filtered}
        scrollY={ 'calc(100vh - 412px)' }
      />
      {AddRowsModal}
    </section>
  )
}