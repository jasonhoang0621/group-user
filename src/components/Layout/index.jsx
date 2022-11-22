import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout as LayoutAntd, Menu, Modal } from "antd";
import "./layout.css";

import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import useRouting from "src/hooks/UseRouting";
import routers from "src/routers";
import CreateGroupModal from "../CreateGroupModal";
const { Header, Sider, Content } = LayoutAntd;

const Layout = () => {
  const location = useLocation();
  const { generate } = useRouting();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [activeKey, setActiveKey] = useState(0);
  const [createGroupModal, setCreateGroupModal] = useState(false);

  useEffect(() => {
    const { pathname } = location;
    const key = routers.findIndex((router) => router.path === pathname);
    setActiveKey(key);
  }, [location]);

  return (
    <LayoutAntd>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo h-[64px] flex items-center justify-center">
          <p className="text-white font-semibold">MIDTERM</p>
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
        <Header className="site-layout-background flex items-center justify-between p-0">
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <button
            className="button !bg-[#192812] !p-0 !m-0 !rounded-none"
            onClick={() => setCreateGroupModal(true)}
          >
            <span>Create group</span>
          </button>
        </Header>
        <Content className="site-layout-background mx-[16px] my-[24px] p-[24px] min-h-[280px]">
          <Outlet />
          <CreateGroupModal
            visible={createGroupModal}
            setVisible={setCreateGroupModal}
          />
        </Content>
      </LayoutAntd>
    </LayoutAntd>
  );
};

export default Layout;
