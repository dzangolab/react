import React from "react";

import { Copyright, Version } from "./Layout";

interface Properties {
  copyright?: React.ReactNode;
  version?: React.ReactNode;
}

const AppFooter: React.FC<Properties> = (properties: Properties) => {
  const { copyright = <Copyright />, version = <Version /> } = properties;

  return (
    <footer>
      {copyright}
      {version}
    </footer>
  );
};

export default AppFooter;
