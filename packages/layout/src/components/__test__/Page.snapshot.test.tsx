import renderer from "react-test-renderer";
import { expect, test } from "vitest";

import Page from "../Page";

function toJson(component: renderer.ReactTestRenderer) {
  const result = component.toJSON();

  expect(result).toBeDefined();
  expect(result).not.toBeInstanceOf(Array);

  return result as renderer.ReactTestRendererJSON;
}

test("Component matches snapshot", () => {
  const component = renderer.create(
    <Page
      title="Test title"
      subTitle="Test subtitle"
      toolbar={<div>Toolbar content</div>}
    />
  );
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});
