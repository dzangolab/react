import React from "react";
import renderer from "react-test-renderer";
import { expect, test } from "vitest";

import ChangePasswordForm from "../ChangePasswordForm";

function toJson(component: renderer.ReactTestRenderer) {
  const result = component.toJSON();

  expect(result).toBeDefined();
  expect(result).not.toBeInstanceOf(Array);

  return result as renderer.ReactTestRendererJSON;
}

test("Component matches snapshot", () => {
  const component = renderer.create(
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    <ChangePasswordForm handleSubmit={() => {}} />
  );

  const tree = toJson(component);

  expect(tree).toMatchSnapshot();
});
