import Sider from "antd/es/layout/Sider";
import "./style.scss";
import { Menu } from "antd";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { getItem, MenuItem } from "../../../utils/helper/general.helper";
import useDashboardLayout from "./useDashboardLayout";

const LayoutSidebar = () => {
  const { handleMenuChange, findSelectedMenu } = useDashboardLayout();

  const items: MenuItem[] = [
    getItem("Dashboard", "/", <PieChartOutlined />),
    getItem("Jobs", "/jobs", <DesktopOutlined />),
    getItem("Forms", "/forms", <DesktopOutlined />),
    getItem("Reports", "/reports", <UserOutlined />),
    getItem("Floor Plans", "/floor-plans", <FileOutlined />),
  ];

  return (
    <Sider breakpoint="lg" className="layout-sidebar" theme="light">
      <Menu
        onSelect={handleMenuChange}
        defaultSelectedKeys={findSelectedMenu()}
        mode="inline"
        items={items}
      />
    </Sider>
  );
};

export default LayoutSidebar;
