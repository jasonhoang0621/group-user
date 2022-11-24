import {
  Button,
  Form,
  Input,
  Modal,
  notification,
  Select,
  Spin,
  Table,
  Tag,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import React from "react";
import { useSelector } from "react-redux";
import { useGetListUser } from "src/api/user";
import { CopyOutlined } from "@ant-design/icons";
import { useDetailGroup } from "src/api/group";
import { useParams } from "react-router-dom";

const Group = () => {
  // const user = useSelector((state) => state.auth);
  const pararms = useParams();
  const user = {
    role: "owner",
  };
  const [removeUserModal, setRemoveUserModal] = React.useState(false);
  const [assignUserModal, setAssignUserModal] = React.useState(false);
  const [shareLinkModal, setShareLinkModal] = React.useState(false);
  const [inviteModal, setInviteModal] = React.useState(false);
  const [assignUser, setAssignUser] = React.useState(null);
  const [removeUser, setRemoveUser] = React.useState(null);
  const [form] = useForm();

  const { data: groupDetailData } = useDetailGroup(pararms.id);

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

  const handleCopyToClipBoard = () => {
    navigator.clipboard.writeText("https://google.com");
    notification.success({
      message: "Link Copied",
    });
  };

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
      <div className="flex items-center justify-end mb-5">
        <button
          className="button button-danger !py-[8px] !min-w-[120px]"
          onClick={() => setShareLinkModal(true)}
        >
          <span className="!text-[13px]">Create Link</span>
        </button>
        <button
          className="button !py-[8px] !min-w-[120px]"
          onClick={() => setInviteModal(true)}
        >
          <span className="!text-[13px]">Invite</span>
        </button>
      </div>
      <Table columns={columns} dataSource={data} rowKey="id" />
      <Modal
        title={"Unblock User"}
        visible={removeUserModal}
        onCancel={() => {
          setRemoveUserModal(false);
          setRemoveUser(null);
        }}
        footer={null}
        destroyOnClose
      >
        <div>
          <div className="">
            <p className="text-lg">
              Are you sure you want to remove{" "}
              <strong>{removeUser && removeUser.name}</strong> from this group?
            </p>
          </div>
          <div className="flex items-center justify-end mt-4">
            <button
              className="button button-danger mr-2 !py-[8px] !min-w-[120px]"
              onClick={handleRemoveUser}
            >
              <span className="!text-[12px]">Cancel</span>
            </button>
            <button
              className="button button-secondary !py-[8px] !min-w-[120px]"
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
        destroyOnClose
      >
        <div>
          <p className="mb-2">
            Choose Role For <strong>{assignUser?.name}:</strong>
          </p>
          <Select
            mode="single"
            className="app-select"
            placeholder="Select Role"
            defaultValue={assignUser?.role}
          >
            <Select.Option value="owner">Owner</Select.Option>
            <Select.Option value="coOwner">Co-owner</Select.Option>
            <Select.Option value="member">Member</Select.Option>
          </Select>
        </div>
        <div className="flex items-center justify-end mt-4">
          <button
            className="button button-danger !py-2 !min-w-[100px]"
            onClick={() => {
              setAssignUserModal(false);
              setAssignUser(null);
            }}
          >
            <span className="!text-[12px]">Cancel</span>
          </button>
          <button
            className="button button-secondary !py-2 !min-w-[100px]"
            onClick={handleAssignRole}
          >
            <span className="!text-[12px]">Assign</span>
          </button>
        </div>
      </Modal>
      <Modal
        title={"Share Link"}
        visible={shareLinkModal}
        onCancel={() => {
          setShareLinkModal(false);
        }}
        footer={null}
        destroyOnClose
      >
        <div>
          <Input
            className="app-input copy-input"
            readOnly
            value="https://www.google.com"
            suffix={<CopyOutlined />}
            onClick={handleCopyToClipBoard}
          />
        </div>
      </Modal>
      <Modal
        title={"Invite User"}
        visible={inviteModal}
        onCancel={() => {
          setInviteModal(false);
        }}
        footer={null}
        destroyOnClose
      >
        <div className="w-full">
          <p className="font-semibold">Enter Email:</p>
          <Select mode="tags" placeholder="Enter email" className="app-select">
            {data.map((item) => (
              <Select.Option key={item.id} value={item.email}>
                {item.email}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div className="flex items-center justify-end mt-4">
          <button
            className="button button-danger !py-2 !min-w-[100px]"
            onClick={() => {
              setInviteModal(false);
            }}
          >
            <span className="!text-[12px]">Cancel</span>
          </button>
          <button className="button button-secondary !py-2 !min-w-[100px]">
            <span className="!text-[12px]">Invite</span>
          </button>
        </div>
      </Modal>
    </Spin>
  );
};

export default Group;
