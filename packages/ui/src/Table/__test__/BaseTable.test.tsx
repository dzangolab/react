import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";

import { columns, data, fetcher } from "./TestTableData";
import { BaseTable, Table } from "../index";

const component = (
  <Table
    columns={columns}
    data={data}
    fetcher={fetcher}
    totalItems={data.length}
    rowsPerPageOptions={[10]}
  >
    <BaseTable />
  </Table>
);

test("pagination works correctly", async () => {
  render(component);

  expect(screen.queryByText("4")).not.toBeNull();
  expect(screen.queryByText("5")).toBeNull();

  const buttons = screen.getAllByRole("button") as HTMLButtonElement[];
  const startButton = buttons.at(-4);
  const previousPageButton = buttons.at(-3);
  const nextPageButton = buttons.at(-2);
  const endPageButton = buttons.at(-1);

  if (nextPageButton) {
    fireEvent.click(nextPageButton);
  }
});
