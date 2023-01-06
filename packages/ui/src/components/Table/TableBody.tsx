import { Cell, flexRender } from "@tanstack/react-table";
import React from "react";

import type { TableBodyProperties } from "./types";

function TableBody<T>(properties: TableBodyProperties<T>) {
  return (
    <tbody>
      {properties.rowModel().rows.map((row) => {
        return (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell: Cell<T, unknown>) => {
              return (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
}

export default TableBody;
