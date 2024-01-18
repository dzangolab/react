import type {
  FormatDateType,
  FormatNumberType,
  TFilterFn as TFilterFunction,
  TRequestJSON,
  TSortDirection,
} from "./types";
import type {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";

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
    case "notEqual":
      return "ne";
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
    case "notIn":
      return "nin";
    case "between":
      return "bt";
    case "notBetween":
      return "nbt";
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
  filterState?: ColumnFiltersState,
  paginationState?: PaginationState,
): TRequestJSON => {
  const getFilter = () => {
    if (!filterState || filterState.length === 0) return null;

    if (filterState.length === 1) {
      return {
        key: filterState[0].id,
        operator: getFilterOperator(filterState[0].filterFn || "contains"),
        value: String(filterState[0].value),
      };
    }

    return {
      AND: filterState.map((filter) => {
        return {
          key: filter.id,
          operator: getFilterOperator(filter.filterFn || "contains"),
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
  locale = "en-US",
  formatOptions,
}: FormatNumberType) => {
  // for detail use case visit- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat

  if (typeof value !== "number" || isNaN(value)) {
    return value;
  }

  const formatter = new Intl.NumberFormat(locale, formatOptions);

  return formatter.format(value);
};
export const formatDate = ({
  date,
  locale = "en-US",
  formatOptions,
}: FormatDateType) => {
  //for detail use case visit- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
  if (!date) {
    return null;
  }

  let parsedDate: Date;

  if (date instanceof Date) {
    parsedDate = date;
  } else {
    parsedDate = new Date(date);
  }

  if (!isNaN(parsedDate.getTime())) {
    const formatter = new Intl.DateTimeFormat(locale, formatOptions);

    return formatter.format(parsedDate);
  } else {
    return date;
  }
};
