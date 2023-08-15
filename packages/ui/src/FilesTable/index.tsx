import React from "react";
import { ActionsMenu, DataTable } from "../index";
import { FilterMatchMode } from "primereact/api";
import { ColumnProps } from "primereact/column";
import { MenuItem } from "primereact/menuitem";

type TranslationMessage = {
  actionDownload: string;
  actionEdit: string;
  actionRename: string;
  columnEmailHeader: string;
  columnDescriptionHeader: string;
  searchPlaceholder: string;
  columnUploadedBy: string;
  columnUploadedAt: string;
  columnActions: string;
  emptyTableMessage: string;
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
  translationMessage: TranslationMessage;
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
      label: translationMessage.actionDownload || "Download",
      icon: "pi pi-download",
    },
    {
      label: translationMessage.actionEdit || "Edit",
      icon: "pi pi-file-edit",
    },
    {
      label: translationMessage.actionRename || "Rename",
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
          header: translationMessage.columnDescriptionHeader || "Description",
          body: (data) => {
            return <></>;
          },
          align: "center",
        },
      ]
    : [];

  const defaultColumns: Array<ColumnProps> = [
    {
      field: "filename",
      header: translationMessage.columnEmailHeader || "Email",
      sortable: true,
      filter: true,
      filterPlaceholder:
        translationMessage.searchPlaceholder || "john.doe.at.example.com",
      showFilterMenu: false,
      showClearButton: false,
    },
    ...descriptionColumn,
    ...extraColumns,
    {
      field: "uploadedBy",
      header: translationMessage.columnUploadedBy || "Uploaded by",
      align: "center",
      body: (data) => {
        return data.uploadedBy;
      },
    },
    {
      field: "uploadedAt",
      header: translationMessage.columnUploadedAt || "Uploaded at",
      align: "center",
      body: (data) => {
        return data.uploadedAt;
      },
    },

    {
      field: "actions",
      header: translationMessage.columnActions || "Actions",
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
      emptyMessage={
        translationMessage.emptyTableMessage || "The table is empty"
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
