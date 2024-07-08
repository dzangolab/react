import { AppConfig, configContext } from "@dzangolab/react-config";
import i18n from "@dzangolab/react-i18n";
import { render } from "@testing-library/react";
import { expect, test } from "vitest";

import { Version } from "../Layout";

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

  const { container } = render(
    <configContext.Provider value={appConfig}>
      <Version version="1.0.0+local" />
    </configContext.Provider>,
  );

  expect(container).toMatchSnapshot();
});
