import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import { useTranslation } from "react-i18next";

const Navbar = ({
  title = "Dashboard",
  subtitle = "Track complaints in one place.",
  actions = null,
}) => {
  const { user, logout } = useAuth();
  const { t, i18n } = useTranslation();
title = t("dashboard"),
subtitle = t("trackComplaints")
  const navigate = useNavigate();
  const location = useLocation();

  const isMpView = location.pathname.startsWith("/mp");

  return (
    <header className="navbar-shell">
      <div className="navbar-brand">
        <div className="navbar-logo">
          {title === "MP Dashboard" ? "MP" : "G"}
        </div>

        <div>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
      </div>

      <div className="navbar-actions">
        {isMpView ? (
          <div className="navbar-nav-pills">
            <button
              type="button"
              className={`nav-pill ${
                location.pathname === "/mp" ? "active" : ""
              }`}
              onClick={() => navigate("/mp")}
            >
            {t("dashboard")}
            </button>

            <button
              type="button"
              className={`nav-pill ${
                location.pathname === "/mp/insights" ? "active" : ""
              }`}
              onClick={() => navigate("/mp/insights")}
            >
{t("aiInsights")}
            </button>
          </div>
        ) : null}

        {actions}

        {/* Language Dropdown */}
        <select
          value={i18n.language}
          onChange={(e) => i18n.changeLanguage(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: "10px",
            border: "1px solid #d1d5db",
            background: "#fff",
            cursor: "pointer",
            fontWeight: 500,
            fontSize: "14px",
          }}
        >
          <option value="en">🇺🇸 English</option>
          <option value="hi">🇮🇳 हिन्दी</option>
        </select>

        <div className="navbar-user-pill">
          <span>{user?.name || t("user")}</span>
        </div>

        <button
          type="button"
          className="btn btn-outline"
          onClick={logout}
        >
         {t("logout")}
        </button>
      </div>
    </header>
  );
};

export default Navbar;