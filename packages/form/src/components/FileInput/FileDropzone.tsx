import React from "react";
import { DropzoneOptions } from "react-dropzone";
import { Controller, useFormContext } from "react-hook-form";

import { FileDropzoneBasic } from "./FileDropzoneBasic";

interface IFileDropzoneProperties {
  name: string;
  label?: string;
  mode?: "append" | "update";
  enableDescription?: boolean;
  addDescriptionLabel?: string;
  descriptionPlaceholder?: string;
  dropzoneMessage?: string;
  dropzoneOptions?: DropzoneOptions;
}

export const FileDropzone = ({
  name,
  label,
  mode = "update",
  enableDescription = false,
  addDescriptionLabel,
  descriptionPlaceholder,
  dropzoneMessage,
  dropzoneOptions,
}: IFileDropzoneProperties) => {
  const { control } = useFormContext();

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <FileDropzoneBasic
            name={field.name}
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
