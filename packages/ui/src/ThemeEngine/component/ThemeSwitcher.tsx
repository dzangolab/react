import React, { useEffect } from "react";

import DropdownMenu from "@/DropdownMenu";

import { useDzThemeContext } from "../context";

export const ThemeSwitcher = ({
  label = "Theme",
  menuItems,
  className = "theme-menu",
}: {
  label?: string;
  menuItems?: {
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    [key: string]: any;
    label?: string;
    onClick?: () => void;
    key?: string;
    className?: string;
    selected?: boolean;
  }[];
  className?: string;
}) => {
  const { theme, setTheme } = useDzThemeContext();

  console.log(theme);

  return (
    <DropdownMenu
      className={className}
      dropdownMenu={{
        menuItems: menuItems || [
          {
            key: "auto",
            label: "Auto",
            onClick: () => {
              setTheme("Auto");
            },
          },
          {
            key: "light",
            label: "DzLight",
            onClick: () => {
              setTheme("DzLight");
            },
          },
          {
            key: "dark",
            label: "DzDark",
            onClick: () => {
              setTheme("DzDark");
            },
          },
        ],
      }}
      label={theme || label}
    />
  );
};
