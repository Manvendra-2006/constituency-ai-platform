import { useTranslation } from "react-i18next";

const ComplaintTable = ({ complaints, onView, isMp = false }) => {
  const { t } = useTranslation();

  const getStatusBadge = (status) => {
    switch (status) {
      case 'new':
        return { label: t("new") || 'New', color: '#0B3D62', border: '#0B3D62' };
      case 'in-progress':
        return { label: t("inProgress") || 'In Progress', color: '#B8860B', border: '#B8860B' };
      case 'resolved':
        return { label: t("resolved") || 'Resolved', color: '#138808', border: '#138808' };
      case 'rejected':
        return { label: t("rejected") || 'Rejected', color: '#8B1E23', border: '#8B1E23' };
      default:
        return { label: status || 'Unknown', color: '#5A5A5A', border: '#5A5A5A' };
    }
  };

  if (!complaints.length) {
    return (
      <div className="border border-dashed border-[#0B3D62]/30 bg-white px-4 py-6 text-center text-sm text-[#5A5A5A] italic font-serif">
        {t("noComplaints")}
      </div>
    );
  }

  const headings = [
    t("complaintId"),
    t("village"),
    t("category"),
    t("urgency"),
    t("status"),
    t("date"),
  ];

  if (isMp) {
    headings.push(t("action"));
  }

  return (
    <div className="overflow-x-auto border border-[#0B3D62]/30 bg-white font-serif">
      <table className="w-full min-w-[900px] border-collapse text-sm">
        <thead>
          <tr className="bg-[#0B3D62]/5">
            {headings.map((heading) => (
              <th
                key={heading}
                className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-[#0B3D62] border-b border-[#0B3D62]/30"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint, idx) => {
            const badge = getStatusBadge(complaint.complaintStatus);
            return (
              <tr
                key={complaint._id}
                className={idx % 2 === 0 ? "bg-white" : "bg-[#0B3D62]/[0.03]"}
              >
                <td className="px-4 py-3 border-t border-[#0B3D62]/10 text-[#3A3A3A] font-mono text-xs">
                  {complaint._id}
                </td>
                <td className="px-4 py-3 border-t border-[#0B3D62]/10 text-[#3A3A3A]">
                  {complaint.village || '—'}
                </td>
                <td className="px-4 py-3 border-t border-[#0B3D62]/10 text-[#3A3A3A]">
                  {complaint.aiResponse?.category || '—'}
                </td>
                <td className="px-4 py-3 border-t border-[#0B3D62]/10 text-[#3A3A3A]">
                  {complaint.aiResponse?.urgency || '—'}
                </td>
                <td className="px-4 py-3 border-t border-[#0B3D62]/10">
                  <span
                    className="inline-block text-xs font-bold uppercase tracking-wide px-2 py-1 border"
                    style={{ color: badge.color, borderColor: badge.border }}
                  >
                    {badge.label}
                  </span>
                </td>
                <td className="px-4 py-3 border-t border-[#0B3D62]/10 text-[#5A5A5A]">
                  {complaint.createdAt ? new Date(complaint.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : '—'}
                </td>
                {isMp && (
                  <td className="px-4 py-3 border-t border-[#0B3D62]/10">
                    <button
                      type="button"
                      onClick={() => onView?.(complaint._id)}
                      className="text-xs font-semibold uppercase tracking-wide px-3 py-1.5 border border-[#0B3D62] text-[#0B3D62] hover:bg-[#0B3D62] hover:text-white transition-colors"
                    >
                      {t("view")}
                    </button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ComplaintTable;