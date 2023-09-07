import { FilterMatchMode } from "primereact/api";
import { ColumnProps } from "primereact/column";
import { MenuItem } from "primereact/menuitem";
import React from "react";

import { ActionsMenu, DataTable, formatDate } from "../index";

import type { ComponentProps } from "react";

type Messages = {
  archiveAction?: string;
  downloadAction?: string;
  editDescriptionAction?: string;
  renameAction?: string;
  deleteAction?: string;
  filenameColumnHeader?: string;
  descriptionColumnHeader?: string;
  downloadCountColumnHeader?: string;
  lastDownloadedAtColumnHeader?: string;
  uploadedByColumnHeader?: string;
  uploadedAtColumnHeader?: string;
  actionsColumnHeader?: string;
  searchPlaceholder?: string;
  shareAction?: string;
  viewAction?: string;
  tableEmpty?: string;
};

type VisibleColumn =
  | "filename"
  | "description"
  | "uploadedBy"
  | "uploadedAt"
  | "downloadCount"
  | "lastDownloadedAt"
  | "actions";

export interface IFile {
  filename: string;
  description?: string;
  size?: number;
  uploadedBy: object;
  uploadedAt: number;
  downloadCount?: number;
  lastDownloadedAt?: number;
}

// onFileArchive?: (arguments_: IFile) => void;
// onFileShare?: (arguments_: IFile) => void;
// onFileView?: (arguments_: IFile) => void;

// renderFileThumbnail?: (arguments_: IFile) => ReactNode;
// showFileDescription?: boolean;
// showFileEditDescription?: boolean;
// showFileSize?: boolean;
// showFileThumbnail?: boolean;

export type FilesTableProperties = {
  className?: string;
  columns?: Array<ColumnProps>;
  extraColumns?: Array<ColumnProps>;
  fetchFiles?: (arguments_?: any) => void;
  files: Array<IFile>;
  id?: string;
  loading?: boolean;
  onFileArchive?: (arguments_: any) => void;
  onFileDownload?: (arguments_: any) => void;
  onFileDelete?: (arguments_: any) => void;
  onEditDescription?: (arguments_: any) => void;
  onFileShare?: (arguments_: any) => void;
  onFileView?: (arguments_: any) => void;
  totalRecords?: number;
  messages?: Messages;
  visibleColumns?: VisibleColumn[];
} & Partial<ComponentProps<typeof DataTable>>;

export const FilesTable = ({
  className,
  columns,
  id,
  loading,
  files,
  totalRecords,
  extraColumns = [],
  fetchFiles,
  messages,
  visibleColumns = ["filename", "uploadedBy", "uploadedAt", "actions"],
  onFileArchive,
  onFileDownload,
  onFileDelete,
  onFileShare,
  onFileView,
  onEditDescription,
  ...tableProperties
}: FilesTableProperties) => {
  const actionItems: MenuItem[] = [];

  if (onFileDownload) {
    actionItems.push({
      label: messages?.archiveAction || "Archive",
      icon: "pi pi-book",
      command: onFileArchive,
    });
  }

  if (onFileDownload) {
    actionItems.push({
      label: messages?.downloadAction || "Download",
      icon: "pi pi-download",
      command: onFileDownload,
    });
  }

  if (visibleColumns.includes("description") && onEditDescription) {
    actionItems.push({
      label: messages?.editDescriptionAction || "Edit description",
      icon: "pi pi-pencil",
      command: onEditDescription,
    });
  }

  if (onFileShare) {
    actionItems.push({
      label: messages?.shareAction || "Share",
      icon: "pi pi-share-alt",
      command: onFileShare,
    });
  }

  if (onFileView) {
    actionItems.push({
      label: messages?.viewAction || "Share",
      icon: "pi pi-eye",
      command: onFileShare,
    });
  }

  if (onFileDelete) {
    actionItems.push({
      label: messages?.deleteAction || "Delete",
      icon: "pi pi-trash",
      className: "danger",
      command: onFileDelete,
    });
  }

  const initialFilters = {
    filename: { value: "", matchMode: FilterMatchMode.CONTAINS },
  };

  const defaultColumns: Array<ColumnProps> = [
    {
      field: "filename",
      header: messages?.filenameColumnHeader || "File",
      sortable: true,
      filter: true,
      filterPlaceholder: messages?.searchPlaceholder || "File name example",
      hidden: !visibleColumns.includes("filename"),
      showFilterMenu: false,
      showClearButton: false,
    },
    {
      field: "description",
      header: messages?.descriptionColumnHeader || "Description",
      hidden: !visibleColumns.includes("description"),
      body: (data) => {
        return data.description;
      },
    },
    ...extraColumns,
    {
      field: "uploadedBy",
      header: messages?.uploadedByColumnHeader || "Uploaded by",
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
      header: messages?.uploadedAtColumnHeader || "Uploaded at",
      hidden: !visibleColumns.includes("uploadedAt"),
      body: (data) => {
        return formatDate(data.uploadedAt);
      },
    },
    {
      field: "downloadCount",
      header: messages?.downloadCountColumnHeader || "Download count",
      hidden: !visibleColumns.includes("downloadCount"),
      body: (data) => {
        return data.downloadCount;
      },
    },
    {
      field: "lastDownloadedAt",
      header: messages?.lastDownloadedAtColumnHeader || "Last downloaded at",
      hidden: !visibleColumns.includes("lastDownloadedAt"),
      body: (data) => {
        if (data.lastDownloadedAt) {
          return formatDate(data.lastDownloadedAt);
        }
        return <code>&#8212;</code>;
      },
    },
    {
      align: "center",
      field: "actions",
      header: messages?.actionsColumnHeader || "Actions",
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
      emptyMessage={messages?.tableEmpty || "The table is empty"}
      fetchData={fetchFiles}
      id={id}
      initialFilters={initialFilters}
      loading={loading}
      rowClassName={rowClassNameCallback}
      showGridlines
      stripedRows={false}
      totalRecords={totalRecords}
      {...tableProperties}
    ></DataTable>
  );
};
