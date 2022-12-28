import React from "react";

import googleLogin from "@/supertokens/google-login";

interface Properties {
  className?: string;
  label: string;
  redirectUrl: string;
}

const GoogleLogin = ({ className, label, redirectUrl }: Properties) => {
  const onGoogleSignin = async () => {
    await googleLogin(redirectUrl);
  };

  return (
    <button className={className} onClick={onGoogleSignin}>
      {label}
    </button>
  );
};

export default GoogleLogin;
