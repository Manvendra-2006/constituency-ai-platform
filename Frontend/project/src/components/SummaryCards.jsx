const SummaryCards = ({ total, analyzed, pending }) => {
  const cards = [
    { label: 'Total Complaints', value: total, tone: '#2563eb' },
    { label: 'Analyzed Complaints', value: analyzed, tone: '#16a34a' },
    { label: 'Pending Complaints', value: pending, tone: '#f59e0b' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
      {cards.map((card) => (
        <div
          key={card.label}
          style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)',
            border: '1px solid #e2e8f0',
          }}
        >
          <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {card.label}
          </div>
          <div style={{ fontSize: '32px', fontWeight: 700, color: card.tone, marginTop: '8px' }}>
            {card.value}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
