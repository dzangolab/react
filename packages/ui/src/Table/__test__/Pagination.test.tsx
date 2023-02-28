import { render, screen } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";

import { biggerData, columns, data, fetcher } from "./TestTableData";
import Pagination from "../common/Pagination";
import { Table } from "../index";

test("correct buttons are disabled", async () => {
  render(
    <Table
      columns={columns}
      data={biggerData}
      fetcher={fetcher}
      totalItems={biggerData.length}
    >
      <Pagination />
    </Table>
  );

  const paginationButton = screen.getAllByRole("button") as HTMLButtonElement[];

  expect(paginationButton[0].disabled).toBe(true);
  expect(paginationButton[1].disabled).toBe(true);
  expect(paginationButton[2].disabled).toBe(false);
  expect(paginationButton[3].disabled).toBe(false);
});
