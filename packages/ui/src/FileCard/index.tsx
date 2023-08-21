import { Button } from "primereact/button";
import { Card } from "primereact/card";

export const FileCard = () => {
  const header = () => {
    return <></>;
  };

  const body = () => {
    return (
      <p className="m-0">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed
        consequuntur error repudiandae numquam deserunt quisquam repellat libero
        asperiores earum nam nobis, culpa ratione quam perferendis esse,
        cupiditate neque quas!
      </p>
    );
  };

  const footer = () => {
    return (
      <div
        className="file-card-footer"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Button icon="pi pi-eye" rounded aria-label="Filter" />
        <Button icon="pi pi-download" rounded aria-label="Filter" />
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
