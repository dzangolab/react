import React from "react";
import { AppConfig } from "../types";
interface Properties {
    children: React.ReactNode;
    appConfig: AppConfig;
}
declare const configContext: React.Context<AppConfig | undefined>;
declare const ConfigProvider: ({ children, appConfig }: Properties) => React.JSX.Element;
export default ConfigProvider;
export { configContext };
//# sourceMappingURL=ConfigProvider.d.ts.map