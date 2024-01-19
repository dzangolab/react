import { MenuItem } from "primereact/menuitem";
import React, { useState } from "react";

import ConfirmationFileActions from "../FileCard/ConfirmationFileActions";
import {
  ActionsMenu,
  ConfirmationModal,
  TDataTable as DataTable,
  FileMessages,
  TDataTableProperties,
  TRequestJSON,
  VisibleFileDetails,
  formatDate,
} from "../index";

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
  fetchFiles?: (arguments_: TRequestJSON) => void;
  files: Array<IFile>;
  onFileArchive?: (arguments_: IFile) => void;
  archiveConfirmationProps?: ComponentProps<typeof ConfirmationModal>;
  onFileDownload?: (arguments_: IFile) => void;
  onFileDelete?: (arguments_: IFile) => void;
  deleteConfirmationProps?: ComponentProps<typeof ConfirmationModal>;
  onEditDescription?: (arguments_: IFile) => void;
  onFileShare?: (arguments_: IFile) => void;
  onFileView?: (arguments_: IFile) => void;
  messages?: TableMessages;
  visibleColumns?: VisibleFileDetails[];
};

export const FilesTable = ({
  archiveConfirmationProps,
  className = "table-files",
  columns = [],
  deleteConfirmationProps,
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
  const [visibleArchiveConfirmation, setVisibleArchiveConfirmation] =
    useState(false);
  const [visibleDeleteConfirmation, setVisibleDeleteConfirmation] =
    useState(false);

  const [removeableFile, setRemoveableFile] = useState<IFile>();

  const getActionsItem = (file: IFile) => {
    const actionItems: MenuItem[] = [];

    if (onFileArchive) {
      actionItems.push({
        label: messages?.archiveAction || "Archive",
        icon: "pi pi-book",
        command: () => {
          setRemoveableFile(file);
          setVisibleDeleteConfirmation(false);
          setVisibleArchiveConfirmation(true);
        },
      });
    }

    if (onFileDownload) {
      actionItems.push({
        label: messages?.downloadAction || "Download",
        icon: "pi pi-download",
        command: () => onFileDownload?.(file),
      });
    }

    if (visibleColumns.includes("description") && onEditDescription) {
      actionItems.push({
        label: messages?.editDescriptionAction || "Edit description",
        icon: "pi pi-pencil",
        command: () => onEditDescription?.(file),
      });
    }

    if (onFileShare) {
      actionItems.push({
        label: messages?.shareAction || "Share",
        icon: "pi pi-share-alt",
        command: () => onFileShare?.(file),
      });
    }

    if (onFileView) {
      actionItems.push({
        label: messages?.viewAction || "Share",
        icon: "pi pi-eye",
        command: () => onFileView?.(file),
      });
    }

    if (onFileDelete) {
      actionItems.push({
        label: messages?.deleteAction || "Delete",
        icon: "pi pi-trash",
        className: "danger",
        command: () => {
          setRemoveableFile(file);
          setVisibleDeleteConfirmation(true);
          setVisibleArchiveConfirmation(false);
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
    {
      align: "center",
      id: "actions",
      header: messages?.actionsHeader || "",
      cell: ({ row: { original } }) => {
        return <ActionsMenu actions={getActionsItem(original)} />;
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
        {...tableProperties}
      ></DataTable>

      <ConfirmationFileActions
        file={removeableFile as IFile}
        setVisibleArchiveConfirmation={(isVisible) =>
          setVisibleArchiveConfirmation(isVisible)
        }
        setVisibleDeleteConfirmation={(isVisible) =>
          setVisibleDeleteConfirmation(isVisible)
        }
        visibleArchiveConfirmation={visibleArchiveConfirmation}
        visibleDeleteConfirmation={visibleDeleteConfirmation}
        archiveConfirmationProps={archiveConfirmationProps}
        deleteConfirmationProps={deleteConfirmationProps}
        archiveConfirmationHeader={messages?.archiveConfirmationHeader}
        archiveConfirmationMessage={messages?.archiveConfirmationMessage}
        deleteConfirmationHeader={messages?.deleteConfirmationHeader}
        deleteConfirmationMessage={messages?.deleteConfirmationMessage}
        onArchive={onFileArchive}
        onDelete={onFileDelete}
      />
    </>
  );
};
