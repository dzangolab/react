import { Button } from "primereact/button";
import React, { ComponentProps } from "react";
import { DropzoneOptions } from "react-dropzone";
import { Controller, useFormContext } from "react-hook-form";

import { FileInputBasic } from "./FileInputBasic";

interface IFormFileInputProperties {
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
}

export const FormFileInput = ({
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
}: IFormFileInputProperties) => {
  const { control } = useFormContext();

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <FileInputBasic
            name={field.name}
            inputMode={inputMode}
            displaySelectedFileList={displaySelectedFileList}
            inputButtonLabel={inputButtonLabel}
            inputButtonLabelSelected={inputButtonLabelSelected}
            emptySelectionMessage={emptySelectionMessage}
            value={field.value}
            label={label}
            mode={mode}
            multiple={multiple}
            dropzoneOptions={dropzoneOptions}
            enableDescription={enableDescription}
            addDescriptionLabel={addDescriptionLabel}
            descriptionPlaceholder={descriptionPlaceholder}
            dropzoneMessage={dropzoneMessage}
            onChange={(files) => field.onChange(files)}
            selectButtonProps={selectButtonProps}
          />
        )}
      />
    </>
  );
};
