import { FileUpload } from "primereact/fileupload";
export const UploadFile = () => {
  return (
    <div className="card">
      <FileUpload
        name="file[]"
        url={"/api/upload"}
        multiple
        accept="image/*"
        emptyTemplate={
          <p className="m-0">Drag and drop files to here to upload.</p>
        }
      />
    </div>
  );
};
