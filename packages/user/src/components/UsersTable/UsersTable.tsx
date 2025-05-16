import { AdditionalFormFields } from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import {
  TDataTable as DataTable,
  TDataTableProperties,
  TRequestJSON,
  IButtonProperties,
  TableColumnDefinition,
  Tag,
  formatDate,
  type DataActionsMenuProperties,
  type FilterOption,
} from "@dzangolab/react-ui";

import { useUserActions } from "./useUserActionsMethods";
import { InvitationModal } from "../Invitation";

import type {
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
  Omit<
    TDataTableProperties<UserType>,
    "data" | "dataActionsMenu" | "visibleColumns" | "fetchData"
  >
> & {
  additionalInvitationFields?: AdditionalFormFields;
  apps?: Array<InvitationAppOption>;
  dataActionsMenu?:
    | ((
        user: UserType,
        defaultActionsMenu: DataActionsMenuProperties<UserType>,
      ) => DataActionsMenuProperties<UserType>)
    | DataActionsMenuProperties<UserType>;
  fetchUsers?: (arguments_: TRequestJSON) => void;
  invitationButtonOptions?: IButtonProperties;
  invitationExpiryDateField?: InvitationExpiryDateField;
  onInvitationAdded?: (response: AddInvitationResponse) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUserEnabled?: (data: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUserDisabled?: (data: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prepareInvitationData?: (data: any) => any;
  roles?: Array<InvitationRoleOption>;
  roleFilterOptions?: FilterOption[];
  showInviteAction?: boolean;
  users: Array<UserType>;
  visibleColumns?: VisibleColumn[];
};

export const UsersTable = ({
  additionalInvitationFields,
  apps,
  className = "table-users",
  columns = [],
  dataActionsMenu,
  fetchUsers,
  invitationButtonOptions,
  invitationExpiryDateField,
  onInvitationAdded,
  onUserDisabled,
  onUserEnabled,
  prepareInvitationData,
  roles,
  roleFilterOptions,
  showInviteAction = true,
  totalRecords = 0,
  users,
  visibleColumns = [
    "email",
    "name",
    "roles",
    "signedUpAt",
    "disabled",
    "actions",
  ],
  ...tableProperties
}: UsersTableProperties) => {
  const { t } = useTranslation("users");

  const { handleDisableUser, handleEnableUser } = useUserActions({
    onUserDisabled,
    onUserEnabled,
  });

  const defaultColumns: Array<TableColumnDefinition<UserType>> = [
    {
      accessorKey: "email",
      header: t("table.defaultColumns.email"),
      enableSorting: true,
      enableColumnFilter: true,
    },
    {
      accessorKey: "name",
      header: t("table.defaultColumns.name"),
      enableColumnFilter: true,
      enableSorting: true,
    },
    {
      align: "center",
      accessorKey: "roles",
      header: t("table.defaultColumns.roles"),
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
          <>
            <Tag
              label={role}
              color={role === "ADMIN" ? "default" : "green"}
              fullWidth
            />
          </>
        );
      },
      enableSorting: true,
      enableColumnFilter: true,
      meta: {
        filterVariant: "multiselect",
        filterOptions: roleFilterOptions,
      },
    },
    {
      accessorKey: "signedUpAt",
      header: t("table.defaultColumns.signedUpOn"),
      cell: ({ row: { original } }) => {
        if (original.signedUpAt) {
          return formatDate(original.signedUpAt);
        }

        return "-";
      },
      enableSorting: true,
      enableColumnFilter: true,
      meta: {
        filterVariant: "dateRange",
        serverFilterFn: "between",
      },
    },
    {
      align: "center",
      accessorKey: "disabled",
      header: t("table.defaultColumns.status"),
      cell: ({ row: { original } }) => {
        const color = original.disabled ? "red" : "green";

        return (
          <Tag
            label={
              original.disabled ? t("status.disabled") : t("status.enabled")
            }
            color={color}
            fullWidth
          />
        );
      },
      enableSorting: true,
      enableColumnFilter: true,
      filterFn: (row, columnId, filterValue) => {
        if (!filterValue || filterValue.length === 0) {
          return true;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const updatedFilterValue = filterValue.map((value: any) => {
          switch (value) {
            case "true":
              return true;
            case "false":
              return false;
            default:
              return value;
          }
        });

        const cellValue = row.getValue(columnId);

        return updatedFilterValue.includes(cellValue);
      },
      meta: {
        filterVariant: "multiselect",
        filterOptions: [
          {
            value: "false",
            label: t("status.enabled"),
          },
          {
            value: "true",
            label: t("status.disabled"),
          },
        ],
      },
    },
  ];

  const defaultActionsMenu: DataActionsMenuProperties<UserType> = {
    actions: [
      {
        label: t("table.actions.enable"),
        icon: "pi pi-check",
        disabled: (user) => !user.disabled,
        onClick: (user) => handleEnableUser(user),
        requireConfirmationModal: true,
        confirmationOptions: {
          message: t("confirmation.enable.message"),
          header: t("confirmation.header"),
        },
      },
      {
        label: t("table.actions.disable"),
        className: "danger",
        icon: "pi pi-times",
        disabled: (user) => user.disabled,
        onClick: (user) => handleDisableUser(user),
        requireConfirmationModal: true,
        confirmationOptions: {
          message: t("confirmation.disable.message"),
          header: t("confirmation.header"),
        },
      },
    ],
  };

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
      dataActionsMenu={
        dataActionsMenu
          ? typeof dataActionsMenu === "function"
            ? (data) => dataActionsMenu(data, defaultActionsMenu)
            : dataActionsMenu
          : defaultActionsMenu
      }
      {...tableProperties}
    ></DataTable>
  );
};
