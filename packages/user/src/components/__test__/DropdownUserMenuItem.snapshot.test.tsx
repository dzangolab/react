import React from "react";
import { create } from "react-test-renderer";
import { expect, test } from "vitest";

import DropdownUserMenuItem from "../DropdownUserMenuItem";

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
  const component = create(<DropdownUserMenuItem>test</DropdownUserMenuItem>);
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});
