import { ComponentProps, FC } from "react";
import { ConfirmationModal } from "..";
import type { IFile } from "..";
type ConfirmationFileActionsType = {
    visibleArchiveConfirmation: boolean;
    visibleDeleteConfirmation: boolean;
    onArchive?: (arguments_: IFile) => void;
    onDelete?: (arguments_: IFile) => void;
    file: IFile;
    setVisibleArchiveConfirmation: (isVisible: boolean) => void;
    setVisibleDeleteConfirmation: (isVisible: boolean) => void;
    archiveConfirmationProps?: ComponentProps<typeof ConfirmationModal>;
    archiveConfirmationHeader?: string;
    archiveConfirmationMessage?: string;
    deleteConfirmationHeader?: string;
    deleteConfirmationMessage?: string;
    deleteConfirmationProps?: ComponentProps<typeof ConfirmationModal>;
};
declare const ConfirmationFileActions: FC<ConfirmationFileActionsType>;
export default ConfirmationFileActions;
//# sourceMappingURL=ConfirmationFileActions.d.ts.map