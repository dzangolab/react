import { useMemo } from "react";

import useConfig from "@/hooks/useConfig";

import Logo from "../Logo";

type SidebarHeaderProperties = {};

export const SidebarHeader = ({}: SidebarHeaderProperties) => {
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
