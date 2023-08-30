import React from "react";
import { DropzoneOptions } from "react-dropzone";
import { Controller, useFormContext } from "react-hook-form";

import { FileInputBasic } from "./FileInputBasic";

interface IFileInputProperties {
  name: string;
  multiple?: boolean;
  noDrag?: boolean;
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
}

export const FileInput = ({
  name,
  noDrag = true,
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
}: IFileInputProperties) => {
  const { control } = useFormContext();

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <FileInputBasic
            name={field.name}
            noDrag={noDrag}
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
          />
        )}
      />
    </>
  );
};
