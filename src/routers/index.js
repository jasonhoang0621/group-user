import Admin from "src/pages/Admin";
import User from "src/pages/User";
import {
  UserOutlined,
  ShoppingCartOutlined,
  MoneyCollectOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import Order from "src/pages/Order";
import Voucher from "src/pages/Voucher";
import Product from "src/pages/Product";

const routers = [
  {
    name: "admin",
    path: "/",
    element: Admin,
    icon: <UserOutlined />,
  },
  {
    name: "user",
    path: "/user",
    element: User,
    icon: <UserOutlined />,
  },
  {
    name: "product",
    path: "/product",
    element: Product,
    icon: <InboxOutlined />,
  },
  {
    name: "order",
    path: "/order",
    element: Order,
    icon: <ShoppingCartOutlined />,
  },
  {
    name: "voucher",
    path: "/voucher",
    element: Voucher,
    icon: <MoneyCollectOutlined />,
  },
];

export default routers;
