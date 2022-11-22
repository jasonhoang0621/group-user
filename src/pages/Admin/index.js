import { Button, Modal, notification, Spin, Table } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useEffect } from "react";
import userAPI from "src/api/user";
import FormAdmin from "./components/FormAdmin";

const Admin = () => {
  const [isModal, setIsModal] = React.useState(false);
  const [form] = useForm();
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState([]);

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
  ];

  const handleCreateAdmin = async () => {
    setIsLoading(true);
    if (
      form.isFieldsTouched() &&
      form.getFieldsError().filter((item) => item.errors.length > 0).length > 0
    ) {
      setIsLoading(false);
      return;
    }
    let isFail = false;
    Object.keys(form.getFieldsValue()).forEach((item) => {
      if (!form.getFieldsValue()[item]) {
        setIsLoading(false);
        isFail = true;
        notification.error({
          message: "Error",
          description: "Please fill all the fields",
          duration: 1,
        });
      }
    });
    if (!isFail) {
      const dataForm = form.getFieldsValue();
      if (dataForm.password !== dataForm.confirmPassword) {
        notification.error({
          message: "Password not match",
          duration: 1,
        });
        setIsLoading(false);
        return;
      }
      dataForm.role = "admin";
      const res = await userAPI.register(dataForm);
      if (res?.errorCode) {
        notification.error({
          message: res.data || "Something went wrong",
          duration: 1,
        });
        setIsLoading(false);
        return;
      } else {
        setData([...data, res.data]);
        form.resetFields();
        setIsLoading(false);
        setIsModal(false);
      }
    }
  };

  useEffect(() => {
    const getAdminData = async () => {
      setIsLoading(true);
      const res = await userAPI.getListAdmin();
      if (res?.errorCode) {
        setIsLoading(false);
      } else {
        setData(res.data);
        setIsLoading(false);
      }
    };
    getAdminData();
  }, []);

  return (
    <Spin spinning={isLoading}>
      <Button
        type="primary"
        className="text-blue-500 mb-5"
        onClick={() => setIsModal(true)}
      >
        Create
      </Button>
      <Table columns={columns} dataSource={data} rowKey="id" />

      <Modal
        title={"Create Admin"}
        visible={isModal}
        onOk={handleCreateAdmin}
        onCancel={() => setIsModal(false)}
        okText={
          <span className="text-blue-500 hover:text-white">{"Create"}</span>
        }
      >
        <FormAdmin form={form} isLoading={isLoading} />
      </Modal>
    </Spin>
  );
};

export default Admin;
