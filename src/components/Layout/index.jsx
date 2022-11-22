import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout as LayoutAntd, Menu } from "antd";
import "./layout.css";

import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import logo from "src/assets/images/logo.png";
import useRouting from "src/hooks/UseRouting";
import routers from "src/routers";
const { Header, Sider, Content } = LayoutAntd;

const Layout = () => {
  const location = useLocation();
  const { generate } = useRouting();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [activeKey, setActiveKey] = useState(0);

  useEffect(() => {
    const { pathname } = location;
    const key = routers.findIndex((router) => router.path === pathname);
    setActiveKey(key);
  }, [location]);

  return (
    <LayoutAntd>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo h-[64px] flex items-center justify-center">
          <img src={logo} width={100} height={100} alt="logo" />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          activeKey={[activeKey]}
          items={routers.map((item, index) => ({
            label: item.name.toUpperCase(),
            icon: item.icon,
            key: index,
            onClick: () => navigate(generate(item.name)),
          }))}
        />
      </Sider>
      <LayoutAntd className="site-LayoutAntd">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </LayoutAntd>
    </LayoutAntd>
  );
};

export default Layout;
