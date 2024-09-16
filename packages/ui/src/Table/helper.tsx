import { Checkbox } from "../FormWidgets";

import type { Table } from "@tanstack/react-table";

export const getSortableColumnList = <TData extends { id: string | number }>(
  table: Table<TData>,
) => {
  const items = table
    .getAllLeafColumns()
    .filter((column) => column.id !== "select" && column.id !== "actions")
    .map((column, index) => ({
      id: index,
      data: column,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (data: any) => {
        let header = data.columnDef.header;

        if (typeof data.columnDef.header === "function") {
          header = data.columnDef.header();
        }

        return (
          <Checkbox
            checked={data.getIsVisible()}
            label={header}
            onChange={() => data.toggleVisibility()}
          />
        );
      },
    }));

  return items;
};
