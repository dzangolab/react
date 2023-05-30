import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";
import { useState } from "react";
import { toast } from "react-toastify";

import ForgetPasswordForm from "../components/ForgetPasswordForm";
import forgetPassword from "../supertokens/forget-password";

const ForgetPassword = () => {
  const { t } = useTranslation("user");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (email: string) => {
    setLoading(true);
    const result = await forgetPassword(email);
    setLoading(false);
    if (result?.status === "OK") {
      toast.success(`${t("forgetPassword.messages.success")}`);
    }
  };

  return (
    <Page className="forget-password" title={t("forgetPassword.title")}>
      <ForgetPasswordForm handleSubmit={handleSubmit} loading={loading} />
    </Page>
  );
};

export default ForgetPassword;
