import { Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import React from "react";

const ProfileModal = ({ visible, setVisible }) => {
  const [form] = useForm();

  const handleChangePassword = () => {
    setVisible(false);
  };

  return (
    <Modal
      visible={visible}
      onCancel={() => setVisible(false)}
      footer={null}
      title="Profile"
    >
      <Form form={form} layout="vertical">
        <Form.Item name="name">
          <Input className="app-input" placeholder="Name" />
        </Form.Item>
        <div className="flex items-center justify-end mt-4">
          <button
            className="button button-danger mr-2"
            onClick={() => setVisible(false)}
          >
            <span className="!text-[12px]">Cancel</span>
          </button>
          <button
            className="button button-secondary"
            onClick={handleChangePassword}
          >
            <span className="!text-[12px]">Change</span>
          </button>
        </div>
      </Form>
    </Modal>
  );
};

export default ProfileModal;
