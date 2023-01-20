import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import MenuItem from "./MenuItem";

interface Properties {
  toggle: () => void;
  toggleIcon?: React.ReactNode;
  logo?: React.ReactNode;
}
const SidebarHeader: React.FC<Properties> = ({
  toggle,
  toggleIcon = (
    <GiHamburgerMenu style={{ height: "1.5rem", width: "1.5rem" }} />
  ),
  logo = <img src={"/logo.png"} alt="logo" />,
}) => {
  return (
    <header>
      <MenuItem handelIconClick={toggle} icon={toggleIcon} isHeader>
        <div className="logo">{logo}</div>
      </MenuItem>
    </header>
  );
};

export default SidebarHeader;
