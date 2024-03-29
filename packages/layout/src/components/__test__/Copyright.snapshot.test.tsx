import { AppConfig, configContext } from "@dzangolab/react-config";
import i18n from "@dzangolab/react-i18n";
import { create } from "react-test-renderer";
import { expect, test } from "vitest";

import { Copyright } from "../Layout";

import type {
  ReactTestRenderer,
  ReactTestRendererJSON,
} from "react-test-renderer";

function toJson(component: ReactTestRenderer) {
  const result = component.toJSON();

  expect(result).toBeDefined();
  expect(result).not.toBeInstanceOf(Array);

  return result as ReactTestRendererJSON;
}

const appConfig: AppConfig = {
  apiBaseUrl: "/",
  appPort: "20072",
  appTitle: "Dzango Skeletons",
  appVersion: "0.0.1",
  features: {
    showVersion: true,
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
    resources: { en: {}, fr: {} },
  },
  websiteDomain: "//",
  copyright: {
    holder: "Dzango",
    url: "www.dzango.com",
  },
};

test("Component matches snapshot", () => {
  i18n(appConfig.i18n);

  const component = create(
    <configContext.Provider value={appConfig}>
      <Copyright year={2024} />
    </configContext.Provider>,
  );

  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});
