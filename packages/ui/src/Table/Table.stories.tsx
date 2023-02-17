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

export const Columns: TableProperties = Template.bind({});
export const Data: TableProperties = Template.bind({});
export const IsLoading: TableProperties = Template.bind({});
export const TotalItems: TableProperties = Template.bind({});
export const FetchCallback: TableProperties = Template.bind({});

Columns.args = {
  columns: [],
};

Data.args = {
  data: [],
};

IsLoading.args = {
  isLoading: false,
};

TotalItems.args = {
  totalItems: 1,
};

export default TableStory;
