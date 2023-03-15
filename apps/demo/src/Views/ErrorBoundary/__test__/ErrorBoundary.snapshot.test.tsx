import renderer from "react-test-renderer";
import { expect, test } from "vitest";

import ErrorBoundary from "../index";

vi.mock("react-router-dom", async () => ({
  ...((await vi.importActual("react-router-dom")) as any),
  useRouteError: () => ({ statusText: 404, message: "Not Found" }),
}));

function toJson(component: renderer.ReactTestRenderer) {
  const result = component.toJSON();

  expect(result).toBeDefined();
  expect(result).not.toBeInstanceOf(Array);

  return result as renderer.ReactTestRendererJSON;
}

test("Component matches snapshot", async () => {
  const component = renderer.create(<ErrorBoundary />);
  let tree = toJson(component);
  expect(tree).toMatchSnapshot();
});
