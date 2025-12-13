// components/VesselTable.tsx
import React from "react";
import { Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";

interface Vessel {
  key: string;
  vesselID: string;
  vesselName: string;
  vesselType: string;
  nation: string;
  IMO: string;
}

const VesselTable: React.FC = () => {
  const columns: ColumnsType<Vessel> = [
    { title: "Mã Tàu", dataIndex: "vesselID", key: "vesselID" },
    { title: "Tên Tàu", dataIndex: "vesselName", key: "vesselName" },
    { title: "Loại Tàu", dataIndex: "vesselType", key: "vesselType" },
    { title: "Quốc Gia", dataIndex: "nation", key: "nation" },
    { title: "IMO", dataIndex: "IMO", key: "IMO" },
    {
      title: "Hành Động",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <>
          <Button>Edit</Button>
          <Button style={{ marginLeft: 8 }}>Delete</Button>
        </>
      ),
    },
  ];

  const data: Vessel[] = [
    {
      key: "1",
      vesselID: "V001",
      vesselName: "Tàu A",
      vesselType: "Tàu RoRo",
      nation: "Vietnam",
      IMO: "IMO001",
    },
    {
      key: "2",
      vesselID: "V002",
      vesselName: "Tàu B",
      vesselType: "Tàu bách hóa",
      nation: "Vietnam",
      IMO: "IMO002",
    },
  ];

  return <Table columns={columns} dataSource={data} />;
};

export default VesselTable;
