import { useContext } from "react";

import TableBody from "./TableBody";
import TableFooter from "./TableFooter";
import TableHeader from "./TableHeader";
import { TableContext } from "./TableProvider";

import type { TBaseTable } from "./types";

function BaseTable({
  tableHeaderComponent,
  tableBodyComponent,
  tableFooterComponent,
}: TBaseTable) {
  const { fixedHeader, hideScrollBar, title } = useContext(TableContext);

  const getTableWrapperStyle = () => {
    if (fixedHeader && hideScrollBar) return "sticky-header hide-scrollbar";
    if (fixedHeader && !hideScrollBar) return "sticky-header";
    if (!fixedHeader && hideScrollBar) return "hide-scrollbar";
    return "";
  };

  return (
    <div className={`table-wrapper ${getTableWrapperStyle()}`}>
      <div>
        <table>
          {title ? <caption>{title}</caption> : null}
          {tableHeaderComponent}
          {tableBodyComponent}
        </table>
      </div>
      {tableFooterComponent}
    </div>
  );
}

BaseTable.defaultProps = {
  tableHeaderComponent: <TableHeader />,
  tableBodyComponent: <TableBody />,
  tableFooterComponent: <TableFooter />,
};

export default BaseTable;
