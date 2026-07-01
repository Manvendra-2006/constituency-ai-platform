const ComplaintTable = ({ complaints, onView }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'new':
        return { label: 'New', color: '#2563eb', background: '#dbeafe' };
      case 'in-progress':
        return { label: 'In Progress', color: '#c2410c', background: '#ffedd5' };
      default:
        return { label: status || 'Unknown', color: '#475569', background: '#e2e8f0' };
    }
  };

  if (!complaints.length) {
    return (
      <div style={{ background: '#ffffff', borderRadius: '16px', padding: '24px', textAlign: 'center', color: '#64748b', boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)' }}>
        No actionable complaints found.
      </div>
    );
  }

  return (
    <div style={{ overflowX: 'auto', background: '#ffffff', borderRadius: '16px', boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '900px' }}>
        <thead>
          <tr style={{ background: '#f8fafc', color: '#334155' }}>
            <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '13px' }}>Complaint ID</th>
            <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '13px' }}>Village</th>
            <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '13px' }}>Category</th>
            <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '13px' }}>Urgency</th>
            <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '13px' }}>Progress</th>
            <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '13px' }}>Created Date</th>
            <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '13px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint) => {
            const badge = getStatusBadge(complaint.complaintStatus);
            return (
              <tr key={complaint._id} style={{ borderTop: '1px solid #e2e8f0' }}>
                <td style={{ padding: '14px 16px', color: '#475569', fontFamily: 'monospace' }}>{complaint._id}</td>
                <td style={{ padding: '14px 16px', color: '#475569' }}>{complaint.village || '—'}</td>
                <td style={{ padding: '14px 16px', color: '#475569' }}>{complaint.aiResponse?.category || '—'}</td>
                <td style={{ padding: '14px 16px', color: '#475569' }}>{complaint.aiResponse?.urgency || '—'}</td>
                <td style={{ padding: '14px 16px' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '6px 10px',
                      borderRadius: '999px',
                      fontSize: '12px',
                      fontWeight: 700,
                      color: badge.color,
                      background: badge.background,
                    }}
                  >
                    {badge.label}
                  </span>
                </td>
                <td style={{ padding: '14px 16px', color: '#64748b' }}>
                  {complaint.createdAt ? new Date(complaint.createdAt).toLocaleDateString() : '—'}
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <button
                    type="button"
                    onClick={() => onView?.(complaint._id)}
                    style={{
                      border: 'none',
                      borderRadius: '999px',
                      background: '#2563eb',
                      color: '#ffffff',
                      padding: '8px 12px',
                      cursor: 'pointer',
                      fontWeight: 600,
                    }}
                  >
                    View
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ComplaintTable;
