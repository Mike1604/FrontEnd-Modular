import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router";
import { useEffect } from "react";
import { logout } from "../store/authReducer";

export default function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const { isAuthenticated, token, expiration, isLoading } = useSelector((state) => state.auth);

  const checkTokenExpiration = () => {
    if (token && expiration) {
      const currentTime = Date.now();
      console.log(expiration-currentTime);
      
      return expiration > currentTime;
    }
    return false;
  };

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !checkTokenExpiration())) {
      dispatch(logout());
    }
  }, [isAuthenticated, isLoading, token, expiration, dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}
