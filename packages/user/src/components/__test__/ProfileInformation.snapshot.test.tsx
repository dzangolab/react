import React from "react";
import renderer from "react-test-renderer";
import { expect, test, vi } from "vitest";

import { userContext } from "../../context/UserProvider";
import ProfileInformation from "../ProfileInformation";

function toJson(component: renderer.ReactTestRenderer) {
  const result = component.toJSON();

  expect(result).toBeDefined();
  expect(result).not.toBeInstanceOf(Array);

  return result as renderer.ReactTestRendererJSON;
}

test("Component matches snapshot", () => {
  const values = {
    user: { id: "5", email: "test@gmail.com", timeJoined: 320 },
    loading: false,
    setUser: vi.fn(),
  };

  const component = renderer.create(
    <userContext.Provider value={values}>
      <ProfileInformation />
    </userContext.Provider>
  );

  const tree = toJson(component);

  expect(tree).toMatchSnapshot();
});
