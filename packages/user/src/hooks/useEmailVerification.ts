import { useState } from "react";
import useConfig from "./useConfig";
import useUser from "./useUser";

export const useEmailVerification = () => {
  const config = useConfig();
  const { user } = useUser();
  const [emailVerificationEnabled, setEmailVerificationEnabled] =
    useState<boolean>(false);
  const [userEmailVerified, setUserEmailVerified] = useState<
    boolean | undefined
  >(false);
  if (config.user.features?.signUp?.emailVerification) {
    setEmailVerificationEnabled(true);
  } else {
    setUserEmailVerified(undefined);
  }

  if (user?.isEmailVerified) {
    setUserEmailVerified(true);
  }

  return [emailVerificationEnabled, userEmailVerified];
};
