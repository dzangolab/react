import { useTranslation } from "@dzangolab/react-i18n";
import { DataTable } from "@dzangolab/react-ui";
import { FilterMatchMode } from "primereact/api";
import { ButtonProps } from "primereact/button";
import { ColumnProps } from "primereact/column";
import { Tag } from "primereact/tag";
import { IconType } from "primereact/utils";

import { InvitationActions } from "./InvitationActions";

import { InvitationModal } from ".";

import type {
  AddInvitationResponse,
  InvitationAppOption,
  InvitationRoleOption,
} from "@/types";

export type InvitationsTableProperties = {
  apps?: Array<InvitationAppOption>;
  className?: string;
  columns?: Array<ColumnProps>;
  extraColumns?: Array<ColumnProps>;
  fetchInvitations: (arguments_?: any) => void;
  id?: string;
  inviteButtonIcon?: IconType<ButtonProps>;
  invitations: Array<object>;
  loading?: boolean;
  onInvitationAdded?: (response: AddInvitationResponse) => void;
  onInvitationResent?: (data: any) => void;
  onInvitationRevoked?: (data: any) => void;
  prepareInvitationData?: (data: any) => any;
  roles?: Array<InvitationRoleOption>;
  showAppColumn?: boolean;
  showInviteAction?: boolean;
  totalRecords?: number;
};

export const InvitationsTable = ({
  id = "table-invitations",
  className = "table-invitations",
  columns,
  loading = false,
  showInviteAction = true,
  totalRecords = 0,
  invitations,
  apps,
  roles,
  fetchInvitations,
  onInvitationAdded,
  onInvitationResent,
  onInvitationRevoked,
  prepareInvitationData,
  inviteButtonIcon,
  extraColumns = [],
  showAppColumn = true,
}: InvitationsTableProperties) => {
  const { t } = useTranslation("user");

  const initialFilters = {
    email: { value: "", matchMode: FilterMatchMode.CONTAINS },
  };

  const appColumn: Array<ColumnProps> = showAppColumn
    ? [
        {
          field: "app",
          header: t("invitations.table.defaultColumns.app"),
          body: (data: { appId: any }) => {
            return <span>{data.appId || "-"} </span>;
          },
          align: "center",
        },
      ]
    : [];

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
    ...appColumn,
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
    ...extraColumns,
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
              onInvitationResent={onInvitationResent}
              onInvitationRevoked={onInvitationRevoked}
              invitation={data}
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
    if (showInviteAction) {
      return (
        <div className="table-actions">
          <InvitationModal
            apps={apps}
            roles={roles}
            buttonIcon={inviteButtonIcon}
            onSubmitted={onInvitationAdded}
            prepareData={prepareInvitationData}
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
