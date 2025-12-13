"use client";

import { Button, Col, DatePicker, Divider, Form, Input, InputNumber, message, Modal, Radio, Row, Select, Space, TableProps } from "antd";
import { useEffect, useMemo, useState } from "react";
import DataTable from "./component/Table";
import SearchBar from "./component/SearchBar";
import dayjs from "dayjs";
import dork from "./component/wharf.module.scss"
import { Option } from "antd/es/mentions";
import { SearchOutlined } from "@ant-design/icons";
import raw from "@/data/kehoachcapben.json";
import ListVessel from "./component/ListVessel";

type Row = {
  id: number;
  stt?: number;
  VesslID: string;
  VesslName: string;
  dork: string;
  ETB: string;
  OprID: string;
  IMO: number | null;
  LastPort: number | null;
  NextPort: number | null;
  fromBitt: string;
  toBitt: string;
  generous: string;
  hanhTrinhDen: string;
  hanhTrinhRoi: string;
  cangTruoc: string;
  cangSau: string;
  ETA: string;
  ETW: string;
  ETC: string;
  ETD: string;
  editable?: boolean;
}

export const MAN_CAP_OPTIONS = [
  { label: "Trái", value: "L" as const },
  { label: "Phải", value: "R" as const },
]

const INITIAL: Row[] = (raw as any[]).map((r, i) => ({
  id: r.id ?? i + 1,
  stt: r.stt,
  VesslID: r.VesslID ?? "",
  VesslName: r.VesslName ?? "",
  dork: r.dork ?? "",
  ETB: r.ETB ?? "",
  OprID: r.OprID ?? "",
  IMO: r.IMO ?? null,
  LastPort: r.LastPort ?? null,
  NextPort: r.NextPort ?? null,
  fromBitt: r.fromBitt ?? "",
  toBitt: r.toBitt ?? "",
  generous: r.generous ?? "",
  hanhTrinhDen: r.hanhTrinhDen ?? "",
  hanhTrinhRoi: r.hanhTrinhRoi ?? "",
  cangTruoc: r.cangTruoc ?? "",
  cangSau: r.cangSau ?? "",
  ETA: r.ETA ?? "",
  ETW: r.ETW ?? "",
  ETC: r.ETC ?? "",
  ETD: r.ETD ?? "",
}));

const STORAGE_KEY = "kehoachtaucapben-data";

