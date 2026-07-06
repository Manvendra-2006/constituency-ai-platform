import { useTranslation } from "react-i18next";

const ErrorMessage = ({ message }) => {
  const { t } = useTranslation();

  return (
    <div className="border border-[#8B1E23]/40 bg-[#8B1E23]/5 px-5 py-4 font-serif">
      <h3 className="text-sm font-bold uppercase tracking-wide text-[#8B1E23]">
        {t("errorTitle")}
      </h3>
      <p className="text-sm text-[#3A3A3A] mt-1">{message}</p>
    </div>
  );
};

export default ErrorMessage;