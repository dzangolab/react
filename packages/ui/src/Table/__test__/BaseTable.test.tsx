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

test("correct page is shown relative to pagination", async () => {
  render(component);

  const pageCount = Math.ceil(biggerData.length / 10);
  expect(screen.queryByText(`1 of ${pageCount}`)).not.toBeNull();
  expect(screen.queryByText(`2 of ${pageCount}`)).toBeNull();

  const buttons = screen.getAllByRole("button") as HTMLButtonElement[];
  const startButton = buttons.at(-4);
  const previousPageButton = buttons.at(-3);
  const nextPageButton = buttons.at(-2);
  const endPageButton = buttons.at(-1);

  if (nextPageButton) {
    fireEvent.click(nextPageButton);
  }
  expect(screen.queryByText(`1 of ${pageCount}`)).toBeNull();
  expect(screen.queryByText(`2 of ${pageCount}`)).not.toBeNull();

  if (previousPageButton) {
    fireEvent.click(previousPageButton);
  }

  expect(screen.queryByText(`1 of ${pageCount}`)).not.toBeNull();
  expect(screen.queryByText(`2 of ${pageCount}`)).toBeNull();

  if (endPageButton) {
    fireEvent.click(endPageButton);
  }
  expect(screen.queryByText(`1 of ${pageCount}`)).toBeNull();
  expect(screen.queryByText(`2 of ${pageCount}`)).not.toBeNull();

  if (startButton) {
    fireEvent.click(startButton);
  }
  expect(screen.queryByText(`1 of ${pageCount}`)).not.toBeNull();
  expect(screen.queryByText(`2 of ${pageCount}`)).toBeNull();
});
