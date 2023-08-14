import { ActionsMenu, DataTable } from "../index";
import { FilterMatchMode } from "primereact/api";
import { ColumnProps } from "primereact/column";
import { MenuItem } from "primereact/menuitem";

export type FilesTableProperties = {
  className?: string;
  columns?: Array<ColumnProps>;
  id?: string;
  loading?: boolean;
  files: Array<object>;
  totalRecords?: number;
  showDescriptionColumn?: boolean;
  extraColumns?: Array<ColumnProps>;
  fetchFiles?: (arguments_?: any) => void;
};

export const FilesTable = ({
  className,
  columns,
  id,
  loading,
  files,
  totalRecords,
  showDescriptionColumn,
  extraColumns = [],
  fetchFiles,
}: FilesTableProperties) => {
  const actionItems: MenuItem[] = [
    {
      label: "invitation.actions.resend",
      icon: "pi pi-download",
    },
    {
      label: "invitation.actions.revoke",
      icon: "pi pi-file-edit",
      className: "danger",
    },
    {
      label: "invitation.actions.revoke",
      icon: "pi pi-pencil",
      className: "danger",
    },
  ];

  const initialFilters = {
    email: { value: "", matchMode: FilterMatchMode.CONTAINS },
  };

  const descriptionColumn: Array<ColumnProps> = showDescriptionColumn
    ? [
        {
          field: "description",
          header: "invitations.table.defaultColumns.app",
          body: (data: { appId: any }) => {
            return <span>{data.appId || "-"} </span>;
          },
          align: "center",
        },
      ]
    : [];

  const defaultColumns: Array<ColumnProps> = [
    {
      field: "filename",
      header: "invitations.table.defaultColumns.email",
      sortable: true,
      filter: true,
      filterPlaceholder: "invitations.table.searchPlaceholder",
      showFilterMenu: false,
      showClearButton: false,
    },
    ...descriptionColumn,
    ...extraColumns,
    {
      field: "uploadedBy",
      header: "invitations.table.defaultColumns.role",
      align: "center",
    },
    {
      field: "uploadedAt",
      header: "invitations.table.defaultColumns.invitedBy",
      align: "center",
    },

    {
      field: "actions",
      header: "invitations.table.defaultColumns.actions",
      body: (data) => {
        return <ActionsMenu actions={actionItems} />;
      },
      align: "center",
    },
  ];

  const rowClassNameCallback = (data: any) => {
    return `invitations-${data.id}`;
  };

  return (
    <DataTable
      className={className}
      columns={columns ? columns : defaultColumns}
      data={files}
      emptyMessage="invitations.table.emptyMessage"
      fetchData={fetchFiles}
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
