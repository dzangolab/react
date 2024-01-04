import React from "react";

import Copyright from "./Copyright";
import Version from "./Version";
import useConfig from "../hooks/useConfig";

interface Properties {
  copyright?: React.ReactNode;
  version?: React.ReactNode;
  isLayoutFixed?: boolean;
}

const year = new Date().getFullYear();

const AppFooter: React.FC<Properties> = (properties: Properties) => {
  const appConfig = useConfig();

  const {
    copyright = (
      <Copyright
        holder={appConfig?.copyright?.holder}
        url={appConfig?.copyright?.url}
        year={year}
      />
    ),
    version = <Version version={appConfig?.appVersion} />,
    isLayoutFixed,
  } = properties;

  return (
    <footer className={isLayoutFixed ? "fixed-footer" : ""}>
      {copyright}
      {version}
    </footer>
  );
};

export default AppFooter;
