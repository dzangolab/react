import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";
import React from "react";
import { toast } from "react-toastify";

import ForgetPasswordForm from "@/components/ForgetPasswordForm";
import forgetPassword from "@/supertokens/forgetpassword";

import "../assets/css/forgetPassword.css";

const ForgetPassword = () => {
  const { t } = useTranslation("user");

  const handleSubmit = async (email: string) => {
    const result = await forgetPassword(email);

    if (result?.status === "OK") {
      toast.success(`${t("forgetPassword.messages.success")}`);
    }
  };

  return (
    <div className="forget-password">
      <Page title={t("forgetPassword.title")}>
        <ForgetPasswordForm handleSubmit={handleSubmit} />
      </Page>
    </div>
  );
};

export default ForgetPassword;
