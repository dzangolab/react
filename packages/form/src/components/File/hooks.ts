import { useCallback } from "react";

import type { FileExtended, FileMode } from "./types";

export const useOnDropFile = ({
  mode,
  multiple,
  name,
  onChange,
  value,
}: {
  name: string;
  multiple: boolean;
  mode: FileMode;
  value: FileExtended[];
  onChange: (file: FileExtended[]) => void;
}) =>
  useCallback(
    (droppedFiles: FileExtended[]) => {
      /*
         This is where the magic is happening.
         Depending upon the mode we are replacing old files with new one,
         or appending new files into the old ones, and also filtering out the duplicate files. 
      */
      if (!multiple || mode === "update") {
        return onChange(droppedFiles);
      } else {
        const newFiles = [...(value || []), ...droppedFiles];

        const uniqueFiles = newFiles.reduce(
          (previousUniqueFiles: FileExtended[], currentFile) => {
            const currentFileEntries = Object.entries(currentFile);

            if (
              previousUniqueFiles.find((existingFile: FileExtended) => {
                const existingFileEntries = Object.entries(existingFile);
                return existingFileEntries.every(
                  ([key, value], index) =>
                    key === currentFileEntries[index][0] &&
                    value === currentFileEntries[index][1],
                );
              })
            ) {
              return previousUniqueFiles;
            } else {
              return [...previousUniqueFiles, currentFile];
            }
          },
          [],
        );

        // End Magic.
        onChange(uniqueFiles);
      }
    },
    [name, mode, value, onChange],
  );

export const useOnRemoveFile = ({
  value,
  onChange,
}: {
  value: FileExtended[];
  onChange: (file: FileExtended[]) => void;
}) =>
  useCallback(
    (index: number) => {
      const newFiles = value.filter((_, index_) => index_ !== index); // improve this

      onChange(newFiles);
    },
    [value, onChange],
  );
