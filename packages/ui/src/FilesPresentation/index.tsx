import {
  FilesTable,
  FilesList,
  IFile,
  TableMessages,
  VisibleFileDetails,
} from "..";

import type { ComponentProps, FC } from "react";

export interface IFilesPresentationProperties {
  presentation?: "list" | "table";
  files: Array<IFile>;
  messages?: TableMessages;
  onFileArchive?: (arguments_: any) => void;
  onFileDownload?: (arguments_: any) => void;
  onFileDelete?: (arguments_: any) => void;
  onEditDescription?: (arguments_: any) => void;
  onFileShare?: (arguments_: any) => void;
  onFileView?: (arguments_: any) => void;
  visibleFileDetails?: VisibleFileDetails[];
  listProps?: Partial<ComponentProps<typeof FilesList>>;
  tableProps?: Partial<ComponentProps<typeof FilesTable>>;
}

export const FilesPresentation: FC<IFilesPresentationProperties> = ({
  presentation = "list",
  files = [],
  messages,
  onFileArchive,
  onFileDownload,
  onFileDelete,
  onFileShare,
  onFileView,
  onEditDescription,
  visibleFileDetails,
  listProps,
  tableProps,
}) => {
  if (presentation === "list") {
    return (
      <FilesList
        files={files}
        messages={messages}
        onFileArchive={onFileArchive}
        onFileDelete={onFileDelete}
        onFileDownload={onFileDownload}
        onEditDescription={onEditDescription}
        onFileShare={onFileShare}
        onFileView={onFileView}
        visibleFileDetails={visibleFileDetails}
        {...listProps}
      />
    );
  }

  return (
    <FilesTable
      files={files}
      messages={messages}
      onFileArchive={onFileArchive}
      onFileDelete={onFileDelete}
      onFileDownload={onFileDownload}
      onEditDescription={onEditDescription}
      onFileShare={onFileShare}
      onFileView={onFileView}
      visibleColumns={visibleFileDetails}
      {...tableProps}
    />
  );
};
