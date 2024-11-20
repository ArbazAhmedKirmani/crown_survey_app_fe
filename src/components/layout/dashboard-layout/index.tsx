import { Layout } from "antd";
// import LayoutSidebar from "./sidebar-menu";
import LayoutHeader from "./header";
import "./style.scss";
import Content from "./content";

const DashboardLayout = () => {
  return (
    <Layout className="main-layout">
      <LayoutHeader />
      <Layout>
        {/* <LayoutSidebar /> */}
        <Content />
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
