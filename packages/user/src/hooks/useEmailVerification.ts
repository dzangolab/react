import { useConfig } from "./useConfig";
import { useUser } from "./useUser";

export const useEmailVerification = () => {
  const config = useConfig();
  const { user } = useUser();

  const emailVerificationEnabled =
    !!config.user.features?.signUp?.emailVerification;

  const userEmailVerified = emailVerificationEnabled
    ? user?.isEmailVerified
    : undefined;

  return [emailVerificationEnabled, userEmailVerified];
};
