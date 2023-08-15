// components/FormComponents/FileInput.tsx
import React, { FC, useCallback, useEffect, useMemo } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";

import { FileItem } from "./FileItem";

interface IFileInputProperties
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  name: string;
  label?: string;
  mode?: "append" | "update";
  dropzoneOptions?: DropzoneOptions;
}

export interface ExtendedFile extends File {
  description?: string;
}

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

export const FileInput: FC<IFileInputProperties> = ({
  name,
  label,
  mode = "append",
  dropzoneOptions,
  ...inputProperties
}) => {
  const { register, unregister, setValue, watch } = useFormContext();

  const files: ExtendedFile[] = watch(name);

  const onDrop = useCallback(
    (droppedFiles: ExtendedFile[]) => {
      /*
         This is where the magic is happening.
         Depending upon the mode we are replacing old files with new one,
         or appending new files into the old ones, and also filtering out the duplicate files. 
      */
      let newFiles =
        mode === "update" ? droppedFiles : [...(files || []), ...droppedFiles];

      if (mode === "append") {
        newFiles = newFiles.reduce((previous: ExtendedFile[], file) => {
          const fo = Object.entries(file);

          if (
            previous.find((pFile: ExtendedFile) => {
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
      setValue(name, newFiles, { shouldValidate: true });
    },
    [setValue, name, mode, files],
  );

  const onRemove = useCallback(
    (index: number) => {
      const newFiles = files.filter((_, index_) => index_ !== index); // improve this

      setValue(name, newFiles, { shouldValidate: true });
    },
    [setValue, name, mode, files],
  );

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    isDragActive,
  } = useDropzone({
    onDrop,
    ...dropzoneOptions,
  });

  useEffect(() => {
    register(name);
    return () => {
      unregister(name);
    };
  }, [register, unregister, name]);

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject],
  );

  return (
    <>
      {label && <label htmlFor={name}>{label}</label>}
      <div {...getRootProps({ className: "dropzone", style })}>
        <input
          {...inputProperties}
          id={name}
          name={name}
          {...getInputProps()}
        />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <ul className="selected-files">
        {!!files?.length &&
          files.map((file, index) => {
            return (
              <FileItem
                file={file}
                key={file.name}
                onRemove={() => onRemove(index)}
              />
            );
          })}
      </ul>
    </>
  );
};
