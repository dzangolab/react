import { FileAttach } from "@dzangolab/react-form";
import { useState } from "react";

const FileAttachDemo = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  return (
    <>
      <FileAttach
        name="fileAttach"
        selectButtonProps={{ icon: "pi pi-file" }}
        values={selectedFiles}
        mode={"append"}
        multiple={false}
        onChange={(file: any) => {
          setSelectedFiles(file);
        }}
        displaySelectedFileList="none"
      />
      {selectedFiles.map((file: any, i) => {
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
