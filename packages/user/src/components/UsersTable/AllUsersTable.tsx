import { useTranslation } from "@dzangolab/react-i18n";
import { DataTable, useVisibleOrFilterableField } from "@dzangolab/react-ui";
import { FilterMatchMode } from "primereact/api";
import { ButtonProps } from "primereact/button";
import { ColumnProps } from "primereact/column";
import { Tag } from "primereact/tag";
import { IconType } from "primereact/utils";

import { InvitationModal } from "../Invitation";
import { InvitationActions } from "../Invitation/InvitationActions";

import type {
  AdditionalInvitationFields,
  AddInvitationResponse,
  InvitationAppOption,
  InvitationRoleOption,
} from "@/types";

type VisibleColumn =
  | "name"
  | "email"
  | "roles"
  | "signedUpAt"
  | "app"
  | "invitedBy"
  | "status"
  | "actions";

type FilterableColumn =
  | "name"
  | "email"
  | "roles"
  | "signedUpAt"
  | "app"
  | "invitedBy"
  | "status";

export type AllUsersTableProperties = {
  additionalInvitationFields?: AdditionalInvitationFields;
  apps?: Array<InvitationAppOption>;
  className?: string;
  columns?: Array<ColumnProps>;
  additionalColumns?: Array<ColumnProps>;
  fetchUsers?: (arguments_?: any) => void;
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
  visibleColumns?: VisibleColumn[];
  filterableColumns?: FilterableColumn[];
};

export const AllUsersTable = ({
  additionalInvitationFields,
  apps,
  className = "table-users",
  columns,
  additionalColumns = [],
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
  totalRecords = 0,
  users,
  visibleColumns = [
    "name",
    "email",
    "roles",
    "signedUpAt",
    "app",
    "invitedBy",
    "status",
    "actions",
  ],
  filterableColumns = ["email"],
}: AllUsersTableProperties) => {
  const { t } = useTranslation("users");

  const visibleColumnsMap = useVisibleOrFilterableField(visibleColumns);
  const filterableColumnsMap = useVisibleOrFilterableField(filterableColumns);

  const initialFilters = {
    email: { value: "", matchMode: FilterMatchMode.CONTAINS },
  };

  const defaultColumns: Array<ColumnProps> = [
    {
      field: "name",
      header: t("table.defaultColumns.name"),
      hidden: !visibleColumnsMap.name,
      filter: filterableColumnsMap.name,
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
      hidden: !visibleColumnsMap.email,
      sortable: true,
      filter: filterableColumnsMap.email,
      filterPlaceholder: t("table.searchPlaceholder"),
      showFilterMenu: false,
      showClearButton: false,
    },
    {
      field: "app",
      header: t("invitations:table.defaultColumns.app"),
      hidden: !visibleColumnsMap.app,
      filter: filterableColumnsMap.app,
      body: (data: { appId: any }) => {
        return <span>{data.appId || "-"} </span>;
      },
    },
    {
      field: "roles",
      header: t("table.defaultColumns.roles"),
      hidden: !visibleColumnsMap.roles,
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
      align: "center",
    },
    {
      field: "status",
      header: t("table.defaultColumns.status"),
      hidden: !visibleColumnsMap.status,
      filter: filterableColumnsMap.status,
      body: (data) => {
        return (
          <>
            <Tag
              value={
                data.isActiveUser ? t("status.active") : t("status.invited")
              }
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
    ...additionalColumns,
    {
      field: "invitedBy",
      header: t("invitations:table.defaultColumns.invitedBy"),
      hidden: !visibleColumnsMap.invitedBy,
      filter: filterableColumnsMap.invitedBy,
      body: (data) => {
        if (data.isActiveUser) {
          return <code>&#8212;</code>;
        }

        if (data.invitedBy.givenName || data.invitedBy.surname) {
          return `${data.invitedBy.givenName || ""} ${
            data.invitedBy.surname || ""
          }`;
        }

        return data.invitedBy.email;
      },
    },
    {
      field: "signedUpAt",
      header: t("table.defaultColumns.signedUpOn"),
      hidden: !visibleColumnsMap.signedUpAt,
      filter: filterableColumnsMap.signedUpAt,
      body: (data) => {
        if (data.signedUpAt) {
          const date = new Date(data.signedUpAt);

          return date.toLocaleDateString("en-GB");
        }

        return "-";
      },
    },
    {
      field: "actions",
      header: t("invitations:table.defaultColumns.actions"),
      hidden: !visibleColumnsMap.actions,
      body: (data) => {
        return (
          <>
            {data.isActiveUser ? (
              "-"
            ) : (
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
  ];

  const rowClassNameCallback = (data: any) => {
    if (data.isActiveUser) {
      return `active-user user-${data.id}`;
    }

    return `invited-user invitation-${data.id}`;
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
