import { ComponentProps, ReactNode } from "react";
import { IFile, FileMessages, VisibleFileDetails, ConfirmationModal } from "..";
import { Button } from "../Buttons/ButtonBasic";
export type FilesListType = {
    files: IFile[];
    messages?: FileMessages;
    archiveButtonProps?: ComponentProps<typeof Button>;
    archiveConfirmationProps?: ComponentProps<typeof ConfirmationModal>;
    deleteConfirmationProps?: ComponentProps<typeof ConfirmationModal>;
    deleteButtonProps?: ComponentProps<typeof Button>;
    downloadButtonProps?: ComponentProps<typeof Button>;
    editDescriptionButtonProps?: ComponentProps<typeof Button>;
    shareButtonProps?: ComponentProps<typeof Button>;
    viewButtonProps?: ComponentProps<typeof Button>;
    onFileArchive?: (arguments_: IFile) => void;
    onFileDelete?: (arguments_: IFile) => void;
    onFileDownload?: (arguments_: IFile) => void;
    onEditDescription?: (arguments_: IFile) => void;
    onFileShare?: (arguments_: IFile) => void;
    onFileView?: (arguments_: IFile) => void;
    renderFileThumbnail?: (arguments_: IFile) => ReactNode;
    showFileThumbnail?: boolean;
    visibleFileDetails?: VisibleFileDetails[];
};
export declare const FilesList: ({ archiveButtonProps, archiveConfirmationProps, deleteConfirmationProps, deleteButtonProps, downloadButtonProps, editDescriptionButtonProps, shareButtonProps, viewButtonProps, files, messages, onEditDescription, onFileArchive, onFileDelete, onFileDownload, onFileShare, onFileView, renderFileThumbnail, visibleFileDetails, showFileThumbnail, }: FilesListType) => import("react").JSX.Element;
//# sourceMappingURL=index.d.ts.map