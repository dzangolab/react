import renderer from "react-test-renderer";
import { expect, test } from "vitest";

import Version from "../Version";

function toJson(component: renderer.ReactTestRenderer) {
  const result = component.toJSON();

  expect(result).toBeDefined();
  expect(result).not.toBeInstanceOf(Array);

  return result as renderer.ReactTestRendererJSON;
}

test("Component matches snapshot", () => {
  const component = renderer.create(<Version version="0.0.1-local" />);
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});
