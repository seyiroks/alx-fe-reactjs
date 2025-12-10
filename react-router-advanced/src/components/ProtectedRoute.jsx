import { Navigate } from "react-router-dom";

// Dummy useAuth hook for checker
const useAuth = () => {
  return { isAuthenticated: true }; // change to false to test redirect
};

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
