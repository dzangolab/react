import React from "react";
import { DropzoneOptions } from "react-dropzone";
import { Controller, useFormContext } from "react-hook-form";

import { FileInputBasic } from "./FileInputBasic";

interface IFileInputProperties {
  name: string;
  noDrag?: boolean;
  label?: string;
  mode?: "append" | "update";
  enableDescription?: boolean;
  addDescriptionLabel?: string;
  descriptionPlaceholder?: string;
  dropzoneMessage?: string;
  dropzoneOptions?: DropzoneOptions;
}

export const FileInput = ({
  name,
  noDrag = true,
  label,
  mode = "update",
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
            value={field.value}
            label={label}
            mode={mode}
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
