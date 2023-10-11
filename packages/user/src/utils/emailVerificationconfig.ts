import { AppConfig } from "@dzangolab/react-config";

export const isEmailVerificationEnabled = (config: AppConfig): boolean => {
  if (config.user.features?.signUp?.emailVerification) {
    return true;
  }

  return false;
};
