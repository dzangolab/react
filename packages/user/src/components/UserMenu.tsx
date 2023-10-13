import DropdownUserMenu from "./DropdownUserMenu";
import SignInUpMenu from "./SignInUpMenu";
import { useUser, useEmailVerification } from "../hooks";

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
  const { emailVerificationEnabled, userEmailVerified } =
    useEmailVerification();

  const renderUserMenu = () => {
    if (user) {
      if (!emailVerificationEnabled) {
        return authenticatedUserMenu;
      } else {
        if (!userEmailVerified) {
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
