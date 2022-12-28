import React from "react";

import Copyright from "./Copyright";
import Version from "./Version";

import type { AppConfig } from "@dzangolab/react-config";

import "../css/components/app-footer.css";

interface Properties {
  config: AppConfig;
  copyright?: React.ReactNode;
  version?: React.ReactNode;
}

const AppFooter: React.FC<Properties> = (properties: Properties) => {
  const { config } = properties;

  const {
    copyright = (
      <Copyright
        holder={config?.copyright?.holder}
        url={config?.copyright?.url}
      />
    ),
    version = <Version version={config.appVersion} />,
  } = properties;

  return (
    <footer>
      {copyright}
      {version}
    </footer>
  );
};

export default AppFooter;
