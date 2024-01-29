import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";
import { useState } from "react";
import { toast } from "react-toastify";

import { ForgotPasswordForm } from "../components/ForgotPasswordForm";
import { forgotPassword } from "../supertokens/forgot-password";

export const ForgotPassword = () => {
  const { t } = useTranslation("user");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (email: string) => {
    setLoading(true);

    const result = await forgotPassword(email);

    setLoading(false);

    if (result?.status === "OK") {
      toast.success(`${t("forgotPassword.messages.success")}`);
    }
  };

  return (
    <Page
      className="forgot-password"
      title={t("forgotPassword.title")}
      contentAlignment="center"
    >
      <ForgotPasswordForm handleSubmit={handleSubmit} loading={loading} />
    </Page>
  );
};
