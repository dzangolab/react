import React from "react";
import renderer, { create } from "react-test-renderer";
import { expect, test } from "vitest";

import Table from "../TableProvider";

const columns = [
  {
    accessorKey: "id",
    header: () => <span>ID</span>,
  },
  {
    accessorKey: "name",
    header: () => <span>Name</span>,
  },
];

const data = [
  { id: 1, name: "jone" },
  { id: 2, name: "abhi" },
  { id: 3, name: "mike" },
  { id: 4, name: "tony" },
];

const fetcher = () => {
  return data;
};

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
    />
  );
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});
