import { useLayoutEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
import IndexRoutes from "./IndexRoutes";
import { Cookies } from "react-cookie";

const Routes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cookie = new Cookies();
  const [isAuthenticated] = useState(
    Boolean(cookie.get("auth") && cookie.get("auth") !== " undefined")
  );
  useLayoutEffect(() => {
    if (location.pathname === "/") {
      isAuthenticated ? navigate("/c") : navigate("/login");
    }
  }, [location.pathname, isAuthenticated, navigate]);

  return <>{isAuthenticated ? <IndexRoutes /> : <AuthRoutes />}</>;
};

export default Routes;
