import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import { Suspense } from "react";
import LayoutLoader from "../../theme/layout-loader";

const AuthLayout = () => {
  return (
    <Layout className="auth-layout">
      <div className="banner">
        <span>
          <h1 className="banner-text">Survey System</h1>
        </span>
      </div>
      <div className="outlet-cont">
        <Suspense fallback={<LayoutLoader type="auth" />}>
          <Outlet />
        </Suspense>
      </div>
    </Layout>
  );
};

export default AuthLayout;
