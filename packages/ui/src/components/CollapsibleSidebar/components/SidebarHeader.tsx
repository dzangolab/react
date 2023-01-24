import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";

import { useSidebar } from "@/hooks/useSidebar";

import MenuItem from "./MenuItem";

interface Properties {
  toggleIcon?: React.ReactNode;
  logo?: React.ReactNode;
}
const SidebarHeader: React.FC<Properties> = ({
  toggleIcon = (
    <GiHamburgerMenu style={{ height: "1.5rem", width: "1.5rem" }} />
  ),
  logo = <img src={"/logo.png"} alt="logo" />,
}) => {
  const { toggleSidebar } = useSidebar();

  return (
    <MenuItem handelIconClick={toggleSidebar} icon={toggleIcon} isHeader>
      <div className="logo">{logo}</div>
    </MenuItem>
  );
};

export default SidebarHeader;
