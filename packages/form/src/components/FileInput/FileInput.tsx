import { Button } from "primereact/button";
import React, { ComponentProps, useState } from "react";
import { DropzoneOptions } from "react-dropzone";

import { FileInputBasic } from "./FileInputBasic";
import { FileExtended } from "./types";

interface IFileInputProperties {
  name: string;
  multiple?: boolean;
  inputMode?: "dropzone" | "button";
  displaySelectedFileList?: "list" | "popup-list" | "none";
  label?: string;
  mode?: "append" | "update";
  inputButtonLabel?: string;
  inputButtonLabelSelected?: string;
  emptySelectionMessage?: string;
  enableDescription?: boolean;
  addDescriptionLabel?: string;
  descriptionPlaceholder?: string;
  dropzoneMessage?: string;
  dropzoneOptions?: DropzoneOptions;
  selectButtonProps?: ComponentProps<typeof Button>;
  defaultValue?: FileExtended[];
  onChange: (files: FileExtended[]) => void;
}

export const FileInput = ({
  name,
  inputMode,
  displaySelectedFileList,
  multiple = true,
  label,
  mode = "update",
  emptySelectionMessage,
  inputButtonLabel,
  inputButtonLabelSelected,
  enableDescription = false,
  addDescriptionLabel,
  descriptionPlaceholder,
  dropzoneMessage,
  dropzoneOptions,
  selectButtonProps,
  defaultValue = [],
  onChange,
}: IFileInputProperties) => {
  const [selectedFiles, setSelectedFiles] =
    useState<FileExtended[]>(defaultValue);

  return (
    <>
      <FileInputBasic
        name={name}
        inputMode={inputMode}
        displaySelectedFileList={displaySelectedFileList}
        inputButtonLabel={inputButtonLabel}
        inputButtonLabelSelected={inputButtonLabelSelected}
        emptySelectionMessage={emptySelectionMessage}
        value={selectedFiles}
        label={label}
        mode={mode}
        multiple={multiple}
        dropzoneOptions={dropzoneOptions}
        enableDescription={enableDescription}
        addDescriptionLabel={addDescriptionLabel}
        descriptionPlaceholder={descriptionPlaceholder}
        dropzoneMessage={dropzoneMessage}
        onChange={(files) => {
          setSelectedFiles(files);
          onChange(files);
        }}
        selectButtonProps={selectButtonProps}
      />
    </>
  );
};
