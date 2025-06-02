import { TABLE_STATE_PREFIX } from "./constants";
import { getStorage } from "../utils";

import type {
  CellAlignmentType,
  CellDataType,
  FormatNumberType,
  PersistentTableState,
  StorageType,
  TFilterFn as TFilterFunction,
  TRequestJSON,
  TSortDirection,
} from "./types";
import type {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";

const getFilterOperator = (
  filterFunction: TFilterFunction,
): { operator: string; not?: boolean } => {
  switch (filterFunction) {
    case "contains":
      return { operator: "ct" };
    case "startsWith":
      return { operator: "sw" };
    case "endsWith":
      return { operator: "ew" };
    case "equals":
      return { operator: "eq" };
    case "notEqual":
      return { operator: "eq", not: true };
    case "greaterThan":
      return { operator: "gt" };
    case "greaterThanOrEqual":
      return { operator: "gte" };
    case "lessThanOrEqual":
      return { operator: "lte" };
    case "lessThan":
      return { operator: "lt" };
    case "in":
      return { operator: "in" };
    case "notIn":
      return { operator: "in", not: true };
    case "between":
      return { operator: "bt" };
    case "notBetween":
      return { operator: "bt", not: true };
    case "isNull":
      return { operator: "null" };
    case "isNotNull":
      return { operator: "null", not: true };
    case "isEmpty":
      return { operator: "empty" };
    case "isNotEmpty":
      return { operator: "empty", not: true };
    case "like":
      return { operator: "like" };
    case "notLike":
      return { operator: "like", not: true };
    default:
      return { operator: "ct" };
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
  filterState?: ColumnFiltersState,
  paginationState?: PaginationState,
): TRequestJSON => {
  const getFilter = () => {
    if (!filterState || filterState.length === 0) return null;

    const updatedFilterState = filterState.filter((filter) => {
      if (Array.isArray(filter.value)) {
        return filter.value.length > 0;
      }

      if (typeof filter.value === "string") {
        return filter.value.trim() !== "";
      }

      return filter.value != null;
    });

    if (updatedFilterState.length === 0) return null;

    if (updatedFilterState.length === 1) {
      if (Array.isArray(updatedFilterState[0].value)) {
        return {
          key: updatedFilterState[0].id,
          ...getFilterOperator(updatedFilterState[0].filterFn || "in"),
          value: updatedFilterState[0].value
            .filter((value) => value !== undefined)
            .join(","),
        };
      }

      return {
        key: updatedFilterState[0].id,
        ...getFilterOperator(updatedFilterState[0].filterFn || "contains"),
        value: String(updatedFilterState[0].value),
      };
    }

    return {
      AND: updatedFilterState.map((filter) => {
        if (Array.isArray(filter.value)) {
          return {
            key: filter.id,
            ...getFilterOperator(filter.filterFn || "in"),
            value: filter.value
              .filter((value) => value !== undefined)
              .join(","),
          };
        }

        return {
          key: filter.id,
          ...getFilterOperator(filter.filterFn || "contains"),
          value: String(filter.value),
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

export const getParsedColumns = ({
  columns,
  visibleColumns,
  childColumns,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: Array<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  childColumns?: Array<any>;
  visibleColumns: string[];
}) => {
  const parsedColumns = new Map();

  if (childColumns) {
    childColumns.forEach((column) =>
      parsedColumns.set(
        column.accessorKey || column.id || column.header,
        column,
      ),
    );
  }

  const updateColumn = ({
    enableColumnFilter,
    enableSorting,
    enableGlobalFilter,
    enableMultiSort,
  }: {
    enableColumnFilter?: boolean;
    enableSorting?: boolean;
    enableGlobalFilter?: boolean;
    enableMultiSort?: boolean;
  }) => {
    return {
      enableColumnFilter:
        typeof enableColumnFilter === "undefined" ? false : enableColumnFilter,

      enableSorting:
        typeof enableSorting === "undefined" ? false : enableSorting,

      enableGlobalFilter:
        typeof enableGlobalFilter === "undefined" ? false : enableGlobalFilter,

      enableMultiSort:
        typeof enableMultiSort === "undefined" ? false : enableMultiSort,
    };
  };

  //Merge duplicate fields to one based on column id value
  for (const column of columns) {
    const columnIdentifier = column.accessorKey || column.id || column.header;

    if (column.columns) {
      if (parsedColumns.get(columnIdentifier)) {
        parsedColumns.set(columnIdentifier, {
          ...parsedColumns.get(columnIdentifier),
          ...column,
          columns: [
            ...getParsedColumns({
              columns: column.columns,
              visibleColumns,
              childColumns: parsedColumns.get(columnIdentifier).columns || [],
            }),
          ],
        });
      } else {
        parsedColumns.set(columnIdentifier, {
          ...column,
          columns: [
            ...getParsedColumns({ columns: column.columns, visibleColumns }),
          ],
          ...updateColumn({
            enableColumnFilter: column.enableColumnFilter,
            enableGlobalFilter: column.enableGlobalFilter,
            enableMultiSort: column.enableMultiSort,
            enableSorting: column.enableSorting,
          }),
        });
      }
    } else if (
      visibleColumns.length !== 0 &&
      !visibleColumns.includes(columnIdentifier)
    ) {
      continue;
    } else if (parsedColumns.get(columnIdentifier)) {
      parsedColumns.set(columnIdentifier, {
        ...parsedColumns.get(columnIdentifier),
        ...column,
      });
    } else {
      parsedColumns.set(columnIdentifier, {
        ...column,
        ...updateColumn({
          enableColumnFilter: column.enableColumnFilter,
          enableGlobalFilter: column.enableGlobalFilter,
          enableMultiSort: column.enableMultiSort,
          enableSorting: column.enableSorting,
        }),
      });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parsedColumnsList: any[] = [];

  for (const parsedColumnId of parsedColumns.keys()) {
    if (!visibleColumns.includes(parsedColumnId)) {
      if (parsedColumns.get(parsedColumnId)?.columns?.length == 0) {
        continue;
      }
    }

    parsedColumnsList.push(parsedColumns.get(parsedColumnId));
  }

  return parsedColumnsList;
};

export const formatNumber = ({
  value,
  locale = "en-GB",
  formatOptions,
}: FormatNumberType) => {
  // for detail use case visit- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat

  if (typeof value !== "number" || isNaN(value)) {
    return value;
  }

  const formatter = new Intl.NumberFormat(locale, formatOptions);

  return formatter.format(value);
};

export const getAlignValue = ({
  align,
  dataType,
}: {
  align?: CellAlignmentType;
  dataType?: CellDataType;
  header?: boolean;
}) => {
  if (align) {
    return align;
  }

  if (dataType == "other") {
    return "center";
  } else if (dataType == "number" || dataType == "currency") {
    return "right";
  } else {
    return "left";
  }
};

export const getSavedTableState = (
  id: string,
  storage: Storage,
): PersistentTableState | null => {
  try {
    const savedState = storage.getItem(`${TABLE_STATE_PREFIX}-${id}`);

    return savedState && JSON.parse(savedState);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("[Dz table] Could not restore table state", error);
  }

  return null;
};

export const saveTableState = (
  id: string,
  value: PersistentTableState,
  storage: Storage,
) => {
  try {
    storage.setItem(`${TABLE_STATE_PREFIX}-${id}`, JSON.stringify(value));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("[Dz table] Could not store table state", error);
  }
};

export const clearSavedTableStates = (
  storageType: StorageType = "localStorage",
) => {
  const storage = getStorage(storageType);

  Object.keys(storage).forEach((key) => {
    if (key.startsWith(TABLE_STATE_PREFIX)) {
      storage.removeItem(key);
    }
  });
};
