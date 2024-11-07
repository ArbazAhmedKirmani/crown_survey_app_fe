import { Route } from "react-router-dom";
import LoginScreen from "../screens/authentication/login";
import React from "react";

const UnauthenticatedRoutes = () => {
  return (
    <React.Fragment>
      <Route path="/login" element={<LoginScreen />} />
    </React.Fragment>
  );
};

export default UnauthenticatedRoutes;
