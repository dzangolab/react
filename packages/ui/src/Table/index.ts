import BaseTable from "./common/BaseTable";
import { TableContext } from "./common/TableContext";
import TableDetail from "./common/TableDetail";
import TableFooter from "./common/TableFooter";
import ServerTableProvider from "./ServerTableProvider";

export {
  BaseTable,
  TableContext,
  TableDetail,
  TableFooter,
  ServerTableProvider as Table,
};

export type { TableColumnDefinition, TRequestJSON } from "./common/types";
