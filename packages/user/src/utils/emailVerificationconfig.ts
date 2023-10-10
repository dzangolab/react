import { useConfig } from "@/hooks";

const { user } = useConfig();
export const isEmailVerificationEnabled = (): boolean => {
  if (user.features?.signUp?.emailVerification) {
    return true;
  }

  return false;
};
