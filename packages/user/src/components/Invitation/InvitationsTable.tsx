import { useTranslation } from "@dzangolab/react-i18n";
import {
  TDataTable as DataTable,
  TDataTableProperties,
  TRequestJSON,
  IButtonProperties,
  TableColumnDefinition,
} from "@dzangolab/react-ui";
import { Tag } from "primereact/tag";

import { useInvitationActionsMethods } from "./useInvitationActionsMethods";

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

type VisibleColumn =
  | "email"
  | "app"
  | "role"
  | "invitedBy"
  | "expiresAt"
  | "status"
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
  fetchInvitations?: (arguments_: TRequestJSON) => void;
  invitationButtonOptions?: IButtonProperties;
  invitationExpiryDateField?: InvitationExpiryDateField;
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
  fetchInvitations,
  invitationButtonOptions,
  invitationExpiryDateField,
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
    "status",
    "actions",
  ],
  ...tableOptions
}: InvitationsTableProperties) => {
  const { t } = useTranslation("invitations");
  const { onResendConfirm, onRevokeConfirm } = useInvitationActionsMethods({
    onInvitationResent,
    onInvitationRevoked,
  });

  const defaultColumns: Array<TableColumnDefinition<Invitation>> = [
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
      accessorKey: "status",
      align: "center",
      header: "status",
      cell: ({ row: { original } }) => {
        const getValue = () => {
          const { acceptedAt, revokedAt, expiresAt } = original;

          if (acceptedAt) return "accepted";
          if (revokedAt) return "revoked";
          if (expiresAt && new Date(expiresAt) < new Date()) return "expired";

          return "pending";
        };

        const getSeverity = () => {
          const { acceptedAt, revokedAt, expiresAt } = original;

          if (acceptedAt) return "success";
          if (revokedAt) return "danger";
          if (expiresAt && new Date(expiresAt) < new Date()) return "warning";

          return undefined;
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
      accessorKey: "expiresAt",
      header: t("table.defaultColumns.expiresAt"),
      cell: ({ getValue }) => {
        const date = new Date(getValue() as string);

        return date.toLocaleDateString("en-GB");
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
            invitationButtonOptions={invitationButtonOptions}
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
      renderToolbarItems={showInviteAction ? renderToolbar : undefined}
      totalRecords={totalRecords}
      visibleColumns={visibleColumns}
      paginationOptions={{
        pageInputLabel: t("table.pagination.pageControl"),
        itemsPerPageControlLabel: t("table.pagination.rowsPerPage"),
      }}
      dataActionsMenu={{
        actions: [
          {
            label: t("invitations.actions.resend"),
            icon: "pi pi-replay",
            disabled: (invitation) => !!invitation.acceptedAt,
            onClick: (invitation) => onResendConfirm(invitation),
            requireConfirmationModal: true,
            confirmationOptions: {
              message: t("confirmation.confirm.resend.message"),
              header: t("confirmation.header"),
            },
          },
          {
            label: t("invitations.actions.revoke"),
            icon: "pi pi-times",
            className: "danger",
            disabled: (invitation) => !!invitation.acceptedAt,
            onClick: (invitation) => onRevokeConfirm(invitation),
            requireConfirmationModal: true,
            confirmationOptions: {
              message: t("confirmation.confirm.revoke.message"),
              header: t("confirmation.header"),
            },
          },
        ],
      }}
      {...tableOptions}
    ></DataTable>
  );
};
