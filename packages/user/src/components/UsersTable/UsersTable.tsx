import { useTranslation } from "@dzangolab/react-i18n";
import {
  DataTable,
  IColumnProperties,
  LazyTableState,
  useManipulateColumns,
} from "@dzangolab/react-ui";
import { FilterMatchMode } from "primereact/api";
import { ButtonProps } from "primereact/button";
import { Tag } from "primereact/tag";
import { IconType } from "primereact/utils";

import { InvitationModal } from "../Invitation";

import type {
  AdditionalInvitationFields,
  AddInvitationResponse,
  InvitationAppOption,
  InvitationRoleOption,
  InvitationExpiryDateField,
} from "@/types";

type VisibleColumn =
  | "name"
  | "email"
  | "roles"
  | "signedUpAt"
  | "actions"
  | string;

export type UsersTableProperties = {
  additionalInvitationFields?: AdditionalInvitationFields;
  apps?: Array<InvitationAppOption>;
  className?: string;
  columns?: Array<IColumnProperties>;
  fetchUsers: (arguments_: LazyTableState) => void;
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
  users: Array<object>;
  visibleColumns?: VisibleColumn[];
};

export const UsersTable = ({
  additionalInvitationFields,
  apps,
  className = "table-users",
  columns = [],
  fetchUsers,
  id = "table-users",
  invitationExpiryDateField,
  inviteButtonIcon,
  loading = false,
  onInvitationAdded,
  prepareInvitationData,
  roles,
  showInviteAction = true,
  totalRecords = 0,
  users,
  visibleColumns = ["name", "email", "roles", "signedUpAt", "actions"],
}: UsersTableProperties) => {
  const { t } = useTranslation("users");

  const initialFilters = {
    email: { value: "", matchMode: FilterMatchMode.CONTAINS },
  };

  const defaultColumns: Array<IColumnProperties> = [
    {
      field: "name",
      header: t("table.defaultColumns.name"),
      sortable: false,
      body: (data) => {
        return (
          (data.givenName ? data.givenName : "") +
            (data.middleNames ? " " + data.middleNames : "") +
            (data.surname ? " " + data.surname : "") || <code>&#8212;</code>
        );
      },
    },
    {
      field: "email",
      header: t("table.defaultColumns.email"),
      sortable: true,
      filterPlaceholder: t("table.searchPlaceholder"),
      showFilterMenu: false,
      showClearButton: false,
    },
    {
      align: "center",
      field: "roles",
      header: t("table.defaultColumns.roles"),
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
    {
      field: "signedUpAt",
      header: t("table.defaultColumns.signedUpOn"),
      body: (data) => {
        const date = new Date(data.signedUpAt);

        return date.toLocaleDateString("en-GB");
      },
    },
    {
      field: "actions",
      header: t("table.defaultColumns.actions"),
    },
  ];

  const processedColumns: Array<IColumnProperties> = useManipulateColumns({
    visibleColumns,
    columns: [...defaultColumns, ...columns],
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rowClassNameCallback = (data: any) => {
    return `user-${data.id}`;
  };

  const renderHeader = () => {
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
      columns={processedColumns}
      data={users}
      emptyMessage={t("app:table.emptyMessage")}
      fetchData={fetchUsers}
      header={renderHeader()}
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
