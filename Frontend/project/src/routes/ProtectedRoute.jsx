import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';

const ProtectedRoute = ({ children, role }) => {
  const { isAuthenticated, accessToken, user } = useAuth();
  const loginPath = role === 'mp' ? '/mp/login' : '/login';

  if (!accessToken || !isAuthenticated) {
    return <Navigate to={loginPath} replace />;
  }

  if (role === 'mp' && !user?.isMp) {
    return <Navigate to="/login" replace />;
  }

  if (role === 'user' && user?.isMp) {
    return <Navigate to="/mp/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
