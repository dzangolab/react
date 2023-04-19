import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import ResetPasswordForm from "@/components/ResetPasswordForm";
import resetPassword from "@/supertokens/reset-password";

import { ROUTES } from "../constants";
import { useConfig } from "../hooks";

import "../assets/css/resetPassword.css";

const ResetPassword = () => {
  const { t } = useTranslation("user");
  const { user: userConfig } = useConfig();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const loginPath = userConfig.routes?.login?.path || ROUTES.LOGIN;

  const handleSubmit = async (newPassword: string) => {
    setLoading(true);
    const result = await resetPassword(newPassword);
    setLoading(false);
    if (result?.status === "OK") {
      toast.success(`${t("resetPassword.messages.success")}`);
      navigate(loginPath);
    }
  };

  return (
    <div className="reset-password">
      <Page title={t("resetPassword.title")}>
        <ResetPasswordForm handleSubmit={handleSubmit} loading={loading} />
      </Page>
    </div>
  );
};

export default ResetPassword;
