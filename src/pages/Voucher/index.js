import { Button, Modal, notification, Spin, Table } from "antd";
import React, { useEffect } from "react";
import voucherAPI from "src/api/voucher";
import moment from "moment";
import { useForm } from "antd/es/form/Form";
import FormVoucher from "./components/FormVoucher";

const Voucher = () => {
  const [form] = useForm();
  const [isModal, setIsModal] = React.useState(false);
  const [editItem, setEditItem] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [reset, setReset] = React.useState(0);
  const handelCloseModal = () => {
    setEditItem(null);
    setIsModal(false);
  };

  const handleSetEditVoucher = (record) => {
    setIsModal(true);
    setEditItem(record);
    form.setFieldsValue({
      name: record.name,
      description: record.description,
      price: record.price,
      stock: record.stock,
      endDate: record?.endDate ? moment(record.endDate) : "",
    });
  };

  const handleAddVoucher = async () => {
    setIsLoading(true);
    if (
      form.isFieldsTouched() &&
      form.getFieldsError().filter((item) => item.errors.length > 0).length > 0
    ) {
      setIsLoading(false);
      return;
    }
    let isFail = false;
    console.log(form.getFieldsValue());
    Object.keys(form.getFieldsValue()).forEach((item) => {
      if (!form.getFieldsValue()[item] && item !== "endDate") {
        setIsLoading(false);
        isFail = true;
        notification.error({
          message: "Error",
          description: "Please fill all the fields",
          duration: 1,
        });
        return;
      }
    });
    if (!isFail) {
      let data = {
        ...form.getFieldsValue(),
        endDate: moment(form.getFieldValue("endDate")).format(
          "DD/MM/YYYY")
      };
      if (
        form.getFieldValue("endDate") === "" ||
        data.endDate === "Invalid date"
      ) {
        delete data.endDate;
      } else {
        data.endDate = moment(form.getFieldValue("endDate")).format(
          "DD/MM/YYYY"
        );
      }
      const res = await voucherAPI.create(data);
      if (res.errorCode) {
        notification.error({
          message: "Error",
          description: res.data.message || "Cannot create voucher",
          duration: 1,
        });
        setIsLoading(false);
      } else {
        notification.success({
          message: "Success",
          description: "Voucher created successfully",
          duration: 1,
        });
        setReset(reset + 1);
        setIsLoading(false);
        setIsModal(false);
        form.resetFields();
      }
    }
  };

  const handleEditVoucher = async () => {
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
      if (!form.getFieldsValue()[item] && item !== "endDate") {
        setIsLoading(false);
        isFail = true;
      }
    });
    if (!isFail) {
      let data = {
        ...form.getFieldsValue(),
        endDate: moment(form.getFieldValue("endDate")).format(
          "DD/MM/YYYY")
      };
      if (
        form.getFieldValue("endDate") === "" ||
        data.endDate === "Invalid date"
      ) {
        delete data.endDate;
      } else {
        data.endDate = moment(form.getFieldValue("endDate")).format(
          "DD/MM/YYYY"
        );
      }
      const res = await voucherAPI.update(editItem.id, data);
      if (res.errorCode) {
        notification.error({
          message: "Error",
          description: res.data.message || "Cannot update voucher",
          duration: 1,
        });
        setIsLoading(false);
        return;
      } else {
        notification.success({
          message: "Success",
          description: "Voucher updated successfully",
          duration: 1,
        });
        setReset(reset + 1);
      }

      setEditItem(null);
      setIsLoading(false);
      setIsModal(false);
      form.resetFields();
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Quantity",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Due",
      dataIndex: "endDate",
      key: "endDate",
      render: (text) => (text ? moment(text).format("DD/MM/YYYY") : null),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <Button
          type="primary"
          className="text-blue-500"
          onClick={() => handleSetEditVoucher(record)}
        >
          Edit
        </Button>
      ),
    },
  ];

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const res = await voucherAPI.getListVoucher();
        if (res.errorCode) {
          notification.error({
            message: "Error",
            description: res.data || "Something went wrong",
          });
          setIsLoading(false);
          return;
        }
        setData(res.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        notification.error({
          message: "Error",
          description: "Something went wrong",
        });
      }
    };

    getData();
  }, [reset]);

  return (
    <Spin spinning={isLoading}>
      <Button
        type="primary"
        className="text-blue-500 mb-5"
        onClick={() => setIsModal(true)}
      >
        Create
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        isLoading={isLoading}
        rowKey="id"
      />

      <Modal
        title={editItem ? "Edit Voucher" : "Create Voucher"}
        visible={isModal}
        onOk={editItem ? handleEditVoucher : handleAddVoucher}
        onCancel={handelCloseModal}
        okText={
          <span className="text-blue-500 hover:text-white">
            {editItem ? "Update" : "Create"}
          </span>
        }
      >
        <FormVoucher form={form} isLoading={isLoading} />
      </Modal>
    </Spin>
  );
};

export default Voucher;
