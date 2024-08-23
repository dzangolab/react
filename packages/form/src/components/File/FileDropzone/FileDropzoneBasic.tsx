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

  const {
    fileRejections,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
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

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <div key={file.name} data-file={file.name} className="dz-file-error">
      <strong>
        {file.name} - {file.size} bytes
      </strong>
      <ul>
        {errors.map((error) => (
          <li key={error.code} data-error-code={error.code}>
            {error.message}
          </li>
        ))}
      </ul>
    </div>
  ));

  const renderErrors = () => {
    return fileRejections.length > 0 ? (
      multiple ? (
        <div className="dz-file-errors">{fileRejectionItems}</div>
      ) : (
        fileRejectionItems
      )
    ) : (
      <></>
    );
  };

  return (
    <div className="file-input dropzone">
      {label && <label htmlFor={name}>{label}</label>}
      <div {...getRootProps({ className })}>
        <input id={name} name={name} {...getInputProps()} />
        {dropzoneMessage && <p>{dropzoneMessage}</p>}
      </div>

      {renderErrors()}

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
