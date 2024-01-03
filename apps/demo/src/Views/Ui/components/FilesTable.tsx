import { useTranslation } from "@dzangolab/react-i18n";
import { FilesTable, Page } from "@dzangolab/react-ui";

import { Section } from "../../../components/Demo";

export const FilesTableDemo = () => {
  const { t } = useTranslation("ui");

  return (
    <Page title={t("filesTable.title")}>
      <Section>
        <FilesTable
          onFileDelete={() => {}}
          onFileArchive={() => {}}
          files={[
            {
              id: 0,
              originalFileName: "my file",
              description: "File 1 description",
              uploadedBy: { givenName: "Manish", lastName: "Aryal" },
              uploadedAt: Date.now(),
              lastDownloadedAt: Date.now(),
            },
            {
              id: 1,
              originalFileName: "my filev2",
              description: "File description",
              uploadedBy: { givenName: "Nabin", lastName: "Dhital" },
              uploadedAt: Date.now(),
              lastDownloadedAt: Date.now(),
            },
          ]}
          visibleColumns={[
            "originalFileName",
            "description",
            "uploadedBy",
            "uploadedAt",
            "actions",
          ]}
          columns={[
            {
              id: "uploadedBy",
              tooltip: ({ row: { original } }) => {
                return `${original.uploadedBy.givenName} ${original.uploadedBy.lastName}`;
              },
            },
            {
              accessorKey: "uploadedAt",
              tooltip: true,
            },
          ]}
          paginationOptions={{
            pageInputLabel: t("filesTable.pagination.pageControl"),
            itemsPerPageControlLabel: t("filesTable.pagination.rowsPerPage"),
          }}
        />
      </Section>
    </Page>
  );
};
