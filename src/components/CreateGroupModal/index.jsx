import { Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import React from "react";

const CreateGroupModal = ({ visible, setVisible }) => {
  const [form] = useForm();
  return (
    <Modal
      title="Create group"
      visible={visible}
      onCancel={() => setVisible(false)}
      footer={null}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input group name!" }]}
        >
          <Input className="app-input" placeholder="Group name" />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            { required: true, message: "Please input group description!" },
          ]}
        >
          <Input.TextArea
            className="app-input"
            placeholder="Group description"
          />
        </Form.Item>
        <div className="flex justify-center">
          <button type="primary" htmlType="submit" className="button">
            <span>Create</span>
          </button>
        </div>
      </Form>
    </Modal>
  );
};

export default CreateGroupModal;
