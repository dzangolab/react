import { configContext } from "@dzangolab/react-config";
import React, { useContext } from "react";

import Copyright from "./Copyright";
import Version from "./Version";

import "../css/components/app-footer.css";

interface Properties {
  copyright?: React.ReactNode;
  version?: React.ReactNode;
}

const year = new Date().getFullYear();

const AppFooter: React.FC<Properties> = (properties: Properties) => {
  const appConfig = useContext(configContext);

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
