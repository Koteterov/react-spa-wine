import { Navigate, Outlet } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../contexts/userContext";
import * as userService from "../../services/userService";

const RouteGuard = ({ children }) => {
  const { user } = useContext(UserContext);
  const [isAuthenticated, setIsAuthenticated] = useState(user);

  useEffect(() => {
    userService.getProfile().then((profile) => {
      setIsAuthenticated(profile);
    });
  }, []);

  if (isAuthenticated.message) {
    return <Navigate to="/user/login" replace />;
  }

  return children ? children : <Outlet />;
};

export default RouteGuard;
