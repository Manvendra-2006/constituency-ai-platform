import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, UserRound, FileText, Sparkles, ShieldCheck } from 'lucide-react';
import apiClient from '../api/axios.js';
import Navbar from '../components/Navbar.jsx';
import Loading from '../components/Loading.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import { useTranslation } from "react-i18next";

const MpComplaintDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('new');
  const [toast, setToast] = useState('');

  const loadComplaint = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await apiClient.get(`/mp/complaint/${id}`);
      const detail = response.data?.complaintDetail;
      setComplaint(detail);
      setStatus(detail?.complaintStatus || 'new');
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        t("unableToLoadComplaint")
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComplaint();
  }, [id]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(''), 2200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const handleStatusUpdate = async () => {
    try {
      setSaving(true);
      await apiClient.put(`/mp/complaint/${id}/status`, { complaintStatus: status });
      setToast(t("statusUpdated"));
      await loadComplaint();
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        t("unableToUpdateStatus")
      );
    } finally {
      setSaving(false);
    }
  };

  const SectionHeader = ({ icon: Icon, title, desc }) => (
    <div className="bg-[#0B3D62]/5 border-b border-[#0B3D62]/30 px-5 py-3 flex items-center gap-3">
      <div className="w-9 h-9 rounded-full border-2 border-[#0B3D62]/40 flex items-center justify-center shrink-0 text-[#0B3D62]">
        <Icon size={16} />
      </div>
      <div>
        <h3 className="text-sm font-bold text-[#0B3D62] uppercase tracking-wide">{title}</h3>
        {desc && <p className="text-xs text-[#5A5A5A]">{desc}</p>}
      </div>
    </div>
  );

  const DetailTable = ({ rows }) => (
    <table className="w-full text-sm table-fixed">
      <tbody>
        {rows.map(([label, value], idx) => (
          <tr key={label} className={idx % 2 === 0 ? "bg-white" : "bg-[#0B3D62]/[0.03]"}>
            <td className="px-5 py-2.5 border-t border-[#0B3D62]/10 text-[#3A3A3A] w-2/5 align-top">
              {label}
            </td>
            <td className="px-5 py-2.5 border-t border-[#0B3D62]/10 font-semibold text-[#0B3D62] w-3/5 align-top break-all">
              {value}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="min-h-screen bg-[#F3F1EA] text-[#1A1A1A] font-serif overflow-x-hidden">

      {/* Tricolor strip */}
      <div className="h-1.5 w-full flex">
        <div className="flex-1 bg-[#FF9933]" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[#138808]" />
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">

        <Navbar
          title={t("mpDashboard")}
          subtitle={t("mpSubtitle")}
          actions={
            <button
              type="button"
              onClick={() => navigate('/mp')}
              className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide px-3 py-1.5 border border-[#0B3D62] text-[#0B3D62] hover:bg-[#0B3D62] hover:text-white transition-colors"
            >
              <ArrowLeft size={14} />
              {t("backToDashboard")}
            </button>
          }
        />

        {error && (
          <div className="mt-4">
            <ErrorMessage message={error} />
          </div>
        )}

        {loading ? (
          <div className="mt-8">
            <Loading label={t("loadingComplaint")} />
          </div>
        ) : complaint ? (
          <div className="grid gap-6 mt-6">

            {/* Citizen details */}
            <div className="border border-[#0B3D62]/30 bg-white overflow-hidden">
              <SectionHeader icon={UserRound} title={t("citizenDetails")} desc={t("citizenDetailsDesc")} />
              <DetailTable
                rows={[
                  [t("name"), complaint.userId?.name || t("notAvailable")],
                  [t("village"), complaint.userId?.village || complaint.village || t("notAvailable")],
                  [t("district"), complaint.userId?.district || t("notAvailable")],
                  [t("complaintId"), complaint._id],
                ]}
              />
            </div>

            {/* Original complaint */}
            <div className="border border-[#0B3D62]/30 bg-white overflow-hidden">
              <SectionHeader icon={FileText} title={t("originalComplaint")} desc={t("originalComplaintDesc")} />
              <p className="px-5 py-4 text-sm text-[#3A3A3A] leading-relaxed break-words">
                {complaint.originalComplaint}
              </p>
            </div>

            {/* AI Analysis */}
            <div className="border border-[#0B3D62]/30 bg-white overflow-hidden">
              <SectionHeader icon={Sparkles} title={t("aiAnalysis")} desc={t("aiAnalysisDesc")} />
              <table className="w-full text-sm table-fixed">
                <tbody>
                  {[
                    [t("category"), complaint.aiResponse?.category ?? t("notAvailable")],
                    [t("subcategory"), complaint.aiResponse?.subcategory ?? t("notAvailable")],
                    [t("summary"), complaint.aiResponse?.summary ?? t("notAvailable")],
                    [t("urgency"), complaint.aiResponse?.urgency ?? t("notAvailable")],
                    [t("confidence"), complaint.aiResponse?.confidence ?? t("notAvailable")],
                  ].map(([label, value], idx) => (
                    <tr key={label} className={idx % 2 === 0 ? "bg-white" : "bg-[#0B3D62]/[0.03]"}>
                      <td className="px-5 py-2.5 border-t border-[#0B3D62]/10 text-[#3A3A3A] w-2/5 align-top">{label}</td>
                      <td className="px-5 py-2.5 border-t border-[#0B3D62]/10 font-semibold text-[#0B3D62] w-3/5 align-top break-words">
                        {value}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-[#0B3D62]/[0.03]">
                    <td className="px-5 py-2.5 border-t border-[#0B3D62]/10 text-[#3A3A3A] w-2/5 align-top">{t("status")}</td>
                    <td className="px-5 py-2.5 border-t border-[#0B3D62]/10 w-3/5 align-top">
                      <StatusBadge status={complaint.complaintStatus || complaint.status} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Update status */}
            <div className="border border-[#0B3D62]/30 bg-white overflow-hidden">
              <SectionHeader icon={ShieldCheck} title={t("updateComplaintStatus")} desc={`${t("updateComplaintStatusDesc")}.`} />
              <div className="px-5 py-4 flex flex-wrap gap-3 items-center">
                <select
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                  className="text-sm px-3 py-2 border border-[#0B3D62]/30 bg-white focus:outline-none focus:border-[#0B3D62] rounded-none"
                >
                  <option value="new">{t("new")}</option>
                  <option value="in-progress">{t("inProgress")}</option>
                  <option value="resolved">{t("resolved")}</option>
                  <option value="rejected">{t("rejected")}</option>
                </select>
                <button
                  type="button"
                  onClick={handleStatusUpdate}
                  disabled={saving}
                  className="w-full sm:w-auto py-2 px-4 text-sm font-semibold uppercase tracking-wide bg-[#0B3D62] text-white hover:bg-[#0B3D62]/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                >
                  {saving ? t("updating") : t("updateStatus")}
                </button>
              </div>
            </div>
          </div>
        ) : null}

        <p className="text-center text-[10px] text-[#5A5A5A] mt-8">
          This is a system-generated record. For official use only.
        </p>
      </div>

      {toast ? (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-[#0B3D62] text-white text-sm font-semibold px-4 py-2.5 border-2 border-[#FFD34D] shadow-lg">
            {toast}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MpComplaintDetail;