import { Cell, flexRender, Table, NoInfer } from "@tanstack/react-table";
import React from "react";

import {
  TableCell,
  TableRow,
  TooltipWrapper,
  TableBody as TTableBody,
} from "./TableElements";
import { formatDate, formatNumber, getAlignValue } from "./utils";

import type { TDataTableProperties } from "./types";

interface THeaderProperty<T>
  extends Pick<
    TDataTableProperties<T>,
    "enableRowSelection" | "customFormatters" | "emptyTableMessage"
  > {
  parsedColumnsLength: number;
  table: Table<T>;
}

export const TableBody = <TData extends { id: string | number }>({
  customFormatters = {},
  emptyTableMessage = "No results.",
  enableRowSelection,
  parsedColumnsLength,
  table,
}: THeaderProperty<TData>) => {
  const renderTooltipContent = (
    cell: Cell<TData, unknown>,
  ): React.ReactNode => {
    const tooltip = cell.column.columnDef.tooltip;

    if (typeof tooltip === "string") {
      return tooltip;
    } else if (typeof tooltip === "function") {
      return tooltip(cell);
    }

    return cell.getValue() as string;
  };

  return (
    <TTableBody>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow
            key={row.id}
            {...(enableRowSelection && {
              "data-selected": row.getIsSelected(),
            })}
            data-id={row.original.id ?? row.id}
          >
            {row.getVisibleCells().map((cell) => {
              const getFormattedValueContext: typeof cell.getContext = () => {
                const cellContext = cell.getContext();
                const renderValue = cellContext.getValue;
                const dateOptions = cell.column.columnDef.dateOptions;
                const numberOptions = cell.column.columnDef.numberOptions;

                const getFormattedValue = (): NoInfer<never> => {
                  const defaultCustomFormatters: Record<
                    string,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (value: any) => NoInfer<never>
                  > = {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    number: (value: any) =>
                      formatNumber({
                        value: Number(value),
                        locale: numberOptions?.locale,
                        formatOptions: numberOptions?.formatOptions,
                      }) as NoInfer<never>,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    date: (value: any) =>
                      formatDate({
                        date: value as Date,
                        locale: dateOptions?.locale,
                        formatOptions: dateOptions?.formatOptions,
                      }) as NoInfer<never>,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    currency: (value: any) =>
                      formatNumber({
                        value: Number(value),
                        locale: numberOptions?.locale,
                        formatOptions: {
                          style: "currency",
                          currency: "USD",
                          ...(numberOptions?.formatOptions &&
                            numberOptions.formatOptions),
                        },
                      }) as NoInfer<never>,
                    ...customFormatters,
                  };

                  const dataType: string =
                    cell.column.columnDef.dataType || "text";

                  return (
                    defaultCustomFormatters?.[dataType]?.(renderValue()) ||
                    renderValue()
                  );
                };

                return {
                  ...cellContext,
                  renderValue: () => getFormattedValue(),
                  getValue: () => getFormattedValue(),
                };
              };

              return (
                <TableCell
                  key={cell.id}
                  data-label={cell.column.id}
                  data-align={getAlignValue({
                    align: cell.column.columnDef.align,
                    dataType: cell.column.columnDef.dataType,
                  })}
                  className={`${
                    cell.column.id ? `cell-${cell.column.id}` : ``
                  } ${cell.column.columnDef.className || ""}`
                    .replace(/\s\s/, " ")
                    .trimEnd()}
                  style={{
                    width: cell.column.columnDef.width,
                    maxWidth: cell.column.columnDef.maxWidth,
                    minWidth: cell.column.columnDef.minWidth,
                  }}
                >
                  {cell.column.columnDef.tooltip ? (
                    <TooltipWrapper
                      tooltipOptions={{
                        children: renderTooltipContent(cell),
                        ...cell.column.columnDef?.tooltipOptions,
                      }}
                      cellContent={flexRender(
                        cell.column.columnDef.cell,
                        getFormattedValueContext(),
                      )}
                    ></TooltipWrapper>
                  ) : (
                    flexRender(
                      cell.column.columnDef.cell,
                      getFormattedValueContext(),
                    )
                  )}
                </TableCell>
              );
            })}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={parsedColumnsLength}>
            {emptyTableMessage}
          </TableCell>
        </TableRow>
      )}
    </TTableBody>
  );
};
