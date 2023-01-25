import { create } from "react-test-renderer";
import { expect, test } from "vitest";

import Page from "../Page";

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
  const component = create(
    <Page
      title="Test title"
      subTitle="Test subtitle"
      toolbar={<div>Toolbar content</div>}
    />
  );
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});
