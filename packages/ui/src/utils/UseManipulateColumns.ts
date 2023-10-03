import { useMemo } from "react";

import type { ColumnProps } from "primereact/column";

export const useManipulateColumns = ({
  columns,
  visibleColumns,
}: {
  columns: Array<ColumnProps>;
  visibleColumns: string[];
}) => {
  const manipulatedColumns: Array<ColumnProps> = useMemo(() => {
    const mappedColumns = new Map();

    //Merge duplicate fields to one based on filed value
    for (const column of columns) {
      if (mappedColumns.get(column.field)) {
        mappedColumns.set(column.field, {
          ...mappedColumns.get(column.field),
          ...column,
        });
      } else {
        mappedColumns.set(column.field, column);
      }
    }

    //Sort columns based on field name provided in visibleColumns array.
    const sortedColumns = visibleColumns.map<ColumnProps>((visibleColumn) => {
      return mappedColumns.get(visibleColumn);
    });

    return sortedColumns;
  }, [visibleColumns, columns]);

  return manipulatedColumns;
};
