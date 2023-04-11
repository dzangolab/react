import React, { useContext, useState } from "react";
import { DebounceInput } from "react-debounce-input";
import OutsideClickHandler from "react-outside-click-handler";

import { TableContext } from "./TableContext";

import type { FilterProperties } from "./types";

const renderImage = (source?: string) => {
  return <img src={source} />;
};

function Filter({
  filterVariant = "text",
  /* eslint-disable-next-line unicorn/prevent-abbreviations */
  filterFn,
  placeholder,
  selectOptions,
  columnFilterValue,
  columnType,
  handleChange,
}: FilterProperties) {
  if (!filterVariant) return null;

  const { inputDebounceTime, filterIcons } = useContext(TableContext);

  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    expanded ? setExpanded(false) : setExpanded(true);
  };

  return (
    <div onClick={(event_) => event_.stopPropagation()}>
      {
        <button onClick={toggleExpand}>
          {expanded
            ? renderImage(filterIcons?.expanded)
            : renderImage(filterIcons?.notExpanded)}
        </button>
      }
      {expanded ? (
        <OutsideClickHandler
          onOutsideClick={() => {
            setExpanded(false);
          }}
        >
          <div role="dialog" className="filter-form-wrapper">
            {filterVariant === "text" ? (
              <DebounceInput
                type="text"
                value={(columnFilterValue?.value ?? "") as string}
                debounceTimeout={inputDebounceTime}
                onChange={(event_) => {
                  handleChange({
                    value: event_.target.value,
                    filterFn: filterFn || "contains",
                  });
                }}
                placeholder={placeholder || `Search...`}
                className="filter-text-input"
                size={10}
              />
            ) : null}

            {filterVariant === "select" && selectOptions ? (
              <select
                value={(columnFilterValue?.value ?? "") as string}
                onChange={(event_) => {
                  handleChange({
                    value: event_.target.value,
                    filterFn: filterFn || "equals",
                  });
                }}
                className="filter-select-input"
              >
                {placeholder ? (
                  <option value="" disabled selected>
                    {placeholder}
                  </option>
                ) : null}

                {selectOptions.map(({ label, value }) => (
                  <option key={label + value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            ) : null}

            {filterVariant === "checkBox" ? (
              <div className="filter-checkbox-input">
                <label>{placeholder}</label>
                <input
                  type="checkbox"
                  value={String(columnFilterValue?.value ?? true)}
                  onChange={(event_) => {
                    handleChange({
                      value: event_.target.checked,
                      filterFn: filterFn || "equals",
                    });
                  }}
                />
              </div>
            ) : null}
          </div>
        </OutsideClickHandler>
      ) : null}
    </div>
  );
}

export default Filter;
