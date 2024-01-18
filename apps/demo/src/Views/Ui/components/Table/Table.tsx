import { useTranslation } from "@dzangolab/react-i18n";
import {
  TDataTable,
  Page,
  Button,
  TableColumnDefinition,
} from "@dzangolab/react-ui";

import { data, formatDemoData } from "./data";
import { Section } from "../../../../components/Demo";

export const TableDemo = () => {
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
    <Page title={t("table.title")}>
      <Section title={t("table.usage.basic")}>
        <TDataTable
          columns={columns}
          data={data}
          id="invitations-table"
          initialFilters={[{ id: "email", value: "O" }]}
        ></TDataTable>
      </Section>

      <Section title={t("table.usage.filterable")}>
        <TDataTable
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
      </Section>

      <Section title={t("table.usage.sortable")}>
        <TDataTable
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
      </Section>

      <Section title={t("table.usage.rowSelection")}>
        <TDataTable
          columns={[...columns]}
          data={data.slice(0, 5)}
          enableRowSelection={true}
        ></TDataTable>
      </Section>

      <Section title={t("table.usage.customPagination")}>
        <TDataTable
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
      </Section>

      <Section title={t("table.usage.customToolbarActions")}>
        <TDataTable
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
      </Section>

      <Section title={t("table.usage.columnTooltip")}>
        <TDataTable
          title={{
            text: t("table.usage.columnTooltip"),
            align: "left",
          }}
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
      </Section>

      <Section title={t("table.usage.columnAlignment")}>
        <TDataTable
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
      </Section>

      <Section title={t("table.usage.columnAction")}>
        <TDataTable
          columns={[...columns]}
          data={data.slice(10, 15)}
          showColumnsAction={true}
          columnActionBtnLabel="Columns"
        ></TDataTable>
      </Section>

      <Section title={t("table.usage.withFooter")}>
        <TDataTable
          columns={[...columns]}
          data={data}
          renderTableFooterContent={(table) => (
            <tr>
              <td>
                Total records: {table.getPreFilteredRowModel().flatRows.length}
              </td>
            </tr>
          )}
        ></TDataTable>
      </Section>

      <Section title={t("table.usage.borderless")}>
        <TDataTable
          columns={[...columns]}
          data={data.slice(10, 15)}
          border="none"
          stripe="odd"
        ></TDataTable>
      </Section>

      <Section title={t("table.usage.withoutPagination")}>
        <TDataTable
          columns={[...columns]}
          data={data.slice(10, 15)}
          paginated={false}
        ></TDataTable>
      </Section>

      <Section title={t("table.usage.withTitle")}>
        <TDataTable
          title={{ text: "Table title", align: "left" }}
          columns={[...columns]}
          data={data.slice(10, 15)}
          paginated={false}
        ></TDataTable>
      </Section>

      <Section title={t("table.usage.builtInActionColumn")}>
        <TDataTable
          columns={[...columns]}
          data={data.slice(10, 15)}
          paginated={false}
          displayRowActions={(rowData) => {
            return rowData.id !== 12;
          }}
          dataActionsMenu={{
            actions: [
              {
                label: "View",
                onClick: (rowData) => {
                  //your logic here
                  // eslint-disable-next-line no-console
                  console.log(rowData, "view action");
                },
              },
              {
                label: "Edit",
                disabled: true,
                onClick: (rowData) => {
                  //your logic here
                  // eslint-disable-next-line no-console
                  console.log(rowData, "edit action");
                },
              },
              {
                label: "Share",
                disabled: (rowData) => {
                  ///your logic here
                  return rowData.id !== 11;
                },
                onClick: (rowData) => {
                  //your logic here
                  // eslint-disable-next-line no-console
                  console.log(rowData, "share action");
                },
              },
              {
                label: "Delete",
                className: "danger",
                onClick: (rowData) => {
                  //your logic here
                  // eslint-disable-next-line no-console
                  console.log(rowData, "delete action");
                },
                requireConfirmationModal: true,
                confirmationOptions: {
                  header: "Are you sure!",
                  message: "You are going to delete this data.",
                },
              },
            ],
          }}
        ></TDataTable>
      </Section>

      <Section title={t("table.usage.cellDataFormating")}>
        <TDataTable
          columns={[
            {
              accessorKey: "description",
              header: "Description",
            },
            {
              accessorKey: "quantity",
              header: () => "Quantity",
              width: "10rem",
              maxWidth: "10rem",
              minWidth: "10rem",
              dataType: "number",
              numberOptions: {
                locale: "en-IN",
              },
            },
            {
              accessorKey: "amount",
              header: "Amount",
              width: "10rem",
              maxWidth: "10rem",
              minWidth: "10rem",
              dataType: "currency",
              numberOptions: {
                locale: "en-US",
                formatOptions: {
                  currency: "EUR",
                },
              },
            },
            {
              accessorKey: "date",
              header: "Date",
              width: "12rem",
              maxWidth: "12rem",
              minWidth: "12rem",
              dataType: "date",
            },
            {
              id: "action",
              header: "",
              width: "8rem",
              dataType: "other",
              cell: () => <Button iconLeft="pi pi-eye" />,
            },
          ]}
          data={formatDemoData}
          paginated={false}
        ></TDataTable>
      </Section>
    </Page>
  );
};
