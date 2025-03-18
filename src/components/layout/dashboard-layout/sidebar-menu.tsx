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
import { useNavigate } from "react-router-dom";

const LayoutSidebar = () => {
  const navigate = useNavigate();
  const { handleMenuChange, findSelectedMenu } = useDashboardLayout();

  const items: MenuItem[] = [
    getItem({
      key: "Dashboard",
      label: "Dashboard",
      icon: <PieChartOutlined />,
      onTitleClick: () => navigate("/"),
    }),
    getItem({
      key: "Jobs",
      label: "Jobs",
      icon: <DesktopOutlined />,
      onTitleClick: () => navigate("/jobs"),
    }),
    getItem({
      key: "Forms",
      label: "Forms",
      icon: <DesktopOutlined />,
      onTitleClick: () => navigate("/forms"),
    }),
    getItem({
      key: "References",
      label: "References",
      icon: <DesktopOutlined />,
      onTitleClick: () => navigate("/reference"),
    }),
    getItem({
      key: "Reports",
      label: "Reports",
      icon: <UserOutlined />,
      onTitleClick: () => navigate("/reports"),
    }),
    getItem({
      key: "Floor Plans",
      label: "Floor Plans",
      icon: <FileOutlined />,
      onTitleClick: () => navigate("/floor-plans"),
    }),
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
