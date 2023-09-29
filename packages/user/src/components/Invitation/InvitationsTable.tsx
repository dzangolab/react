import { useTranslation } from "@dzangolab/react-i18n";
import { DataTable, useColumnsMap } from "@dzangolab/react-ui";
import { FilterMatchMode } from "primereact/api";
import { ButtonProps } from "primereact/button";
import { ColumnProps } from "primereact/column";
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
} from "@/types";

type VisibleColumn =
  | "email"
  | "app"
  | "role"
  | "invitedBy"
  | "expiresAt"
  | "actions";

type FilterableColumn = "email" | "app" | "role" | "invitedBy" | "expiresAt";

export type InvitationsTableProperties = {
  additionalInvitationFields?: AdditionalInvitationFields;
  apps?: Array<InvitationAppOption>;
  className?: string;
  columns?: Array<ColumnProps>;
  additionalColumns?: Array<ColumnProps>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetchInvitations: (arguments_?: any) => void;
  id?: string;
  invitationExpiryDateField?: InvitationExpiryDateField;
  inviteButtonIcon?: IconType<ButtonProps>;
  invitations: Array<object>;
  loading?: boolean;
  onInvitationAdded?: (response: AddInvitationResponse) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onInvitationResent?: (data: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onInvitationRevoked?: (data: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prepareInvitationData?: (data: any) => any;
  roles?: Array<InvitationRoleOption>;
  showAppColumn?: boolean;
  showInviteAction?: boolean;
  totalRecords?: number;
  visibleColumns?: VisibleColumn[];
  filterableColumns?: FilterableColumn[];
};

export const InvitationsTable = ({
  additionalInvitationFields,
  apps,
  className = "table-invitations",
  columns,
  invitationExpiryDateField,
  additionalColumns = [],
  fetchInvitations,
  id = "table-invitations",
  inviteButtonIcon,
  invitations,
  loading = false,
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
  filterableColumns = ["email"],
}: InvitationsTableProperties) => {
  const { t } = useTranslation("invitations");

  const visibleColumnsMap = useColumnsMap(visibleColumns);
  const filterableColumnsMap = useColumnsMap(filterableColumns);

  const initialFilters = {
    email: { value: "", matchMode: FilterMatchMode.CONTAINS },
  };

  const defaultColumns: Array<ColumnProps> = [
    {
      field: "email",
      header: t("table.defaultColumns.email"),
      hidden: !visibleColumnsMap.email,
      sortable: true,
      filter: filterableColumnsMap.email,
      filterPlaceholder: t("table.searchPlaceholder"),
      showFilterMenu: false,
      showClearButton: false,
    },
    {
      align: "center",
      field: "app",
      header: t("table.defaultColumns.app"),
      hidden: !visibleColumnsMap.app,
      filter: filterableColumnsMap.app,
      body: (data: { appId: number | null }) => {
        return <span>{data.appId || "-"} </span>;
      },
    },
    {
      align: "center",
      field: "role",
      header: t("table.defaultColumns.role"),
      hidden: !visibleColumnsMap.role,
      filter: filterableColumnsMap.role,
      body: (data) => {
        if (data?.roles) {
          return (
            <>
              {data?.roles?.map((role: string, index: number) => (
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

        return (
          <>
            <Tag
              value={data.role}
              style={{
                background: data.role === "ADMIN" ? "#6366F1" : "#22C55E",
                width: "5rem",
              }}
            />
          </>
        );
      },
    },
    ...additionalColumns,
    {
      field: "invitedBy",
      header: t("table.defaultColumns.invitedBy"),
      hidden: !visibleColumnsMap.invitedBy,
      filter: filterableColumnsMap.invitedBy,
      body: (data) => {
        if (!data.invitedBy) {
          return <code>&#8212;</code>;
        }

        if (data.invitedBy.givenName || data.invitedBy.surname) {
          return `${data.invitedBy.givenName || ""} ${
            data.invitedBy.surname || ""
          }`;
        }

        return data.invitedBy.email;
      },
    },
    {
      field: "expiresAt",
      header: t("table.defaultColumns.expiresAt"),
      hidden: !visibleColumnsMap.expiresAt,
      filter: filterableColumnsMap.expiresAt,
      body: (data) => {
        const date = new Date(data.expiresAt);

        return date.toLocaleDateString("en-GB");
      },
    },
    {
      align: "center",
      field: "actions",
      header: t("table.defaultColumns.actions"),
      hidden: !visibleColumnsMap.actions,
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
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rowClassNameCallback = (data: any) => {
    return `invitations-${data.id}`;
  };

  const renderHeader = () => {
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
      columns={columns ? columns : defaultColumns}
      data={invitations}
      emptyMessage={t("table.emptyMessage")}
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
