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
      align: "center",
      accessorKey: "appId",
      enableSorting: true,
      enableColumnFilter: true,
      filterFn: (row, columnId, filterValue) => {
        if (!filterValue || filterValue.length === 0) {
          return true;
        }

        const updatedFilterValue = filterValue.map((value: string) => {
          switch (value) {
            case "1":
              return 1;
            case "2":
              return 2;
            default:
              return 3;
          }
        });

        return updatedFilterValue.includes(row.original.appId);
      },
      filterPlaceholder: t("table.placeholders.app"),
      header: t("table.defaultColumns.app"),
      cell: ({ row: { original } }) => {
        return <span>{original.appId || "-"} </span>;
      },
      meta: {
        filterVariant: "multiselect",
        filterOptions: appFilterOptions,
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
      enableSorting: true,
      enableColumnFilter: true,
      meta: {
        filterVariant: "multiselect",
        filterOptions: roleFilterOptions,
      },
      filterPlaceholder: t("table.placeholders.roles"),
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
      align: "center",
      accessorKey: "status",
      header: t("table.defaultColumns.status"),
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
      enableSorting: true,
      enableColumnFilter: true,
      filterFn: (row, columnId, filterValue) => {
        if (!filterValue || filterValue.length === 0) {
          return true;
        }

        const { acceptedAt, revokedAt, expiresAt } = row.original;

        const getCellValue = () => {
          if (acceptedAt) {
            return "accepted";
          }

          if (revokedAt) {
            return "revoked";
          }

          if (isExpired(expiresAt)) {
            return "expired";
          }

          return "pending";
        };

        return filterValue.includes(getCellValue());
      },
      meta: {
        filterVariant: "multiselect",
        filterOptions: [
          {
            value: "accepted",
            label: t("table.status.accepted"),
          },
          {
            value: "revoked",
            label: t("table.status.revoked"),
          },
          {
            value: "expired",
            label: t("table.status.expired"),
          },
          {
            value: "pending",
            label: t("table.status.pending"),
          },
        ],
      },
      filterPlaceholder: t("table.placeholders.status"),
    },
    {
      accessorKey: "expiresAt",
      header: t("table.defaultColumns.expiresAt"),
      enableSorting: true,
      enableColumnFilter: true,
      cell: ({ getValue }) => {
        return formatDateTime(getValue() as string);
      },
      meta: {
        filterVariant: "dateRange",
        serverFilterFn: "between",
      },
      filterPlaceholder: t("table.placeholders.date"),
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
