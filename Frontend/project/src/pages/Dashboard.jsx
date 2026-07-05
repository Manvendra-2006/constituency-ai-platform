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
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #eff6ff 0%, #f8fafc 100%)', padding: '24px' }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Navbar />

        {error && (
          <div style={{ marginBottom: '16px', padding: '12px 14px', borderRadius: '12px', background: '#fee2e2', color: '#b91c1c' }}>
            {error}
          </div>
        )}

        <SummaryCards total={total} analyzed={analyzed} pending={pending} />

        <div style={{ background: '#ffffff', borderRadius: '18px', padding: '20px', boxShadow: '0 12px 35px rgba(15, 23, 42, 0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <h2 style={{ margin: 0, color: '#0f172a' }}>
  {t("yourComplaints")}
</h2>
            <button
              type="button"
              onClick={() => navigate('/add-complaint')}
              style={{ border: 'none', background: '#0f766e', color: '#ffffff', padding: '10px 14px', borderRadius: '999px', cursor: 'pointer', fontWeight: 600 }}
            >
             + {t("newComplaint")}
            </button>
          </div>

          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 0' }}>
              <div style={{ width: '36px', height: '36px', border: '4px solid #cbd5e1', borderTopColor: '#2563eb', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            </div>
          ) : (
            <ComplaintTable complaints={complaints} compact />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
