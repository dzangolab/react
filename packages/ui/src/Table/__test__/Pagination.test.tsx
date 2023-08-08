import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";

import { biggerData, columns, fetcher } from "./TestTableData";
import Pagination from "../common/Pagination";
import { Table } from "../index";

const component = (
  <Table
    columns={columns}
    data={biggerData}
    fetcher={fetcher}
    totalItems={biggerData.length}
  >
    <Pagination />
  </Table>
);

test("correct buttons are disabled", async () => {
  render(component);

  const paginationButtons = screen.getAllByRole(
    "button"
  ) as HTMLButtonElement[];

  expect(paginationButtons[0].disabled).toBe(true);
  expect(paginationButtons[1].disabled).toBe(true);
  expect(paginationButtons[2].disabled).toBe(false);
  expect(paginationButtons[3].disabled).toBe(false);

  fireEvent.click(paginationButtons[2]);

  expect(paginationButtons[0].disabled).toBe(false);
  expect(paginationButtons[1].disabled).toBe(false);
  expect(paginationButtons[2].disabled).toBe(true);
  expect(paginationButtons[3].disabled).toBe(true);
});
