import React from "react";
import renderer, { create } from "react-test-renderer";
import { expect, test } from "vitest";

import Tab from "../Tab";

function toJson(component: renderer.ReactTestRenderer) {
  const result = component.toJSON();

  expect(result).toBeDefined();
  expect(result).not.toBeInstanceOf(Array);

  return result as renderer.ReactTestRendererJSON;
}

test("Component matches snapshot", () => {
  const component = create(
    <Tab
      title="Topic 1"
      icon="icon1.jpg"
      index={1}
      isActive={true}
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      handleClick={() => {}}
    />
  );
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});
