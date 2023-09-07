import {
  FilesTable,
  FilesList,
  IFile,
  FilesTableProperties,
  FilesListType,
} from "..";

import type { FC } from "react";

export interface IFilesPresentationProperties {
  presentation?: "list" | "table";
  files: Array<IFile>;
  onFileArchive?: (arguments_: any) => void;
  onFileDownload?: (arguments_: any) => void;
  onFileDelete?: (arguments_: any) => void;
  onEditDescription?: (arguments_: any) => void;
  onFileShare?: (arguments_: any) => void;
  onFileView?: (arguments_: any) => void;
  listProps?: Omit<FilesListType, "files" | "onFileDownload" | "onFileDelete">;
  tableProps?: Omit<
    FilesTableProperties,
    "files" | "onFileDownload" | "onFileDelete"
  >;
}

export const FilesPresentation: FC<IFilesPresentationProperties> = ({
  presentation = "list",
  files = [],
  onFileArchive,
  onFileDownload,
  onFileDelete,
  onFileShare,
  onFileView,
  onEditDescription,
  listProps,
  tableProps,
}) => {
  if (presentation === "list") {
    return (
      <FilesList
        files={files}
        onFileDelete={onFileDelete}
        onFileDownload={onFileDownload}
        onFileArchive={onFileArchive}
        onFileShare={onFileShare}
        onFileView={onFileView}
        {...listProps}
      />
    );
  }

  return (
    <FilesTable
      files={files}
      onFileDelete={onFileDelete}
      onFileDownload={onFileDownload}
      onFileArchive={onFileArchive}
      onFileShare={onFileShare}
      onFileView={onFileView}
      onEditDescription={onEditDescription}
      {...tableProps}
    />
  );
};
