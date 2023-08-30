// components/FormComponents/FileInputBasic.tsx
import { Button } from "primereact/button";
import { OverlayPanel } from "primereact/overlaypanel";
import React, { FC, LegacyRef, useCallback, useMemo, useRef } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";

import { SelectedFile } from "./SelectedFile";
import { FileExtended } from "./types";

interface IFileInputBasicProperties {
  name: string;
  noDrag?: boolean;
  multiple?: boolean;
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

export const FileInputBasic: FC<IFileInputBasicProperties> = ({
  name,
  noDrag = false,
  label,
  mode = "append",
  multiple = true,
  value,
  dropzoneOptions,
  enableDescription = false,
  addDescriptionLabel,
  descriptionPlaceholder,
  dropzoneMessage,
  onChange,
}) => {
  const overlayReference = useRef<OverlayPanel>();

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
      noDrag,
      onDrop,
      multiple,
      ...dropzoneOptions,
    });

  const className = useMemo(
    () =>
      `dropzone ${isFocused ? "focused" : ""} ${
        isDragAccept ? "accepted" : ""
      } ${isDragReject ? "rejected" : ""}`,
    [isFocused, isDragAccept, isDragReject],
  );

  const renderInputUi = () => {
    const { onClick } = getRootProps();
    if (noDrag)
      return (
        <div className="input-button-wrapper">
          <Button
            label={
              value?.length
                ? "selected" + "( " + value?.length + " )"
                : "select"
            }
            icon={"pi pi-file"}
            onMouseEnter={(event) =>
              overlayReference.current?.show(event, null)
            }
            onClick={(event) => {
              event.preventDefault();
              onClick?.(event);
            }}
          />
          <input id={name} name={name} {...getInputProps()} />
        </div>
      );

    return (
      <div {...getRootProps({ className })}>
        <input id={name} name={name} {...getInputProps()} />
        {dropzoneMessage && <p>{dropzoneMessage}</p>}
      </div>
    );
  };

  const renderSelectedFiles = () => (
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
  );

  return (
    <div
      className="file-input"
      // onMouseLeave={(event) => overlayRef.current?.toggle(event)}
    >
      {label && <label htmlFor={name}>{label}</label>}
      {renderInputUi()}

      {noDrag ? (
        <OverlayPanel
          ref={overlayReference as LegacyRef<OverlayPanel>}
          showCloseIcon
        >
          {value?.length ? renderSelectedFiles() : "No file selected"}
        </OverlayPanel>
      ) : (
        renderSelectedFiles()
      )}
    </div>
  );
};
