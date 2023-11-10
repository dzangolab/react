import React, { useContext } from "react";

import Pagination from "./Pagination";
import { TableContext } from "./TableContext";
import TableDetail from "./TableDetail";
import { TFooterProperties } from "./types";

const Footer = ({
  paginationComponent,
  detailComponent,
}: TFooterProperties) => {
  const { paginated } = useContext(TableContext);

  return (
    <div className="table-footer-wrapper">
      {detailComponent}
      {paginated ? paginationComponent : null}
    </div>
  );
};

Footer.defaultProps = {
  paginationComponent: <Pagination />,
  detailComponent: <TableDetail detail="Go to page:" showPrefix="Show" />,
};

export default Footer;
