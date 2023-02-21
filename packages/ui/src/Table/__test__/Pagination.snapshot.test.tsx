import React from "react";
import renderer, { create } from "react-test-renderer";
import { expect, test, vi } from "vitest";

import Pagination from "../Pagination";

const mockFunction = vi.fn();

const config = [
  {
    onClick: mockFunction,
    isDisabled: true,
    icon: "start.png",
  },
  {
    onClick: mockFunction,
    isDisabled: true,
    icon: "previous.png",
  },
  {
    onClick: mockFunction,
    isDisabled: false,
    icon: "next.png",
  },
  {
    onClick: mockFunction,
    isDisabled: false,
    icon: "end.png",
  },
];

function toJson(component: renderer.ReactTestRenderer) {
  const result = component.toJSON();

  expect(result).toBeDefined();
  expect(result).not.toBeInstanceOf(Array);

  return result as renderer.ReactTestRendererJSON;
}

test("Component matches snapshot", () => {
  const component = create(<Pagination config={config} />);
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});
