import { useTranslation } from "@dzangolab/react-i18n";
import { DataTable, useColumnsMap } from "@dzangolab/react-ui";
import { FilterMatchMode } from "primereact/api";
import { ButtonProps } from "primereact/button";
import { ColumnProps } from "primereact/column";
import { Tag } from "primereact/tag";
import { IconType } from "primereact/utils";
import { useMemo } from "react";

import { InvitationModal } from "../Invitation";

import type {
  AdditionalInvitationFields,
  AddInvitationResponse,
  InvitationAppOption,
  InvitationRoleOption,
  InvitationExpiryDateField,
} from "@/types";

type VisibleColumn = "name" | "email" | "roles" | "signedUpAt" | string;

type FilterableColumn = "name" | "email" | "roles" | "signedUpAt" | string;

export type UsersTableProperties = {
  additionalInvitationFields?: AdditionalInvitationFields;
  apps?: Array<InvitationAppOption>;
  className?: string;
  columns?: Array<ColumnProps>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetchUsers: (arguments_?: any) => void;
  id?: string;
  invitationExpiryDateField?: InvitationExpiryDateField;
  inviteButtonIcon?: IconType<ButtonProps>;
  loading?: boolean;
  onInvitationAdded?: (response: AddInvitationResponse) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prepareInvitationData?: (data: any) => any;
  roles?: Array<InvitationRoleOption>;
  showInviteAction?: boolean;
  totalRecords?: number;
  users: Array<object>;
  visibleColumns?: VisibleColumn[];
  filterableColumns?: FilterableColumn[];
};

export const UsersTable = ({
  additionalInvitationFields,
  apps,
  className = "table-users",
  columns = [],
  fetchUsers,
  id = "table-users",
  invitationExpiryDateField,
  inviteButtonIcon,
  loading = false,
  onInvitationAdded,
  prepareInvitationData,
  roles,
  showInviteAction = true,
  totalRecords = 0,
  users,
  visibleColumns = ["name", "email", "roles", "signedUpAt"],
  filterableColumns = ["email"],
}: UsersTableProperties) => {
  const { t } = useTranslation("users");
  const filterableColumnsMap = useColumnsMap(filterableColumns);

  const initialFilters = {
    email: { value: "", matchMode: FilterMatchMode.CONTAINS },
  };

  const defaultColumns: Array<ColumnProps> = [
    {
      field: "name",
      header: t("table.defaultColumns.name"),
      sortable: false,
      filter: filterableColumnsMap.name,
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
      filter: filterableColumnsMap.email,
      filterPlaceholder: t("table.searchPlaceholder"),
      showFilterMenu: false,
      showClearButton: false,
    },

    {
      align: "center",
      field: "roles",
      header: t("table.defaultColumns.roles"),
      filter: filterableColumnsMap.roles,
      body: (data) => {
        if (data?.roles) {
          return (
            <>
              {data?.roles?.map((role: string, index: number) => (
                <Tag
                  key={role + index}
                  value={role}
                  style={{
                    background: role === "ADMIN" ? "#6366F1" : "#22C55E",
                    width: "5rem",
                  }}
                />
              ))}
            </>
          );
        }

        return (
          <>
            <Tag
              value={data.role}
              style={{
                background: data.role === "ADMIN" ? "#6366F1" : "#22C55E",
                width: "5rem",
              }}
            />
          </>
        );
      },
    },
    {
      field: "signedUpAt",
      header: t("table.defaultColumns.signedUpOn"),
      filter: filterableColumnsMap.signedUpAt,
      body: (data) => {
        const date = new Date(data.signedUpAt);

        return date.toLocaleDateString("en-GB");
      },
    },
    ...columns,
  ];

  const sortedColumns: Array<ColumnProps> = useMemo(() => {
    const mappedColumns = new Map();
    for (const column of defaultColumns) {
      if (mappedColumns.get(column.field)) {
        mappedColumns.set(column.field, {
          ...mappedColumns.get(column.field),
          ...column,
        });
      } else {
        mappedColumns.set(column.field, column);
      }
    }

    return visibleColumns.map<ColumnProps>((visibleColumn) =>
      mappedColumns.get(visibleColumn),
    );
  }, [visibleColumns, defaultColumns]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rowClassNameCallback = (data: any) => {
    return `user-${data.id}`;
  };

  const renderHeader = () => {
    if (showInviteAction) {
      return (
        <div className="table-actions">
          <InvitationModal
            additionalInvitationFields={additionalInvitationFields}
            apps={apps}
            expiryDateField={invitationExpiryDateField}
            buttonIcon={inviteButtonIcon}
            onSubmitted={onInvitationAdded}
            prepareData={prepareInvitationData}
            roles={roles}
          />
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <DataTable
      className={className}
      columns={sortedColumns}
      data={users}
      emptyMessage={t("app:table.emptyMessage")}
      fetchData={fetchUsers}
      header={renderHeader()}
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
