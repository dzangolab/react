import { useTranslation } from "@dzangolab/react-i18n";

import YoutubeFacade from "./index";

const FacadeExample = () => {
  const { t } = useTranslation("ui");

  return (
    <div style={{ width: "50%" }}>
      <YoutubeFacade
        videoLink="https://www.youtube.com/watch?v=zhnIruPa0XI"
        videoToken="zhnIruPa0XI"
        aspectRatio="16/9"
        alt={t("facades.alt")}
      />
    </div>
  );
};

export default FacadeExample;
