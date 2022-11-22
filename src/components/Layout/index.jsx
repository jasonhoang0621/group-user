import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout as LayoutAntd, Menu } from "antd";
import "./layout.css";

import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import useRouting from "src/hooks/UseRouting";
import routers from "src/routers";
import CreateGroupModal from "../CreateGroupModal";
import { UserOutlined } from "@ant-design/icons";
import ChangePasswordModal from "../ChangePasswordModal";
import ProfileModal from "../ProfileModal";
const { Header, Sider, Content } = LayoutAntd;

const Layout = () => {
  const location = useLocation();
  const { generate } = useRouting();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [activeKey, setActiveKey] = useState(0);
  const [createGroupModal, setCreateGroupModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [changePasswordModal, setChangePasswordModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

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
          <div className="mr-10 mb-2 relative">
            <UserOutlined className="text-white text-[20px] cursor-pointer hover:opacity-60" />
            <ul className="block absolute right-0 top-[100%] bg-white z-10 min-w-[170px] shadow-2xl p-0 m-0 list-none">
              <li
                className="text-[14px] leading-1 pl-5 cursor-pointer transition-all duration-200 hover:bg-[#44523f] hover:text-white"
                onClick={() => setProfileModal(true)}
              >
                Profile
              </li>
              <li
                className="text-[14px] pl-5 cursor-pointer transition-all duration-200 hover:bg-[#44523f] hover:text-white"
                onClick={() => setChangePasswordModal(true)}
              >
                Change password
              </li>
              <li
                className="text-[14px] pl-5 cursor-pointer transition-all duration-200 hover:bg-[#44523f] hover:text-white"
                onClick={handleLogout}
              >
                Logout
              </li>
            </ul>
          </div>
        </Header>
        <Content className="site-layout-background mx-[16px] my-[24px] p-[24px] min-h-[280px]">
          <Outlet />
          <CreateGroupModal
            visible={createGroupModal}
            setVisible={setCreateGroupModal}
          />
          <ChangePasswordModal
            visible={changePasswordModal}
            setVisible={setChangePasswordModal}
          />
          <ProfileModal visible={profileModal} setVisible={setProfileModal} />
        </Content>
      </LayoutAntd>
    </LayoutAntd>
  );
};

export default Layout;
