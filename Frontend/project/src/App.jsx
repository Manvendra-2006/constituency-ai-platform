import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import useAuth from './hooks/useAuth.js';
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AddComplaint from './pages/AddComplaint.jsx';
import MpDashboard from './pages/MpDashboard.jsx';
import MpComplaintDetail from './pages/MpComplaintDetail.jsx';
import MpInsights from './pages/MpInsights.jsx';
import UserLogin from './pages/UserLogin.jsx';
import UserRegister from './pages/UserRegister.jsx';
import MpLogin from './pages/MpLogin.jsx';
import MpRegister from './pages/MpRegister.jsx';
import Loading from './components/Loading.jsx';
const HomeRedirect = () => {
  const { isAuthenticated, user, isAuthReady } = useAuth();

  if (!isAuthReady) {
    return <Loading label="Restoring your session…" />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return user?.isMp ? <Navigate to="/mp" replace /> : <Navigate to="/dashboard" replace />;
};

const App = () => (
  <AuthProvider>
    <Routes>
      <Route path="/" element={<HomeRedirect />} />
      <Route path="/login" element={<UserLogin />} />
      <Route path="/register" element={<UserRegister />} />
      <Route path="/mp/login" element={<MpLogin />} />
      <Route path="/mp/register" element={<MpRegister />} />
      <Route path="/user" element={<ProtectedRoute role="user"><Dashboard /></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute role="user"><Dashboard /></ProtectedRoute>} />
      <Route path="/add-complaint" element={<ProtectedRoute role="user"><AddComplaint /></ProtectedRoute>} />
      <Route path="/mp" element={<ProtectedRoute role="mp"><MpDashboard /></ProtectedRoute>} />
      <Route path="/mp/insights" element={<ProtectedRoute role="mp"><MpInsights /></ProtectedRoute>} />
      <Route path="/mp/complaint/:id" element={<ProtectedRoute role="mp"><MpComplaintDetail /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </AuthProvider>
);

export default App;