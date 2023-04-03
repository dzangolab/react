import React from "react";

import googleLogin from "@/supertokens/google-login";
import { GoogleButton } from "@dzangolab/react-ui";

interface Properties {
  label: string;
  redirectUrl: string;
}

const GoogleLogin = ({ label, redirectUrl }: Properties) => {
  const onGoogleSignin = async () => {
    await googleLogin(redirectUrl);
  };

  return <GoogleButton handleClick={onGoogleSignin} title={label} />;
};

export default GoogleLogin;
