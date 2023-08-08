import React from "react";
import { create } from "react-test-renderer";
import { expect, test, vi } from "vitest";

import { userContext } from "../../context/UserProvider";
import DropdownUserMenu from "../DropdownUserMenu";

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

test("Component matches snapshot", () => {
  const values = {
    setUser: vi.fn(),
    user: {
      id: "5",
      email: "test@gmail.com",
      timeJoined: 320,
      middleNames: null,
      lastLoginAt: 0,
      signedUpAt: 0,
      surname: "name",
      givenName: "test",
      roles: ["USER"],
    },
    loading: false,
  };

  const component = create(
    <userContext.Provider value={values}>
      <DropdownUserMenu />
    </userContext.Provider>,
  );
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});
