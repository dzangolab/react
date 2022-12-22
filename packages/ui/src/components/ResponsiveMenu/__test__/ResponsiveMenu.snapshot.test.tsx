import React from "react";
import renderer from "react-test-renderer";
import { expect, test } from "vitest";

import ResponsiveMenu from "../index";

export const menuRoutes = [
  {
    name: "Home",
    route: "/",
  },
  {
    name: "About",
    route: "/about",
  },
];

function toJson(component: renderer.ReactTestRenderer) {
  const result = component.toJSON();

  expect(result).toBeDefined();
  expect(result).not.toBeInstanceOf(Array);

  return result as renderer.ReactTestRendererJSON;
}

test("Component matches snapshot", () => {
  const component = renderer.create(<ResponsiveMenu routes={menuRoutes} />);
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});
