import { AuthMenu } from "./AuthMenu";
import DropdownUserMenu from "./DropdownUserMenu";
import { useUser } from "../hooks";

interface Properties {
  authenticatedUserMenu?: React.ReactNode;
  anonymousUserMenu?: React.ReactNode;
}

const UserMenu: React.FC<Properties> = (properties: Properties) => {
  const {
    authenticatedUserMenu = <DropdownUserMenu />,
    anonymousUserMenu = <AuthMenu />,
  } = properties;
  const { user } = useUser();

  return user ? authenticatedUserMenu : anonymousUserMenu;
};

export default UserMenu;
