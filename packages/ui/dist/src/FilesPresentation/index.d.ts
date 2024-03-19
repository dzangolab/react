import { FilesTable, FilesList, IFile, TableMessages, VisibleFileDetails } from "..";
import type { ComponentProps, FC } from "react";
export interface IFilesPresentationProperties {
    presentation?: "list" | "table";
    files: Array<IFile>;
    messages?: TableMessages;
    onFileArchive?: (arguments_: IFile) => void;
    onFileDownload?: (arguments_: IFile) => void;
    onFileDelete?: (arguments_: IFile) => void;
    onEditDescription?: (arguments_: IFile) => void;
    onFileShare?: (arguments_: IFile) => void;
    onFileView?: (arguments_: IFile) => void;
    visibleFileDetails?: VisibleFileDetails[];
    listProps?: Partial<ComponentProps<typeof FilesList>>;
    tableProps?: Partial<ComponentProps<typeof FilesTable>>;
}
export declare const FilesPresentation: FC<IFilesPresentationProperties>;
//# sourceMappingURL=index.d.ts.map