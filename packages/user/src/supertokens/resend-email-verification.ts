import { useTranslation } from "@dzangolab/react-i18n";
import { toast } from "react-toastify";
import { sendVerificationEmail } from "supertokens-web-js/recipe/emailverification";

export const resendEmail = async () => {
  const { t } = useTranslation("user");
  try {
    const response = await sendVerificationEmail();
    switch (response.status) {
      case "OK":
        toast.success(t("emailVerification.toastMessages.resend.success"));
        break;

      case "EMAIL_ALREADY_VERIFIED_ERROR":
        toast.info("emailVerification.toastMessages.alreadyVerified");
        break;

      default:
        toast.error("emailVerification.toastMessages.error");
        break;
    }
  } catch (error) {
    toast.error("emailVerification.toastMessages.error");
  }
};
