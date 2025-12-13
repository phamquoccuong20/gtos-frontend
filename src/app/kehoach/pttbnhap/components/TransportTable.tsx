// components/TransportTable.tsx
import React from "react";
import { Table, Checkbox, Button } from "antd";

const TransportTable: React.FC = () => {
  const columns = [
    { title: "STT", dataIndex: "STT", key: "STT" },
    { title: "Số xe", dataIndex: "deviceID", key: "deviceID" },
    { title: "Thuê", dataIndex: "isLease", key: "isLease" },
    {
      title: "Hầm 1",
      dataIndex: "cellar1",
      key: "cellar1",
      // render: (value: boolean) => <Checkbox checked={value} />,
    },
    {
      title: "Hầm 2",
      dataIndex: "cellar2",
      key: "cellar2",
      // render: (value: boolean) => <Checkbox checked={value} />,
    },
  ];

  const data = [
    {
      STT: 1,
      deviceID: "V001",
      isLease: "Thuê",
      cellar1: true,
      cellar2: false,
    },
    {
      STT: 2,
      deviceID: "V002",
      isLease: "Không thuê",
      cellar1: false,
      cellar2: true,
    },
  ];

  return (
    <>
      <Button type="primary">Lưu</Button>
      <Table columns={columns} dataSource={data} rowKey="deviceID" />
    </>
  );
};

export default TransportTable;
