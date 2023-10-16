import { toast } from "react-toastify";
import { sendVerificationEmail } from "supertokens-web-js/recipe/emailverification";

export const resendEmail = async (t: any) => {
  try {
    const response = await sendVerificationEmail();
    switch (response.status) {
      case "OK":
        toast.success(t("emailVerification.toastMessages.resend.success"));
        break;

      case "EMAIL_ALREADY_VERIFIED_ERROR":
        toast.info(t("emailVerification.toastMessages.alreadyVerified"));
        break;

      default:
        toast.error(t("emailVerification.toastMessages.resend.error"));
        break;
    }
  } catch (error) {
    toast.error(t("emailVerification.toastMessages.resend.error"));
  }
};
