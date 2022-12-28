import React from "react";
import renderer from "react-test-renderer";
import { expect, test } from "vitest";

import UserProvider from "../../context/UserProvider";
import DropdownUserMenu from "../DropdownUserMenu";

function toJson(component: renderer.ReactTestRenderer) {
  const result = component.toJSON();

  expect(result).toBeDefined();
  expect(result).not.toBeInstanceOf(Array);

  return result as renderer.ReactTestRendererJSON;
}

test("Component matches snapshot", () => {
  const component = renderer.create(
    <UserProvider>
      <DropdownUserMenu />
    </UserProvider>
  );
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});
