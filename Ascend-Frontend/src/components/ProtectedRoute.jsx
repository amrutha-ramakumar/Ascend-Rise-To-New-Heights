import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContexts';

const ProtectedRoute = () => {
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={`/${userRole}/login`} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

