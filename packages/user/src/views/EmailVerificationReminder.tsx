import { configContext } from "@dzangolab/react-config";
import { useTranslation } from "@dzangolab/react-i18n";
import { Page, Button } from "@dzangolab/react-ui";
import { Card } from "primereact/card";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { EMAIL_VERIFICATION } from "@/constants";
import { getHomeRoute } from "@/helpers";
import { resendEmail } from "@/supertokens/resend-email-verification";

import { UserContextType, userContext } from "..";

export const EmailVerificationReminder = () => {
  const { t } = useTranslation("user");
  const { user } = useContext(userContext) as UserContextType;
  const appConfig = useContext(configContext);
  const navigate = useNavigate();
  const homeRoute: string | undefined = getHomeRoute(
    user,
    appConfig?.layout,
    appConfig?.user,
  );

  const handleResend = () => {
    resendEmail()
      .then((status) => {
        if (status === EMAIL_VERIFICATION.OK) {
          toast.success(t("emailVerification.toastMessages.resendSuccess"));
        } else if (status === EMAIL_VERIFICATION.EMAIL_ALREADY_VERIFIED_ERROR) {
          toast.info(t("emailVerification.toastMessages.alreadyVerified"));
        }
      })
      .catch(() => {
        toast.error(t("emailVerification.toastMessages.error"));
      });
  };

  useEffect(() => {
    if (user?.isEmailVerified) {
      navigate(`/${homeRoute}`);
    }
  }, []);

  return (
    <Page
      className="email-verification-reminder"
      title={t("emailVerification.title")}
    >
      <Card className="email-verification-reminder-card">
        <div className="message-wrapper">
          {t("emailVerification.messages.unverified")}
        </div>
        <div className="button-wrapper">
          <Button
            label={t("emailVerification.button.resendEmail")}
            onClick={handleResend}
          />
        </div>
      </Card>
    </Page>
  );
};
