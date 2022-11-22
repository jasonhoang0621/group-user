import { Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import React from "react";

const ChangePasswordModal = ({ visible, setVisible }) => {
  const [form] = useForm();

  const handleChangePassword = () => {
    setVisible(false);
  };

  return (
    <Modal visible={visible} onCancel={() => setVisible(false)} footer={null}>
      <Form form={form} layout="vertical" className="mt-10">
        <Form.Item name="password">
          <Input.Password
            className="app-input"
            placeholder="Current password"
          />
        </Form.Item>
        <Form.Item name="newPassword">
          <Input.Password className="app-input" placeholder="New password" />
        </Form.Item>
        <Form.Item name="rePassword">
          <Input.Password className="app-input" placeholder="Retype password" />
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

export default ChangePasswordModal;
