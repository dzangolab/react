import { useTranslation } from "@dzangolab/react-i18n";
import { ActionsMenu, DataTable } from "@dzangolab/react-ui";
import { Tag } from "primereact/tag";

import type { ColumnProps } from "primereact/column";

import "./index.css";

export const LocalDataTable = () => {
  const { t } = useTranslation("ui");

  const defaultColumns: Array<ColumnProps> = [
    {
      field: "username",
      header: t("table.headers.userName"),
      sortable: true,
      body: (data) => {
        return data.username || <code>&#8212;</code>;
      },
    },
    {
      field: "email",
      header: t("table.headers.email"),
      sortable: true,
      filter: true,
      filterPlaceholder: "Search email",
    },

    {
      field: "roles",
      header: t("table.headers.roles"),
      body: (data) => {
        return (
          <>
            <Tag
              value={data.isAdmin ? "ADMIN" : "USER"}
              style={{
                background: data.isAdmin ? "#6366F1" : "#22C55E",
                width: "5rem",
              }}
            />
          </>
        );
      },
      align: "center",
    },
    {
      field: "age",
      header: t("table.headers.age"),
      sortable: true,
      body: (data) => {
        return data.age;
      },
    },
    {
      field: "action",
      header: t("table.headers.action"),
      body: (data) => {
        return (
          <ActionsMenu
            onView={() => {}}
            onEdit={() => {}}
            onDelete={() => {
              console.log(data);
            }}
            requireConfirmationOnDelete={true}
          />
        );
      },
    },
  ];

  const users = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      username: "johndoe",
      email: "john@example.com",
      age: 30,
      isAdmin: false,
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      username: "janesmith",
      email: "jane@example.com",
      age: 28,
      isAdmin: true,
    },
    {
      id: 3,
      firstName: "Michael",
      lastName: "Johnson",
      username: "michaelj",
      email: "michael@example.com",
      age: 25,
      isAdmin: false,
    },
    {
      id: 4,
      firstName: "Emily",
      lastName: "Williams",
      username: "emilyw",
      email: "emily@example.com",
      age: 32,
      isAdmin: false,
    },
    {
      id: 5,
      firstName: "William",
      lastName: "Brown",
      username: "willb",
      email: "william@example.com",
      age: 22,
      isAdmin: false,
    },
    {
      id: 6,
      firstName: "John",
      lastName: "Doe",
      username: "johndoe",
      email: "john@example.com",
      age: 30,
      isAdmin: false,
    },
    {
      id: 7,
      firstName: "Jane",
      lastName: "Smith",
      username: "janesmith",
      email: "jane@example.com",
      age: 28,
      isAdmin: true,
    },
    {
      id: 8,
      firstName: "Michael",
      lastName: "Johnson",
      username: "michaelj",
      email: "michael@example.com",
      age: 25,
      isAdmin: false,
    },
    {
      id: 9,
      firstName: "Emily",
      lastName: "Williams",
      username: "emilyw",
      email: "emily@example.com",
      age: 32,
      isAdmin: false,
    },
    {
      id: 10,
      firstName: "William",
      lastName: "Brown",
      username: "willb",
      email: "william@example.com",
      age: 22,
      isAdmin: false,
    },
  ];

  return (
    <>
      <DataTable
        className="table-localdata"
        columns={defaultColumns}
        rows={5}
        data={users}
      />
    </>
  );
};
