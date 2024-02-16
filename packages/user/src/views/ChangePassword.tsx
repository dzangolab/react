import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";

import { useChangePassword } from "@/hooks/useChangePassword";

import ChangePasswordForm from "../components/ChangePasswordForm";

export const ChangePassword = () => {
  const { t } = useTranslation("user");

  const [changePassword, { isLoading }] = useChangePassword();

  const handleSubmit = async (oldPassword: string, newPassword: string) => {
    await changePassword({ newPassword, oldPassword });
  };

  return (
    <Page
      className="change-password"
      title={t("changePassword.title")}
      centered={true}
    >
      <ChangePasswordForm handleSubmit={handleSubmit} loading={isLoading} />
    </Page>
  );
};
