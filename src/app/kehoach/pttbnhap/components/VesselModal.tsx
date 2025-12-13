// components/VesselModal.tsx
import React from "react";
import { Modal, Table, Input, Button } from "antd";

const VesselModal = ({ open, onClose, onConfirm }: any) => {
  const columns = [
    { title: "Mã tàu", dataIndex: "vesselID", key: "vesselID" },
    { title: "Tên tàu", dataIndex: "vesselName", key: "vesselName" },
    { title: "ATA", dataIndex: "ATA", key: "ATA" },
    { title: "ETA", dataIndex: "ETA", key: "ETA" },
  ];

  const data = [
    { vesselID: "V001", vesselName: "Tàu A", ATA: "10:00", ETA: "12:00" },
    { vesselID: "V002", vesselName: "Tàu B", ATA: "11:00", ETA: "13:00" },
  ];

  return (
    <Modal open={open} title="Chọn tàu" onCancel={onClose}>
      <Input placeholder="Tìm kiếm tàu" style={{ marginBottom: "10px" }} />
      <Table columns={columns} dataSource={data} rowKey="vesselID" />
    </Modal>
  );
};

export default VesselModal;
