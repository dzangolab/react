import { useTranslation } from "@dzangolab/react-i18n";
import { LoadingIcon, Page } from "@dzangolab/react-ui";

export const LoadingDemo = () => {
  const [t] = useTranslation("ui");

  return (
    <Page title={t("v2.loading.title")}>
      <LoadingIcon color={"black"} fontSize={"0.5rem"} />
    </Page>
  );
};
