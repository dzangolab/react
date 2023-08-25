import { FileCard, IFile, Messages } from "..";

type FilesListType = {
  files: IFile[];
  onFileArchive?: (arguments_: IFile) => void;
  onFileDelete?: (arguments_: IFile) => void;
  onFileDownload?: (arguments_: IFile) => void;
  onFileShare?: (arguments_: IFile) => void;
  onFileView?: (arguments_: IFile) => void;
  messages?: Messages;
  renderThumbnail?: boolean;
  showDescription?: boolean;
};

export const FilesList = ({
  files,
  onFileArchive,
  onFileDelete,
  onFileDownload,
  onFileShare,
  onFileView,
  messages,
  renderThumbnail,
  showDescription,
}: FilesListType) => {
  return (
    <div className="file-list-wrapper">
      {files.map((file: IFile) => {
        return (
          <FileCard
            key={file.filename}
            file={file}
            onArchive={onFileArchive}
            onDelete={onFileDelete}
            onDownload={onFileDownload}
            onShare={onFileShare}
            onView={onFileView}
            messages={messages}
            renderThumbnail={renderThumbnail}
            showDescription={showDescription}
          />
        );
      })}
    </div>
  );
};
