import { FileAttach } from "@dzangolab/react-form";
import { useState } from "react";

import type { FileExtended } from "@dzangolab/react-form";

const FileAttachDemo = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileExtended[]>([]);
  return (
    <>
      <FileAttach
        name="fileAttach"
        selectButtonProps={{ icon: "pi pi-file" }}
        values={selectedFiles}
        mode={"append"}
        multiple={false}
        onChange={(file: FileExtended[]) => {
          setSelectedFiles(file);
        }}
        displaySelectedFileList="none"
      />
      {selectedFiles.map((file: FileExtended, i) => {
        return (
          <div>
            <span>{file.name}</span>

            <button
              onClick={() => {
                setSelectedFiles((pre) =>
                  pre.filter((file, index) => i !== index),
                );
              }}
            >
              X
            </button>
          </div>
        );
      })}
    </>
  );
};

export default FileAttachDemo;
