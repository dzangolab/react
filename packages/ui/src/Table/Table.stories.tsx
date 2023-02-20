import { Meta, StoryFn } from "@storybook/react";
import React from "react";

import { BaseTable, Table } from "./index";

type TableType = typeof Table;
type TableProperties = Meta<TableType>;

const columns = [
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
];

const data = [
  { id: 1, givenName: "jone", middleNames: "abcd", surname: "doe" },
  { id: 2, givenName: "abhi", middleNames: "abcd", surname: "duwal" },
  { id: 3, givenName: "mike", middleNames: "abcd", surname: "doe" },
  { id: 4, givenName: "tony", middleNames: "abcd", surname: "doe" },
];

const fetcher = () => {
  return data;
};

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
export const NoPaginationTable: TableProperties = Template.bind({});
export const ShowScrollBarTable: TableProperties = Template.bind({});

BasicTable.args = {
  columns,
  data,
  totalItems: 50,
  fetcher,
};

NoPaginationTable.args = {
  columns,
  data,
  totalItems: 1,
  fetcher,
  paginated: false,
};

ShowScrollBarTable.args = {
  columns,
  data,
  totalItems: 50,
  fetcher,
  hideScrollBar: false,
};

export default TableStory;
