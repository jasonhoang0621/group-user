import { Form, Input, Spin } from "antd";

const FormSupplier = ({ form, isLoading }) => {
  return (
    <Spin spinning={isLoading}>
      <Form form={form}>
        <Form.Item
          label="Company Name"
          name="companyName"
          rules={[{ required: true, message: "Please input company name!" }]}
        >
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item
          label="Country"
          name="country"
          rules={[{ required: true, message: "Please input country!" }]}
        >
          <Input placeholder="Country" />
        </Form.Item>
        <Form.Item label="Address" name="address" rules={[{ required: false }]}>
          <Input placeholder="Address" />
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default FormSupplier;
