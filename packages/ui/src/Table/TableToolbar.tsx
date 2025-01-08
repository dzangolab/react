import { TableToolbar as TTableToolbar } from "./TableElements";
import { Button } from "../Buttons";
import { Checkbox } from "../FormWidgets";
import { Popup } from "../Popup";
import { SortableList } from "../SortableList";

import type { TDataTableProperties } from "./types";
import type { Table } from "@tanstack/react-table";

interface TToolbar<T>
  extends Pick<
    TDataTableProperties<T>,
    | "showColumnsAction"
    | "enableRowSelection"
    | "dataActionsMenu"
    | "renderResetTable"
    | "renderToolbarItems"
    | "handleResetTable"
  > {
  columnActionButtonLabel: string;
  resetActionButtonLabel: string;
  table: Table<T>;
}

export const TableToolbar = <TData extends { id: string | number }>({
  columnActionButtonLabel,
  dataActionsMenu,
  enableRowSelection,
  renderToolbarItems,
  renderResetTable,
  resetActionButtonLabel,
  handleResetTable,
  showColumnsAction,
  table,
}: TToolbar<TData>) => {
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

  return (
    <TTableToolbar
      children={
        <>
          {renderResetTable ? (
            <Button
              label={resetActionButtonLabel}
              onClick={handleResetTable}
              severity="secondary"
            />
          ) : null}

          {showColumnsAction ? (
            <Popup
              trigger={<Button label={columnActionButtonLabel} />}
              content={
                <SortableList
                  items={items}
                  onSort={(sorted) => {
                    table.setColumnOrder([
                      ...(enableRowSelection ? ["select"] : []),
                      ...sorted.map((item) => item.data.id),
                      ...(dataActionsMenu ? ["actions"] : []),
                    ]);
                  }}
                />
              }
            />
          ) : null}

          {renderToolbarItems ? renderToolbarItems(table) : null}
        </>
      }
    />
  );
};
