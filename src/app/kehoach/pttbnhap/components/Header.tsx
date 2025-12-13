// components/Header.tsx
import React from "react";
import { Input, Button, Row, Col } from "antd";

const HeaderComponent: React.FC = () => {
  return (
    <Row gutter={16}>
      <Col span={12}>
        <Input placeholder="Tìm kiếm tàu" />
      </Col>
      <Col span={12}>
        <Button type="primary" icon={<i className="fa fa-search" />}>
          Nạp dữ liệu
        </Button>
      </Col>
    </Row>
  );
};

export default HeaderComponent;
