import { Button } from "primereact/button";
import { ComponentProps, ReactNode } from "react";

import {
  FileCard,
  IFile,
  FileMessages,
  VisibleFileDetails,
  ConfirmationModal,
} from "..";

export type FilesListType = {
  files: IFile[];
  messages?: FileMessages;
  archiveButtonProps?: ComponentProps<typeof Button>;
  archiveConfirmationProps?: ComponentProps<typeof ConfirmationModal>;
  deleteConfirmationProps?: ComponentProps<typeof ConfirmationModal>;
  deleteButtonProps?: ComponentProps<typeof Button>;
  downloadButtonProps?: ComponentProps<typeof Button>;
  editDescriptionButtonProps?: ComponentProps<typeof Button>;
  shareButtonProps?: ComponentProps<typeof Button>;
  viewButtonProps?: ComponentProps<typeof Button>;
  onFileArchive?: (arguments_: IFile) => void;
  onFileDelete?: (arguments_: IFile) => void;
  onFileDownload?: (arguments_: IFile) => void;
  onEditDescription?: (arguments_: IFile) => void;
  onFileShare?: (arguments_: IFile) => void;
  onFileView?: (arguments_: IFile) => void;
  renderFileThumbnail?: (arguments_: IFile) => ReactNode;
  showFileThumbnail?: boolean;
  visibleFileDetails?: VisibleFileDetails[];
};

export const FilesList = ({
  archiveButtonProps,
  archiveConfirmationProps,
  deleteConfirmationProps,
  deleteButtonProps,
  downloadButtonProps,
  editDescriptionButtonProps,
  shareButtonProps,
  viewButtonProps,
  files,
  messages,
  onEditDescription,
  onFileArchive,
  onFileDelete,
  onFileDownload,
  onFileShare,
  onFileView,
  renderFileThumbnail,
  visibleFileDetails,
  showFileThumbnail,
}: FilesListType) => {
  return (
    <div className="file-list-wrapper">
      {files.map((file: IFile) => {
        return (
          <FileCard
            key={file.originalFileName}
            file={file}
            messages={messages}
            onArchive={onFileArchive}
            onDelete={onFileDelete}
            onDownload={onFileDownload}
            onEditDescription={onEditDescription}
            onShare={onFileShare}
            onView={onFileView}
            renderThumbnail={renderFileThumbnail}
            showThumbnail={showFileThumbnail}
            visibleFileDetails={visibleFileDetails}
            archiveButtonProps={archiveButtonProps}
            archiveConfirmationProps={archiveConfirmationProps}
            deleteButtonProps={deleteButtonProps}
            deleteConfirmationProps={deleteConfirmationProps}
            downloadButtonProps={downloadButtonProps}
            editDescriptionButtonProps={editDescriptionButtonProps}
            shareButtonProps={shareButtonProps}
            viewButtonProps={viewButtonProps}
          />
        );
      })}
    </div>
  );
};
