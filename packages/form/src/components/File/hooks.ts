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
      let newFiles =
        mode === "update" || !multiple
          ? droppedFiles
          : [...(value || []), ...droppedFiles];

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

      // End Magic.
      onChange(newFiles);
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
