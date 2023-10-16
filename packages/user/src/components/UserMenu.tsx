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
  const [emailVerificationEnabled, userEmailVerified] = useEmailVerification();

  const renderUserMenu = () => {
    if (!user) {
      return anonymousUserMenu;
    }

    if (emailVerificationEnabled && !userEmailVerified) {
      return null;
    }

    return authenticatedUserMenu;
  };

  return <>{renderUserMenu()}</>;
};

export default UserMenu;
