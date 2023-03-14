import React from "react";

import Copyright from "./Copyright";
import Version from "./Version";
import useConfig from "../hooks/useConfig";

import "../assets/css/components/app-footer.css";

interface Properties {
  copyright?: React.ReactNode;
  version?: React.ReactNode;
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
  } = properties;

  return (
    <footer>
      {copyright}
      {version}
    </footer>
  );
};

export default AppFooter;
