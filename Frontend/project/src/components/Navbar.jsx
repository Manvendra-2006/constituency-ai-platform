import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';

const Navbar = ({ title = 'Dashboard', subtitle = 'Track complaints in one place.', actions = null }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isMpView = location.pathname.startsWith('/mp');

  return (
    <header className="navbar-shell">
      <div className="navbar-brand">
        <div className="navbar-logo">{title === 'MP Dashboard' ? 'MP' : 'G'}</div>
        <div>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
      </div>

      <div className="navbar-actions">
        {isMpView ? (
          <div className="navbar-nav-pills">
            <button type="button" className={`nav-pill ${location.pathname === '/mp' ? 'active' : ''}`} onClick={() => navigate('/mp')}>
              Dashboard
            </button>
            <button type="button" className={`nav-pill ${location.pathname === '/mp/insights' ? 'active' : ''}`} onClick={() => navigate('/mp/insights')}>
              AI Insights
            </button>
          </div>
        ) : null}
        {actions}
        <div className="navbar-user-pill">
          <span>{user?.name || 'User'}</span>
        </div>
        <button type="button" className="btn btn-outline" onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
