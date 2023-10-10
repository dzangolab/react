import { useConfig } from "@/hooks";

export const isEmailVerificationEnabled = (): boolean => {
  const { user } = useConfig();

  if (user.features?.signUp?.emailVerification) {
    return true;
  }

  return false;
};
