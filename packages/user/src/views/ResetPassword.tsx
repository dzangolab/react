import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import ResetPasswordForm from "@/components/ResetPasswordForm";
import resetPassword from "@/supertokens/resetpassword";

import "../assets/css/resetPassword.css";

const ResetPassword = () => {
  const { t } = useTranslation("user");
  const navigate = useNavigate();

  const handleSubmit = async (newPassword: string) => {
    const result = await resetPassword(newPassword);

    if (result?.status === "OK") {
      toast.success(`${t("resetPassword.messages.success")}`);
      navigate("/login");
    }
  };

  return (
    <div className="reset-password">
      <Page title={t("resetPassword.title")}>
        <ResetPasswordForm handleSubmit={handleSubmit} />
      </Page>
    </div>
  );
};

export default ResetPassword;
