import { ReactNode } from "react";

import { FileCard, IFile, FileMessages, VisibleFileDetails } from "..";

export type FilesListType = {
  files: IFile[];
  messages?: FileMessages;
  onFileArchive?: (arguments_: IFile) => void;
  onFileDelete?: (arguments_: IFile) => void;
  onFileDownload?: (arguments_: IFile) => void;
  onEditDescription?: (arguments_: any) => void;
  onFileShare?: (arguments_: IFile) => void;
  onFileView?: (arguments_: IFile) => void;
  renderFileThumbnail?: (arguments_: IFile) => ReactNode;
  showFileThumbnail?: boolean;
  visibleFileDetails?: VisibleFileDetails[];
};

export const FilesList = ({
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
            key={file.filename}
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
          />
        );
      })}
    </div>
  );
};
