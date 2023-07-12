import { useTranslation } from "@dzangolab/react-i18n";
import { DataTable } from "@dzangolab/react-ui";
import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { ColumnProps } from "primereact/column";
import { Tag } from "primereact/tag";

export type UsersTableProperties = {
  id?: string;
  className?: string;
  columns?: Array<ColumnProps>;
  loading?: boolean;
  showInviteAction?: boolean;
  totalRecords?: number;
  users: Array<object>;
  fetchUsers: (arguments_?: any) => void;
};

export const UsersTable = ({
  id = "table-users",
  className = "table-users",
  columns,
  loading = false,
  showInviteAction = true,
  totalRecords = 0,
  users,
  fetchUsers,
}: UsersTableProperties) => {
  const { t } = useTranslation("users");

  const initialFilters = {
    email: { value: "", matchMode: FilterMatchMode.CONTAINS },
  };

  const defaultColumns: Array<ColumnProps> = [
    {
      field: "name",
      header: t("table.defaultColumns.name"),
      sortable: false,
      body: (data) => {
        return (
          (data.givenName ? data.givenName : "") +
            (data.middleNames ? " " + data.middleNames : "") +
            (data.surname ? " " + data.surname : "") || <code>&#8212;</code>
        );
      },
    },
    {
      field: "email",
      header: t("table.defaultColumns.email"),
      sortable: true,
      filter: true,
      filterPlaceholder: t("table.searchPlaceholder"),
      showFilterMenu: false,
      showClearButton: false,
    },

    {
      field: "roles",
      header: t("table.defaultColumns.roles"),
      body: (data) => {
        return data.roles.map((role: string, index: number) => (
          <Tag
            key={role + index}
            value={role}
            style={{
              background: role === "ADMIN" ? "#6366F1" : "#22C55E",
              width: "5rem",
            }}
          />
        ));
      },
      align: "center",
    },
    {
      field: "signedUpAt",
      header: t("table.defaultColumns.signedUpOn"),
      body: (data) => {
        const date = new Date(data.signedUpAt);

        return date.toLocaleDateString("en-GB");
      },
    },
  ];

  const rowClassNameCallback = (data: any) => {
    return `user-${data.id}`;
  };

  const renderHeader = () => {
    if (showInviteAction) {
      return (
        <div className="table-actions">
          <Button icon="pi pi-user-plus" label={t("Add member")} size="small" />
        </div>
      );
    }
  };

  return (
    <DataTable
      className={className}
      columns={columns ? columns : defaultColumns}
      data={users}
      emptyMessage={t("app:table.emptyMessage")}
      fetchData={fetchUsers}
      header={renderHeader}
      id={id}
      initialFilters={initialFilters}
      loading={loading}
      rowClassName={rowClassNameCallback}
      showGridlines
      stripedRows={false}
      totalRecords={totalRecords}
    ></DataTable>
  );
};
