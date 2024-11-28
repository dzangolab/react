import { Route } from "react-router-dom";

import { AuthGoogleCallback } from "@/components/AuthGoogleCallback";
import { DEFAULT_PATHS } from "@/constants";
import { useConfig } from "@/hooks";
import { PublicRoutesProperties } from "@/types/routes";
import { AcceptInvitation } from "@/views/AcceptInvitation";
import { ForgotPassword } from "@/views/ForgotPassword";
import { Login } from "@/views/Login";
import { ResetPassword } from "@/views/ResetPassword";
import { Signup } from "@/views/Signup";
import { SignUpFirstUser } from "@/views/SignUpFirstUser";

export const getUserPublicRoutes = (options?: PublicRoutesProperties) => {
  const config = useConfig();

  const {
    acceptInvitation,
    authCallbackGoogle,
    forgotPassword,
    login,
    resetPassword,
    signup,
    signupFirstUser,
  } = options?.routes || {};

  const { customPaths } = config;

  const forgotPasswordEnabled = config.features?.forgotPassword !== false;
  const signupEnabled = config.features?.signup !== false;
  const signupFirstUserEnabled =
    !signupEnabled && config.features?.signupFirstUser !== false;
  const authCallbackGoogleEnabled =
    config.socialLoginProviders?.includes("google");

  const publicRoutes = [
    {
      path: customPaths?.login || DEFAULT_PATHS.LOGIN,
      element: login?.element || <Login />,
    },
    {
      path: customPaths?.signup || DEFAULT_PATHS.SIGNUP,
      element: signup?.element || <Signup />,
      disabled: !signupEnabled,
    },
    {
      path: customPaths?.signupFirstUser || DEFAULT_PATHS.SIGNUP_FIRST_USER,
      element: signupFirstUser?.element || <SignUpFirstUser />,
      disabled: !signupFirstUserEnabled,
    },
    {
      path: customPaths?.resetPassword || DEFAULT_PATHS.RESET_PASSWORD,
      element: resetPassword?.element || <ResetPassword />,
    },
    {
      path: customPaths?.forgotPassword || DEFAULT_PATHS.FORGOT_PASSWORD,
      element: forgotPassword?.element || <ForgotPassword />,
      disabled: !forgotPasswordEnabled,
    },
    {
      path:
        customPaths?.authCallbackGoogle || DEFAULT_PATHS.AUTH_CALLBACK_GOOGLE,
      element: authCallbackGoogle?.element || <AuthGoogleCallback />,
      disabled: !authCallbackGoogleEnabled,
    },
    {
      path: customPaths?.acceptInvitation || DEFAULT_PATHS.ACCEPT_INVITATION,
      element: acceptInvitation?.element || <AcceptInvitation />,
    },
  ];

  return (
    <>
      {publicRoutes.map((route) =>
        !route.disabled ? (
          <Route key={route.path} path={route.path} element={route.element} />
        ) : null,
      )}
    </>
  );
};
