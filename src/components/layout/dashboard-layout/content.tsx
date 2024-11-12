import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import CSLayoutLoader from "../../theme/molecules/cs-layout-loader";
import CSAppBreadcrumb from "../../theme/organisms/cs-app-breadcrumb";
import CSContainer from "../../theme/atoms/cs-container";

const Content = () => {
  return (
    <div className="outlet-cont">
      <Suspense fallback={<CSLayoutLoader type="dashboard" />}>
        <CSContainer>
          <CSAppBreadcrumb />
          <Outlet />
        </CSContainer>
      </Suspense>
    </div>
  );
};

export default Content;
