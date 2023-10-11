import { AppConfig } from "@dzangolab/react-config";

export const isEmailVerificationEnabled = (config: AppConfig): boolean => {
  return !!config.user.features?.signUp?.emailVerification;
};
