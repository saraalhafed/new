import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getStorageItem } from "../utils/storage";
const PrivateRoute = () => {
  const firebaseToken =getStorageItem("firebaseToken")
  const { userInfo } = useAuth();
  const location = useLocation();

  return (userInfo || firebaseToken) ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} replace state={{ redirectTo: location }} />
  );
};

export default PrivateRoute;
