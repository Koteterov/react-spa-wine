import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";

const RouteGuard = ({ children }) => {
  const { notAuthenticated } = useContext(UserContext);

  if (notAuthenticated) {
    return <Navigate to="/user/login" replace />;
  }

  return children ? children : <Outlet />;
};

export default RouteGuard;
