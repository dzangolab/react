import { useMemo } from "react";

import type {
  TCustomColumnFilter,
  TFilterFn as TFilterFunction,
  TRequestJSON,
  TSortDirection,
} from "./types";
import type { PaginationState, SortingState } from "@tanstack/react-table";

const getFilterOperator = (filterFunction: TFilterFunction): string => {
  switch (filterFunction) {
    case "contains":
      return "ct";
    case "startsWith":
      return "sw";
    case "endsWith":
      return "ew";
    case "equals":
      return "eq";
    case "greaterThan":
      return "gt";
    case "greaterThanOrEqual":
      return "gte";
    case "lessThanOrEqual":
      return "lte";
    case "lessThan":
      return "lt";
    case "in":
      return "in";
    case "between":
      return "bt";
    default:
      return "ct";
  }
};

const getSortDirection = (desc: boolean): TSortDirection => {
  switch (desc) {
    case false:
      return "ASC";
    case true:
      return "DESC";
    default:
      return "";
  }
};

export const getRequestJSON = (
  sortingState?: SortingState,
  filterState?: TCustomColumnFilter[],
  paginationState?: PaginationState,
): TRequestJSON => {
  const getFilter = () => {
    if (!filterState || filterState.length === 0) return null;

    if (filterState.length === 1) {
      return {
        key: filterState[0].id,
        operator: getFilterOperator(filterState[0].value.filterFn),
        value: String(filterState[0].value.value),
      };
    }

    return {
      AND: filterState.map((filter) => {
        return {
          key: filter.id,
          operator: getFilterOperator(filter.value.filterFn),
          value: String(filter.value.value),
        };
      }),
    };
  };

  const getLimit = () => {
    if (
      !paginationState ||
      (paginationState && Object.keys(paginationState).length === 0)
    )
      return null;

    return paginationState.pageSize;
  };

  const getOffset = () => {
    if (
      !paginationState ||
      (paginationState && Object.keys(paginationState).length === 0)
    )
      return null;

    return paginationState.pageIndex * paginationState.pageSize;
  };

  const getSort = () => {
    if (!sortingState || sortingState.length === 0) return null;

    if (sortingState.length > 1) {
      return sortingState.map((state) => ({
        key: state.id,
        direction: getSortDirection(state.desc),
      }));
    }

    return [
      {
        key: sortingState[0].id,
        direction: getSortDirection(sortingState[0].desc),
      },
    ];
  };

  return {
    filter: getFilter(),
    limit: getLimit(),
    sort: getSort(),
    offset: getOffset(),
  };
};

export const useManipulateColumns = ({
  columns,
  visibleColumns,
}: {
  columns: Array<any>;
  visibleColumns: string[];
}) => {
  const manipulatedColumns: Array<any> = useMemo(() => {
    const mappedColumns = new Map();

    //Merge duplicate fields to one based on filed value
    for (const column of columns) {
      if (mappedColumns.get(column.accessorKey || column.id)) {
        mappedColumns.set(column.accessorKey || column.id, {
          ...mappedColumns.get(column.accessorKey || column.id),
          ...column,
        });
      } else {
        mappedColumns.set(column.accessorKey || column.id, column);
      }
    }

    //Sort columns based on field name provided in visibleColumns array.
    const sortedColumns = visibleColumns.map<any>((visibleColumn) => {
      return mappedColumns.get(visibleColumn);
    });

    return sortedColumns;
  }, [visibleColumns, columns]);

  return manipulatedColumns;
};
