import { Button } from "@dzangolab/react-ui";

import type { ComponentProps, ReactNode } from "react";
import type { DropzoneOptions } from "react-dropzone";

export interface FileExtended extends File {
  description?: string;
}

export type FileMode = "update" | "append";
export type FileInputMethod = "button" | "dropzone";

export interface IFileDropzoneBasicProperties {
  name: string;
  label?: string;
  multiple?: boolean;
  mode?: FileMode;
  value?: FileExtended[];
  enableDescription?: boolean;
  addDescriptionLabel?: string;
  descriptionPlaceholder?: string;
  dropzoneMessage?: string;
  dropzoneOptions?: DropzoneOptions;
  onChange: (files: FileExtended[]) => void;
}

export interface IFileUploadProperties
  extends Omit<IFileDropzoneBasicProperties, "onChange"> {
  actionsAlignment?: "left" | "right";
  cancelButtonIcon?: string | ReactNode;
  cancelButtonLabel?: string;
  cancelButtonProps?: ComponentProps<typeof Button>;
  onCancel?: () => void;
  onFileSelect?: (files: FileExtended[]) => FileExtended[];
  onUpload: (files: FileExtended[]) => void;
  uploadButtonIcon?: string | ReactNode;
  uploadButtonLabel?: string;
  uploadButtonProps?: ComponentProps<typeof Button>;
}

export type IFileDropzoneProperties = Omit<
  IFileDropzoneBasicProperties,
  "value" | "onChange"
>;

export interface IFileInputBasicProperties
  extends IFileDropzoneBasicProperties {
  inputMethod?: FileInputMethod;
  selectedFileDisplay?: "list" | "popup" | "none";
  severity?:
    | "primary"
    | "secondary"
    | "alternate"
    | "success"
    | "danger"
    | "warning";
  variant?: "outlined" | "filled";
  inputButtonLabel?: string;
  inputButtonLabelSelected?: string;
  emptySelectionMessage?: string;
  selectButtonProps?: ComponentProps<typeof Button>;
}

export type IFileInputProperties = IFileInputBasicProperties;

export type IFormFileInputProperties = Omit<
  IFileInputBasicProperties,
  "value" | "onChange"
>;

export interface IFileAttachBasicProperties
  extends Omit<
    IFileInputBasicProperties,
    | "inputMethod"
    | "label"
    | "dropzoneMessage"
    | "selectedFileDisplay"
    | "inputButtonLabel"
    | "inputButtonLabelSelected"
  > {
  selectedFileDisplay?: "popup" | "none";
}
