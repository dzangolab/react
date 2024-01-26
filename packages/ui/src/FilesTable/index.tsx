import React from "react";

import {
  ConfirmationModal,
  TDataTable as DataTable,
  FileMessages,
  TDataTableProperties,
  TRequestJSON,
  VisibleFileDetails,
  formatDate,
} from "../index";
import { DataActionsMenuItem } from "../Table/TableDataActions";

import type { ColumnDef } from "@tanstack/react-table";
import type { ComponentProps } from "react";

export type TableMessages = {
  searchPlaceholder?: string;
  tableEmpty?: string;
  fileSizeHeader?: string;
} & FileMessages;

export interface IFile {
  id: number | string;
  originalFileName: string;
  description?: string;
  size?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  uploadedBy: any;
  uploadedAt: number;
  downloadCount?: number;
  lastDownloadedAt?: number;
}

export type FilesTableProperties = Partial<
  Omit<TDataTableProperties<IFile>, "data" | "visibleColumns" | "fetchData">
> & {
  files: Array<IFile>;
  messages?: TableMessages;
  visibleColumns?: VisibleFileDetails[];
  fetchFiles?: (arguments_: TRequestJSON) => void;
  onFileArchive?: (arguments_: IFile) => void;
  onFileDownload?: (arguments_: IFile) => void;
  onFileDelete?: (arguments_: IFile) => void;
  onEditDescription?: (arguments_: IFile) => void;
  onFileShare?: (arguments_: IFile) => void;
  onFileView?: (arguments_: IFile) => void;
};

export const FilesTable = ({
  className = "table-files",
  columns = [],
  id = "table-files",
  isLoading,
  files,
  totalRecords,
  fetchFiles,
  messages,
  visibleColumns = ["originalFileName", "uploadedBy", "uploadedAt", "actions"],
  onFileArchive,
  onFileDownload,
  onFileDelete,
  onFileShare,
  onFileView,
  onEditDescription,
  ...tableProperties
}: FilesTableProperties) => {
  const getActionsItem = () => {
    const actionItems: DataActionsMenuItem[] = [];

    if (onFileArchive) {
      actionItems.push({
        label: messages?.archiveAction || "Archive",
        icon: "pi pi-book",
        requireConfirmationModal: true,
        confirmationOptions: {
          header: messages?.archiveConfirmationHeader || "Archive file",
          message:
            messages?.archiveConfirmationMessage ||
            "Are you sure you want to archive this file?",
        },
        onClick: (file) => {
          onFileArchive(file);
        },
      });
    }

    if (onFileDownload) {
      actionItems.push({
        label: messages?.downloadAction || "Download",
        icon: "pi pi-download",
        onClick: (file) => onFileDownload?.(file),
      });
    }

    if (visibleColumns.includes("description") && onEditDescription) {
      actionItems.push({
        label: messages?.editDescriptionAction || "Edit description",
        icon: "pi pi-pencil",
        onClick: (file) => onEditDescription?.(file),
      });
    }

    if (onFileShare) {
      actionItems.push({
        label: messages?.shareAction || "Share",
        icon: "pi pi-share-alt",
        onClick: (file) => onFileShare?.(file),
      });
    }

    if (onFileView) {
      actionItems.push({
        label: messages?.viewAction || "Share",
        icon: "pi pi-eye",
        onClick: (file) => onFileView?.(file),
      });
    }

    if (onFileDelete) {
      actionItems.push({
        label: messages?.deleteAction || "Delete",
        icon: "pi pi-trash",
        className: "danger",
        requireConfirmationModal: true,
        confirmationOptions: {
          header: messages?.deleteConfirmationHeader || "Delete file",
          message:
            messages?.deleteConfirmationMessage ||
            "Are you sure you want to delete this file?",
        },
        onClick: (file) => {
          onFileDelete(file);
        },
      });
    }

    return actionItems;
  };

  const defaultColumns: Array<ColumnDef<IFile>> = [
    {
      accessorKey: "originalFileName",
      header: messages?.originalFileNameHeader || "File",
      filterPlaceholder: messages?.searchPlaceholder || "File name example",
      enableColumnFilter: true,
      enableSorting: true,
      enableGlobalFilter: true,
    },
    {
      accessorKey: "description",
      header: messages?.descriptionHeader || "Description",
      tooltip: true,
      enableGlobalFilter: true,
    },
    {
      accessorKey: "size",
      header: messages?.fileSizeHeader || "Size",
    },
    {
      id: "uploadedBy",
      header: messages?.uploadedByHeader || "Uploaded by",
      cell: ({ row: { original } }) => {
        if (!original.uploadedBy) {
          return <code>&#8212;</code>;
        }

        if (original.uploadedBy.givenName || original.uploadedBy.lastName) {
          return `${original.uploadedBy.givenName || ""} ${
            original.uploadedBy.lastName || ""
          }`;
        }

        return original.uploadedBy.email;
      },
    },
    {
      accessorKey: "uploadedAt",
      header: messages?.uploadedAtHeader || "Uploaded at",
      cell: ({ getValue }) => {
        return formatDate(getValue() as number);
      },
    },
    {
      align: "right",
      accessorKey: "downloadCount",
      header: messages?.downloadCountHeader || "Download count",
    },
    {
      accessorKey: "lastDownloadedAt",
      header: messages?.lastDownloadedAtHeader || "Last downloaded at",
      enableColumnFilter: false,
      enableSorting: false,
      cell: ({ getValue }) => {
        if (getValue()) {
          return formatDate(getValue() as number);
        }

        return <code>&#8212;</code>;
      },
    },
  ];

  return (
    <>
      <DataTable
        className={className}
        columns={[...defaultColumns, ...columns]}
        data={files}
        emptyTableMessage={messages?.tableEmpty || "The table is empty"}
        fetchData={fetchFiles}
        id={id}
        isLoading={isLoading}
        totalRecords={totalRecords}
        visibleColumns={visibleColumns}
        dataActionsMenu={{
          actions: [...getActionsItem()],
        }}
        {...tableProperties}
      ></DataTable>
    </>
  );
};
