const SUPERTOKENS_API_BASE_PATH_DEFAULT = "/auth";

enum ROUTES {
  LOGIN = "/login",
  FORGOT_PASSWORD = "/forgot-password",
  SIGNUP = "/signup",
  SIGNUP_FIRST_USER = "/signup-first-user",
}

enum EMAIL_VERIFICATION {
  EMAIL_ALREADY_VERIFIED = "EMAIL_ALREADY_VERIFIED",
  ERROR = "ERROR",
  OK = "OK",
  EMAIL_ALREADY_VERIFIED_ERROR = "EMAIL_ALREADY_VERIFIED_ERROR",
  EMAIL_VERIFICATION_INVALID_TOKEN_ERROR = "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR",
}

export { SUPERTOKENS_API_BASE_PATH_DEFAULT, ROUTES, EMAIL_VERIFICATION };
