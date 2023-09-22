import { Button } from "primereact/button";

import type { ComponentProps } from "react";
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
  cancelButtonIcon?: string;
  cancelButtonLabel?: string;
  onCancel?: () => void;
  onFileSelect?: (files: FileExtended[]) => FileExtended[];
  onUpload: (files: FileExtended[]) => void;
  uploadButtonIcon?: string;
  uploadButtonLabel?: string;
}

export type IFileDropzoneProperties = Omit<
  IFileDropzoneBasicProperties,
  "value" | "onChange"
>;

export interface IFileInputBasicProperties
  extends IFileDropzoneBasicProperties {
  inputMethod?: FileInputMethod;
  selectedFileDisplay?: "list" | "popup" | "none";
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
