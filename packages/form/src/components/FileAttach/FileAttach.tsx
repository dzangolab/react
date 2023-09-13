import { Button } from "primereact/button";
import React, { ComponentProps, useState } from "react";

import { FileAttachBasic } from "./FileAttachBasic";
import { FileExtended } from "../FileInput/types";

interface IFileAttachProperties {
  name: string;
  multiple?: boolean;
  displaySelectedFileList?: "popup-list" | "none";
  label?: string;
  mode?: "append" | "update";
  inputButtonLabel?: string;
  inputButtonLabelSelected?: string;
  emptySelectionMessage?: string;
  enableDescription?: boolean;
  addDescriptionLabel?: string;
  descriptionPlaceholder?: string;
  selectButtonProps?: ComponentProps<typeof Button>;
  defaultValue?: FileExtended[];
  onChange: (files: FileExtended[]) => void;
}

export const FileAttach = ({
  name,
  multiple = true,
  mode = "update",
  emptySelectionMessage,
  inputButtonLabel,
  enableDescription = false,
  addDescriptionLabel,
  descriptionPlaceholder,
  displaySelectedFileList,
  selectButtonProps,
  defaultValue = [],
  onChange,
}: IFileAttachProperties) => {
  const [selectedFiles, setSelectedFiles] =
    useState<FileExtended[]>(defaultValue);

  return (
    <>
      <FileAttachBasic
        name={name}
        displaySelectedFileList={displaySelectedFileList}
        inputButtonLabel={inputButtonLabel}
        emptySelectionMessage={emptySelectionMessage}
        value={selectedFiles}
        mode={mode}
        multiple={multiple}
        enableDescription={enableDescription}
        addDescriptionLabel={addDescriptionLabel}
        descriptionPlaceholder={descriptionPlaceholder}
        onChange={(files) => {
          setSelectedFiles(files);
          onChange(files);
        }}
        selectButtonProps={selectButtonProps}
      />
    </>
  );
};
