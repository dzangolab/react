import { useTranslation } from "@dzangolab/react-i18n";
import {
  TDataTable as DataTable,
  TDataTableProperties,
  TRequestJSON,
} from "@dzangolab/react-ui";
import { ButtonProps } from "primereact/button";
import { Tag } from "primereact/tag";
import { IconType } from "primereact/utils";

import { InvitationModal } from "../Invitation";
import { InvitationActions } from "../Invitation/InvitationActions";

import type {
  AdditionalInvitationFields,
  AddInvitationResponse,
  InvitationAppOption,
  InvitationRoleOption,
  ResendInvitationResponse,
  RevokeInvitationResponse,
  User,
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
  Omit<TDataTableProperties<User>, "data" | "visibleColumns" | "fetchData">
> & {
  additionalInvitationFields?: AdditionalInvitationFields;
  apps?: Array<InvitationAppOption>;
  fetchUsers?: (arguments_: TRequestJSON) => void;
  inviteButtonIcon?: IconType<ButtonProps>;
  onInvitationAdded?: (response: AddInvitationResponse) => void;
  onInvitationResent?: (data: ResendInvitationResponse) => void;
  onInvitationRevoked?: (data: RevokeInvitationResponse) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prepareInvitationData?: (data: any) => any;
  roles?: Array<InvitationRoleOption>;
  showInviteAction?: boolean;
  showAppColumn?: boolean;
  users: Array<User>;
  visibleColumns?: VisibleColumn[];
};

export const AllUsersTable = ({
  additionalInvitationFields,
  apps,
  className = "table-users",
  columns = [],
  fetchUsers,
  inviteButtonIcon,
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
  ...tableOptions
}: AllUsersTableProperties) => {
  const { t } = useTranslation("users");

  const defaultColumns: Array<ColumnDef<User>> = [
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
    },
    {
      accessorKey: "email",
      header: t("table.defaultColumns.email"),
    },
    {
      accessorKey: "app",
      header: t("invitations:table.defaultColumns.app"),
      cell: ({ row: { original } }) => {
        return <span>{original.appId || "-"} </span>;
      },
      enableSorting: false,
      enableColumnFilter: false,
    },
    {
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
                  style={{
                    background: role === "ADMIN" ? "#6366F1" : "#22C55E",
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
              style={{
                background: role === "ADMIN" ? "#6366F1" : "#22C55E",
                width: "5rem",
              }}
            />
          </>
        );
      },
      align: "center",
      enableSorting: false,
      enableColumnFilter: false,
    },
    {
      accessorKey: "status",
      header: t("table.defaultColumns.status"),
      cell: ({ row: { original } }) => {
        return (
          <>
            <Tag
              value={
                original.isActiveUser ? t("status.active") : t("status.invited")
              }
              style={{
                background: original.isActiveUser ? "#6366F1" : "#22C55E",
                width: "5rem",
              }}
            />
          </>
        );
      },
      align: "center",
      enableSorting: false,
      enableColumnFilter: false,
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
      enableSorting: false,
      enableColumnFilter: false,
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
      enableSorting: false,
      enableColumnFilter: false,
    },
    {
      accessorKey: "actions",
      header: t("invitations:table.defaultColumns.actions"),
      cell: ({ row: { original } }) => {
        return (
          <>
            {original.isActiveUser ? (
              "-"
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
      align: "center",
      enableSorting: false,
      enableColumnFilter: false,
    },
  ];

  const renderToolbar = () => {
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
      columns={[...defaultColumns, ...columns]}
      data={users}
      emptyTableMessage={t("app:table.emptyMessage")}
      fetchData={fetchUsers}
      renderToolbarItems={renderToolbar}
      totalRecords={totalRecords}
      paginationOptions={{
        pageInputLabel: t("table.pagination.pageControl"),
        itemsPerPageControlLabel: t("table.pagination.rowsPerPage"),
      }}
      {...tableOptions}
    ></DataTable>
  );
};
