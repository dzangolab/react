import { useTranslation } from "@dzangolab/react-i18n";
import {
  // DataTable,
  TDataTable as DataTable,
  // TDataTableProperties,
  // IColumnProperties,
  // LazyTableState,
  // useManipulateColumns,
  TRequestJSON,
} from "@dzangolab/react-ui";
import { FilterMatchMode } from "primereact/api";
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

export type InvitationsTableProperties = {
  additionalInvitationFields?: AdditionalInvitationFields;
  apps?: Array<InvitationAppOption>;
  className?: string;
  columns?: Array<ColumnDef<Invitation>>;
  fetchInvitations: (arguments_: TRequestJSON) => void;
  id?: string;
  invitationExpiryDateField?: InvitationExpiryDateField;
  inviteButtonIcon?: IconType<ButtonProps>;
  invitations: Array<object>;
  loading?: boolean;
  onInvitationAdded?: (response: AddInvitationResponse) => void;
  onInvitationResent?: (data: ResendInvitationResponse) => void;
  onInvitationRevoked?: (data: RevokeInvitationResponse) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prepareInvitationData?: (data: any) => any;
  roles?: Array<InvitationRoleOption>;
  showAppColumn?: boolean;
  showInviteAction?: boolean;
  totalRecords?: number;
  visibleColumns?: VisibleColumn[];
};

export const InvitationsTable = ({
  additionalInvitationFields,
  apps,
  className = "table-invitations",
  columns = [],
  invitationExpiryDateField,
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
}: InvitationsTableProperties) => {
  const { t } = useTranslation("invitations");

  const initialFilters = {
    email: { value: "", matchMode: FilterMatchMode.CONTAINS },
  };

  const defaultColumns: Array<ColumnDef<any>> = [
    {
      accessorKey: "email",
      header: t("table.defaultColumns.email"),
      // enableSorting: true,
      // filterPlaceholder: t("table.searchPlaceholder"),
      // showFilterMenu: false,
      // showClearButton: false,
    },
    {
      align: "center",
      accessorKey: "app",
      header: t("table.defaultColumns.app"),
      cell: ({ getValue }) => {
        return (
          <span>{(getValue() as { appId: number | null }).appId || "-"} </span>
        );
      },
      enableSorting: false,
      enableColumnFilter: false,
    },
    {
      align: "center",
      accessorKey: "role",
      header: t("table.defaultColumns.role"),
      cell: ({ getValue }) => {
        const roles = getValue() as string[] | undefined;
        if (roles) {
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

        const role = getValue() as string;

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
      enableSorting: false,
      enableColumnFilter: false,
    },
    {
      accessorKey: "invitedBy",
      header: t("table.defaultColumns.invitedBy"),
      cell: ({ getValue }) => {
        const invitedBy = getValue() as any;

        if (!invitedBy) {
          return <code>&#8212;</code>;
        }

        if (invitedBy.givenName || invitedBy.surname) {
          return `${invitedBy.givenName || ""} ${invitedBy.surname || ""}`;
        }

        return invitedBy.email;
      },
      enableSorting: false,
      enableColumnFilter: false,
    },
    {
      accessorKey: "expiresAt",
      header: t("table.defaultColumns.expiresAt"),
      cell: ({ getValue }) => {
        const date = new Date(getValue() as string);

        return date.toLocaleDateString("en-GB");
      },
      enableSorting: false,
      enableColumnFilter: false,
    },
    {
      align: "center",
      id: "actions",
      header: t("table.defaultColumns.actions"),
      cell: () => {
        return (
          <>
            <InvitationActions
              onInvitationResent={onInvitationResent}
              onInvitationRevoked={onInvitationRevoked}
              invitation={{} as Invitation}
            />
          </>
        );
      },
      enableSorting: false,
      enableColumnFilter: false,
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const rowClassNameCallback = (data: any) => {
  //   return `invitations-${data.id}`;
  // };

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
      columns={[...defaultColumns, ...columns]}
      data={invitations}
      emptyTableMessage={t("table.emptyMessage")}
      fetchData={fetchInvitations}
      renderToolbarItems={renderHeader}
      // id={id}
      // initialFilters={initialFilters}
      isLoading={loading}
      // showGridlines
      // stripedRows={false}
      totalRecords={totalRecords}
    ></DataTable>
  );
};
