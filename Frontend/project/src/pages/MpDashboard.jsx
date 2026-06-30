import useAuth from '../hooks/useAuth.js';

const MpDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>MP Dashboard</h1>
        <button type="button" onClick={logout} className="logout-button">
          Logout
        </button>
      </header>

      <section className="profile-card">
        <h2>Welcome, {user?.name || 'MP'}</h2>
        <p>Email: {user?.email || 'Not available'}</p>
        <p>Government ID: {user?.governmentId || 'Not available'}</p>
        <p>Constituency Number: {user?.constituencyNumber ?? 'Not available'}</p>
        <p>Constituency Name: {user?.constituencyName || 'Not available'}</p>
        <p>State: {user?.state || 'Not available'}</p>
      </section>
    </div>
  );
};

export default MpDashboard;
