import type {
  ColumnDef,
  ColumnFilter,
  PaginationState,
  Table as ReactTable,
} from "@tanstack/react-table";
import type { ReactNode } from "react";

export type { ColumnDef as TableColumnDefinition } from "@tanstack/react-table";

/**
 * Change the type of Keys of T from NewType
 */
export type ChangeTypeOfKeys<
  T extends object,
  Keys extends keyof T,
  NewType
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
  title?: string;
  totalItems: number;
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
  columnFilterValue?: {
    filterFn: TFilterFn;
    value: string;
  };
  columnType: number | string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleChange: ({ value, filterFn }: { value: string; filterFn: any }) => void;
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
  | "between";

export type TFilterVariant =
  | "text"
  | "select"
  | "multiSelect"
  | "date"
  | "dateRange"
  | "range"
  | "checkBox";

export type TSelectOption = { label: string; value: string };

export type TCustomColumnFilter = ChangeTypeOfKeys<
  ColumnFilter,
  "value",
  {
    filterFn: TFilterFn;
    value: string;
  }
>;
