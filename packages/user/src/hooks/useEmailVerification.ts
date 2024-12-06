import { useConfig } from "./useConfig";
import { useUser } from "./useUser";

export const useEmailVerification = () => {
  const config = useConfig();
  const { user } = useUser();

  const emailVerificationEnabled = !!config.features?.emailVerification;

  const isEmailVerified = emailVerificationEnabled
    ? user?.isEmailVerified
    : undefined;

  return [emailVerificationEnabled, isEmailVerified];
};
