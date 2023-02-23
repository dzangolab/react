import { Meta, StoryFn } from "@storybook/react";
import React from "react";

import arrowDownIcon from "../assets/images/arrow-down.svg";
import arrowUpDownIcon from "../assets/images/arrow-up-down.svg";
import arrowUpIcon from "../assets/images/arrow-up.svg";
import chevronLeft from "../assets/images/chevron-left.svg";
import chevronRight from "../assets/images/chevron-right.svg";
import doubleChevronLeft from "../assets/images/double-chevron-left.svg";
import doubleChevronRight from "../assets/images/double-chevron-right.svg";
import filterIcon from "../assets/images/filter.svg";

import { Table } from "./index";

type TableType = typeof Table;
type TableProperties = Meta<TableType>;

type TData = {
  id: number;
  givenName: string;
  middleNames: string;
  surname: string;
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

const makeData = (count: number) => {
  const data: TData[] = [];
  for (let i = 0; i < count; i++) {
    data[i] = {
      id: i + 1,
      givenName: "jone",
      middleNames: "abcd",
      surname: "doe",
    };
  }
  return data;
};

const data = makeData(4);

const fetcher = () => {
  return data;
};

const TableStory: TableProperties = {
  title: "UI/Table",
  component: Table,
  args: {
    columns,
    data,
    totalItems: 50,
    fetcher,
  },
};

const Template: StoryFn<TableType> = (arguments_) => <Table {...arguments_} />;

export const BasicTable: TableProperties = Template.bind({});
export const NoPaginationTable: TableProperties = Template.bind({});
export const ShowScrollBarTable: TableProperties = Template.bind({});
export const HideScrollBarTable: TableProperties = Template.bind({});
export const LoadingTable: TableProperties = Template.bind({});
export const FilterIcons: TableProperties = Template.bind({});
export const PaginationIcons: TableProperties = Template.bind({});
export const RowsPerPageOptions: TableProperties = Template.bind({});
export const ShowLoading: TableProperties = Template.bind({});
export const HidePageControl: TableProperties = Template.bind({});
export const HideTotalNumber: TableProperties = Template.bind({});
export const UnSortable: TableProperties = Template.bind({});
export const SortIcons: TableProperties = Template.bind({});
export const TableTitle: TableProperties = Template.bind({});

NoPaginationTable.args = {
  paginated: false,
};

ShowScrollBarTable.args = {
  data: makeData(20),
  hideScrollBar: false,
};

HideScrollBarTable.args = {
  data: makeData(20),
  hideScrollBar: true,
};

LoadingTable.args = {
  isLoading: true,
};

FilterIcons.args = {
  filterIcons: {
    expanded: filterIcon,
    notExpanded: filterIcon,
  },
};

PaginationIcons.args = {
  paginationIcons: {
    start: doubleChevronLeft,
    previous: chevronLeft,
    next: chevronRight,
    end: doubleChevronRight,
  },
};

RowsPerPageOptions.args = {
  rowsPerPageOptions: [20, 30, 40],
};

ShowLoading.args = {
  showLoading: false,
};

HidePageControl.args = {
  showPageControl: false,
};

HideTotalNumber.args = {
  showTotalNumber: false,
};

UnSortable.args = {
  sortable: false,
};

SortIcons.args = {
  sortIcons: {
    asc: arrowUpIcon,
    desc: arrowDownIcon,
    default: arrowUpDownIcon,
  },
};

TableTitle.args = {
  title: "This is a custom table title",
};

export default TableStory;
