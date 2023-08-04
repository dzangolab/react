import { useTranslation } from "@dzangolab/react-i18n";
import { DataTable } from "@dzangolab/react-ui";
import { FilterMatchMode } from "primereact/api";
import { ButtonProps } from "primereact/button";
import { ColumnProps } from "primereact/column";
import { Tag } from "primereact/tag";
import { IconType } from "primereact/utils";

import { InvitationActions } from "./InvitationActions";

import { InvitationModal } from ".";

import type { InvitationPayload } from "../../types";
import type { Role } from "@dzangolab/react-form";

export type InvitationsTableProperties = {
  id?: string;
  className?: string;
  columns?: Array<ColumnProps>;
  loading?: boolean;
  showInviteAction?: boolean;
  totalRecords?: number;
  invitations: Array<object>;
  fetchInvitations: (arguments_?: any) => void;
  handleInvitationSubmit?: (data: InvitationPayload) => void;
  handleInvitationResend?: (data: any) => void;
  handleInvitationRevoke?: (data: any) => void;
  inviteButtonIcon?: IconType<ButtonProps>;
};

export const InvitationsTable = ({
  id = "table-invitations",
  className = "table-invitations",
  columns,
  loading = false,
  showInviteAction = true,
  totalRecords = 0,
  invitations,
  fetchInvitations,
  handleInvitationSubmit,
  handleInvitationResend,
  handleInvitationRevoke,
  inviteButtonIcon,
}: InvitationsTableProperties) => {
  const { t } = useTranslation("user");

  const initialFilters = {
    email: { value: "", matchMode: FilterMatchMode.CONTAINS },
  };

  const defaultColumns: Array<ColumnProps> = [
    {
      field: "email",
      header: t("invitations.table.defaultColumns.email"),
      sortable: true,
      filter: true,
      filterPlaceholder: t("invitations.table.searchPlaceholder"),
      showFilterMenu: false,
      showClearButton: false,
    },
    {
      field: "role",
      header: t("invitations.table.defaultColumns.role"),
      body: (data) => {
        return (
          <Tag
            value={data.role}
            style={{
              background: data.role === "ADMIN" ? "#6366F1" : "#22C55E",
              width: "5rem",
            }}
          />
        );
      },
      align: "center",
    },
    {
      field: "invitedBy",
      header: t("invitations.table.defaultColumns.invitedBy"),
      body: (data) => {
        return data.invitedBy ? (
          `${data.invitedBy.givenName} ${data.invitedBy.surname}`
        ) : (
          <code>&#8212;</code>
        );
      },
      align: "center",
    },
    {
      field: "expiresAt",
      header: t("invitations.table.defaultColumns.expiresAt"),
      body: (data) => {
        const date = new Date(data.expiresAt);

        return date.toLocaleDateString("en-GB");
      },
      align: "center",
    },
    {
      field: "actions",
      header: t("invitations.table.defaultColumns.actions"),
      body: (data) => {
        return (
          <>
            <InvitationActions
              handleInvitationResend={handleInvitationResend}
              handleInvitationRevoke={handleInvitationRevoke}
              data={data}
            />
          </>
        );
      },
      align: "center",
    },
  ];

  const rowClassNameCallback = (data: any) => {
    return `invitations-${data.id}`;
  };

  const renderHeader = () => {
    if (showInviteAction && handleInvitationSubmit) {
      return (
        <div className="table-actions">
          <InvitationModal
            handleSubmit={handleInvitationSubmit}
            loading={loading}
            buttonIcon={inviteButtonIcon}
          />
        </div>
      );
    }
  };

  return (
    <DataTable
      className={className}
      columns={columns ? columns : defaultColumns}
      data={invitations}
      emptyMessage={t("invitations.table.emptyMessage")}
      fetchData={fetchInvitations}
      header={renderHeader}
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
