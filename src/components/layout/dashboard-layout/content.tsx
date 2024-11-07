import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import LayoutLoader from "../../theme/layout-loader";
import AppBreadcrumb from "./app-breadcrumb";

const Content = () => {
  return (
    <div className="outlet-cont">
      <Suspense fallback={<LayoutLoader type="dashboard" />}>
        <AppBreadcrumb />
        <Outlet />
      </Suspense>
    </div>
  );
};

export default Content;
