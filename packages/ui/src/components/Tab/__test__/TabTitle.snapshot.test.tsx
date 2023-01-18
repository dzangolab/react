import React from "react";
import renderer, { create } from "react-test-renderer";
import { expect, test } from "vitest";

import TabTitle from "../TabTitle";

function toJson(component: renderer.ReactTestRenderer) {
  const result = component.toJSON();

  expect(result).toBeDefined();
  expect(result).not.toBeInstanceOf(Array);

  return result as renderer.ReactTestRendererJSON;
}

test("Component matches snapshot", () => {
  const component = create(
    <TabTitle
      title="tab title"
      eventKey={1}
      selected={1}
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      setSelectedTab={() => {}}
    />
  );
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});
