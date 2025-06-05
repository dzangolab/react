import { AdditionalFormFields } from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import {
  TDataTable as DataTable,
  TDataTableProperties,
  TRequestJSON,
  IButtonProperties,
  TableColumnDefinition,
  Tag,
  formatDateTime,
  FilterOption,
} from "@dzangolab/react-ui";
import { toast } from "react-toastify";

import { InvitationModal } from "./InvitationModal";

import type {
  AddInvitationResponse,
  InvitationAppOption,
  InvitationRoleOption,
  InvitationExpiryDateField,
  ResendInvitationResponse,
  RevokeInvitationResponse,
  Invitation,
  UserType,
} from "../../types";

import {
  deleteInvitation,
  resendInvitation,
  revokeInvitation,
} from "@/api/invitation";
import { useConfig } from "@/hooks";
import { DeleteInvitationResponse } from "@/types/invitation";

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
  additionalInvitationFields?: AdditionalFormFields;
  apps?: Array<InvitationAppOption>;
  appFilterOptions?: FilterOption[];
  fetchInvitations?: (arguments_: TRequestJSON) => void;
  invitationButtonOptions?: IButtonProperties;
  invitationExpiryDateField?: InvitationExpiryDateField;
  invitations: Array<Invitation>;
  onInvitationAdded?: (response: AddInvitationResponse) => void;
  onInvitationDeleted?: (response: DeleteInvitationResponse) => void;
  onInvitationResent?: (data: ResendInvitationResponse) => void;
  onInvitationRevoked?: (data: RevokeInvitationResponse) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prepareInvitationData?: (data: any) => any;
  roles?: Array<InvitationRoleOption>;
  roleFilterOptions?: FilterOption[];
  showAppColumn?: boolean;
  showInviteAction?: boolean;
  statusFilterOptions?: FilterOption[];
  visibleColumns?: VisibleColumn[];
};

