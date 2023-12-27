import { useTranslation } from "@dzangolab/react-i18n";
import { Button, TDataTable } from "@dzangolab/react-ui";

const TanstackTable = () => {
  const { t } = useTranslation("ui");

  const columns = [
    {
      accessorKey: "email",
      header: t("table.headers.email"),
    },
    {
      accessorKey: "name",
      header: () => <span>{t("table.headers.fullName")}</span>,
      width: "10rem",
      maxWidth: "10rem",
      minWidth: "10rem",
    },
    {
      accessorKey: "age",
      header: t("table.headers.age"),
      width: "6rem",
      maxWidth: "6rem",
      minWidth: "6rem",
    },
    {
      accessorKey: "city",
      header: () => <span>{t("table.headers.city")}</span>,
      width: "8rem",
      maxWidth: "8rem",
      minWidth: "8rem",
    },
  ];

  const data = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      age: 28,
      city: "New York",
    },
    {
      id: 2,
      name: "Jane Elizabeth Smith",
      email: "jane.smith@example.com",
      age: 32,
      city: "Los Angeles",
    },
    {
      id: 3,
      name: "Robert Johnson",
      email: "bob.j@example.com",
      age: 25,
      city: "Chicago",
    },
    {
      id: 4,
      name: "Alice Brown",
      email: "alice.brown@example.com",
      age: 22,
      city: "San Francisco Bay Area",
    },
    {
      id: 5,
      name: "Charles William Wilson Jr.",
      email: "charlie.w@example.com",
      age: 35,
      city: "Houston",
    },
    {
      id: 6,
      name: "Evangeline Martinez",
      email: "eva.martinez@example.com",
      age: 30,
      city: "Miami Beach",
    },
    {
      id: 7,
      name: "David Lawrence",
      email: "david.lee@example.com",
      age: 27,
      city: "Seattle",
    },
    {
      id: 8,
      name: "Sophia Turner",
      email: "sophie.t@example.com",
      age: 29,
      city: "Atlanta",
    },
    {
      id: 9,
      name: "Michael Anthony Adams",
      email: "michael.a@example.com",
      age: 31,
      city: "Dallas-Fort Worth",
    },
    {
      id: 10,
      name: "Olivia Charlotte Carter",
      email: "olivia.carter@example.com",
      age: 26,
      city: "Denver",
    },
    {
      id: 11,
      name: "Ryan Alexander Cooper",
      email: "ryan.cooper@example.com",
      age: 34,
      city: "Boston",
    },
    {
      id: 12,
      name: "Emily Davis",
      email: "emily.d@example.com",
      age: 33,
      city: "Phoenix",
    },
    {
      id: 13,
      name: "Daniel William White",
      email: "daniel.white@example.com",
      age: 28,
      city: "Philadelphia",
    },
    {
      id: 14,
      name: "Ava Rose Moore",
      email: "ava.m@example.com",
      age: 24,
      city: "Austin",
    },
    {
      id: 15,
      name: "Nicholas Harrison",
      email: "nicholas.h@example.com",
      age: 27,
      city: "San Diego",
    },
    {
      id: 16,
      name: "Emma Grace Turner",
      email: "emma.t@example.com",
      age: 29,
      city: "Portland",
    },
    {
      id: 17,
      name: "William Lewis Jr.",
      email: "william.l@example.com",
      age: 32,
      city: "Detroit",
    },
    {
      id: 18,
      name: "Grace Margaret Murphy",
      email: "grace.murphy@example.com",
      age: 26,
      city: "Minneapolis",
    },
    {
      id: 19,
      name: "Matthew Wright",
      email: "matthew.w@example.com",
      age: 30,
      city: "Charlotte",
    },
    {
      id: 20,
      name: "Lily Alexandra Adams",
      email: "lily.adams@example.com",
      age: 31,
      city: "Nashville",
    },
  ];

  return (
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
          return <>{t("table.contents.customPagination")}</>;
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
              <Button label={t("table.actions.addUser")} />
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
            align: "right",
          },
          {
            accessorKey: "age",
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
        columnActionBtnLabel={t("table.actions.columnActionBtnLabel")}
      ></TDataTable>

      <TDataTable
        title={{ text: t("table.title.tableFooter"), align: "left" }}
        columns={[...columns]}
        data={data}
        renderTableFooterContent={(table) => (
          <div style={{ padding: "1rem" }}>
            <span>
              {t("table.contents.totalRecords")}:{" "}
              {table.getPreFilteredRowModel().flatRows.length}
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
        title={{ text: t("table.title.tableWithoutPagination"), align: "left" }}
        columns={[...columns]}
        data={data.slice(10, 15)}
        paginated={false}
      ></TDataTable>
    </div>
  );
};

export default TanstackTable;
