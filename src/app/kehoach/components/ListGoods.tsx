"use client";

import raw from "@/data/listgood.json";
import { Divider, Modal, TableProps } from "antd";
import { useMemo, useState } from "react";
import DataTable from "./Table";
import SearchBar from "./SearchBar";

type Row = {
  id: number;
  stt: number;
  maHang: string;
  tenHang: string;
  maNhom: string;
};

const INITIAL = (raw as any[]).map((r, i) => ({
  id: r.id ?? i + 1,
  stt: r.stt,
  maHang: r.maHang ?? "",
  tenHang: r.tenHang ?? "",
  maNhom: r.maNhom ?? "",
}));

export default function ListGoodsSection({open, onClose}: any) {
  const [q, setQ] = useState("");
  const [data, setData] = useState<Row[]>(INITIAL);

  const filtered = useMemo(() => {
    if (!q) return data;
    const n = q.toLowerCase();
      return data.filter((r) =>
        [r.maHang, r.tenHang].some((v) =>
          String(v ?? "")
            .toLowerCase()
            .includes(n)
        )
      );
    }, [data, q]);

    const columns: TableProps<Row>["columns"] = [
      { title: "Mã hàng", dataIndex: "maHang", width: 100, sorter: (a, b) => a.maHang.localeCompare(b.maHang), align: "center", },
      { title: "Tên hàng", dataIndex: "tenHang", width: 140, sorter: (a, b) => a.tenHang.localeCompare(b.tenHang), align: "center" },
      { title: "Mã nhóm", dataIndex: "maNhom", width: 100, sorter: (a, b) => a.maNhom.localeCompare(b.maNhom), align: "center" },
    ];
  return (
    <section>
      <Modal
        open={open}
        title="Danh sách Hàng hóa"
        centered
        width={500}
        onCancel={onClose}
        okText="Xác nhận"
        cancelText="Đóng"
        styles={{
          body: { padding: 0 },
          header: { paddingTop: 20, paddingLeft: 24, paddingRight: 24 },
          footer: { paddingLeft: 24, paddingRight: 24, paddingBottom: 20, paddingTop: 10 },
          content: { padding: 0 },
      }}
      >
        <div
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
            marginTop: 20,
            borderTop: "1px solid #ced4da",
          }}>
        </div>
        <div className="px-5">
          <DataTable<Row>
            columns={columns}
            data={filtered}
            rowKey="id"
            leftSlot={ <SearchBar label="Tìm:" onChange={setQ} /> }
            selectable
            showIndex
            scrollY={ 'calc(100vh - 412px)' }
          />
        </div>
      </Modal>
    </section>
  )
}