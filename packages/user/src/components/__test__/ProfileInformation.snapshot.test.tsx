import React from "react";
import { create } from "react-test-renderer";
import { expect, test, vi } from "vitest";

import { userContext } from "../../context/UserProvider";
import ProfileInformation from "../ProfileInformation";

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
    user: { id: "5", email: "test@gmail.com", timeJoined: 320 },
    loading: false,
    setUser: vi.fn(),
  };

  const component = create(
    <userContext.Provider value={values}>
      <ProfileInformation />
    </userContext.Provider>
  );

  const tree = toJson(component);

  expect(tree).toMatchSnapshot();
});
