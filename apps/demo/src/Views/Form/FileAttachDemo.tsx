import { FileAttachBasic } from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import { ToolTip } from "@dzangolab/react-ui";
import { useRef, useState } from "react";

import type { FileExtended } from "@dzangolab/react-form";

const FileAttachDemo = () => {
  const { t } = useTranslation("files");
  const [selectedFiles, setSelectedFiles] = useState<FileExtended[]>([]);
  const buttonReference = useRef<HTMLDivElement>(null);
  return (
    <>
      <ToolTip elementRef={buttonReference}>
        <span>{t("fileAttach.attachFileMessage")}</span>
      </ToolTip>
      <div ref={buttonReference}>
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
      </div>
      {selectedFiles.map((file: FileExtended, i) => {
        return (
          <div key={file.name}>
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
