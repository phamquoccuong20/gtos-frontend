"use client";

import { Form, Input, InputNumber, message, Modal, Select, TableProps } from "antd";
import { useEffect, useMemo, useState } from "react";
import DataTable from "./component/Table";
import SearchBar from "../components/SearchBar";
import raw from "@/data/vessel.json";
import quocgia  from "@/data/quocgia.json";

type Row = {
  id: number;
  stt?: number;
  VesslID: string;
  VesslName: string;
  VesslType: number | null;
  OprID: string;
  NationID: string;
  CallSign: number | null;
  IMO: number| null;
  LOA: number| null;
  MaxBeam: number | null;
  Depth: number | null;
  Callars: number | null;
  GRT: number | null,
  DWT: number | null;
  editable?: boolean;
}

const INITIAL: Row[] = (raw as any[]).map((r, i) => ({
  id: r.id ?? i + 1,
  stt: r.stt,
  VesslID: r.VesslID ?? "",
  VesslName: r.VesslName ?? "",
  VesslType: r.VesslType ?? null,
  OprID: r.OprID ?? "",
  NationID: r.NationID ?? "",
  CallSign: r.CallSign ?? null,
  IMO: r.IMO ?? null,
  LOA: r.LOA ?? null,
  MaxBeam: r.MaxBeam ?? null,
  Depth: r.Depth ?? null,
  Callars: r.Callars ?? null,
  GRT: r.GRT ?? null,
  DWT: r.DWT ?? null
}));

const nationOptions = quocgia.map(q => ({
  label: q.tenQuocGia,
  value: q.maQuocGia,
}))

const STORAGE_KEY = "dinhnghiatau-data";

