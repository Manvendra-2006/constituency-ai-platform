import useAuth from '../hooks/useAuth.js';
import { useTranslation } from "react-i18next";

const UserDashboard = () => {
  const { i18n } = useTranslation();
  const { user, logout } = useAuth();

  const details = [
    ["Email", user?.email],
    ["Village", user?.village],
    ["District", user?.district],
    ["State", user?.state],
  ];

  return (
    <div className="min-h-screen bg-[#F3F1EA] text-[#1A1A1A] font-serif">

      {/* Tricolor strip */}
      <div className="h-1.5 w-full flex">
        <div className="flex-1 bg-[#FF9933]" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[#138808]" />
      </div>

      {/* Official header */}
      <header className="bg-[#0B3D62] text-white border-b-4 border-[#8B1E23]">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-full border-2 border-[#FFD34D] flex items-center justify-center text-xs font-bold shrink-0">
              GoI
            </div>
            <div>
              <p className="text-[10px] tracking-widest uppercase text-[#FFD34D]">
                CivicPulse · Citizen Portal
              </p>
              <h1 className="text-lg sm:text-xl font-bold leading-tight">
                User Dashboard
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={i18n.language}
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              className="text-sm px-3 py-1.5 border border-white/40 bg-[#0B3D62] text-white rounded-none cursor-pointer focus:outline-none focus:border-[#FFD34D]"
            >
              <option value="en" className="text-black">🇺🇸 English</option>
              <option value="hi" className="text-black">🇮🇳 हिन्दी</option>
            </select>

            <button
              type="button"
              onClick={logout}
              className="text-sm font-semibold uppercase tracking-wide px-4 py-1.5 border border-[#FFD34D] text-[#FFD34D] hover:bg-[#FFD34D] hover:text-[#0B3D62] transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* Profile record card */}
        <div className="border border-[#0B3D62]/30 bg-white">
          <div className="bg-[#0B3D62]/5 border-b border-[#0B3D62]/30 px-5 py-3">
            <h2 className="text-xl font-bold text-[#0B3D62] uppercase tracking-wide">
              Welcome, {user?.name || 'User'}
            </h2>
            <p className="text-xs text-[#5A5A5A]">Citizen Profile Record</p>
          </div>

          <table className="w-full text-sm">
            <tbody>
              {details.map(([label, value], idx) => (
                <tr
                  key={label}
                  className={idx % 2 === 0 ? "bg-white" : "bg-[#0B3D62]/[0.03]"}
                >
                  <td className="px-5 py-2.5 border-t border-[#0B3D62]/10 text-[#3A3A3A] w-1/3">
                    {label}
                  </td>
                  <td className="px-5 py-2.5 border-t border-[#0B3D62]/10 font-semibold text-[#0B3D62]">
                    {value || 'Not available'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-center text-[10px] text-[#5A5A5A] mt-8">
          This is a system-generated record. For official use only.
        </p>
      </div>
    </div>
  );
};

export default UserDashboard;