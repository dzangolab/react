import { useTranslation } from "@dzangolab/react-i18n";
import { ExportButton, Page } from "@dzangolab/react-ui";

import { Section } from "../../../components/Demo";

export const ExportButtonDemo = () => {
  const [t] = useTranslation("ui");

  const getData = () => {
    return [
      ["ID", "Name"],
      [1, "John Doe"],
      [2, "Mike Ross"],
      [3, "Harvey Specter"],
    ];
  };

  return (
    <Page title={t("exportButton.title")}>
      <Section>
        <ExportButton label="Export XLSX" getData={getData} />
      </Section>
    </Page>
  );
};
