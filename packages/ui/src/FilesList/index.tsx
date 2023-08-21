import { FileCard, IFile, Message } from "..";

type FilesListType = {
  files: IFile[];
  handleView: (arguments_: IFile) => void;
  handleDownload: (arguments_: IFile) => void;
  showDescription?: boolean;
  translationMessage?: Message;
};

export const FilesList = ({
  files,
  handleView,
  handleDownload,
  showDescription,
  translationMessage,
}: FilesListType) => {
  return files.map((file: IFile) => {
    return (
      <FileCard
        key={file.filename}
        file={file}
        handleView={(file) => handleView(file)}
        handleDownload={(file) => handleDownload(file)}
        showDescription={showDescription}
        translationMessage={translationMessage}
      />
    );
  });
};