export default function KeHoachTauCapBen() {
  const [q, setQ] = useState("");
  const [data, setData] = useState<Row[]>(INITIAL);
  const [open, setOpen] = useState(false);
  const [addCount, setAddCount] = useState<number | null>(null);
  const [openVessel, setOpenVessel] = useState(false);
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
          dork: x.dork,
          ETB: x.ETB,
          OprID: x.OprID,
          IMO: x.IMO,
          LastPort: x.LastPort,
          NextPort: x.NextPort,
          fromBitt: x.fromBitt,
          toBitt: x.toBitt,
          generous: x.generous,
          hanhTrinhDen: x.hanhTrinhDen,
          hanhTrinhRoi: x.hanhTrinhRoi,
          cangTruoc: x.cangTruoc,
          cangSau: x.cangSau,
          ETA: x.ETA,
          ETW: x.ETW,
          ETC: x.ETC,
          ETD: x.ETD,
        }));
        setData(mapped);
      }
    } catch (error) {
      setData([]);
    }
  }, []);

  const addBlankRows = (n: any) => {
    const ts = Date.now();
    const rows: Row[] = Array.from({length: n}, (_, i) => ({
      id: -(ts + i),
      VesslID: "",
      VesslName: "",
      dork: "",
      ETB: "",
      OprID: "",
      IMO: null,
      LastPort: null,
      NextPort: null,
      fromBitt: "",
      toBitt: "",
      generous: "",
      hanhTrinhDen: "",
      hanhTrinhRoi: "",
      cangTruoc: "",
      cangSau: "",
      ETA: "",
      ETW: "",
      ETC: "",
      ETD: "",
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
        width: 80,
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
        title: "Bến",
        dataIndex: "dork",
        width: 40,
        align: "center",
        sorter: (a, b) => (a.dork ?? "").localeCompare(b.dork ?? ""),
        render: (val, r) =>
          r.editable
            ? ( <Input
              variant="borderless"
              value={val}
              onChange={e => updateCell(r.id, "dork", e.target.value)}
              style={{ textAlign: "center", width: "100%", height: "100%" }}
            /> )
          : val
      },
      {
        title: "ETB",
        dataIndex: "ETB",
        width: 60,
        align: "center",
        sorter: (a, b) => (a.ETB ?? "").localeCompare(b.ETB ?? ""),
        render: (val, r) =>
          r.editable ? (
            <DatePicker
              variant="borderless"
              showTime
              format="YYYY/MM/DD HH:mm"
              value={val ? dayjs(val) : null}
              onChange={(date, dateString) => updateCell(r.id, "ETB", dateString)}
              style={{ width: "100%" }}
            /> )
          : val
      },
      {
        title: "Hãng khai thác",
        dataIndex: "OprID",
        width: 60,
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
        title: "IMO",
        dataIndex: "IMO",
        width: 40,
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
        title: "Chuyến nhập",
        dataIndex: "LastPort",
        width: 40,
        align: "center",
        render: (val, r) =>
          r.editable
            ? ( <Input
              variant="borderless"
              value={val}
              onChange={e => updateCell(r.id, "LastPort", e.target.value)}
              style={{ textAlign: "center", width: "100%", height: "100%" }}
            /> )
          : val
      },
      {
        title: "Chuyến xuất",
        dataIndex: "NextPort",
        width: 40,
        align: "center",
        render: (val, r) =>
          r.editable
            ? ( <Input
              variant="borderless"
              value={val}
              onChange={e => updateCell(r.id, "NextPort", e.target.value)}
              style={{ textAlign: "center", width: "100%", height: "100%" }}
            /> )
          : val
      },
      {
        title: "Từ Bitt",
        dataIndex: "fromBitt",
        width: 50,
        align: "center",
        sorter: (a, b) => (a.fromBitt ?? "").localeCompare(b.fromBitt ?? ""),
        render: (val, r) =>
          r.editable
            ? ( <Input
              variant="borderless"
              value={val}
              onChange={e => updateCell(r.id, "fromBitt", e.target.value)}
              style={{ textAlign: "center", width: "100%", height: "100%" }}
            /> )
          : val
      },
      {
        title: "Đến Bitt",
        dataIndex: "toBitt",
        width: 50,
        align: "center",
        sorter: (a, b) => (a.toBitt ?? "").localeCompare(b.toBitt ?? ""),
        render: (val, r) =>
          r.editable
            ? ( <Input
              variant="borderless"
              value={val}
              onChange={e => updateCell(r.id, "toBitt", e.target.value)}
              style={{ textAlign: "center", width: "100%", height: "100%" }}
            /> )
          : val
      },
      {
        title: "Mạn cập",
        dataIndex: "generous",
        width: 60,
        align: "center",
        render: (val: string, r: Row) =>
          r.editable ? (
            <Select
              variant="borderless"
              options={MAN_CAP_OPTIONS}
              value={val}
              onChange={(v) => updateCell(r.id, "generous", v)}
              labelRender={(item) => item?.value ?? ""}
              suffixIcon={null}
              style={{ textAlign: "center", width: "100%", height: "100%" }}
            />
          ) : (
          val ?? ""
        ),
      },
      {
        title: "Hành trình đến",
        dataIndex: "hanhTrinhDen",
        width: 50,
        align: "center",
        sorter: (a, b) => (a.hanhTrinhDen ?? "").localeCompare(b.hanhTrinhDen ?? ""),
        render: (val, r) =>
          r.editable
            ? ( <Input
              variant="borderless"
              value={val}
              onChange={e => updateCell(r.id, "hanhTrinhDen", e.target.value)}
              style={{ textAlign: "center", width: "100%", height: "100%" }}
            /> )
          : val
      },
      {
        title: "Hành trình rời",
        dataIndex: "hanhTrinhRoi",
        width: 50,
        align: "center",
        sorter: (a, b) => (a.hanhTrinhRoi ?? "").localeCompare(b.hanhTrinhRoi ?? ""),
        render: (val, r) =>
          r.editable
            ? ( <Input
              variant="borderless"
              value={val}
              onChange={e => updateCell(r.id, "hanhTrinhRoi", e.target.value)}
              style={{ textAlign: "center", width: "100%", height: "100%" }}
            /> )
          : val
      },
      {
        title: "Cảng trước",
        dataIndex: "cangTruoc",
        width: 40,
        align: "center",
        sorter: (a, b) => (a.cangTruoc ?? "").localeCompare(b.cangTruoc ?? ""),
        render: (val, r) =>
          r.editable
            ? ( <Input
              variant="borderless"
              value={val}
              onChange={e => updateCell(r.id, "cangTruoc", e.target.value)}
              style={{ textAlign: "center", width: "100%", height: "100%" }}
            /> )
          : val
      },
      {
        title: "Cảng sau",
        dataIndex: "cangSau",
        width: 40,
        align: "center",
        sorter: (a, b) => (a.cangSau ?? "").localeCompare(b.cangSau ?? ""),
        render: (val, r) =>
          r.editable
            ? ( <Input
              variant="borderless"
              value={val}
              onChange={e => updateCell(r.id, "cangSau", e.target.value)}
              style={{ textAlign: "center", width: "100%", height: "100%" }}
            /> )
          : val
      },
      {
        title: "ETA",
        dataIndex: "ETA",
        width: 60,
        align: "center",
        sorter: (a, b) => (a.ETA ?? "").localeCompare(b.ETA ?? ""),
        render: (val, r) =>
          r.editable ? (
             <DatePicker
              variant="borderless"
              showTime
              format="YYYY/MM/DD HH:mm"
              value={val ? dayjs(val) : null}
              onChange={(date, dateString) => updateCell(r.id, "ETA", dateString)}
              style={{ width: "100%" }}
            /> )
          : val
      },
      {
        title: "ETW",
        dataIndex: "ETW",
        width: 60,
        align: "center",
        sorter: (a, b) => (a.ETW ?? "").localeCompare(b.ETW ?? ""),
        render: (val, r) =>
          r.editable ? (
            <DatePicker
              variant="borderless"
              showTime
              format="YYYY/MM/DD HH:mm"
              value={val ? dayjs(val) : null}
              onChange={(date, dateString) => updateCell(r.id, "ETW", dateString)}
              style={{ width: "100%" }}
            /> )
          : val
      },
      {
        title: "ETC",
        dataIndex: "ETC",
        width: 60,
        align: "center",
        sorter: (a, b) => (a.ETC ?? "").localeCompare(b.ETC ?? ""),
        render: (val, r) =>
          r.editable ? (
            <DatePicker
              variant="borderless"
              showTime
              format="YYYY/MM/DD HH:mm"
              value={val ? dayjs(val) : null}
              onChange={(date, dateString) => updateCell(r.id, "ETC", dateString)}
              style={{ width: "100%" }}
            /> )
          : val
      },
      {
        title: "ETD",
        dataIndex: "ETD",
        width: 60,
        align: "center",
        sorter: (a, b) => (a.ETD ?? "").localeCompare(b.ETD ?? ""),
        render: (val, r) =>
          r.editable ? (
            <DatePicker
              variant="borderless"
              showTime
              format="YYYY/MM/DD HH:mm"
              value={val ? dayjs(val) : null}
              onChange={(date, dateString) => updateCell(r.id, "ETD", dateString)}
              style={{ width: "100%" }}
            /> )
          : val
      },
    ], [data]
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

  return (
    <div className="container_dork">
      <div className={dork.top}>
        <Form
          layout="vertical"
          form={form}
          style={{width: "35%"}}
          initialValues={{
            mancap: "trai"
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Mã tàu" name="VesslID" className={dork.form_item}>
                <Input
                  placeholder="Mã tàu"
                  // value={form.getFieldValue("VesslID")}
                  addonAfter= {
                    <Space size={4} split={<Divider type="vertical"  style={{height: 30}}/>}>
                      <Button 
                        type="text"
                        size="small"
                        icon={<SearchOutlined />}
                        onClick={() => setOpenVessel(true)}
                        style={{color: "#f76707", width: 10}}
                      />
                    </Space>
                  }
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Hãng tàu" name="OprID" className={dork.form_item}>
                <Input placeholder="Hãng khai thác" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Tên tàu" name="VesslName" className={dork.form_item}>
                <Input placeholder="Tên tàu"
                // value={form.getFieldValue("VesslName")}
                disabled />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="IMO" name="IMO" className={dork.form_item}>
                <Input placeholder="IMO"
                // value={form.getFieldValue("IMO")}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Bến" name="dork" className={dork.form_item}>
                <Select
                  placeholder="Mã bến"
                  options={[
                    { value: "A", label: "A" },
                    { value: "B", label: "B" }
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Chuyến nhập" name="LastPort" style={{marginBottom: "0px"}}>
                <Input placeholder="Chuyến nhập" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Chuyến xuất" name="NextPort" style={{marginBottom: "0px"}}>
                <Input placeholder="Chuyến xuất" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Form
          layout="vertical"
          form={form}
          style={{width: "30%"}}
          initialValues={{
            mancap: "trai"
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Từ Bitt" name="fromBitt" className={dork.form_item}>
                <Select
                  placeholder="Từ bitt"
                  options={[
                    { value: "A", label: "A" },
                    { value: "B", label: "B" }
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Đến Bitt" name="toBitt" className={dork.form_item}>
                <Select
                  placeholder="Đến bitt"
                   options={[
                    { value: "A", label: "A" },
                    { value: "B", label: "B" }
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Hành trình đến" name="hanhTrinhDen" className={dork.form_item}>
                <Select
                  placeholder="Hành trình đến"
                  options={[
                    { value: "A", label: "A" },
                    { value: "B", label: "B" }
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Đại lý" name="daiLy" className={dork.form_item}>
                <Select
                  placeholder="Đại lý"
                  options={[
                    { value: "A", label: "A" },
                    { value: "B", label: "B" }
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Mạn cập" name="generous" style={{marginBottom: "0px"}}>
                <Radio.Group>
                  <Radio value="trai">Trái</Radio>
                  <Radio value="phai">Phải</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
        </Form>
         <Form
          layout="vertical"
          form={form}
          style={{width: "35%"}}
          initialValues={{
            mancap: "trai"
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="ETA" name="ETA" className={dork.form_item}>
                <DatePicker
                  showTime
                  format="YYYY/MM/DD HH:mm"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="ETB" name="ETB" className={dork.form_item}>
                <DatePicker
                  showTime
                  format="YYYY/MM/DD HH:mm"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="ETW" name="ETW" className={dork.form_item}>
                <DatePicker
                  showTime
                  format="YYYY/MM/DD HH:mm"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="ETC" name="ETC" className={dork.form_item}>
                <DatePicker
                  showTime
                  format="YYYY/MM/DD HH:mm"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="ETD" name="ETD" className={dork.form_item}>
                <DatePicker
                  showTime
                  format="YYYY/MM/DD HH:mm"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item label="Ghi chú" name="ghiChu">
              <Input placeholder="..." />
            </Form.Item>
          </Col>
          </Row>
        </Form>
      </div>
      <div>
        <DataTable<Row>
          rowKey="id"
          columns={columns}
          leftSlot={
            <SearchBar label="Tìm:" onChange={setQ} />
          }
          data={filtered}
          scrollY={ 'calc(100vh - 360px)'}
          scrollX={"220vw"}
        />
      </div>
      <ListVessel 
        open={openVessel}
        onClose={() => setOpenVessel(false)}
        onConfirm={(record: any) => {
          form.setFieldsValue({
            VesslID: record.VesslID,
            VesslName: record.VesslName,
            IMO: record.IMO
          });
          setOpenVessel(false)
        }}
      />
    </div>
  )
}