export const LIST_DEFAULT = {
  CURRENT_PAGE_REPORT_TEMPLATE: "{first} to {last} of {totalRecords}",
  DATA_KEY: "id",
  FILTER_DISPLAY: "row" as const, // "row" | "menu"
  ROWS_PER_PAGE: 10,
  ROWS_PER_PAGE_OPTIONS: [5, 10, 25, 50],
  PAGINATOR: true,
  PAGINATOR_TEMPLATE:
    "CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown",
  STRIPED_ROWS: true,
  TOTAL_RECORDS: 0,
};
