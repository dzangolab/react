import React, { useState } from "react";
import { FileUpload, ItemTemplateOptions } from "primereact/fileupload";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

export const UploadFile = () => {
  const [customFileNames, setCustomFileNames] = useState<string[]>([]);
  const [renamingStatus, setRenamingStatus] = useState<boolean[]>([]);
  const [totalSize, setTotalSize] = useState(0);

  const onTemplateRemove = (file: File, callback: any) => {
    setTotalSize(totalSize - file.size);
    callback();
  };

  const handleRenameDone = (index: number) => {
    const updatedStatus = [...renamingStatus];
    updatedStatus[index] = !updatedStatus[index];
    setRenamingStatus(updatedStatus);
  };

  const itemTemplate = (inFile: object, properties: ItemTemplateOptions) => {
    const file = inFile as File;
    const index = properties.index;
    const isRenaming = renamingStatus[index] || false;
    return (
      <div
        className="flex align-items-center flex-wrap"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          className="flex align-items-center"
          style={{ width: "60%", display: "flex", alignItems: "center" }}
        >
          <i
            className="pi pi-file"
            style={{ fontSize: "2rem", marginRight: "1rem" }}
          ></i>
          {isRenaming ? (
            <div className="flex" style={{ display: "flex" }}>
              <InputText
                type="text"
                value={customFileNames[index]}
                onChange={(event) => {
                  const updatedNames = [...customFileNames];
                  updatedNames[index] = event.target.value;
                  setCustomFileNames(updatedNames);
                }}
                placeholder="Enter custom file name"
              />

              <div>
                <Button
                  type="button"
                  icon="pi pi-check"
                  className="p-button-outlined p-button-rounded p-button-success ml-auto flex align-items-center"
                  onClick={() => handleRenameDone(index)}
                />
                <Button
                  type="button"
                  icon="pi pi-times"
                  className="p-button-outlined p-button-rounded p-button-danger ml-auto flex align-items-center"
                  onClick={() => {
                    handleRenameDone(index);
                    setCustomFileNames(customFileNames);
                  }}
                />
              </div>
            </div>
          ) : (
            <>
              <span className="flex flex-column text-left ml-3">
                {customFileNames[index] ? customFileNames[index] : file.name}
              </span>
              <Button label="Rename" onClick={() => handleRenameDone(index)} />
            </>
          )}
        </div>

        <Button
          type="button"
          icon="pi pi-times"
          className="p-button-outlined p-button-rounded p-button-danger ml-auto flex align-items-center"
          onClick={() => onTemplateRemove(file, properties.onRemove)}
        />
      </div>
    );
  };

  return (
    <div className="card">
      <FileUpload
        style={{ width: "100%" }}
        name="demo[]"
        url={"/api/upload"}
        multiple
        accept="image/*"
        emptyTemplate={
          <p className="m-0">Drag and drop files to here to upload.</p>
        }
        itemTemplate={itemTemplate}
      />
    </div>
  );
};
