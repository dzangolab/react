import { Pagination } from "../../Pagination";
import { Tooltip } from "../../Tooltip";

import type {
  Cell,
  ColumnDef,
  ColumnFilter,
  PaginationState,
  Table as ReactTable,
  SortDirection,
  Table,
  TableOptions,
  ColumnFiltersState,
  Column,
} from "@tanstack/react-table";
import type { ComponentProps, ReactNode } from "react";

export type { ColumnDef as TableColumnDefinition } from "@tanstack/react-table";

/**
 * Change the type of Keys of T from NewType
 */
export type ChangeTypeOfKeys<
  T extends object,
  Keys extends keyof T,
  NewType,
> = {
  // Loop to every key. We gonna check if the key
  // is assignable to Keys. If yes, change the type.
  // Else, retain the type.
  [key in keyof T]: key extends Keys ? NewType : T[key];
};

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

export type TRequestJSON = {
  filter: TFilterRequest;
  sort: TSortRequest;
  offset: TOffset;
  limit: TLimit;
};

export type TSortIcons = {
  asc: string;
  desc: string;
  default: string;
};

export interface TableProviderProperties<T> {
  children?: ReactNode;
  actionsHeader?: ReactNode;
  columns: ColumnDef<T>[];
  data: T[];
  fetcher: (requestJSON: TRequestJSON) => void;
  filterMenuToggleIcon?: string;
  enableMultiSort?: boolean;
  inputDebounceTime?: number;
  fixedHeader?: boolean;
  filterIcons?: {
    expanded: string;
    notExpanded: string;
  };
  hideScrollBar?: boolean;
  isLoading?: boolean;
  paginated?: boolean;
  paginationIcons?: {
    start: string;
    previous: string;
    next: string;
    end: string;
  };
  rowsPerPageOptions?: number[];
  showPageControl?: boolean;
  showTotalNumber?: boolean;
  sortable?: boolean;
  sortIcons?: TSortIcons;
  tableClassName?: string;
  title?: string;
  totalItems: number;
  visibleColumns?: string[];
}

export interface TableContextProperties<T>
  extends Partial<TableProviderProperties<T>> {
  table?: ReactTable<T>;
  paginationState?: PaginationState;
}

export interface TBaseTable {
  header: ReactNode;
  body: ReactNode;
  footer: ReactNode;
}

export interface FilterProperties {
  filterFn?: TFilterFn;
  filterVariant?: TFilterVariant;
  placeholder?: string;
  selectOptions?: TSelectOption[];
  columnFilterValue?: TFilterValue;
  columnType: number | string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleChange: ({ value, filterFn }: TFilterValue) => void;
}

export interface TFooterProperties {
  paginationComponent?: ReactNode;
  detailComponent?: ReactNode;
}

export interface TTableDetail {
  detail: string;
  showPrefix: string;
}

/* eslint-disable-next-line unicorn/prevent-abbreviations */
export type TFilterFn =
  | "contains"
  | "equals"
  | "startsWith"
  | "endsWith"
  | "greaterThan"
  | "lessThan"
  | "greaterThanOrEqual"
  | "lessThanOrEqual"
  | "in"
  | "notEqual"
  | "notIn"
  | "between"
  | "notBetween";

export type TFilterVariant =
  | "text"
  | "select"
  | "multiSelect"
  | "date"
  | "dateRange"
  | "range"
  | "checkBox";

export type TSelectOption = { label: string; value: string };

export type TFilterValue = {
  filterFn: TFilterFn;
  value: boolean | string | number;
};

export type TCustomColumnFilter = ChangeTypeOfKeys<
  ColumnFilter,
  "value",
  TFilterValue
>;

//TDataTable props

export type CellAlignmentType = "left" | "center" | "right";
export type CellDataType = "text" | "number" | "date" | "currency" | "other";

export type FormatNumberType = {
  value: number;
  locale?: string;
  formatOptions?: Intl.NumberFormatOptions;
};

export type FormatDateType = {
  date: Date | string | number;
  locale?: string;
  formatOptions?: Intl.DateTimeFormatOptions;
};

declare module "@tanstack/react-table" {
  // eslint-disable-next-line unicorn/prevent-abbreviations, @typescript-eslint/no-unused-vars
  interface ColumnDefBase<TData, TValue> {
    align?: CellAlignmentType;
    dataType?: CellDataType;
    className?: string;
    customFilterComponent?: (column: Column<TData, TValue>) => ReactNode;
    filterPlaceholder?: string;
    tooltip?: boolean | string | ((cell: Cell<TData, TValue>) => ReactNode);
    tooltipOptions?: Partial<
      Omit<ComponentProps<typeof Tooltip>, "elementRef">
    >;
    width?: string;
    maxWidth?: string;
    minWidth?: string;
    dateOptions?: Omit<FormatDateType, "date">;
    numberOptions?: Omit<FormatNumberType, "value">;
  }

  interface ColumnFilter {
    filterFn?: TFilterFn;
  }
}

export interface TDataTableProperties<TData>
  extends Partial<Omit<TableOptions<TData>, "getCoreRowModel" | "data">> {
  className?: string;
  columnActionBtnLabel?: string;
  data: TData[];
  emptyTableMessage?: string;
  enableRowSelection?: boolean;
  isLoading?: boolean;
  id?: string;
  initialFilters?: ColumnFiltersState;
  border?: "grid" | "horizontal" | "vertical" | "none";
  globalFilter?: {
    key: string;
    value: string;
    placeholder: string;
  };
  fetchData?: (data: TRequestJSON) => void;
  renderToolbarItems?: (table: Table<TData>) => React.ReactNode;
  renderTableFooterContent?: (table: Table<TData>) => React.ReactNode;
  renderCustomPagination?: (table: Table<TData>) => React.ReactNode;
  renderSortIcons?: (direction: false | SortDirection) => React.ReactNode;
  title?: {
    text: string;
    align?: "left" | "center" | "right";
  };
  paginated?: boolean;
  rowPerPage?: number;
  rowPerPageOptions?: number[];
  visibleColumns?: string[];
  onRowSelectChange?: (table: Table<TData>) => void;
  totalRecords?: number;
  inputDebounceTime?: number;
  paginationOptions?: Omit<
    ComponentProps<typeof Pagination>,
    | "currentPage"
    | "totalItems"
    | "onPageChange"
    | "onItemsPerPageChange"
    | "itemsPerPageOptions"
    | "defaultItemsPerPage"
  >;
  stripe?: "none" | "even" | "odd";
  showColumnsAction?: boolean;
}

export type {
  FilterFn as FilterFunction,
  FilterFns as FilterFunctions,
} from "@tanstack/react-table";
