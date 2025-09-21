import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";


/**
 * ProtectedRoute
 *
 * A wrapper component to secure routes that require authentication.
 *
 * Why `authContextReady`?
 * -----------------------
 * When the app reloads, the AuthContext may still be performing its
 * initial token refresh (e.g., checking the refresh cookie to get a
 * new access token). During that short time window, `isConnected` will
 * still be `false`, even though the user *is* authenticated.
 *
 * Without `authContextReady`, ProtectedRoute would prematurely redirect
 * to `/login` before the refresh has completed, causing a "flash logout"
 * effect. The `authContextReady` flag ensures that we only make routing
 * decisions once the AuthContext has finished initializing.
 *
 * Behavior:
 * - While `authContextReady === false`: do nothing (can show a spinner if desired).
 * - Once ready:
 *   - If `isConnected === false`: redirect to `/login`.
 *   - If `isConnected === true`: render the protected child route(s).
 *
 * Usage:
 * Place <ProtectedRoute /> as a parent route in React Router to protect nested routes.
 */
export default function ProtectedRoute() {
  const { authContextReady, isConnected } = useContext(AuthContext);
  const location = useLocation(); // Current location, used for redirection after login

  // If the user is not authenticated, redirect them to /login
  // Passes the current location in state so the user can be redirected back after login
  if (authContextReady && !isConnected) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  
  // If authenticated, allow access to the protected child route
  return <Outlet />; 
}
