import { useTranslation } from "@dzangolab/react-i18n";
import { FilesList, Page } from "@dzangolab/react-ui";

export const FilesListDemo = () => {
  const [t] = useTranslation("ui");

  return (
    <Page title={t("v2.filesList.title")}>
      <FilesList
        files={[
          {
            id: 0,
            originalFileName: "file1.png",
            uploadedBy: { givenName: "Manish", lastName: "Aryal" },
            uploadedAt: Date.now(),
            downloadCount: 5,
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
        onFileDownload={() => {}}
        onFileView={() => {}}
      />
    </Page>
  );
};
