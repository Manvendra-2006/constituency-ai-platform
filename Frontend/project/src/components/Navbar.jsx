import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', gap: '16px', flexWrap: 'wrap' }}>
      <div>
        <h1 style={{ margin: 0, color: '#0f172a', fontSize: '28px' }}>Welcome, {user?.name || 'User'}</h1>
        <p style={{ margin: '6px 0 0', color: '#64748b' }}>Track your complaints in one place.</p>
      </div>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={() => navigate('/add-complaint')}
          style={{
            border: 'none',
            background: '#2563eb',
            color: '#ffffff',
            padding: '10px 16px',
            borderRadius: '999px',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          New Complaint
        </button>
        <button
          type="button"
          onClick={logout}
          style={{
            border: '1px solid #cbd5e1',
            background: '#ffffff',
            color: '#334155',
            padding: '10px 16px',
            borderRadius: '999px',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
