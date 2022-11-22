import { Form, Input, notification, Spin } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "src/api/user";
import { login } from "src/redux/auth";

const Register = () => {
  const [form] = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mutateAsync, isLoading } = useRegister();

  const handleRegister = async () => {
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
            <p className="text-[40px] font-semibold uppercase">Register</p>
          </div>
          <Form form={form} onFinish={handleRegister} className="w-[500px]">
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input className="app-input" placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input className="app-input" placeholder="Name" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password className="app-input" placeholder="Password" />
            </Form.Item>
            <Form.Item
              name="rePassword"
              rules={[
                {
                  required: true,
                  message: "Please input your retype-password!",
                },
              ]}
            >
              <Input.Password
                className="app-input"
                placeholder="Retype-password"
              />
            </Form.Item>
            <div className="flex justify-center">
              <button type="primary" htmlType="submit" className="button">
                <span>Register</span>
              </button>
            </div>
          </Form>
          <div className="text-center mt-5">
            <p>
              Or{" "}
              <Link
                to="/login"
                className="text-[#495E54] cursor-pointer hover:text-white"
              >
                You Already Have An Account
              </Link>
            </p>
          </div>
        </Spin>
      </div>
    </div>
  );
};

export default Register;
