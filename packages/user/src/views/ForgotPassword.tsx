import { useTranslation } from "@dzangolab/react-i18n";
import { AuthPage } from "@dzangolab/react-ui";
import { useState } from "react";
import { toast } from "react-toastify";

import { AuthLinks } from "@/components/AuthLinks";
import { DEFAULT_PATHS } from "@/constants";
import { useConfig } from "@/hooks";
import { forgotPassword } from "@/supertokens";
import { LinkType } from "@/types/types";

import { ForgotPasswordForm } from "../components/ForgotPasswordForm";

export const ForgotPassword = ({ centered = true }: { centered?: boolean }) => {
  const { t } = useTranslation("user");
  const [loading, setLoading] = useState<boolean>(false);

  const config = useConfig();

  const links: Array<LinkType> = [
    {
      className: "native-link",
      display: true,
      label: t("forgotPassword.links.login"),
      to: config.customPaths?.login || DEFAULT_PATHS.LOGIN,
    },
  ];

  const handleSubmit = async (email: string) => {
    setLoading(true);

    const result = await forgotPassword(email);

    setLoading(false);

    if (result?.status === "OK") {
      toast.success(`${t("forgotPassword.messages.success")}`);
    }
  };

  return (
    <AuthPage
      centered={centered}
      className="forgot-password"
      title={t("forgotPassword.title")}
    >
      <ForgotPasswordForm handleSubmit={handleSubmit} loading={loading} />
      <AuthLinks className="forgot-password" links={links} />
    </AuthPage>
  );
};
