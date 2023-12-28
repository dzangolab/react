import { useTranslation } from "@dzangolab/react-i18n";
import { FileCard, Page } from "@dzangolab/react-ui";

import { Section } from "../../../components/Demo";

export const FileCardDemo = () => {
  const [t] = useTranslation("ui");

  return (
    <Page title={t("fileCard.title")}>
      <Section>
        <FileCard
          file={{
            id: 0,
            originalFileName: "file1.png",
            description: "This is my file",
            size: 4,
            uploadedBy: { givenName: "Manish", lastName: "Aryal" },
            uploadedAt: Date.now(),
            downloadCount: 0,
            lastDownloadedAt: Date.now(),
          }}
          onDownload={() => {}}
          onView={() => {}}
          onShare={() => {}}
          onArchive={() => {}}
          onDelete={() => {}}
        />
      </Section>
    </Page>
  );
};
