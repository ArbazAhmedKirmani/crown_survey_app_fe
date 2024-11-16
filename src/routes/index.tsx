import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy, PropsWithChildren, Suspense } from "react";

/** Layout */
import DashboardLayout from "../components/layout/dashboard-layout";
import AuthLayout from "../components/layout/auth-layout";
import { APP_CONSTANTS } from "../utils/constants/app.constant";
// import FloorPlan from "../components/screen/jobs/floor-plan";

/** Screens */
const FloorPlan = lazy(() => import("../components/screen/jobs/floor-plan"));
const FormsScreen = lazy(() => import("../screens/Forms"));
const Forms = lazy(() => import("../components/screen/forms"));
const NewForm = lazy(() => import("../components/screen/forms/new-form"));
const TemplateScreen = lazy(() => import("../screens/template"));
const Template = lazy(() => import("../components/screen/templates"));
const SignupScreen = lazy(() => import("../screens/authentication/signup"));
const DashboardScreen = lazy(() => import("../screens/dashboard"));

const Jobs = lazy(() => import("../components/screen/jobs"));
const JobsScreen = lazy(() => import("../screens/jobs"));
const NewJobScreen = lazy(() => import("../screens/jobs/new-job"));
const LoginScreen = lazy(() => import("../screens/authentication/login"));
const Error404 = lazy(() => import("../screens/Errors/error-404"));

const ProtectedRoutes = ({ children }: PropsWithChildren) => {
  if (localStorage.getItem(APP_CONSTANTS.AUTH.AUTH_TOKEN)) {
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
      { path: "floor-plans", element: <FloorPlan /> },
      {
        path: "jobs",
        element: <JobsScreen />,
        children: [
          { index: true, element: <Jobs /> },
          { path: "new", element: <NewJobScreen /> },
          { path: ":id", element: <NewJobScreen /> },
        ],
      },
      {
        path: "forms",
        element: <FormsScreen />,
        children: [
          { index: true, element: <Forms /> },
          { path: "new", element: <NewForm /> },
          { path: ":id", element: <NewForm /> },
        ],
      },
      {
        path: "templates",
        element: <TemplateScreen />,
        children: [
          { index: true, element: <Template /> },
          { path: "new", element: <NewJobScreen /> },
          { path: ":id", element: <NewJobScreen /> },
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
