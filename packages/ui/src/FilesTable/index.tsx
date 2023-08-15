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
      label: "file.actions.resend",
      icon: "pi pi-download",
    },
    {
      label: "file.actions.edit",
      icon: "pi pi-file-edit",
    },
    {
      label: "file.actions.rename",
      icon: "pi pi-pencil",
    },
  ];

  const initialFilters = {
    email: { value: "", matchMode: FilterMatchMode.CONTAINS },
  };

  const descriptionColumn: Array<ColumnProps> = showDescriptionColumn
    ? [
        {
          field: "description",
          header: "files.table.defaultColumns.app",
          body: () => {
            return <></>;
          },
          align: "center",
        },
      ]
    : [];

  const defaultColumns: Array<ColumnProps> = [
    {
      field: "filename",
      header: "files.table.defaultColumns.email",
      sortable: true,
      filter: true,
      filterPlaceholder: "files.table.searchPlaceholder",
      showFilterMenu: false,
      showClearButton: false,
    },
    ...descriptionColumn,
    ...extraColumns,
    {
      field: "uploadedBy",
      header: "files.table.defaultColumns.uploadedBy",
      align: "center",
      body: (data) => {
        return data.uploadedBy;
      },
    },
    {
      field: "uploadedAt",
      header: "files.table.defaultColumns.uploadedAt",
      align: "center",
      body: (data) => {
        return data.uploadedAt;
      },
    },

    {
      field: "actions",
      header: "files.table.defaultColumns.actions",
      body: (data) => {
        return <ActionsMenu actions={actionItems} />;
      },
      align: "center",
    },
  ];

  const rowClassNameCallback = (data: any) => {
    return `files-${data.id}`;
  };

  return (
    <DataTable
      className={className}
      columns={columns ? columns : defaultColumns}
      data={files}
      emptyMessage="files.table.emptyMessage"
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
