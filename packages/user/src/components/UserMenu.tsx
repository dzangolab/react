import { useContext } from "react";

import { UserContextType } from "@/types";

import { userContext } from "../context/UserProvider";
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

  const { user } = useContext(userContext) as UserContextType;

  return <>{user ? authenticatedUserMenu : anonymousUserMenu}</>;
};

export default UserMenu;
