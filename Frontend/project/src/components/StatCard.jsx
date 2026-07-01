import React from 'react';

const StatCard = ({ icon: Icon, title, value, subtitle, accent }) => (
  <div className="stat-card">
    <div className="stat-card-icon" style={{ background: accent }}>
      <Icon size={20} color="#fff" />
    </div>
    <div>
      <p>{title}</p>
      <h3>{value}</h3>
      <span>{subtitle}</span>
    </div>
  </div>
);

export default StatCard;
