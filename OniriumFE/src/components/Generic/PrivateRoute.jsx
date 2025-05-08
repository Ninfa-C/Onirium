import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const { profile, isLoadingProfile } = useSelector((state) => state.user);

  if (isLoadingProfile) return null;

  return profile ? children : <Navigate to="/Account/Login" />;
};

export default PrivateRoute;