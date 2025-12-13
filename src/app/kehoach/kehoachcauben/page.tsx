"use client";

import { Button, Tabs, Typography } from "antd";
import KeHoachTauCapBen from "./KeHoachTauCapBen";
import XacNhanTauCapBen from "./XacNhanTauCapBen";
import wharf from "./component/wharf.module.scss";
import { DeleteOutlined, PlusOutlined, SaveOutlined, SearchOutlined } from "@ant-design/icons";

export default function KeHoachCauBenPage() {
  const items = [
    {
      key: "1",
      label : "KẾ HOẠCH TÀU CẬP BẾN",
      children: <KeHoachTauCapBen />
    },
    {
      key: "2",
      label : "XÁC NHẬN TÀU CẬP BẾN",
      children: <XacNhanTauCapBen />
    }
  ];
  return (
    <section className="section_plan p-4">
      <div className={wharf.header}>
        <Typography.Title level={4}>KẾ HOẠCH CẦU BẾN</Typography.Title>
        <div className={wharf.header_right}>
          <Button
            variant="outlined"
            icon={<SearchOutlined />}
            style={{color: "#f39c12", border: "1px solid"}}
            className={wharf.btn_orange}
          >
            Tải danh sách
          </Button>
          <Button
            variant="outlined"
            icon={<PlusOutlined />}
            style={{color: "#18c5a9", border: "1px solid"}}
            className={wharf.btn_green}
          >
            Thêm mới
          </Button>
          <Button
            variant="outlined"
            icon={<SaveOutlined />}
            style={{color: "#5c6bc0", border: "1px solid"}}
            className={wharf.btn_blue}
          >
            Lưu
          </Button>
          <Button
            variant="outlined"
            icon={<DeleteOutlined  />}
            style={{color: "#f75a5f", border: "1px solid"}}
            className={wharf.btn_red}
          >
            Xóa dòng
          </Button>
        </div>
      </div>

      <Tabs
        defaultActiveKey="1"
        items={items}
        type="card"
        size="large"
        className={wharf.tabs}
      />
    </section>
  )
}