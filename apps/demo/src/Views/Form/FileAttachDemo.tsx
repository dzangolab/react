import { FileAttachBasic } from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import { Tooltip } from "@dzangolab/react-ui";
import { useRef, useState } from "react";

import type { FileExtended } from "@dzangolab/react-form";

const FileAttachDemo = () => {
  const { t } = useTranslation("files");
  const [selectedFiles, setSelectedFiles] = useState<FileExtended[]>([]);
  const reference = useRef<HTMLButtonElement>(null);

  return (
    <>
      <FileAttachBasic
        name="fileAttach"
        selectButtonProps={{ icon: "pi pi-file" }}
        value={selectedFiles}
        mode={"update"}
        multiple={true}
        onChange={(file: FileExtended[]) => {
          setSelectedFiles(file);
        }}
        selectedFileDisplay="none"
      />

      {selectedFiles.map((file: FileExtended, i) => {
        return (
          <div key={file.name}>
            <span>{file.name}</span>
            <Tooltip
              elementRef={reference}
              position="top"
              offset={10}
              delay={3000}
            >
              <span>{t("fileAttach.deleteFileMessage")}</span>
            </Tooltip>
            <button
              onClick={() => {
                setSelectedFiles((pre) =>
                  pre.filter((file, index) => i !== index),
                );
              }}
              ref={reference}
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
