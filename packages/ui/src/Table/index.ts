import "./table.css";

import BaseTable from "./common/BaseTable";
import { TableContext } from "./common/TableContext";
import TableDetail from "./common/TableDetail";
import TableFooter from "./common/TableFooter";
import TableProvider from "./TableProvider";

export {
  BaseTable,
  TableContext,
  TableDetail,
  TableFooter,
  TableProvider as Table,
};

export type { TableColumnDefinition, TRequestJSON } from "./common/types";
