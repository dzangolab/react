import { createContext } from "react";

import { AppConfig } from "..";

import type { ReactNode } from "react";
interface Properties {
  children: ReactNode;
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
