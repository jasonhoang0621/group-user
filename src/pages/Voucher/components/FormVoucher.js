import { DatePicker, Form, Input, InputNumber, Spin } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React from "react";

const FormVoucher = ({ form, isLoading }) => {
  const onFinish = (values) => {
    console.log('test') 
    console.log(form.getFieldsValue()) 
  };
  return (
    <Spin spinning={isLoading}>
      <Form form={form} onFinish={onFinish}>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true }]}
        >
          <TextArea />
        </Form.Item>
        <Form.Item name="price" label="Price" rules={[{ required: true }]}>
          <InputNumber prefix="$" />
        </Form.Item>
        <Form.Item name="stock" label="Quantity" rules={[{ required: true }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item name="endDate" label="Due">
          <DatePicker format={"DD/MM/YYYY"} />
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default FormVoucher;
