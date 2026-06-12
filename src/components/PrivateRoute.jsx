import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ publicPage = false }) => {
  const { user } = useSelector((state) => state.auth);

  if (publicPage) {
    return user?.id ? <Navigate to="/" replace /> : <Outlet />;
  }

  return user?.id ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
