import { create } from "react-test-renderer";
import { expect, test } from "vitest";

import Copyright from "../Copyright";

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
    <Copyright
      holder={"Dzango technologies"}
      url={"https://www.dzangolab.com"}
      year={2022}
    />,
  );
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});
