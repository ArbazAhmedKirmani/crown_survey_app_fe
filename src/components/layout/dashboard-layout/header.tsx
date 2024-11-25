import { Header } from "antd/es/layout/layout";
import "./style.scss";
import { Col, Image, Menu, Row } from "antd";
import useDashboardLayout from "./useDashboardLayout";
import { getItem, MenuItem } from "../../../utils/helper/general.helper";
import {
  BarChartOutlined,
  FileTextFilled,
  HomeOutlined,
  SelectOutlined,
  SettingFilled,
  SignatureFilled,
} from "@ant-design/icons";
import Logo from "../../../assets/icons/logo.svg";

const LayoutHeader = () => {
  const { handleMenuChange, findSelectedMenu } = useDashboardLayout();

  const items: MenuItem[] = [
    getItem("Dashboard", "/", <HomeOutlined />),
    getItem("Jobs", "/jobs", <SignatureFilled />),

    getItem("Reports", "/reports", <BarChartOutlined />),
    getItem("Settings", "", <SettingFilled />, [
      getItem("References", "/reference", <SelectOutlined />),
      getItem("Forms", "/forms", <FileTextFilled />),
      getItem("Floor Plans", "/floor-plans", <SelectOutlined />),
    ]),
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
