import { DatePickerBasic } from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import {
  TDataTable,
  Page,
  Button,
  TableColumnDefinition,
  DebouncedInput,
} from "@dzangolab/react-ui";
import { FilterFunction } from "@dzangolab/react-ui";

import CssExample from "./CssExample";
import {
  HORIZONTAL_CSS_CODE,
  VERTICAL_CSS_CODE,
  data,
  formatDemoData,
} from "./data";
import { Section } from "../../../../components/Demo";

declare module "@dzangolab/react-ui" {
  interface FilterFunctions {
    inDateRangeFilter: FilterFunction<unknown>;
    customEqualStringFilter: FilterFunction<unknown>;
  }
}

export const TableDemo = () => {
  const [t] = useTranslation("ui");

  const columns: Array<TableColumnDefinition<any>> = [
    {
      accessorKey: "email",
      header: "Email",
      enableSorting: true,
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

  const inDateRangeFilter: FilterFunction<any> = (
    row,
    columnId,
    value: [Date, Date],
  ) => {
    if (!value[0] || !value[1]) {
      return true;
    }

    if (
      value[0].getTime() <= (row.original.date as Date).getTime() &&
      (row.original.date as Date).getTime() < value[1].getTime()
    ) {
      return true;
    } else {
      return false;
    }
  };

  const customEqualStringFilter: FilterFunction<any> = (
    row,
    columnId,
    value: string,
  ) => {
    if (value.includes(row.getValue(columnId) as string)) {
      return true;
    }

    return false;
  };

  return (
    <Page title={t("table.title")}>
      <Section title={t("table.usage.basic")}>
        <TDataTable
          columns={columns}
          data={data}
          id="invitations-table"
          initialFilters={[{ id: "email", value: "O" }]}
          initialSorting={[{ id: "email", desc: false }]}
        ></TDataTable>
      </Section>

      <Section title={t("table.usage.filterable")}>
        <TDataTable
          visibleColumns={["email", "name", "age", "city"]}
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
          initialSorting={[{ id: "email", desc: false }]}
        ></TDataTable>
      </Section>

      <Section title={t("table.usage.sortable")}>
        <TDataTable
          visibleColumns={["email", "name", "age", "city"]}
          columns={columns.map((column) => ({
            ...column,
            enableSorting: true,
          }))}
          data={data}
          initialFilters={[{ id: "email", value: "s" }]}
          initialSorting={[{ id: "email", desc: false }]}
        ></TDataTable>
      </Section>

      <Section title={t("table.usage.rowSelection")}>
        <TDataTable
          columns={[...columns]}
          data={data.slice(0, 5)}
          enableRowSelection={true}
          initialSorting={[{ id: "email", desc: false }]}
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
          initialSorting={[{ id: "email", desc: false }]}
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
          initialSorting={[{ id: "email", desc: false }]}
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
          initialSorting={[{ id: "email", desc: false }]}
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
          initialSorting={[{ id: "email", desc: false }]}
        ></TDataTable>
      </Section>

      <Section title={t("table.usage.columnAction")}>
        <TDataTable
          columns={[...columns]}
          data={data.slice(10, 15)}
          showColumnsAction={true}
          columnActionBtnLabel="Columns"
          initialSorting={[{ id: "email", desc: false }]}
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
          initialSorting={[{ id: "email", desc: false }]}
        ></TDataTable>
      </Section>

      <Section title={t("table.usage.tableBorderVertical")}>
        <TDataTable
          showColumnsAction={true}
          columnActionBtnLabel="Columns"
          className="vertical"
          visibleColumns={["email", "name", "age", "city"]}
          columns={[...columns]}
          data={data}
          initialSorting={[{ id: "email", desc: false }]}
        ></TDataTable>
        <CssExample
          exampleCode={VERTICAL_CSS_CODE}
          subheader={
            <>
              <p>Add following css to your stylesheet for vertical borders</p>
              <p>
                <strong>Note:</strong> In this example, we are using custom
                class&nbsp;
                <code>.vertical</code> in our table. Replace it with class used
                in your table.
              </p>
            </>
          }
        />
      </Section>

      <Section title={t("table.usage.tableBorderHorizontal")}>
        <TDataTable
          showColumnsAction={true}
          columnActionBtnLabel="Columns"
          className="horizontal"
          visibleColumns={["email", "name", "age", "city"]}
          columns={[...columns]}
          data={data}
          initialSorting={[{ id: "email", desc: false }]}
        ></TDataTable>
        <CssExample
          exampleCode={HORIZONTAL_CSS_CODE}
          subheader={
            <>
              <p>Add following css to your stylesheet for horizontal borders</p>
              <p>
                <strong>Note:</strong> In this example, we are using custom
                class&nbsp;
                <code>.horizontal</code> in our table. Replace it with class
                used in your table.
              </p>
            </>
          }
        />
      </Section>

      <Section title={t("table.usage.withoutPagination")}>
        <TDataTable
          columns={[...columns]}
          data={data.slice(10, 15)}
          paginated={false}
          initialSorting={[{ id: "email", desc: false }]}
        ></TDataTable>
      </Section>

      <Section title={t("table.usage.withTitle")}>
        <TDataTable
          title={{ text: "Table title", align: "left" }}
          columns={[...columns]}
          data={data.slice(10, 15)}
          paginated={false}
          initialSorting={[{ id: "email", desc: false }]}
        ></TDataTable>
      </Section>

      <Section title={t("table.usage.builtInActionColumn")}>
        <TDataTable
          columns={[...columns]}
          data={data.slice(10, 15)}
          paginated={false}
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
            displayActions: (rowData) => {
              return rowData.id !== 12;
            },
          }}
          initialSorting={[{ id: "email", desc: false }]}
        />
      </Section>

      <Section title={t("table.usage.rowSpecificActions")}>
        <TDataTable
          columns={[...columns]}
          data={data.slice(10, 15)}
          paginated={false}
          dataActionsMenu={{
            actions: [
              {
                label: "View",
                display: (rowData) => {
                  return rowData.id !== 12;
                },
                onClick: (rowData) => {
                  //your logic here
                  // eslint-disable-next-line no-console
                  console.log(rowData, "view action");
                },
              },
              {
                label: "Edit",
                display: (rowData) => {
                  return rowData.id !== 12;
                },
                disabled: true,
                onClick: (rowData) => {
                  //your logic here
                  // eslint-disable-next-line no-console
                  console.log(rowData, "edit action");
                },
              },
              {
                label: "Share",
                display: (rowData) => {
                  return rowData.id !== 12;
                },
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
          initialSorting={[{ id: "email", desc: false }]}
        />
      </Section>

      <Section title={t("table.usage.singleActionColumn")}>
        <TDataTable
          columns={[...columns]}
          data={data.slice(10, 15)}
          paginated={false}
          dataActionsMenu={{
            actions: [
              {
                label: "View",
                icon: "pi pi-eye",
                onClick: (rowData) => {
                  //your logic here
                  // eslint-disable-next-line no-console
                  console.log(rowData, "view action");
                },
              },
            ],
          }}
          initialSorting={[{ id: "email", desc: false }]}
        />
      </Section>

      <Section title={t("table.usage.singleActionColumnWithMenu")}>
        <TDataTable
          columns={[...columns]}
          data={data.slice(10, 15)}
          paginated={false}
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
            ],
            displayActionMenu: true,
          }}
          initialSorting={[{ id: "email", desc: false }]}
        />
      </Section>

      <Section title={t("table.usage.withCustomFilter")}>
        <TDataTable
          columns={[
            ...columns,
            {
              accessorKey: "email",
              enableColumnFilter: true,
              customFilterComponent: (column) => (
                <DebouncedInput
                  defaultValue={column.getFilterValue() as string}
                  onInputChange={(value) => {
                    column.setFilterValue(value);
                  }}
                  placeholder={"Custom filter..."}
                  debounceTime={200}
                ></DebouncedInput>
              ),
              meta: {
                serverFilterFn: "contains",
              },
            },
          ]}
          fetchData={() => {}}
          data={data.slice(10, 15)}
          initialSorting={[{ id: "email", desc: false }]}
        ></TDataTable>
      </Section>

      <Section title={t("table.usage.withEqualServerFilter")}>
        <TDataTable
          columns={[
            ...columns,
            {
              accessorKey: "email",
              enableColumnFilter: true,
              meta: {
                serverFilterFn: "equals",
              },
            },
          ]}
          fetchData={() => {}}
          data={data.slice(10, 15)}
          initialSorting={[{ id: "email", desc: false }]}
        ></TDataTable>
      </Section>

      <Section title={t("table.usage.cellDataFormatting")}>
        <TDataTable
          columns={[
            {
              accessorKey: "description",
              header: "Description",
            },
            {
              accessorKey: "quantity",
              header: () => "Quantity",
              enableSorting: true,
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
              width: "10rem",
              maxWidth: "10rem",
              minWidth: "10rem",
              dataType: "date",
            },
            {
              id: "action",
              header: () => <i className="pi pi-cog"></i>,
              width: "5rem",
              dataType: "other",
              cell: () => <Button iconLeft="pi pi-eye" variant="textOnly" />,
            },
          ]}
          data={formatDemoData}
          paginated={false}
          initialSorting={[{ id: "quantity", desc: true }]}
        ></TDataTable>
      </Section>

      <Section title={t("table.usage.customCellDataFormatting")}>
        <TDataTable
          columns={[
            {
              accessorKey: "description",
              header: "Description",
            },
            {
              accessorKey: "quantity",
              header: () => "Quantity",
              enableSorting: true,
              width: "10rem",
              maxWidth: "10rem",
              minWidth: "10rem",
              dataType: "number",
            },
            {
              accessorKey: "amount",
              header: "Amount",
              width: "10rem",
              maxWidth: "10rem",
              minWidth: "10rem",
              dataType: "currency",
            },
            {
              accessorKey: "date",
              header: "Date",
              width: "10rem",
              maxWidth: "10rem",
              minWidth: "10rem",
              dataType: "date",
            },
            {
              id: "action",
              header: () => <i className="pi pi-cog"></i>,
              width: "5rem",
              dataType: "other",
              cell: () => <Button iconLeft="pi pi-eye" variant="textOnly" />,
            },
          ]}
          data={formatDemoData}
          paginated={false}
          customFormatters={{
            number: (value) => `~${value}`,
            currency: (value) => `$${value}`,
          }}
          initialSorting={[{ id: "quantity", desc: true }]}
        ></TDataTable>
      </Section>

      <Section title={t("table.usage.customStaticFilter")}>
        <TDataTable
          columns={[
            {
              accessorKey: "description",
              header: "Description",
              filterFn: "customEqualStringFilter",
              enableColumnFilter: true,
              filterPlaceholder: "Match description ..",
            },
            {
              accessorKey: "quantity",
              header: () => "Quantity",
              enableSorting: true,
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
              width: "16rem",
              maxWidth: "16rem",
              minWidth: "16rem",
              dataType: "date",
              enableColumnFilter: true,
              filterFn: "inDateRangeFilter",
              customFilterComponent(column) {
                return (
                  <div className="filter-date">
                    <DatePickerBasic
                      inputRef={null}
                      name="start-date"
                      onChange={(date) =>
                        column.setFilterValue((old: [Date, Date]) => [
                          date,
                          old?.[1],
                        ])
                      }
                      value={(column.getFilterValue() as [Date, Date])?.[0]}
                      placeholder={t("table.placeholder.startDate")}
                    />
                    <DatePickerBasic
                      inputRef={null}
                      name="end-date"
                      onChange={(date) =>
                        column.setFilterValue((old: [Date, Date]) => [
                          old?.[0],
                          date,
                        ])
                      }
                      value={(column.getFilterValue() as [Date, Date])?.[1]}
                      placeholder={t("table.placeholder.endDate")}
                    />
                  </div>
                );
              },
            },
            {
              id: "action",
              header: () => <i className="pi pi-cog"></i>,
              width: "5rem",
              dataType: "other",
              cell: () => <Button iconLeft="pi pi-eye" variant="textOnly" />,
            },
          ]}
          data={formatDemoData}
          paginated={false}
          filterFns={{
            inDateRangeFilter: inDateRangeFilter,
            customEqualStringFilter: customEqualStringFilter,
          }}
          initialSorting={[{ id: "quantity", desc: true }]}
        ></TDataTable>
      </Section>

      <Section title={t("table.usage.divContent")}>
        <TDataTable
          columns={[
            {
              accessorKey: "email",
              header: "Email",
              enableSorting: true,
            },
            {
              accessorKey: "name",
              header: "Name",
              align: "center",
              width: "30rem",
              maxWidth: "30rem",
              minWidth: "30rem",
              cell: ({ row: { original } }) => (
                <div className="cell-name">{original.name}</div>
              ),
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
          ]}
          data={data.slice(10, 15)}
          initialSorting={[{ id: "email", desc: false }]}
        ></TDataTable>
      </Section>
    </Page>
  );
};
