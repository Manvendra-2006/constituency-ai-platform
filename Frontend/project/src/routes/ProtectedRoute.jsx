import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';
import Loading from '../components/Loading.jsx';

const ProtectedRoute = ({ children, role }) => {
  const { isAuthenticated, accessToken, user, isAuthReady } = useAuth();
  const loginPath = role === 'mp' ? '/mp/login' : '/login';

  console.log('[ProtectedRoute] checking access', {
    role,
    hasToken: Boolean(accessToken),
    isAuthenticated,
    isMp: user?.isMp,
    isAuthReady,
  });

  if (!isAuthReady) {
    return <Loading label="Restoring your session…" />;
  }

  if (!accessToken || !isAuthenticated) {
    console.log('[ProtectedRoute] redirecting to login because auth state is missing');
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
