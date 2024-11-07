import { Route } from "react-router-dom";
import DashboardScreen from "../screens/dashboard";
import React from "react";

const AuthenticatedRoutes = () => {
  return (
    <React.Fragment>
      <Route index element={<DashboardScreen />} />
    </React.Fragment>
  );
};

export default AuthenticatedRoutes;
