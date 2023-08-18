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
    return <></>;
  };
  return (
    <div className="">
      <Card
        title="Title"
        subTitle="Subtitle"
        className="md:w-25rem"
        header={header}
        children={body()}
        footer={footer}
      />
    </div>
  );
};
