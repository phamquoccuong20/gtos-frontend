// layouts/MainLayout.tsx
import React, { ReactNode } from "react";
import { Layout, Menu } from "antd";
import Link from "next/link";
import { Content, Footer, Header } from "antd/es/layout/layout";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Layout>
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">
            <Link href="/">Trang Chủ</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link href="/planning">Kế Hoạch Phương Tiện</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <div style={{ padding: 24, minHeight: 380 }}>{children}</div>
      </Content>
      <Footer style={{ textAlign: "center" }}>©2025 Công ty logistics</Footer>
    </Layout>
  );
};

export default MainLayout;
