import Sider from "antd/es/layout/Sider";
import "./style.scss";
import { Menu } from "antd";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { getItem, MenuItem } from "../../../utils/helpers";

const LayoutSidebar = () => {
  const items: MenuItem[] = [
    getItem("Dashboard", "1", <PieChartOutlined />),
    getItem("Jobs", "2", <DesktopOutlined />),
    getItem("Reports", "3", <UserOutlined />),
    getItem("Templates", "4", <FileOutlined />),
  ];

  return (
    <Sider breakpoint="lg" className="layout-sidebar" theme="light">
      <Menu defaultSelectedKeys={["1"]} mode="inline" items={items} />
    </Sider>
  );
};

export default LayoutSidebar;
