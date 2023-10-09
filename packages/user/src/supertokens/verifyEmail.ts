import EmailVerification from "supertokens-web-js/recipe/emailverification";

interface IPromise {
  status:
    | "EMAIL_ALREADY_VERIFIED"
    | "OK"
    | "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR"
    | undefined;
}

const verifyEmail = async (): Promise<IPromise | undefined> => {
  const { isVerified } = await EmailVerification.isEmailVerified();

  if (isVerified) {
    return { status: "EMAIL_ALREADY_VERIFIED" };
  } else {
    const response = await EmailVerification.verifyEmail();

    return { status: response.status };
  }
};

export default verifyEmail;
