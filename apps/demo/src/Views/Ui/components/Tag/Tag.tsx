import { useTranslation } from "@dzangolab/react-i18n";
import { Page, Tag } from "@dzangolab/react-ui";

import { Section } from "../../../../components/Demo";
import "./index.css";

export const TagDemo = () => {
  const [t] = useTranslation("ui");

  return (
    <Page title={t("tag.title")}>
      <Section title="Basic">
        <div className="demo-tag-container">
          <Tag label="tag" color="default" />
        </div>
      </Section>

      <Section title="Color">
        <div className="demo-tag-container">
          <Tag label="tag" color="default" />
          <Tag label="tag" color="gray" />
          <Tag label="tag" color="red" />
          <Tag label="tag" color="pink" />
          <Tag label="tag" color="purple" />
          <Tag label="tag" color="green" />
          <Tag label="tag" color="yellow" />
          <Tag label="tag" color="orange" />
          <Tag label="tag" color="brown" />
        </div>
      </Section>

      <Section title="Icon">
        <div className="demo-tag-container">
          <Tag label="tag" icon="pi pi-user" color="default" />
          <Tag label="tag" icon="pi pi-check" color="green" />
          <Tag label="tag" icon="pi pi-times" color="red" />
        </div>
      </Section>
    </Page>
  );
};
