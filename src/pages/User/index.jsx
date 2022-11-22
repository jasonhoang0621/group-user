import { Button, Modal, notification, Spin, Table } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import userAPI from "src/api/user";

const User = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  const user = useSelector((state) => state.auth);

  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [blockUser, setBlockUser] = React.useState(null);
  const [unblockUser, setUnblockUser] = React.useState(null);

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
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div className="text-center">
          {record.deletedAt ? (
            <Button
              type="primary"
              className="text-blue-500"
              onClick={() => {
                setUnblockUser(record);
                setIsModalVisible(true);
              }}
            >
              <span>Unblock</span>
            </Button>
          ) : (
            <Button
              type="danger"
              className="text-red-500"
              onClick={() => {
                setBlockUser(record);
                setIsModalVisible(true);
              }}
            >
              <span>Block</span>
            </Button>
          )}
        </div>
      ),
    },
  ];

  const handleBLockUser = async () => {
    setIsLoading(true);
    try {
      if (blockUser) {
        const res = await userAPI.blockUser(blockUser.id);
        if (res?.errorCode) {
          notification.error({
            message: "Error",
            description: res.data || "Something went wrong",
            duration: 2,
          });
          setIsLoading(false);
          return;
        }
        notification.success({
          message: "Success",
          description: "User blocked successfully",
          duration: 2,
        });
        setData(
          data.map((item) =>
            item.id === blockUser.id ? { ...item, deletedAt: true } : item
          )
        );
        setIsModalVisible(false);
        setBlockUser(null);
      } else {
        const res = await userAPI.unblockUser(unblockUser.id);
        if (res?.errorCode) {
          notification.error({
            message: "Error",
            description: res.data || "Something went wrong",
            duration: 2,
          });
          setIsLoading(false);
          return;
        }
        notification.success({
          message: "Success",
          description: "User unblocked successfully",
          duration: 2,
        });
        setData(
          data.map((item) =>
            item.id === unblockUser.id ? { ...item, deletedAt: false } : item
          )
        );
        setIsModalVisible(false);
        setUnblockUser(null);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      notification.error({
        message: "Error",
        description: error.message || "Something went wrong",
        duration: 2,
      });
    }
  };

  useEffect(() => {
    const getUserData = async () => {
      setIsLoading(true);
      const res = await userAPI.getListUser();
      if (res.errorCode) {
        setData([]);
      } else {
        setData(res.data ?? []);
      }
      setIsLoading(false);
    };
    getUserData();
  }, [user]);
  console.log(data)
  return (
    <Spin spinning={isLoading}>
      <Table columns={columns} dataSource={data} rowKey="id" />
      <Modal
        title={blockUser ? "Block User" : "Unblock User"}
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setBlockUser(null);
          setUnblockUser(null);
        }}
        okText={
          blockUser ? (
            <span className="text-red-500 hover:text-white">Block</span>
          ) : (
            <span className="text-blue-500 hover:text-white">Unblock</span>
          )
        }
        okButtonProps={{
          disabled: isLoading,
          type: blockUser ? "danger" : "primary",
        }}
        onOk={handleBLockUser}
      >
        {blockUser ? (
          <p>Do you want to block {blockUser?.name}?</p>
        ) : (
          <p>Do you want to unblock {unblockUser?.name}?</p>
        )}
      </Modal>
    </Spin>
  );
};

export default User;
