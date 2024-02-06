import { useTranslation } from "@dzangolab/react-i18n";
import {
  ActionsMenu,
  DataTable,
  Message,
  Page,
  Tag,
} from "@dzangolab/react-ui";

import { Section } from "../../../../components/Demo";

import type { ColumnProps } from "primereact/column";

import "./index.css";

export const LocalDataTableDemo = () => {
  const { t } = useTranslation("ui");

  const defaultColumns: Array<ColumnProps> = [
    {
      field: "username",
      header: "Username",
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
              label={
                data.isAdmin
                  ? t("localDataTable.role.admin")
                  : t("localDataTable.role.user")
              }
              color={data.isAdmin ? "blue" : "green"}
              fullWidth
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
    {
      field: "action",
      header: "",
      body: (data) => {
        return (
          <ActionsMenu
            onView={() => {}}
            onEdit={() => {}}
            onDelete={() => {}}
            requireConfirmationOnDelete={true}
            deleteConfirmationMessage="Are you sure you want to delete?"
            deleteConfirmationHeader="Delete confirmation"
            data={data}
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
    <Page title={t("localDataTable.title")}>
      <Message
        message={t("localDataTable.warning")}
        icon="pi pi-exclamation-triangle"
      ></Message>
      <br />
      <Section>
        <DataTable
          className="table-localdata"
          columns={defaultColumns}
          rows={5}
          data={users}
        />
      </Section>
    </Page>
  );
};
