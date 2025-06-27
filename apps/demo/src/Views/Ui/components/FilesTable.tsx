import { useTranslation } from "@dzangolab/react-i18n";
import { Button, FilesTable, Page } from "@dzangolab/react-ui";
import { useNavigate } from "react-router-dom";

import { Section } from "../../../components/Demo";

export const FilesTableDemo = () => {
  const { t } = useTranslation("ui");
  const navigate = useNavigate();

  return (
    <Page
      title={t("filesTable.title")}
      toolbar={
        <Button
          label={t("buttons.back")}
          variant="textOnly"
          iconLeft={<i className="pi pi-chevron-left"></i>}
          onClick={() => navigate("..")}
        />
      }
    >
      <Section>
        <FilesTable
          onFileDelete={() => {}}
          onFileArchive={() => {}}
          files={[
            {
              id: 0,
              originalFileName: "my file",
              description: "Initial project proposal for client review",
              uploadedBy: { givenName: "Manish", lastName: "Aryal" },
              uploadedAt: new Date("2025-01-14").getTime(),
              lastDownloadedAt: new Date("2025-01-26").getTime(),
              downloadCount: 10,
            },
            {
              id: 1,
              originalFileName: "logo",
              description: "Final logo design for branding",
              uploadedBy: { givenName: "Nabin", lastName: "Dhital" },
              uploadedAt: new Date("2025-02-17").getTime(),
              lastDownloadedAt: Date.now(),
              downloadCount: 12,
            },
          ]}
          visibleColumns={[
            "originalFileName",
            "description",
            "uploadedBy",
            "uploadedAt",
            "lastDownloadedAt",
            "downloadCount",
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
          messages={{
            originalFileNamePlaceholder: t("filesTable.placeholder.search"),
            descriptionPlaceholder: t("filesTable.placeholder.search"),
            uploadedAtPlaceholder: t("filesTable.placeholder.select"),
            downloadCountPlaceholder: `${t("filesTable.placeholder.min")}, ${t("filesTable.placeholder.max")}`,
            lastDownloadedAtPlaceholder: t("filesTable.placeholder.select"),
          }}
        />
      </Section>
    </Page>
  );
};
