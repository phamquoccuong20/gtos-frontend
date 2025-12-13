"use client";

import { useMemo, useState } from "react";
import { Segmented, InputNumber, Table, Typography, Space } from "antd";
import type { ColumnsType } from "antd/es/table";

type Dir = "USD2VND" | "VND2USD";
type Row = { 
    key: number; 
    maTyGia: "USD" | "VND"; 
    tyGiaToUSD: number 
};

const USD_TO_VND = 26385; 
const VND_TO_USD = 1 / USD_TO_VND;

export default function TyGiaSection() {
  const [dir, setDir] = useState<Dir>("USD2VND");
  const [amount, setAmount] = useState<number>(1);

  const data: Row[] = useMemo(
    () => [
      { 
        key: 1, 
        maTyGia: "USD", 
        tyGiaToUSD: 1 
    },
      { 
        key: 2, 
        maTyGia: "VND", 
        tyGiaToUSD: VND_TO_USD 
    },
    ],
    []
  );

  const columns: ColumnsType<Row> = [
    { 
        title: "STT",
        dataIndex: "key", 
        width: 100, sorter: (a, b) => a.key - b.key 
    },
    { 
        title: "Mã tỷ giá", 
        dataIndex: "maTyGia", 
        width: 180, sorter: (a, b) => a.maTyGia.localeCompare(b.maTyGia) 
    },
    {
      title: "Tỷ giá",
      dataIndex: "tyGiaToUSD",
      align: "right",
      render: (v: number) => (v < 0.01 ? v.toFixed(6) : v.toFixed(4)),
      sorter: (a, b) => a.tyGiaToUSD - b.tyGiaToUSD,
    },
  ];

  const result = useMemo(() => {
    const n = Number(amount) || 0;
    return dir === "USD2VND" ? n * USD_TO_VND : n * VND_TO_USD;
  }, [dir, amount]);

  const fmtUSD = (n: number) =>
    n.toLocaleString("en-US", { 
        style: "currency",
         currency: "USD", 
         maximumFractionDigits: 2 
        });
  const fmtVND = (n: number) =>
    n.toLocaleString("vi-VN", 
        { 
        style: "currency", 
        currency: "VND", 
        maximumFractionDigits: 0 
    });

  return (
    <section id="ty-gia" className="scroll-mt-[84px] space-y-4">
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <Typography.Title level={4} style={{ margin: 0, marginBottom: 12 }}>
          TỶ GIÁ
        </Typography.Title>

        <div className="mb-4 flex flex-wrap items-center gap-3">
          <Segmented<Dir>
            value={dir}
            onChange={(v) => setDir(v as Dir)}
            options={[
              { label: "USD → VND", value: "USD2VND" },
              { label: "VND → USD", value: "VND2USD" },
            ]}
          />
          <Space size="small" wrap>
            <span className="text-slate-700">Số tiền:</span>
            <InputNumber
              min={0}
              value={amount}
              onChange={(v) => setAmount(Number(v ?? 0))}
              style={{ width: 200 }}
            />
          </Space>

          {/* this is for mock data only. Use api later */}
          <div className="ml-auto text-slate-600 text-sm">
            1 USD = <strong>{fmtVND(USD_TO_VND)}</strong> · 1 VND ={" "}
            <strong>{VND_TO_USD.toFixed(6)} USD</strong> 
          </div>
        </div>

        <div className="mb-4 rounded-lg bg-slate-50 p-3 text-slate-800">
          {dir === "USD2VND" ? (
            <span>
              {fmtUSD(amount || 0)} ≈ <strong>{fmtVND(result)}</strong>
            </span>
          ) : (
            <span>
              {fmtVND(amount || 0)} ≈ <strong>{fmtUSD(result)}</strong>
            </span>
          )}
        </div>

        <Table<Row>
          size="middle"
          sticky
          rowKey="key"
          columns={columns}
          dataSource={data}
          pagination={false}
          scroll={{ x: true }}
        />
      </div>
    </section>
  );
}
