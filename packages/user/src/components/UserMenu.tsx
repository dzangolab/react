import { useSelector } from "react-redux";

import DropdownUserMenu from "./DropdownUserMenu";
import SignInUpMenu from "./SignInUpMenu";

interface Properties {
  authenticatedUserMenu?: React.ReactNode;
  anonymousUserMenu?: React.ReactNode;
}

const UserMenu = (properties: Properties) => {
  const {
    authenticatedUserMenu = <DropdownUserMenu />,
    anonymousUserMenu = <SignInUpMenu />,
  } = properties;

  const { user } = useSelector((state: any) => state.auth);

  return <>{user ? authenticatedUserMenu : anonymousUserMenu}</>;
};

export default UserMenu;
