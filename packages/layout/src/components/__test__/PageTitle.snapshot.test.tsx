import renderer from "react-test-renderer";
import { expect, test } from "vitest";

import PageTitle from "../PageTitle";

function toJson(component: renderer.ReactTestRenderer) {
  const result = component.toJSON();

  expect(result).toBeDefined();
  expect(result).not.toBeInstanceOf(Array);

  return result as renderer.ReactTestRendererJSON;
}

test("Component matches snapshot", () => {
  const component = renderer.create(
    <PageTitle title="Test title" toolbar={<div>Toolbar content</div>} />
  );
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});
