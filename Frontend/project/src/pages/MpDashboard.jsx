import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, FileText, LayoutDashboard, MessageSquareWarning, Users } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import apiClient from '../api/axios.js';
import Navbar from '../components/Navbar.jsx';
import ComplaintTable from '../components/ComplaintTable.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import Loading from '../components/Loading.jsx';
import StatCard from '../components/StatCard.jsx';

const MpDashboard = () => {
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [hotspots, setHotspots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [hotspotsLoading, setHotspotsLoading] = useState(true);
  const [hotspotsError, setHotspotsError] = useState('');

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError('');
      console.log('[MpDashboard] requesting dashboard analytics and actionable complaints');

      const [analyticsResponse, actionableResponse] = await Promise.all([
        apiClient.get('/mp/dashboard'),
        apiClient.get('/mp/complaint/list/action'),
      ]);

      console.log('[MpDashboard] analytics response', analyticsResponse.data);
      console.log('[MpDashboard] actionable complaints response', actionableResponse.data);

      setAnalytics(analyticsResponse.data);
      setComplaints(actionableResponse.data?.complaints || []);
    } catch (err) {
      console.error('[MpDashboard] dashboard request failed', err);
      setError(err.response?.data?.message || err.message || 'Unable to load MP dashboard.');
    } finally {
      setLoading(false);
    }
  };

  const loadHotspots = async () => {
    try {
      setHotspotsLoading(true);
      setHotspotsError('');
      console.log('[MpDashboard] requesting demand hotspots');

      const response = await apiClient.get('/mp/dashboard/hotspots');
      console.log('[MpDashboard] hotspots response', response.data);

      const hotspotsData = Array.isArray(response.data?.hotspots) ? response.data.hotspots : [];
      const sortedHotspots = hotspotsData.slice().sort((a, b) => b.totalComplaints - a.totalComplaints);
      setHotspots(sortedHotspots);
    } catch (err) {
      console.error('[MpDashboard] hotspots request failed', err);
      setHotspotsError(err.response?.data?.message || err.message || 'Unable to load demand hotspots.');
    } finally {
      setHotspotsLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
    loadHotspots();
  }, []);

  const colorPalette = ['#2563eb', '#f59e0b', '#10b981', '#8b5cf6', '#ef4444', '#eab308', '#0ea5e9', '#84cc16'];

  const pieData = (analytics?.categoryWise || []).map((item, index) => ({
    ...item,
    fill: colorPalette[index % colorPalette.length],
  }));
  const villageData = (analytics?.villageWise || []).slice(0, 6);
  const subcategoryData = (analytics?.subcategoryWise || []).slice(0, 8);

  return (
    <div className="dashboard-shell">
      <div className="dashboard-inner">
        <Navbar title="MP Dashboard" subtitle="Government grievance oversight center" />

        {error ? <ErrorMessage message={error} /> : null}

        {loading ? (
          <Loading label="Loading analytics and actionable complaints…" />
        ) : (
          <>
            <section className="stats-grid">
              <StatCard icon={LayoutDashboard} title="Total complaints" value={analytics?.totalComplaints ?? 0} subtitle="Across all districts" accent="linear-gradient(135deg, #2563eb, #60a5fa)" />
              <StatCard icon={MessageSquareWarning} title="Pending" value={analytics?.pending ?? 0} subtitle="Needing attention" accent="linear-gradient(135deg, #dc2626, #f87171)" />
              <StatCard icon={FileText} title="Analyzed" value={analytics?.analyzed ?? 0} subtitle="AI-reviewed grievances" accent="linear-gradient(135deg, #0f766e, #14b8a6)" />
            </section>

            <section className="charts-grid">
              <div className="chart-card">
                <div className="navbar-brand" style={{ marginBottom: 10 }}>
                  <div className="navbar-logo" style={{ background: 'linear-gradient(135deg, #2563eb, #60a5fa)' }}>
                    <BarChart3 size={18} />
                  </div>
                  <div>
                    <h3>Category-wise complaints</h3>
                    <p>Distribution of issues by category.</p>
                  </div>
                </div>
                <div className="chart-wrap" style={{ display: 'flex', alignItems: 'center', gap: 16, height: '100%' }}>
                  <div style={{ flex: 1, width: '100%', height: 240 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={pieData} dataKey="count" nameKey="category" innerRadius={60} outerRadius={100} paddingAngle={4} label={false}>
                          {pieData.map((entry, index) => (
                            <Cell key={`${entry.category}-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div style={{ minWidth: 160, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {pieData.map((entry) => (
                      <div key={entry.category} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#334155' }}>
                        <span style={{ width: 12, height: 12, borderRadius: '50%', background: entry.fill, display: 'inline-block' }} />
                        <span>{entry.category}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="chart-card">
                <div className="navbar-brand" style={{ marginBottom: 10 }}>
                  <div className="navbar-logo" style={{ background: 'linear-gradient(135deg, #0f766e, #14b8a6)' }}>
                    <Users size={18} />
                  </div>
                  <div>
                    <h3>Village-wise complaints</h3>
                    <p>Top villages generating grievances.</p>
                  </div>
                </div>
                <div className="chart-wrap">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={villageData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="village" tickLine={false} axisLine={false} />
                      <YAxis tickLine={false} axisLine={false} allowDecimals={false} />
                      <Tooltip />
                      <Bar dataKey="count" radius={[8, 8, 0, 0]} fill="#2563eb" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </section>

            <div className="chart-card">
              <div className="navbar-brand" style={{ marginBottom: 10 }}>
                <div className="navbar-logo" style={{ background: 'linear-gradient(135deg, #7c3aed, #a78bfa)' }}>
                  <BarChart3 size={18} />
                </div>
                <div>
                  <h3>Subcategory-wise complaints</h3>
                  <p>Detailed breakdown of recurring service issues.</p>
                </div>
              </div>
              <div className="chart-wrap" style={{ height: 320 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={subcategoryData} layout="vertical" margin={{ top: 8, right: 16, left: 24, bottom: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" tickLine={false} axisLine={false} allowDecimals={false} />
                    <YAxis dataKey="subcategory" type="category" tickLine={false} axisLine={false} width={140} />
                    <Tooltip />
                    <Bar dataKey="count" radius={[0, 8, 8, 0]} fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="chart-card">
              <div className="navbar-brand" style={{ marginBottom: 10 }}>
                <div className="navbar-logo" style={{ background: 'linear-gradient(135deg, #f97316, #fb923c)' }}>
                  <Users size={18} />
                </div>
                <div>
                  <h3>Demand Hotspots</h3>
                  <p>Villages with the highest complaint concentration.</p>
                </div>
              </div>

              {hotspotsLoading ? (
                <Loading label="Loading demand hotspots…" />
              ) : hotspotsError ? (
                <ErrorMessage message={hotspotsError} />
              ) : hotspots.length === 0 ? (
                <div className="empty-state-card">No demand hotspots available yet.</div>
              ) : (
                <div className="hotspots-list">
                  {hotspots.map((hotspot) => {
                    const topIssue = hotspot.categories?.reduce((prev, current) => (current.count > prev.count ? current : prev), hotspot.categories?.[0] || { count: 0 });
                    const priority = hotspot.totalComplaints >= 20 ? { label: 'High Priority', tone: 'priority-high' } : hotspot.totalComplaints >= 10 ? { label: 'Medium Priority', tone: 'priority-medium' } : { label: 'Low Priority', tone: 'priority-low' };

                    return (
                      <div key={hotspot.village} className="hotspot-card">
                        <div className="hotspot-heading">
                          <div>
                            <h4>📍 {hotspot.village}</h4>
                            <p>Total Complaints: {hotspot.totalComplaints}</p>
                          </div>
                          <span className={`priority-badge ${priority.tone}`}>{priority.label}</span>
                        </div>

                        <div className="hotspot-highlight">
                          <span className="hotspot-highlight-label">Top Issue</span>
                          <strong>{topIssue?.category || 'N/A'}</strong>
                        </div>

                        <div className="hotspot-breakdown">
                          {hotspot.categories?.map((item, index) => {
                            const fill = colorPalette[index % colorPalette.length];
                            const width = Math.max(12, Math.round((item.count / hotspot.totalComplaints) * 100));
                            return (
                              <div key={`${hotspot.village}-${item.category}`} className="hotspot-row">
                                <div className="hotspot-row-top">
                                  <span className="hotspot-category-name">{item.category}</span>
                                  <span className="hotspot-count-pill">{item.count}</span>
                                </div>
                                <div className="hotspot-bar-track">
                                  <div className="hotspot-bar-fill" style={{ width: `${width}%`, background: fill }} />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <ComplaintTable
              complaints={complaints}
              onView={(id) => navigate(`/mp/complaint/${id}`)}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default MpDashboard;
