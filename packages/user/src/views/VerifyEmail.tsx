import { useTranslation } from "@dzangolab/react-i18n";
import { AuthPage } from "@dzangolab/react-ui";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getMe } from "@/api/user";
import { EMAIL_VERIFICATION } from "@/constants";
import { verifyEmail } from "@/supertokens";

import { UserContextType, useConfig, userContext } from "..";

export const VerifyEmail = ({ centered = true }: { centered?: boolean }) => {
  const [verifyEmailLoading, setVerifyEmailLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<string | undefined>("");
  const [isEmailUpdated, setIsEmailUpdated] = useState(false);
  const { t } = useTranslation("user");
  const { user, setUser } = useContext(userContext) as UserContextType;
  const config = useConfig();

  useEffect(() => {
    if (user) {
      verifyEmail()
        .then(async (response) => {
          if (response) {
            setStatus(response.status);
            switch (response.status) {
              case EMAIL_VERIFICATION.OK: {
                const userInfo = await getMe(config.apiBaseUrl);
                if (user.email !== userInfo.data.email) {
                  toast.success(
                    t("emailVerification.toastMessages.updateSuccess"),
                  );
                  setIsEmailUpdated(true);
                } else {
                  toast.success(t("emailVerification.toastMessages.success"));
                  setIsEmailUpdated(false);
                }
                setUser(userInfo.data);
                break;
              }
              case EMAIL_VERIFICATION.EMAIL_VERIFICATION_INVALID_TOKEN_ERROR:
                toast.error(t("emailVerification.toastMessages.invalidToken"));
                break;
              default:
                toast.error(`${t("emailVerification.toastMessages.error")}`);
                break;
            }
          }
        })
        .catch(() => {
          toast.error(`${t("emailVerification.toastMessages.error")}`);
          setStatus(EMAIL_VERIFICATION.ERROR);
        })
        .finally(() => {
          setVerifyEmailLoading(false);
        });
    }
  }, []);

  const renderMessage = () => {
    if (verifyEmailLoading) {
      return <p>{t("emailVerification.messages.verifyingEmail")}</p>;
    }

    let message = "";

    switch (status) {
      case EMAIL_VERIFICATION.OK:
        isEmailUpdated
          ? (message = t("emailVerification.toastMessages.updateSuccess"))
          : (message = t("emailVerification.toastMessages.success"));
        break;
      case EMAIL_VERIFICATION.EMAIL_VERIFICATION_INVALID_TOKEN_ERROR:
        message = t("emailVerification.messages.invalidToken");
        break;
      default:
        message = t("emailVerification.messages.error");
    }

    return (
      <>
        <p>{message}</p>
      </>
    );
  };

  return (
    <AuthPage
      className="email-verification"
      title={t("emailVerification.verifyEmail")}
      loading={verifyEmailLoading}
      centered={centered}
    >
      {renderMessage()}
    </AuthPage>
  );
};
