import { useTranslation } from "@dzangolab/react-i18n";
import { DataTable } from "@dzangolab/react-ui";
import { FilterMatchMode } from "primereact/api";
import { ButtonProps } from "primereact/button";
import { ColumnProps } from "primereact/column";
import { Tag } from "primereact/tag";
import { IconType } from "primereact/utils";

import { InvitationModal } from "../Invitation";

import type { InvitationPayload } from "../../types";
import { ActionsMenu } from "@dzangolab/react-ui";
import { MenuItem } from "primereact/menuitem";

export type InvitationTableProperties = {
  id?: string;
  className?: string;
  columns?: Array<ColumnProps>;
  loading?: boolean;
  showInviteAction?: boolean;
  totalRecords?: number;
  invitation: Array<object>;
  fetchInvitation: (arguments_?: any) => void;
  handleInvitationSubmit?: (data: InvitationPayload) => void;
  inviteButtonIcon?: IconType<ButtonProps>;
};

export const InvitationTable = ({
  id = "invitation-table",
  className = "invitation-table",
  columns,
  loading = false,
  showInviteAction = true,
  totalRecords = 0,
  invitation,
  fetchInvitation,
  handleInvitationSubmit,
  inviteButtonIcon,
}: InvitationTableProperties) => {
  const { t } = useTranslation("user");

  const actionItems: MenuItem[] = [
    {
      label: "Remove",
      icon: "pi pi-minus",
      command: () => {
        console.log("Remove");
      },
    },
    {
      label: "Revoke",
      icon: "pi pi-times",
      className: "danger",
      command: () => {
        console.log("Revoke");
      },
    },
  ];

  const initialFilters = {
    email: { value: "", matchMode: FilterMatchMode.CONTAINS },
  };

  const defaultColumns: Array<ColumnProps> = [
    {
      field: "email",
      header: t("invitation.table.defaultColumns.email"),
      sortable: true,
      filter: true,
      filterPlaceholder: t("invitation.table.searchPlaceholder"),
      showFilterMenu: false,
      showClearButton: false,
    },
    {
      field: "role",
      header: t("invitation.table.defaultColumns.role"),
      body: (data) => {
        return data.roles.map((role: string, index: number) => (
          <Tag
            key={role + index}
            value={role}
            style={{
              background: role === "ADMIN" ? "#6366F1" : "#22C55E",
              width: "5rem",
            }}
          />
        ));
      },
      align: "center",
    },
    {
      field: "invitedBy",
      header: t("invitation.table.defaultColumns.invitedBy"),
      body: (data) => {
        return data.invited_by;
      },
    },
    {
      field: "expiresAt",
      header: t("invitation.table.defaultColumns.expiresAt"),
      body: (data) => {
        const date = new Date(data.expires_at);

        return date.toLocaleDateString("en-GB");
      },
    },
    {
      field: "actions",
      header: t("invitation.table.defaultColumns.actions"),
      body: () => {
        return <ActionsMenu actions={actionItems} />;
      },
    },
  ];

  const rowClassNameCallback = (data: any) => {
    return `user-${data.id}`;
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
      data={invitation}
      emptyMessage={t("app:invitation.table.emptyMessage")}
      fetchData={fetchInvitation}
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
