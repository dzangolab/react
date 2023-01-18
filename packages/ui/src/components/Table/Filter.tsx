import React, { useContext, useState } from "react";
import { DebounceInput } from "react-debounce-input";
import OutsideClickHandler from "react-outside-click-handler";

import { TableContext } from "./TableProvider";

import type { FilterProperties } from "./types";

function Filter<T>({ column, table }: FilterProperties<T>) {
  const { filterDebounceTime, filterIcons } = useContext(TableContext);

  const [expanded, setExpanded] = useState(false);

  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  const toggleExpand = () => {
    expanded ? setExpanded(false) : setExpanded(true);
  };

  if (typeof firstValue === "number") return null;

  return (
    <div
      className="filter-wrapper"
      onClick={(event_) => event_.stopPropagation()}
    >
      {
        <button onClick={toggleExpand}>
          {expanded ? filterIcons?.expanded : filterIcons?.notExpanded}
        </button>
      }
      {expanded ? (
        <OutsideClickHandler
          onOutsideClick={() => {
            setExpanded(false);
          }}
        >
          <div className="filter-form-wrapper">
            <DebounceInput
              type="text"
              value={(columnFilterValue ?? "") as string}
              debounceTimeout={filterDebounceTime}
              onChange={(event_) => {
                column.setFilterValue(event_.target.value);
              }}
              placeholder={`Search...`}
              className=""
              size={10}
            />
          </div>
        </OutsideClickHandler>
      ) : null}
    </div>
  );
}

export default Filter;
