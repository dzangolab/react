// components/FormComponents/FileDropzoneBasic.tsx
import React, { FC, useCallback, useMemo } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";

import { SelectedFile } from "./SelectedFile";
import { FileExtended } from "./types";

interface IFileDropzoneBasicProperties {
  name: string;
  label?: string;
  mode?: "append" | "update";
  value: FileExtended[];
  enableDescription?: boolean;
  addDescriptionLabel?: string;
  descriptionPlaceholder?: string;
  dropzoneMessage?: string;
  dropzoneOptions?: DropzoneOptions;
  onChange: (files: FileExtended[]) => void;
}

export const FileDropzoneBasic: FC<IFileDropzoneBasicProperties> = ({
  name,
  label,
  mode = "append",
  value,
  dropzoneOptions,
  enableDescription = false,
  addDescriptionLabel,
  descriptionPlaceholder,
  dropzoneMessage,
  onChange,
}) => {
  const onDrop = useCallback(
    (droppedFiles: FileExtended[]) => {
      /*
         This is where the magic is happening.
         Depending upon the mode we are replacing old files with new one,
         or appending new files into the old ones, and also filtering out the duplicate files. 
      */
      let newFiles =
        mode === "update" ? droppedFiles : [...(value || []), ...droppedFiles];

      if (mode === "append") {
        newFiles = newFiles.reduce((previous: FileExtended[], file) => {
          const fo = Object.entries(file);

          if (
            previous.find((pFile: FileExtended) => {
              const eo = Object.entries(pFile);
              return eo.every(
                ([key, value], index) =>
                  key === fo[index][0] && value === fo[index][1],
              );
            })
          ) {
            return previous;
          } else {
            return [...previous, file];
          }
        }, []);
      }

      // End Magic.
      onChange(newFiles);
    },
    [name, mode, value, onChange],
  );

  const onRemove = useCallback(
    (index: number) => {
      const newFiles = value.filter((_, index_) => index_ !== index); // improve this

      onChange(newFiles);
    },
    [value, onChange],
  );

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      multiple: true,
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
    <>
      {label && <label htmlFor={name}>{label}</label>}
      <div {...getRootProps({ className })}>
        <input id={name} name={name} {...getInputProps()} />
        {dropzoneMessage && <p>{dropzoneMessage}</p>}
      </div>
      <ul className="selected-files">
        {!!value?.length &&
          value.map((file, index) => {
            return (
              <SelectedFile
                key={file.name}
                file={file}
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
    </>
  );
};
