import DropdownUserMenu from "./DropdownUserMenu";
import SignInUpMenu from "./SignInUpMenu";
import { isEmailVerificationEnabled } from "..";
import { useConfig, useUser } from "../hooks";

interface Properties {
  authenticatedUserMenu?: React.ReactNode;
  anonymousUserMenu?: React.ReactNode;
}

const UserMenu = (properties: Properties) => {
  const {
    authenticatedUserMenu = <DropdownUserMenu />,
    anonymousUserMenu = <SignInUpMenu />,
  } = properties;

  const { user } = useUser();
  const config = useConfig();

  const renderUserMenu = () => {
    if (user) {
      if (!isEmailVerificationEnabled(config)) {
        return authenticatedUserMenu;
      } else {
        if (!user.isEmailVerified) {
          return null;
        }

        return authenticatedUserMenu;
      }
    }

    return anonymousUserMenu;
  };

  return <>{renderUserMenu()}</>;
};

export default UserMenu;
