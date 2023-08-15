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
}: FilesTableProperties) => {
  const actionItems: MenuItem[] = [
    {
      label: translationMessage?.downloadAction || "Download",
      icon: "pi pi-download",
    },
    {
      label: translationMessage?.deleteAction || "Delete",
      icon: "pi pi-trash",
    },
  ];

  if (showDescriptionColumn) {
    actionItems.push({
      label: translationMessage?.editDescriptionAction || "Edit",
      icon: "pi pi-pencil",
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
        return data.uploadedBy;
      },
    },
    {
      field: "uploadedAt",
      header: translationMessage?.uploadedAtColumnHeader || "Uploaded at",
      body: (data) => {
        return data.uploadedAt;
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
