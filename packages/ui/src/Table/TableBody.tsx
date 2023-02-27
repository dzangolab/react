import { flexRender } from "@tanstack/react-table";
import React, { useContext } from "react";

import { TableContext } from "./TableProvider";

function TableBody() {
  const { table } = useContext(TableContext);

  return (
    <tbody>
      {table?.getRowModel().rows.map((row) => {
        return (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => {
              return (
                <td key={cell.id} data-label={cell.column.id}>
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
