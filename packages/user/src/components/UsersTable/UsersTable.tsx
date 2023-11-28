import { useTranslation } from "@dzangolab/react-i18n";
import {
  TDataTable as DataTable,
  TDataTableProperties,
  TRequestJSON,
} from "@dzangolab/react-ui";
import { ColumnDef } from "@tanstack/react-table";
import { ButtonProps } from "primereact/button";
import { Tag } from "primereact/tag";
import { IconType } from "primereact/utils";

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
  | "actions"
  | string;

export type UsersTableProperties = Partial<
  Omit<
    TDataTableProperties<UserType>,
    "id" | "data" | "visibleColumns" | "fetchData"
  >
> & {
  additionalInvitationFields?: AdditionalInvitationFields;
  apps?: Array<InvitationAppOption>;
  className?: string;
  fetchUsers: (arguments_: TRequestJSON) => void;
  id?: string;
  invitationExpiryDateField?: InvitationExpiryDateField;
  inviteButtonIcon?: IconType<ButtonProps>;
  loading?: boolean;
  onInvitationAdded?: (response: AddInvitationResponse) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prepareInvitationData?: (data: any) => any;
  roles?: Array<InvitationRoleOption>;
  showInviteAction?: boolean;
  totalRecords?: number;
  users: Array<UserType>;
  visibleColumns?: VisibleColumn[];
};

export const UsersTable = ({
  additionalInvitationFields,
  apps,
  className = "table-users",
  columns = [],
  fetchUsers,
  invitationExpiryDateField,
  inviteButtonIcon,
  onInvitationAdded,
  prepareInvitationData,
  roles,
  showInviteAction = true,
  totalRecords = 0,
  users,
  visibleColumns = ["name", "email", "roles", "signedUpAt", "actions"],
  ...tableProperties
}: UsersTableProperties) => {
  const { t } = useTranslation("users");

  const defaultColumns: Array<ColumnDef<UserType>> = [
    {
      accessorKey: "name",
      header: t("table.defaultColumns.name"),
      enableSorting: false,
      cell: ({ getValue }: any) => {
        return (
          (getValue.givenName ? getValue.givenName : "") +
            (getValue.middleNames ? " " + getValue.middleNames : "") +
            (getValue.surname ? " " + getValue.surname : "") || (
            <code>&#8212;</code>
          )
        );
      },
    },
    {
      accessorKey: "email",
      header: t("table.defaultColumns.email"),
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

        const role = (getValue() as string) || "";

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
    },
    {
      accessorKey: "signedUpAt",
      header: t("table.defaultColumns.signedUpOn"),
      cell: ({ getValue }: any) => {
        const date = new Date(getValue.signedUpAt);

        return date.toLocaleDateString("en-GB");
      },
    },
    {
      align: "center",
      accessorKey: "actions",
      header: t("table.defaultColumns.actions"),
      cell: ({ row: { original } }) => {
        return <UserAction user={original} />;
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
            buttonIcon={inviteButtonIcon}
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
      renderToolbarItems={renderToolbar}
      totalRecords={totalRecords}
      visibleColumns={visibleColumns}
      {...tableProperties}
    ></DataTable>
  );
};
