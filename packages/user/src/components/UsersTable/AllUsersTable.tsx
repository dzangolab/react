import { useTranslation } from "@dzangolab/react-i18n";
import { DataTable } from "@dzangolab/react-ui";
import { FilterMatchMode } from "primereact/api";
import { ButtonProps } from "primereact/button";
import { ColumnProps } from "primereact/column";
import { Tag } from "primereact/tag";
import { IconType } from "primereact/utils";

import { InvitationModal } from "../Invitation";

import type {
  AdditionalInvitationFields,
  AddInvitationResponse,
  InvitationAppOption,
  InvitationRoleOption,
} from "@/types";
import { InvitationActions } from "../Invitation/InvitationActions";

export type AllUsersTableProperties = {
  additionalInvitationFields?: AdditionalInvitationFields;
  apps?: Array<InvitationAppOption>;
  className?: string;
  columns?: Array<ColumnProps>;
  extraColumns?: Array<ColumnProps>;
  fetchUsers: (arguments_?: any) => void;
  id?: string;
  inviteButtonIcon?: IconType<ButtonProps>;
  loading?: boolean;
  onInvitationAdded?: (response: AddInvitationResponse) => void;
  onInvitationResent?: (data: any) => void;
  onInvitationRevoked?: (data: any) => void;
  prepareInvitationData?: (data: any) => any;
  roles?: Array<InvitationRoleOption>;
  showInviteAction?: boolean;
  showAppColumn?: boolean;
  totalRecords?: number;
  users: Array<object>;
};

export const AllUsersTable = ({
  additionalInvitationFields,
  apps,
  className = "table-users",
  columns,
  extraColumns = [],
  fetchUsers,
  id = "table-users",
  inviteButtonIcon,
  loading = false,
  onInvitationAdded,
  onInvitationResent,
  onInvitationRevoked,
  prepareInvitationData,
  roles,
  showInviteAction = true,
  showAppColumn = true,
  totalRecords = 0,
  users,
}: AllUsersTableProperties) => {
  const { t } = useTranslation("users");

  const initialFilters = {
    email: { value: "", matchMode: FilterMatchMode.CONTAINS },
  };

  const appColumn: Array<ColumnProps> = showAppColumn
    ? [
        {
          field: "app",
          header: t("user:invitations.table.defaultColumns.app"),
          body: (data: { appId: any }) => {
            return <span>{data.appId || "-"} </span>;
          },
          align: "center",
        },
      ]
    : [];

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
    ...appColumn,
    {
      field: "roles",
      header: t("table.defaultColumns.roles"),
      body: (data) => {
        return (
          <>
            {data.roles.map((role: string, index: number) => (
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
      },
      align: "center",
    },
    {
      field: "status",
      header: t("table.defaultColumns.status"),
      body: (data) => {
        return (
          <>
            <Tag
              value={data.isActiveUser ? "ACTIVE" : "PENDING"}
              style={{
                background: data.isActiveUser ? "#6366F1" : "#22C55E",
                width: "5rem",
              }}
            />
          </>
        );
      },
      align: "center",
    },
    ...extraColumns,
    {
      field: "invitedBy",
      header: t("user:invitations.table.defaultColumns.invitedBy"),
      body: (data) => {
        if (!data.invitedBy) {
          return <code>&#8212;</code>;
        }

        if (data.invitedBy.givenName || data.invitedBy.surname) {
          return `${data.invitedBy.givenName || ""} ${
            data.invitedBy.surname || ""
          }`;
        }

        return data.invitedBy.email;
      },
      align: "center",
    },
    {
      field: "actions",
      header: t("user:invitations.table.defaultColumns.actions"),
      body: (data) => {
        return (
          <>
            {data.isActiveUser ? null : (
              <InvitationActions
                onInvitationResent={onInvitationResent}
                onInvitationRevoked={onInvitationRevoked}
                invitation={data}
              />
            )}
          </>
        );
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
          <InvitationModal
            additionalInvitationFields={additionalInvitationFields}
            apps={apps}
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
      columns={columns ? columns : defaultColumns}
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
