import React from "react";
import renderer, { create } from "react-test-renderer";
import { expect, test, vi } from "vitest";

import { columns, data, fetcher } from "./TestTableData";
import Filter from "../common/Filter";
import { Table } from "../index";

const mockFunction = vi.fn();

function toJson(component: renderer.ReactTestRenderer) {
  const result = component.toJSON();

  expect(result).toBeDefined();
  expect(result).not.toBeInstanceOf(Array);

  return result as renderer.ReactTestRendererJSON;
}

test("Component matches snapshot", () => {
  const component = create(
    <Table
      columns={columns}
      data={data}
      fetcher={fetcher}
      totalItems={data.length}
    >
      {/* <Filter column={} /> */}
    </Table>
  );
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});
