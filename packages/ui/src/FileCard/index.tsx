import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { IFile } from "../FilesTable";

export type Message = {
  uploadedbyHeader?: string;
  uploadedAtHeader?: string;
  downloadCountHeader?: string;
  lastDownloadedAtHeader?: string;
  downloadButtonLabel?: string;
  viewButtonLabel?: string;
};

type FileCardType = {
  file?: IFile;
  handleDownload?: (arguments_: any) => void;
  handleView?: (arguments_: any) => void;
  showDescription?: boolean;
  translationMessage?: Message;
};

export const FileCard = ({
  file,
  handleDownload,
  handleView,
  showDescription,
  translationMessage,
}: FileCardType) => {
  const checkUploadedByData = (data: any) => {
    if (!data.uploadedBy) {
      return <code>&#8212;</code>;
    }

    if (data.uploadedBy.givenName || data.uploadedBy.lastName) {
      return `${data.uploadedBy.givenName || ""} ${
        data.uploadedBy.lastName || ""
      }`;
    }

    return data.uploadedBy.email;
  };

  return (
    <Card className="file-card">
      <div className="file-details">
        <span className="filename">{file?.filename}</span>
        {showDescription && (
          <span className="file-description">{file?.description}</span>
        )}
        <span className="file-size">{file?.size}</span>
      </div>
      <div className="upload-download-detail-wrapper">
        <div className="file-upload-details">
          <div className="uploaded-by">
            <span>{translationMessage?.uploadedbyHeader || "Uploaded by"}</span>
            <span>{checkUploadedByData(file?.uploadedBy)}</span>
          </div>
          <div className="uploaded-at">
            <span>{translationMessage?.uploadedAtHeader || "Uploaded at"}</span>
            <span>{file?.uploadedAt}</span>
          </div>
        </div>
        <div className="file-download-details">
          <div className="download-count">
            <span>
              {translationMessage?.downloadCountHeader || "Download count"}
            </span>
            <span>{file?.downloadCount}</span>
          </div>
          <div className="last-downloaded-at">
            <span>
              {translationMessage?.lastDownloadedAtHeader ||
                "Last downloaded at"}
            </span>
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
          label={translationMessage?.downloadButtonLabel || "Download"}
          onClick={handleDownload}
        />
        <Button
          icon="pi pi-eye"
          label={translationMessage?.viewButtonLabel || "View"}
          onClick={handleView}
        />
      </div>
    </Card>
  );
};
