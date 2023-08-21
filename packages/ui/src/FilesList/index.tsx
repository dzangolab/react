import { FileCard, IFile } from "..";

type FilesListType = {
  files: IFile[];
  handleView: (arguments_: IFile) => void;
  handleDownload: (arguments_: IFile) => void;
};

export const FilesList = ({
  files,
  handleView,
  handleDownload,
}: FilesListType) => {
  return files.map((file: IFile, index: number) => {
    return (
      <FileCard
        key={index}
        file={file}
        handleView={(file) => handleView(file)}
        handleDownload={(file) => handleDownload(file)}
      />
    );
  });
};
