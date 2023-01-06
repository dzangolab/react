import React, { useContext, useState } from "react";
import { DebounceInput } from "react-debounce-input";
import OutsideClickHandler from "react-outside-click-handler";

import { TableContext } from "./TableProvider";

import type { FilterProperties } from "./types";

function Filter({ column, table }: FilterProperties) {
  const { filterDebounceTime } = useContext(TableContext);

  const [expanded, setExpanded] = useState(false);

  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  const toggleExpand = () => {
    expanded ? setExpanded(false) : setExpanded(true);
  };

  return (
    <div
      className="filter-wrapper"
      onClick={(event_) => event_.stopPropagation()}
    >
      {<button onClick={toggleExpand}>{expanded ? "🙉" : "🙈"}</button>}
      {expanded ? (
        <OutsideClickHandler
          onOutsideClick={() => {
            setExpanded(false);
          }}
        >
          <div className="filter-form-wrapper">
            {typeof firstValue === "number" ? (
              <div className="number-filter-form">
                <DebounceInput
                  type="number"
                  value={(columnFilterValue as [number, number])?.[0] ?? ""}
                  debounceTimeout={filterDebounceTime}
                  onChange={(event_) => {
                    column.setFilterValue((old: [number, number]) => [
                      event_.target.value,
                      old?.[1],
                    ]);
                  }}
                  placeholder={`Min`}
                  className=""
                  size={2}
                />

                <DebounceInput
                  type="number"
                  value={(columnFilterValue as [number, number])?.[1] ?? ""}
                  debounceTimeout={filterDebounceTime}
                  onChange={(event_) => {
                    column.setFilterValue((old: [number, number]) => [
                      event_.target.value,
                      old?.[0],
                    ]);
                  }}
                  placeholder={`Max`}
                  className=""
                  size={2}
                />
              </div>
            ) : (
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
            )}
          </div>
        </OutsideClickHandler>
      ) : null}
    </div>
  );
}

export default Filter;
