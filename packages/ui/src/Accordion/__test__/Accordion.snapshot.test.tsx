import React from "react";
import renderer, { create } from "react-test-renderer";
import { expect, test } from "vitest";

import { SubPane } from "../../components/SubPane";
import Accordion from "../Accordion";

function toJson(component: renderer.ReactTestRenderer) {
  const result = component.toJSON();

  expect(result).toBeDefined();
  expect(result).not.toBeInstanceOf(Array);

  return result as renderer.ReactTestRendererJSON;
}

test("Component matches snapshot", () => {
  const component = create(
    <Accordion activeIcon="arrow-down.jpg" inactiveIcon="arrow-up.jpg">
      <SubPane icon="icon1.jpg" title="Topic 1">
        Pane 1 content
      </SubPane>
      <SubPane icon="icon2.jpg" title="Topic 2">
        Pane 2 content
      </SubPane>
    </Accordion>,
  );
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});
