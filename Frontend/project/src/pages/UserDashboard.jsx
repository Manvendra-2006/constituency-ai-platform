import useAuth from '../hooks/useAuth.js';
import { useTranslation } from "react-i18next";
const UserDashboard = () => {
  const { i18n } = useTranslation();
  const { user, logout } = useAuth();

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>User Dashboard</h1>
        <button type="button" onClick={logout} className="logout-button">
          Logout
        </button>
        <select
  value={i18n.language}
  onChange={(e) => i18n.changeLanguage(e.target.value)}
  style={{
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    cursor: "pointer",
    fontSize: "14px",
  }}
>
  <option value="en">🇺🇸 English</option>
  <option value="hi">🇮🇳 हिन्दी</option>
</select>
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
