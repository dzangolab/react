import React from "react";
import renderer, { create } from "react-test-renderer";
import { expect, test } from "vitest";

import { biggerData, columns, fetcher } from "./TestTableData";
import { BaseTable, Table } from "../index";

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
      data={biggerData}
      fetcher={fetcher}
      totalItems={biggerData.length}
      rowsPerPageOptions={[5, 10]}
    >
      <BaseTable />
    </Table>
  );
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});
