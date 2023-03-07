import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";

import { biggerData, columns, fetcher } from "./TestTableData";
import { BaseTable, Table } from "../index";

const component = (
  <Table
    columns={columns}
    data={biggerData}
    fetcher={fetcher}
    totalItems={biggerData.length}
    rowsPerPageOptions={[10]}
  >
    <BaseTable />
  </Table>
);

test("correct option is selected on change", async () => {
  render(component);

  const option = screen.getAllByRole("option") as HTMLSelectElement[];
  fireEvent.change(option[0], { target: { value: 20 } });
  expect(option[0].value).toBe("20");
});
