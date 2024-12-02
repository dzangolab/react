export const SUPERTOKENS_API_BASE_PATH_DEFAULT = "/auth";

export enum DEFAULT_PATHS {
  // unauthenticated routes
  ACCEPT_INVITATION = "/signup/token/:token",
  AUTH_CALLBACK_GOOGLE = "/auth/callback/google",
  FORGOT_PASSWORD = "/forgot-password",
  LOGIN = "/login",
  RESET_PASSWORD = "/reset-password",
  SIGNUP = "/signup",
  SIGNUP_FIRST_USER = "/signup-first-user",

  // authenticated routes
  CHANGE_PASSWORD = "/change-password",
  EMAIL_VERIFICATION_REMINDER = "/email-verification-reminder",
  EMAIL_VERIFICATION_VERIFY = "/verify-email",
  PROFILE = "/profile",
}

export enum EMAIL_VERIFICATION {
  EMAIL_ALREADY_VERIFIED = "EMAIL_ALREADY_VERIFIED",
  ERROR = "ERROR",
  OK = "OK",
  EMAIL_ALREADY_VERIFIED_ERROR = "EMAIL_ALREADY_VERIFIED_ERROR",
  EMAIL_VERIFICATION_INVALID_TOKEN_ERROR = "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR",
}
