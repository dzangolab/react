import React from "react";
import { ActionsMenu, DataTable } from "../index";
import { FilterMatchMode } from "primereact/api";
import { ColumnProps } from "primereact/column";
import { MenuItem } from "primereact/menuitem";

type TranslationMessage = {
  actionDownloadMessage: string;
  actionEditMessage: string;
  actionRenameMessage: string;
  columnFileHeaderMessage: string;
  columnDescriptionHeaderMessage: string;
  searchPlaceholderMessage: string;
  columnUploadedByHeaderMessage: string;
  columnUploadedAtHeaderMessage: string;
  columnActionsHeaderMessage: string;
  tableEmptyMessage: string;
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
  translationMessage?: TranslationMessage;
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
      label: translationMessage?.actionDownloadMessage || "Download",
      icon: "pi pi-download",
    },
    {
      label: translationMessage?.actionEditMessage || "Edit",
      icon: "pi pi-file-edit",
    },
    {
      label: translationMessage?.actionRenameMessage || "Rename",
      icon: "pi pi-pencil",
    },
  ];

  const initialFilters = {
    filename: { value: "", matchMode: FilterMatchMode.CONTAINS },
  };

  const descriptionColumn: Array<ColumnProps> = showDescriptionColumn
    ? [
        {
          field: "description",
          header:
            translationMessage?.columnDescriptionHeaderMessage || "Description",
          body: (data) => {
            return data.description;
          },
        },
      ]
    : [];

  const defaultColumns: Array<ColumnProps> = [
    {
      field: "filename",
      header: translationMessage?.columnFileHeaderMessage || "File",
      sortable: true,
      filter: true,
      filterPlaceholder:
        translationMessage?.searchPlaceholderMessage || "File name example",
      showFilterMenu: false,
      showClearButton: false,
    },
    ...descriptionColumn,
    ...extraColumns,
    {
      field: "uploadedBy",
      header:
        translationMessage?.columnUploadedByHeaderMessage || "Uploaded by",
      body: (data) => {
        return data.uploadedBy;
      },
    },
    {
      field: "uploadedAt",
      header:
        translationMessage?.columnUploadedAtHeaderMessage || "Uploaded at",
      body: (data) => {
        return data.uploadedAt;
      },
    },

    {
      field: "actions",
      header: translationMessage?.columnActionsHeaderMessage || "Actions",
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
      emptyMessage={
        translationMessage?.tableEmptyMessage || "The table is empty"
      }
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
