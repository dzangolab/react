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
  translationMessage?: Messages;
  onDownload?: (arguments_: any) => void;
  onDelete?: (arguments_: any) => void;
  onDescription?: (arguments_: any) => void;
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
  translationMessage,
  onDownload,
  onDelete,
  onDescription,
}: FilesTableProperties) => {
  const actionItems: MenuItem[] = [];

  if (onDownload) {
    actionItems.push({
      label: translationMessage?.downloadAction || "Download",
      icon: "pi pi-download",
      command: onDownload,
    });
  }

  if (onDelete) {
    actionItems.push({
      label: translationMessage?.deleteAction || "Delete",
      icon: "pi pi-trash",
      command: onDelete,
    });
  }

  if (showDescriptionColumn && onDescription) {
    actionItems.push({
      label: translationMessage?.editDescriptionAction || "Edit",
      icon: "pi pi-pencil",
      command: onDescription,
    });
  }

  const initialFilters = {
    filename: { value: "", matchMode: FilterMatchMode.CONTAINS },
  };

  const descriptionColumn: Array<ColumnProps> = showDescriptionColumn
    ? [
        {
          field: "description",
          header: translationMessage?.descriptionColumnHeader || "Description",
          body: (data) => {
            return data.description;
          },
        },
      ]
    : [];

  const defaultColumns: Array<ColumnProps> = [
    {
      field: "filename",
      header: translationMessage?.filenameColumnHeader || "File",
      sortable: true,
      filter: true,
      filterPlaceholder:
        translationMessage?.searchPlaceholder || "File name example",
      showFilterMenu: false,
      showClearButton: false,
    },
    ...descriptionColumn,
    ...extraColumns,
    {
      field: "uploadedBy",
      header: translationMessage?.uploadedByColumnHeader || "Uploaded by",
      body: (data) => {
        if (!data.updatedBy) {
          return <code>&#8212;</code>;
        }

        if (data.updatedBy.givenName || data.updatedBy.lastName) {
          return `${data.updatedBy.givenName || ""} ${
            data.updatedBy.lastName || ""
          }`;
        }

        return data.updatedBy.email;
      },
    },
    {
      field: "uploadedAt",
      header: translationMessage?.uploadedAtColumnHeader || "Uploaded at",
      body: (data) => {
        const date = new Date(data.uploadedAt);

        return date.toLocaleDateString("en-GB");
      },
    },
    {
      field: "actions",
      header: translationMessage?.actionsColumnHeader || "Actions",
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
