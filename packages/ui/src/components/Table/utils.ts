import type { TRequestJSON, TSortDirection } from "./types";
import type { ColumnFiltersState, SortingState } from "@tanstack/react-table";

const getSortDirection = (desc: boolean): TSortDirection => {
  switch (desc) {
    case false:
      return "ASC";
    case true:
      return "DESC";
    default:
      return "";
  }
};

export const getRequestJSON = (
  sortingState?: SortingState,
  filterState?: ColumnFiltersState
): TRequestJSON => {
  const getFilter = () => {
    if (!filterState || filterState.length === 0) return null;

    if (filterState.length === 1) {
      return {
        key: filterState[0].id,
        operator: "ct",
        value: filterState[0].value as string,
      };
    }

    return {
      AND: filterState.map((filter) => {
        return {
          key: filter.id,
          operator: "ct",
          value: filter.value as string,
        };
      }),
    };
  };

  const getSort = () => {
    if (!sortingState || sortingState.length === 0) return null;

    if (sortingState.length === 1) {
      return [
        {
          key: sortingState[0].id,
          direction: getSortDirection(sortingState[0].desc),
        },
      ];
    }

    return sortingState.map((state) => ({
      key: state.id,
      direction: getSortDirection(state.desc),
    }));
  };

  return {
    filter: getFilter(),
    sort: getSort(),
  };
};
