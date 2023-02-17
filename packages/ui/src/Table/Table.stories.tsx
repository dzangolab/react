import { Meta, StoryFn } from "@storybook/react";
import React from "react";

import { BaseTable, Table } from "./index";

type TableType = typeof Table;
type TableProperties = Meta<TableType>;

const TableStory: TableProperties = {
  title: "UI/Table",
  component: Table,
};

const Template: StoryFn<TableType> = (arguments_) => (
  <Table {...arguments_}>
    <BaseTable></BaseTable>
  </Table>
);

export const BasicTable: TableProperties = Template.bind({});

BasicTable.args = {
  columns: [
    {
      accessorKey: "id",
      header: () => <span>ID</span>,
    },
    {
      accessorKey: "givenName",
      header: () => <span>givenName</span>,
    },
    {
      accessorKey: "middleNames",
      header: () => <span>middleNames</span>,
    },
    {
      accessorKey: "surname",
      header: () => <span>surname</span>,
    },
  ],
  data: [
    { id: 1, givenName: "jone", middleNames: "abcd", surname: "doe" },
    { id: 2, givenName: "jone", middleNames: "abcd", surname: "doe" },
    { id: 3, givenName: "jone", middleNames: "abcd", surname: "doe" },
    { id: 4, givenName: "jone", middleNames: "abcd", surname: "doe" },
  ],
  totalItems: 1,
};

export default TableStory;
