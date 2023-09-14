import React from "react";
import { Controller, useFormContext } from "react-hook-form";

import { FileDropzoneBasic } from "./FileDropzoneBasic";

import type { FileExtended, IFileDropzoneProperties } from "../types";

export const FileDropzone = ({
  name,
  label,
  mode = "update",
  multiple,
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
            multiple={multiple}
            dropzoneOptions={dropzoneOptions}
            enableDescription={enableDescription}
            addDescriptionLabel={addDescriptionLabel}
            descriptionPlaceholder={descriptionPlaceholder}
            dropzoneMessage={dropzoneMessage}
            onChange={(files: FileExtended[]) => field.onChange(files)}
          />
        )}
      />
    </>
  );
};
