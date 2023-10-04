import EmailVerification from "supertokens-web-js/recipe/emailverification";

const checkVerifiedEmail = async (): Promise<boolean | undefined> => {
  const { isVerified } = await EmailVerification.isEmailVerified();

  if (isVerified) {
    return true;
  }
  return false;
};

export default checkVerifiedEmail;
