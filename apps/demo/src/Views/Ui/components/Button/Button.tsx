import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";

import "./index.css";

import { CodeBlock, Section } from "../../../../components/Demo";
import React from "react";
import { Icon, Link, Severity, Size, Variant } from "./components";

export const ButtonDemo = () => {
  const { t } = useTranslation("ui");

  return (
    <Page title={t("button.title")} subtitle={t("button.subtitle")}>
      <Section title={t("headers.usage")}>
        <p>
          To use the Button component, simply import it into your React file:
        </p>
        <CodeBlock exampleCode="import { Button } from '@dzangolab/react-ui';" />

        <h3>Props: IButtonProperties</h3>
      </Section>

      <Section title={t("headers.examples")}>
        <h3>{t("button.usage.severity")}</h3>
        <Severity />
        <CodeBlock
          exampleCode={Severity({ isString: true }) as string}
        ></CodeBlock>

        <h3>{t("button.usage.size")}</h3>
        <Size />
        <CodeBlock exampleCode={Size({ isString: true }) as string}></CodeBlock>

        <h3>{t("button.usage.variant")}</h3>
        <Variant />
        <CodeBlock
          exampleCode={Variant({ isString: true }) as string}
        ></CodeBlock>

        <h3>{t("button.usage.icons")}</h3>
        <Icon />
        <CodeBlock exampleCode={Icon({ isString: true }) as string}></CodeBlock>

        <h3>{t("button.usage.link")}</h3>
        <Link />
        <CodeBlock exampleCode={Link({ isString: true }) as string}></CodeBlock>
      </Section>
    </Page>
  );
};
