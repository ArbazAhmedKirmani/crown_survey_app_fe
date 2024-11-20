import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import CSLayoutLoader from "../../theme/molecules/cs-layout-loader";
import CSAppBreadcrumb from "../../theme/organisms/cs-app-breadcrumb";
import CSBackNavigator from "../../theme/atoms/cs-back-navigator";
import { Col, Row } from "antd";

const Content = () => {
  return (
    <div className="outlet-cont">
      <Suspense fallback={<CSLayoutLoader type="dashboard" />}>
        <Row>
          <Col span={24}>
            <div className="content-header">
              <CSBackNavigator />
              <CSAppBreadcrumb />
            </div>
          </Col>
          <Col span={24} className="content-col">
            <Outlet />
          </Col>
        </Row>
      </Suspense>
    </div>
  );
};

export default Content;
