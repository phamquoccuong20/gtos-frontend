"use client";

import rawData from "@/data/loaicongviec.json";
import { Checkbox, Form, Input, InputNumber, message, Modal, Select, TableProps, TabPaneProps } from "antd";
import { title } from "process";
import { useEffect, useMemo, useState } from "react";
import DataTable from "../components/Table";
import SearchBar from "../components/SearchBar";

type LoaiDC = "Tất cả" | "Xuất" | "Nhập";

const LOAI_DC_OPTIONS = [
  { label: "Tất cả", value: "Tất cả" as LoaiDC },
  { label: "Xuất",   value: "Xuất"   as LoaiDC },
  { label: "Nhập",   value: "Nhập"   as LoaiDC },
] as const;

type Row = {
  id: number;
  stt: number;
  maLoai: string;
  tenLoai: string;
  loaiDC: LoaiDC | undefined;
  cauTau: boolean;
  bai: boolean;
  cong: boolean;
  editable?: boolean;
}

const INITIAL: Row[] = (rawData as any[]).map((r, i) => ({
  id: r.id ?? i + 1,
  stt: r.stt ?? i + 1,
  maLoai : r.maLoai ?? "",
  tenLoai: r.tenLoai ?? "",
  loaiDC: r.loaiDC ?? "",
  cauTau: Boolean(r.cauTau),
  bai: Boolean(r.bai),
  cong: Boolean(r.cong),
}));

const STORAGE_KEY = "loaicongviec-data";

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
        const mapped: Row[] = (rawData as any[]).map((x) => ({
          id: x.id,
          stt: x.stt,
          maLoai : x.maLoai,
          tenLoai: x.tenLoai,
          loaiDC: x.loaiDC,
          cauTau: Boolean(x.cauTau),
          bai: Boolean(x.bai),
          cong: Boolean(x.cong),
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
    maLoai: "",
    tenLoai: "",
    loaiDC: undefined,
    cauTau: false,
    bai: false,
    cong: false,
    editable: true,
  }));
  setData(prev => [...rows, ...prev]);
};

  const filtered = useMemo(() => {
    if (!q) return data;
    const n = q.toLowerCase();
    return data.filter((r) =>
      [r.maLoai, r.tenLoai].some((v) =>
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
    )

  const columns: TableProps<Row>["columns"] = useMemo(
    () => [
      { title: "Mã loại", dataIndex: "maLoai", with: 100, align: "center",
        render: (val, r) =>
          r.editable
            ? ( <Input
              bordered={false}
              value={val}
              onChange={e => updateCell(r.id, "maLoai", e.target.value)}
              style={{ textAlign: "center", width: "100%", height: "100%" }}
            /> )
          : val
      },
      { title: "Tên loại", dataIndex: "tenLoai", with: 100, align: "center",
        render: (val, r) =>
          r.editable
            ? ( <Input
              variant="borderless"
              value={val}
              onChange={e => updateCell(r.id, "tenLoai", e.target.value)}
              style={{ textAlign: "center", width: "100%", height: "100%" }}
            /> )
          : val
      },
      { title: "Loại di chuyển", dataIndex: "loaiDC", with: 100, align: "center",
        render: (val: Row["loaiDC"], r: Row) =>
          r.editable ? (
            <Select
            variant="borderless"
            options={LOAI_DC_OPTIONS as any}
            value={val}
            onChange={(v: LoaiDC) => updateCell(r.id, "loaiDC", v)}
            suffixIcon={null}
            style={{ width: "100%" }}
          />
        ) : ( val ?? "" ),
      },
      {
        title: "Cẩu tàu",
        dataIndex: "cauTau",
        width: 100,
        align: "center",
        sorter: (a, b) => Number(a.cauTau) - Number(b.cauTau),
        render: (val, r) =>
        <Checkbox
          checked={!!val}
          onChange={(e) => updateCell(r.id, "cauTau", e.target.checked)}
        />,
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
        title: "Cổng",
        dataIndex: "cong",
        width: 80,
        align: "center",
        sorter: (a, b) => Number(a.cong) - Number(b.cong),
        render: (val, r) =>
          <Checkbox
            checked={!!val}
            onChange={(e) => updateCell(r.id, "cong", e.target.checked)}
          />,
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
    <section id="loai-cong-viec" className="mb-8 scroll-mt-[84px] space-y-4">
      <DataTable<Row>
        title="LOẠI CÔNG VIỆC"
        rowKey="id"
        columns={columns}
        onAdd={onAdd}
        onSave={onSave}
        leftSlot={
          <SearchBar label="Tìm:" onChange={setQ} />
        }
        onDeleteSelected={onDeleteSelected}
        data={filtered}
        scrollY={ 'calc(100vh - 422px)' }
      />
      {AddRowsModal}
    </section>
  )
}