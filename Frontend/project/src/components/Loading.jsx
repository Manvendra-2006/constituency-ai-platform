import { useTranslation } from "react-i18next";

const Loading = ({ label }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10 font-serif">
      <div className="w-9 h-9 border-4 border-[#0B3D62]/20 border-t-[#0B3D62] rounded-full animate-spin" />
      <p className="text-sm text-[#5A5A5A] uppercase tracking-wide">
        {label || t("loading")}
      </p>
    </div>
  );
};

export default Loading;