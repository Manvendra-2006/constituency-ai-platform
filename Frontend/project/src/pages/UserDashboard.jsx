import useAuth from '../hooks/useAuth.js';

const UserDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>User Dashboard</h1>
        <button type="button" onClick={logout} className="logout-button">
          Logout
        </button>
      </header>

      <section className="profile-card">
        <h2>Welcome, {user?.name || 'User'}</h2>
        <p>Email: {user?.email || 'Not available'}</p>
        <p>Village: {user?.village || 'Not available'}</p>
        <p>District: {user?.district || 'Not available'}</p>
        <p>State: {user?.state || 'Not available'}</p>
      </section>
    </div>
  );
};

export default UserDashboard;