export default function DinhNghiaTauPage() {
  const [q, setQ] = useState("");
  const [data, setData] = useState<Row[]>(INITIAL);
  const [open, setOpen] = useState(false);
  const [addCount, setAddCount] = useState<number | null>(null);
  const [form] = Form.useForm<Row>();

  const filtered = useMemo(() => {
    if (!q) return data;
    const n = q.toLowerCase();
    return data.filter((r) =>
    [r.VesslID, r.VesslName].some((v) =>
      String(v ?? "").toLowerCase().includes(n)
    ));
  },[data, q]);

  const updateCell = (id: number, field: keyof Row, value: any) => {
    setData(prev =>
      prev.map(r => (r.id === id ? {...r, [field]: value}: r))
    );
  };

  useEffect(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
          setData(JSON.parse(cached) as Row[]);
      } else {
        const mapped: Row[] = (raw as any[]).map((x, idx) => ({
          id: x.id ?? `${Date.now()}-${idx}`,
          stt: x.stt,
          VesslID: x.VesslID,
          VesslName: x.VesslName,
          VesslType: x.VesslType,
          OprID: x.OprID,
          NationID: x.NationID,
          CallSign: x.CallSign,
          IMO: x.IMO,
          LOA: x.LOA ?? null,
          MaxBeam: x.MaxBeam ?? null,
          Depth: x.Depth ?? null,
          Callars: x.Callars ?? null,
          GRT: x.GRT ?? null,
          DWT: x.DWT ?? null,
        }));
        setData(mapped);
      }
    } catch {
      setData([]);
    }
  }, []);

  const addBlankRows = (n: number) => {
    const ts = Date.now();
    const rows: Row[] = Array.from({length: n}, (_, i) => ({
      id: -(ts+ i),
      editable: true,
      VesslID: "",
      VesslName: "",
      VesslType: null,
      OprID: "",
      NationID: "",
      CallSign: null,
      IMO: null,
      LOA: null,
      MaxBeam: null,
      Depth: null,
      Callars: null,
      GRT: null,
      DWT: null,
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
  );

  const columns: TableProps<Row>["columns"] = useMemo(
    () => [
      {
        title: "Mã tàu",
        dataIndex: "VesslID",
        width: 50,
        align: "center",
        sorter: (a, b) => (a.VesslID ?? "").localeCompare(b.VesslID ?? ""),
        render: (val, r) =>
          r.editable
            ? ( <Input
              variant="borderless"
              value={val}
              onChange={e => updateCell(r.id, "VesslID", e.target.value)}
              style={{ textAlign: "center", width: "100%", height: "100%" }}
            /> )
          : val
      },
      {
        title: "Tên tàu",
        dataIndex: "VesslName",
        width: 60,
        align: "center",
        sorter: (a, b) => (a.VesslName ?? "").localeCompare(b.VesslName ?? ""),
        render: (val, r) =>
          r.editable
            ? ( <Input
              variant="borderless"
              value={val}
              onChange={e => updateCell(r.id, "VesslName", e.target.value)}
              style={{ textAlign: "center", width: "100%", height: "100%" }}
            /> )
          : val
      },
      {
        title: "Loại tàu",
        dataIndex: "VesslType",
        width: 30,
        align: "center",
        render: (val, r) =>
          r.editable
            ? ( <Input
              variant="borderless"
              value={val}
              onChange={e => updateCell(r.id, "VesslType", e.target.value)}
              style={{ textAlign: "center", width: "100%", height: "100%" }}
            /> )
          : val
      },
      {
        title: "Hãng khai thác",
        dataIndex: "OprID",
        width: 50,
        align: "center",
        sorter: (a, b) => (a.OprID ?? "").localeCompare(b.OprID ?? ""),
        render: (val, r) =>
          r.editable
            ? ( <Input
              variant="borderless"
              value={val}
              onChange={e => updateCell(r.id, "OprID", e.target.value)}
              style={{ textAlign: "center", width: "100%", height: "100%" }}
            /> )
          : val
      },
      {
        title: "Quốc gia",
        dataIndex: "NationID",
        width: 100,
        align: "center",
        render: (value, r) =>
          r.editable
            ? ( <Select
              variant="borderless"
              value={value}
              options={nationOptions}
              onChange={val => updateCell(r.id, "NationID", val)}
              style={{ textAlign: "center", width: "100%", height: "100%" }}
            /> )
          : value
      },
      {
        title: "Call Sign",
        dataIndex: "CallSign",
        width: 30,
        align: "center",
        render: (val, r) =>
          r.editable
            ? ( <Input
              variant="borderless"
              value={val}
              onChange={e => updateCell(r.id, "CallSign", e.target.value)}
              style={{ textAlign: "center", width: "100%", height: "100%" }}
            /> )
          : val
      },
      {
        title: "IMO",
        dataIndex: "IMO",
        width: 30,
        align: "center",
        render: (val, r) =>
          r.editable
            ? ( <Input
              variant="borderless"
              value={val}
              onChange={e => updateCell(r.id, "IMO", e.target.value)}
              style={{ textAlign: "center", width: "100%", height: "100%" }}
            /> )
          : val
      },
      {
        title: "LOA",
        dataIndex: "LOA",
        width: 30,
        align: "center",
        render: (val, r) =>
          r.editable
            ? ( <Input
              variant="borderless"
              value={val}
              onChange={e => updateCell(r.id, "LOA", e.target.value)}
              style={{ textAlign: "center", width: "100%", height: "100%" }}
            /> )
          : val
      },
      {
        title: "Max Beam",
        dataIndex: "MaxBeam",
        width: 30,
        align: "center",
        render: (val, r) =>
          r.editable
            ? ( <Input
              variant="borderless"
              value={val}
              onChange={e => updateCell(r.id, "MaxBeam", e.target.value)}
              style={{ textAlign: "center", width: "100%", height: "100%" }}
            /> )
          : val
      },
      {
        title: "Depth",
        dataIndex: "Depth",
        width: 30,
        align: "center",
        render: (val, r) =>
          r.editable
            ? ( <Input
              variant="borderless"
              value={val}
              onChange={e => updateCell(r.id, "Depth", e.target.value)}
              style={{ textAlign: "center", width: "100%", height: "100%" }}
            /> )
          : val
      },
      {
        title: "Số hầm",
        dataIndex: "Callars",
        width: 30,
        align: "center",
        render: (val, r) =>
          r.editable
            ? ( <Input
              variant="borderless"
              value={val}
              onChange={e => updateCell(r.id, "Callars", e.target.value)}
              style={{ textAlign: "center", width: "100%", height: "100%" }}
            /> )
          : val
      },
      {
        title: "GRT",
        dataIndex: "GRT",
        width: 30,
        align: "center",
        render: (val, r) =>
          r.editable
            ? ( <Input
              variant="borderless"
              value={val}
              onChange={e => updateCell(r.id, "GRT", e.target.value)}
              style={{ textAlign: "center", width: "100%", height: "100%" }}
            /> )
          : val
      },
      {
        title: "DWT",
        dataIndex: "DWT",
        width: 30,
        align: "center",
        render: (val, r) =>
          r.editable
            ? ( <Input
              variant="borderless"
              value={val}
              onChange={e => updateCell(r.id, "DWT", e.target.value)}
              style={{ textAlign: "center", width: "100%", height: "100%" }}
            /> )
          : val
      },
    ], [data]
  )

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

  return (
    <div className="section_ship">
      <DataTable<Row>
        title="ĐỊNH NGHĨA THÔNG TIN TÀU"
        rowKey="id"
        columns={columns}
        onAdd={onAdd}
        onSave={onSave}
        leftSlot={
          <SearchBar label="Tìm:" onChange={setQ} />
        }
        onDeleteSelected={onDeleteSelected}
        data={filtered}
        scrollY={ 'calc(100vh - 409px)'}
        scrollX={"130vw"}
      />
      {AddRowsModal}
    </div>
  )
}