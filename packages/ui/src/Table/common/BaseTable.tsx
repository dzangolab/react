import { useContext } from "react";

import TableBody from "./TableBody";
import { TableContext } from "./TableContext";
import TableFooter from "./TableFooter";
import TableHeader from "./TableHeader";

import type { TBaseTable } from "./types";

function BaseTable({ header, body, footer }: TBaseTable) {
  const { fixedHeader, hideScrollBar, title, tableClassName, actionsHeader } =
    useContext(TableContext);

  const getTableWrapperStyle = () => {
    if (fixedHeader && hideScrollBar) return "sticky-header hide-scrollbar";
    if (fixedHeader && !hideScrollBar) return "sticky-header";
    if (!fixedHeader && hideScrollBar) return "hide-scrollbar";
    return "";
  };

  return (
    <div className={`table-wrapper ${getTableWrapperStyle()}`}>
      <div className="actions-header">{actionsHeader}</div>
      <div className="table-container">
        <table className={tableClassName}>
          {title ? <caption>{title}</caption> : null}
          {header}
          {body}
        </table>
      </div>
      {footer}
    </div>
  );
}

BaseTable.defaultProps = {
  header: <TableHeader />,
  body: <TableBody />,
  footer: <TableFooter />,
};

export default BaseTable;
