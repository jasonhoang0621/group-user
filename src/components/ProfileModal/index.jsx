import { Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import React from "react";
import { useEditProfile } from "src/api/user";
import { notification } from "antd";
import { useQueryClient } from "react-query";
const ProfileModal = ({ visible, setVisible }) => {
  const [form] = useForm();
  const { mutateAsync } = useEditProfile();
  const queryClient = useQueryClient();
  const handleChangeProfile = async () => {
    const res = await mutateAsync(form.getFieldsValue());
    if (res.errorCode) {
      notification.error({
        message: "Edit failed",
        description: res.data,
        duration: 1,
      });
    } else {
      notification.success({
        message: "Edit profile successfully",
        duration: 1,
      });
      queryClient.invalidateQueries("group");
      setVisible(false);
    }
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
            onClick={handleChangeProfile}
          >
            <span className="!text-[12px]">Change</span>
          </button>
        </div>
      </Form>
    </Modal>
  );
};

export default ProfileModal;
