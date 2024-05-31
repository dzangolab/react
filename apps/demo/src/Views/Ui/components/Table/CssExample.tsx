import { useTranslation } from "@dzangolab/react-i18n";
import React from "react";

const CssExample = ({
  exampleCode,
  subheader,
}: {
  exampleCode: string;
  subheader: React.ReactNode;
}) => {
  const { t } = useTranslation("ui");

  return (
    <div className="css-code-block">
      <header>
        <h3>{t("cssCodeBlock.title")}</h3>
        {subheader}
      </header>

      <pre>
        <code>{exampleCode}</code>
      </pre>
    </div>
  );
};

export default CssExample;
