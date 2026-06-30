const ComplaintTable = ({ complaints }) => {
  if (!complaints.length) {
    return (
      <div style={{ background: '#ffffff', borderRadius: '16px', padding: '24px', textAlign: 'center', color: '#64748b', boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)' }}>
        No complaints found.
      </div>
    );
  }

  return (
    <div style={{ overflowX: 'auto', background: '#ffffff', borderRadius: '16px', boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
        <thead>
          <tr style={{ background: '#f8fafc', color: '#334155' }}>
            <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '13px' }}>Complaint ID</th>
            <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '13px' }}>Village</th>
            <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '13px' }}>Complaint</th>
            <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '13px' }}>Status</th>
            <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '13px' }}>Date</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint) => (
            <tr key={complaint._id} style={{ borderTop: '1px solid #e2e8f0' }}>
              <td style={{ padding: '14px 16px', color: '#475569', fontFamily: 'monospace' }}>{complaint._id}</td>
              <td style={{ padding: '14px 16px', color: '#475569' }}>{complaint.village}</td>
              <td style={{ padding: '14px 16px', color: '#475569', maxWidth: '320px' }}>{complaint.originalComplaint}</td>
              <td style={{ padding: '14px 16px' }}>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '6px 10px',
                    borderRadius: '999px',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: complaint.status === 'analyzed' ? '#166534' : '#b45309',
                    background: complaint.status === 'analyzed' ? '#dcfce7' : '#ffedd5',
                  }}
                >
                  {complaint.status}
                </span>
              </td>
              <td style={{ padding: '14px 16px', color: '#64748b' }}>{new Date(complaint.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComplaintTable;
