import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ComplaintTable from '../components/ComplaintTable.jsx';
import Navbar from '../components/Navbar.jsx';
import SummaryCards from '../components/SummaryCards.jsx';
import apiClient from '../api/axios.js';
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadComplaints = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await apiClient.get('/user/complaint/mycomplaints');
      setComplaints(response.data?.complaints || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        t("unableToLoadComplaints")
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComplaints();
  }, []);

  const total = complaints.length;
  const getAiStatus = (item) => item?.aistatus ?? item?.aiStatus ?? item?.status ?? 'pending';
  const analyzed = complaints.filter((item) => getAiStatus(item) === 'analyzed').length;
  const pending = complaints.filter((item) => getAiStatus(item) === 'pending').length;

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
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <div className="w-11 h-11 rounded-full border-2 border-[#FFD34D] flex items-center justify-center text-xs font-bold shrink-0">
            GoI
          </div>
          <div>
            <p className="text-[10px] tracking-widest uppercase text-[#FFD34D]">
              CivicPulse · Citizen Portal
            </p>
            <h1 className="text-lg sm:text-xl font-bold leading-tight">
              {t("yourComplaints") || "Dashboard"}
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">

        <Navbar />

        {error && (
          <div className="mb-4 text-sm text-[#8B1E23] border border-[#8B1E23]/40 bg-[#8B1E23]/5 px-4 py-3">
            {error}
          </div>
        )}

        <SummaryCards total={total} analyzed={analyzed} pending={pending} />

        <div className="border border-[#0B3D62]/30 bg-white mt-6">
          <div className="bg-[#0B3D62]/5 border-b border-[#0B3D62]/30 px-6 py-4 flex items-center justify-between flex-wrap gap-3">
            <h2 className="text-lg font-bold text-[#0B3D62] uppercase tracking-wide">
              {t("yourComplaints")}
            </h2>
            <button
              type="button"
              onClick={() => navigate('/add-complaint')}
              className="text-xs font-semibold uppercase tracking-wide px-4 py-2 border border-[#0B3D62] text-[#0B3D62] hover:bg-[#0B3D62] hover:text-white transition-colors"
            >
              + {t("newComplaint")}
            </button>
          </div>

          <div className="px-6 py-6">
            {loading ? (
              <div className="flex justify-center py-10">
                <div className="w-9 h-9 border-4 border-[#0B3D62]/20 border-t-[#0B3D62] rounded-full animate-spin" />
              </div>
            ) : (
              <ComplaintTable complaints={complaints} compact />
            )}
          </div>
        </div>

        <p className="text-center text-[10px] text-[#5A5A5A] mt-6">
          This is a system-generated portal. For official use only.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;