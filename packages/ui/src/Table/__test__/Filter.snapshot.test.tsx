import React from "react";
import renderer, { create } from "react-test-renderer";
import { expect, test, vi } from "vitest";

import Filter from "../common/Filter";

const mockFunction = vi.fn();

function toJson(component: renderer.ReactTestRenderer) {
  const result = component.toJSON();

  expect(result).toBeDefined();
  expect(result).not.toBeInstanceOf(Array);

  return result as renderer.ReactTestRendererJSON;
}

test("Component matches snapshot", () => {
  const component = create(
    <Filter columnType="string" handleChange={mockFunction} />,
  );
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});
