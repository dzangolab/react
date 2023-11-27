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
  UserType,
} from "@/types";

type InvitedByType = {
  givenName: string;
  surname: string;
  email: string;
};

interface User extends UserType {
  appId: number;
  isActiveUser: boolean;
  email: string;
  invitedBy: InvitedByType;
}
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
    },
    {
      accessorKey: "invitedBy",
      header: t("invitations:table.defaultColumns.invitedBy"),
      cell: ({ getValue }) => {
        const invitedBy = getValue() as User;

        if (invitedBy?.isActiveUser) {
          return <code>&#8212;</code>;
        }

        if (invitedBy?.givenName || invitedBy?.surname) {
          return `${invitedBy?.givenName || ""} ${invitedBy?.surname || ""}`;
        }

        return invitedBy?.email;
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
      accessorKey: "actions",
      header: t("invitations:table.defaultColumns.actions"),
      align: "center",
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
      {...tableOptions}
    ></DataTable>
  );
};
