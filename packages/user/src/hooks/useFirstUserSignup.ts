import { useEffect, useState } from "react";
import { NavigateFunction } from "react-router-dom";

import { getIsFirstUser } from "@/api/user";
import { ROUTES } from "@/constants";

type UseFirstUserSignupArguments = {
  appConfig: any;
} & (
  | { autoRedirect: false; redirectFn: undefined }
  | {
      autoRedirect: true;
      redirectFn: ((to?: string) => void) | NavigateFunction;
    }
);

export const useFirstUserSignup = ({
  appConfig,
  autoRedirect = false,
  redirectFn,
}: UseFirstUserSignupArguments) => {
  const [redirecting, setRedirecting] = useState<boolean | null>(null);
  const [isFirstUser, setIsFirstUser] = useState<boolean | null>(null);

  useEffect(() => {
    if (
      appConfig?.user?.routes?.signup?.disabled &&
      !appConfig?.user?.routes?.signupFirstUser?.disabled
    ) {
      setRedirecting(true);

      getIsFirstUser(appConfig?.apiBaseUrl || "")
        .then((response) => {
          if (response?.signUp) {
            setIsFirstUser(true);

            if (autoRedirect && redirectFn) {
              redirectFn(
                appConfig.user.routes?.signupFirstUser?.path ||
                  ROUTES.SIGNUP_FIRST_USER,
              );
            }
          } else {
            setIsFirstUser(false);
          }
        })
        .catch(() => {
          // do nothing
        })
        .finally(() => {
          setRedirecting(false);
        });
    }
  }, [appConfig, autoRedirect, redirectFn]);

  return [redirecting, isFirstUser];
};
