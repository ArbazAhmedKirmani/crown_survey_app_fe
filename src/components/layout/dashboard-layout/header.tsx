import { Header } from "antd/es/layout/layout";
import "./style.scss";
import { Col, Image, Menu, Row } from "antd";
import useDashboardLayout from "./useDashboardLayout";
import { getItem, MenuItem } from "../../../utils/helper/general.helper";
import {
  BarChartOutlined,
  FileTextFilled,
  HomeOutlined,
  LogoutOutlined,
  SelectOutlined,
  SettingFilled,
  SignatureFilled,
} from "@ant-design/icons";
import Logo from "../../../assets/icons/logo.svg";
import { useNavigate } from "react-router-dom";

const LayoutHeader = () => {
  const navigate = useNavigate();
  const { handleMenuChange, findSelectedMenu } = useDashboardLayout();

  const items: MenuItem[] = [
    getItem({
      key: "/",
      label: "Dashboard",
      icon: <HomeOutlined />,
      onTitleClick: () => navigate("/"),
    }),
    getItem({
      key: "jobs",
      label: "Jobs",
      icon: <SignatureFilled />,
      onTitleClick: () => navigate("/jobs"),
    }),

    getItem({
      key: "reports",
      label: "Reports",
      icon: <BarChartOutlined />,
      onTitleClick: () => navigate("/reports"),
    }),
    getItem({
      key: "setting",
      label: "Setting",
      icon: <SettingFilled />,
      children: [
        getItem({
          key: "reference",
          label: "References",
          icon: <SelectOutlined />,
          onTitleClick: () => navigate("/reference"),
        }),
        getItem({
          key: "forms",
          label: "Forms",
          icon: <FileTextFilled />,
          onTitleClick: () => navigate("/forms"),
        }),

        getItem({
          key: "Floor-plans",
          label: "Floor Plans",
          icon: <SelectOutlined />,
          onTitleClick: () => navigate("/floor-plan"),
        }),
        getItem({
          key: "Logout",
          label: "Logout",
          icon: <LogoutOutlined />,
          onTitleClick: () => navigate("/reports"),
        }),
      ],
    }),
  ];

  return (
    <Header className="layout-header">
      <Row>
        <Col sm={6} xs={0}>
          <Image
            preview={false}
            src={Logo}
            width={90}
            style={{ marginTop: 6 }}
            draggable={false}
          />
        </Col>
        <Col sm={18} xs={24} className="nav-header">
          <div>
            <Menu
              onSelect={handleMenuChange}
              defaultSelectedKeys={findSelectedMenu()}
              mode="horizontal"
              items={items}
            />
          </div>
        </Col>
      </Row>
    </Header>
  );
};

export default LayoutHeader;
