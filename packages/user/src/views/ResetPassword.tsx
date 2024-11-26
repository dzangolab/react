import { useTranslation } from "@dzangolab/react-i18n";
import { AuthPage } from "@dzangolab/react-ui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { DEFAULT_PATHS } from "@/routes/routes";

import ResetPasswordForm from "../components/ResetPasswordForm";
import { useConfig } from "../hooks";
import resetPassword from "../supertokens/reset-password";

export const ResetPassword = ({ centered = true }: { centered?: boolean }) => {
  const { t } = useTranslation("user");
  const config = useConfig();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const loginPath = config.customPaths?.login || DEFAULT_PATHS.LOGIN;

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
    <AuthPage
      className="reset-password"
      title={t("resetPassword.title")}
      centered={centered}
    >
      <ResetPasswordForm handleSubmit={handleSubmit} loading={loading} />
    </AuthPage>
  );
};
