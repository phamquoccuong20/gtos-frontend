"use client";

import TimelineRow from "./components/TimelineRow";
import { Button, Input, Select, Typography } from "antd";
import "./styles/global.css";
import { DeleteOutlined, PlusOutlined, SaveOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export default function Page() {
  return (
    <div className="p-5">
      <div className="header">
        <Title level={4} style={{ color: "#228be6" }}>
          HÀNH TRÌNH TÀU
        </Title>
        <div className="btn_data">
          <Button
            variant="outlined"
            icon={<PlusOutlined />}
            className="btn_load"
          >
            Thêm mới
          </Button>
          <Button
            variant="outlined"
            icon={<SaveOutlined />}
            style={{ color: "#5c6bc0", border: "1px solid" }}
            className="btn_add"
            // onClick={() => setOpenPlan(true)}
          >
            Lưu
          </Button>
          <Button
            variant="outlined"
            icon={<DeleteOutlined />}
            className="btn_delete"
          >
            Xóa dòng
          </Button>
        </div>
      </div>
      <div className="code_local">
        <label
          className="block text-sm font-semibold mb-1"
          style={{ color: "#868e96" }}
        >
          Mã hành trình
        </label>
        <Select
          placeholder="Mã hành trình"
          style={{ width: 280, height: 40 }}
          // options={""}
        ></Select>
      </div>

      <h2
        className="text-center text-2xl font-bold mb-4"
        style={{ color: "#228be6" }}
      >
        CHI TIẾT HÀNH TRÌNH TÀU
      </h2>

      <TimelineRow />

      <div className="relative top-0 left-[50px] w-[85%] h-[150px]">
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center gap-10">
          <div className="code_submission">
            <label className="code_text">Mã hành trình:</label>
            <Input className="" style={{ width: 170, height: 30 }} />
          </div>

          <div className="code_submission">
            <label className="code_text">Tên hành trình:</label>
            <Input className="" style={{ width: 170, height: 30 }} />
          </div>
        </div>
      </div>

      <TimelineRow />
    </div>
  );
}
