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
  const header = () => {
    return <div className="file-card-header"></div>;
  };

  const body = () => {
    return (
      <div className="file-card-body">
        <div>
          <div>
            <span>Uploaded by</span>
            <span>Manish</span>
          </div>
          <div>
            <span>Uploaded at</span>
            <span>798457</span>
          </div>
        </div>
        <div>
          <div>
            <span>Downloaded times</span>
            <span>5</span>
          </div>
          <div>
            <span>Last uploaded at</span>
            <span>987677</span>
          </div>
        </div>
      </div>
    );
  };

  const footer = () => {
    return (
      <div
        className="file-card-footer"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Button icon="pi pi-eye" rounded onClick={handleView} />
        <Button icon="pi pi-download" rounded onClick={handleDownload} />
      </div>
    );
  };
  return (
    <Card
      style={{ width: "30rem" }}
      header={header}
      children={body()}
      footer={footer}
    />
  );
};
