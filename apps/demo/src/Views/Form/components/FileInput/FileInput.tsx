import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";

import {
  FileAttachDemo,
  FileInputButton,
  FileUploadDemo,
  FormWithFileInput,
  FormWithFileInputButton,
} from "./_components";
import { Section } from "../../../../components/Demo";

export const FileInputDemo = () => {
  const [t] = useTranslation("form");

  return (
    <Page title={t("fileInput.title")}>
      <Section title={t("fileInput.usage.formWithFileInputButton")}>
        <FormWithFileInputButton />
      </Section>

      <Section title={t("fileInput.usage.fileInput")}>
        <FormWithFileInput />
      </Section>

      <Section title={t("fileInput.usage.fileInputButton")}>
        <FileInputButton />
      </Section>

      <Section title={t("fileInput.usage.fileUpload")}>
        <FileUploadDemo />
      </Section>

      <Section title={t("fileInput.usage.fileAttach")}>
        <FileAttachDemo />
      </Section>
    </Page>
  );
};
