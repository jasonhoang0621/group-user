import { Form, Input, InputNumber, notification, Spin } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "src/api/user";
import FacebookIcon from "src/assets/images/facebook.png";
import GoogleIcon from "src/assets/images/google.png";

const Verify = () => {
  const [form] = useForm();
  const navigate = useNavigate();
  const { mutateAsync, isLoading } = useRegister();

  const handleVerify = async () => {
    const res = await mutateAsync(form.getFieldsValue());
    if (res.errorCode) {
      notification.error({
        message: "Login failed",
        description: res.data.message || "Login failed",
        duration: 1,
      });
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#495E54]">
      {/* make card glass */}
      <div className="shadow-2xl rounded-lg p-8 bg-white bg-opacity-50 backdrop-filter backdrop-blur-sm">
        <Spin spinning={isLoading}>
          <div className="flex justify-center mb-5">
            <p className="text-[40px] font-semibold uppercase">Verify</p>
          </div>
          <Form form={form} onFinish={handleVerify} className="w-[500px]">
            <Form.Item
              name="code"
              rules={[{ required: true, message: "Please input your code!" }]}
            >
              <InputNumber
                className="app-input w-full"
                placeholder="Verify code"
                type="number"
              />
            </Form.Item>
            <div className="flex justify-center">
              <button type="primary" htmlType="submit" className="button">
                <span>Continue</span>
              </button>
            </div>
          </Form>
        </Spin>
      </div>
    </div>
  );
};

export default Verify;
