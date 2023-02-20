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
export const LoadingTable: TableProperties = Template.bind({});
export const PaginationIcons: TableProperties = Template.bind({});
export const RowsPerPageOptions: TableProperties = Template.bind({});
export const ShowLoading: TableProperties = Template.bind({});
export const HidePageControl: TableProperties = Template.bind({});
export const HideTotalNumber: TableProperties = Template.bind({});
export const UnSortable: TableProperties = Template.bind({});
export const SortIcons: TableProperties = Template.bind({});
export const TableTitle: TableProperties = Template.bind({});

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

LoadingTable.args = {
  columns,
  data,
  totalItems: 50,
  fetcher,
  isLoading: true,
};

PaginationIcons.args = {
  columns,
  data,
  totalItems: 50,
  fetcher,
  paginationIcons: {
    start: "strt",
    previous: "privs",
    next: "nxt",
    end: "end",
  },
};

RowsPerPageOptions.args = {
  columns,
  data,
  totalItems: 50,
  fetcher,
  rowsPerPageOptions: [20],
};

ShowLoading.args = {
  columns,
  data,
  totalItems: 50,
  fetcher,
  showLoading: false,
};

HidePageControl.args = {
  columns,
  data,
  totalItems: 50,
  fetcher,
  showPageControl: false,
};

HideTotalNumber.args = {
  columns,
  data,
  totalItems: 50,
  fetcher,
  showTotalNumber: false,
};

UnSortable.args = {
  columns,
  data,
  totalItems: 50,
  fetcher,
  sortable: false,
};

SortIcons.args = {
  columns,
  data,
  totalItems: 50,
  fetcher,
  sortIcons: {
    asc: "a",
    desc: "a",
    default: "a",
  },
};

TableTitle.args = {
  columns,
  data,
  totalItems: 50,
  fetcher,
  title: "table title",
};

export default TableStory;
