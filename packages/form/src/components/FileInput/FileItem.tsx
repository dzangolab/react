import React, { useState } from "react";

import { ExtendedFile } from "./FileInput";

type FileItemProperties = {
  file: ExtendedFile;
  onRemove?: () => void;
};
export const FileItem: React.FC<FileItemProperties> = ({ file, onRemove }) => {
  const [showDescriptionInput, setShowDescriptionInput] = useState(false);
  return (
    <li key={file.name}>
      {file.name} - {file.size} bytes
      <button onClick={() => setShowDescriptionInput(true)}>
        Add description
      </button>
      {showDescriptionInput && (
        <>
          <input
            value={file.description}
            onChange={(event) => (file.description = event.target.value)}
          ></input>
          <button
            onClick={() => {
              file.description = undefined;
              setShowDescriptionInput(false);
            }}
          >
            Cancel
          </button>
        </>
      )}
      {!!onRemove && <button onClick={onRemove}>Remove</button>}
    </li>
  );
};
