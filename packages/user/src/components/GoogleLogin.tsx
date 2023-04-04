import { GoogleButton } from "@dzangolab/react-ui";
import React from "react";

import googleLogin from "@/supertokens/google-login";

interface Properties {
  label: string;
  redirectUrl: string;
}

const GoogleLogin = ({ label, redirectUrl }: Properties) => {
  const onGoogleSignin = async () => {
    await googleLogin(redirectUrl);
  };

  return (
    <GoogleButton handleClick={onGoogleSignin} title={label} variant="dark" />
  );
};

export default GoogleLogin;
