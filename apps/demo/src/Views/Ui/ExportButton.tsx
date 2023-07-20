import { ExportButton as Button } from "@dzangolab/react-ui";

export const ExportButton = () => {
  const getData = () => {
    return [
      ["ID", "Name"],
      [1, "John Doe"],
      [2, "Mike Ross"],
      [3, "Harvey Specter"],
    ];
  };

  return <Button label="Export XLSX" getData={getData} />;
};
