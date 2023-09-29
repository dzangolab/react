import { FilterMatchMode } from "primereact/api";
import { ColumnProps } from "primereact/column";
import { MenuItem } from "primereact/menuitem";
import React, { useState } from "react";

import ConfirmationFileActions from "../FileCard/ConfirmationFileActions";

import {
  ActionsMenu,
  ConfirmationModal,
  DataTable,
  FileMessages,
  VisibleFileDetails,
  formatDate,
} from "../index";
import { useColumnsMap } from "../utils";

import type { ComponentProps } from "react";

export type TableMessages = {
  searchPlaceholder?: string;
  tableEmpty?: string;
} & FileMessages;

export interface IFile {
  filename: string;
  description?: string;
  size?: number;
  uploadedBy: object;
  uploadedAt: number;
  downloadCount?: number;
  lastDownloadedAt?: number;
}

export type FilesTableProperties = {
  className?: string;
  columns?: Array<ColumnProps>;
  extraColumns?: Array<ColumnProps>;
  fetchFiles?: (arguments_?: any) => void;
  files: Array<IFile>;
  id?: string;
  loading?: boolean;
  onFileArchive?: (arguments_: any) => void;
  archiveConfirmationProps?: ComponentProps<typeof ConfirmationModal>;
  onFileDownload?: (arguments_: any) => void;
  onFileDelete?: (arguments_: any) => void;
  deleteConfirmationProps?: ComponentProps<typeof ConfirmationModal>;
  onEditDescription?: (arguments_: any) => void;
  onFileShare?: (arguments_: any) => void;
  onFileView?: (arguments_: any) => void;
  totalRecords?: number;
  messages?: TableMessages;
  visibleColumns?: VisibleFileDetails[];
} & Partial<ComponentProps<typeof DataTable>>;

export const FilesTable = ({
  archiveConfirmationProps,
  className,
  columns,
  deleteConfirmationProps,
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
  const visibleColumnsMap = useColumnsMap(visibleColumns);
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
        command: (event) =>
          onFileDownload?.({ ...event.originalEvent, data: { file } }),
      });
    }

    if (visibleColumns.includes("description") && onEditDescription) {
      actionItems.push({
        label: messages?.editDescriptionAction || "Edit description",
        icon: "pi pi-pencil",
        command: (event) =>
          onEditDescription?.({ ...event.originalEvent, data: { file } }),
      });
    }

    if (onFileShare) {
      actionItems.push({
        label: messages?.shareAction || "Share",
        icon: "pi pi-share-alt",
        command: (event) =>
          onFileShare?.({ ...event.originalEvent, data: { file } }),
      });
    }

    if (onFileView) {
      actionItems.push({
        label: messages?.viewAction || "Share",
        icon: "pi pi-eye",
        command: (event) =>
          onFileView?.({ ...event.originalEvent, data: { file } }),
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
    filename: { value: "", matchMode: FilterMatchMode.CONTAINS },
  };

  const defaultColumns: Array<ColumnProps> = [
    {
      field: "filename",
      header: messages?.filenameHeader || "File",
      sortable: true,
      filter: true,
      filterPlaceholder: messages?.searchPlaceholder || "File name example",
      hidden: !visibleColumnsMap.filename,
      showFilterMenu: false,
      showClearButton: false,
    },
    {
      field: "description",
      header: messages?.descriptionHeader || "Description",
      hidden: !visibleColumnsMap.description,
      body: (data) => {
        return data.description;
      },
    },
    ...extraColumns,
    {
      field: "uploadedBy",
      header: messages?.uploadedByHeader || "Uploaded by",
      hidden: !visibleColumnsMap.uploadedBy,
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
      hidden: !visibleColumnsMap.uploadedAt,
      body: (data) => {
        return formatDate(data.uploadedAt);
      },
    },
    {
      field: "downloadCount",
      header: messages?.downloadCountHeader || "Download count",
      hidden: !visibleColumnsMap.downloadCount,
      body: (data) => {
        return data.downloadCount;
      },
    },
    {
      field: "lastDownloadedAt",
      header: messages?.lastDownloadedAtHeader || "Last downloaded at",
      hidden: !visibleColumnsMap.lastDownloadedAt,
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
      hidden: !visibleColumnsMap.actions,
      body: (data) => {
        return <ActionsMenu actions={getActionsItem(data)} />;
      },
    },
  ];

  const rowClassNameCallback = (data: any) => {
    return `files-${data.id}`;
  };

  return (
    <>
      <DataTable
        className={className}
        dataKey="filename"
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
      <ConfirmationFileActions
        file={removeableFile}
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
