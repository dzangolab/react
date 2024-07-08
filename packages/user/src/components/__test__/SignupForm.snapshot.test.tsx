import { AppConfig, ConfigProvider } from "@dzangolab/react-config";
import { render } from "@testing-library/react";
import React from "react";
import { expect, test, vi } from "vitest";

import SignupForm from "../SignupForm";

const userConfig = {
  user: {
    supportedRoles: ["USER"],
    supportedLoginProviders: ["google"],
  },
};

test("Component matches snapshot", () => {
  const handleSubmit = vi.fn();

  const { container } = render(
    <ConfigProvider appConfig={userConfig as AppConfig}>
      <SignupForm handleSubmit={handleSubmit} />
    </ConfigProvider>,
  );

  expect(container).toMatchSnapshot();
});
