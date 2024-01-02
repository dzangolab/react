import React, { useState } from "react";

import { FileInputBasic } from "./FileInputBasic";

import type { FileExtended, IFileInputProperties } from "../types";

export const FileInput = ({
  name,
  inputMethod,
  selectedFileDisplay,
  multiple = false,
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
  value = [],
  onChange,
}: IFileInputProperties) => {
  const [selectedFiles, setSelectedFiles] = useState<FileExtended[]>(value);

  return (
    <>
      <FileInputBasic
        name={name}
        inputMethod={inputMethod}
        selectedFileDisplay={selectedFileDisplay}
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
