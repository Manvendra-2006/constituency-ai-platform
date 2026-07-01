import { useEffect, useState } from 'react';
import { BrainCircuit, Compass, MessageSquareWarning, Sparkles, TrendingUp, Zap } from 'lucide-react';
import apiClient from '../api/axios.js';
import Navbar from '../components/Navbar.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import Loading from '../components/Loading.jsx';

const MpInsights = () => {
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
        setError(err.response?.data?.message || err.message || 'Unable to load AI insights.');
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
        <Navbar title="AI Insights" subtitle="Gemini-powered civic intelligence" />

        {error ? <ErrorMessage message={error} /> : null}

        <section className="insights-page">
          <div className="insights-header">
            <div>
              <div className="insights-eyebrow">
                <Sparkles size={16} />
                AI-powered recommendations
              </div>
              <h2>🤖 AI Insights</h2>
              <p>Actionable guidance for priority grievances and hotspot areas.</p>
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
                  <p className="insight-label">Top Village</p>
                  <h3>{insights?.topVillage || '—'}</h3>
                </div>
              </div>

              <div className="insight-card insight-card-gradient">
                <div className="insight-icon-wrap orange">
                  <TrendingUp size={18} />
                </div>
                <div>
                  <p className="insight-label">Top Category</p>
                  <h3>{insights?.topCategory || '—'}</h3>
                </div>
              </div>

              <div className="insight-card insight-card-gradient">
                <div className="insight-icon-wrap purple">
                  <MessageSquareWarning size={18} />
                </div>
                <div>
                  <p className="insight-label">High Urgency Complaints</p>
                  <h3>{insights?.highUrgencyComplaints ?? '—'}</h3>
                </div>
              </div>

              <div className="insight-card insight-card-large insight-card-glow">
                <div className="insight-icon-wrap green">
                  <BrainCircuit size={18} />
                </div>
                <div>
                  <p className="insight-label">AI Recommendation</p>
                  <p className="insight-recommendation">{insights?.recommendation || 'No recommendation available yet.'}</p>
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
