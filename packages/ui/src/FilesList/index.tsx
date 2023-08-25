import { ReactNode } from "react";

import { FileCard, IFile, Messages } from "..";

type FilesListType = {
  files: IFile[];
  messages?: Messages;
  onFileArchive?: (arguments_: IFile) => void;
  onFileDelete?: (arguments_: IFile) => void;
  onFileDownload?: (arguments_: IFile) => void;
  onFileShare?: (arguments_: IFile) => void;
  onFileView?: (arguments_: IFile) => void;
  renderFileThumbnail?: (arguments_: IFile) => ReactNode;
  showFileThumbnail?: boolean;
  showDescription?: boolean;
};

export const FilesList = ({
  files,
  messages,
  onFileArchive,
  onFileDelete,
  onFileDownload,
  onFileShare,
  onFileView,
  showFileThumbnail,
  renderFileThumbnail,
  showDescription,
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
            onShare={onFileShare}
            onView={onFileView}
            renderThumbnail={renderFileThumbnail}
            showThumbnail={showFileThumbnail}
            showDescription={showDescription}
          />
        );
      })}
    </div>
  );
};
