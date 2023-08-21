import { Button } from "primereact/button";
import { Card } from "primereact/card";

type FileCardType = {
  file?: object;
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
  return (
    <Card className="file-card">
      <div className="file-details">
        <span className="filename">filename</span>
        <span className="file-description">This is my file</span>
        <span className="file-size">14mb</span>
      </div>
      <div className="file-upload-detail">
        <div className="uploaded-by">
          <span>Uploaded by</span>
          <span>Manish</span>
        </div>
        <div className="uploaded-at-detail">
          <span>Uploaded At</span>
          <span>5678</span>
        </div>
      </div>
      <div className="file-download-detail">
        <div className="download-count">
          <span>Download count</span>
          <span>24</span>
        </div>
        <div className="last-downloaded">
          <span>Last Download time</span>
          <span>67890</span>
        </div>
      </div>
      <div className="actions">
        <Button icon="pi pi-download" label="Download" />
        <Button icon="pi pi-eye" label="View" />
      </div>
    </Card>
  );
};
