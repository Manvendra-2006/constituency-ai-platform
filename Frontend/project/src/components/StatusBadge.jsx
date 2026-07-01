const StatusBadge = ({ status }) => {
  const normalized = String(status || 'new').toLowerCase();
  return <span className={`status-pill ${normalized.replace(/\s+/g, '-')}`}>{normalized.replace(/-/g, ' ')}</span>;
};

export default StatusBadge;
