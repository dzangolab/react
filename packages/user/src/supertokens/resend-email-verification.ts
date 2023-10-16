import { toast } from "react-toastify";
import { sendVerificationEmail } from "supertokens-web-js/recipe/emailverification";

export const resendEmail = async () => {
  try {
    const response = await sendVerificationEmail();
    switch (response.status) {
      case "OK":
        toast.success("Email resent successfully");
        break;

      case "EMAIL_ALREADY_VERIFIED_ERROR":
        toast.success("Email is already verified");
        break;

      default:
        toast.error("Some error occured try again after some time");
        break;
    }
  } catch (error) {
    toast.error("Some error occured");
  }
};
