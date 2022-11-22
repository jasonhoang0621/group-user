import { Button, Form, Input, notification, Spin } from "antd";
import { useForm } from "antd/lib/form/Form";
import React from "react";
import { useDispatch } from "react-redux";
import userAPI, { useLogin } from "src/api/user";
import { login } from "src/redux/auth";
import logo from "src/assets/images/logo.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form] = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mutateAsync, isLoading } = useLogin();

  const handleLogin = async () => {
    const res = await mutateAsync(form.getFieldsValue());
    if (res.errorCode) {
      notification.error({
        message: "Login failed",
        description: res.data.message || "Login failed",
        duration: 1,
      });
    } else {
      localStorage.setItem("token", res.data.token);
      dispatch(login(res.data));
      navigate("/");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#495E54]">
      {/* make card glass */}
      <div className="shadow-2xl rounded-lg p-8 bg-white bg-opacity-50 backdrop-filter backdrop-blur-sm">
        <Spin spinning={isLoading}>
          <div className="flex justify-center mb-5">
            <p className="text-[40px] font-semibold uppercase">Login</p>
          </div>
          <Form form={form} onFinish={handleLogin} className="w-[500px]">
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input className="app-input" placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password className="app-input" placeholder="Password" />
            </Form.Item>
            <div className="flex justify-center">
              <button type="primary" htmlType="submit" className="button">
                <span>Login</span>
              </button>
            </div>
          </Form>
        </Spin>
      </div>
    </div>
  );
};

export default Login;
