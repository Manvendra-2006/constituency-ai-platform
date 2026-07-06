const STATUS_STYLES = {
  new: { color: '#0B3D62', border: '#0B3D62' },
  'in-progress': { color: '#B8860B', border: '#B8860B' },
  resolved: { color: '#138808', border: '#138808' },
  rejected: { color: '#8B1E23', border: '#8B1E23' },
};

const StatusBadge = ({ status }) => {
  const normalized = String(status || 'new').toLowerCase().replace(/\s+/g, '-');
  const style = STATUS_STYLES[normalized] || { color: '#5A5A5A', border: '#5A5A5A' };

  return (
    <span
      className="inline-block text-xs font-bold uppercase tracking-wide px-2 py-1 border font-serif"
      style={{ color: style.color, borderColor: style.border }}
    >
      {normalized.replace(/-/g, ' ')}
    </span>
  );
};

export default StatusBadge;