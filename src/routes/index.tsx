import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy, PropsWithChildren, Suspense } from "react";

/** Layout */
import DashboardLayout from "../components/layout/dashboard-layout";
import AuthLayout from "../components/layout/auth-layout";
import { CONSTANTS } from "../utils/constants";

/** Screens */
const SignupScreen = lazy(() => import("../screens/authentication/signup"));
const DashboardScreen = lazy(() => import("../screens/dashboard"));
const ShippingScreen = lazy(() => import("../screens/shipping"));
const NewShipment = lazy(
  () => import("../components/screen/shipping/new-shipment")
);
const Jobs = lazy(() => import("../components/screen/jobs"));
const JobsScreen = lazy(() => import("../screens/jobs"));
const NewJobScreen = lazy(() => import("../screens/jobs/new-job"));
const LoginScreen = lazy(() => import("../screens/authentication/login"));
const Error404 = lazy(() => import("../screens/Errors/error-404"));

const ProtectedRoutes = ({ children }: PropsWithChildren) => {
  if (localStorage.getItem(CONSTANTS.LOCAL_STORAGE.IS_AUTHENTICATED)) {
    return children;
  } else return <Navigate to={"/auth"} replace={true} />;
};

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <DashboardLayout />
      </ProtectedRoutes>
    ),
    children: [
      { index: true, element: <DashboardScreen /> },
      {
        path: "shipping",
        element: <ShippingScreen />,
        children: [{ path: "new-shipment", element: <NewShipment /> }],
      },
      {
        path: "jobs",
        element: <JobsScreen />,
        children: [
          { index: true, element: <Jobs /> },
          { path: "new-job", element: <NewJobScreen /> },
        ],
      },
      {
        path: "*",
        element: <Error404 />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <LoginScreen />,
      },
      {
        path: "request-credentials",
        element: <SignupScreen />,
      },
      {
        path: "*",
        element: <Error404 />,
      },
    ],
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<h1>Loading...</h1>}>
        <Error404 />
      </Suspense>
    ),
  },
]);

export default AppRouter;
