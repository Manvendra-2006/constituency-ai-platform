import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import { useTranslation } from "react-i18next";

const EmblemBadge = ({ label }) => (
  <div className="relative w-11 h-11 rounded-full bg-[#0A2E48] border border-[#FFD34D]/60 flex items-center justify-center shrink-0">
    <svg viewBox="0 0 40 40" className="absolute inset-0 w-full h-full opacity-40">
      {Array.from({ length: 12 }).map((_, i) => (
        <line
          key={i}
          x1="20" y1="20"
          x2={20 + 16 * Math.cos((i * Math.PI) / 6)}
          y2={20 + 16 * Math.sin((i * Math.PI) / 6)}
          stroke="#FFD34D"
          strokeWidth="0.6"
        />
      ))}
    </svg>
    <span className="relative text-[11px] font-bold text-[#FFD34D] tracking-tight">
      {label}
    </span>
  </div>
);

const Navbar = ({ title, subtitle, actions = null }) => {
  const { user, logout } = useAuth();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const isMpView = location.pathname.startsWith("/mp");
  const displayTitle = title ?? t("dashboard");
  const displaySubtitle = subtitle ?? t("trackComplaints");

  const initials = (user?.name || "U")
    .trim()
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const navItems = isMpView
    ? [
        { path: "/mp", label: t("dashboard") },
        { path: "/mp/insights", label: t("aiInsights") },
      ]
    : [];

  return (
    <header className="bg-gradient-to-b from-[#0B3D62] to-[#0A2E48] text-white font-serif shadow-[0_1px_0_0_rgba(255,211,77,0.25)]">

      {/* Tricolor hairline */}
      <div className="h-[3px] w-full flex">
        <div className="flex-1 bg-[#FF9933]" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[#138808]" />
      </div>

      {/* Top row: branding + title */}
      <div className="max-w-6xl mx-auto px-5 py-3.5 flex items-center gap-3.5">
        <EmblemBadge label={isMpView ? "MP" : "GoI"} />
        <div className="min-w-0">
          <p className="text-[10px] tracking-[0.15em] uppercase text-[#FFD34D]/90 font-sans font-semibold">
            CivicLoop · {isMpView ? "Representative Portal" : "Citizen Portal"}
          </p>
          <h1 className="text-lg sm:text-xl font-bold leading-tight truncate">{displayTitle}</h1>
          <p className="text-xs text-slate-300/90 mt-0.5 font-sans">{displaySubtitle}</p>
        </div>
      </div>

      {/* Bottom row: nav + controls */}
      <div className="border-t border-white/10 bg-black/10">
        <div className="max-w-6xl mx-auto px-5 flex items-center justify-between flex-wrap gap-3">

          {isMpView ? (
            <nav className="flex items-center gap-1 font-sans">
              {navItems.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <button
                    key={item.path}
                    type="button"
                    onClick={() => navigate(item.path)}
                    className={`relative text-xs font-semibold uppercase tracking-wide px-3.5 py-3 transition-colors ${
                      active ? "text-[#FFD34D]" : "text-slate-300 hover:text-white"
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute left-3.5 right-3.5 bottom-0 h-[2px] rounded-full transition-opacity ${
                        active ? "bg-[#FFD34D] opacity-100" : "opacity-0"
                      }`}
                    />
                  </button>
                );
              })}
            </nav>
          ) : (
            <div className="py-2.5">{actions}</div>
          )}

          <div className="flex items-center gap-2 py-2.5 flex-wrap font-sans">

            {isMpView && actions}

            <select
              value={i18n.language}
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              className="text-xs px-2.5 py-1.5 bg-white/5 border border-white/15 text-slate-100 cursor-pointer focus:outline-none focus:border-[#FFD34D]/60 rounded-md"
            >
              <option value="en" className="text-black">EN</option>
              <option value="hi" className="text-black">हिं</option>
            </select>

            <div className="w-px h-5 bg-white/15" />

            <button
              type="button"
              onClick={() => navigate(isMpView ? "/mp/profile" : "/profile")}
              className="flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-full hover:bg-white/10 transition-colors"
            >
              <span className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FFD34D] to-[#E8A93A] text-[#0B3D62] text-[11px] font-bold flex items-center justify-center shrink-0">
                {initials}
              </span>
              <span className="text-xs font-medium text-slate-100 max-w-[100px] truncate">
                {user?.name || t("user")}
              </span>
            </button>

            <button
              type="button"
              onClick={logout}
              className="text-xs font-semibold uppercase tracking-wide px-3.5 py-1.5 rounded-md border border-[#8B1E23]/60 text-[#F4A5A9] hover:bg-[#8B1E23] hover:text-white hover:border-[#8B1E23] transition-colors"
            >
              {t("logout")}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;