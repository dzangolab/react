import { useTranslation } from "@dzangolab/react-i18n";
import { LoadingIcon, Page } from "@dzangolab/react-ui";

import { Section } from "../../../components/Demo";

export const LoadingDemo = () => {
  const [t] = useTranslation("ui");

  return (
    <Page title={t("loading.title")}>
      <Section>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <LoadingIcon color={"black"} fontSize={"0.5rem"} />
        </div>
      </Section>
    </Page>
  );
};
