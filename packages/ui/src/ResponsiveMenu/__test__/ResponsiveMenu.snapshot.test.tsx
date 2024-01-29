import React from "react";
import { create } from "react-test-renderer";
import { expect, test } from "vitest";

import ResponsiveMenu from "../index";

import type {
  ReactTestRenderer,
  ReactTestRendererJSON,
} from "react-test-renderer";

export const menuRoutes = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "About",
    route: "/about",
  },
];

function toJson(component: ReactTestRenderer) {
  const result = component.toJSON();

  expect(result).toBeDefined();
  expect(result).not.toBeInstanceOf(Array);

  return result as ReactTestRendererJSON;
}

test("Component matches snapshot", () => {
  const component = create(<ResponsiveMenu routes={menuRoutes} />);
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});
