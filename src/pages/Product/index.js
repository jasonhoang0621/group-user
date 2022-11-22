import { Button, Modal, notification, Spin, Table } from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import React, { useEffect } from "react";
import productAPI from "src/api/product";
import FormProduct from "./components/FormProduct";

const Product = () => {
  const [form] = useForm();
  const [isModal, setIsModal] = React.useState(false);
  const [editItem, setEditItem] = React.useState(null);
  const [deleteItem, setDeleteItem] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isModalLoading, setIsModalLoading] = React.useState(false);
  const [isDeleteModal, setIsDeleteModal] = React.useState(false);
  const [data, setData] = React.useState([]);

  const handelCloseModal = () => {
    setEditItem(null);
    setDeleteItem(null);
    setIsModal(false);
  };

  const handleSetEditProduct = (record) => {
    setIsModal(true);
    setEditItem(record);
    form.setFieldsValue({
      id: record.id,
      name: record.name,
      price: record.price,
      description: record.description,
      image: [
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: record.image[0],
        },
      ],
      categoryId: record.categoryId,
      supplierId: record.supplierId,
      dimension: record.dimension,
      warranty: record.warranty,
      sale: record.sale,
      stock: record.stock,
    });
  };

  const handleAddProduct = async () => {
    setIsModalLoading(true);
    if (
      form.isFieldsTouched() &&
      form.getFieldsError().filter((item) => item.errors.length > 0).length > 0
    ) {
      setIsModalLoading(false);
      return;
    }
    let isFail = false;
    Object.keys(form.getFieldsValue()).forEach((item) => {
      if (!form.getFieldsValue()[item]) {
        setIsModalLoading(false);
        isFail = true;
        notification.error({
          message: "Error",
          description: "Please fill all the fields",
          duration: 1,
        });
      }
    });
    if (!isFail) {
      try {
        const formData = form.getFieldsValue();
        const fd = new FormData();
        fd.append("file", form.getFieldValue("image")[0].originFileObj);
        fd.append("upload_preset", "bspwbktq");
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/ducka9boe/image/upload",
          fd
        );
        if (response?.data?.secure_url) {
          formData.image = [response.data.secure_url];
        } else {
          notification.error({
            message: "Error",
            description: "Cannot upload image",
            duration: 1,
          });
          setIsModalLoading(false);
          return;
        }
        const res = await productAPI.create(formData);
        if (res.errorCode) {
          notification.error({
            message: "Error",
            description: res.data || "Cannot create product",
            duration: 1,
          });
          setIsModalLoading(false);
          return;
        }
        notification.success({
          message: "Success",
          description: "Create product successfully",
          duration: 1,
        });
        setData([res.data, ...data]);

        setIsModal(false);
        setIsModalLoading(false);
        form.resetFields();
      } catch (error) {
        notification.error({
          message: "Error",
          description: "Cannot create product",
          duration: 1,
        });
        setIsModalLoading(false);
      }
    }
  };

  const handleEditProduct = async () => {
    setIsModalLoading(true);
    if (
      form.isFieldsTouched() &&
      form.getFieldsError().filter((item) => item.errors.length > 0).length > 0
    ) {
      setIsModalLoading(false);
      return;
    }
    let isFail = false;
    Object.keys(form.getFieldsValue()).forEach((item) => {
      if (item.length === 0) {
        setIsModalLoading(false);
        isFail = true;
        notification.error({
          message: "Error",
          description: "Please fill all the fields",
          duration: 1,
        });
      }
    });
    if (!isFail) {
      try {
        const formData = form.getFieldsValue();
        const fd = new FormData();
        if (form.getFieldValue("image")[0].originFileObj) {
          fd.append("file", form.getFieldValue("image")[0].originFileObj);
          fd.append("upload_preset", "bspwbktq");
          const response = await axios.post(
            "https://api.cloudinary.com/v1_1/ducka9boe/image/upload",
            fd
          );
          if (response?.data?.secure_url) {
            formData.image = [response.data.secure_url];
          } else {
            notification.error({
              message: "Error",
              description: "Cannot upload image",
              duration: 1,
            });
            setIsModalLoading(false);
            return;
          }
        } else {
          formData.image = [form.getFieldValue("image")[0].url];
        }
        const res = await productAPI.update(editItem.id, formData);
        if (res.errorCode) {
          notification.error({
            message: "Error",
            description: res.data || "Cannot create product",
            duration: 1,
          });
          setIsModalLoading(false);
          return;
        }
        notification.success({
          message: "Success",
          description: "Create product successfully",
          duration: 1,
        });

        setData(
          data.map((item) => (item.id === res.data.id ? res.data : item))
        );
        setIsModal(false);
        setIsModalLoading(false);
        form.resetFields();
      } catch (error) {
        notification.error({
          message: "Error",
          description: "Cannot create product",
          duration: 1,
        });
        setIsModalLoading(false);
      }
    }
  };

  const handleDeleteProduct = async () => {
    setIsLoading(true);
    const res = await productAPI.delete(deleteItem.id);
    if (res.errorCode) {
      notification.error({
        message: "Error",
        description: res.data || "Delete product error",
        duration: 1,
      });
      setIsLoading(false);
      return;
    }
    notification.success({
      message: "Success",
      description: "Delete product successfully",
      duration: 1,
    });

    setData(data.filter((item) => item.id !== deleteItem.id));
    setIsDeleteModal(false);
    setIsLoading(false);
  };

  const columns = [
    {
      title: "",
      dataIndex: "image",
      key: "image",
      render: (text, record) => (
        <img src={record.image[0]} alt="thumbnail" width="100" height="100" />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Sale",
      dataIndex: "sale",
      key: "sale",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Sold",
      dataIndex: "sold",
      key: "sold",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <div className="text-center">
          <Button
            type="danger"
            className="text-red-500"
            onClick={() => {
              setDeleteItem(record);
              setIsDeleteModal(true);
            }}
          >
            Delete
          </Button>
          <Button
            type="primary"
            className="text-blue-500 ml-2"
            onClick={() => handleSetEditProduct(record)}
          >
            Edit
          </Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const getProductData = async () => {
      setIsLoading(true);
      const res = await productAPI.getListProduct();
      if (res.errorCode) {
        notification.error({
          message: "Error",
          description: res.data,
        });
        setIsLoading(false);
        return;
      }
      setData(res.data);
      setIsLoading(false);
    };
    getProductData();
  }, []);

  return (
    <Spin spinning={isLoading}>
      <div>
        <Button
          type="primary"
          className="text-blue-500 mb-5"
          onClick={() => {
            setIsModal(true);
            form.resetFields();
          }}
        >
          Create
        </Button>
        <Table columns={columns} dataSource={data} rowKey="id" />
        <Modal
          title={editItem ? "Edit Product" : "Create Product"}
          visible={isModal}
          onOk={editItem ? handleEditProduct : handleAddProduct}
          onCancel={handelCloseModal}
          okText={
            <span className="text-blue-500 hover:text-white">
              {editItem ? "Update" : "Create"}
            </span>
          }
          destroyOnClose
        >
          <Spin spinning={isModalLoading}>
            <FormProduct form={form} />
          </Spin>
        </Modal>
        <Modal
          title="Delete Product"
          visible={isDeleteModal}
          onOk={handleDeleteProduct}
          onCancel={() => setIsDeleteModal(false)}
          okText={<span className="text-red-500 hover:text-white">Delete</span>}
          okButtonProps={{ disabled: isLoading, type: "danger" }}
        >
          <p>Are you sure you want to delete this product?</p>
        </Modal>
      </div>
    </Spin>
  );
};

export default Product;
