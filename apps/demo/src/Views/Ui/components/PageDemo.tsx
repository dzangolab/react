import { useTranslation } from "@dzangolab/react-i18n";
import { Button, Page, Tag } from "@dzangolab/react-ui";

export const PageDemo = () => {
  const [t] = useTranslation("ui");

  const PageContent = <div style={{ height: "20vh" }}>{t("page.content")}</div>;
  const breadcrumb = (
    <Button
      iconLeft={<i className="pi pi-chevron-left"></i>}
      variant="textOnly"
      label={t("page.breadcrumb.back")}
    />
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
        title={t("page.title.centerAligned")}
        toolbar={<Button label={t("page.toolbar.edit")} />}
        children={PageContent}
        centered={true}
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
        subtitle={<Tag label={t("page.subTitle.tag")} />}
        children={PageContent}
      />

      <hr />
      <Page
        title={t("page.title.breadcrumb")}
        children={PageContent}
        breadcrumb={breadcrumb}
      />

      <hr />
      <Page
        title={t("page.title.complete")}
        titleTag={<Tag label={t("page.heading.tag")} />}
        toolbar={
          <>
            <Button
              severity="secondary"
              label={t("page.toolbar.button.label")}
            />
            <Button label={t("page.toolbar.edit")} />
          </>
        }
        subtitle={<Tag label={t("page.subTitle.tag")} />}
        children={PageContent}
        breadcrumb={breadcrumb}
        toolbarActionMenu={{
          actions: [
            {
              label: "View",
              onClick: () => {
                console.log("view action");
              },
            },
            {
              label: "Edit",
              disabled: true,
              onClick: () => {
                console.log("edit action");
              },
            },
            {
              label: "Delete",
              className: "danger",
              onClick: () => {
                console.log("delete action");
              },
            },
          ],
        }}
      />
    </>
  );
};
