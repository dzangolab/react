import React from "react";
import { FileMessages, TDataTableProperties, TRequestJSON, VisibleFileDetails } from "../index";
export type TableMessages = {
    searchPlaceholder?: string;
    tableEmpty?: string;
    fileSizeHeader?: string;
} & FileMessages;
export interface IFile {
    id: number | string;
    originalFileName: string;
    description?: string;
    size?: number;
    uploadedBy: any;
    uploadedAt: number;
    downloadCount?: number;
    lastDownloadedAt?: number;
}
export type FilesTableProperties = Partial<Omit<TDataTableProperties<IFile>, "data" | "visibleColumns" | "fetchData">> & {
    files: Array<IFile>;
    messages?: TableMessages;
    visibleColumns?: VisibleFileDetails[];
    fetchFiles?: (arguments_: TRequestJSON) => void;
    onFileArchive?: (arguments_: IFile) => void;
    onFileDownload?: (arguments_: IFile) => void;
    onFileDelete?: (arguments_: IFile) => void;
    onEditDescription?: (arguments_: IFile) => void;
    onFileShare?: (arguments_: IFile) => void;
    onFileView?: (arguments_: IFile) => void;
};
export declare const FilesTable: ({ className, columns, id, isLoading, files, totalRecords, fetchFiles, messages, visibleColumns, onFileArchive, onFileDownload, onFileDelete, onFileShare, onFileView, onEditDescription, ...tableProperties }: FilesTableProperties) => React.JSX.Element;
//# sourceMappingURL=index.d.ts.map