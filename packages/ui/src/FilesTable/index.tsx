import { FilterMatchMode } from "primereact/api";
import { MenuItem } from "primereact/menuitem";
import React, { useState } from "react";

import ConfirmationFileActions from "../FileCard/ConfirmationFileActions";
import {
  ActionsMenu,
  ConfirmationModal,
  DataTable,
  FileMessages,
  IColumnProperties,
  LazyTableState,
  VisibleFileDetails,
  formatDate,
} from "../index";
import { useManipulateColumns } from "../utils";

import type { ComponentProps } from "react";

export type TableMessages = {
  searchPlaceholder?: string;
  tableEmpty?: string;
} & FileMessages;

export interface IFile {
  originalFileName: string;
  description?: string;
  size?: number;
  uploadedBy: object;
  uploadedAt: number;
  downloadCount?: number;
  lastDownloadedAt?: number;
}

export type FilesTableProperties = {
  className?: string;
  columns?: Array<IColumnProperties>;
  fetchFiles?: (arguments_: LazyTableState) => void;
  files: Array<IFile>;
  id?: string;
  loading?: boolean;
  onFileArchive?: (arguments_: IFile) => void;
  archiveConfirmationProps?: ComponentProps<typeof ConfirmationModal>;
  onFileDownload?: (arguments_: IFile) => void;
  onFileDelete?: (arguments_: IFile) => void;
  deleteConfirmationProps?: ComponentProps<typeof ConfirmationModal>;
  onEditDescription?: (arguments_: IFile) => void;
  onFileShare?: (arguments_: IFile) => void;
  onFileView?: (arguments_: IFile) => void;
  totalRecords?: number;
  messages?: TableMessages;
  visibleColumns?: VisibleFileDetails[];
} & Partial<ComponentProps<typeof DataTable>>;

export const FilesTable = ({
  archiveConfirmationProps,
  className,
  columns = [],
  deleteConfirmationProps,
  id,
  loading,
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

  const initialFilters = {
    originalFileName: { value: "", matchMode: FilterMatchMode.CONTAINS },
  };

  const defaultColumns: Array<IColumnProperties> = [
    {
      field: "originalFileName",
      header: messages?.originalFileNameHeader || "File",
      sortable: true,
      filter: true,
      filterPlaceholder: messages?.searchPlaceholder || "File name example",
      showFilterMenu: false,
      showClearButton: false,
    },
    {
      field: "description",
      header: messages?.descriptionHeader || "Description",
      bodyTooltip: true,
      body: (data) => {
        return data.description;
      },
    },
    {
      field: "uploadedBy",
      header: messages?.uploadedByHeader || "Uploaded by",
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
      header: messages?.uploadedAtHeader || "Uploaded at",
      body: (data) => {
        return formatDate(data.uploadedAt);
      },
    },
    {
      field: "downloadCount",
      header: messages?.downloadCountHeader || "Download count",
      body: (data) => {
        return data.downloadCount;
      },
    },
    {
      field: "lastDownloadedAt",
      header: messages?.lastDownloadedAtHeader || "Last downloaded at",
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
      header: messages?.actionsHeader || "Actions",
      body: (data) => {
        return <ActionsMenu actions={getActionsItem(data)} />;
      },
    },
  ];

  const processedColumns: Array<IColumnProperties> = useManipulateColumns({
    visibleColumns,
    columns: [...defaultColumns, ...columns],
  });

  const rowClassNameCallback = (data: { id: string | number }) => {
    return `files-${data.id}`;
  };

  return (
    <>
      <DataTable
        className={className}
        dataKey="originalFileName"
        columns={processedColumns}
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
