import { useTranslation } from "react-i18next";
const ErrorMessage = ({ message }) => {
  const { t } = useTranslation();

  return (
    <div className="error-state">
      <h3>{t("errorTitle")}</h3>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;