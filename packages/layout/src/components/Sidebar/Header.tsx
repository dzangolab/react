import { useMemo } from "react";

import useConfig from "@/hooks/useConfig";

import Logo from "../Logo";

type SidebarHeaderProperties = {
  toggle?: React.ReactNode;
  expanded: boolean;
  onToggle: () => void;
};

export const SidebarHeader = ({
  toggle,
  expanded,
  onToggle,
}: SidebarHeaderProperties) => {
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
      <span className="toggle" onClick={onToggle}>
        {toggle || <i className={expanded ? "pi pi-times" : "pi pi-bars"}></i>}
      </span>
    </div>
  );
};
