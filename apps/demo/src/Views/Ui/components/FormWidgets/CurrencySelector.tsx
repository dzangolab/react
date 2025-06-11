import { Trans, useTranslation } from "@dzangolab/react-i18n";
import { CurrencySelector, Page, Button } from "@dzangolab/react-ui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { CodeBlock, Section } from "../../../../components/Demo";

export const CurrencySelectorDemo = () => {
  const [t] = useTranslation("ui");
  const navigate = useNavigate();

  const [singleSelectValue, setSingleSelectValue] = useState<string>("");

  return (
    <Page
      title={t("currencySelector.title")}
      toolbar={
        <Button
          label={t("buttons.back")}
          variant="textOnly"
          iconLeft={<i className="pi pi-chevron-left"></i>}
          onClick={() => navigate("..")}
        />
      }
    >
      <Section title={t("headers.usage")}>
        <p>{t("common.usage", { component: "CurrencySelector" })}</p>
        <CodeBlock exampleCode='import { CurrencySelector } from "@dzangolab/react-ui"' />
      </Section>

      <Section title={t("select.usage.basic")}>
        <CurrencySelector
          label={t("select.label")}
          name="select"
          currencyOptions={[
            {
              code: "AUD",
              label: "Australian Dollar",
              symbol: "$",
              value: "AUD",
            },
            { code: "GBP", label: "British Pound", symbol: "£", value: "GBP" },
            { code: "EUR", label: "Euro", symbol: "€", value: "EUR" },
            { code: "JPY", label: "Japanese Yen", symbol: "¥", value: "JPY" },
            { code: "USD", label: "US Dollar", symbol: "$", value: "USD" },
          ]}
          value={singleSelectValue}
          onChange={(value: string) => setSingleSelectValue(value)}
          placeholder={t("select.placeholder")}
        />
      </Section>
    </Page>
  );
};
