import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

export default function ProtectedRoute() {
  const { isConnected } = useContext(AuthContext);
  const location = useLocation();

  if (!isConnected) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  
  return <Outlet />; 
}
