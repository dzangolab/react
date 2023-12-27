import { useTranslation } from "@dzangolab/react-i18n";
import { FilesPresentation, Page } from "@dzangolab/react-ui";

import { Section } from "../../../components/Demo";

export const FilesPresentationDemo = () => {
  const [t] = useTranslation("ui");

  return (
    <Page title={t("filesPresentation.title")}>
      <Section>
        <FilesPresentation
          visibleFileDetails={[
            "originalFileName",
            "description",
            "size",
            "uploadedBy",
            "uploadedAt",
            "downloadCount",
            "lastDownloadedAt",
            "actions",
          ]}
          presentation="table"
          onEditDescription={() => {}}
          onFileDownload={() => {}}
          onFileView={() => {}}
          files={[
            {
              id: 0,
              originalFileName: "file1.png",
              uploadedBy: { givenName: "Manish", lastName: "Aryal" },
              uploadedAt: Date.now(),
              downloadCount: 5,
              description: "file1 description",
              size: 1000,
              lastDownloadedAt: Date.now(),
            },
            {
              id: 1,
              originalFileName: "document.pdf",
              uploadedBy: { givenName: "Gaurav", lastName: "Sapkota" },
              uploadedAt: Date.now(),
              downloadCount: 5,
              lastDownloadedAt: Date.now(),
            },
            {
              id: 2,
              originalFileName: "photo.jpeg",
              uploadedBy: { givenName: "Deepak", lastName: "Aryal" },
              uploadedAt: Date.now(),
              downloadCount: 5,
              lastDownloadedAt: Date.now(),
            },
            {
              id: 3,
              originalFileName: "manish.png",
              uploadedBy: { givenName: "Lamdiki", lastName: "Sherpa" },
              uploadedAt: Date.now(),
              downloadCount: 5,
              lastDownloadedAt: Date.now(),
            },
          ]}
        />
      </Section>
    </Page>
  );
};
