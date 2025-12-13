// components/VesselForm.tsx
import React, { useState } from "react";
import { Form, Input, Select, Button } from "antd";

const { Option } = Select;

const VesselForm: React.FC = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    console.log("Form Values: ", values);
    // Gửi dữ liệu đến server để lưu
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        label="Mã Tàu"
        name="vesselID"
        rules={[{ required: true, message: "Vui lòng nhập mã tàu" }]}
      >
        <Input placeholder="Mã tàu" />
      </Form.Item>
      <Form.Item
        label="Tên Tàu"
        name="vesselName"
        rules={[{ required: true, message: "Vui lòng nhập tên tàu" }]}
      >
        <Input placeholder="Tên tàu" />
      </Form.Item>
      <Form.Item
        label="Loại Tàu"
        name="vesselType"
        rules={[{ required: true, message: "Vui lòng chọn loại tàu" }]}
      >
        <Select placeholder="Chọn loại tàu">
          <Option value="RoRo">Tàu RoRo</Option>
          <Option value="Sà lan">Sà lan</Option>
          <Option value="Tàu bách hóa">Tàu bách hóa</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Quốc Gia"
        name="nation"
        rules={[{ required: true, message: "Vui lòng chọn quốc gia" }]}
      >
        <Select placeholder="Chọn quốc gia">
          <Option value="VN">Việt Nam</Option>
          <Option value="SG">Singapore</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="IMO"
        name="IMO"
        rules={[{ required: true, message: "Vui lòng nhập IMO" }]}
      >
        <Input placeholder="IMO" />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Lưu
      </Button>
    </Form>
  );
};

export default VesselForm;
