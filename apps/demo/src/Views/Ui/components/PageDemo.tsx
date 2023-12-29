import { useTranslation } from "@dzangolab/react-i18n";
import { Button, Page } from "@dzangolab/react-ui";

import { Tag } from "primereact/tag";
import { Link } from "react-router-dom";

export const PageDemo = () => {
  const [t] = useTranslation("ui");

  const PageContent = <div style={{ height: "20vh" }}>{t("page.content")}</div>;
  const breadcrumb = (
    <span>
      <Link to={"/"} children="home" />/<Link to={"/ui"} children="ui" />/
      <Link to={"/ui/page-demo"} children="page-demo" />{" "}
    </span>
  );

  return (
    <>
      <Page title={t("page.title.basic")}>{PageContent}</Page>

      <hr />
      <Page
        title={t("page.title.toolbar")}
        toolbar={<Button label={t("page.toolbar.edit")} />}
        children={PageContent}
      />

      <hr />
      <Page
        title={t("page.title.stringSubtitle")}
        subtitle={t("page.subTitle.title")}
        children={PageContent}
      />

      <hr />
      <Page
        title={t("page.title.componentSubtitle")}
        subtitle={<Tag value={t("page.subTitle.tag")} />}
        children={PageContent}
      />

      <hr />
      <Page
        title={t("page.title.breadcrumb")}
        children={PageContent}
        breadcrumb={breadcrumb}
      />
    </>
  );
};
