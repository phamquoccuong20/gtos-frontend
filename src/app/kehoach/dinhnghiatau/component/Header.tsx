// components/Header.tsx
import React from "react";
import { Input, Button, Row, Col } from "antd";

const HeaderComponent: React.FC = () => {
  return (
    <Row gutter={16} style={{ marginBottom: "20px" }}>
      <Col span={12}>
        <Input placeholder="Tìm kiếm tàu" />
      </Col>
      <Col span={12}>
        <Button type="primary">Nạp Dữ Liệu</Button>
      </Col>
    </Row>
  );
};

export default HeaderComponent;
