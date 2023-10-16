import { sendVerificationEmail } from "supertokens-web-js/recipe/emailverification";

export const resendEmail = async (): Promise<any> => {
  const response = await sendVerificationEmail();

  console.log(response);
};
