import renderer from "react-test-renderer";
import { expect, test } from "vitest";

import i18n from "../../../index";
import LocaleSwitcher from "../../LocaleSwitcher";

function toJson(component: renderer.ReactTestRenderer) {
  const result = component.toJSON();

  expect(result).toBeDefined();
  expect(result).not.toBeInstanceOf(Array);

  return result as renderer.ReactTestRendererJSON;
}

test("Component matches snapshot", () => {
  const i18nConfig = {
    appendNamespaceToCIMode: true,
    debug: true,
    defaultNS: "app",
    fallbackLng: "en",
    lng: "en",
    resources: {
      en: {},
      fr: {},
    },
    supportedLngs: ["en", "fr"],
    react: {
      useSuspense: false,
    },
    locales: "en:English,fr:Français",
  };

  i18n(i18nConfig);
  const component = renderer.create(<LocaleSwitcher />);
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});
