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
