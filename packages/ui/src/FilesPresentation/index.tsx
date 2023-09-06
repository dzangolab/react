import type { FC } from "react";

import {
  FilesTable,
  FilesList,
  IFile,
  FilesTableProperties,
  FilesListType,
} from "..";

export interface IFilesPresentationProperties {
  presentation?: "list" | "table";
  files: Array<IFile>;
  onFileDelete?: (arguments_: IFile) => void;
  onFileDownload?: (arguments_: IFile) => void;
  listProps?: Omit<FilesListType, "files" | "onFileDownload" | "onFileDelete">;
  tableProps?: Omit<FilesListType, "files" | "onDownload" | "onDelete">;
}

export const FilesPresentation: FC<IFilesPresentationProperties> = ({
  presentation = "list",
  files = [],
  onFileDelete,
  onFileDownload,
  listProps,
  tableProps,
}) => {
  if (presentation === "list") {
    return (
      <FilesList
        files={files}
        onFileDelete={onFileDelete}
        onFileDownload={onFileDownload}
        {...listProps}
      />
    );
  }

  return (
    <FilesTable
      files={files}
      onDelete={onFileDelete}
      onDownload={onFileDownload}
      {...tableProps}
    />
  );
};
