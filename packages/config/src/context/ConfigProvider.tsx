import React, { createContext } from "react";

import { AppConfig } from "../types";

interface Properties {
  children: React.ReactNode;
  appConfig: AppConfig;
}

const configContext = createContext<AppConfig | undefined>(undefined);

let appConfig = {} as AppConfig;

const setConfig = (config: AppConfig) => {
  appConfig = config;
};

const getConfig = () => appConfig;

const ConfigProvider = ({ children, appConfig }: Properties) => {
  setConfig(appConfig);
  return (
    <configContext.Provider value={appConfig}>
      {children}
    </configContext.Provider>
  );
};

export default ConfigProvider;
export { configContext, getConfig };
