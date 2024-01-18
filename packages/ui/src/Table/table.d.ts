import "@tanstack/react-table";
import type {
  TFilterFn as TFilterFunction,
  TFilterVariant,
  TSelectOption,
} from "./common/types";

declare module "@tanstack/react-table" {
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  interface ColumnMeta<TData extends RowData, TValue> {
    serverFilterFn: TFilterFunction;
    filterVariant: TFilterVariant;
    filterPlaceholder?: string;
    selectOptions?: TSelectOption[];
  }
}
