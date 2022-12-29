import React from "react";

import { AppConfig } from "..";

interface Properties {
  children: React.ReactNode;
  appConfig?: AppConfig;
}

const configContext = React.createContext<AppConfig | undefined>(undefined);

const ConfigProvider = ({ children, appConfig }: Properties) => {
  return (
    <configContext.Provider value={appConfig}>
      {children}
    </configContext.Provider>
  );
};

export default ConfigProvider;
export { configContext };
