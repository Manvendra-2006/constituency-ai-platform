import { useEffect, useState } from 'react';
import { BrainCircuit, Compass, MessageSquareWarning, Sparkles, TrendingUp, Zap } from 'lucide-react';
import apiClient from '../api/axios.js';
import Navbar from '../components/Navbar.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import Loading from '../components/Loading.jsx';
import { useTranslation } from "react-i18next";
const MpInsights = () => {
  const { t } = useTranslation();
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await apiClient.get('/mp/dashboard/insights');
        setInsights(response.data || null);
      } catch (err) {
       setError(
  err.response?.data?.message ||
  err.message ||
  t("unableToLoadInsights")
);
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, []);

  const renderSkeleton = () => (
    <div className="insights-grid">
      {[1, 2, 3].map((item) => (
        <div key={item} className="insight-card insight-card-skeleton">
          <div className="skeleton-line short" />
          <div className="skeleton-line" />
          <div className="skeleton-line medium" />
        </div>
      ))}
      <div className="insight-card insight-card-skeleton insight-card-large">
        <div className="skeleton-line short" />
        <div className="skeleton-line" />
        <div className="skeleton-line" />
        <div className="skeleton-line medium" />
      </div>
    </div>
  );

  return (
    <div className="dashboard-shell">
      <div className="dashboard-inner">
<Navbar
  title={t("aiInsights")}
  subtitle={t("aiInsightsSubtitle")}
/>

        {error ? <ErrorMessage message={error} /> : null}

        <section className="insights-page">
          <div className="insights-header">
            <div>
              <div className="insights-eyebrow">
                <Sparkles size={16} />
             {t("aiPoweredRecommendations")}
              </div>
            <h2>🤖 {t("aiInsights")}</h2>
<p>{t("insightsDescription")}</p>
            </div>
          </div>

          {loading ? (
            renderSkeleton()
          ) : (
            <div className="insights-grid">
              <div className="insight-card insight-card-gradient">
                <div className="insight-icon-wrap blue">
                  <Compass size={18} />
                </div>
                <div>
<p className="insight-label">
  {t("topVillage")}
</p>
                  <h3>{insights?.topVillage || '—'}</h3>
                </div>
              </div>

              <div className="insight-card insight-card-gradient">
                <div className="insight-icon-wrap orange">
                  <TrendingUp size={18} />
                </div>
                <div>
               <p className="insight-label">
  {t("topCategory")}
</p>
                  <h3>{insights?.topCategory || '—'}</h3>
                </div>
              </div>

              <div className="insight-card insight-card-gradient">
                <div className="insight-icon-wrap purple">
                  <MessageSquareWarning size={18} />
                </div>
                <div>
                <p className="insight-label">
  {t("highUrgencyComplaints")}
</p>
                  <h3>{insights?.highUrgencyComplaints ?? '—'}</h3>
                </div>
              </div>

              <div className="insight-card insight-card-large insight-card-glow">
                <div className="insight-icon-wrap green">
                  <BrainCircuit size={18} />
                </div>
                <div>
                 <p className="insight-label">
  {t("aiRecommendation")}
</p>
                  <p className="insight-recommendation">{insights?.recommendation || 't("noRecommendation").'}</p>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default MpInsights;
