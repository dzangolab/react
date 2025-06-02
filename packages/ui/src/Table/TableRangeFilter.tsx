import { Column } from "@tanstack/react-table";

import { Input } from "@/FormWidgets";

type DateFilterProperties<TData> = {
  column: Column<TData, unknown>;
};

export const TableRangeFilter = <TData,>({
  column,
}: DateFilterProperties<TData>) => {
  const updateRangeFilter = (
    column: Column<TData, unknown>,
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const inputValue = event.target.value;
    const filterValue = column.getFilterValue();
    const currentFilter: (number | undefined)[] = Array.isArray(filterValue)
      ? [...filterValue]
      : [undefined, undefined];

    currentFilter[index] = inputValue !== "" ? Number(inputValue) : undefined;

    const isFilterActive = currentFilter.some(
      (filterInput) => filterInput !== undefined,
    );

    column.setFilterValue(isFilterActive ? currentFilter : []);
  };

  const filterValue = column.getFilterValue() as (number | undefined)[];

  return (
    <div className="number-range-filter">
      <Input
        name="range-start"
        placeholder={
          column.columnDef.filterPlaceholder?.split(",")[0] ??
          column.columnDef.filterPlaceholder
        }
        type="number"
        value={
          Array.isArray(filterValue) && filterValue[0] !== undefined
            ? filterValue[0]
            : undefined
        }
        onChange={(event) => updateRangeFilter(column, 0, event)}
      />
      <Input
        name="range-end"
        placeholder={
          column.columnDef.filterPlaceholder?.split(",")[1] ??
          column.columnDef.filterPlaceholder
        }
        type="number"
        value={
          Array.isArray(filterValue) && filterValue[1] !== undefined
            ? filterValue[1]
            : undefined
        }
        onChange={(event) => updateRangeFilter(column, 1, event)}
      />
    </div>
  );
};
