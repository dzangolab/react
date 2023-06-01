import { AppConfig, ConfigProvider } from "@dzangolab/react-config";
import React from "react";
import { create } from "react-test-renderer";
import { expect, test, vi } from "vitest";

import SignupForm from "../SignupForm";

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

const userConfig = {
  user: {
    supportedRoles: ["USER"],
    supportedLoginProviders: ["google"],
  },
};

test("Component matches snapshot", () => {
  const handleSubmit = vi.fn();

  const component = create(
    <ConfigProvider appConfig={userConfig as AppConfig}>
      <SignupForm handleSubmit={handleSubmit} />
    </ConfigProvider>
  );

  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});
