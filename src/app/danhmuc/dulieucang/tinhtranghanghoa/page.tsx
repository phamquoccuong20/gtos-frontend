"use client";

import { Form, Input, message, TableProps } from "antd";
import { useEffect, useMemo, useState } from "react";
import { ClipboardList } from "lucide-react";
import DataTable from "../components/Table";
import SearchBar from "../components/SearchBar";
import rawData from "@/data/tinhtranghanghoa.json";
import AddRowsModal from "@/components/AddRowsModal";

type Row = {
  id: number;
  stt: number;
  status: string;
  editable?: boolean;
}

const INITIAL: Row[] = (rawData as any[]).map((r, i) => ({
  id: r.id ?? i + 1,
  stt: r.stt ?? i + 1,
  status : r.status ?? "",


}));

const STORAGE_KEY = "huongnx-data";

export default function LoaiCongViecPage() {
  const [data, setData] = useState<Row[]>(INITIAL);
  const [q, setQ] = useState("");
  const [form] = Form.useForm<Row>();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        setData(JSON.parse(cached) as Row[]);
      } else {
        const mapped: Row[] = (rawData as any[]).map((x , idx) => ({
          id: x.id ?? `${Date.now()}-${idx}`,
          stt: x.stt,
          status : x.status,
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
    status: "",
    editable: true,

  }));
  setData(prev => [...rows, ...prev]);
};

  const filtered = useMemo(() => {
    if (!q) return data;
    const n = q.toLowerCase();
    return data.filter((r) =>
      [r.status].some((v) =>
        String(v ?? "").toLowerCase().includes(n)
      )
      );
    }, [data, q]);

  const columns: TableProps<Row>["columns"] = useMemo(
    () => [
      { title: "Tình trạng hàng hóa", dataIndex: "status", width: 350, align: "center",
        render: (val, r) =>
          r.editable
            ? ( <Input
              bordered={false}
              value={val}
              onChange={e => updateCell(r.id, "status", e.target.value)}
              style={{ textAlign: "center", width: "100%", height: "100%" }}
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
    setIsAddModalOpen(true);
  }

  return (
    <section id="tinh-trang-hang-hoa" className="mb-4 scroll-mt-[84px] space-y-4">
      <DataTable<Row>
        title={
          <span className="flex items-center gap-[12px] -my-1">
            <span className="w-[38px] h-[38px] bg-[#1890ff] rounded-lg flex items-center justify-center text-white shadow-md shadow-blue-100">
              <ClipboardList size={20} />
            </span>
            <span className="text-[18px] font-bold text-slate-800 tracking-tight font-accent leading-tight">
              TÌNH TRẠNG HÀNG HÓA
            </span>
          </span>
        }
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
      <AddRowsModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onConfirm={addBlankRows}
      />
    </section>
  )
}