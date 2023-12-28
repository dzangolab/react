import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";

import YoutubeFacade from "./YoutubeFacade";
import { Section } from "../../../../components/Demo";

export const YoutubeFacadeDemo = () => {
  const { t } = useTranslation("ui");

  return (
    <Page title={t("youtubeFacade.title")}>
      <Section>
        <div style={{ width: "50%" }}>
          <YoutubeFacade
            videoLink="https://www.youtube.com/watch?v=zhnIruPa0XI"
            videoToken="zhnIruPa0XI"
            aspectRatio="16/9"
            alt="Video alt"
          />
        </div>
      </Section>
    </Page>
  );
};
