import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, UserRound, FileText, Sparkles, ShieldCheck } from 'lucide-react';
import apiClient from '../api/axios.js';
import Navbar from '../components/Navbar.jsx';
import Loading from '../components/Loading.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import StatusBadge from '../components/StatusBadge.jsx';

const MpComplaintDetail = () => {
  const { id } = useParams();
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
      setError(err.response?.data?.message || err.message || 'Unable to load complaint details.');
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
      setToast('Complaint status updated successfully.');
      await loadComplaint();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Unable to update complaint status.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="detail-page">
      <div className="dashboard-inner">
        <Navbar
          title="MP Dashboard"
          subtitle="Review and act on citizen grievances"
          actions={
            <button type="button" className="btn btn-outline" onClick={() => navigate('/mp')}>
              <ArrowLeft size={16} /> Back to dashboard
            </button>
          }
        />

        {error && <ErrorMessage message={error} />}

        {loading ? (
          <Loading label="Loading complaint details…" />
        ) : complaint ? (
          <div className="detail-card-grid">
            <div className="detail-card">
              <div className="navbar-brand" style={{ marginBottom: 16 }}>
                <div className="navbar-logo" style={{ background: 'linear-gradient(135deg, #0f766e, #14b8a6)' }}>
                  <UserRound size={18} />
                </div>
                <div>
                  <h3>Citizen details</h3>
                  <p>Profile information tied to this grievance.</p>
                </div>
              </div>
              <div className="detail-list">
                <div className="detail-item">
                  <strong>Name</strong>
                  <span>{complaint.userId?.name || 'Not available'}</span>
                </div>
                <div className="detail-item">
                  <strong>Village</strong>
                  <span>{complaint.userId?.village || complaint.village || 'Not available'}</span>
                </div>
                <div className="detail-item">
                  <strong>District</strong>
                  <span>{complaint.userId?.district || 'Not available'}</span>
                </div>
                <div className="detail-item">
                  <strong>Complaint ID</strong>
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
                  <h3>Original complaint</h3>
                  <p>Citizen’s submitted grievance text.</p>
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
                  <h3>AI analysis</h3>
                  <p>Structured insights generated for the complaint.</p>
                </div>
              </div>
              <div className="detail-list">
                <div className="detail-item">
                  <strong>Category</strong>
                  <span>{complaint.aiResponse?.category || 'Not available'}</span>
                </div>
                <div className="detail-item">
                  <strong>Subcategory</strong>
                  <span>{complaint.aiResponse?.subcategory || 'Not available'}</span>
                </div>
                <div className="detail-item">
                  <strong>Summary</strong>
                  <span>{complaint.aiResponse?.summary || 'Not available'}</span>
                </div>
                <div className="detail-item">
                  <strong>Urgency</strong>
                  <span>{complaint.aiResponse?.urgency || 'Not available'}</span>
                </div>
                <div className="detail-item">
                  <strong>Confidence</strong>
                  <span>{complaint.aiResponse?.confidence ?? 'Not available'}</span>
                </div>
                <div className="detail-item">
                  <strong>Status</strong>
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
                  <h3>Update complaint status</h3>
                  <p>Assign a new disposition for this grievance.</p>
                </div>
              </div>
              <div className="detail-form">
                <select value={status} onChange={(event) => setStatus(event.target.value)}>
                  <option value="new">New</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="rejected">Rejected</option>
                </select>
                <button type="button" className="btn btn-primary" onClick={handleStatusUpdate} disabled={saving}>
                  {saving ? 'Updating…' : 'Update Status'}
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
