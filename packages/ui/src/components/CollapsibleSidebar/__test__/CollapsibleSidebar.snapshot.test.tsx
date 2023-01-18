import React from "react";
import renderer, { create } from "react-test-renderer";
import { expect, test } from "vitest";

import Sidebar from "..";

function toJson(component: renderer.ReactTestRenderer) {
  const result = component.toJSON();

  expect(result).toBeDefined();
  expect(result).not.toBeInstanceOf(Array);

  return result as renderer.ReactTestRendererJSON;
}

test("Component matches snapshot sidebar closed", () => {
  const component = create(
    <Sidebar open={false}>
      <ul>
        <li>Home</li>
        <li>About</li>
      </ul>
    </Sidebar>
  );
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});

test("Component matches snapshot sidebar open", () => {
  const component = create(
    <Sidebar open={true}>
      <ul>
        <li>Home</li>
        <li>About</li>
      </ul>
    </Sidebar>
  );
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});
