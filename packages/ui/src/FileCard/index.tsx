import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { IFile } from "../FilesTable";

type FileCardType = {
  file?: IFile;
  handleDownload?: () => void;
  handleView?: () => void;
  showDescription?: boolean;
};

export const FileCard = ({
  file,
  handleDownload,
  handleView,
  showDescription,
}: FileCardType) => {
  const checkFileData = (data: any) => {
    if (data) {
      return data;
    }
    return <code>&#8212;</code>;
  };

  return (
    <Card className="file-card">
      <div className="file-details">
        <span className="filename">{file?.filename || "This is my file"}</span>
        {showDescription && (
          <span className="file-description">{file?.description}</span>
        )}
        <span className="file-size">{file?.size}</span>
      </div>
      <div className="upload-download-detail-wrapper">
        <div className="file-upload-details">
          <div className="uploaded-by">
            <span>Uploaded by</span>
            <span>{checkFileData(file?.uploadedBy)}</span>
          </div>
          <div className="uploaded-at">
            <span>Uploaded At</span>
            <span>{file?.uploadedAt}</span>
          </div>
        </div>
        <div className="file-download-details">
          <div className="download-count">
            <span>Download count</span>
            <span>{file?.downloadCount}</span>
          </div>
          <div className="last-downloaded-at">
            <span>Last Download time</span>
            <span>
              {file?.lastDownloadedAt ? (
                file?.lastDownloadedAt
              ) : (
                <code>&#8212;</code>
              )}
            </span>
          </div>
        </div>
      </div>
      <div className="file-actions">
        <Button
          icon="pi pi-download"
          label="Download"
          onClick={handleDownload}
        />
        <Button icon="pi pi-eye" label="View" onClick={handleView} />
      </div>
    </Card>
  );
};
