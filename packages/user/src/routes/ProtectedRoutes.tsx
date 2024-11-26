import { Route } from "react-router-dom";

import { useConfig, useEmailVerification } from "@/hooks";
import { ProtectedRoutesProperties } from "@/types/routes";
import { ChangePassword } from "@/views/ChangePassword";
import { EmailVerificationReminder } from "@/views/EmailVerificationReminder";
import { Profile } from "@/views/Profile";
import { VerifyEmail } from "@/views/VerifyEmail";

import { DEFAULT_PATHS } from "./routes";

export const ProtectedRoutes = ({ routes }: ProtectedRoutesProperties) => {
  const config = useConfig();
  const [emailVerificationEnabled] = useEmailVerification();

  const {
    changePassword,
    emailVerificationReminder,
    emailVerificationVerify,
    profile,
  } = routes || {};

  const { customPaths } = config;

  const protectedRoutes = [
    {
      path: customPaths?.changePassword || DEFAULT_PATHS.CHANGE_PASSWORD,
      element: changePassword?.element || <ChangePassword />,
    },
    {
      path:
        customPaths?.emailVerificationReminder ||
        DEFAULT_PATHS.EMAIL_VERIFICATION_REMINDER,
      element: emailVerificationReminder?.element || (
        <EmailVerificationReminder />
      ),
      disabled: !emailVerificationEnabled,
    },
    {
      path:
        customPaths?.emailVerificationVerify ||
        DEFAULT_PATHS.EMAIL_VERIFICATION_VERIFY,
      element: emailVerificationVerify?.element || <VerifyEmail />,
      disabled: !emailVerificationEnabled,
    },
    {
      path: customPaths?.profile || DEFAULT_PATHS.PROFILE,
      element: profile?.element || <Profile />,
    },
  ];

  return (
    <>
      {protectedRoutes.map((route) =>
        !route.disabled ? (
          <Route key={route.path} path={route.path} element={route.element} />
        ) : null,
      )}
    </>
  );
};
