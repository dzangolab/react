import { useTranslation } from "@dzangolab/react-i18n";
import {
  TDataTable as DataTable,
  TDataTableProperties,
  TRequestJSON,
} from "@dzangolab/react-ui";
import { ButtonProps } from "primereact/button";
import { Tag } from "primereact/tag";
import { IconType } from "primereact/utils";

import { InvitationActions } from "./InvitationActions";

import { InvitationModal } from ".";

import type {
  AdditionalInvitationFields,
  AddInvitationResponse,
  InvitationAppOption,
  InvitationRoleOption,
  InvitationExpiryDateField,
  ResendInvitationResponse,
  RevokeInvitationResponse,
  Invitation,
  UserType,
} from "../../types";
import type { ColumnDef } from "@tanstack/react-table";

type VisibleColumn =
  | "email"
  | "app"
  | "role"
  | "invitedBy"
  | "expiresAt"
  | "actions"
  | string;

export type InvitationsTableProperties = Partial<
  Omit<
    TDataTableProperties<Invitation>,
    "data" | "visibleColumns" | "fetchData"
  >
> & {
  additionalInvitationFields?: AdditionalInvitationFields;
  apps?: Array<InvitationAppOption>;
  fetchInvitations: (arguments_: TRequestJSON) => void;
  invitationExpiryDateField?: InvitationExpiryDateField;
  inviteButtonIcon?: IconType<ButtonProps>;
  invitations: Array<Invitation>;
  onInvitationAdded?: (response: AddInvitationResponse) => void;
  onInvitationResent?: (data: ResendInvitationResponse) => void;
  onInvitationRevoked?: (data: RevokeInvitationResponse) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prepareInvitationData?: (data: any) => any;
  roles?: Array<InvitationRoleOption>;
  showAppColumn?: boolean;
  showInviteAction?: boolean;
  visibleColumns?: VisibleColumn[];
};

export const InvitationsTable = ({
  additionalInvitationFields,
  apps,
  className = "table-invitations",
  columns = [],
  invitationExpiryDateField,
  fetchInvitations,
  inviteButtonIcon,
  invitations,
  onInvitationAdded,
  onInvitationResent,
  onInvitationRevoked,
  prepareInvitationData,
  roles,
  showInviteAction = true,
  totalRecords = 0,
  visibleColumns = [
    "email",
    "app",
    "role",
    "invitedBy",
    "expiresAt",
    "actions",
  ],
  ...tableOptions
}: InvitationsTableProperties) => {
  const { t } = useTranslation("invitations");

  const defaultColumns: Array<ColumnDef<Invitation>> = [
    {
      accessorKey: "email",
      header: t("table.defaultColumns.email"),
      enableSorting: true,
      enableColumnFilter: true,
      enableGlobalFilter: true,
    },
    {
      align: "center",
      accessorKey: "app",
      header: t("table.defaultColumns.app"),
      cell: ({ row: { original } }) => {
        return <span>{original.appId || "-"} </span>;
      },
    },
    {
      align: "center",
      accessorKey: "role",
      header: t("table.defaultColumns.role"),
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
    },
    {
      accessorKey: "invitedBy",
      header: t("table.defaultColumns.invitedBy"),
      cell: ({ getValue }) => {
        const invitedBy = getValue() as UserType;

        if (!invitedBy) {
          return <code>&#8212;</code>;
        }

        if (invitedBy?.givenName || invitedBy?.surname) {
          return `${invitedBy?.givenName || ""} ${invitedBy?.surname || ""}`;
        }

        return invitedBy?.email;
      },
    },
    {
      accessorKey: "expiresAt",
      header: t("table.defaultColumns.expiresAt"),
      cell: ({ getValue }) => {
        const date = new Date(getValue() as string);

        return date.toLocaleDateString("en-GB");
      },
    },
    {
      align: "center",
      id: "actions",
      header: t("table.defaultColumns.actions"),
      cell: ({ row: { original } }) => {
        return (
          <>
            <InvitationActions
              onInvitationResent={onInvitationResent}
              onInvitationRevoked={onInvitationRevoked}
              invitation={original}
            />
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
            buttonIcon={inviteButtonIcon}
            expiryDateField={invitationExpiryDateField}
            onSubmitted={onInvitationAdded}
            prepareData={prepareInvitationData}
            roles={roles}
          />
        </div>
      );
    }
  };

  return (
    <DataTable
      className={className}
      columns={[...defaultColumns, ...columns]}
      data={invitations}
      emptyTableMessage={t("table.emptyMessage")}
      fetchData={fetchInvitations}
      renderToolbarItems={renderToolbar}
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
