import { useTranslation } from "@dzangolab/react-i18n";
import {
  TDataTable,
  Page,
  Button,
  TableColumnDefinition,
} from "@dzangolab/react-ui";

import { data } from "./data";

export const TanstackTableDemo = () => {
  const [t] = useTranslation("ui");

  const columns: Array<TableColumnDefinition<any>> = [
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "name",
      header: () => <span>Full name</span>,
      width: "10rem",
      maxWidth: "10rem",
      minWidth: "10rem",
    },
    {
      accessorKey: "age",
      header: "Age",
      align: "right",
      width: "6rem",
      maxWidth: "6rem",
      minWidth: "6rem",
    },
    {
      accessorKey: "city",
      header: () => <span>City</span>,
      width: "8rem",
      maxWidth: "8rem",
      minWidth: "8rem",
    },
  ];

  return (
    <Page title={t("v2.tanstackTable.title")}>
      <div
        className="tanstack-tables-wrapper"
        style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
      >
        <TDataTable
          title={{ text: t("table.title.defaultTable"), align: "left" }}
          columns={columns}
          data={data}
          id="invitations-table"
          initialFilters={[{ id: "email", value: "O" }]}
        ></TDataTable>

        <TDataTable
          title={{ text: t("table.title.filterableTable"), align: "left" }}
          visibleColumns={["name", "email", "age", "city"]}
          columns={[
            ...columns,
            {
              accessorKey: "email",
              enableColumnFilter: true,
              filterPlaceholder: "Search by email...",
            },
          ]}
          data={data}
          initialFilters={[{ id: "email", value: "s" }]}
        ></TDataTable>

        <TDataTable
          title={{ text: t("table.title.sortableTable"), align: "left" }}
          visibleColumns={["name", "email", "age", "city"]}
          columns={[
            ...columns,
            {
              accessorKey: "email",
              enableSorting: true,
            },
          ]}
          data={data}
          initialFilters={[{ id: "email", value: "s" }]}
        ></TDataTable>

        <TDataTable
          title={{ text: t("table.title.rowSelection"), align: "left" }}
          columns={[...columns]}
          data={data.slice(0, 5)}
          enableRowSelection={true}
        ></TDataTable>

        <TDataTable
          title={{ text: t("table.title.customPagination"), align: "left" }}
          columns={[
            ...columns,
            {
              accessorKey: "email",
            },
          ]}
          data={data.slice(0, 5)}
          renderCustomPagination={(table) => {
            return <>Custom pagination</>;
          }}
        ></TDataTable>

        <TDataTable
          title={{ text: t("table.title.customToolbarActions"), align: "left" }}
          columns={[
            ...columns,
            {
              accessorKey: "email",
            },
          ]}
          data={data.slice(0, 5)}
          renderToolbarItems={(table) => {
            return (
              <>
                <Button label="Add record" />
              </>
            );
          }}
        ></TDataTable>

        <TDataTable
          title={{ text: t("table.title.tooltipColumn"), align: "left" }}
          columns={[
            ...columns,
            {
              accessorKey: "email",
              tooltip: true,
              tooltipOptions: {
                position: "right",
              },
            },
            {
              accessorKey: "city",
              tooltip: true,
              tooltipOptions: {
                position: "left",
              },
            },
            {
              accessorKey: "name",
              tooltip: true,
              tooltipOptions: {
                position: "top",
              },
            },
            {
              accessorKey: "age",
              tooltip: true,
              tooltipOptions: {
                position: "bottom",
              },
            },
          ]}
          data={data.slice(0, 5)}
          enableRowSelection={true}
        ></TDataTable>

        <TDataTable
          title={{ text: t("table.title.tableAlignment"), align: "left" }}
          columns={[
            ...columns,
            {
              accessorKey: "email",
              align: "left",
            },
            {
              accessorKey: "city",
              align: "center",
            },
          ]}
          data={data.slice(0, 5)}
          enableRowSelection={true}
        ></TDataTable>

        <TDataTable
          title={{ text: t("table.title.columnAction"), align: "left" }}
          columns={[...columns]}
          data={data.slice(10, 15)}
          showColumnsAction={true}
          columnActionBtnLabel="Columns"
        ></TDataTable>

        <TDataTable
          title={{ text: t("table.title.tableFooter"), align: "left" }}
          columns={[...columns]}
          data={data}
          renderTableFooterContent={(table) => (
            <div style={{ padding: "1rem" }}>
              <span>
                Total records: {table.getPreFilteredRowModel().flatRows.length}
              </span>
            </div>
          )}
        ></TDataTable>

        <TDataTable
          title={{ text: t("table.title.borderLessTable"), align: "left" }}
          columns={[...columns]}
          data={data.slice(10, 15)}
          border="none"
          stripe="odd"
        ></TDataTable>

        <TDataTable
          title={{
            text: t("table.title.tableWithoutPagination"),
            align: "left",
          }}
          columns={[...columns]}
          data={data.slice(10, 15)}
          paginated={false}
        ></TDataTable>
      </div>
    </Page>
  );
};
