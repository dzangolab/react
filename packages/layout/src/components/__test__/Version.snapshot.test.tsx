import { create } from "react-test-renderer";
import { expect, test } from "vitest";

import Version from "../Version";

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
  const component = create(<Version version="0.0.1-local" />);
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});
