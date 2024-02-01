import useConfig from "@/hooks/useConfig";
import { useMemo } from "react";
import Logo from "../Logo";

type SidebarHeaderProps = {};

export const SidebarHeader = ({}: SidebarHeaderProps) => {
  const { appName, layout: layoutConfig } = useConfig();

  const parseLogoAlt = useMemo(() => {
    if (!appName) {
      return;
    }

    return appName.replace("@", "").replace("/", " ");
  }, [appName]);

  return (
    <div className="header">
      <Logo
        src={layoutConfig?.logo}
        route={layoutConfig?.logoRoute || layoutConfig?.homeRoute}
        alt={layoutConfig?.logoAlt || parseLogoAlt}
      />
    </div>
  );
};
