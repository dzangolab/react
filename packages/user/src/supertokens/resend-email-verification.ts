import { sendVerificationEmail } from "supertokens-web-js/recipe/emailverification";

type resendEmailStatus = "OK" | "EMAIL_ALREADY_VERIFIED_ERROR";

export const resendEmail = async (): Promise<resendEmailStatus | undefined> => {
  const response = await sendVerificationEmail();

  return response.status;
};
