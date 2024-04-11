import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { ROUTES } from "@/constants";
import { useConfig } from "@/hooks";

import { ForgotPasswordForm } from "../components/ForgotPasswordForm";
import { forgotPassword } from "../supertokens/forgot-password";

export const ForgotPassword = ({ centered = true }: { centered?: boolean }) => {
  const { t } = useTranslation("user");
  const [loading, setLoading] = useState<boolean>(false);

  const { user: userConfig } = useConfig();

  const handleSubmit = async (email: string) => {
    setLoading(true);

    const result = await forgotPassword(email);

    setLoading(false);

    if (result?.status === "OK") {
      toast.success(`${t("forgotPassword.messages.success")}`);
    }
  };

  const renderLinks = () => {
    return (
      <>
        {
          <Link
            to={userConfig.routes?.login?.path || ROUTES.LOGIN}
            className="native-link"
          >
            {t("forgotPassword.links.login")}
          </Link>
        }
      </>
    );
  };

  return (
    <Page
      className="forgot-password"
      title={t("forgotPassword.title")}
      centered={centered}
    >
      <ForgotPasswordForm
        handleSubmit={handleSubmit}
        links={renderLinks()}
        loading={loading}
      />
    </Page>
  );
};
