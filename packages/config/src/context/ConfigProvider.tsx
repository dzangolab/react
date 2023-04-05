import React, { createContext } from "react";

import { AppConfig } from "../types";

interface Properties {
  children: React.ReactNode;
  appConfig: AppConfig;
}

const configContext = createContext<AppConfig | undefined>(undefined);

const ConfigProvider = ({ children, appConfig }: Properties) => {
  return (
    <configContext.Provider value={appConfig}>
      {children}
    </configContext.Provider>
  );
};

export default ConfigProvider;
export { configContext };
