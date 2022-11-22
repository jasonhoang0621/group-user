import { Button, Form, Modal, Select, Spin, Table, Tag } from "antd";
import { useForm } from "antd/lib/form/Form";
import React from "react";
import { useSelector } from "react-redux";
import { useGetListUser } from "src/api/user";

const User = () => {
  // const user = useSelector((state) => state.auth);
  const user = {
    role: "owner",
  };
  const [removeUserModal, setRemoveUserModal] = React.useState(false);
  const [assignUserModal, setAssignUserModal] = React.useState(false);
  const [assignUser, setAssignUser] = React.useState(null);
  const [removeUser, setRemoveUser] = React.useState(null);
  const [form] = useForm();

  const { isLoading } = useGetListUser();
  const data = [
    {
      id: 1,
      name: "John Brown",
      email: "abc@gmail.com",
      role: "owner",
    },
    {
      id: 2,
      name: "Jim Green",
      email: "meadcad",
      role: "member",
    },
    {
      id: 3,
      name: "Joe Black",
      email: "meadcad",
      role: "member",
    },
    {
      id: 4,
      name: "Jim Red",
      email: "meadcad",
      role: "coOwner",
    },
    {
      id: 5,
      name: "Jim Blue",
      email: "meadcad",
      role: "leader",
    },
  ];

  const showRemoveButton = (record) => {
    if (user.role === "owner") {
      return (
        <button
          className="button button-danger !py-[5px] !min-w-[100px]"
          onClick={() => {
            setRemoveUser(record);
            setRemoveUserModal(true);
          }}
        >
          <span className="!text-[12px]">Remove</span>
        </button>
      );
    }
    if (user.role === "coOwner" && record.role !== "owner") {
      return (
        <button
          className="button button-danger !py-[5px] !min-w-[100px]"
          onClick={() => {
            setRemoveUser(record);
            setRemoveUserModal(true);
          }}
        >
          <span className="!text-[12px]">Remove</span>
        </button>
      );
    }

    return null;
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (text, record) => {
        switch (record.role) {
          case "owner":
            return (
              <div className="text-center">
                <Tag color="blue">Owner</Tag>
              </div>
            );
          case "coOwner":
            return (
              <div className="text-center">
                <Tag color="green">Co-owner</Tag>
              </div>
            );
          case "member":
            return (
              <div className="text-center">
                <Tag color="orange">Member</Tag>
              </div>
            );
          default:
            return (
              <div className="text-center">
                <Tag color="red">Unknown</Tag>
              </div>
            );
        }
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => {
        if (user.id !== record.id) {
          return (
            <div className="flex items-center justify-center">
              {showRemoveButton(record)}
              {user.role === "owner" && (
                <button
                  className="button !py-[5px] !min-w-[100px]"
                  onClick={() => {
                    setAssignUser(record);
                    setAssignUserModal(true);
                  }}
                >
                  <span className="!text-[12px]">Assign</span>
                </button>
              )}
            </div>
          );
        }
      },
    },
  ];

  const handleRemoveUser = () => {
    setRemoveUser(null);
    setRemoveUserModal(false);
  };

  const handleAssignRole = () => {
    setAssignUser(null);
    setAssignUserModal(false);
  };

  return (
    <Spin spinning={isLoading}>
      <Table columns={columns} dataSource={data} rowKey="id" />
      <Modal
        title={"Unblock User"}
        visible={removeUserModal}
        onCancel={() => {
          setRemoveUserModal(false);
          setRemoveUser(null);
        }}
        footer={null}
      >
        <div>
          <div className="">
            <p className="text-lg font-semibold">
              Are you sure you want to remove this user?
            </p>
          </div>
          <div className="flex items-center justify-end mt-4">
            <button
              className="button button-danger mr-2"
              onClick={handleRemoveUser}
            >
              <span className="!text-[12px]">Cancel</span>
            </button>
            <button
              className="button button-secondary"
              onClick={() => {
                setRemoveUserModal(false);
                setAssignUser(null);
                setRemoveUser(null);
              }}
            >
              <span className="!text-[12px]">Remove</span>
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        title={"Assign User"}
        visible={assignUserModal}
        onCancel={() => {
          setAssignUserModal(false);
          setAssignUser(null);
        }}
        footer={null}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Role" name="role">
            <Select>
              <Select.Option value="coOwner">Co-owner</Select.Option>
              <Select.Option value="leader">Leader</Select.Option>
              <Select.Option value="member">Member</Select.Option>
            </Select>
          </Form.Item>
          <div className="flex items-center justify-end mt-4">
            <button
              className="button button-danger mr-2"
              onClick={() => {
                setAssignUserModal(false);
                setAssignUser(null);
              }}
            >
              <span className="!text-[12px]">Cancel</span>
            </button>
            <button
              className="button button-secondary"
              onClick={handleAssignRole}
            >
              <span className="!text-[12px]">Assign</span>
            </button>
          </div>
        </Form>
      </Modal>
    </Spin>
  );
};

export default User;
