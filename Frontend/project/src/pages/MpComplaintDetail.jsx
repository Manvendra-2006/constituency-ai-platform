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

  return (
    <div className="detail-page">
      <div className="dashboard-inner">
       <Navbar
title={t("mpDashboard")}
subtitle={t("mpSubtitle")}
          actions={
            <button type="button" className="btn btn-outline" onClick={() => navigate('/mp')}>
            <ArrowLeft size={16} />
{t("backToDashboard")}
            </button>
          }
        />

        {error && <ErrorMessage message={error} />}

        {loading ? (
       <Loading label={t("loadingComplaint")} />
        ) : complaint ? (
          <div className="detail-card-grid">
            <div className="detail-card">
              <div className="navbar-brand" style={{ marginBottom: 16 }}>
                <div className="navbar-logo" style={{ background: 'linear-gradient(135deg, #0f766e, #14b8a6)' }}>
                  <UserRound size={18} />
                </div>
                <div>
                {t("citizenDetails")}
                {t("citizenDetailsDesc")}
                </div>
              </div>
              <div className="detail-list">
                <div className="detail-item">
                  <strong>{t("name")}</strong>
                  <span>{complaint.userId?.name || 'Not available'}</span>
                </div>
                <div className="detail-item">
                  <strong>{t("village")}</strong>
                  <span>{complaint.userId?.village || complaint.village || 'Not available'}</span>
                </div>
                <div className="detail-item">
                  <strong>{t("district")}</strong>
                  <span>{complaint.userId?.district || t("notAvailable")}</span>
                </div>
                <div className="detail-item">
                  <strong>{t("complaintId")}</strong>
                  <span>{complaint._id}</span>
                </div>
              </div>
            </div>

            <div className="detail-card">
              <div className="navbar-brand" style={{ marginBottom: 16 }}>
                <div className="navbar-logo" style={{ background: 'linear-gradient(135deg, #2563eb, #60a5fa)' }}>
                  <FileText size={18} />
                </div>
                <div>
                {t("originalComplaint")}
                {t("originalComplaintDesc")}
                </div>
              </div>
              <p style={{ color: '#334155', lineHeight: 1.7 }}>{complaint.originalComplaint}</p>
            </div>

            <div className="detail-card">
              <div className="navbar-brand" style={{ marginBottom: 16 }}>
                <div className="navbar-logo" style={{ background: 'linear-gradient(135deg, #7c3aed, #a78bfa)' }}>
                  <Sparkles size={18} />
                </div>
                <div>
                {t("aiAnalysis")}
                {t("aiAnalysisDesc")}
                </div>
              </div>
              <div className="detail-list">
                <div className="detail-item">
                  <strong>{t("category")}</strong>
                  <span>{complaint.aiResponse?.category || 'Not available'}</span>
                </div>
                <div className="detail-item">
                  <strong>{t("subcategory")}</strong>
                  <span>{complaint.aiResponse?.subcategory || 'Not available'}</span>
                </div>
                <div className="detail-item">
                  <strong>{t("summary")}</strong>
                  <span>{complaint.aiResponse?.summary || 'Not available'}</span>
                </div>
                <div className="detail-item">
                  <strong>{t("urgency")}</strong>
                  <span>{complaint.aiResponse?.urgency || 'Not available'}</span>
                </div>
                <div className="detail-item">
                  <strong>{t("confidence")}</strong>
                  <span>{complaint.aiResponse?.confidence ?? 'Not available'}</span>
                </div>
                <div className="detail-item">
                  <strong>{t("status")}</strong>
                  <StatusBadge status={complaint.complaintStatus || complaint.status} />
                </div>
              </div>
            </div>

            <div className="detail-card">
              <div className="navbar-brand" style={{ marginBottom: 16 }}>
                <div className="navbar-logo" style={{ background: 'linear-gradient(135deg, #dc2626, #f87171)' }}>
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <h3>{t("updateComplaintStatus")}</h3>
                  <p>{t("updateComplaintStatusDesc")}.</p>
                </div>
              </div>
              <div className="detail-form">
                <select value={status} onChange={(event) => setStatus(event.target.value)}>
                  <option value="new">{t("new")}</option>
                  <option value="in-progress">{t("inProgress")}</option>
                  <option value="resolved">{t("resolved")}</option>
                  <option value="rejected">{t("rejected")}</option>
                </select>
                <button type="button" className="btn btn-primary" onClick={handleStatusUpdate} disabled={saving}>
                 {saving ? t("updating") : t("updateStatus")}
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {toast ? (
        <div className="toast-stack">
          <div className="toast">{toast}</div>
        </div>
      ) : null}
    </div>
  );
};

export default MpComplaintDetail;
