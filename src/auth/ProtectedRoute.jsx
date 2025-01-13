/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Navigate } from 'react-router';

export default function ProtectedRoute({ children }) {
  const isAuth = useSelector((state) => state.isAuthenticated);
  console.log(isAuth);
  

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}
