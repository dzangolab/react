import { FacebookButton } from "@dzangolab/react-ui";
import React from "react";

import { facebookLogin } from "@/supertokens";

interface Properties {
  label: string;
  redirectUrl: string;
}

export const FacebookLogin = ({ label, redirectUrl }: Properties) => {
  const onFacebookSignin = async () => {
    await facebookLogin(redirectUrl);
  };

  return (
    <FacebookButton
      handleClick={onFacebookSignin}
      title={label}
      variant="dark"
    />
  );
};
