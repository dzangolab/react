import { useContext } from "react";

import TableBody from "./TableBody";
import TableFooter from "./TableFooter";
import TableHeader from "./TableHeader";
import { TableContext } from "./TableProvider";

function BaseTable() {
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
          <TableHeader />
          <TableBody />
        </table>
      </div>

      <TableFooter />
    </div>
  );
}

export default BaseTable;
