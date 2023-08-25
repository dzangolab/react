import { FileCard, IFile, Message } from "..";

type FilesListType = {
  files: IFile[];
  onFileArchive?: (arguments_: IFile) => void;
  onFileDelete?: (arguments_: IFile) => void;
  onFileDownload?: (arguments_: IFile) => void;
  onFileShare?: (arguments_: IFile) => void;
  onFileView?: (arguments_: IFile) => void;
  showDescription?: boolean;
  messages?: Message;
};

export const FilesList = ({
  files,
  onFileArchive,
  onFileDelete,
  onFileDownload,
  onFileShare,
  onFileView,
  showDescription,
  messages,
}: FilesListType) => {
  return (
    <div>
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
            showDescription={showDescription}
            messages={messages}
          />
        );
      })}
    </div>
  );
};
