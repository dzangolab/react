import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { expect, test, vi } from "vitest";

import BaseTable from "../BaseTable";
import TableProvider from "../TableProvider";
import { TRequestJSON } from "../types";

type TData = {
  id: number;
  givenName: string;
  middleNames: string;
  surname: string;
};

const DATA_LENGTH = 10;

const makeData = (count: number, offset: number) => {
  const data: TData[] = [];
  for (let i = offset; i < count + offset; i++) {
    data[i] = {
      id: i + 1,
      givenName: "jone",
      middleNames: "abcd",
      surname: "doe",
    };
  }
  return data;
};

const columns = [
  {
    accessorKey: "id",
    header: () => <span>ID</span>,
  },
  {
    accessorKey: "givenName",
    header: () => <span>Given Name</span>,
  },
  {
    accessorKey: "middleNames",
    header: () => <span>Middle Names</span>,
  },
  {
    accessorKey: "surname",
    header: () => <span>Surname</span>,
  },
];

const fetcher = (requestJSON: TRequestJSON) => {
  return makeData(DATA_LENGTH, requestJSON.offset || 0);
};

const component = (
  <TableProvider
    columns={columns}
    data={makeData(DATA_LENGTH, 0)}
    fetcher={fetcher}
    totalItems={DATA_LENGTH}
    rowsPerPageOptions={[10]}
  >
    <BaseTable />
  </TableProvider>
);

test("pagination works correctly", async () => {
  render(component);

  expect(screen.queryByText("10")).not.toBeNull();
  expect(screen.queryByText("11")).toBeNull();

  const buttons = screen.getAllByRole("button") as HTMLButtonElement[];
  const startButton = buttons.at(-4);
  const previousPageButton = buttons.at(-3);
  const nextPageButton = buttons.at(-2);
  const endPageButton = buttons.at(-1);

  if (nextPageButton) {
    fireEvent.click(nextPageButton);
  }
});
