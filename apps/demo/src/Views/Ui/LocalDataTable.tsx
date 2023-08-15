import { DataTable } from "@dzangolab/react-ui";
import { Tag } from "primereact/tag";

import type { ColumnProps } from "primereact/column";

export const LocalDataTable = () => {
  const defaultColumns: Array<ColumnProps> = [
    {
      field: "username",
      header: "User Name",
      sortable: true,
      body: (data) => {
        return data.username || <code>&#8212;</code>;
      },
    },
    {
      field: "email",
      header: "Email",
      sortable: true,
      filter: true,
      filterPlaceholder: "Search email",
    },

    {
      field: "roles",
      header: "Roles",
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
      header: "Age",
      sortable: true,
      body: (data) => {
        return data.age;
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
      <DataTable columns={defaultColumns} data={users} />
    </>
  );
};
