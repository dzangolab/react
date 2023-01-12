import { AppConfig, configContext } from "@dzangolab/react-config";
import i18n from "@dzangolab/react-i18n";
import { userContext } from "@dzangolab/react-user";
import renderer from "react-test-renderer";
import { expect, test, vi } from "vitest";

import AppHeader from "../AppHeader";

function toJson(component: renderer.ReactTestRenderer) {
  const result = component.toJSON();

  expect(result).toBeDefined();
  expect(result).not.toBeInstanceOf(Array);

  return result as renderer.ReactTestRendererJSON;
}

const appConfig: AppConfig = {
  apiBaseUrl: "/",
  app: {
    logo: "/logo.png",
    name: "Dzango Skeletons",
    version: "0.0.1-local",
  },
  appPort: "20072",
  appTitle: "Dzango Skeletons",
  appVersion: "0.0.1",
  features: {
    showVersion: true,
  },
  home: {
    anon: "/",
    auth: "/",
  },
  i18n: {
    appendNamespaceToCIMode: true,
    debug: true,
    defaultNS: "app",
    fallbackLng: "en",
    supportedLngs: ["en", "fr"],
    react: {
      useSuspense: false,
    },
    resources: {
      en: {},
      fr: {},
    },
  },
  locales: "en:English,fr:Français",
  localStorageNamespace: "__app_",
  websiteDomain: "//",
};

test("Component matches snapshot", () => {
  i18n(appConfig.i18n);

  const user = undefined;
  const values = {
    user,
    setUser: vi.fn(),
    loading: false,
  };

  const component = renderer.create(
    <userContext.Provider value={values}>
      <configContext.Provider value={appConfig}>
        <AppHeader />
      </configContext.Provider>
    </userContext.Provider>
  );

  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});
