import React, { useState } from "react";
import { FileUpload, ItemTemplateOptions } from "primereact/fileupload";
import { Button } from "primereact/button";

export const UploadFile = () => {
  const [customFileName, setCustomFileName] = useState("");
  const [totalSize, setTotalSize] = useState(0);

  const handleFileChange = (event: any) => {
    setCustomFileName(event.target.value);
  };

  const handleUpload = ({ files }: any) => {
    // Assuming you want to upload a single file
    const file = files && files.length > 0 ? files[0] : null;

    if (file) {
      const formData = new FormData();
      formData.append("file", file, customFileName || file.name);
      console.log(formData);
      // Perform the upload using your API or server logic
      // Example: axios.post("/api/upload", formData);
    }
  };
  const onTemplateRemove = (file: File, callback: any) => {
    setTotalSize(totalSize - file.size);
    callback();
  };

  const itemTemplate = (inFile: object, properties: ItemTemplateOptions) => {
    const file = inFile as File;
    return (
      <div
        className="flex p-jc-between"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div className="flex align-items-center" style={{ width: "40%" }}>
          <img
            alt="/"
            role="presentation"
            src={file.webkitRelativePath}
            width={100}
          />
          <span className="flex flex-column text-left ml-3">
            {file.name}
            <small>{new Date().toLocaleDateString()}</small>
          </span>
        </div>
        <input
          type="text"
          value={customFileName}
          onChange={(event) => setCustomFileName(event.target.value)}
          placeholder="Enter custom file name"
        />
        <Button
          type="button"
          icon="pi pi-times"
          className="p-button-outlined p-button-rounded p-button-danger ml-auto"
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
        onUpload={handleUpload}
        emptyTemplate={
          <p className="m-0">Drag and drop files to here to upload.</p>
        }
        itemTemplate={itemTemplate}
      />
    </div>
  );
};
