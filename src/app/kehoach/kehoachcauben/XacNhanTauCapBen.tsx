"use client";

import { useMemo, useState } from "react";
import { Table, Tag, Card, DatePicker, Row, Col, Input, Radio } from "antd";
import dayjs from "dayjs";
import raw from "@/data/kehoachcapben.json";

type Row = {
  id: number;
  stt?: number;
  VesslID: string;
  VesslName: string;
  ETB: string;
  LastPort: string;
  NextPort: string;
  fromBitt: string;
  toBitt: string;
  generous: string;
  status: string;
  ETA: string;
  ETW: string;
  ETC: string;
  ETD: string;
  cangTruoc: string;
  cangSau: string;
  editable?: boolean;
};

const INITIAL: Row[] = (raw as any[]).map((r, i) => ({
  id: r.id ?? i + 1,
  stt: r.stt,
  VesslID: r.VesslID ?? "",
  status: r.status ?? "",
  VesslName: r.VesslName ?? "",
  ETB: r.ETB ?? "",
  LastPort: r.LastPort ?? null,
  NextPort: r.NextPort ?? null,
  fromBitt: r.fromBitt ?? "",
  toBitt: r.toBitt ?? "",
  generous: r.generous ?? "",
  cangTruoc: r.cangTruoc ?? "",
  cangSau: r.cangSau ?? "",
  ETA: r.ETA ?? "",
  ETW: r.ETW ?? "",
  ETC: r.ETC ?? "",
  ETD: r.ETD ?? "",
}));

