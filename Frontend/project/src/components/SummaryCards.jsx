import { useTranslation } from "react-i18next";

const SummaryCards = ({ total, analyzed, pending }) => {
  const { t } = useTranslation();

  const cards = [
    { label: t("totalComplaints"), value: total, color: "#0B3D62" },
    { label: t("analyzedComplaints"), value: analyzed, color: "#138808" },
    { label: t("pendingComplaints"), value: pending, color: "#8B1E23" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 font-serif">
      {cards.map((card) => (
        <div
          key={card.label}
          className="border border-[#0B3D62]/30 bg-white px-5 py-4"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-[#5A5A5A]">
            {card.label}
          </p>
          <p className="text-3xl font-bold mt-2" style={{ color: card.color }}>
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;