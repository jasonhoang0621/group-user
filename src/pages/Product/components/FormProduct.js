import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  notification,
  Select,
  Upload,
} from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/lib/input/TextArea";
import { useEffect, useState } from "react";
import categoryAPI from "src/api/category";
import supplierAPI from "src/api/supplier";
import { getBase64 } from "src/helpers/image";
import FormSupplier from "./FormSupplier";

const FormProduct = ({ form }) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [supplierList, setSupplierList] = useState([]);
  const [isSupplierModal, setIsSupplierModal] = useState(false);
  const [supplierForm] = useForm();
  const [supplierLoading, setSupplierLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [imageLength, setImageLength] = useState(
    form.getFieldValue("image") ? form.getFieldValue("image").length : 0
  );

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList: newFileList }) => {
    form.setFieldsValue({ image: newFileList });
    setImageLength(newFileList.length);
  };

  const handleAddSupplier = async (e) => {
    e.preventDefault();
    setSupplierLoading(true);
    const res = await supplierAPI.create(supplierForm.getFieldsValue());
    if (res.errorCode) {
      notification.error({
        message: "Error",
        description: res.data.message || "Cannot create supplier",
        duration: 1,
      });
      setSupplierLoading(false);
      return;
    }
    setSupplierList([...supplierList, res.data]);
    setSupplierLoading(false);
    setIsSupplierModal(false);
    supplierForm.resetFields();
  };

  useEffect(() => {
    const getData = async () => {
      const res = await supplierAPI.getListSupplier();
      if (res.errorCode) {
        notification.error({
          message: res.data || "Cannot get supplier data",
          duration: 1,
        });
        return;
      }
      setSupplierList(res.data);

      const res1 = await categoryAPI.getListCategory();
      if (res1.errorCode) {
        notification.error({
          message: res1.data || "Cannot get category data",
          duration: 1,
        });
        return;
      }
      setCategoryData(res1.data);
    };

    getData();
  }, []);

  return (
    <>
      <Form form={form}>
        <Form.Item
          label="image"
          name="image"
          valuePropName="fileList"
          getValueFromEvent={(e) => e.fileList}
          rules={[{ required: true, message: "Please input your image!" }]}
        >
          <Upload
            listType="picture-card"
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {imageLength > 0 ? null : (
              <div>
                <PlusOutlined />
                <div
                  style={{
                    marginTop: 8,
                  }}
                >
                  Upload
                </div>
              </div>
            )}
          </Upload>
        </Form.Item>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input product name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            { required: true, message: "Please input product description!" },
          ]}
        >
          <TextArea />
        </Form.Item>
        <Form.Item
          label="Category"
          name="categoryId"
          rules={[{ required: true, message: "Please choose category!" }]}
        >
          <Select placeholder="Please choose category">
            {categoryData.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        {/* <Form.Item
          label="Color"
          name="color"
          rules={[{ required: true, message: "Please input product color!" }]}
        >
          <Select
            mode="multiple"
            showArrow
            showSearch
            tagRender={tagRender}
            style={{ width: "100%" }}
            options={options}
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider style={{ margin: "8px 0" }} />
                <Space style={{ padding: "0 8px 4px" }}>
                  <Input
                    placeholder="Please enter item"
                    value={colorTag}
                    onChange={(e) => setColorTag(e.target.value)}
                  />
                  <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                    Add item
                  </Button>
                </Space>
              </>
            )}
          />
        </Form.Item> */}
        <Form.Item
          label="Dimension"
          name={"dimension"}
          rules={[
            { required: true, message: "Please input product dimension!" },
          ]}
        >
          <Input />
        </Form.Item>
        <div className="flex items-center mb-5">
          <Form.Item
            label="Brand"
            name="supplierId"
            rules={[
              { required: true, message: "Please choose product brand!" },
            ]}
            className="w-full mb-0"
          >
            <Select placeholder="Choose Brand">
              {supplierList.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.companyName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Button
            type="primary"
            className="text-blue-500 ml-5"
            onClick={() => setIsSupplierModal(true)}
          >
            Add Brand
          </Button>
        </div>
        <Form.Item
          label="Warranty"
          name="warranty"
          rules={[
            { required: true, message: "Please input product warranty!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please input product price!" }]}
        >
          <Input prefix="$" type={"number"} />
        </Form.Item>
        <Form.Item label="Sale" name="sale">
          <Input suffix="%" type={"number"} />
        </Form.Item>
        <Form.Item
          label="Quantity"
          name="stock"
          rules={[
            { required: true, message: "Please input product quantity!" },
          ]}
        >
          <InputNumber />
        </Form.Item>
      </Form>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
      <Modal
        visible={isSupplierModal}
        title="Add Brand"
        onOk={handleAddSupplier}
        onCancel={() => setIsSupplierModal(false)}
        okText={<span className="text-blue-500 hover:text-white">Add</span>}
      >
        <FormSupplier
          form={supplierForm}
          onSubmit={handleAddSupplier}
          isLoading={supplierLoading}
        />
      </Modal>
    </>
  );
};

export default FormProduct;
