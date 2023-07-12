import {
  DataTableFilterMetaData,
  DataTableOperatorFilterMetaData,
} from "primereact/datatable";

import type { LazyTableState } from "./types";

export type TSortDirection = "ASC" | "DESC" | "";

type TSingleFilter = {
  key: string;
  operator: string;
  value: string;
};
type TMultiFilter = {
  AND: TSingleFilter[];
};
type TFilterRequest = TSingleFilter | TMultiFilter | null;
type TSingleSort = {
  key: string;
  direction: TSortDirection;
};
type TLimit = number | null;
type TOffset = number | null;
type TSortRequest = TSingleSort[] | null;

export interface IRequestJSON {
  filter: TFilterRequest;
  sort: TSortRequest;
  offset: TOffset;
  limit: TLimit;
}

type GetRequestJSONOptions = {
  customColumnsMap: { [key: string]: string };
};

const getFilterOperator = (filter: DataTableFilterMetaData): string => {
  // 'startsWith'
  // 'contains'
  // 'notContains'
  // 'endsWith'
  // 'equals'
  // 'notEquals'
  // 'in'
  // 'lt'
  // 'lte'
  // 'gt'
  // 'gte'
  // 'between'
  // 'dateIs'
  // 'dateIsNot'
  // 'dateBefore'
  // 'dateAfter'
  // 'custom'
  switch (filter.matchMode) {
    case "contains":
      return "ct";
    case "startsWith":
      return "sw";
    case "endsWith":
      return "ew";
    case "equals":
      return "eq";
    case "gt":
      return "gt";
    case "gte":
      return "gte";
    case "lte":
      return "lte";
    case "lt":
      return "lt";
    case "in":
      return "in";
    case "between":
      return "bt";
    default:
      // eslint-disable-next-line
      console.log("filter matchMode not handled, returning 'ct'");
      return "ct";
  }
};

const parseOneFilter = (
  filterKey: string,
  filter: DataTableFilterMetaData | DataTableOperatorFilterMetaData
) => {
  if ("value" in filter) {
    // DataTableFilterMetaData type filter
    if (
      filter.value !== null &&
      filter.value !== undefined &&
      filter.value.length !== 0
    ) {
      return {
        key: filterKey,
        operator: getFilterOperator(filter),
        value: String(filter.value),
      };
    }
  } else {
    // eslint-disable-next-line
    console.log(
      "Advanced filter type 'DataTableOperatorFilterMetaData' not handled yet!!"
    );

    return null;
  }
};

export const getFilterParameters = (
  { filters }: LazyTableState,
  options?: GetRequestJSONOptions
) => {
  if (!filters) return null;

  const filterKeys = Object.keys(filters || {});
  if (!filterKeys.length) return null;

  const allFilters: any = [];
  filterKeys.forEach((filterKey) => {
    const parsedFilter = parseOneFilter(
      options?.customColumnsMap?.[filterKey] || filterKey, // use filterKey from customColumnsMap if available
      filters[filterKey]
    );

    if (parsedFilter) {
      allFilters.push(parsedFilter);
    }
  });

  if (!allFilters.length) return null;

  if (allFilters.length === 1) {
    return allFilters[0];
  }

  return {
    AND: allFilters,
  };
};

export const getSortParameters = (
  { sortField, sortOrder }: LazyTableState,
  options?: GetRequestJSONOptions
) => {
  if (!sortField) return null;

  return [
    {
      key: options?.customColumnsMap?.[sortField] || sortField, // use key from customColumnsMap if available
      direction: sortOrder === 1 ? ("ASC" as const) : ("DESC" as const),
    },
  ];
};

export const getPaginationParameters = (
  { rows, first }: LazyTableState,
  options?: GetRequestJSONOptions
) => {
  return {
    limit: rows,
    offset: first,
  };
};

export const getRequestJSON = (
  parameters: LazyTableState,
  options?: GetRequestJSONOptions
): IRequestJSON => {
  return {
    ...getPaginationParameters(parameters),
    sort: getSortParameters(parameters, options),
    filter: getFilterParameters(parameters, options),
  };
};
