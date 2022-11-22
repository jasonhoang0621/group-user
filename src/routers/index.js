import { UserOutlined } from "@ant-design/icons";
import User from "src/pages/User";

const routers = [
  {
    name: "user",
    path: "/user",
    element: User,
    icon: <UserOutlined />,
  },
];

export default routers;
