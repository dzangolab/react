import { useTranslation } from "@dzangolab/react-i18n";
import {
  TDataTable as DataTable,
  TDataTableProperties,
  TRequestJSON,
  Button,
} from "@dzangolab/react-ui";
import { Tag } from "primereact/tag";
import { ComponentType } from "react";

import { UserAction } from "./UserActions";
import { InvitationModal } from "../Invitation";
import { InvitationActions } from "../Invitation/InvitationActions";

import type {
  AdditionalInvitationFields,
  AddInvitationResponse,
  InvitationAppOption,
  InvitationRoleOption,
  ResendInvitationResponse,
  RevokeInvitationResponse,
  ExtendedUser,
  Invitation,
} from "@/types";
import type { ColumnDef } from "@tanstack/react-table";

type VisibleColumn =
  | "name"
  | "email"
  | "roles"
  | "signedUpAt"
  | "app"
  | "invitedBy"
  | "status"
  | "actions"
  | string;

export type AllUsersTableProperties = Partial<
  Omit<
    TDataTableProperties<ExtendedUser>,
    "data" | "visibleColumns" | "fetchData"
  >
> & {
  additionalInvitationFields?: AdditionalInvitationFields;
  apps?: Array<InvitationAppOption>;
  fetchUsers?: (arguments_: TRequestJSON) => void;
  onInvitationAdded?: (response: AddInvitationResponse) => void;
  onInvitationResent?: (data: ResendInvitationResponse) => void;
  onInvitationRevoked?: (data: RevokeInvitationResponse) => void;
  onUserDisabled?: (data: any) => void;
  onUserEnabled?: (data: any) => void;
  invitationButtonOptions?: ComponentType<typeof Button>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prepareInvitationData?: (data: any) => any;
  roles?: Array<InvitationRoleOption>;
  showInviteAction?: boolean;
  showAppColumn?: boolean;
  users: Array<ExtendedUser>;
  visibleColumns?: VisibleColumn[];
};

export const AllUsersTable = ({
  additionalInvitationFields,
  apps,
  className = "table-users",
  columns = [],
  fetchUsers,
  onInvitationAdded,
  onInvitationResent,
  onInvitationRevoked,
  onUserDisabled,
  onUserEnabled,
  invitationButtonOptions,
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
  ...tableOptions
}: AllUsersTableProperties) => {
  const { t } = useTranslation("users");

  const defaultColumns: Array<ColumnDef<ExtendedUser>> = [
    {
      accessorKey: "name",
      header: t("table.defaultColumns.name"),
      cell: ({ row: { original } }) => {
        return (
          (original.givenName ? original.givenName : "") +
            (original.middleNames ? " " + original.middleNames : "") +
            (original.surname ? " " + original.surname : "") || (
            <code>&#8212;</code>
          )
        );
      },
      enableColumnFilter: true,
      enableSorting: true,
    },
    {
      accessorKey: "email",
      header: t("table.defaultColumns.email"),
      enableColumnFilter: true,
      enableSorting: true,
    },
    {
      accessorKey: "app",
      header: t("invitations:table.defaultColumns.app"),
      cell: ({ row: { original } }) => {
        return <span>{original.appId || "-"} </span>;
      },
    },
    {
      align: "center",
      accessorKey: "roles",
      header: t("table.defaultColumns.roles"),
      cell: ({ getValue, row: { original } }) => {
        const roles = (original as unknown as { roles: string[] })?.roles;

        if (Array.isArray(roles)) {
          return (
            <>
              {roles?.map((role: string, index: number) => (
                <Tag
                  key={role + index}
                  value={role}
                  severity={role === "ADMIN" ? undefined : "success"}
                  style={{
                    width: "5rem",
                  }}
                />
              ))}
            </>
          );
        }

        const role = (getValue() as string) || "";

        return (
          <>
            <Tag
              value={role}
              severity={role === "ADMIN" ? undefined : "success"}
              style={{
                width: "5rem",
              }}
            />
          </>
        );
      },
    },
    {
      align: "center",
      accessorKey: "status",
      header: t("table.defaultColumns.status"),
      cell: ({ row: { original } }) => {
        const getValue = () => {
          if (!original.isActiveUser) return t("status.invited");

          if (original.disabled) return t("status.disabled");

          return t("status.active");
        };

        const getSeverity = () => {
          if (!original.isActiveUser) return undefined;

          if (original.disabled) return "danger";

          return "success";
        };

        return (
          <>
            <Tag
              value={getValue()}
              severity={getSeverity()}
              style={{
                width: "5rem",
              }}
            />
          </>
        );
      },
    },
    {
      accessorKey: "invitedBy",
      header: t("invitations:table.defaultColumns.invitedBy"),
      cell: ({ row: { original } }) => {
        if (original.isActiveUser) {
          return <code>&#8212;</code>;
        }

        if (original.invitedBy?.givenName || original.invitedBy?.surname) {
          return `${original.invitedBy.givenName || ""} ${
            original.invitedBy.surname || ""
          }`;
        }

        return original.invitedBy?.email;
      },
    },
    {
      accessorKey: "signedUpAt",
      header: t("table.defaultColumns.signedUpOn"),
      cell: ({ row: { original } }) => {
        if (original.signedUpAt) {
          const date = new Date(original.signedUpAt);

          return date.toLocaleDateString("en-GB");
        }

        return "-";
      },
    },
    {
      align: "center",
      accessorKey: "actions",
      header: t("invitations:table.defaultColumns.actions"),
      cell: ({ row: { original } }) => {
        return (
          <>
            {original.isActiveUser ? (
              <UserAction
                user={original}
                onUserDisabled={onUserDisabled}
                onUserEnabled={onUserEnabled}
              />
            ) : (
              <InvitationActions
                onInvitationResent={onInvitationResent}
                onInvitationRevoked={onInvitationRevoked}
                invitation={original as unknown as Invitation}
              />
            )}
          </>
        );
      },
    },
  ];

  const renderToolbar = () => {
    if (showInviteAction) {
      return (
        <div className="table-actions">
          <InvitationModal
            additionalInvitationFields={additionalInvitationFields}
            apps={apps}
            onSubmitted={onInvitationAdded}
            invitationButtonOptions={invitationButtonOptions}
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
      columns={[...defaultColumns, ...columns]}
      data={users}
      emptyTableMessage={t("app:table.emptyMessage")}
      fetchData={fetchUsers}
      renderToolbarItems={showInviteAction ? renderToolbar : undefined}
      totalRecords={totalRecords}
      visibleColumns={visibleColumns}
      paginationOptions={{
        pageInputLabel: t("table.pagination.pageControl"),
        itemsPerPageControlLabel: t("table.pagination.rowsPerPage"),
      }}
      {...tableOptions}
    ></DataTable>
  );
};
