import { useTranslation } from "@dzangolab/react-i18n";
import {
  TDataTable as DataTable,
  TDataTableProperties,
  TRequestJSON,
  IButtonProperties,
  TableColumnDefinition,
} from "@dzangolab/react-ui";
import { Tag } from "primereact/tag";

import { UserAction } from "./UserActions";
import { InvitationModal } from "../Invitation";

import type {
  AdditionalInvitationFields,
  AddInvitationResponse,
  InvitationAppOption,
  InvitationRoleOption,
  InvitationExpiryDateField,
  UserType,
} from "@/types";

type VisibleColumn =
  | "name"
  | "email"
  | "roles"
  | "signedUpAt"
  | "status"
  | "actions"
  | string;

export type UsersTableProperties = Partial<
  Omit<TDataTableProperties<UserType>, "data" | "visibleColumns" | "fetchData">
> & {
  additionalInvitationFields?: AdditionalInvitationFields;
  apps?: Array<InvitationAppOption>;
  fetchUsers?: (arguments_: TRequestJSON) => void;
  invitationButtonOptions?: IButtonProperties;
  invitationExpiryDateField?: InvitationExpiryDateField;
  onInvitationAdded?: (response: AddInvitationResponse) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUserEnabled?: (data: any) => void;
  onUserDisabled?: (data: any) => void;
  prepareInvitationData?: (data: any) => any;
  roles?: Array<InvitationRoleOption>;
  showInviteAction?: boolean;
  users: Array<UserType>;
  visibleColumns?: VisibleColumn[];
};

export const UsersTable = ({
  additionalInvitationFields,
  apps,
  className = "table-users",
  columns = [],
  fetchUsers,
  invitationButtonOptions,
  invitationExpiryDateField,
  onInvitationAdded,
  onUserDisabled,
  onUserEnabled,
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
    "status",
    "actions",
  ],
  ...tableProperties
}: UsersTableProperties) => {
  const { t } = useTranslation("users");

  const defaultColumns: Array<TableColumnDefinition<UserType>> = [
    {
      accessorKey: "email",
      header: t("table.defaultColumns.email"),
      enableSorting: true,
      enableColumnFilter: true,
    },
    {
      id: "name",
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
      align: "center",
      id: "roles",
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
      align: "center",
      accessorKey: "status",
      header: t("table.defaultColumns.status"),
      cell: ({ row: { original } }) => {
        const severity = original.disabled ? "danger" : "success";

        return (
          <Tag
            value={
              original.disabled ? t("status.disabled") : t("status.enabled")
            }
            severity={severity}
            style={{
              width: "5rem",
            }}
          />
        );
      },
    },
    {
      align: "center",
      id: "actions",
      header: t("table.defaultColumns.actions"),
      cell: ({ row: { original } }) => {
        return (
          <UserAction
            user={original}
            onUserDisabled={onUserDisabled}
            onUserEnabled={onUserEnabled}
          />
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
            expiryDateField={invitationExpiryDateField}
            invitationButtonOptions={invitationButtonOptions}
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
      renderToolbarItems={showInviteAction ? renderToolbar : undefined}
      totalRecords={totalRecords}
      visibleColumns={visibleColumns}
      paginationOptions={{
        pageInputLabel: t("table.pagination.pageControl"),
        itemsPerPageControlLabel: t("table.pagination.rowsPerPage"),
      }}
      {...tableProperties}
    ></DataTable>
  );
};
