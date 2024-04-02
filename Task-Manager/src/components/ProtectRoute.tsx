import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../pages/auth/AuthContext";
import Layout from "./Layout";

interface ProtectRouteProps {
  component: React.ComponentType<any>;
}

const ProtectRoute: React.FC<ProtectRouteProps> = ({
  component: Component,
}) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <Layout>
      <Component />
    </Layout>
  );
};
export default ProtectRoute;
