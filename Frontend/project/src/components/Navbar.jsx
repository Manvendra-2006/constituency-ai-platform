import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import { useTranslation } from "react-i18next";
import MpProfileModal from "../pages/MpProfileModal.jsx";
const Navbar = ({
  title,
  subtitle,
  actions = null,
}) => {
  const { user, logout } = useAuth();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfile, setShowProfile] = useState(false);

  const isMpView = location.pathname.startsWith("/mp");

  const displayTitle = title ?? t("dashboard");
  const displaySubtitle = subtitle ?? t("trackComplaints");

  return (
    <header className="bg-[#0B3D62] text-white border-b-4 border-[#8B1E23] font-serif">

      {/* Top row: branding + title */}
      <div className="max-w-6xl mx-auto px-4 py-5 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full border-2 border-[#FFD34D] flex items-center justify-center text-sm font-bold shrink-0">
          {isMpView ? "MP" : "GoI"}
        </div>
        <div>
          <p className="text-xs tracking-widest uppercase text-[#FFD34D]">
            PeoplePulse · {isMpView ? "Representative Portal" : "Citizen Portal"}
          </p>
          <h1 className="text-xl sm:text-2xl font-bold leading-tight">{displayTitle}</h1>
          <p className="text-sm text-slate-300 mt-0.5">{displaySubtitle}</p>
        </div>
      </div>

      {/* Bottom row: nav + controls */}
      <div className="bg-black/15 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between flex-wrap gap-3">

          {isMpView ? (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => navigate("/mp")}
                className={`text-sm font-semibold uppercase tracking-wide px-5 py-2 border rounded-sm transition-colors ${
                  location.pathname === "/mp"
                    ? "bg-[#FFD34D] text-[#0B3D62] border-[#FFD34D]"
                    : "text-white border-white/40 hover:bg-white/10"
                }`}
              >
                {t("dashboard")}
              </button>

              <button
                type="button"
                onClick={() => navigate("/mp/insights")}
                className={`text-sm font-semibold uppercase tracking-wide px-5 py-2 border rounded-sm transition-colors ${
                  location.pathname === "/mp/insights"
                    ? "bg-[#FFD34D] text-[#0B3D62] border-[#FFD34D]"
                    : "text-white border-white/40 hover:bg-white/10"
                }`}
              >
                {t("aiInsights")}
              </button>
            </div>
          ) : (
            <div>{actions}</div>
          )}

          <div className="flex items-center gap-3 flex-wrap">

            {isMpView && actions}

            <select
              value={i18n.language}
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              className="text-sm px-3 py-2 border border-white/40 bg-[#0B3D62] text-white cursor-pointer focus:outline-none focus:border-[#FFD34D] rounded-sm"
            >
              <option value="en" className="text-black">🇺🇸 English</option>
              <option value="hi" className="text-black">🇮🇳 हिन्दी</option>
            </select>

            {isMpView ? (
              <button
                type="button"
                onClick={() => setShowProfile(true)}
                className="text-sm px-3 py-2 border border-white/30 text-slate-200 rounded-sm hover:bg-white/10 transition-colors"
              >
                {user?.name || t("user")}
              </button>
            ) : (
              <div className="text-sm px-3 py-2 border border-white/30 text-slate-200 rounded-sm">
                {user?.name || t("user")}
              </div>
            )}

            <button
              type="button"
              onClick={logout}
              className="text-sm font-semibold uppercase tracking-wide px-4 py-2 border border-[#FFD34D] text-[#FFD34D] hover:bg-[#FFD34D] hover:text-[#0B3D62] transition-colors rounded-sm"
            >
              {t("logout")}
            </button>
          </div>
        </div>
      </div>

      {showProfile && <MpProfileModal onClose={() => setShowProfile(false)} />}
    </header>
  );
};

export default Navbar;