import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import { Suspense } from "react";
import CSLayoutLoader from "../../theme/molecules/cs-layout-loader";

const AuthLayout = () => {
  return (
    <Layout className="auth-layout">
      <div className="banner">
        <span>
          <h1 className="banner-text">Survey System</h1>
        </span>
      </div>
      <div className="outlet-cont">
        <Suspense fallback={<CSLayoutLoader type="auth" />}>
          <Outlet />
        </Suspense>
      </div>
    </Layout>
  );
};

export default AuthLayout;
