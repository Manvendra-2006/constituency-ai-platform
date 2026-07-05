import { useTranslation } from "react-i18next";

const Loading = ({ label }) => {
  const { t } = useTranslation();

  return (
    <div>
      {label || t("loading")}
    </div>
  );
};

export default Loading;