export const InvitationsTable = ({
  additionalInvitationFields,
  apps,
  appFilterOptions,
  className = "table-invitations",
  columns = [],
  fetchInvitations,
  invitationButtonOptions,
  invitationExpiryDateField,
  invitations,
  onInvitationDeleted,
  onInvitationAdded,
  onInvitationResent,
  onInvitationRevoked,
  prepareInvitationData,
  roles,
  roleFilterOptions,
  showInviteAction = true,
  statusFilterOptions,
  totalRecords = 0,
  visibleColumns = [
    "email",
    "appId",
    "role",
    "invitedBy",
    "expiresAt",
    "status",
    "actions",
  ],
  ...tableOptions
}: InvitationsTableProperties) => {
  const config = useConfig();

  const { t } = useTranslation("invitations");

  const handleResendInvitation = (invitation: Invitation) => {
    resendInvitation(invitation.id, config.apiBaseUrl)
      .then((response) => {
        if ("data" in response && response.data.status === "ERROR") {
          // TODO better handle errors
          toast.error(t("messages.resend.error"));
        } else {
          toast.success(t("messages.resend.success"));

          if (onInvitationResent) {
            onInvitationResent(response);
          }
        }
      })
      .catch(() => {
        toast.error(t("messages.resend.error"));
      });
  };

  const handleRevokeInvitation = (invitation: Invitation) => {
    revokeInvitation(invitation.id, config.apiBaseUrl)
      .then((response) => {
        if ("data" in response && response.data.status === "ERROR") {
          // TODO better handle errors
          toast.error(t("messages.revoke.error"));
        } else {
          toast.success(t("messages.revoke.success"));

          if (onInvitationRevoked) {
            onInvitationRevoked(response);
          }
        }
      })
      .catch(() => {
        toast.error(t("messages.revoke.error"));
      });
  };

  const handleDeleteInvitation = async (id: number) => {
    deleteInvitation(id, config.apiBaseUrl)
      .then((response) => {
        if ("data" in response && response.data.status === "ERROR") {
          toast.error(t("messages.delete.error"));
        } else {
          toast.success(t("messages.delete.success"));

          if (onInvitationDeleted) {
            onInvitationDeleted(response);
          }
        }
      })
      .catch(() => {
        toast.error(t("messages.delete.error"));
      });
  };

  const isExpired = (date?: string | Date | number) => {
    return !!(date && new Date(date) < new Date());
  };

  const defaultColumns: Array<TableColumnDefinition<Invitation>> = [
    {
      accessorKey: "email",
      header: t("table.defaultColumns.email"),
      enableSorting: true,
      enableColumnFilter: true,
      enableGlobalFilter: true,
      filterPlaceholder: t("table.searchPlaceholder"),
    },
    {
      accessorKey: "appId",
      align: "center",
      cell: ({ row: { original } }) => {
        return <span>{original.appId || "-"} </span>;
      },
      enableColumnFilter: true,
      enableSorting: true,
      filterPlaceholder: t("table.placeholders.app"),
      header: t("table.defaultColumns.app"),
      meta: {
        filterOptions: appFilterOptions,
        filterVariant: "multiselect",
      },
    },
    {
      accessorKey: "role",
      align: "center",
      cell: ({ getValue, row: { original } }) => {
        const roles = (original as unknown as { roles: string[] })?.roles;

        if (Array.isArray(roles)) {
          return (
            <>
              {roles?.map((role: string, index: number) => (
                <Tag
                  key={role + index}
                  label={role}
                  color={role === "ADMIN" ? "default" : "green"}
                  fullWidth
                />
              ))}
            </>
          );
        }

        const role = (getValue() as string) || "";

        return (
          <Tag
            label={role}
            color={role === "ADMIN" ? "default" : "green"}
            fullWidth
          />
        );
      },
      enableColumnFilter: true,
      enableSorting: true,
      filterPlaceholder: t("table.placeholders.roles"),
      header: t("table.defaultColumns.role"),
      meta: {
        filterOptions: roleFilterOptions,
        filterVariant: "multiselect",
      },
    },
    {
      accessorKey: "invitedBy",
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
      header: t("table.defaultColumns.invitedBy"),
    },
    {
      accessorKey: "status",
      align: "center",
      cell: ({ row: { original } }) => {
        const { acceptedAt, revokedAt, expiresAt } = original;

        const getLabel = () => {
          if (acceptedAt) return t("table.status.accepted");
          if (revokedAt) return t("table.status.revoked");
          if (isExpired(expiresAt)) return t("table.status.expired");

          return t("table.status.pending");
        };

        const getColor = () => {
          if (acceptedAt) return "green";
          if (revokedAt) return "red";
          if (isExpired(expiresAt)) return "gray";

          return "yellow";
        };

        return <Tag label={getLabel()} color={getColor()} fullWidth />;
      },
      enableColumnFilter: true,
      enableSorting: true,
      filterPlaceholder: t("table.placeholders.status"),
      header: t("table.defaultColumns.status"),
      meta: {
        filterOptions: statusFilterOptions,
        filterVariant: "multiselect",
      },
    },
    {
      accessorKey: "expiresAt",
      enableColumnFilter: true,
      enableSorting: true,
      cell: ({ getValue }) => {
        return formatDateTime(getValue() as string);
      },
      filterPlaceholder: t("table.placeholders.date"),
      header: t("table.defaultColumns.expiresAt"),
      meta: {
        filterVariant: "dateRange",
        serverFilterFn: "between",
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
            expiryDateField={invitationExpiryDateField}
            invitationButtonOptions={invitationButtonOptions}
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
      dataActionsMenu={{
        actions: [
          {
            label: t("invitations.actions.resend"),
            icon: "pi pi-replay",
            disabled: (invitation) =>
              !!invitation.acceptedAt ||
              !!invitation.revokedAt ||
              isExpired(invitation.expiresAt),
            onClick: (invitation) => handleResendInvitation(invitation),
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
            disabled: (invitation) =>
              !!invitation.acceptedAt ||
              !!invitation.revokedAt ||
              isExpired(invitation.expiresAt),
            onClick: (invitation) => handleRevokeInvitation(invitation),
            requireConfirmationModal: true,
            confirmationOptions: {
              message: t("confirmation.confirm.revoke.message"),
              header: t("confirmation.header"),
            },
          },
          {
            label: t("invitations.actions.delete"),
            icon: "pi pi-trash",
            className: "danger",
            onClick: (invitation) => handleDeleteInvitation(invitation.id),
            requireConfirmationModal: true,
            confirmationOptions: {
              message: t("confirmation.confirm.delete.message"),
              header: t("confirmation.header"),
            },
          },
        ],
      }}
      {...tableOptions}
    ></DataTable>
  );
};
