import React, { ComponentProps, FC } from "react";

import { ConfirmationModal } from "..";

import type { IFile } from "..";

type ConfirmationFileActionsType = {
  visibleArchiveConfirmation: boolean;
  visibleDeleteConfirmation: boolean;
  onArchive?: (arguments_: IFile) => void | Promise<void>;
  onDelete?: (arguments_: IFile) => void | Promise<void>;
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

const ConfirmationFileActions: FC<ConfirmationFileActionsType> = ({
  visibleArchiveConfirmation,
  visibleDeleteConfirmation,
  onArchive,
  onDelete,
  file,
  setVisibleArchiveConfirmation,
  setVisibleDeleteConfirmation,
  archiveConfirmationProps,
  archiveConfirmationHeader,
  archiveConfirmationMessage,
  deleteConfirmationHeader,
  deleteConfirmationMessage,
  deleteConfirmationProps,
}) => {
  return (
    <>
      <ConfirmationModal
        visible={visibleArchiveConfirmation}
        accept={async () => {
          await onArchive?.(file);

          setVisibleArchiveConfirmation(false);
        }}
        reject={() => {
          setVisibleArchiveConfirmation(false);
        }}
        onHide={() => {
          setVisibleArchiveConfirmation(false);
        }}
        message={
          archiveConfirmationMessage ||
          "Are you sure you want to archive this file?"
        }
        header={archiveConfirmationHeader || "Archive file?"}
        {...archiveConfirmationProps}
      />
      <ConfirmationModal
        visible={visibleDeleteConfirmation}
        accept={async () => {
          await onDelete?.(file);

          setVisibleDeleteConfirmation(false);
        }}
        reject={() => setVisibleDeleteConfirmation(false)}
        onHide={() => setVisibleDeleteConfirmation(false)}
        message={
          deleteConfirmationMessage ||
          "Are you sure you want to delete this file?"
        }
        header={deleteConfirmationHeader || "Delete file?"}
        {...deleteConfirmationProps}
      />
    </>
  );
};

export default ConfirmationFileActions;
