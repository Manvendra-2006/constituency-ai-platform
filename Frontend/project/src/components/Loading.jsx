const Loading = ({ label = 'Loading dashboard data…' }) => (
  <div className="loading-state">
    <div className="spinner" />
    <p>{label}</p>
  </div>
);

export default Loading;