export default function Page() {
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [q, setQ] = useState("");
  const [data, setData] = useState<Row[]>(INITIAL);

  const STATUS_COLOR: any = {
    "Chưa cập": "blue",
    "Đang làm": "green",
    "Đã rời": "gray",
    "Đã đến": "purple",
    "Đã cập": "cyan",
    "Chưa làm hàng": "orange",
    "Đang làm hàng": "gold",
    "Đã làm hàng": "geekblue",
    "Đang rời": "volcano",
  };

  // Map ATA/ATB/ATD... → trạng thái
  const STATUS_MAP: any = {
    ATA: "Đã đến",
    ATB: "Đã cập",
    ATWD: "Chưa làm hàng",
    ATCD: "Đang làm hàng",
    ATWL: "Đã làm hàng",
    ATCL: "Đang rời",
    ATD: "Đã rời",
  };

  const columns: any = [
    {
      title: "STT",
      dataIndex: "key",
      width: 60,
      align: "center",
      render: (_value: any, _record: any, index: number) => index + 1,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      align: "center",
      width: 120,
      render: (text: string) => <Tag color={STATUS_COLOR[text]}>{text}</Tag>,
    },
    { title: "Mã tàu", dataIndex: "VesslID", width: 180, align: "center" },
    { title: "Tên tàu", dataIndex: "VesslName", width: 200, align: "center" },
    {
      title: "CN–CX",
      dataIndex: "cncx",
      width: 120,
      align: "center",
      render: (_: any, record: any) =>
        `${record.LastPort ?? ""} - ${record.NextPort ?? ""}`,
    },
    { title: "Mạn cập", dataIndex: "generous", width: 70, align: "center" },
  ];

  const filtered = useMemo(() => {
    if (!q) return data;
    const n = q.toLowerCase();
    return data.filter((r) =>
      [r.VesslID, r.VesslName].some((v) =>
        String(v ?? "")
          .toLowerCase()
          .includes(n)
      )
    );
  }, [data, q]);

  const handleSetTime = (type: string, value: any) => {
    if (!selectedRow) return;

    const newData = data.map((item) =>
      item.id === selectedRow.id
        ? {
            ...item,
            [type.toLowerCase()]: value
              ? value.format("YYYY-MM-DD HH:mm")
              : null,
            status: STATUS_MAP[type], // tự đổi trạng thái
          }
        : item
    );

    setData(newData);

    setSelectedRow({
      ...selectedRow,
      [type.toLowerCase()]: value ? value.format("YYYY-MM-DD HH:mm") : null,
      status: STATUS_MAP[type],
    });
  };

  return (
    <div>
      <Row gutter={20}>
        <Col span={15}>
          <div className="col-span-7 bg-white px-4 py-3 rounded shadow">
            <div className="flex items-center justify-between mb-3">
              {/* LEFT: SEARCH */}
              <Input.Search
                placeholder="Tìm kiếm theo tên tàu..."
                allowClear
                onChange={(e) => setQ(e.target.value)}
                style={{ width: "250px" }}
              />

              {/* RIGHT: TOTAL ROW COUNT */}
              <div className="text-gray-600">
                Số dòng:{" "}
                <span className="font-semibold">{filtered.length}</span>
              </div>
            </div>
            <Table
              rowKey="id"
              size="middle"
              columns={columns}
              dataSource={filtered}
              pagination={{ pageSize: 10 }}
              scroll={{ x: 900, y: 430 }}
              onRow={(record) => ({
                onClick: () => setSelectedRow(record),
              })}
              rowClassName={(record) =>
                selectedRow?.id === record.id ? "row-selected" : ""
              }
            />
          </div>
        </Col>

        {/* PANEL — BÊN PHẢI */}
        <Col span={9}>
          <Card
            className="my-card"
            title={
              selectedRow ? (
                <div>
                  <div style={{ fontWeight: 600, fontSize: 16 }}>
                    Tên tàu: {selectedRow.VesslName}
                  </div>
                  {/* <div style={{ fontSize: 14, color: "#555" }}>
                    Mã tàu: {selectedRow.VesslID}
                  </div> */}
                </div>
              ) : (
                "Chọn 1 tàu trong danh sách"
              )
            }
            style={{ borderRadius: 14 }}
          >
            {selectedRow && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-medium text-sm">CN</label>
                  <Input value={selectedRow?.LastPort ?? ""} disabled />
                </div>
                <div>
                  <label className="font-medium text-sm">CX</label>
                  <Input value={selectedRow?.NextPort ?? ""} disabled />
                </div>
                <div>
                  <label className="font-medium text-sm">ETB:</label>
                  <Input value={selectedRow?.ETB ?? ""} disabled />
                </div>
                <div>
                  <label className="font-medium text-sm">ETD:</label>
                  <Input value={selectedRow?.ETD ?? ""} disabled />
                </div>
                <div>
                  <label className="font-medium text-sm">Bến</label>
                  <Input value={selectedRow?.generous ?? ""} disabled />
                </div>
                <div>
                  <label className="font-medium text-sm">Bitt:</label>
                  <Input
                    value={`${selectedRow.fromBitt} - ${selectedRow.toBitt}`}
                    disabled
                  />
                </div>
                <div>
                  <label className="font-medium text-sm">Cảng trước:</label>
                  <Input value={selectedRow.cangTruoc ?? ""} disabled />
                </div>
                <div>
                  <label className="font-medium text-sm">Cảng sau:</label>
                  <Input value={selectedRow.cangSau ?? ""} disabled />
                </div>
              </div>
            )}
          </Card>
        </Col>

        <style>
          {`
        .row-selected {
          background: #e6f7ff !important;
        }
        .ant-table-thead > tr > th {
          background: #1c7ed6 !important;
          font-weight: 600 !important;
          color: white !important;
        }
        .my-card .ant-card-body {
          padding: 12px 24px !important;
        }
      `}
        </style>
      </Row>
      <div
        className="col-span-7 bg-white px-4 py-3 rounded shadow"
        style={{ marginTop: 15, border: "1px solid #f0f0f0" }}
      >
        {selectedRow && (
          <div>
            <Row gutter={16} style={{ marginTop: 10 }}>
              <Col span={6}>
                <b>ATA</b>
                <DatePicker
                  showTime
                  format="YYYY/MM/DD HH:mm"
                  style={{ width: "100%", marginTop: 5 }}
                  value={selectedRow?.ata ? dayjs(selectedRow.ata) : null}
                  onChange={(value) => handleSetTime("ATA", value)}
                />
              </Col>

              <Col span={6}>
                <b>ATB</b>
                <DatePicker
                  showTime
                  format="YYYY/MM/DD HH:mm"
                  style={{ width: "100%", marginTop: 5 }}
                  value={selectedRow?.atb ? dayjs(selectedRow.atb) : null}
                  onChange={(value) => handleSetTime("ATB", value)}
                />
              </Col>

              <Col span={6}>
                <b>ATWD</b>
                <DatePicker
                  showTime
                  format="YYYY/MM/DD HH:mm"
                  style={{ width: "100%", marginTop: 5 }}
                  value={selectedRow?.atwd ? dayjs(selectedRow.atwd) : null}
                  onChange={(value) => handleSetTime("ATWD", value)}
                />
              </Col>
              <Col span={6}>
                <b>ATCD</b>
                <DatePicker
                  showTime
                  format="YYYY/MM/DD HH:mm"
                  style={{ width: "100%", marginTop: 5 }}
                  value={selectedRow?.atcd ? dayjs(selectedRow.atcd) : null}
                  onChange={(value) => handleSetTime("ATCD", value)}
                />
              </Col>
            </Row>
            <Row gutter={16} style={{ marginTop: 10, marginBottom: 10 }}>
              <Col span={6}>
                <b>ATWL</b>
                <DatePicker
                  showTime
                  format="YYYY/MM/DD HH:mm"
                  style={{ width: "100%", marginTop: 5 }}
                  value={selectedRow?.atwl ? dayjs(selectedRow.atwl) : null}
                  onChange={(value) => handleSetTime("ATWL", value)}
                />
              </Col>
              <Col span={6}>
                <b>ATCL</b>
                <DatePicker
                  showTime
                  format="YYYY/MM/DD HH:mm"
                  style={{ width: "100%", marginTop: 5 }}
                  value={selectedRow?.atcl ? dayjs(selectedRow.atcl) : null}
                  onChange={(value) => handleSetTime("ATCL", value)}
                />
              </Col>
              <Col span={6}>
                <b>ATD</b>
                <DatePicker
                  showTime
                  format="YYYY/MM/DD HH:mm"
                  style={{ width: "100%", marginTop: 5 }}
                  value={selectedRow?.atd ? dayjs(selectedRow.atd) : null}
                  onChange={(value) => handleSetTime("ATD", value)}
                />
              </Col>
              <Col span={6}>
                <div>
                  <b>Mạn cập:</b>
                  <div style={{ marginTop: 10 }}>
                    <Radio.Group
                    // value={selectedRow?.side ?? ""}
                    // onChange={(e) => handleUpdateSide(e.target.value)}
                    >
                      <Radio value="T">Trái</Radio>
                      <Radio value="P">Phải</Radio>
                    </Radio.Group>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        )}
      </div>
    </div>
  );
}
