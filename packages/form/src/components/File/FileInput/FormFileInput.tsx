import React from "react";
import { Controller, useFormContext } from "react-hook-form";

import { FileInputBasic } from "./FileInputBasic";

import type { IFormFileInputProperties } from "../types";

export const FormFileInput = ({
  name,
  inputMethod,
  multiple = false,
  label,
  mode = "update",
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
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FileInputBasic
          name={field.name}
          inputMethod={inputMethod}
          inputButtonLabel={inputButtonLabel}
          inputButtonLabelSelected={inputButtonLabelSelected}
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
  );
};
