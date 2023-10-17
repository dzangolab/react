// components/FormComponents/FileDropzoneBasic.tsx
import React, { useMemo } from "react";
import { useDropzone } from "react-dropzone";

import { useOnDropFile, useOnRemoveFile } from "../hooks";
import { SelectedFile } from "../SelectedFile";

import type { IFileDropzoneBasicProperties } from "../types";
import type { FC } from "react";

export const FileDropzoneBasic: FC<IFileDropzoneBasicProperties> = ({
  name,
  label,
  mode = "append",
  multiple = true,
  value = [],
  dropzoneOptions,
  enableDescription = false,
  addDescriptionLabel,
  descriptionPlaceholder,
  dropzoneMessage,
  onChange,
}) => {
  const onDrop = useOnDropFile({ mode, name, onChange, value, multiple });
  const onRemove = useOnRemoveFile({ value, onChange });

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      multiple: multiple,
      ...dropzoneOptions,
    });

  const className = useMemo(
    () =>
      `dropzone ${isFocused ? "focused" : ""} ${
        isDragAccept ? "accepted" : ""
      } ${isDragReject ? "rejected" : ""}`,
    [isFocused, isDragAccept, isDragReject],
  );

  return (
    <div className="file-input dropzone">
      {label && <label htmlFor={name}>{label}</label>}
      <div {...getRootProps({ className })}>
        <input id={name} name={name} {...getInputProps()} />
        {dropzoneMessage && <p>{dropzoneMessage}</p>}
      </div>
      {!!value?.length && (
        <ul className="selected">
          {value.map((file, index) => {
            return (
              <SelectedFile
                key={file.name}
                file={file}
                index={index}
                enableDescription={enableDescription}
                addDescriptionLabel={addDescriptionLabel}
                descriptionPlaceholder={descriptionPlaceholder}
                onRemove={() => onRemove(index)}
                onDescriptionChange={(description) => {
                  file.description = description;
                }}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
};
