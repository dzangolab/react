import { useTranslation } from "@dzangolab/react-i18n";
import { Button, LoadingIcon, Page } from "@dzangolab/react-ui";

import { Section } from "../../../components/Demo";

export const PageDemo = () => {
  const [t] = useTranslation("ui");

  const PageContent = <div style={{ height: "20vh" }}>Page content.</div>;

  return (
    <>
      <Page title={t("Page demo basic")}>{PageContent}</Page>

      <hr />
      <Page
        title={t("Page with toolbar")}
        toolbar={<Button label={"Edit"} />}
        children={PageContent}
      />

      <hr />
      <Page
        title={t("Page with subtile string")}
        subtitle={"Page subtile"}
        children={PageContent}
      />

      <hr />
      <Page title={t("Page with subtile component")} children={PageContent} />

      <hr />
      <Page
        title={t("Page with breadcrumb")}
        children={PageContent}
        breadCrumb={"home/ui/page-demo"}
      />
    </>
  );
};
