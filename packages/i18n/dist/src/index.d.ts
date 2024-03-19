import { useTranslation } from "react-i18next";
import LocaleSwitcher from "./components/LocaleSwitcher";
import type { InitOptions } from "i18next";
declare const plugin: (options: InitOptions) => void;
declare module "@dzangolab/react-config" {
    interface AppConfig {
        i18n: InitOptions;
    }
}
export default plugin;
export { LocaleSwitcher, useTranslation };
//# sourceMappingURL=index.d.ts.map