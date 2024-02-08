import { useEffect, useState } from "react";
import { NavigateFunction } from "react-router-dom";

import { getIsFirstUser } from "@/api/user";
import { ROUTES } from "@/constants";

export const useFirstUserSignupRedirection = ({
  appConfig,
  navigate,
}: {
  appConfig: any; // TODO proper typing
  navigate: NavigateFunction;
}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      appConfig?.routes?.signup?.disabled &&
      !appConfig?.routes?.signupFirstUser?.disabled
    ) {
      setLoading(true);
      getIsFirstUser(appConfig?.apiBaseUrl || "")
        .then((response) => {
          if (response?.signUp) {
            navigate(
              appConfig.user.routes?.signupFirstUser?.path ||
                ROUTES.SIGNUP_FIRST_USER,
            );
          }
        })
        .catch(() => {
          // do nothing
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [appConfig, navigate]);

  return [loading];
};
