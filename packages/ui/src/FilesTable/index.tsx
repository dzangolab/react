import React from "react";
import { ActionsMenu, DataTable } from "../index";
import { FilterMatchMode } from "primereact/api";
import { ColumnProps } from "primereact/column";
import { MenuItem } from "primereact/menuitem";

type Messages = {
  downloadAction?: string;
  editDescriptionAction?: string;
  renameAction?: string;
  deleteAction?: string;
  filenameColumnHeader?: string;
  descriptionColumnHeader?: string;
  uploadedByColumnHeader?: string;
  uploadedAtColumnHeader?: string;
  actionsColumnHeader?: string;
  searchPlaceholder?: string;
  tableEmpty?: string;
};

type VisibleColumn =
  | "file"
  | "description"
  | "uploadedBy"
  | "uploadedAt"
  | "actions";

export type FilesTableProperties = {
  className?: string;
  columns?: Array<ColumnProps>;
  extraColumns?: Array<ColumnProps>;
  fetchFiles?: (arguments_?: any) => void;
  files: Array<object>;
  id?: string;
  loading?: boolean;
  onDownload?: (arguments_: any) => void;
  onDelete?: (arguments_: any) => void;
  onEditDescription?: (arguments_: any) => void;
  totalRecords?: number;
  translationMessage?: Messages;
  visibleColumns?: VisibleColumn[];
};

export const FilesTable = ({
  className,
  columns,
  id,
  loading,
  files,
  totalRecords,
  extraColumns = [],
  fetchFiles,
  translationMessage,
  visibleColumns = ["file", "uploadedBy", "uploadedAt", "actions"],
  onDownload,
  onDelete,
  onEditDescription,
}: FilesTableProperties) => {
  const actionItems: MenuItem[] = [];

  if (onDownload) {
    actionItems.push({
      label: translationMessage?.downloadAction || "Download",
      icon: "pi pi-download",
      command: onDownload,
    });
  }

  if (visibleColumns.includes("description") && onEditDescription) {
    actionItems.push({
      label: translationMessage?.editDescriptionAction || "Edit description",
      icon: "pi pi-pencil",
      command: onEditDescription,
    });
  }

  if (onDelete) {
    actionItems.push({
      label: translationMessage?.deleteAction || "Delete",
      icon: "pi pi-trash",
      className: "danger",
      command: onDelete,
    });
  }

  const initialFilters = {
    filename: { value: "", matchMode: FilterMatchMode.CONTAINS },
  };

  const defaultColumns: Array<ColumnProps> = [
    {
      field: "filename",
      header: translationMessage?.filenameColumnHeader || "File",
      sortable: true,
      filter: true,
      filterPlaceholder:
        translationMessage?.searchPlaceholder || "File name example",
      hidden: !visibleColumns.includes("file"),
      showFilterMenu: false,
      showClearButton: false,
    },
    {
      field: "description",
      header: translationMessage?.descriptionColumnHeader || "Description",
      hidden: !visibleColumns.includes("description"),
      body: (data) => {
        return data.description;
      },
    },
    ...extraColumns,
    {
      field: "uploadedBy",
      header: translationMessage?.uploadedByColumnHeader || "Uploaded by",
      hidden: !visibleColumns.includes("uploadedBy"),
      body: (data) => {
        if (!data.uploadedBy) {
          return <code>&#8212;</code>;
        }

        if (data.uploadedBy.givenName || data.uploadedBy.lastName) {
          return `${data.uploadedBy.givenName || ""} ${
            data.uploadedBy.lastName || ""
          }`;
        }

        return data.uploadedBy.email;
      },
    },
    {
      field: "uploadedAt",
      header: translationMessage?.uploadedAtColumnHeader || "Uploaded at",
      hidden: !visibleColumns.includes("uploadedAt"),
      body: (data) => {
        const date = new Date(data.uploadedAt);

        return date.toLocaleDateString("en-GB");
      },
    },
    {
      align: "center",
      field: "actions",
      header: translationMessage?.actionsColumnHeader || "Actions",
      hidden: !visibleColumns.includes("actions"),
      body: (data) => {
        return <ActionsMenu actions={actionItems} />;
      },
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
      emptyMessage={translationMessage?.tableEmpty || "The table is empty"}
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
