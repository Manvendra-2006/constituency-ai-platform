import React from 'react';

const StatCard = ({ icon: Icon, title, value, subtitle }) => (
  <div className="border border-[#0B3D62]/30 bg-white font-serif">
    <div className="flex items-start gap-3 px-5 py-4">
      <div className="w-9 h-9 rounded-full border-2 border-[#0B3D62]/40 flex items-center justify-center shrink-0 text-[#0B3D62]">
        <Icon size={16} />
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-wide text-[#5A5A5A]">{title}</p>
        <h3 className="text-lg font-bold text-[#0B3D62] mt-0.5">{value}</h3>
        {subtitle && <span className="text-xs text-[#5A5A5A]">{subtitle}</span>}
      </div>
    </div>
  </div>
);

export default StatCard;